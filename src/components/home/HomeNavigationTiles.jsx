"use client";

/**
 * Neemuch — "Explore the Magic" Bento Section
 * Responsive across all breakpoints · logo colors (#127407 green, #A16C21 gold)
 * Desktop (lg) bento layout left intact; small screens use per-card aspect ratios.
 */

import {
  Landmark,
  Trees,
  Bird,
  Waves,
  Building2,
  Palette,
  Mountain,
  Compass,
  Sparkles,
  Utensils,
  Music,
  HandHeart,
  Gem,
  Leaf,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Design tokens — logo palette                                       */
/* ------------------------------------------------------------------ */
const CREAM = "#f5fbf2";
const GREEN = "#127407";      // logo green (primary)
const GREEN_DARK = "#0e5c05"; // deep green (button text)
const GOLD = "#A16C21";       // logo gold (accent)
const INK = "#2B2A26";
const MUTED = "#8A867B";

const SERIF = "'Playfair Display', serif";
const SCRIPT = "'Great Vibes', cursive";
const SANS = "'Poppins', system-ui, sans-serif";

/* ------------------------------------------------------------------ */
/*  Motion presets                                                     */
/* ------------------------------------------------------------------ */
const SPRING = { type: "spring", stiffness: 120, damping: 18, mass: 0.9 };
const container = { hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } } };
const cell = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: SPRING } };
const chipVariant = { hidden: { opacity: 0, y: 14, scale: 0.9 }, show: { opacity: 1, y: 0, scale: 1, transition: SPRING } };

/* ------------------------------------------------------------------ */
/*  Data — `ratio` now also carries base-grid col-span + order (both    */
/*  reset via md:order-none / md:col-span-1 so md and lg are untouched  */
/*  from the original design). Base grid is 6 columns so the top 6      */
/*  destination cards (col-span-3) form 2-per-row, and Tawa/Tribal/     */
/*  Sanchi (col-span-2) form 3-per-row — matching the uploaded mockup.  */
/* ------------------------------------------------------------------ */
const destinations = [
  { id: "neemuchfort", name: "NEEMUCH FORT", tagline: "A Sentinel of the Malwa Frontier", img: "https://res.cloudinary.com/dbwjg3ewu/image/upload/f_auto,q_auto/homepage_assets/home/explore/g1", icon: Landmark, area: "KHA", ratio: "aspect-square col-span-3 order-1 md:order-none md:col-span-1" },
  { id: "cantonment", name: "THE CANTONMENT", tagline: "A British-Era Legacy Since 1817", img: "https://res.cloudinary.com/dbwjg3ewu/image/upload/f_auto,q_auto/homepage_assets/home/explore/g3", icon: Building2, area: "GWA", ratio: "aspect-square col-span-3 order-2 md:order-none md:col-span-1 md:aspect-[4/3]" },
  { id: "bhardakhoh", name: "BHARDA KHOH", tagline: "Wild Beauty of the Kanjarda Plateau", img: "https://res.cloudinary.com/dbwjg3ewu/image/upload/f_auto,q_auto/homepage_assets/home/explore/g4", icon: Mountain, area: "BAN", ratio: "aspect-square col-span-3 order-3 md:order-none md:col-span-1 md:aspect-[4/3]" },
  { id: "sukhnand", name: "SUKHNAND TEERTH DHAM", tagline: "A Sacred Retreat in Jawad Tehsil", img: "https://res.cloudinary.com/dbwjg3ewu/image/upload/f_auto,q_auto/homepage_assets/home/explore/g5", icon: Sparkles, area: "DHU", ratio: "aspect-square col-span-3 order-4 md:order-none md:col-span-1 md:aspect-[3/4]" },
  { id: "neemachmata", name: "NEEMACH MATA TEMPLE", tagline: "The Spiritual Heart of Neemuch", img: "https://res.cloudinary.com/dbwjg3ewu/image/upload/f_auto,q_auto/homepage_assets/home/explore/g2", icon: Sparkles, area: "UJJ", ratio: "aspect-square col-span-3 order-5 md:order-none md:col-span-1 md:aspect-[4/3]" },
  { id: "jiran", name: "JIRAN TEMPLE", tagline: "Eighth-Century Stone Carved with Devotion", img: "https://res.cloudinary.com/dbwjg3ewu/image/upload/f_auto,q_auto/homepage_assets/home/explore/g6", icon: Landmark, area: "MAN", ratio: "aspect-square col-span-3 order-6 md:order-none md:col-span-1 md:aspect-[4/3]" },
  { id: "alkaloid", name: "OPIUM & ALKALOID WORKS", tagline: "One of Only Two Such Facilities in India", img: "https://res.cloudinary.com/dbwjg3ewu/image/upload/f_auto,q_auto/homepage_assets/home/explore/g8", icon: Building2, area: "TAW", ratio: "aspect-square col-span-2 order-9 md:order-none md:col-span-1 md:aspect-[3/4]" },
  { id: "kileshwar", name: "KILESHWAR TEMPLE", tagline: "Timeless Faith Carved in Stone", img: "https://res.cloudinary.com/dbwjg3ewu/image/upload/f_auto,q_auto/homepage_assets/home/explore/g9", icon: Landmark, area: "TRI", ratio: "aspect-square col-span-2 order-10 md:order-none md:col-span-1 md:aspect-[3/4]" },
  { id: "navtoran", name: "NAVTORAN TEMPLE", tagline: "Sacred Ground in Khor Village", img: "https://res.cloudinary.com/dbwjg3ewu/image/upload/f_auto,q_auto/homepage_assets/home/explore/g7", icon: Landmark, area: "SAN", ratio: "aspect-square col-span-2 order-11 md:order-none md:col-span-1 md:aspect-[3/4]" },
];

