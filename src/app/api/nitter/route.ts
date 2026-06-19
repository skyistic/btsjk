import { NextRequest, NextResponse } from "next/server";

const NITTER_BASE = "https://nitter.tiekoetter.com";

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

function buildNitterUrl(query: NitterQuery): string {
  const { username, id, path, sort, q, f, since, until, near, cursor } = query;

  let url = NITTER_BASE;

  if (username) {
    url += `/${username}/search`;
  } else {
    url += "/search";
  }

  const searchParams = new URLSearchParams();

  if (q) searchParams.set("q", q);
  if (f) searchParams.set("f", f);
  if (since) searchParams.set("since", since);
  if (until) searchParams.set("until", until);
  if (near) searchParams.set("near", near);
  if (cursor) searchParams.set("cursor", cursor);

  const queryString = searchParams.toString();
  if (queryString) {
    url += url.includes("?") ? "&" : "?";
    url += queryString;
  }

  if (sort && !id && path !== "search") {
    url += url.includes("?") ? "&" : "?";
    url += `sort=${sort}`;
  }

  return url;
}

export async function GET(request: NextRequest) {
  const query = parseQuery(request.nextUrl.searchParams);
  const url = buildNitterUrl(query);

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
    const response = await fetch(url);
    const html = await response.text();

    return NextResponse.json({
      html,
      originalUrl: url,
      metadata,
    });
  } catch (error) {
    console.error("Error fetching from nitter:", error);
    return NextResponse.json(
      { error: "Failed to fetch content" },
      { status: 500 }
    );
  }
}
