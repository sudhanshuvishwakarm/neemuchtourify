'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// Breakpoint at which we swap to the portrait-cropped sm* images. Matches the
// md: container-height switch below, so the art swaps exactly when the frame
// changes shape. Change this one number to move the switch.
const SM_MAX = 767;

// const SLIDES = [
//   { src: 'https://res.cloudinary.com/dbwjg3ewu/image/upload/f_auto,q_auto/homepage_assets/home/hero/s1', alt: 'Slide 1', heading: 'Discover Madhya Pradesh',    sub: 'Where history breathes through ancient stone and royal heritage unfolds at every turn.' },
//   { src: 'https://res.cloudinary.com/dbwjg3ewu/image/upload/f_auto,q_auto/homepage_assets/home/hero/s2', alt: 'Slide 2', heading: 'Into the Wild Heart',         sub: 'Kanha, Bandhavgarh, Pench — untamed jungles where the tiger reigns supreme.' },
//   { src: 'https://res.cloudinary.com/dbwjg3ewu/image/upload/f_auto,q_auto/homepage_assets/home/hero/s3', alt: 'Slide 3', heading: 'Temples of Timeless Grace',   sub: "Khajuraho's sculpted splendour, Ujjain's sacred ghats — spiritual India at its finest." },
//   { src: 'https://res.cloudinary.com/dbwjg3ewu/image/upload/f_auto,q_auto/homepage_assets/home/hero/s4', alt: 'Slide 4', heading: 'Rivers, Ravines & Reflection',sub: 'Follow the Narmada through gorges carved by centuries, where nature writes its own poetry.' },
//   { src: 'https://res.cloudinary.com/dbwjg3ewu/image/upload/f_auto,q_auto/homepage_assets/home/hero/s5', alt: 'Slide 5', heading: 'A Journey Worth Taking',      sub: 'Plan your escape to the soul of India — where every road leads to a story.' },
// ];

// `src`   = wide crop, used above SM_MAX. The originals — these only read well
//           in a landscape frame.
// `smSrc` = portrait crop for phones. OPTIONAL: if omitted we fall back to
//           `src`, which is why slide 6 still works while sm6.png is missing.
// `posLg` = OPTIONAL manual object-position used ONLY at the large (>SM_MAX)
//           breakpoint, i.e. when the wide `src` crop is showing. Accepts any
//           valid CSS object-position value: 'top', 'bottom', 'left', 'right',
//           'center', or a custom pair like '30% 70%'. Defaults to 'bottom'
//           (the previous fixed behaviour) when omitted.


const SLIDES = [
  {
    src: '/assets/home/hero/1.png',
    smSrc: '/assets/home/hero/1.png',
    alt: 'Slide 1',
    heading: 'A Cantonment Legacy',
    sub: "Neemuch's British-era cantonment, raised in 1817, still stands watch over the town's storied past.",
    posLg: 'bottom'
  },
  {
    src: '/assets/home/hero/2.png',
    smSrc: '/assets/home/hero/2.png',
    alt: 'Slide 2',
    heading: 'Where Faith Runs Deep',
    sub: "From Neemach Mata Temple to Kileshwar and Sukhnand Teerth Dham — sacred sites at every turn.",
    posLg: 'bottom'
  },
  {
    src: '/assets/home/hero/3.png',
    smSrc: '/assets/home/hero/3.png',
    alt: 'Slide 3',
    heading: 'A Unique Industrial Story',
    sub: "Home to one of only two Government Opium & Alkaloid Works in India, a legacy dating back to 1935.",
    posLg: 'bottom'
  },
  {
    src: '/assets/home/hero/4.png',
    smSrc: '/assets/home/hero/4.png',
    alt: 'Slide 4',
    heading: 'Guardian of the Border',
    sub: "Neemuch Fort has watched over the Malwa-Rajasthan frontier for generations, a landmark of history.",
    posLg: 'bottom'
  },
  {
    src: '/assets/home/hero/5.png',
    smSrc: '/assets/home/hero/5.png',
    alt: 'Slide 5',
    heading: 'The Malwa Countryside',
    sub: "Across six tehsils and nearly 800 villages, Neemuch's rural heartland invites you to slow down and explore.",
    posLg: 'bottom'
  },
  // {
  //   src: '/assets/home/hero/6.png',
  //   smSrc: '/assets/home/hero/6.png',
  //   alt: 'Slide 6',
  //   heading: 'Discover Neemuch',
  //   sub: "A district where history, faith, heritage and the Malwa countryside come together.",
  //   posLg: 'bottom'
  // },
];