const experiences = [
  { id: "cuisine", label: "Local Cuisine", sub: "Taste the Traditions", icon: Utensils },
  { id: "culture", label: "Vibrant Culture", sub: "Festivals that Unite Hearts", icon: Music },
  { id: "hospitality", label: "Warm Hospitality", sub: "Atithi Devo Bhava", icon: HandHeart },
  // { id: "hidden-gems", label: "Hidden Gems", sub: "Beyond the Ordinary", icon: Gem },
];

const categories = [
  { id: "heritage", label: "Heritage", icon: Landmark },
  { id: "wildlife", label: "Wildlife", icon: Bird },
  { id: "nature", label: "Nature", icon: Trees },
  { id: "spirituality", label: "Spirituality", icon: Sparkles },
  { id: "adventure", label: "Adventure", icon: Mountain },
  { id: "culture", label: "Culture", icon: Palette },
  { id: "hidden", label: "Hidden Gems", icon: Compass },
];

/* Bento map — 12 cols × 6 rows, title centered (lg only) */
const GRID_AREAS = `
  "KHA KHA KHA GWA GWA GWA BAN BAN BAN DHU DHU DHU"
  "KHA KHA KHA TTL TTL TTL TTL TTL TTL DHU DHU DHU"
  "UJJ UJJ UJJ TTL TTL TTL TTL TTL TTL MAN MAN MAN"
  "UJJ UJJ UJJ TTL TTL TTL TTL TTL TTL MAN MAN MAN"
  "EXP EXP EXP TAW TAW TRI TRI SAN SAN GRN GRN GRN"
  "EXP EXP EXP TAW TAW TRI TRI SAN SAN GRN GRN GRN"
`;

const GRID_ROWS = "200px 120px 120px 120px 130px 130px";

