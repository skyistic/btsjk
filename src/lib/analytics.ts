import { track } from "@vercel/analytics";

type EventData = Record<string, string | number | boolean | null | undefined>;

export function trackClick(event: string, data?: EventData) {
  const payload = data
    ? Object.fromEntries(
        Object.entries(data).filter(([, value]) => value !== undefined)
      )
    : undefined;

  track(event, payload);
}
