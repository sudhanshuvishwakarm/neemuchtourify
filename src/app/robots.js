import { SITE_URL } from '@/lib/site.js';

// /robots.txt — allow the public site, keep the admin panel and API out of
// search indexes, and point crawlers at the sitemap.
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/', '/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
