"use client";

/**
 * NEEMUCH TOURIFY — Featured Itinerary Banner (split layout: text panel + video carousel)
 * Next.js App Router · JavaScript · Tailwind CSS · Framer Motion
 *
 * Desktop / lg breakpoint (primary target):
 *   ┌───────────────┬─────────────────────────────────────────┐
 *   │  LEFT  (30%)  │  RIGHT (70%)                             │
 *   │  solid green  │  autoplaying video (or image fallback)   │
 *   │  text panel   │  + thumbnail strip + prev/next controls  │
 *   └───────────────┴─────────────────────────────────────────┘
 * Below `lg` the two panels stack (text on top, media below) so it still
 * works on small screens, but the layout is built for desktop first.
 *
 * No more image + gradient-scrim-for-legibility trick — text now sits on a
 * flat brand-green panel, so it's always readable regardless of the media.
 * Video no longer opens in a lightbox; it autoplays directly in the right
 * panel and swaps whenever a thumbnail / arrow changes the active slide.
 *
 * Brand colors: #127407 (panel green) · #117307 (accent green) · #A16C21 (gold)
 */

import { useState } from "react";
import { Clock, ArrowRight, ChevronLeft, ChevronRight, Play, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Brand tokens                                                       */
/* ------------------------------------------------------------------ */
const PANEL_GREEN = "#127407"; // left text panel background
const GREEN = "#117307";       // accent line / eyebrow label
const GOLD = "#A16C21";
const CREAM = "#f5fbf2";
const SERIF = "'Playfair Display', serif";
const SANS = "'Poppins', system-ui, sans-serif";

/* ------------------------------------------------------------------ */
/*  Motion presets                                                     */
/* ------------------------------------------------------------------ */
const SPRING = { type: "spring", stiffness: 130, damping: 20, mass: 0.9 };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } };
const rise = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: SPRING } };
const mediaFade = {
  enter: { opacity: 0, scale: 1.04 },
  center: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1 },
};
const thumbContainer = { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } } };
const thumbItem = { hidden: { opacity: 0, y: 12, scale: 0.9 }, show: { opacity: 1, y: 0, scale: 1, transition: SPRING } };

/* ------------------------------------------------------------------ */
/*  Data — each place carries its own details + media                  */
/* ------------------------------------------------------------------ */
const places = [
  { id: "p1", label: "Featured Itinerary", title: "The Cantonment & Fort Trail", duration: "2 Days · 1 Night", tags: ["Heritage", "History", "Fort"], description: "Walk through Neemuch's British-era cantonment and stand atop Neemuch Fort, guardians of the Malwa frontier since 1817.", price: "₹4,999", unit: "/ person", place: "Neemuch Fort", img: "/assets/home/itinerary/1.png", hasVideo: true },
  { id: "p2", label: "Temple Circuit", title: "Sacred Neemuch", duration: "1 Day", tags: ["Spiritual", "Temples", "Devotion"], description: "Visit Neemach Mata Temple and Kileshwar Temple, the spiritual heart of the district.", price: "₹2,499", unit: "/ person", place: "Neemach Mata Temple", img: "/assets/home/itinerary/2.png", hasVideo: true },
  { id: "p3", label: "Living Heritage", title: "The Opium & Alkaloid Legacy", duration: "Half Day", tags: ["Heritage", "Unique", "History"], description: "Discover the story of one of only two Government Opium & Alkaloid Works in India, a legacy dating back to 1935.", price: "₹1,999", unit: "/ person", place: "Opium & Alkaloid Works", img: "/assets/home/itinerary/3.png", hasVideo: false },
  { id: "p4", label: "Peace & Heritage", title: "Sukhnand Teerth Dham", duration: "1 Day", tags: ["Jain", "Pilgrimage", "Calm"], description: "Experience the tranquil beauty and spiritual depth of Sukhnand Teerth Dham in Jawad tehsil.", price: "₹1,499", unit: "/ person", place: "Sukhnand Teerth Dham", img: "/assets/home/itinerary/4.png", hasVideo: true },
  { id: "p5", label: "Ancient Stone", title: "The Temples of Jiran", duration: "1 Day", tags: ["Ancient", "Ruins", "Architecture"], description: "Wander among Jiran's eighth-century temple ruins, carved stone that has stood for over a thousand years.", price: "₹1,999", unit: "/ person", place: "Jiran Temple", img: "/assets/home/itinerary/6.png", hasVideo: false },
  { id: "p6", label: "Ancient Canvas", title: "Bharda Khoh & Rock Art", duration: "1 Day", tags: ["Nature", "Prehistoric", "Adventure"], description: "Explore the wild beauty of the Kanjarda plateau and its notable prehistoric rock paintings at Bharda Khoh.", price: "₹1,799", unit: "/ person", place: "Bharda Khoh", img: "/assets/home/itinerary/6.png", hasVideo: true },
];

