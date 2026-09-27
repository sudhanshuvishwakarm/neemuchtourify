'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Music,
  Drama,
  Landmark,
  Sparkles,
  Flower,
  Flame,
  PartyPopper,
  Sun,
  Waves,
  Flag,
  Moon,
  Gift,
} from 'lucide-react';

const GOLD = '#A16C21';
const DISTRICT = '#e0455f';
const TRADITIONAL = GOLD;

const cld = (id, transform = '') =>
  `https://res.cloudinary.com/dbwjg3ewu/image/upload/f_auto,q_auto,c_fill${transform ? ',' + transform : ''}/${id}`;

// Real district photos, cycled across every festival further down so each
// slide in a month's carousel gets a genuinely different image (11 photos
// is more than enough headroom for a month's max of 4 festivals).
const PHOTO_POOL = [
  'v1769680321/mptourify/district/ubplrvxk1poc2s9f7x5i.png', // Bhopal
  'v1769682115/mptourify/district/g5vv50tw36nvze7xqvg8.png', // Chhatarpur / Khajuraho
  'v1769761899/mptourify/district/wtar57ljynrka95phrzk.png', // Jhabua
  'v1769869374/mptourify/district/luh7tkc6wjdy6as8n6hm.png', // Ujjain
  'v1769877117/mptourify/district/oogozmxl5r1tsu8y4jkz.png', // Raisen / Sanchi
  'v1769873238/mptourify/district/rbs0bybyeffbcpxbtk4e.png', // Narmadapuram
  'v1769684458/mptourify/district/obfuigc7jf6xzpooqwer.png', // Dewas
  'v1769761048/mptourify/district/kx7hdw0j4ewde1iijyco.png', // Indore
  'v1769872205/mptourify/district/nshrhtaxegfqbyrcjzvp.png', // Sehore
  'v1769775871/mptourify/district/v6qb7xpsiatxpa7lcz0l.png', // Khargone / Maheshwar
  'v1769687270/mptourify/district/tmewhjev5ghojrd6dgb1.png', // Gwalior
];

