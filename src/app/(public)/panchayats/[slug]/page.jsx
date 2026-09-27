import { connectDB } from '@/dbConfig/dbConnect.js';
import GramPanchayat from '@/models/panchayatModel.js';
import { getNeemuchDistrict } from '@/lib/neemuchDistrict.js';
import PanchayatDetailClient from './PanchayatDetailClient.jsx';
import { SITE_URL, SITE_NAME, SITE_OG_IMAGE } from '@/lib/site.js';

export const revalidate = 300;

async function getPanchayat(slug) {
  try {
    await connectDB();
    const district = await getNeemuchDistrict();
    if (!district) return null;

    // Scoped to the Neemuch district id — a panchayat slug from any other
    // district in the shared database will not resolve here.
    return await GramPanchayat.findOne({
      slug: slug.toLowerCase(),
      district: district._id,
      status: 'Verified',
    })
      .populate('district', 'name slug')
      .lean();
  } catch (error) {
    console.error('Panchayat detail fetch failed:', error?.message || error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = await getPanchayat(slug);
  if (!p) return { title: 'Panchayat not found', robots: { index: false, follow: true } };

  const description =
    p.culturalInfo?.historicalBackground?.slice(0, 300) ||
    `Explore ${p.name} gram panchayat in ${p.block}, Neemuch — culture, geography, services and travel information on Neemuch Tourify.`;
  const image = p.headerImage || SITE_OG_IMAGE;

  return {
    title: `${p.name} — Neemuch`,
    description,
    alternates: { canonical: `/panchayats/${slug}` },
    openGraph: {
      type: 'article',
      title: `${p.name}, Neemuch`,
      description,
      url: `${SITE_URL}/panchayats/${slug}`,
      siteName: SITE_NAME,
      images: [{ url: image, alt: p.name }],
    },
    twitter: { card: 'summary_large_image', title: p.name, description, images: [image] },
  };
}

export default async function PanchayatDetailPage({ params }) {
  const { slug } = await params;
  const p = await getPanchayat(slug);

  const jsonLd = p
    ? {
        '@context': 'https://schema.org',
        '@type': 'TouristAttraction',
        name: p.name,
        description:
          p.culturalInfo?.historicalBackground?.slice(0, 300) ||
          `${p.name} gram panchayat in Neemuch, Madhya Pradesh.`,
        image: p.headerImage || undefined,
        address: {
          '@type': 'PostalAddress',
          addressRegion: 'Madhya Pradesh',
          addressLocality: 'Neemuch',
          addressCountry: 'IN',
        },
        geo:
          p.coordinates?.lat != null && p.coordinates?.lng != null
            ? { '@type': 'GeoCoordinates', latitude: p.coordinates.lat, longitude: p.coordinates.lng }
            : undefined,
        url: `${SITE_URL}/panchayats/${slug}`,
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
      <PanchayatDetailClient panchayat={p ? JSON.parse(JSON.stringify(p)) : null} />
    </>
  );
}