const VIDEO_SRC = "/assets/home/itinerary/vid.mp4";

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function FeaturedItineraryBanner() {
  const [active, setActive] = useState(0);
  const item = places[active];

  const paginate = (d) => setActive((i) => (i + d + places.length) % places.length);
  const select = (i) => setActive(i);

  return (
    <section className="w-full px-4 py-10 sm:px-6 sm:py-14" style={{ fontFamily: SANS, backgroundColor: CREAM }}>
      <div className="mx-auto max-w-[84rem]">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={SPRING}
          className="mb-5 flex items-center gap-3"
        >
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ backgroundColor: GOLD, transformOrigin: "left" }}
            className="h-px w-8"
          />
          <span className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: GREEN }}>Curated Journeys</span>
        </motion.div>

        {/* ============================================================ */}
        {/*  BANNER CARD — split 30 / 70 on desktop, stacked below lg     */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5 lg:h-[460px] lg:flex-row"
        >
          {/* -------- LEFT: text panel — 30% on desktop ---------------- */}
          <div
            className="relative flex w-full flex-col justify-center p-7 sm:p-9 lg:h-full lg:w-[30%] lg:p-10"
            style={{ backgroundColor: PANEL_GREEN }}
          >
            <AnimatePresence mode="wait">
              <motion.div key={item.id} variants={stagger} initial="hidden" animate="show" exit={{ opacity: 0, y: -10 }}>
                <motion.span
                  variants={rise}
                  className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white"
                  style={{ backgroundColor: GOLD }}
                >
                  <motion.span
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
                    className="inline-flex"
                  >
                    <Star className="h-3 w-3" fill="white" />
                  </motion.span>
                  {item.label}
                </motion.span>

                <motion.h2
                  variants={rise}
                  className="text-white"
                  style={{ fontFamily: SERIF, fontSize: "clamp(1.5rem,2.1vw,2.1rem)", lineHeight: 1.1 }}
                >
                  {item.title}
                </motion.h2>

                <motion.div variants={rise} className="mt-2 flex items-center gap-2 text-sm text-white/85">
                  <Clock className="h-4 w-4" style={{ color: "#EBD9B8" }} /> {item.duration}
                </motion.div>

                <motion.div variants={rise} className="mt-3 flex flex-wrap gap-2">
                  {item.tags.map((t) => (
                    <span key={t} className="rounded-full border border-white/40 px-3 py-0.5 text-xs font-medium text-white/95">{t}</span>
                  ))}
                </motion.div>

                <motion.p variants={rise} className="mt-3 text-sm leading-relaxed text-white/80 lg:line-clamp-3">
                  {item.description}
                </motion.p>

                <motion.div variants={rise} className="mt-5 flex flex-wrap items-center gap-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold text-white" style={{ fontFamily: SERIF }}>{item.price}</span>
                    <span className="text-sm text-white/75">{item.unit}</span>
                  </div>
                  <motion.button
                    type="button"
                    whileHover={{ y: -2, scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-md"
                    style={{ backgroundColor: GOLD }}
                  >
                    Explore Itinerary
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </motion.button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* -------- RIGHT: media carousel — 70% on desktop ------------ */}
          <div className="relative h-[300px] w-full overflow-hidden bg-black sm:h-[360px] lg:h-full lg:w-[70%]">
            <AnimatePresence mode="popLayout">
              {item.hasVideo ? (
                <motion.video
                  key={item.id}
                  variants={mediaFade}
                  initial="enter" animate="center" exit="exit"
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 h-full w-full object-cover"
                  src={VIDEO_SRC}
                  poster={item.img}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                />
              ) : (
                <motion.img
                  key={item.id}
                  variants={mediaFade}
                  initial="enter" animate="center" exit="exit"
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 h-full w-full object-cover"
                  src={item.img}
                  alt={item.place}
                />
              )}
            </AnimatePresence>

            {/* bottom scrim so controls + thumbnails stay legible over any media */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 to-transparent" />

            {/* prev / next */}
            <motion.button
              type="button" onClick={() => paginate(-1)} aria-label="Previous itinerary"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              className="absolute left-4 top-[42%] z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-gray-800 shadow-md hover:bg-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>
            <motion.button
              type="button" onClick={() => paginate(1)} aria-label="Next itinerary"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-4 top-[42%] z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-gray-800 shadow-md hover:bg-white"
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>

            {/* thumbnail strip — the "boxes" used to switch slides */}
            <motion.div
              variants={thumbContainer}
              initial="hidden"
              animate="show"
              className="absolute inset-x-4 bottom-4 z-20 flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {places.map((p, i) => {
                const isActive = i === active;
                return (
                  <motion.button
                    key={p.id} type="button" onClick={() => select(i)} aria-label={`Show ${p.title}`}
                    variants={thumbItem}
                    animate={isActive ? { scale: 1.06 } : { scale: 1 }}
                    whileHover={{ scale: 1.08, y: -2 }} whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative h-14 w-20 shrink-0 overflow-hidden rounded-lg sm:h-16 sm:w-24"
                    style={{ boxShadow: isActive ? `0 0 0 3px ${GOLD}` : `0 0 0 2px rgba(255,255,255,0.55)` }}
                  >
                    <img src={p.img} alt={p.place} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className={`absolute inset-0 transition-colors ${isActive ? "bg-black/0" : "bg-black/25 group-hover:bg-black/10"}`} />
                    {p.hasVideo && (
                      <span className="absolute bottom-1 right-1 flex h-4 w-4 items-center justify-center rounded-full" style={{ backgroundColor: GOLD }}>
                        <Play className="h-2 w-2 text-white" fill="white" />
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}