// Each month lists every festival that actually falls in it (2–4 typically),
// not just one headline event.
const MONTHS_RAW = [
  {
    month: 'January', short: 'Jan',
    festivals: [
      { name: "New Year's Day", place: 'Statewide', when: '1 January', tag: 'traditional', Icon: PartyPopper, blurb: 'Temples and hill stations see a wave of visitors welcoming the new year.' },
      { name: 'Makar Sankranti', place: 'Statewide', when: '14 January', tag: 'traditional', Icon: Sun, blurb: 'Kite flying, til-gud sweets and riverside fairs mark the harvest festival.' },
      { name: 'Republic Day', place: 'Statewide', when: '26 January', tag: 'traditional', Icon: Flag, blurb: 'Parades and flag hoisting at forts, schools and public squares across Neemuch.' },
    ],
  },
  {
    month: 'February', short: 'Feb',
    festivals: [
      { name: 'Maha Shivratri', place: 'Statewide · Ujjain', when: '15 February 2026', tag: 'traditional', Icon: Flame, blurb: 'Night-long vigils and jagran at Mahakaleshwar and Shiva temples statewide.' },
      { name: 'Vasant Panchami', place: 'Statewide', when: 'Magh (lunar)', tag: 'traditional', Icon: Flower, blurb: 'Yellow clothes and Saraswati puja usher in spring across the state.' },
    ],
  },
  {
    month: 'March', short: 'Mar',
    festivals: [
      { name: 'Holi', place: 'Statewide', when: '4 March 2026', tag: 'traditional', Icon: Sparkles, blurb: 'Colour, water and dhol beats take over every street and village square.' },
      { name: 'Chaitra Navratri', place: 'Statewide', when: 'Mid–late March 2026', tag: 'traditional', Icon: Drama, blurb: 'Nine nights of devi puja and fasting building up to Ram Navami.' },
      { name: 'Ram Navami', place: 'Statewide', when: '26 March 2026', tag: 'traditional', Icon: Landmark, blurb: 'Temples across Neemuch mark the birth of Lord Ram with processions and bhajans.' },
    ],
  },
  {
    month: 'April', short: 'Apr',
    festivals: [
      { name: 'Hanuman Jayanti', place: 'Statewide', when: 'Chaitra Purnima (lunar)', tag: 'traditional', Icon: Flame, blurb: 'Devotees throng Hanuman temples with processions and bhajans at dawn.' },
      { name: 'Mahavir Jayanti', place: 'Statewide', when: 'Chaitra (lunar)', tag: 'traditional', Icon: Sparkles, blurb: 'Jain communities mark the birth of Lord Mahavir with temple rituals.' },
      { name: 'Akshaya Tritiya', place: 'Statewide', when: '19 April 2026', tag: 'traditional', Icon: Gift, blurb: 'Considered an auspicious day for new beginnings, gold and gifting.' },
    ],
  },
  {
    month: 'May', short: 'May',
    festivals: [
      { name: 'Buddha Purnima', place: 'Statewide', when: '1 May 2026', tag: 'traditional', Icon: Sparkles, blurb: 'Devotees mark the birth of the Buddha with prayers and quiet reflection.' },
      { name: 'Ganga Dussehra', place: 'Statewide', when: 'Jyeshtha (lunar)', tag: 'traditional', Icon: Waves, blurb: 'Riverside ghats see ritual baths and evening aarti to mark the day.' },
    ],
  },
  {
    month: 'June', short: 'Jun',
    festivals: [
      { name: 'Nirjala Ekadashi', place: 'Statewide', when: 'Jyeshtha (lunar)', tag: 'traditional', Icon: Waves, blurb: 'The strictest Ekadashi fast of the year, observed without even water.' },
      { name: 'Kabir Jayanti', place: 'Statewide', when: '29 June 2026', tag: 'traditional', Icon: Music, blurb: 'Sant Kabir’s teachings are remembered with dohas and satsang gatherings.' },
      { name: 'Rath Yatra', place: 'Statewide', when: 'Ashadha (lunar)', tag: 'traditional', Icon: Landmark, blurb: 'Chariot processions mark the start of the monsoon festival season.' },
    ],
  },
  {
    month: 'July', short: 'Jul',
    festivals: [
      { name: 'Guru Purnima', place: 'Statewide', when: 'Ashadha (lunar)', tag: 'traditional', Icon: Music, blurb: 'Students and disciples honour their teachers and gurus.' },
    ],
  },
  {
    month: 'August', short: 'Aug',
    festivals: [
      { name: 'Hariyali Teej', place: 'Statewide', when: '15 August 2026', tag: 'traditional', Icon: Flower, blurb: 'The first monsoon showers are welcomed with swings, songs and green attire.' },
      { name: 'Independence Day', place: 'Statewide', when: '15 August', tag: 'traditional', Icon: Flag, blurb: 'Flag hoisting and cultural programs at forts, schools and public squares.' },
      { name: 'Raksha Bandhan', place: 'Statewide', when: 'Shravan Purnima (lunar)', tag: 'traditional', Icon: PartyPopper, blurb: 'Siblings tie the rakhi thread in a celebration of family bonds.' },
      { name: 'Nag Panchami', place: 'Statewide', when: 'Shravan (lunar)', tag: 'traditional', Icon: Waves, blurb: 'Snake deities are worshipped at temples and village shrines.' },
    ],
  },
  {
    month: 'September', short: 'Sep',
    festivals: [
      { name: 'Janmashtami', place: 'Statewide', when: '3–4 September 2026', tag: 'traditional', Icon: Flame, blurb: 'Krishna’s birth is celebrated with midnight aarti and jhankis across Neemuch.' },
      { name: 'Ganesh Chaturthi', place: 'Statewide', when: '14 September 2026', tag: 'traditional', Icon: PartyPopper, blurb: 'Pandals and processions honour Lord Ganesh in towns and villages alike.' },
      { name: 'Anant Chaturdashi', place: 'Statewide', when: '25 September 2026', tag: 'traditional', Icon: Waves, blurb: 'Ganesh idols are immersed in rivers and tanks, closing the festival.' },
    ],
  },
  {
    month: 'October', short: 'Oct',
    festivals: [
      { name: 'Sharad Navratri', place: 'Statewide', when: '11–19 October 2026', tag: 'traditional', Icon: Drama, blurb: 'Nine nights of garba, devi puja and fasting ahead of Dussehra.' },
      { name: 'Dussehra', place: 'Statewide', when: '20 October 2026', tag: 'traditional', Icon: Sun, blurb: 'Effigies of Ravana burn as Neemuch celebrates the triumph of good over evil.' },
      { name: 'Sharad Purnima', place: 'Statewide', when: '25 October 2026', tag: 'traditional', Icon: Moon, blurb: 'Moonlit kheer and Lakshmi puja mark the brightest full moon of the year.' },
      { name: 'Karva Chauth', place: 'Statewide', when: 'Kartik (lunar)', tag: 'traditional', Icon: Moon, blurb: 'Married women fast from sunrise to moonrise for their spouse’s wellbeing.' },
    ],
  },
  {
    month: 'November', short: 'Nov',
    festivals: [
      { name: 'Dhanteras', place: 'Statewide', when: '6 November 2026', tag: 'traditional', Icon: Sparkles, blurb: 'Markets fill up as families shop for gold, utensils and new beginnings.' },
      { name: 'Diwali', place: 'Statewide', when: '8 November 2026', tag: 'traditional', Icon: Flame, blurb: 'Five days of lights, sweets and fireworks across every district.' },
      { name: 'Kartik Purnima', place: 'Statewide', when: 'Kartik (lunar)', tag: 'traditional', Icon: PartyPopper, blurb: 'Riverbank villages hold Dev Diwali-style lamp fairs after the full moon.' },
    ],
  },
  {
    month: 'December', short: 'Dec',
    festivals: [
      { name: 'Christmas', place: 'Statewide', when: '25 December', tag: 'traditional', Icon: Gift, blurb: 'Carol services and markets light up churches across the district.' },
    ],
  },
];

