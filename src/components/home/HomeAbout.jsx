'use client';

import { motion } from 'framer-motion';

const SANS = "font-[family-name:'Poppins',ui-sans-serif,sans-serif]";
const SERIF = "font-[family-name:'Playfair_Display',ui-serif,serif]";

const FEATURES = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#117307" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4" />
        <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
      </svg>
    ),
    title: 'Verified Information',
    desc: 'Every detail researched and cross-checked before it goes live',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#117307" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
    title: 'Town to Village',
    desc: 'Coverage that reaches every tehsil, not just the famous stops',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#117307" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="2" y1="12" x2="22" y2="12" />
      </svg>
    ),
    title: 'Plan With Ease',
    desc: 'Everything you need to plan a trip to Neemuch, in one place',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#117307" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" />
        <path d="M5 21V10l7-6 7 6v11" />
        <path d="M10 21v-6h4v6" />
      </svg>
    ),
    title: 'Culture & Heritage',
    desc: 'Temples, forts, cantonment history and living traditions of Neemuch',
  },
];

/* ─── Reveal variants — fade + rise, triggered once when scrolled into view ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const featureItem = {
  hidden: { opacity: 0, y: 20, scale: 0.92 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 22 } },
};

/* ─── Frame photos — rise up from below the section into their resting spot ─── */
const frameRiseContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16, delayChildren: 0.25 } },
};

const frameRise = {
  hidden: { opacity: 0, y: 120, rotate: 0 },
  visible: (rotate) => ({
    opacity: 1,
    y: 0,
    rotate,
    transition: { type: 'spring', stiffness: 90, damping: 16, mass: 0.9 },
  }),
};

