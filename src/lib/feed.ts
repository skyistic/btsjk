import {
  fetchProfileFromFxTwitter,
  parseProfileFromNitterHtml,
  type ProfileData,
} from "@/lib/nitter-profile";

export const NITTER_USERNAME = "mnijungkook_bts";

const NITTER_HOST =
  process.env.NEXT_PUBLIC_NITTER_HOST ?? "nitter.tiekoetter.com";

export type { ProfileData, ProfileStats } from "@/lib/nitter-profile";

export type FeedPost = {
  replies: number;
  retweets: number;
  quotes: number;
  likes: number;
  text: string;
  html: string;
  images: string[];
  originalHtml: string;
  timestamp: string;
  statusUrl: string;
};

export type FeedResponse = {
  posts: FeedPost[];
  loadMoreUrl: string;
  profile: ProfileData | null;
};

const EMPTY_FEED: FeedResponse = {
  posts: [],
  loadMoreUrl: "",
  profile: null,
};

function statCount(item: ParentNode, iconClass: string): number {
  const icon = item.querySelector(`.${iconClass}`);
  const statEl = icon?.closest(".tweet-stat");
  if (!statEl) return 0;

  const text = statEl.textContent?.trim() ?? "";
  const match = text.match(/([\d,]+)/);
  if (!match) return 0;

  const value = parseInt(match[1].replace(/,/g, ""), 10);
  return Number.isNaN(value) ? 0 : value;
}

function toAbsoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `https://${NITTER_HOST}${path.startsWith("/") ? path : `/${path}`}`;
}

async function resolveProfileFromHtml(
  html: string,
  username: string
): Promise<ProfileData | null> {
  const fromHtml = parseProfileFromNitterHtml(html, NITTER_HOST);
  if (fromHtml?.avatarUrl || fromHtml?.displayName) {
    return fromHtml;
  }

  return fetchProfileFromFxTwitter(username);
}

function parseTimelineHtml(html: string, profile: ProfileData | null = null): FeedResponse {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const timelineItems = doc.querySelectorAll(".timeline-item");
  const posts: FeedPost[] = [];

  timelineItems.forEach((item) => {
    const images: string[] = [];
    const tweetContent = item.querySelector(".tweet-content");
    const text = tweetContent?.textContent?.trim() ?? "";

    item.querySelectorAll(".still-image").forEach((img) => {
      const src = img.getAttribute("href");
      if (src) images.push(toAbsoluteUrl(src));
    });

    const statusLink = item.querySelector(".tweet-date a");
    const statusPath = statusLink?.getAttribute("href") ?? "";
    const timestamp = statusLink?.getAttribute("title") ?? "";

    if (!statusPath && !text && images.length === 0) {
      return;
    }

    posts.push({
      replies: statCount(item, "icon-comment"),
      retweets: statCount(item, "icon-retweet"),
      quotes: statCount(item, "icon-quote"),
      likes: statCount(item, "icon-heart"),
      text,
      html: tweetContent?.innerHTML ?? "",
      images,
      originalHtml: item.outerHTML,
      timestamp,
      statusUrl: statusPath ? toAbsoluteUrl(statusPath) : "",
    });
  });

  const loadMoreHref =
    doc.querySelector(".show-more a")?.getAttribute("href") ?? "";

  return {
    posts,
    loadMoreUrl: loadMoreHref,
    profile,
  };
}

export const feedExtract = async (
  username: string,
  search: string | null
): Promise<FeedResponse> => {
  try {
    const response = await fetch(
      `/api/nitter?username=${encodeURIComponent(username)}` +
        (search ? `&path=search&q=${encodeURIComponent(search)}` : "")
    );
    const data = await response.json();
    const profile = await resolveProfileFromHtml(data.html ?? "", username);

    return parseTimelineHtml(data.html ?? "", profile);
  } catch (error) {
    console.error("Error fetching feed:", error);
    return EMPTY_FEED;
  }
};

export const viewMore = async (
  username: string,
  loadMoreUrl: string
): Promise<FeedResponse> => {
  try {
    const response = await fetch(
      `/api/nitter?username=${encodeURIComponent(username)}${loadMoreUrl.replace("?f=tweets&", "&f=tweets&")}`
    );
    const data = await response.json();

    return parseTimelineHtml(data.html ?? "");
  } catch (error) {
    console.error("Error fetching feed:", error);
    return EMPTY_FEED;
  }
};

export function mergePosts(
  existing: FeedPost[],
  incoming: FeedPost[]
): FeedPost[] {
  const seen = new Set(existing.map((p) => p.statusUrl));
  const unique = incoming.filter((p) => p.statusUrl && !seen.has(p.statusUrl));
  return [...existing, ...unique];
}
