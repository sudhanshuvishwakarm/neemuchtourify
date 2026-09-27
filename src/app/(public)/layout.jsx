import HomeHero from "@/components/home/HomeHero";
import ClientAosWrapper from "@/components/layouts/ClientAosWrapper";
import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";
import SmoothScroll from "@/components/layouts/SmoothScroll";
export const metadata = {
  title: "Neemuch Tourify - Discover Neemuch, Madhya Pradesh",
  description: "Digital tourism guide to Neemuch district. Explore its cantonment heritage, temples, opium & alkaloid legacy, and the countryside of the Malwa-Rajasthan border."
};

export default async function RootLayout({ children }) {
  return (
      <ClientAosWrapper>
        <Navbar />
        {/* <HomeHero/> */}
            {children}
        <Footer />
        <SmoothScroll/>
      </ClientAosWrapper>
  );
}