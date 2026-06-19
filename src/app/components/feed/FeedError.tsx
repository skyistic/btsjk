"use client";

import { trackClick } from "@/lib/analytics";

export default function FeedError({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <p className="text-lg font-medium text-white">Could not load the feed</p>
      <p className="mt-2 text-sm text-neutral-400">{message}</p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {onRetry && (
          <button
            type="button"
            onClick={() => {
              trackClick("error_retry_click");
              onRetry();
            }}
            className="rounded-lg bg-neutral-800 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}
