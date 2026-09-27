// Central site constants used for SEO (metadata, sitemap, robots, JSON-LD).
// Override the URL per environment with NEXT_PUBLIC_SITE_URL in your PM2 env.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://neemuchtourify.in').replace(/\/$/, '');

export const SITE_NAME = 'Neemuch Tourify';

export const SITE_DESCRIPTION =
  'Neemuch Tourify is your guide to Neemuch district, Madhya Pradesh — its cantonment heritage, temples, opium & alkaloid legacy, and the Malwa countryside around it. Plan your journey through Neemuch.';

// Default social/preview image — a 1200x630 JPG at /public/og-image.jpg.
// (JPG, not AVIF: WhatsApp/Facebook/Twitter/LinkedIn crawlers don't render
// AVIF previews.) Regenerate with _gen-seo-assets.cjs if the brand changes.
export const SITE_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

// Absolute URL helper.
export const absoluteUrl = (path = '') => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

// Build a complete per-page metadata object: page title, description, canonical
// URL, and matching OpenGraph + Twitter cards (Next shallow-merges metadata, so
// a page that sets openGraph must include the image itself — this centralises
// that). `absoluteTitle` bypasses the "%s | Neemuch Tourify" template for the home page.
export function pageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = '/',
  image = SITE_OG_IMAGE,
  type = 'website',
  absoluteTitle = false,
}) {
  const ogTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle,
      description,
      url: absoluteUrl(path),
      siteName: SITE_NAME,
      locale: 'en_IN',
      type,
      images: [{ url: image, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
      images: [image],
    },
  };
}
