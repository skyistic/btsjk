import { isBotChallengePage } from "@/lib/nitter-html";

const FETCH_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml",
};

export type ProfileStats = {
  posts: string;
  following: string;
  followers: string;
  likes: string;
};

export type ProfileData = {
  avatarUrl: string;
  displayName: string;
  username: string;
  bioHtml: string;
  stats: ProfileStats;
};

function toAbsoluteUrl(path: string, host: string): string {
  if (path.startsWith("http")) return path;
  return `https://${host}${path.startsWith("/") ? path : `/${path}`}`;
}

function formatNum(n: number): string {
  return n.toLocaleString("en-US");
}

function statFromHtml(html: string, cls: string): string {
  const match = html.match(
    new RegExp(
      `<li class="${cls}"[^>]*>[\\s\\S]*?class="profile-stat-num"[^>]*>\\s*([^<]+)`,
      "i"
    )
  );
  return match?.[1]?.trim() ?? "0";
}

export function parseProfileFromNitterHtml(
  html: string,
  host = "nitter.net"
): ProfileData | null {
  if (!html.includes("profile-card")) return null;

  const avatarMatch = html.match(
    /class="profile-card-avatar"[^>]*>[\s\S]*?<img[^>]+src="([^"]+)"/i
  );
  const fullnameMatch = html.match(
    /class="profile-card-fullname"[^>]*>([^<]+)</i
  );
  const usernameMatch = html.match(
    /class="profile-card-username"[^>]*>([^<]+)</i
  );
  const bioMatch = html.match(
    /class="profile-bio"[^>]*>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/i
  );

  if (!avatarMatch && !fullnameMatch && !bioMatch) return null;

  const rawUsername =
    usernameMatch?.[1]?.trim().replace(/^@/, "") ?? "";
  const displayName = fullnameMatch?.[1]?.trim() ?? rawUsername;

  return {
    avatarUrl: avatarMatch
      ? toAbsoluteUrl(avatarMatch[1], host)
      : "",
    displayName,
    username: rawUsername,
    bioHtml: bioMatch?.[1]?.trim() ?? "",
    stats: {
      posts: statFromHtml(html, "posts"),
      following: statFromHtml(html, "following"),
      followers: statFromHtml(html, "followers"),
      likes: statFromHtml(html, "likes"),
    },
  };
}

export async function fetchProfileFromFxTwitter(
  username: string,
  statusId?: string
): Promise<ProfileData | null> {
  try {
    let author: Record<string, unknown> | undefined;

    if (statusId) {
      const res = await fetch(
        `https://api.fxtwitter.com/${username}/status/${statusId}`,
        { cache: "no-store" }
      );
      if (res.ok) {
        const data = await res.json();
        author = data?.tweet?.author;
      }
    }

    if (!author) {
      const rssRes = await fetch(`https://nitter.net/${username}/rss`, {
        headers: {
          "User-Agent": FETCH_HEADERS["User-Agent"],
          Accept: "application/rss+xml",
        },
        cache: "no-store",
      });
      if (rssRes.ok) {
        const xml = await rssRes.text();
        const id = xml.match(/status\/(\d+)/)?.[1];
        if (id) {
          const res = await fetch(
            `https://api.fxtwitter.com/${username}/status/${id}`,
            { cache: "no-store" }
          );
          if (res.ok) {
            const data = await res.json();
            author = data?.tweet?.author;
          }
        }
      }
    }

    if (!author) return null;

    const rawDesc = author.raw_description as
      | { text?: string; facets?: Array<{ type?: string; original?: string; replacement?: string; display?: string }> }
      | undefined;

    let bioHtml = "";
    if (rawDesc?.text) {
      let text = rawDesc.text;
      const facets = [...(rawDesc.facets ?? [])].sort(
        (a, b) => (b.original?.length ?? 0) - (a.original?.length ?? 0)
      );
      for (const facet of facets) {
        if (facet.type === "url" && facet.original && facet.replacement) {
          text = text.replace(
            facet.original,
            `<a href="${facet.replacement}" target="_blank" rel="noopener noreferrer">${facet.display ?? facet.replacement}</a>`
          );
        }
      }
      bioHtml = text
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => `<p>${line}</p>`)
        .join("");
    } else if (typeof author.description === "string") {
      bioHtml = author.description
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => `<p>${line}</p>`)
        .join("");
    }

    const tweets =
      (author.statuses_count as number | undefined) ??
      (author.tweets as number | undefined) ??
      (author.media_count as number | undefined) ??
      0;

    return {
      avatarUrl: (author.avatar_url as string) ?? "",
      displayName: (author.name as string) ?? username,
      username: (author.screen_name as string) ?? username,
      bioHtml,
      stats: {
        posts: formatNum(tweets),
        following: formatNum((author.following as number) ?? 0),
        followers: formatNum((author.followers as number) ?? 0),
        likes: formatNum((author.likes as number) ?? 0),
      },
    };
  } catch {
    return null;
  }
}

export async function resolveProfile(
  html: string,
  host: string,
  username: string
): Promise<ProfileData | null> {
  let fromPage: ProfileData | null = null;

  if (!isBotChallengePage(html)) {
    fromPage = parseProfileFromNitterHtml(html, host);
    if (fromPage?.avatarUrl || fromPage?.displayName) return fromPage;
  }

  try {
    const response = await fetch(`https://${host}/${username}`, {
      headers: FETCH_HEADERS,
      cache: "no-store",
    });
    const profileHtml = await response.text();
    if (profileHtml.length > 200 && !isBotChallengePage(profileHtml)) {
      const fromProfilePage = parseProfileFromNitterHtml(profileHtml, host);
      if (fromProfilePage) return fromProfilePage;
    }
  } catch {
    // fall through
  }

  if (fromPage) return fromPage;

  return fetchProfileFromFxTwitter(username);
}
