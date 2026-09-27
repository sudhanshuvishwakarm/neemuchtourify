import { connectDB } from '@/dbConfig/dbConnect.js';
import GramPanchayat from '@/models/panchayatModel.js';
import { getNeemuchDistrict } from '@/lib/neemuchDistrict.js';
import { SITE_URL } from '@/lib/site.js';

export const revalidate = 3600;

// Home page + contact page are always present; panchayat pages are looked
// up live since they come from the shared database.
export default async function sitemap() {
  const now = new Date();

  const staticRoutes = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${SITE_URL}/panchayats`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
  ];

  let panchayatRoutes = [];
  try {
    await connectDB();
    const district = await getNeemuchDistrict();

    if (district) {
      const panchayats = await GramPanchayat.find({ district: district._id, status: 'Verified' })
        .select('slug updatedAt')
        .lean();

      panchayatRoutes = panchayats
        .filter((p) => p.slug)
        .map((p) => ({
          url: `${SITE_URL}/panchayats/${p.slug}`,
          lastModified: p.updatedAt || now,
          changeFrequency: 'monthly',
          priority: 0.7,
        }));
    }
  } catch (error) {
    console.error('Sitemap panchayat fetch failed:', error?.message || error);
  }

  return [...staticRoutes, ...panchayatRoutes];
}