const AUTO_PLAY_INTERVAL = 4000;

// Tailwind arbitrary font-family values. The family-name: hint stops Tailwind
// guessing the property, and underscores stand in for spaces.
// After
const SERIF = "font-[family-name:'Playfair_Display',ui-serif,serif]";
const SANS = "font-[family-name:'Poppins',ui-sans-serif,sans-serif]";

const staggerContainer = {
  enter:  {},
  center: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  exit:   { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

const wordVariant = {
  enter:  { opacity: 0, y: 28, skewY: 2  },
  center: { opacity: 1, y: 0,  skewY: 0, transition: { type: 'spring', stiffness: 260, damping: 24 } },
  exit:   { opacity: 0, y: -16, skewY: -1, transition: { duration: 0.22, ease: 'easeIn' } },
};

const fadeUp = {
  enter:  { opacity: 0, y: 16 },
  center: { opacity: 1, y: 0,  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit:   { opacity: 0, y: -8, transition: { duration: 0.2,  ease: 'easeIn' } },
};

const imageVariants = {
  enter:  { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.7, ease: 'easeInOut' } },
  exit:   { opacity: 0, transition: { duration: 0.7, ease: 'easeInOut' } },
};

// Tracks whether we're above SM_MAX (i.e. the wide `src` crop is active) so
// SlideImage can switch to the per-slide `posLg` object-position exactly when
// the art itself switches — same breakpoint as the <source> swap.
function useIsLargeScreen() {
  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${SM_MAX + 1}px)`);
    setIsLarge(mq.matches);
    const handler = (e) => setIsLarge(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return isLarge;
}

// <picture> resolves the source in CSS before the request fires, so a phone
// never downloads the wide crop and there's no JS-measure flash on mount.
// `block` is required — <picture> is inline by default, which leaves a baseline
// gap and stops the image filling its absolute wrapper.
//
// NOTE: <source> swaps only the src, never the className — so object-position
// has to be set per breakpoint. Below SM_MAX (portrait sm* crop) we stay
// centred. Above SM_MAX (wide s* crop) we use the slide's own `posLg`, so each
// slide can be positioned manually instead of sharing one fixed anchor.
function SlideImage({ slide }) {
  const isLarge = useIsLargeScreen();
  const objectPosition = isLarge ? (slide.posLg || 'bottom') : 'center';

  return (
    <picture className="block h-full w-full">
      {slide.smSrc && <source media={`(max-width: ${SM_MAX}px)`} srcSet={slide.smSrc} />}
      <img
        src={slide.src}
        alt={slide.alt}
        className="h-full w-full object-cover"
        style={{ objectPosition }}
        draggable={false}
      />
    </picture>
  );
}

export default function HomeHero() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef(null);
  const sectionRef = useRef(null);

  const goTo = useCallback((index, dir) => {
    setDirection(dir);
    setCurrent(index);
  }, []);

  const next = useCallback(() => {
    goTo((current + 1) % SLIDES.length, 1);
  }, [current, goTo]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, AUTO_PLAY_INTERVAL);
  }, [next]);

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [resetTimer]);

  const handleDotClick = (idx) => {
    goTo(idx, idx > current ? 1 : -1);
    resetTimer();
  };

  const words = SLIDES[current].heading.split(' ');

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const sliderOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, 0]);
  const sliderScale = useTransform(scrollYProgress, [0, 1], [1, 0.97]);

  return (
    <>
      {/* Only remaining CSS: the webfont load, which a single-file component has
          nowhere else to declare. Cormorant Garamond ships 300–700 on Google
          Fonts — there is no 800 face, which is why font-weight:800 rendered
          light. 700 is its real bold. */}
    
<style>{`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Poppins:wght@300;400;500;600&display=swap');
`}</style>

      {/* Parent + responsive height pattern (from reference) */}
      <div ref={sectionRef} className={`relative w-full bg-white px-3 pb-0 lg:px-8 ${SANS}`}>
        <motion.div
          className="relative h-[80vh] w-full overflow-hidden rounded-3xl bg-neutral-900 md:h-[calc(100vh-90px)]"
          style={{ opacity: sliderOpacity, scale: sliderScale }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Images */}
          <AnimatePresence initial={false}>
            <motion.div
              key={current}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 z-[1] h-full w-full"
              style={{ y: imageY }}
            >
              <SlideImage slide={SLIDES[current]} />
            </motion.div>
          </AnimatePresence>

          {/* Light gradient overlay so text stays legible */}
          <div className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(160deg,rgba(255,255,255,0.45)_0%,rgba(255,255,255,0.08)_55%,transparent_100%)]" />

          {/* Text overlay + Booking button */}
          <div className="absolute left-0 top-0 z-10 p-[clamp(18px,3.5vw,48px)]">
            {/* Per-slide animated text */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${current}`}
                variants={staggerContainer}
                initial="enter"
                animate="center"
                exit="exit"
              >
                {/* Eyebrow */}
                <motion.p
                  variants={fadeUp}
                  className="mb-2 text-[clamp(9px,1vw,12px)] font-semibold uppercase tracking-[0.22em] text-[#A16C21]"
                >
                  Neemuch Tourify
                </motion.p>

                {/* Heading — word by word. font-bold is 700, the heaviest face
                    Cormorant Garamond actually has. */}
                <h1
                  className={`m-0 flex max-w-[clamp(220px,42vw,520px)] flex-wrap gap-x-[0.28em] overflow-hidden text-[clamp(28px,4.5vw,64px)] font-bold leading-[1.08] text-[#117307] ${SERIF}`}
                >
                  {words.map((word, i) => (
                    <motion.span key={`${current}-word-${i}`} variants={wordVariant} className="inline-block">
                      {word}
                    </motion.span>
                  ))}
                </h1>

                {/* Sub paragraph */}
                <motion.p
                  variants={fadeUp}
                  className="mt-2.5 max-w-[clamp(200px,38vw,440px)] text-[clamp(10px,1.05vw,14px)] font-medium leading-[1.65] text-neutral-900"
                >
                  {SLIDES[current].sub}
                </motion.p>

                {/* Accent rule */}
                <motion.div
                  variants={fadeUp}
                  className="mt-3.5 h-[3px] w-[clamp(32px,4vw,54px)] rounded-full bg-gradient-to-r from-[#117307] to-[#A16C21]"
                />
              </motion.div>
            </AnimatePresence>

            {/* Booking button — animates ONCE on mount, no per-slide re-transform */}
            <motion.a
              href="https://mptbooking.com/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="group mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#0F6500] px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_4px_18px_rgba(15,101,0,0.32)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0b5200] hover:shadow-[0_8px_26px_rgba(15,101,0,0.42)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F6500] focus-visible:ring-offset-2 active:translate-y-0 md:mt-5 md:gap-2 md:px-7 md:py-3.5 md:text-sm"
            >
              <span>Plan Your Journey</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
              >
                <path d="M5 12h14" />
                <path d="m13 5 7 7-7 7" />
              </svg>
            </motion.a>

            {/* Get Quote — static contact link (no backend on this site) */}
            <motion.a
              href="mailto:info@neemuchtourify.com?subject=Trip%20Enquiry"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="group mt-3 ml-0 md:ml-3 inline-flex items-center gap-1.5 rounded-full border-2 border-[#0F6500] bg-white px-5 py-2.5 text-[13px] font-semibold text-[#0F6500] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0F6500] hover:text-white md:px-7 md:py-3.5 md:text-sm"
            >
              Get Quote
            </motion.a>
          </div>

          {/* Dot indicators */}
          <motion.div
            className="absolute -bottom-2 left-0 z-10 flex items-center gap-2.5 rounded-tr-full bg-white px-6 py-3"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
          >
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className="relative flex h-3.5 w-3.5 items-center justify-center focus:outline-none"
              >
                {idx === current ? (
                  <motion.span
                    layoutId="active-dot"
                    className="block h-3.5 w-3.5 rounded-full bg-[#1A7A0A]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                ) : (
                  <motion.span
                    className="block h-[13px] w-[13px] rounded-full border-2 border-gray-300 bg-transparent transition-colors duration-200 hover:border-[#1A7A0A]"
                    whileHover={{ scale: 1.15 }}
                  />
                )}
              </button>
            ))}
          </motion.div>

          {/* ── Booking card — original (kept commented out) ── */}
          {/* <motion.a
            href="https://mptbooking.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute z-20 right-0 bottom-0 hover:drop-shadow-xl cursor-pointer"
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <img src="/images/booking.png" alt="Plan Your Journey — Book Now" className="block w-[300px] h-auto" draggable={false} />
          </motion.a> */}
        </motion.div>
      </div>
    </>
  );
}
