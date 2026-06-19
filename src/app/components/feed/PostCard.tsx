import type { FeedPost } from "@/lib/feed";

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

export default function PostCard({ post }: { post: FeedPost }) {
  const embedUrl = post.statusUrl ? `${post.statusUrl}#m` : undefined;

  return (
    <article className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950">
      {post.images.length > 0 && (
        <div
          className={`grid gap-0.5 border-b border-neutral-800 ${
            post.images.length > 1 ? "grid-cols-2" : "grid-cols-1"
          }`}
        >
          {post.images.map((src, i) => (
            <div
              key={`${src}-${i}`}
            >
              <img
                src={src}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
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


      <div className="flex gap-5 px-4 py-3 text-xs text-neutral-500">
        <span className="hover:underline"><a target="_blank" rel="noopener noreferrer" href={`${post.statusUrl.replace('nitter.net', 'x.com')}`}> {formatCount(post.replies)} replies</a></span>
        <span className="hover:underline"><a target="_blank" rel="noopener noreferrer" href={`${post.statusUrl.replace('nitter.net', 'x.com')}`}>{formatCount(post.retweets)} reposts</a></span>
        <span className="hover:underline"><a target="_blank" rel="noopener noreferrer" href={`${post.statusUrl.replace('nitter.net', 'x.com')}`}>{formatCount(post.likes)} likes</a></span>
      </div>
    </article>
  );
}