// Assign each festival a photo by walking a single counter across the whole
// year, so every festival within a given month lands on a different image.
let _photoCursor = 0;
const MONTHS = MONTHS_RAW.map((m) => ({
  ...m,
  festivals: m.festivals.map((f) => ({
    ...f,
    img: PHOTO_POOL[_photoCursor++ % PHOTO_POOL.length],
  })),
}));

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const tileVariant = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 280, damping: 26 } },
};

function accentOf(tag) {
  return tag === 'district' ? DISTRICT : TRADITIONAL;
}

// A month is flagged "district" (pink accent) if it has any special
// district-level event, otherwise it just carries the generic gold tag.
function monthAccentTag(monthData) {
  return monthData.festivals.some((f) => f.tag === 'district') ? 'district' : 'traditional';
}

function MonthTile({ data, isActive, onSelect }) {
  const tag = monthAccentTag(data);
  const accent = accentOf(tag);
  const first = data.festivals[0];
  const extra = data.festivals.length - 1;

  return (
    <motion.button
      type="button"
      variants={tileVariant}
      onClick={onSelect}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      animate={{ scale: isActive ? 1.02 : 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      style={{ borderColor: isActive ? accent : `${accent}80` }}
      className="relative flex w-full items-center gap-3 overflow-hidden rounded-xl border-2 px-4 py-3 text-left shadow-sm transition-shadow"
    >
      {/* background photo */}
      <img
        src={cld(first.img, 'w_300,h_120')}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: isActive
            ? `linear-gradient(115deg, rgba(255,255,255,0.94) 55%, ${accent}cc 150%)`
            : 'linear-gradient(90deg, rgba(10,18,12,0.88), rgba(10,18,12,0.55))',
        }}
      />

      <span
        className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-md"
        style={{
          background: isActive ? `${accent}1a` : 'rgba(255,255,255,0.14)',
          color: isActive ? accent : '#ffffff',
        }}
      >
        <first.Icon size={16} strokeWidth={2.2} />
      </span>
      <span className="relative min-w-0">
        <span
          className="block text-[13px] font-bold uppercase tracking-[0.08em]"
          style={{ color: isActive ? '#1a1a1a' : '#ffffff' }}
        >
          {data.month}
        </span>
        <span
          className="block truncate text-[11px] font-medium"
          style={{ color: isActive ? accent : 'rgba(255,255,255,0.85)' }}
        >
          {first.name}{extra > 0 ? ` +${extra} more` : ''}
        </span>
      </span>
    </motion.button>
  );
}

// One slide per festival — full-bleed photo, only a short gradient right at
// the bottom edge so the image itself stays clearly visible.
function FestivalSlide({ f }) {
  const accent = accentOf(f.tag);
  return (
    <div className="relative h-full w-full flex-[0_0_100%]">
      <img
        src={cld(f.img, 'w_1000,h_1200')}
        alt={f.name}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

      <span
        className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.06em] text-white"
        style={{ background: accent }}
      >
        <f.Icon size={12} /> {f.tag === 'district' ? 'District' : 'Traditional'}
      </span>

      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="text-[1.4rem] font-bold leading-tight text-white drop-shadow" style={{ fontFamily: "'Playfair Display', serif" }}>
          {f.name}
        </h3>
        <p className="mt-1 text-[12px] font-medium text-white/90 drop-shadow">
          {f.when} <span className="text-white/70">· {f.place}</span>
        </p>
      </div>
    </div>
  );
}

