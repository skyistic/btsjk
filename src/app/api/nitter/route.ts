import { NextRequest, NextResponse } from "next/server";
import { rssToTimelineHtml } from "@/lib/nitter-rss-fallback";
import { resolveProfile } from "@/lib/nitter-profile";

const DEFAULT_HOST = process.env.NITTER_HOST ?? "nitter.net";

const FETCH_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml",
  "Accept-Language": "en-US,en;q=0.9",
};

function hostUrl(host: string, path: string): string {
  return `https://${host}${path}`;
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const username = params.get("username");

  if (!username) {
    return NextResponse.json({ error: "username is required" }, { status: 400 });
  }

  const host = DEFAULT_HOST;
  const path = params.get("path");
  let url: string;

  if (path === "search") {
    const q = params.get("q") ?? "";
    url = hostUrl(host, `/search?f=tweets&q=${encodeURIComponent(q)}`);
  } else {
    const query = new URLSearchParams();
    params.forEach((value, key) => {
      if (key !== "username" && key !== "path") {
        query.set(key, value);
      }
    });
    const qs = query.toString();
    url = hostUrl(host, `/${username}${qs ? `?${qs}` : ""}`);
  }

  try {
    const response = await fetch(url, {
      headers: FETCH_HEADERS,
      cache: "no-store",
    });

    let html = response.ok ? await response.text() : "";
    const isPaginated = params.has("cursor") || params.has("max_id");

    if ((!html || html.length < 100) && !isPaginated) {
      const rssHtml = await rssToTimelineHtml(host, username);
      if (rssHtml) {
        html = rssHtml;
      } else if (!response.ok) {
        return NextResponse.json(
          { error: `Nitter returned ${response.status}` },
          { status: response.status }
        );
      } else if (isPaginated) {
        return NextResponse.json(
          { error: "No more posts available" },
          { status: 404 }
        );
      } else {
        return NextResponse.json(
          { error: "Empty response from Nitter" },
          { status: 502 }
        );
      }
    }

    const profile = await resolveProfile(html, host, username);

    return NextResponse.json({ html, profile });
  } catch {
    const rssHtml = await rssToTimelineHtml(host, username).catch(() => null);
    if (rssHtml) {
      const profile = await resolveProfile(rssHtml, host, username);
      return NextResponse.json({ html: rssHtml, profile });
    }

    return NextResponse.json(
      { error: "Failed to reach Nitter" },
      { status: 500 }
    );
  }
}
