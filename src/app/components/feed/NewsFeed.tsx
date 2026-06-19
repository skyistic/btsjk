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
import FeedError from "./FeedError";
import FeedHeader from "./FeedHeader";
import PostCard from "./PostCard";

export default function NewsFeed() {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loadMoreUrl, setLoadMoreUrl] = useState("");
  const [fetching, setFetching] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reachedEnd, setReachedEnd] = useState(false);

  const loadMoreRef = useRef<HTMLDivElement>(null);
  const loadingMoreRef = useRef(false);
  const loadMoreUrlRef = useRef("");

  useEffect(() => {
    loadMoreUrlRef.current = loadMoreUrl;
  }, [loadMoreUrl]);

  const fetchFeed = useCallback(async () => {
    setFetching(true);
    setError(null);
    setReachedEnd(false);

    try {
      const response = await feedExtract(NITTER_USERNAME, null);

      if (response.profile) {
        setProfile(response.profile);
      }

      setPosts(response.posts);
      setLoadMoreUrl(response.loadMoreUrl);
      setReachedEnd(!response.loadMoreUrl);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unknown error loading feed";
      setError(message);
      setPosts([]);
      setLoadMoreUrl("");
      setReachedEnd(true);
    } finally {
      setFetching(false);
    }
  }, []);

  const loadMore = useCallback(async () => {
    const url = loadMoreUrlRef.current;
    if (!url || loadingMoreRef.current || fetching) return;

    loadingMoreRef.current = true;
    setLoadingMore(true);

    try {
      const moreResponse = await viewMore(NITTER_USERNAME, url);
      setPosts((prev) => mergePosts(prev, moreResponse.posts));
      setLoadMoreUrl(moreResponse.loadMoreUrl);
      setReachedEnd(!moreResponse.loadMoreUrl);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load more posts";
      setError(message);
      setReachedEnd(true);
      setLoadMoreUrl("");
    } finally {
      loadingMoreRef.current = false;
      setLoadingMore(false);
    }
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

  if (error && posts.length === 0) {
    return (
      <div className="min-h-screen bg-black">
        <FeedError message={error} onRetry={fetchFeed} />
      </div>
    );
  }

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
