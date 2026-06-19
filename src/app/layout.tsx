import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const SITE_URL = "https://mnijungkook.vercel.app";
const SITE_NAME = "MNI Jungkook";

const SEO_KEYWORDS = [
  "jungkook",
  "jeon jungkook",
  "jk",
  "bts",
  "bangtan",
  "bangtan sonyeondan",
  "kpop",
  "k-pop",
  "golden maknae",
  "bts jungkook",
  "jung kook",
  "bts news",
  "jungkook updates",
  "jungkook fan site",
  "army",
  "bts army",
  "mnijungkook",
  "jungkook bts",
  "bts member",
  "hybe",
  "bts updates",
  "kpop news",
].join(", ");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Jung Kook (JK) News Feed | BTS Golden Maknae Updates",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Latest Jung Kook (JK) updates from BTS. A fan news feed for ARMY — K-pop news, posts, photos, and moments from BTS' Golden Maknae, Jeon Jungkook.",
  keywords: SEO_KEYWORDS,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  applicationName: SITE_NAME,
  category: "K-pop",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon-32x32.png"],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Jung Kook (JK) News Feed | BTS Golden Maknae",
    description:
      "Follow Jung Kook of BTS — latest posts, updates, and news for ARMY and K-pop fans.",
    images: [
      {
        url: "/android-chrome-192x192.png",
        width: 192,
        height: 192,
        alt: "MNI Jungkook — Jung Kook BTS fan site",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Jung Kook (JK) News Feed | BTS Golden Maknae",
    description:
      "Latest Jung Kook updates for BTS ARMY and K-pop fans.",
    creator: "@mnijungkook_bts",
    site: "@mnijungkook_bts",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "theme-color": "#000000",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      description:
        "Jung Kook (JK) of BTS — fan news feed with latest updates for K-pop and ARMY fans.",
      inLanguage: "en-US",
      about: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Jung Kook",
      alternateName: [
        "Jeon Jungkook",
        "JK",
        "정국",
        "Golden Maknae",
      ],
      description: "Main vocalist and youngest member of BTS (Bangtan Sonyeondan)",
      memberOf: {
        "@type": "MusicGroup",
        name: "BTS",
        alternateName: [
          "Bangtan Boys",
          "Bangtan Sonyeondan",
          "방탄소년단",
        ],
      },
      sameAs: [
        "https://x.com/mnijungkook_bts",
        "https://www.tiktok.com/@jungkook",
      ],
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: "Jung Kook (JK) News Feed",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#person` },
      description:
        "Live news feed of Jung Kook posts and updates for BTS and K-pop fans.",
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
