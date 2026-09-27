import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/site.js";

// Web app manifest, served at /manifest.webmanifest and auto-linked by Next.
export default function manifest() {
  return {
    name: `${SITE_NAME} — Explore Neemuch, Madhya Pradesh`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#117307",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
