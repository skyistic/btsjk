import type { ProfileData } from "@/lib/nitter-profile";

const NITTER_HOST = process.env.NEXT_PUBLIC_NITTER_HOST ?? "nitter.net";
const NITTER_BASE = `https://${NITTER_HOST}`;

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex flex-col items-center gap-0.5 px-2">
      <span className="text-base font-bold text-white">{value}</span>
      <span className="text-xs text-neutral-500">{label}</span>
    </li>
  );
}

export default function FeedHeader({
  username,
  profile,
}: {
  username: string;
  profile: ProfileData | null;
}) {
  const profileUrl = `${NITTER_BASE}/${username}`;
  const displayName = profile?.displayName ?? "JK";
  const handle = profile?.username ?? username;

  return (
    <header className="border-b border-neutral-800 bg-neutral-950 px-4 py-6">
      <div className="mx-auto max-w-2xl">
        <div className="flex gap-5">
          {profile?.avatarUrl ? (
            <a
              href={profile.avatarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="profile-card-avatar shrink-0"
            >
              <img
                src={profile.avatarUrl}
                alt={displayName}
                className="h-20 w-20 rounded-full border border-neutral-700 object-cover"
              />
            </a>
          ) : (
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-neutral-800 text-2xl font-bold text-white">
              {displayName.charAt(0)}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-bold text-white">{displayName}</h1>
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-400 hover:underline"
            >
              @{handle}
            </a>

            {profile?.bioHtml ? (
              <div
                className="profile-bio mt-3 text-sm leading-relaxed text-neutral-200 [&_a]:text-sky-400 [&_a]:hover:underline [&_p+p]:mt-2"
                dangerouslySetInnerHTML={{ __html: profile.bioHtml }}
              />
            ) : (
              <p className="mt-3 text-sm text-neutral-500">Loading bio…</p>
            )}
          </div>
        </div>

        {profile?.stats && (
          <ul className="profile-statlist mt-5 flex justify-around border-t border-neutral-800 pt-4">
            <StatItem label="Tweets" value={profile.stats.posts} />
            <StatItem label="Following" value={profile.stats.following} />
            <StatItem label="Followers" value={profile.stats.followers} />
            <StatItem label="Likes" value={profile.stats.likes} />
          </ul>
        )}
      </div>
    </header>
  );
}
