import { writeFileSync } from "fs";

const res = await fetch(
  "https://syndication.twitter.com/srv/timeline-profile/screen-name/mnijungkook_bts",
  { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" } }
);
const html = await res.text();
console.log("status", res.status, "len", html.length);
console.log("has timeline-item", html.includes("timeline-item"));
console.log("has tweet", html.includes("tweet"));
const scripts = [...html.matchAll(/<script[^>]*id="([^"]*)"[^>]*>/g)].map((m) => m[1]);
console.log("script ids", scripts.slice(0, 20));
writeFileSync("tmp-syndication.html", html.slice(0, 5000));
