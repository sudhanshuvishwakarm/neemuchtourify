import District from '@/models/districtModel.js';

// This site shares mptourify's database but only ever shows Neemuch's own
// panchayats — every panchayat query is scoped to this district's _id,
// resolved by its (unique, indexed) slug rather than a hardcoded ObjectId.
export async function getNeemuchDistrict() {
  return District.findOne({ slug: 'neemuch' }).select('_id name slug').lean();
}