export default function HomeAbout() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Poppins:wght@300;400;500;600&display=swap');
      `}</style>

      {/* Bottom padding leaves room for the stats section's arc to bite into.
          Keep it at least as large as the arc height (130px at lg). */}
      <section className={`w-full overflow-hidden bg-[#fdfdfd] pt-10 pb-[60px] sm:pt-14 sm:pb-[100px] lg:pb-[150px] ${SANS}`}>

        {/* Two-column layout — custom 1250px breakpoint, since that's where the
            content column actually has room to go side-by-side on this page
            (standard md/lg breakpoints trigger too late for this layout). */}
        <div className="flex flex-col items-stretch min-[1250px]:flex-row">

          {/* ── LEFT — constrained with padding ── */}
          <div className="flex w-full justify-center min-[1250px]:w-1/2 min-[1250px]:justify-end">
            <motion.div
              className="w-full max-w-[48rem] px-5 py-4 sm:px-8 min-[1250px]:pl-10 min-[1250px]:pr-14"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
            >
              {/* Eyebrow */}
              <motion.p
                variants={fadeUp}
                className="mb-3 text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#117307] sm:mb-4 sm:text-[13px]"
              >
                About Us
              </motion.p>

              {/* Heading */}
              <motion.h2
                variants={fadeUp}
                className={`mb-4 text-[1.6rem] font-bold leading-[1.2] text-gray-900 sm:mb-5 sm:text-[2.1rem] md:text-[2.7rem] ${SERIF}`}
              >
                A Journey to Showcase the Soul of{' '}
                <span className="text-[#117307]">Neemuch</span>
              </motion.h2>

              {/* Body */}
              <motion.p
                variants={fadeUp}
                className="mb-8 text-justify text-[13.5px] font-medium leading-[1.85] text-[#555555] sm:mb-10 sm:text-[14.5px]"
              >
                Neemuch Tourify is an independent digital guide dedicated to showcasing the tourism, culture, history, and rural heritage of Neemuch district. It brings together verified and well-structured information from every tehsil and village, highlighting both popular and lesser-known destinations — from the historic cantonment and Neemuch Fort to sacred temples and the Malwa countryside — making it a reliable, easy-to-use companion for planning your journey through Neemuch.
              </motion.p>

              {/* Divider */}
              <motion.div variants={fadeUp} className="mb-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-200" />
                <svg width="14" height="14" viewBox="0 0 14 14" fill="#117307">
                  <path d="M7 0l2 5h5l-4 3 1.5 5L7 10l-4.5 3L4 8 0 5h5z" />
                </svg>
                <div className="h-px flex-1 bg-gray-200" />
              </motion.div>

              {/* Features — 2×2 cards */}
              <motion.div className="grid grid-cols-1 gap-3 sm:grid-cols-2" variants={staggerContainer}>
                {FEATURES.map((f) => (
                  <motion.div
                    key={f.title}
                    variants={featureItem}
                    whileHover={{ y: -3 }}
                    className="flex items-start gap-3 rounded-xl border border-[#e8f0e4] bg-white p-3.5 transition-shadow hover:shadow-[0_6px_18px_rgba(17,115,7,0.08)]"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#d4ead0] bg-[#f5fbf2]">
                      {f.icon}
                    </span>
                    <div>
                      <p className="mb-1 text-[13.5px] font-semibold text-gray-900">{f.title}</p>
                      <p className="text-[12px] leading-snug text-gray-600">{f.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* ── RIGHT — full bleed base image + 3 frames ── */}
          <motion.div
            className="relative mt-8 w-full overflow-visible min-[1250px]:mt-0 min-[1250px]:w-1/2"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Base backdrop — temple + watercolor art, no frames baked in */}
            <img
              src="https://res.cloudinary.com/dbwjg3ewu/image/upload/f_auto,q_auto/homepage_assets/home/about/about"
              alt="About Neemuch Tourify"
              className="block h-auto w-full object-contain min-[1250px]:rounded-l-3xl min-[1250px]:rounded-r-none"
            />

            {/* Frame photos.
                <638px: absolute + overlapping, sitting on top of the base image (original mobile look).
                638–1249px: plain flex row, static, filling the width — no overlap, no gap.
                >=1250px: absolute + overlapping again, in their desktop spots. */}
            <motion.div
              className="pointer-events-none static -mt-20 flex flex-row items-center justify-center gap-4 px-4 min-[1250px]:absolute min-[1250px]:inset-0 min-[1250px]:mt-0 min-[1250px]:flex-none min-[1250px]:gap-0 min-[1250px]:px-0"
              variants={frameRiseContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {/* Frame 1 — tiger, back-left */}
              <motion.img
                src="/assets/home/about/2.png"
                alt="Wildlife near Neemuch"
                custom={-8}
                variants={frameRise}
                className="static w-[30%] max-w-[180px] shadow-[0_10px_30px_rgba(0,0,0,0.25)] min-[1250px]:absolute min-[1250px]:left-[15%] min-[1250px]:top-[70%] min-[1250px]:w-[26%] min-[1250px]:max-w-[220px]"
              />

              {/* Frame 2 — waterfall, front-center, scaled up + in front */}
              <motion.img
                src="https://res.cloudinary.com/dbwjg3ewu/image/upload/f_auto,q_auto/homepage_assets/home/about/2"
                alt="Scenic countryside near Neemuch"
                custom={5}
                variants={frameRise}
                className="static z-auto w-[32%] max-w-[190px] scale-110 shadow-[0_10px_30px_rgba(0,0,0,0.25)] min-[1250px]:absolute min-[1250px]:left-[40%] min-[1250px]:top-[65%] min-[1250px]:z-20 min-[1250px]:w-[28%] min-[1250px]:max-w-[240px]"
              />

              {/* Frame 3 — riverside temple, front-right, tilted left */}
              <motion.img
                src="https://res.cloudinary.com/dbwjg3ewu/image/upload/f_auto,q_auto/homepage_assets/home/about/3"
                alt="Temple heritage of Neemuch"
                custom={-7}
                variants={frameRise}
                className="static z-auto w-[30%] max-w-[180px] shadow-[0_10px_30px_rgba(0,0,0,0.25)] min-[1250px]:absolute min-[1250px]:right-[5%] min-[1250px]:top-[70%] min-[1250px]:z-10 min-[1250px]:w-[27%] min-[1250px]:max-w-[230px]"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
