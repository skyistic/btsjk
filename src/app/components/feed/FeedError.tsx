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
            onClick={onRetry}
            className="rounded-lg bg-neutral-800 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700"
          >
            Try again
          </button>
        )}
        <a
          href="https://nitter.net/mnijungkook_bts"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-500"
        >
          View on Nitter directly
        </a>
      </div>
    </div>
  );
}
