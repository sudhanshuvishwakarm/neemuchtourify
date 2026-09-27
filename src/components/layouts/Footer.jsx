'use client';

/**
 * NEEMUCH TOURIFY — Footer Section (CTA banner + floating benefits card + footer)
 * Next.js App Router · JavaScript · Tailwind CSS · Framer Motion
 *
 * Brand: green #117307 · deep green #14520C · gold #A16C21 · cream #FDFCF8
 * SET YOUR CTA BACKGROUND IMAGE PATH BELOW (CTA_BG).
 */

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Compass,
  Landmark,
  PawPrint,
  Flame,
  Camera,
  Facebook,
  Instagram,
  Youtube,
  Twitter, // used for X
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Shared class fragments — brand values live here, not in style={}   */
/* ------------------------------------------------------------------ */
const SANS = "font-[family-name:'Poppins',ui-sans-serif,sans-serif]";
const SERIF = "font-[family-name:'Playfair_Display',ui-serif,serif]";
const SCRIPT = "font-[family-name:'Cormorant_Garamond',ui-serif,serif]";

const RULE = 'border-[#EEEAE0]';
const EYEBROW = 'text-[11.5px] font-bold uppercase tracking-[0.13em] text-[#2C3A28]';
// Light/muted body text (links, copy, fine print) now uses Tailwind's text-sm
// instead of a custom px value, per request.
const BODY_LINK = 'text-sm leading-6 text-[#5A6356]';

const CTA_BG = 'https://res.cloudinary.com/dbwjg3ewu/image/upload/f_auto,q_auto/homepage_assets/home/footer'; // <-- your image

const BENEFITS = [
  { id: 'b1', icon: Landmark, title: 'Rich Heritage',          text: 'Ancient temples, forts and historic treasures.' },
  { id: 'b2', icon: PawPrint, title: 'Wildlife & Nature',      text: 'National parks, sanctuaries and breathtaking landscapes.' },
  { id: 'b3', icon: Flame,    title: 'Spiritual Journeys',     text: 'Sacred sites and spiritual experiences.' },
  { id: 'b4', icon: Camera,   title: 'Unforgettable Memories', text: 'Unique experiences that stay with you forever.' },
];

