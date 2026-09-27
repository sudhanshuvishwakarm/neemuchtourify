import FeaturedItinerary from "@/components/home/FeaturedItinerary";
import FestiveSeasons from "@/components/home/FestiveSeasons";
import HomeAbout from "@/components/home/HomeAbout";
import HomeHero from "@/components/home/HomeHero";
import HomeNavigationTiles from "@/components/home/HomeNavigationTiles";
import HomeStats from "@/components/home/HomeStats";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import { pageMetadata } from "@/lib/site.js";

export const metadata = pageMetadata({
  title: "Neemuch Tourify — Explore Neemuch, Madhya Pradesh",
  description:
    "Discover Neemuch with Neemuch Tourify — its cantonment heritage, temples, opium & alkaloid legacy, and the Malwa countryside around it. Plan your journey through Neemuch.",
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {

  return (
    <div className="hideExtra">
      <div id="top"><HomeHero/></div>
      <div id="about"><HomeAbout/></div>
      <HomeStats/>
      <div id="explore"><HomeNavigationTiles/></div>
      <div id="festivals"><FestiveSeasons/></div>
      <FeaturedItinerary/>
      <div id="reviews"><TestimonialsSection/></div>
      <WhyChooseUs/>
    </div>
  );
}

