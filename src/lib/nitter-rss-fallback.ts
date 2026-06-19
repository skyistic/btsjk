import {
  buildStatsHtml,
  fetchTweetStats,
} from "@/lib/tweet-stats";

const FETCH_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "application/rss+xml, application/xml, text/xml, */*",
};

function extractTag(block: string, tag: string): string {
  const match = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
  return match?.[1]?.trim() ?? "";
}

function extractCdataDescription(block: string): string {
  const match = block.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/);
  return match?.[1] ?? extractTag(block, "description");
}

function extractStillImages(description: string): string {
  const images: string[] = [];
  const imgRegex = /<img[^>]+src="([^"]+)"/gi;
  let m: RegExpExecArray | null;
  while ((m = imgRegex.exec(description)) !== null) {
    const src = m[1];
    const path = src.replace(/^https?:\/\/[^/]+/, "");
    images.push(`<a class="still-image" href="${path}"></a>`);
  }
  return images.join("");
}

function stripImagesFromContent(description: string): string {
  return description.replace(/<img[^>]*>/gi, "").trim();
}

export async function rssToTimelineHtml(
  host: string,
  username: string
): Promise<string | null> {
  const response = await fetch(`https://${host}/${username}/rss`, {
    headers: FETCH_HEADERS,
    cache: "no-store",
  });

  if (!response.ok) return null;

  const xml = await response.text();
  if (!xml.includes("<rss")) return null;

  const rawItems: Array<{
    statusId: string;
    statusPath: string;
    content: string;
    images: string;
    pubDate: string;
  }> = [];

  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match: RegExpExecArray | null;

  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];
    const link = extractTag(block, "link");
    if (!link.includes(`/${username}/status/`)) continue;

    const statusId = link.match(/status\/(\d+)/)?.[1] ?? "";
    if (!statusId) continue;

    const description = extractCdataDescription(block);
    const content = stripImagesFromContent(description);
    const images = extractStillImages(description);
    const pubDate = extractTag(block, "pubDate");
    const statusPath = link.split("#")[0].replace(/^https?:\/\/[^/]+/, "");

    rawItems.push({ statusId, statusPath, content, images, pubDate });
  }

  if (rawItems.length === 0) return null;

  const items = await Promise.all(
    rawItems.map(async ({ statusId, statusPath, content, images, pubDate }) => {
      const stats = await fetchTweetStats(username, statusId, host);
      const statsHtml = buildStatsHtml(stats);

      return `<div class="timeline-item">
  <div class="tweet-content">${content}</div>
  ${images}
  <div class="tweet-date"><a href="${statusPath}" title="${pubDate}"></a></div>
  ${statsHtml}
</div>`;
    })
  );

  return `<!DOCTYPE html><html><body><div class="timeline">${items.join("")}</div></body></html>`;
}
