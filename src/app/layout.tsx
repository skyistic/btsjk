import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "@mnijungkook_bts — News Feed",
  description: "Latest posts from @mnijungkook_bts (Jung Kook of BTS)",
  metadataBase: new URL("https://mnijungkook.vercel.app"),
  openGraph: {
    type: "website",
    title: "@mnijungkook_bts — News Feed",
    description: "Latest posts from Jung Kook of BTS",
    siteName: "MNI Jungkook",
  },
  twitter: {
    card: "summary",
    title: "@mnijungkook_bts — News Feed",
    description: "Latest posts from Jung Kook of BTS",
    creator: "@mnijungkook_bts",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