function MonthShowcase({ data }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [selectedSlide, setSelectedSlide] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i) => emblaApi && emblaApi.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedSlide(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi]);

  return (
    <>
      {/* compact header — month name + count, no photo, no dark overlay */}
      <div className="flex shrink-0 items-center justify-between border-b border-gray-100 bg-white px-5 py-3">
        <h3 className="text-[1.3rem] font-bold leading-none text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
          {data.month}
        </h3>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f5fbf2] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.05em] text-[#117307]">
          <CalendarDays size={13} />
          {data.festivals.length} Festival{data.festivals.length > 1 ? 's' : ''}
        </span>
      </div>

      {/* carousel — one full-bleed photo per festival */}
      <div className="relative flex-1 overflow-hidden bg-neutral-900">
        <div className="h-full overflow-hidden" ref={emblaRef}>
          <div className="flex h-full">
            {data.festivals.map((f) => (
              <FestivalSlide key={f.name} f={f} />
            ))}
          </div>
        </div>

        {data.festivals.length > 1 && (
          <>
            <button
              onClick={scrollPrev}
              aria-label="Previous festival"
              className="absolute left-3 top-1/2 z-[1] flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={scrollNext}
              aria-label="Next festival"
              className="absolute right-3 top-1/2 z-[1] flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
            >
              <ChevronRight size={18} />
            </button>

            <div className="absolute bottom-3 left-1/2 z-[1] flex -translate-x-1/2 items-center gap-1.5">
              {data.festivals.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  aria-label={`Go to festival ${i + 1}`}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{ width: i === selectedSlide ? 22 : 7, backgroundColor: i === selectedSlide ? '#ffffff' : 'rgba(255,255,255,0.45)' }}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default function FestiveSeasons() {
  const currentMonthIndex = new Date().getMonth();
  const [selected, setSelected] = useState(currentMonthIndex);
  const active = MONTHS[selected];

  const left = MONTHS.slice(0, 6);
  const right = MONTHS.slice(6, 12);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Poppins:wght@300;400;500;600&display=swap');
      `}</style>

      <section className="w-full bg-[#fcfcfc] py-16">
        <motion.div
          className="max-w-7xl mx-auto px-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.p
              variants={fadeUp}
              className="text-md font-extrabold tracking-[0.18em] uppercase text-[#117307] mb-4"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Check Out Festivals &amp; Events in Neemuch
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-bold text-[2.2rem] md:text-[2.7rem] leading-[1.2] text-gray-900"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Festive Seasons <span className="text-[#117307]">in Neemuch</span>
            </motion.h2>
          </div>

          {/* Mobile: horizontally scrollable month strip */}
          <motion.div
            variants={fadeUp}
            className="mb-6 flex gap-3 overflow-x-auto pb-2 lg:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {MONTHS.map((m, i) => (
              <div key={m.month} className="w-[190px] shrink-0">
                <MonthTile data={m} isActive={i === selected} onSelect={() => setSelected(i)} />
              </div>
            ))}
          </motion.div>

          {/* Desktop: 3-column layout */}
          <div className="hidden lg:grid lg:grid-cols-[280px_1fr_280px] lg:gap-6">
            <motion.div variants={container} className="flex flex-col gap-3">
              {left.map((m, i) => (
                <MonthTile key={m.month} data={m} isActive={i === selected} onSelect={() => setSelected(i)} />
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="relative flex h-[560px] flex-col overflow-hidden rounded-2xl shadow-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex h-full flex-col"
                >
                  <MonthShowcase data={active} />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <motion.div variants={container} className="flex flex-col gap-3">
              {right.map((m, i) => (
                <MonthTile key={m.month} data={m} isActive={i + 6 === selected} onSelect={() => setSelected(i + 6)} />
              ))}
            </motion.div>
          </div>

          {/* Mobile: showcase card */}
          <div className="lg:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex h-[480px] flex-col overflow-hidden rounded-2xl shadow-xl"
              >
                <MonthShowcase data={active} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Legend */}
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-3">
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-semibold text-white"
              style={{ background: TRADITIONAL }}
            >
              <CalendarDays size={14} /> Traditional Event
            </span>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
