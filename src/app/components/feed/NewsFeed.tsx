"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  feedExtract,
  mergePosts,
  NITTER_USERNAME,
  viewMore,
  type FeedPost,
  type ProfileData,
} from "@/lib/feed";
import { trackClick } from "@/lib/analytics";
import FeedHeader from "./FeedHeader";
import PostCard from "./PostCard";

export default function NewsFeed() {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loadMoreUrl, setLoadMoreUrl] = useState("");
  const [fetching, setFetching] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [reachedEnd, setReachedEnd] = useState(false);

  const loadMoreRef = useRef<HTMLDivElement>(null);
  const loadingMoreRef = useRef(false);
  const loadMoreUrlRef = useRef("");

  useEffect(() => {
    loadMoreUrlRef.current = loadMoreUrl;
  }, [loadMoreUrl]);

  const fetchFeed = useCallback(async () => {
    setFetching(true);
    setReachedEnd(false);

    const response = await feedExtract(NITTER_USERNAME, null);

    if (response.profile) {
      setProfile(response.profile);
    }

    setPosts(response.posts);
    setLoadMoreUrl(response.loadMoreUrl);
    setReachedEnd(!response.loadMoreUrl);
    setFetching(false);
  }, []);

  const loadMore = useCallback(async () => {
    const url = loadMoreUrlRef.current;
    if (!url || loadingMoreRef.current || fetching) return;

    loadingMoreRef.current = true;
    setLoadingMore(true);

    const moreResponse = await viewMore(NITTER_USERNAME, url);
    trackClick("feed_load_more", {
      posts_loaded: moreResponse.posts.length,
      has_more: Boolean(moreResponse.loadMoreUrl),
    });
    setPosts((prev) => mergePosts(prev, moreResponse.posts));
    setLoadMoreUrl(moreResponse.loadMoreUrl);
    setReachedEnd(!moreResponse.loadMoreUrl);
    loadingMoreRef.current = false;
    setLoadingMore(false);
  }, [fetching]);

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  useEffect(() => {
    const sentinel = loadMoreRef.current;
    if (!sentinel || !loadMoreUrl || reachedEnd) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "300px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMoreUrl, reachedEnd, loadMore, posts.length]);

  return (
    <div className="min-h-screen bg-black text-white">
      <FeedHeader username={NITTER_USERNAME} profile={profile} />

      <main className="mx-auto max-w-2xl space-y-6 px-4 py-8">
        {fetching && posts.length === 0 ? (
          <p className="text-center text-neutral-400">Loading feed…</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-neutral-400">No posts found.</p>
        ) : (
          posts.map((post, i) => (
            <PostCard key={`${post.statusUrl}-${i}`} post={post} />
          ))
        )}

        <div ref={loadMoreRef} className="flex justify-center py-4">
          {loadingMore && (
            <p className="text-sm text-neutral-400">Loading more posts…</p>
          )}
          {!loadingMore && reachedEnd && posts.length > 0 && (
            <p className="text-sm text-neutral-500">You&apos;ve reached the end</p>
          )}
        </div>
      </main>
    </div>
  );
}
