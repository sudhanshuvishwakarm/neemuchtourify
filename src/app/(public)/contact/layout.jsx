import { pageMetadata } from '@/lib/site.js';

export const metadata = pageMetadata({
  title: 'Contact Us',
  description: "Get in touch with Neemuch Tourify. Have a question about travel in Neemuch or need help planning your trip? Contact our team and we'll help you plan your journey.",
  path: '/contact',
});

export default function Layout({ children }) {
  return children;
}
