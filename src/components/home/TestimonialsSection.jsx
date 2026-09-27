'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, ArrowUpRight, Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  { id: 1, name: 'Rohit Sharma', location: 'Delhi', rating: 5, quote: 'Did the Cantonment & Fort Trail with my parents, they still talk about it. Good trip overall.' },
  { id: 2, name: 'Ananya Verma', location: 'Mumbai', rating: 5, quote: 'Everything was on time, no confusion like some other agencies we tried before.' },
  { id: 3, name: 'Sandeep Nair', location: 'Bangalore', rating: 5, quote: 'Finally made it out to Bharda Khoh for the rock paintings. Worth the drive.' },
  { id: 4, name: 'Megha Iyer', location: 'Chennai', rating: 5, quote: 'Our guide at Neemuch Fort explained things really well, made it interesting for the kids too.' },
  { id: 5, name: 'Priya Singh', location: 'Bhopal', rating: 5, quote: 'Stayed near Jiran and visited the old temple ruins, very peaceful. Food was simple but tasty.' },
  { id: 6, name: 'Arjun Mehta', location: 'Indore', rating: 5, quote: 'Booked last minute for a weekend trip and it still went smooth.' },
];

const GREEN = '#127407';
const ACCENT = '#F2B93B';

// Cycles through brand-adjacent shades so initials don't all look identical.
const AVATAR_COLORS = ['#127407', '#A16C21', '#0d5c06', '#8a5a1a', '#1a8a0a', '#0f6500'];

function Stars({ count }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={13} fill={ACCENT} stroke={ACCENT} />
      ))}
    </div>
  );
}

function TestimonialCard({ t, index }) {
  const avatarColor = AVATAR_COLORS[index % AVATAR_COLORS.length];

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="relative flex h-full flex-col rounded-2xl border border-white/40 bg-white px-5 py-5 shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
    >
      <Quote className="absolute right-4 top-4 opacity-15" size={26} style={{ color: GREEN }} fill="currentColor" />

      <div className="mb-3 flex items-center gap-3">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[16px] font-semibold text-white ring-2 ring-[#127407]/10"
          style={{ backgroundColor: avatarColor, fontFamily: "'Poppins', sans-serif" }}
        >
          {t.name.charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0">
          <p className="truncate text-[14px] font-semibold text-gray-900" style={{ fontFamily: "'Poppins', sans-serif" }}>{t.name}</p>
          <p className="mb-1 text-[12px] text-gray-400" style={{ fontFamily: "'Poppins', sans-serif" }}>{t.location}</p>
          <Stars count={t.rating} />
        </div>
      </div>

      <p className="flex-1 text-[13px] leading-relaxed text-gray-600" style={{ fontFamily: "'Poppins', sans-serif" }}>
        {t.quote}
      </p>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start', slidesToScroll: 1 });
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i) => emblaApi && emblaApi.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    setSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Poppins:wght@300;400;500;600&display=swap');
      `}</style>

      <section className="relative w-full overflow-hidden py-16" style={{ backgroundColor: GREEN }}>
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle at 15% 20%, #fff 0%, transparent 40%), radial-gradient(circle at 85% 80%, #fff 0%, transparent 45%)' }}
        />

        <div className="relative mx-auto max-w-7xl px-6">
          {/* Header */}
          <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
                className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ fontFamily: "'Poppins', sans-serif", color: ACCENT }}
              >
                Trusted by Travelers
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.05 }}
                className="text-[1.8rem] font-bold leading-tight text-white md:text-[2.2rem]" style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Real Stories from Neemuch
              </motion.h2>
            </div>

            <a
              href="mailto:info@neemuchtourify.com?subject=Share%20Your%20Review"
              className="flex shrink-0 items-center gap-2 rounded-full border border-white/40 py-2.5 pl-5 pr-4 text-[13px] font-medium text-white transition-colors duration-200 hover:border-white hover:bg-white hover:text-[#127407]"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Share Your Review
              <ArrowUpRight size={16} />
            </a>
          </div>

          {/* Carousel row: prev | cards | next (no fixed image) */}
          <div className="flex items-stretch gap-4">
            <button
              onClick={scrollPrev} aria-label="Previous testimonials"
              className="hidden w-10 shrink-0 items-center justify-center self-center rounded-full border border-white/40 py-0 text-white transition-colors duration-200 hover:border-white hover:bg-white hover:text-[#127407] sm:flex sm:h-10"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="min-w-0 flex-1 overflow-hidden" ref={emblaRef}>
              <div className="flex gap-5">
                {TESTIMONIALS.map((t, i) => (
                  <div key={t.id} className="flex-[0_0_100%] sm:flex-[0_0_48%] lg:flex-[0_0_31.5%]">
                    <TestimonialCard t={t} index={i} />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={scrollNext} aria-label="Next testimonials"
              className="hidden w-10 shrink-0 items-center justify-center self-center rounded-full border border-white/40 text-white transition-colors duration-200 hover:border-white hover:bg-white hover:text-[#127407] sm:flex sm:h-10"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Progress dots */}
          <div className="mt-7 flex items-center justify-center gap-2">
            {snaps.map((_, i) => (
              <button
                key={i} onClick={() => scrollTo(i)} aria-label={`Go to review ${i + 1}`}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{ width: i === selected ? 26 : 8, backgroundColor: i === selected ? ACCENT : 'rgba(255,255,255,0.4)' }}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
