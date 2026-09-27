// layout.jsx
import "./globals.css";
import TranslationProvider from "@/components/layouts/TranslationProvider.jsx";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SITE_OG_IMAGE } from "@/lib/site.js";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Explore Neemuch, Madhya Pradesh`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Neemuch tourism",
    "Neemuch Tourify",
    "Neemuch district Madhya Pradesh",
    "Neemuch fort",
    "Neemach Mata Temple",
    "opium and alkaloid works Neemuch",
    "Malwa region tourism",
    "travel Neemuch",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Explore Neemuch, Madhya Pradesh`,
    description: SITE_DESCRIPTION,
    images: [{ url: SITE_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Explore Neemuch, Madhya Pradesh`,
    description: SITE_DESCRIPTION,
    images: [SITE_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: "/favicon.ico",
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

// Next 15 wants theme-color / viewport in their own export.
export const viewport = {
  themeColor: "#117307",
  width: "device-width",
  initialScale: 1,
};

// Site-wide structured data: Organization + WebSite (with sitelinks search).
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.avif`,
      description: SITE_DESCRIPTION,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-IN",
    },
  ],
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <TranslationProvider>
          {children}
        </TranslationProvider>
      </body>
    </html>
  );
}
