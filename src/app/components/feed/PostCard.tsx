"use client";

import type { FeedPost } from "@/lib/feed";
import { trackClick } from "@/lib/analytics";

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

function toXUrl(statusUrl: string): string {
  return statusUrl.replace("nitter.net", "x.com").replace(/#m$/, "");
}

export default function PostCard({ post }: { post: FeedPost }) {
  const xUrl = post.statusUrl ? toXUrl(post.statusUrl) : "";

  const trackPostLink = (action: string) => {
    trackClick("post_engagement_click", {
      action,
      status_url: post.statusUrl,
    });
  };

  return (
    <article className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950">
      {post.images.length > 0 && (
        <div
          className={`grid gap-0.5 border-b border-neutral-800 ${
            post.images.length > 1 ? "grid-cols-2" : "grid-cols-1"
          }`}
        >
          {post.images.map((src, i) => (
            <a
              key={`${src}-${i}`}
              onClick={() =>
                trackClick("post_image_click", {
                  image_index: i,
                  status_url: post.statusUrl,
                })
              }
            >
              <img
                src={src}
                alt={`Jung Kook BTS post image ${i + 1}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </a>
          ))}
        </div>
      )}

      {post.text && (
        <div
          className="px-4 pt-3 text-sm leading-relaxed text-neutral-200"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      )}

      <div className="flex items-center justify-between border-b border-neutral-800 px-4 pt-1 pb-3">
        <time className="text-xs text-neutral-500">{post.timestamp}</time>
      </div>

      {xUrl && (
        <div className="flex gap-5 px-4 py-3 text-xs text-neutral-500">
          <a
            href={xUrl.replace('https://nitter.tiekoetter.com/', 'https://x.com/')}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            onClick={() => trackPostLink("replies")}
          >
            {formatCount(post.replies)} replies
          </a>
          <a
            href={xUrl.replace('https://nitter.tiekoetter.com/', 'https://x.com/')}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            onClick={() => trackPostLink("reposts")}
          >
            {formatCount(post.retweets)} reposts
          </a>
          <a
            href={xUrl.replace('https://nitter.tiekoetter.com/', 'https://x.com/')}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            onClick={() => trackPostLink("likes")}
          >
            {formatCount(post.likes)} likes
          </a>
        </div>
      )}
    </article>
  );
}