// Single-page site — both columns link to same-page sections instead of
// separate routes.
const LINK_COLUMNS = [
  {
    id: 'explore',
    title: 'Explore',
    links: [
      { label: 'Home', href: '#top' },
      { label: 'About Neemuch', href: '#about' },
      { label: 'Places to See', href: '#explore' },
      { label: 'Festivals', href: '#festivals' },
    ],
  },
  {
    id: 'info',
    title: 'Information',
    links: [
      { label: 'Panchayats', href: '/panchayats' },
      { label: 'Reviews', href: '#reviews' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

/* WhatsApp isn't in lucide — inline, typed to match the lucide call shape */
const WhatsAppIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// Brand colours can't be Tailwind classes here — they're data, applied per item.
// Placeholder hrefs — swap in Neemuch Tourify's own social pages once created.
const SOCIALS = [
  { id: 'fb', icon: Facebook,     href: '#',                                    label: 'Facebook Page',    className: 'bg-[#1877F2]' },
  { id: 'ig', icon: Instagram,    href: '#',                                    label: 'Instagram',        className: 'bg-[#E4405F]' },
  { id: 'x',  icon: Twitter,      href: '#',                                    label: 'X (Twitter)',      className: 'bg-black' },
  { id: 'yt', icon: Youtube,      href: '#',                                    label: 'YouTube',          className: 'bg-[#FF0000]' },
  { id: 'wa', icon: WhatsAppIcon, href: '#',                                    label: 'WhatsApp Channel', className: 'bg-[#25D366]' },
];

function LeafMark({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

function Ornament() {
  return (
    <div className="mt-5 flex items-center justify-center gap-2.5" aria-hidden>
      <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#A16C21]" />
      <span className="h-1.5 w-1.5 rotate-45 bg-[#A16C21] opacity-75" />
      <span className="h-px w-10 bg-gradient-to-r from-[#A16C21] to-transparent" />
    </div>
  );
}

/* whitespace-nowrap on the anchor plus a fixed-width chevron is what stops the
   › breaking onto its own line when a cell gets narrow. */
function LinkColumn({ column }) {
  return (
    <div>
      <h4 className={`mb-4 ${EYEBROW}`}>{column.title}</h4>
      <ul className="space-y-1">
        {column.links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className={`group inline-flex items-center gap-2 whitespace-nowrap py-0.5 font-medium transition-colors hover:text-[#117307] ${BODY_LINK}`}
            >
              <span
                className="inline-block w-2 shrink-0 text-center text-sm leading-none text-[#A16C21] transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden
              >
                ›
              </span>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactRow({ icon: Icon, label, children }) {
  return (
    <li className="flex items-start gap-2.5">
      <Icon className="mt-0.5 h-[15px] w-[15px] shrink-0 text-[#117307]" strokeWidth={1.8} />
      <span className={BODY_LINK}>
        <span className="block font-semibold text-[#2C3A28]">{label}</span>
        {children}
      </span>
    </li>
  );
}

const rise = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.06, ease: 'easeOut' } }),
};

// Stagger wrapper for grids/lists — children use `riseChild`.
const staggerGroup = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const riseChild = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function HomeFooter() {
  return (
    <>
      {/* Only remaining CSS: the webfont load. Cormorant Garamond tops out at
          700 on Google Fonts — never ask it for 800. */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Cormorant+Garamond:ital,wght@1,500;1,600;1,700&family=Poppins:wght@300;400;500;600;700&display=swap');
      `}</style>

      <footer className={`w-full p-2 rounded-2xl bg-white ${SANS}`}>
        {/* ========================================================== */}
        {/*  TOP · CTA banner                                           */}
        {/* ========================================================== */}
        <section className="relative overflow-hidden rounded-2xl">
          {/* backgroundImage stays inline — it's a variable, not a static class */}
          <motion.div
            initial={{ opacity: 0, scale: 1.06 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 bg-cover bg-center rouded-2xl"
            style={{ backgroundImage: `url(${CTA_BG})` }}
          />
          {/* Light wash, NOT a dark scrim — the artwork stays bright and the
              type reads as deep green on it. */}
          <div className="absolute inset-0 bg-[radial-gradient(58%_62%_at_50%_42%,rgba(255,252,244,0.88)_0%,rgba(255,252,244,0.55)_45%,rgba(255,252,244,0.12)_78%,rgba(255,252,244,0)_100%)]" />

          {/* OVERLAP 1 of 3 — extra bottom room only at lg, where the card is a
              single row and floats over this edge. Below lg the card is in
              normal flow so the reserve is removed. Never change one of the
              three overlap values alone. */}
          <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 pb-16 pt-16 text-center sm:pb-20 sm:pt-20 lg:pb-28">
            <motion.p
              variants={rise} initial="hidden" whileInView="show" viewport={{ once: true }} custom={0}
              className="mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#117307] sm:text-[11px] sm:tracking-[0.26em]"
            >
              <motion.span
                animate={{ rotate: [0, -8, 8, -4, 0] }}
                transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 1.4, ease: 'easeInOut' }}
                className="inline-flex"
              >
                <LeafMark className="h-4 w-4 shrink-0" />
              </motion.span>
              Your Journey, Our Pride
            </motion.p>

            <motion.h2
              variants={rise} initial="hidden" whileInView="show" viewport={{ once: true }} custom={1}
              className={`text-[clamp(1.85rem,5.6vw,4rem)] font-bold leading-[1.06] tracking-[-0.01em] text-[#14520C] ${SERIF}`}
            >
              Explore Neemuch
            </motion.h2>

            <motion.p
              variants={rise} initial="hidden" whileInView="show" viewport={{ once: true }} custom={2}
              className={`mt-2 text-[clamp(1.35rem,3.4vw,2.4rem)] font-semibold italic tracking-[0.01em] text-[#A16C21] ${SCRIPT}`}
            >
              Every Place tells a Story
            </motion.p>

            <motion.div variants={rise} initial="hidden" whileInView="show" viewport={{ once: true }} custom={3}>
              <Ornament />
            </motion.div>

            {/* Designed three lines from sm up, natural wrapping on a phone */}
            <motion.p
              variants={rise} initial="hidden" whileInView="show" viewport={{ once: true }} custom={4}
              className="mt-5 max-w-md text-sm font-medium leading-[1.9] text-[#3F4A3C]"
            >
              From cantonment heritage to sacred temples,
              <br className="hidden sm:inline" /> the opium & alkaloid legacy to the Malwa countryside —
              <br className="hidden sm:inline" /> Neemuch has it all.
            </motion.p>

            <motion.div
              variants={rise} initial="hidden" whileInView="show" viewport={{ once: true }} custom={5}
              className="mt-7 flex w-full max-w-xs flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:justify-center"
            >
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }} transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}>
                <Link
                  href="#explore"
                  className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-[#117307] px-7 py-3.5 text-[13.5px] font-semibold text-white shadow-[0_6px_20px_rgba(17,115,7,0.28)] transition-shadow duration-300 hover:shadow-[0_10px_26px_rgba(17,115,7,0.36)]"
                >
                  <Compass className="h-4 w-4 shrink-0" strokeWidth={2} />
                  Explore Destinations
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }} transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}>
                <Link
                  href="mailto:info@neemuchtourify.com?subject=Trip%20Enquiry"
                  className="inline-flex items-center justify-center gap-2.5 rounded-lg border border-[#14520C]/15 bg-white/95 px-7 py-3.5 text-[13.5px] font-semibold text-[#14520C] shadow-[0_4px_14px_rgba(20,82,12,0.10)] backdrop-blur-sm transition-colors duration-300 hover:bg-white"
                >
                  <MapPin className="h-4 w-4 shrink-0" strokeWidth={2} />
                  Plan Your Trip
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ========================================================== */}
        {/*  Benefits card — sibling of both sections, at z-20.          */}
        {/*  It can't live inside the banner: overflow-hidden clipped    */}
        {/*  the overhang, and its z-index was trapped in the banner's   */}
        {/*  stacking context so the later footer painted over it.       */}
        {/* ========================================================== */}
        <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6">
          {/* OVERLAP 2 of 3 — -mt must stay SMALLER than the card's own height
              (~92px at lg) or the seam ends up below the card instead of
              running through it. -mt-12 (48px) puts the seam about halfway up,
              which is the reference layout. Below lg the card is 2 or 4 rows
              tall, so it sits in normal flow with a positive margin instead. */}
          <motion.div
            variants={staggerGroup}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="mt-8 grid grid-cols-1 rounded-2xl shadow-sm bg-white px-2 py-2  sm:grid-cols-2 lg:-mt-12 lg:grid-cols-4"
          >
            {BENEFITS.map((b, i) => {
              const Icon = b.icon;
              const last = i === BENEFITS.length - 1;
              // Dividers follow the actual column count at each breakpoint —
              // horizontal when stacked, vertical when side by side. The old
              // rules assumed 4-up and left the 1-up state with none at all.
              const rules = [
                last ? '' : 'border-b',
                i % 2 === 0 ? 'sm:border-r' : 'sm:border-r-0',
                i >= 2 ? 'sm:border-b-0' : '',
                'lg:border-b-0',
                last ? 'lg:border-r-0' : 'lg:border-r',
              ].join(' ');

              return (
                <motion.div
                  key={b.id}
                  variants={riseChild}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className={`flex items-start gap-3.5 px-5 py-5 ${RULE} ${rules}`}
                >
                  <motion.span
                    whileHover={{ scale: 1.1, rotate: 4 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F1F7EE] text-[#117307]"
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.7} />
                  </motion.span>
                  <div>
                    <h3 className="text-[13.5px] font-semibold text-[#1F2A1C]">{b.title}</h3>
                    <p className="mt-1 text-xs leading-[1.6] text-[#3E3D3E]">{b.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* ========================================================== */}
        {/*  BOTTOM · footer — z-0 so it stays under the card above.     */}
        {/*  Explicit cream bg: without it this section inherited a      */}
        {/*  slightly different tone from the banner's fade, which read  */}
        {/*  as a third colour band under the card.                      */}
        {/* ========================================================== */}
        <section className="relative z-0 bg-white">
          {/* OVERLAP 3 of 3 */}
          <div className="mx-auto max-w-7xl px-6 pb-6 pt-14 lg:pt-16">
            <motion.div
              variants={staggerGroup}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-12"
            >

              {/* Brand + description + socials */}
              <motion.div variants={riseChild} className="sm:col-span-2 lg:col-span-5">
                <Link href="#top" className="flex items-center gap-3">
                  <motion.div whileHover={{ scale: 1.05, rotate: -2 }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}>
                    <Image
                      src="/logo.avif"
                      alt="Neemuch Tourify"
                      width={160}
                      height={64}
                      className="h-14 w-auto shrink-0 rounded-full"
                    />
                  </motion.div>
                  <span className={`text-[17px] font-bold leading-tight text-[#117307] sm:text-[18px] ${SERIF}`}>
                    Neemuch
                    <br />
                    Tourify
                  </span>
                </Link>

                <p className="mt-5 max-w-md text-sm leading-[1.85] font-medium text-[#6B7268]">
                  Neemuch Tourify is an independent digital tourism guide promoting the cultural,
                  historical, and rural tourism of Neemuch district — its cantonment heritage, temples,
                  and the Malwa countryside — with reliable, well-researched information.
                </p>

                <h4 className={`mb-3 mt-6 ${EYEBROW}`}>Follow Us</h4>
                <motion.div
                  variants={staggerGroup}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="flex flex-wrap items-center gap-2.5"
                >
                  {SOCIALS.map((s) => {
                    const Icon = s.icon;
                    return (
                      <motion.a
                        key={s.id}
                        variants={riseChild}
                        whileHover={{ y: -3, scale: 1.08 }}
                        whileTap={{ scale: 0.94 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        title={s.label}
                        className={`flex h-9 w-9 items-center justify-center rounded-full text-white shadow-sm hover:shadow-lg ${s.className}`}
                      >
                        <Icon className="h-[17px] w-[17px]" />
                      </motion.a>
                    );
                  })}
                </motion.div>
              </motion.div>

              {/* Link columns — nested 2-up at base so they sit side by side on
                  a phone instead of stacking into a tall ribbon. */}
              <motion.div variants={riseChild} className="grid grid-cols-2 gap-x-8 sm:col-span-2 lg:col-span-4">
                {LINK_COLUMNS.map((col) => (
                  <LinkColumn key={col.id} column={col} />
                ))}
              </motion.div>

              {/* Contact */}
              <motion.div variants={riseChild} className="sm:col-span-2 lg:col-span-3">
                <h4 className={`mb-4 ${EYEBROW}`}>Get in Touch</h4>
                <ul className="space-y-3.5">
                  <ContactRow icon={Mail} label="Email">
                    <a href="mailto:info@neemuchtourify.com" className="break-all transition-colors hover:text-[#117307]">
                      info@neemuchtourify.com
                    </a>
                  </ContactRow>
                  <ContactRow icon={Phone} label="Phone">
                    <a href="tel:022-69622327" className="transition-colors hover:text-[#117307]">
                      022-69622327
                    </a>
                    <span className="block">Mon to Fri, 09:30 – 05:00 PM</span>
                  </ContactRow>
                  <ContactRow icon={MapPin} label="Address">
                    Neemuch, Madhya Pradesh, 458441
                  </ContactRow>
                </ul>
              </motion.div>
            </motion.div>
          </div>

          {/* ── Decorative monument skyline goes here — skipped per request.
                Drop the illustration in as a full-width <img> or inline SVG. ── */}
          <div className="h-8" aria-hidden />

          {/* copyright bar */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className={`border-t ${RULE}`}
          >
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-2 px-6 py-4 text-center text-sm text-[#7A8076] sm:flex-row sm:gap-0">
              <p>© {new Date().getFullYear()} Neemuch Tourify. All rights reserved</p>
            </div>
          </motion.div>
        </section>
      </footer>
    </>
  );
}
