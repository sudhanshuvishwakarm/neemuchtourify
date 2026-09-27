import { Suspense } from 'react';
import { connectDB } from '@/dbConfig/dbConnect.js';
import GramPanchayat from '@/models/panchayatModel.js';
import { getNeemuchDistrict } from '@/lib/neemuchDistrict.js';
import { pageMetadata } from '@/lib/site.js';
import PanchayatListClient from './PanchayatListClient.jsx';

export const metadata = pageMetadata({
  title: 'Gram Panchayats of Neemuch',
  description:
    'Discover gram panchayats across Neemuch district — authentic villages, traditions, geography and rural tourism experiences, mapped on Neemuch Tourify.',
  path: '/panchayats',
});

// ISR: the page HTML + data are regenerated at most once every 5 minutes.
export const revalidate = 300;

async function getInitialData() {
  try {
    await connectDB();
    const district = await getNeemuchDistrict();
    if (!district) return { panchayats: [] };

    const panchayats = await GramPanchayat.find({ district: district._id, status: 'Verified' })
      .select('name slug block coordinates headerImage basicInfo status district')
      .populate('district', 'name slug')
      .sort({ name: 1 })
      .lean();

    // Fully serialize (ObjectId/Date -> string) for the client component.
    return { panchayats: JSON.parse(JSON.stringify(panchayats)) };
  } catch (error) {
    console.error('Panchayat page data fetch failed:', error?.message || error);
    return { panchayats: [] };
  }
}

export default async function PanchayatPage() {
  const { panchayats } = await getInitialData();

  return (
    <Suspense fallback={null}>
      <PanchayatListClient initialPanchayats={panchayats} />
    </Suspense>
  );
}
