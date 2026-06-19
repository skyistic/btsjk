export function isBotChallengePage(html: string): boolean {
  return (
    html.includes("anubis_challenge") ||
    html.includes("Making sure you&#39;re not a bot") ||
    html.includes("Making sure you're not a bot") ||
    (html.includes("Protected by") && html.includes("Anubis"))
  );
}

export function isValidTimelineHtml(html: string): boolean {
  return (
    html.includes("timeline-item") ||
    html.includes('class="timeline"') ||
    html.includes("<rss")
  );
}

export function isUsableNitterHtml(html: string): boolean {
  if (!html || html.length < 100) return false;
  if (isBotChallengePage(html)) return false;
  return isValidTimelineHtml(html);
}
