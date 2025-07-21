import type { Metadata } from "next";
import { DM_Sans, Marck_Script } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const marckScript = Marck_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-marck-script",
});

export const metadata: Metadata = {
  title: "MNI Jungkook | Official Jungkook Fan Site | BTS Golden Maknae",
  description: "MNI Jungkook - Your ultimate destination for Jungkook content. Discover exclusive music, videos, and updates from BTS' Golden Maknae. From '3D' to 'Standing Next to You', explore Jungkook's solo journey.",
  keywords: [
    "mnijungkook",
    "mni jungkook", 
    "jungkook",
    "bts jungkook",
    "jeon jungkook",
    "golden maknae",
    "bts",
    "bangtan",
    "bangtan boys",
    "방탄소년단",
    "정국",
    "kpop",
    "korean music",
    "jungkook songs",
    "jungkook music",
    "jungkook videos",
    "standing next to you",
    "3d jungkook",
    "hate you jungkook",
    "seven jungkook",
    "golden album",
    "jungkook solo",
    "jungkook fan site",
    "big hit music",
    "hybe",
    "army"
  ].join(", "),
  authors: [{ name: "MNI Jungkook Fan Site" }],
  creator: "MNI Jungkook",
  publisher: "MNI Jungkook",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://mnijungkook.vercel.app'), // Replace with your actual domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'MNI Jungkook | Official Jungkook Fan Site | BTS Golden Maknae',
    description: 'MNI Jungkook - Your ultimate destination for Jungkook content. Discover exclusive music, videos, and updates from BTS\' Golden Maknae.',
    siteName: 'MNI Jungkook',
    images: [
      {
        url: '/logo.png', // Make sure this image exists
        width: 1200,
        height: 630,
        alt: 'MNI Jungkook - BTS Jungkook Fan Site',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MNI Jungkook | Official Jungkook Fan Site | BTS Golden Maknae',
    description: 'MNI Jungkook - Your ultimate destination for Jungkook content. Discover exclusive music, videos, and updates from BTS\' Golden Maknae.',
    images: ['/logo.png'],
    creator: '@mnijungkook',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Additional SEO tags */}
        <meta name="theme-color" content="#014131" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "MNI Jungkook",
              "url": "https://mnijungkook.vercel.app",
              "description": "Official Jungkook fan site featuring music, videos, and exclusive content from BTS' Golden Maknae",
              "inLanguage": "en-US",
              "about": {
                "@type": "Person",
                "name": "Jungkook",
                "alternateName": ["Jeon Jungkook", "정국", "Golden Maknae"],
                "description": "Main vocalist and youngest member of BTS",
                "memberOf": {
                  "@type": "MusicGroup",
                  "name": "BTS",
                  "alternateName": ["방탄소년단", "Bangtan Boys", "Bangtan Sonyeondan"]
                }
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://mnijungkook.vercel.app/?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className={`${dmSans.variable} ${marckScript.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
