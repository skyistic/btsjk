import { NextRequest, NextResponse } from "next/server";
import { rssToTimelineHtmlWithFallback } from "@/lib/nitter-rss-fallback";
import { resolveProfile } from "@/lib/nitter-profile";
import { isBotChallengePage, isUsableNitterHtml } from "@/lib/nitter-html";

const NITTER_BASE = process.env.NITTER_HOST ?? "https://nitter.tiekoetter.com";

const FETCH_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml",
  "Accept-Language": "en-US,en;q=0.9",
};

const RESERVED_PARAMS = new Set([
  "username",
  "id",
  "path",
  "sort",
  "q",
  "f",
  "since",
  "until",
  "near",
  "cursor",
]);

type NitterQuery = {
  username: string | null;
  id: string | null;
  path: string | null;
  sort: string | null;
  q: string | null;
  f: string | null;
  since: string | null;
  until: string | null;
  near: string | null;
  cursor: string | null;
};

function getBaseUrl(): string {
  return NITTER_BASE.replace(/\/$/, "");
}

function parseQuery(params: URLSearchParams): NitterQuery {
  return {
    username: params.get("username"),
    id: params.get("id"),
    path: params.get("path"),
    sort: params.get("sort"),
    q: params.get("q"),
    f: params.get("f"),
    since: params.get("since"),
    until: params.get("until"),
    near: params.get("near"),
    cursor: params.get("cursor"),
  };
}

function buildNitterUrl(
  query: NitterQuery,
  requestParams: URLSearchParams
): string {
  const base = getBaseUrl();
  const { username, id, path, sort, q, f, since, until, near, cursor } = query;
  const isSearch = path === "search" || Boolean(q);

  let url: string;

  if (id && username) {
    url = `${base}/${username}/status/${id}`;
  } else if (isSearch) {
    url = username ? `${base}/${username}/search` : `${base}/search`;
  } else if (username) {
    url = `${base}/${username}`;
  } else {
    url = `${base}/search`;
  }

  const searchParams = new URLSearchParams();

  if (q) searchParams.set("q", q);
  if (f) searchParams.set("f", f);
  if (since) searchParams.set("since", since);
  if (until) searchParams.set("until", until);
  if (near) searchParams.set("near", near);
  if (cursor) searchParams.set("cursor", cursor);

  requestParams.forEach((value, key) => {
    if (!RESERVED_PARAMS.has(key) && !searchParams.has(key)) {
      searchParams.set(key, value);
    }
  });

  if (sort && !id && path !== "search") {
    searchParams.set("sort", sort);
  }

  const queryString = searchParams.toString();
  if (queryString) {
    url += url.includes("?") ? "&" : "?";
    url += queryString;
  }

  return url;
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const query = parseQuery(params);
  const url = buildNitterUrl(query, params);
  const host = new URL(url).host;

  const metadata = {
    username: query.username,
    id: query.id,
    path: query.path,
    sort: query.sort,
    search: {
      q: query.q,
      f: query.f,
      since: query.since,
      until: query.until,
      near: query.near,
      cursor: query.cursor,
    },
    url,
  };

  try {
    const response = await fetch(url, {
      headers: FETCH_HEADERS,
      cache: "no-store",
    });

    let html = response.ok ? await response.text() : "";
    const isPaginated = Boolean(query.cursor || params.has("max_id"));

    if (!isUsableNitterHtml(html) && !isPaginated && query.username) {
      const rssHtml = await rssToTimelineHtmlWithFallback(host, query.username);
      if (rssHtml) {
        html = rssHtml;
      }
    }

    if (!isUsableNitterHtml(html)) {
      const status = response.ok ? 502 : response.status;
      const error = !html || html.length < 100
        ? "Empty response from Nitter"
        : isBotChallengePage(html)
          ? "Nitter bot protection blocked the request"
          : "No timeline content in Nitter response";

      return NextResponse.json({ error, originalUrl: url, metadata }, { status });
    }

    const profile = query.username
      ? await resolveProfile(html, host, query.username)
      : null;

    return NextResponse.json({
      html,
      originalUrl: url,
      metadata,
      profile,
    });
  } catch (error) {
    console.error("Error fetching from nitter:", error);

    if (query.username) {
      try {
        const rssHtml = await rssToTimelineHtmlWithFallback(host, query.username);
        if (rssHtml) {
          const profile = await resolveProfile(rssHtml, host, query.username);
          return NextResponse.json({
            html: rssHtml,
            originalUrl: url,
            metadata,
            profile,
          });
        }
      } catch {
        // fall through
      }
    }

    return NextResponse.json(
      { error: "Failed to fetch content", originalUrl: url, metadata },
      { status: 500 }
    );
  }
}
