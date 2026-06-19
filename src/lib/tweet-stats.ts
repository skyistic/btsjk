const FETCH_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml",
};

export type TweetStats = {
  replies: number;
  retweets: number;
  quotes: number;
  likes: number;
};

const EMPTY_STATS: TweetStats = {
  replies: 0,
  retweets: 0,
  quotes: 0,
  likes: 0,
};

function parseStatFromHtml(html: string, icon: string): number {
  const re = new RegExp(
    `<span class="tweet-stat">\\s*<div class="icon-container">\\s*<span class="icon-${icon}"[^>]*>\\s*</span>\\s*</div>\\s*([\\d,]*)`,
    "i"
  );
  const match = html.match(re);
  if (!match?.[1]) return 0;
  const value = parseInt(match[1].replace(/,/g, ""), 10);
  return Number.isNaN(value) ? 0 : value;
}

export function parseStatsFromNitterHtml(html: string): TweetStats {
  return {
    replies: parseStatFromHtml(html, "comment"),
    retweets: parseStatFromHtml(html, "retweet"),
    quotes: parseStatFromHtml(html, "quote"),
    likes: parseStatFromHtml(html, "heart"),
  };
}

async function fetchStatsFromNitter(
  host: string,
  username: string,
  statusId: string
): Promise<TweetStats | null> {
  const paths = [
    `/${username}/status/${statusId}`,
    `/i/status/${statusId}`,
  ];

  for (const path of paths) {
    try {
      const response = await fetch(`https://${host}${path}`, {
        headers: FETCH_HEADERS,
        cache: "no-store",
      });
      const html = await response.text();
      if (html.length < 200) continue;

      const stats = parseStatsFromNitterHtml(html);
      if (stats.replies || stats.retweets || stats.likes || stats.quotes) {
        return stats;
      }
    } catch {
      continue;
    }
  }

  return null;
}

async function fetchStatsFromFxTwitter(
  username: string,
  statusId: string
): Promise<TweetStats | null> {
  try {
    const response = await fetch(
      `https://api.fxtwitter.com/${username}/status/${statusId}`,
      { cache: "no-store" }
    );
    if (!response.ok) return null;

    const data = await response.json();
    const tweet = data?.tweet;
    if (!tweet) return null;

    return {
      replies: tweet.replies ?? 0,
      retweets: tweet.retweets ?? 0,
      quotes: tweet.quotes ?? 0,
      likes: tweet.likes ?? 0,
    };
  } catch {
    return null;
  }
}

export async function fetchTweetStats(
  username: string,
  statusId: string,
  _host = process.env.NITTER_HOST ?? "nitter.net"
): Promise<TweetStats> {
  const fromFx = await fetchStatsFromFxTwitter(username, statusId);
  if (fromFx) return fromFx;

  return EMPTY_STATS;
}

export function formatStatNumber(n: number): string {
  return n > 0 ? n.toLocaleString("en-US") : "";
}

export function buildStatsHtml(stats: TweetStats): string {
  return `<div class="tweet-stats">
  <span class="tweet-stat"><div class="icon-container"><span class="icon-comment"></span></div>${formatStatNumber(stats.replies)}</span>
  <span class="tweet-stat"><div class="icon-container"><span class="icon-retweet"></span></div>${formatStatNumber(stats.retweets)}</span>
  <span class="tweet-stat"><div class="icon-container"><span class="icon-quote"></span></div>${formatStatNumber(stats.quotes)}</span>
  <span class="tweet-stat"><div class="icon-container"><span class="icon-heart"></span></div>${formatStatNumber(stats.likes)}</span>
</div>`;
}
