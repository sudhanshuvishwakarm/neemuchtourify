'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SANS = "font-[family-name:'Poppins',ui-sans-serif,sans-serif]";
const NUM = "font-[family-name:'Outfit',ui-sans-serif,sans-serif]";

const TINT = '#f5fbf2';

const STATS = [
  { id: 'tehsils',    value: 6,    unit: '',  suffix: '',    label: 'Tehsils',       caption: 'Administrative divisions' },
  { id: 'villages',   value: 800,  unit: '',  suffix: '+',   label: 'Villages',      caption: 'Documented in detail' },
  { id: 'area',       value: 3875, unit: '',  suffix: 'km²', label: 'District Area', caption: 'Spanning the Malwa plains' },
  { id: 'population', value: 826, unit: 'K', suffix: '+',    label: 'Population',    caption: 'As per the 2011 census' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

/* ------------------------------------------------------------------ */
/*  Arc                                                                 */
/* ------------------------------------------------------------------ */
function TopArc() {
  return (
    <svg
      viewBox="0 0 1440 130"
      preserveAspectRatio="none"
      aria-hidden
      className="block h-[42px] w-full sm:h-[80px] lg:h-[130px]"
    >
      <motion.path
        d="M0,130 C 420,-10 1020,-10 1440,130 L1440,130 L0,130 Z"
        fill={TINT}
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Count-up hook — rAF driven, cubic ease-out, delayable start        */
/* ------------------------------------------------------------------ */
function useCountUp(target, { duration = 1900, delay = 0, start = false } = {}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf;
    let startTime = null;

    const timer = setTimeout(() => {
      const step = (timestamp) => {
        if (startTime === null) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(eased * target));
        if (progress < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [start, target, duration, delay]);

  return value;
}

/* ------------------------------------------------------------------ */
/*  Counter — pure display, no progress math needed anymore            */
/* ------------------------------------------------------------------ */
function Counter({ value, unit = '', suffix = '' }) {
  return (
    <span className="tabular-nums">
      {value}
      {unit && <span className="align-super text-[0.58em]">{unit}</span>}
      {suffix && <span className="align-super text-[0.5em] text-[#A16C21]">{suffix}</span>}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Stat card                                                          */
/* ------------------------------------------------------------------ */
function StatCard({ stat, index, isLast }) {
  const [start, setStart] = useState(false);

const count = useCountUp(stat.value, {
  duration: 1600,
  delay: index * 80,
  start,
});

  return (
    <motion.div
      variants={fadeUp}
      onViewportEnter={() => setStart(true)}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={`relative px-4 text-center ${
        isLast ? '' : 'lg:border-r lg:border-[#dcecd6]'
      } ${index % 2 === 0 ? 'border-r border-[#dcecd6] lg:border-r' : ''}`}
    >
      <p className={`text-[clamp(2.75rem,7vw,5rem)] font-bold leading-none text-[#117307] ${NUM}`}>
        <Counter value={count} unit={stat.unit} suffix={stat.suffix} />
      </p>

      <motion.span
        className="mx-auto mt-3 block h-[2px] w-10 origin-center rounded-full bg-[#A16C21]"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.75 + index * 0.12, ease: 'easeOut' }}
      />

      <p className="mt-3 text-[12px] font-bold uppercase tracking-[0.1em] text-[#0d5c06] sm:text-[13px]">
        {stat.label}
      </p>
      <p className="mx-auto mt-1.5 max-w-[16ch] text-[12px] leading-snug text-[#6f7a6b] sm:text-[12.5px]">
        {stat.caption}
      </p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */
export default function HomeStats() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Outfit:wght@600;700&display=swap');
      `}</style>

      <section className={`relative z-[1] -mt-[42px] w-full sm:-mt-[80px] lg:-mt-[130px] ${SANS}`}>
        <TopArc />

        <div className="bg-[#f5fbf2] px-5 pb-14 pt-2 sm:px-8 sm:pb-16 sm:pt-4">
          <motion.div
            className="mx-auto w-full max-w-[96rem]"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={fadeUp} className="mb-12 text-center">
              <motion.p
                initial={{ opacity: 0, letterSpacing: '0.05em' }}
                whileInView={{ opacity: 1, letterSpacing: '0.2em' }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="text-[11.5px] font-extrabold uppercase text-[#A16C21] sm:text-[12px]"
              >
                By the Numbers
              </motion.p>
              <h2 className="mt-2 text-[1.35rem] font-semibold text-[#123c0c] sm:text-[1.6rem]">
                Neemuch, End to End
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 gap-y-12 lg:grid-cols-4 lg:gap-y-0">
              {STATS.map((s, i) => (
                <StatCard key={s.id} stat={s} index={i} isLast={i === STATS.length - 1} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}