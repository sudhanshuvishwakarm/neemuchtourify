'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Globe,
  User,
  Tag,
  ShieldCheck,
  Headset,
  Lock,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';

const MESSAGE_MAX_LEN = 500;
const CONTACT_EMAIL = 'info@neemuchtourify.com';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

const cardsContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09
    }
  }
};

const cardItem = {
  hidden: { opacity: 0, y: 22, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

const formContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15
    }
  }
};

const formItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (formData.phone && !/^[0-9]{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Invalid phone number (10 digits required)';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Static site, no backend — a real submit just hands the message off to the
  // visitor's own email client via a pre-filled mailto: link.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const body = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      formData.phone ? `Phone: ${formData.phone}` : null,
      '',
      formData.message
    ].filter(Boolean).join('\n');

    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;

    setSent(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'message' && value.length > MESSAGE_MAX_LEN) return;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (sent) setSent(false);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Call Us',
      content: '022-69622327',
      href: 'tel:02269622327',
      subContent: 'Mon - Fri: 09:30 to 05:00 PM'
    },
    {
      icon: Globe,
      title: 'Website',
      content: 'www.neemuchtourify.in',
      href: 'https://neemuchtourify.in',
      subContent: 'Explore Neemuch'
    },
    {
      icon: Mail,
      title: 'Email Us',
      content: CONTACT_EMAIL,
      href: `mailto:${CONTACT_EMAIL}`,
      subContent: "We'll reply as soon as possible"
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      content: 'Neemuch, Madhya Pradesh, 458441',
      subContent: 'Malwa region, Madhya Pradesh'
    }
  ];

  const trustBadges = [
    {
      icon: ShieldCheck,
      title: 'Quick Response',
      subContent: 'We reply within 24 hours'
    },
    {
      icon: Headset,
      title: 'Expert Support',
      subContent: 'Our travel experts are always here to help'
    },
    {
      icon: Lock,
      title: 'Secure & Safe',
      subContent: 'Your information is 100% protected'
    }
  ];

  return (
    <div className="hideExtra min-h-screen bg-[#F8FDF7]">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-[#117307]">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(45deg, #FFFFFF 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }} />

        <motion.img
          src="https://res.cloudinary.com/dbwjg3ewu/image/upload/f_auto,q_auto/homepage_assets/left"
          alt=""
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 0.4, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-0 bottom-3 h-[80%] max-h-[380px] w-auto pointer-events-none select-none hidden sm:block"
        />

        <motion.img
          src="https://res.cloudinary.com/dbwjg3ewu/image/upload/f_auto,q_auto/homepage_assets/right"
          alt=""
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 0.4, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-0 bottom-0 h-[83%] max-h-[380px] w-auto pointer-events-none select-none hidden sm:block"
        />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } }
          }}
          className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14 md:pt-12 md:pb-16 text-center"
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
            <MessageSquare className="mx-auto mb-4 text-white" size={40} />
          </motion.div>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-[#F4C542] mb-2"
          >
            We're Here to Help
          </motion.p>
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Let's Plan Your Perfect Journey
          </motion.h1>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-base md:text-lg text-white opacity-90 max-w-2xl mx-auto"
          >
            Have questions about travel in Neemuch? We're here to help you plan your perfect journey.
          </motion.p>
        </motion.div>
      </div>

      {/* Wave divider */}
      <div className="relative -top-10 w-full scale-y-[-1] leading-[0] z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1280 40"
          preserveAspectRatio="none"
          className="block w-full h-[40px]"
        >
          <defs>
            <filter id="waveShadow" x="-10%" y="-20%" width="120%" height="180%">
              <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#0B3D08" floodOpacity="0.25" />
            </filter>
          </defs>
          <path
            filter="url(#waveShadow)"
            d="
              M 0 0
              L 0 26
              C 15 27, 18 20, 32 22
              C 48 24, 55 29, 70 24
              C 86 19, 94 28, 110 24
              C 126 20, 132 17, 148 21
              C 164 25, 174 27, 190 23
              C 207 19, 214 26, 230 23
              C 246 20, 256 15, 272 20
              C 288 25, 296 27, 312 22
              C 330 17, 338 25, 354 21
              C 370 17, 380 14, 396 20
              C 412 26, 420 27, 438 22
              C 454 18, 465 14, 480 20
              C 496 26, 505 28, 522 23
              C 540 18, 548 24, 565 21
              C 582 18, 590 13, 606 20
              C 622 27, 633 28, 650 23
              C 668 18, 676 25, 694 21
              C 712 17, 720 14, 738 20
              C 756 26, 765 28, 782 23
              C 800 18, 810 25, 826 21
              C 844 17, 852 13, 870 20
              C 888 27, 898 27, 916 22
              C 934 17, 942 25, 960 21
              C 978 17, 988 14, 1004 20
              C 1022 27, 1032 28, 1050 22
              C 1068 17, 1076 24, 1094 21
              C 1112 18, 1122 13, 1138 20
              C 1154 27, 1166 28, 1182 23
              C 1198 18, 1208 25, 1224 21
              C 1240 17, 1250 14, 1264 20
              C 1272 23, 1276 25, 1280 23
              L 1280 0
              Z
            "
            fill="#F8FDF7"
          />
        </svg>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14 md:pb-20 -mt-2">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">

          {/* Left: 2x2 info cards + map */}
          <div className="lg:col-span-5">
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardsContainer}
            >
              {contactInfo.map((info, index) => {
                const Icon = info.icon;

                return (
                  <motion.div
                    key={index}
                    variants={cardItem}
                    whileHover={{ y: -4, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
                    className="group relative overflow-hidden rounded-2xl bg-white px-5 py-7 text-center shadow-[0_2px_10px_rgba(20,82,12,0.06)] ring-1 ring-[#EEEAE0] transition-shadow duration-300 hover:shadow-[0_14px_28px_rgba(20,82,12,0.12)] hover:ring-transparent"
                  >
                    <motion.span
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="mx-auto mb-3.5 flex h-13 w-13 items-center justify-center rounded-full bg-[#E9F5E6] text-[#117307]"
                      style={{ height: 52, width: 52 }}
                    >
                      <Icon size={22} strokeWidth={1.8} />
                    </motion.span>
                    <h3 className="mb-1.5 text-[14.5px] font-bold text-[#1F2A1C]">
                      {info.title}
                    </h3>
                    {info.href ? (
                      <a
                        href={info.href}
                        target={info.href.startsWith('http') ? '_blank' : undefined}
                        rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-sm font-semibold text-[#117307] hover:underline break-words"
                      >
                        {info.content}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold text-[#3E4A3A]">
                        {info.content}
                      </p>
                    )}
                    {info.subContent && (
                      <p className="mt-0.5 text-xs text-[#8A9084]">
                        {info.subContent}
                      </p>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="relative mt-4 overflow-hidden rounded-2xl shadow-[0_2px_10px_rgba(20,82,12,0.06)] ring-1 ring-[#EEEAE0]"
            >
              <a
                href="https://www.google.com/maps?q=Neemuch,Madhya+Pradesh"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-bold text-[#117307] shadow-[0_2px_8px_rgba(20,82,12,0.15)] transition-colors hover:bg-[#F8FDF7]"
              >
                Open in Maps
                <ExternalLink size={13} strokeWidth={2.2} />
              </a>
              <iframe
                title="Neemuch Tourify location"
                src="https://www.google.com/maps?q=Neemuch,Madhya+Pradesh&output=embed"
                width="100%"
                height="230"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>

          {/* Right: heading + stacked form */}
          <div className="lg:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2 text-3xl md:text-4xl font-bold text-[#14520C]"
            >
              <span aria-hidden="true">🌿</span>
              Get In Touch
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="mt-3 max-w-lg text-md leading-6 text-[#6b7268]"
            >
              Planning a trip to Neemuch or just have a question? Fill out the form
              below — it opens a pre-filled email in your own mail app, straight to our team.
            </motion.p>

            <motion.form
              onSubmit={handleSubmit}
              className="mt-8 space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={formContainer}
            >
              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
                <motion.div variants={formItem}>
                  <label className="mb-1.5 block text-[11.5px] font-bold uppercase tracking-[0.1em] text-[#7A8076]">
                    Name
                  </label>
                  <div className={`flex items-center gap-2.5 rounded-xl border bg-white px-3.5 py-3 transition-colors focus-within:border-[#117307] ${
                    errors.name ? 'border-red-500' : 'border-[#E3E0D4]'
                  }`}>
                    <User size={17} className="shrink-0 text-[#8A9084]" strokeWidth={1.8} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border-0 bg-transparent p-0 text-[14.5px] text-[#2E3A3B] placeholder:text-[#B7BEB2] focus:outline-none focus:ring-0"
                      placeholder="Your name"
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name}</p>}
                </motion.div>

                <motion.div variants={formItem}>
                  <label className="mb-1.5 block text-[11.5px] font-bold uppercase tracking-[0.1em] text-[#7A8076]">
                    Email
                  </label>
                  <div className={`flex items-center gap-2.5 rounded-xl border bg-white px-3.5 py-3 transition-colors focus-within:border-[#117307] ${
                    errors.email ? 'border-red-500' : 'border-[#E3E0D4]'
                  }`}>
                    <Mail size={17} className="shrink-0 text-[#8A9084]" strokeWidth={1.8} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border-0 bg-transparent p-0 text-[14.5px] text-[#2E3A3B] placeholder:text-[#B7BEB2] focus:outline-none focus:ring-0"
                      placeholder="your@email.com"
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>}
                </motion.div>
              </div>

              {/* Phone & Subject */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
                <motion.div variants={formItem}>
                  <label className="mb-1.5 block text-[11.5px] font-bold uppercase tracking-[0.1em] text-[#7A8076]">
                    Phone (Optional)
                  </label>
                  <div className={`flex items-center gap-2.5 rounded-xl border bg-white px-3.5 py-3 transition-colors focus-within:border-[#117307] ${
                    errors.phone ? 'border-red-500' : 'border-[#E3E0D4]'
                  }`}>
                    <Phone size={17} className="shrink-0 text-[#8A9084]" strokeWidth={1.8} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full border-0 bg-transparent p-0 text-[14.5px] text-[#2E3A3B] placeholder:text-[#B7BEB2] focus:outline-none focus:ring-0"
                      placeholder="10-digit mobile number"
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs mt-1.5">{errors.phone}</p>}
                </motion.div>

                <motion.div variants={formItem}>
                  <label className="mb-1.5 block text-[11.5px] font-bold uppercase tracking-[0.1em] text-[#7A8076]">
                    Subject
                  </label>
                  <div className={`flex items-center gap-2.5 rounded-xl border bg-white px-3.5 py-3 transition-colors focus-within:border-[#117307] ${
                    errors.subject ? 'border-red-500' : 'border-[#E3E0D4]'
                  }`}>
                    <Tag size={17} className="shrink-0 text-[#8A9084]" strokeWidth={1.8} />
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full border-0 bg-transparent p-0 text-[14.5px] text-[#2E3A3B] placeholder:text-[#B7BEB2] focus:outline-none focus:ring-0"
                      placeholder="e.g. Feedback, Suggestion, Trip Enquiry"
                    />
                  </div>
                  {errors.subject && <p className="text-red-500 text-xs mt-1.5">{errors.subject}</p>}
                </motion.div>
              </div>

              {/* Message */}
              <motion.div variants={formItem}>
                <label className="mb-1.5 block text-[11.5px] font-bold uppercase tracking-[0.1em] text-[#7A8076]">
                  Message
                </label>
                <div className={`flex items-start gap-2.5 rounded-xl border bg-white px-3.5 py-3 transition-colors focus-within:border-[#117307] ${
                  errors.message ? 'border-red-500' : 'border-[#E3E0D4]'
                }`}>
                  <MessageSquare size={17} className="mt-0.5 shrink-0 text-[#8A9084]" strokeWidth={1.8} />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    maxLength={MESSAGE_MAX_LEN}
                    className="w-full resize-none border-0 bg-transparent p-0 text-[14.5px] text-[#2E3A3B] placeholder:text-[#B7BEB2] focus:outline-none focus:ring-0"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>
                <div className="mt-1.5 flex items-center justify-between">
                  {errors.message ? (
                    <p className="text-red-500 text-xs">{errors.message}</p>
                  ) : <span />}
                  <p className="text-xs text-[#B7BEB2]">
                    {formData.message.length} / {MESSAGE_MAX_LEN}
                  </p>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                variants={formItem}
                type="submit"
                whileHover={{ y: -2, boxShadow: '0 20px 25px -5px rgba(17,115,7,0.25)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="mt-2 flex w-full items-center justify-center gap-2.5 rounded-full bg-[#117307] px-10 py-3.5 text-[15px] font-bold text-white transition-colors duration-300 hover:bg-[#0d5c06]"
              >
                <Send size={18} />
                <span>Send Message</span>
              </motion.button>

              {sent && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm font-medium text-[#117307]"
                >
                  <CheckCircle2 size={16} />
                  Opening your email app with your message pre-filled — just hit send there.
                </motion.p>
              )}
            </motion.form>

            {/* Trust badges */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardsContainer}
              className="mt-9 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 border-t border-[#EEEAE0] pt-7"
            >
              {trustBadges.map((badge, index) => {
                const Icon = badge.icon;
                return (
                  <motion.div key={index} variants={cardItem} className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E9F5E6] text-[#117307]">
                      <Icon size={18} strokeWidth={1.8} />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-[#1F2A1C]">{badge.title}</p>
                      <p className="mt-0.5 text-sm leading-6 text-[#6b7268]">{badge.subContent}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