/* ------------------------------------------------------------------ */
/*  Destination image card                                             */
/* ------------------------------------------------------------------ */
function DestinationCard({ item }) {
  const Icon = item.icon;
  return (
    <motion.article
      variants={cell}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.97 }}
      transition={SPRING}
      style={{ ["--ga"]: item.area }}
      className={`group relative overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5 ${item.ratio} lg:aspect-auto lg:col-auto lg:min-h-0 lg:h-full lg:[grid-area:var(--ga)]`}
    >
      <img
        src={item.img}
        alt={item.name}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <motion.div
        initial={{ opacity: 0.9 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-x-0 bottom-0 p-4 text-white"
      >
        <div className="mb-1 flex items-center gap-1.5">
          <motion.span
            whileHover={{ rotate: 12, scale: 1.15 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex"
          >
            <Icon className="h-4 w-4 opacity-90" strokeWidth={1.75} />
          </motion.span>
          <h3 className="text-sm font-semibold tracking-wide" style={{ fontFamily: SANS }}>
            {item.name}
          </h3>
        </div>
        <p className="text-xs leading-snug text-white/85 transition-transform duration-300 group-hover:translate-x-0.5" style={{ fontFamily: SANS }}>
          {item.tagline}
        </p>
      </motion.div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/*  Center title card                                                  */
/* ------------------------------------------------------------------ */
function TitleCard() {
  return (
    <motion.div
      variants={cell}
      className="order-7 col-span-6 flex min-h-[150px] flex-col items-center justify-center rounded-2xl px-6 py-8 text-center md:order-none md:col-span-3 lg:col-auto lg:min-h-0 lg:py-6 lg:[grid-area:TTL]"
    >
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-3xl leading-none sm:text-4xl"
        style={{ fontFamily: SCRIPT, color: GOLD }}
      >
        Explore the Magic of
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="mt-1 leading-[0.95] tracking-wide"
        style={{ fontFamily: SERIF, color: INK, fontSize: "clamp(2rem,4.5vw,4rem)" }}
      >
        <span className="block" style={{ color: GREEN }}>NEEMUCH</span>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="mt-4 flex items-center gap-2"
      >
        <span className="h-px w-8" style={{ backgroundColor: GOLD }} />
        <motion.span
          animate={{ rotate: [0, -10, 10, -6, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 1.6, ease: "easeInOut" }}
          className="inline-flex"
        >
          <Leaf className="h-4 w-4" style={{ color: GOLD }} strokeWidth={1.5} />
        </motion.span>
        <span className="h-px w-8" style={{ backgroundColor: GOLD }} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="mt-3 text-sm"
        style={{ fontFamily: SANS, color: MUTED }}
      >
        One District. Endless Stories.
      </motion.p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  "Experience the Real MP" card — green, white text (matches CTA)    */
/*  Full-width band at every breakpoint; icon row is 4-across below lg  */
/*  (matching the mockup) and reverts to the original 3-col divided     */
/*  row at lg.                                                          */
/* ------------------------------------------------------------------ */
function ExperienceCard() {
  return (
    <motion.div
      variants={cell}
      style={{ backgroundColor: GREEN }}
      className="order-8 col-span-6 flex min-h-[150px] flex-col justify-center rounded-2xl p-6 text-white shadow-sm md:order-none md:col-span-3 lg:col-auto lg:min-h-0 lg:p-4 lg:[grid-area:EXP]"
    >
      <div className="mb-4 flex items-center justify-center gap-2 lg:mb-3">
        <span className="h-px w-6 bg-white/40" />
        <h3
          className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-white"
          style={{ fontFamily: SANS }}
        >
          Experience the Real Neemuch
        </h3>
        <span className="h-px w-6 bg-white/40" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="grid grid-cols-4 gap-2 lg:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-white/15"
      >
        {experiences.map((e) => {
          const Icon = e.icon;
          return (
            <motion.div key={e.id} variants={cell} className="group flex flex-col items-center gap-2 px-1 text-center lg:px-2">
              <motion.span
                whileHover={{ scale: 1.12, y: -2 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 lg:h-9 lg:w-9"
              >
                <Icon className="h-4 w-4 text-white" strokeWidth={1.75} />
              </motion.span>
              <span className="text-[13px] font-semibold leading-tight text-white" style={{ fontFamily: SANS }}>
                {e.label}
              </span>
              <span className="text-[11px] leading-snug text-white/80" style={{ fontFamily: SANS }}>
                {e.sub}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Green CTA card — horizontal split (text left, button right) below  */
/*  lg to match the mockup; reverts to the original stacked layout at   */
/*  lg via md:flex-col.                                                 */
/* ------------------------------------------------------------------ */
function GreenCTACard() {
  return (
    <motion.div
      variants={cell}
      style={{ backgroundColor: GREEN }}
      className="relative order-12 col-span-6 flex flex-row items-center justify-between gap-4 overflow-hidden rounded-2xl p-6 text-white shadow-sm md:order-none md:col-span-3 md:flex-col md:items-stretch md:justify-center md:p-7 lg:col-auto lg:min-h-0 lg:[grid-area:GRN]"
    >
      <motion.div
        animate={{ rotate: [0, 6, 0, -6, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-3 bottom-2"
      >
        <Leaf className="h-28 w-28 opacity-10" strokeWidth={1} />
      </motion.div>
      <div>
        <p className="text-xs leading-relaxed text-white/80" style={{ fontFamily: SANS }}>
          From Heritage to Wildlife, From Culture to Nature
        </p>
        <h3 className="mt-2 leading-tight" style={{ fontFamily: SERIF, fontSize: "clamp(1.5rem,2vw,2.25rem)" }}>
          Neemuch Has It All!
        </h3>
      </div>
      <motion.button
        type="button"
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-white md:mt-5"
        style={{ fontFamily: SANS, color: GREEN_DARK }}
      >
        Explore More
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </motion.button>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main section                                                       */
/* ------------------------------------------------------------------ */
export default function Neemuch() {
  return (
    <section className="w-full overflow-x-hidden py-10 sm:py-12" style={{ backgroundColor: CREAM, fontFamily: SANS }}>
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-5 lg:px-6">
        {/* 6 col (base, incl. mobile) → 3 col (md) → full bento (lg).
            Base uses 6 columns so col-span-3 items (top destinations)
            form 2-per-row and col-span-2 items (Tawa/Tribal/Sanchi)
            form 3-per-row, matching the uploaded mockup exactly. */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-6 gap-3 md:grid-cols-3 lg:gap-4 lg:[grid-template-columns:repeat(12,minmax(0,1fr))] lg:[grid-template-areas:var(--mp-areas)] lg:[grid-template-rows:var(--mp-rows)]"
          style={{ ["--mp-areas"]: GRID_AREAS, ["--mp-rows"]: GRID_ROWS }}
        >
          <TitleCard />
          {destinations.map((d) => (
            <DestinationCard key={d.id} item={d} />
          ))}
          <ExperienceCard />
          <GreenCTACard />
        </motion.div>

        {/* Category chip bar */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:gap-x-10"
        >
          {categories.map((c) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.id}
                variants={chipVariant}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-2"
              >
                <motion.span whileHover={{ rotate: 10 }} transition={{ duration: 0.2 }} className="inline-flex">
                  <Icon className="h-5 w-5" strokeWidth={1.5} style={{ color: GREEN }} />
                </motion.span>
                <span className="text-xs font-medium sm:text-sm" style={{ color: INK }}>{c.label}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}