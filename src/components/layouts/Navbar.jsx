'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { Phone, ChevronDown, Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from './TranslationProvider';

// Single-page site — links scroll to sections on the same page instead of
// routing to separate pages.
const NAV_LINKS = [
  { label: 'Home',       href: '#top'       },
  { label: 'About',      href: '#about'     },
  { label: 'Explore',    href: '#explore'   },
  { label: 'Festivals',  href: '#festivals' },
  { label: 'Panchayats', href: '/panchayats'},
  { label: 'Reviews',    href: '#reviews'   },
];

const LANGUAGES = [
  { code: 'en', name: 'EN',    fullName: 'English'   },
  { code: 'hi', name: 'हिं',   fullName: 'हिंदी'     },
  { code: 'gu', name: 'ગુજ',   fullName: 'ગુજરાતી'   },
  { code: 'mr', name: 'मरा',   fullName: 'मराठी'     },
  { code: 'ta', name: 'தமி',   fullName: 'தமிழ்'     },
  { code: 'te', name: 'తెలు',  fullName: 'తెలుగు'    },
  { code: 'kn', name: 'ಕನ್ನ',  fullName: 'ಕನ್ನಡ'    },
  { code: 'ml', name: 'മലയ',   fullName: 'മലയാളം'   },
  { code: 'bn', name: 'বাং',   fullName: 'বাংলা'     },
  { code: 'pa', name: 'ਪੰਜਾ',  fullName: 'ਪੰਜਾਬੀ'   },
  { code: 'or', name: 'ଓଡ଼ି',  fullName: 'ଓଡ଼ିଆ'    },
  { code: 'as', name: 'অসমী',  fullName: 'অসমীয়া'   },
  { code: 'ur', name: 'اردو',  fullName: 'اردو'      },
];

