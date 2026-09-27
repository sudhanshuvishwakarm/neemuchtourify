'use client';

import { motion } from 'framer-motion';

const NAVY = '#0A3248';
const TEAL = '#23778F';

const STEPS = [
  {
    img: 'https://res.cloudinary.com/dbwjg3ewu/image/upload/f_auto,q_auto/homepage_assets/home/hero/s6',
    title: 'We carefully design each route',
    desc: 'Selecting the right locations, seasons, and experiences that create a balanced and unforgettable adventure.',
    bg: NAVY,
    rotate: 0,
    height: 425,
  },
  {
    img: 'https://res.cloudinary.com/dbwjg3ewu/image/upload/f_auto,q_auto/homepage_assets/home/hero/s4',
    title: "We ensure you're fully equipped",
    desc: "We handle all logistics, gear advice, and safety briefings, ensuring you're ready and secure for your adventure.",
    bg: TEAL,
    rotate: -3,
    height: 440,
  },
  {
    img: 'https://res.cloudinary.com/dbwjg3ewu/image/upload/f_auto,q_auto/homepage_assets/home/hero/s2',
    title: 'Our experts lead your every step',
    desc: 'Our team guides you through each phase, adjusting the pace to ensure you appreciate and live in the moment.',
    bg: NAVY,
    rotate: 5,
    height: 450,
  },
  {
    img: 'https://res.cloudinary.com/dbwjg3ewu/image/upload/f_auto,q_auto/homepage_assets/home/hero/s5',
    title: 'We build memories that endure',
    desc: 'Beyond the hike itself, we focus on truly meaningful experiences that stay with you long after the journey ends.',
    bg: TEAL,
    rotate: 2.2,
    height: 435,
  },
];

function Starburst({ className = '' }) {
  const rays = Array.from({ length: 16 });
  return (
    <svg
      viewBox="0 0 400 400"
      className={`pointer-events-none absolute left-1/2 top-1/2 z-0 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 sm:h-[680px] sm:w-[680px] ${className}`}
      aria-hidden
    >
      {rays.map((_, i) => (
        <rect
          key={i}
          x="196"
          y="20"
          width="8"
          height="160"
          rx="4"
          fill="#0A3248"
          opacity="0.1"
          transform={`rotate(${(360 / rays.length) * i} 200 200)`}
        />
      ))}
    </svg>
  );
}

function CardBody({ step, index }) {
  return (
    <>
      <div className="pl-6 pr-8 pt-7">
        <p
          className="text-[2.2rem] font-black leading-none text-white"
          style={{ fontFamily: "'Anton', sans-serif" }}
        >
          {String(index + 1).padStart(2, '0')}.
        </p>
        <h3
          className="mt-3 text-[1.3rem] font-bold leading-[1.2] text-white"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {step.title}
        </h3>
        <p className="mt-3 text-[14px] font-light leading-relaxed text-white/80" style={{ fontFamily: "'Poppins', sans-serif" }}>
          {step.desc}
        </p>
      </div>
      <div className="mt-5 flex-1 w-full overflow-hidden px-0">
        <img src={step.img} alt={step.title} className="h-full w-full object-cover" draggable={false} />
      </div>
    </>
  );
}

// Cards sit side-by-side in one row, so a plain viewport trigger would fire
// for all four at once. Pulling each card's trigger line further up the
// viewport the higher its index is forces it to wait for more scroll before
// revealing — card 0 settles first, card 1 starts while card 0 is still
// mid-motion, and so on, instead of everything arriving together.
function ScrollCard({ step, index }) {
  const triggerMargin = `0px 0px -${8 + index * 13}% 0px`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 90 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: triggerMargin }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      style={{ background: step.bg, rotate: step.rotate, height: step.height }}
      className="flex w-full flex-col overflow-hidden rounded-sm shadow-[0_18px_40px_rgba(0,0,0,0.22)]"
    >
      <CardBody step={step} index={index} />
    </motion.div>
  );
}

function DesktopPinnedSection() {
  return (
    <div className="relative hidden bg-[#fcfcfc] px-5 lg:block" style={{ paddingTop: 80, paddingBottom: 160 }}>
      <div
        className="sticky z-[1] flex flex-col items-center justify-center overflow-visible"
        style={{ top: 90, height: '80vh' }}
      >
        <Starburst />
        <h2
          className="relative text-[4.5rem] font-black uppercase leading-none text-[#2b2a26] xl:text-[5.5rem]"
          style={{ fontFamily: "'Anton', sans-serif" }}
        >
          How We Work
        </h2>
      </div>

      <div className="relative z-[2] mx-auto flex max-w-[1280px] items-start gap-4">
        {STEPS.map((step, i) => (
          <div key={step.title} className="w-1/4">
            <ScrollCard step={step} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileCard({ step, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.55 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ background: step.bg }}
      className="flex h-[360px] w-full flex-col overflow-hidden rounded-sm shadow-[0_12px_30px_rgba(0,0,0,0.15)]"
    >
      <CardBody step={step} index={index} />
    </motion.div>
  );
}

function MobileSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#fcfcfc] py-16 lg:hidden">
      <Starburst />
      <div className="relative z-[1] mx-auto max-w-md px-6">
        <div className="mb-10 text-center">
          <h2
            className="text-[2.6rem] font-black uppercase leading-none text-[#2b2a26] sm:text-[3.2rem]"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            How We Work
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          {STEPS.map((step, i) => (
            <MobileCard key={step.title} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function WhyChooseUs() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700&family=Poppins:wght@300;400;500;600&family=Anton&display=swap');
      `}</style>

      <DesktopPinnedSection />
      <MobileSection />
    </>
  );
}