/* ─── Language Switcher ──────────────────────────────────────────────────── */
function LanguageSwitcher() {
  const { currentLanguage, switchLanguage, isTranslating } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const current = LANGUAGES.find(l => l.code === currentLanguage) || LANGUAGES[0];

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative notranslate">
      <motion.button
        onClick={() => setIsOpen(p => !p)}
        disabled={isTranslating}
        className="flex items-center gap-1.5 py-1 px-1 hover:opacity-75 transition-opacity duration-150 disabled:opacity-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.15 }}
      >
        <img
          src="https://flagcdn.com/w40/in.png"
          alt="India"
          className="w-6 h-4 object-cover rounded-sm"
        />
        <span className="text-[13px] font-semibold text-gray-800 tracking-wide font-poppins">
          {isTranslating ? '...' : current.name}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center"
        >
          <ChevronDown size={13} className="text-gray-500" />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0,  scale: 1     }}
            exit={{   opacity: 0, y: -8, scale: 0.96   }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute top-full right-0 mt-2 w-44 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[999] max-h-72 overflow-y-auto"
          >
            {LANGUAGES.map((lang, idx) => (
              <motion.button
                key={lang.code}
                onClick={() => {
                  if (lang.code !== currentLanguage && !isTranslating) {
                    switchLanguage(lang.code);
                    setIsOpen(false);
                  }
                }}
                disabled={isTranslating}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors duration-100 hover:bg-green-50 notranslate font-poppins font-medium disabled:opacity-50 ${
                  currentLanguage === lang.code
                    ? 'bg-[#edf7ec] text-[#0F7206] font-semibold'
                    : 'text-gray-700'
                }`}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.025, duration: 0.18 }}
                whileHover={{ x: 2 }}
              >
                <img
                  src="https://flagcdn.com/w40/in.png"
                  alt="India"
                  className="w-6 h-4 object-cover rounded-sm flex-shrink-0"
                />
                <span className="flex-1">{lang.fullName}</span>
                {currentLanguage === lang.code && (
                  <span className="text-[#0F7206] font-bold text-xs">✓</span>
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Navbar ─────────────────────────────────────────────────────────────── */
export default function Navbar() {
  const router   = useRouter();
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);

  const go = (href) => {
    if (href.startsWith('#')) {
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(href);
    }
    setIsMenuOpen(false);
  };
  const isActive = (href) => !href.startsWith('#') && pathname.startsWith(href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  useEffect(() => {
    document.body.style.paddingTop = '72px';
    return () => { document.body.style.paddingTop = '0'; };
  }, []);

  /* Smooth scroll-linked motion values — purely visual, no layout impact */
  const { scrollY } = useScroll();
  const shadowOpacity = useTransform(scrollY, [0, 120], [0, 0.18]);
  const logoScale     = useTransform(scrollY, [0, 120], [1, 0.94]);
  const borderOpacity = useTransform(scrollY, [0, 120], [0, 1]);

  return (
    <motion.nav
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        boxShadow: useTransform(
          shadowOpacity,
          (v) => `0 4px 24px -4px rgba(15,114,6,${v})`
        ),
      }}
      className="w-full fixed top-0 z-50 bg-white font-poppins"
    >
      <motion.div
        style={{ opacity: borderOpacity }}
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gray-100"
      />
      <div className="mx-auto px-8 max-w-8xl">

        {/* ── DESKTOP ───────────────────────────────────────────────── */}
        <div className="hidden lg:flex items-center h-[72px] relative">

          {/* Logo */}
          <motion.div
            className="flex items-center cursor-pointer flex-shrink-0"
            onClick={() => go('/')}
            style={{ scale: logoScale }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <Image
              src="/logo.avif"
              alt="Neemuch Tourify"
              width={160}
              height={64}
              className="h-16 w-auto object-contain"
              priority
            />
          </motion.div>

          {/* Nav links — centered */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-9">
            {NAV_LINKS.map((link, i) => {
              const active = isActive(link.href);
              return (
                <motion.button
                  key={i}
                  onClick={() => go(link.href)}
                  className="relative text-[13.5px] font-bold font-poppins uppercase tracking-[0.08em] py-1 group whitespace-nowrap cursor-pointer"
                  style={{ color: active ? '#0F7206' : '#1A1A1A' }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.35, ease: 'easeOut' }}
                  whileHover={{ color: '#0F7206', y: -1 }}
                >
                  {link.label}

                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-0 w-full h-[2.5px] bg-[#0F7206] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  {!active && (
                    <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 rounded-full bg-[#0F7206] transition-all duration-300 group-hover:w-full" />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Right */}
          <motion.div
            className="flex items-center gap-3 ml-auto flex-shrink-0"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4, ease: 'easeOut' }}
          >
            <LanguageSwitcher />
            <div className="w-px h-6 bg-gray-300 mx-1" />
            <motion.button
              onClick={() => go('/contact')}
              className="flex items-center gap-2 pl-1 pr-5 py-1 rounded-full bg-[#127407] text-white text-[13px] font-semibold font-poppins shadow-md"
              whileHover={{
                scale: 1.04,
                backgroundColor: '#0d5c06',
                boxShadow: '0 6px 20px rgba(18,116,7,0.40)',
              }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.15 }}
            >
              <motion.span
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0"
                whileHover={{ rotate: 12 }}
                transition={{ duration: 0.2 }}
              >
                <Phone size={14} className="text-[#127407]" strokeWidth={2.5} />
              </motion.span>
              Contact
            </motion.button>
          </motion.div>
        </div>

        {/* ── MOBILE TOPBAR ─────────────────────────────────────────── */}
        <div className="lg:hidden flex items-center justify-between h-16">
          <motion.div
            className="cursor-pointer"
            onClick={() => go('/')}
            style={{ scale: logoScale }}
            whileTap={{ scale: 0.95 }}
          >
            <Image src="/logo.avif" alt="Neemuch Tourify" width={120} height={48} className="h-12 w-auto" />
          </motion.div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <motion.button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 rounded-xl text-[#117307] hover:bg-green-50 transition-colors"
              whileTap={{ scale: 0.9, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <Menu size={22} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* ── MOBILE SLIDE-IN MENU ──────────────────────────────────────── */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="lg:hidden fixed inset-0 z-[59] bg-black/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="lg:hidden fixed top-0 right-0 bottom-0 z-[60] w-4/5 max-w-xs bg-[#f5fbf2] flex flex-col shadow-2xl font-poppins"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-green-100">
                <Image
                  src="/logo.avif"
                  alt="Neemuch Tourify"
                  width={100}
                  height={40}
                  className="h-10 w-auto cursor-pointer"
                  onClick={() => go('/')}
                />
                <motion.button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-full text-[#117307] hover:bg-green-100"
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={22} />
                </motion.button>
              </div>

              <div className="flex flex-col px-6 py-6 gap-1 flex-1">
                {NAV_LINKS.map((link, i) => {
                  const active = isActive(link.href);
                  return (
                    <motion.button
                      key={i}
                      onClick={() => go(link.href)}
                      className={`text-left px-4 py-3 rounded-xl text-[13px] font-semibold font-poppins uppercase tracking-wider transition-colors ${
                        active
                          ? 'bg-green-100 text-[#0F7206]'
                          : 'text-[#1A1A1A] hover:bg-green-50 hover:text-[#0F7206]'
                      }`}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.25 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {link.label}
                    </motion.button>
                  );
                })}
              </div>

              <div className="px-6 pb-8">
                <motion.button
                  onClick={() => go('/contact')}
                  className="w-full flex items-center justify-center gap-2 pl-1 pr-6 py-2 rounded-full bg-[#117307] text-white font-semibold font-poppins shadow-md"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: NAV_LINKS.length * 0.05 + 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                    <Phone size={16} className="text-[#117307]" strokeWidth={2.5} />
                  </span>
                  Contact Us
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
