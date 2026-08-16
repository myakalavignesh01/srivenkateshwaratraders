import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Tractor, Sprout, Phone, ArrowUpRight, MapPin, Wheat, ShieldCheck, Sparkles, ChevronDown } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface HeroSectionProps {
  language: Language;
  onOpenTractorBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  onOpenTractorBooking,
}) => {
  const t = translations[language];
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5, rawX: 0, rawY: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePos({ x, y, rawX: e.clientX, rawY: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Floating particles
  const particles = [
    { top: '20%', left: '15%', size: 'w-2 h-2', delay: 0, duration: 4 },
    { top: '65%', left: '25%', size: 'w-1.5 h-1.5', delay: 1.2, duration: 5 },
    { top: '35%', left: '80%', size: 'w-2.5 h-2.5', delay: 0.5, duration: 4.5 },
    { top: '75%', left: '70%', size: 'w-1 h-1', delay: 2, duration: 3.5 },
    { top: '15%', left: '60%', size: 'w-2 h-2', delay: 1.8, duration: 4.8 },
  ];

  return (
    <section
      id="hero-section"
      ref={containerRef}
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#1A2E22] text-[#F9F8F4] pt-28 pb-16"
    >
      {/* Background Agriculture Image with Layered Parallax */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 ease-out will-change-transform scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=85')`,
          transform: `translate(${(mousePos.x - 0.5) * -16}px, ${(mousePos.y - 0.5) * -16}px) scale(1.05)`,
        }}
      >
        {/* Layered cinematic overlays: Natural Tones deep botanical green and earthy contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A2E22] via-[#1A2E22]/85 to-[#1A2E22]/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.18)_0%,transparent_65%)]" />
      </div>

      {/* Interactive Cursor Spotlight */}
      <div
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300 hidden md:block"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.rawX}px ${mousePos.rawY}px, rgba(212, 175, 55, 0.08), transparent 80%)`,
        }}
      />

      {/* Floating Golden Drift Spores */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full bg-[#D4AF37] pointer-events-none z-0 ${p.size}`}
          style={{ top: p.top, left: p.left }}
          animate={{
            y: [-10, 15, -10],
            x: [-5, 8, -5],
            opacity: [0.2, 0.7, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Atmospheric Particles Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30 bg-noise" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline & Action Buttons */}
          <div className="lg:col-span-7">
            {/* Natural Tones Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-8 h-[1px] bg-[#D4AF37]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
                {language === 'te' ? 'స్థాపన 1998 • మాధారం, ఉర్కొండ మండలం' : 'Since 1998 • Madharam, Telangana'}
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.05] mb-6 text-[#F9F8F4]"
            >
              {language === 'te' ? (
                <span className="font-telugu font-bold leading-tight">
                  రైతన్నతో పాటు <br />
                  <span className="text-[#D4AF37] italic font-serif">మేము ఎదుగుతాం.</span>
                </span>
              ) : (
                <>
                  <span className="italic">We grow</span> <br />
                  <span className="italic">with every</span> <br />
                  <span className="text-[#D4AF37] not-italic font-bold font-serif">Farmer.</span>
                </>
              )}
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-[#F9F8F4]/80 font-light leading-relaxed mb-8 max-w-xl"
            >
              {t.hero.subhead}
            </motion.p>

            {/* Primary Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10"
            >
              <motion.a
                id="hero-explore-btn"
                href="#services"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="px-7 py-3.5 rounded-full bg-[#2D5A27] hover:bg-[#23481e] text-white font-bold text-xs uppercase tracking-widest transition-all shadow-lg border border-[#D4AF37]/30 flex items-center gap-2 group cursor-pointer"
              >
                <span>{t.hero.exploreServices}</span>
                <ArrowUpRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.a>

              <motion.button
                id="hero-book-tractor-btn"
                onClick={onOpenTractorBooking}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3.5 rounded-full bg-[#D4AF37] hover:bg-[#c5a028] text-[#1A2E22] font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 shadow-md cursor-pointer"
              >
                <Tractor className="w-4 h-4 text-[#1A2E22]" />
                <span>{t.hero.bookTractor}</span>
              </motion.button>

              <motion.a
                id="hero-call-now-btn"
                href="tel:9705806070"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="px-5 py-3.5 rounded-full border border-[#D4AF37]/60 text-[#D4AF37] hover:bg-[#D4AF37]/10 font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{t.hero.callNow}</span>
              </motion.a>
            </motion.div>

            {/* Trust Pillars Grid with Scroll Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-[#F9F8F4]/15"
            >
              <motion.div
                whileHover={{ y: -3, backgroundColor: 'rgba(249, 248, 244, 0.08)' }}
                className="flex items-start gap-3 bg-[#F9F8F4]/5 p-3.5 rounded-2xl border border-white/10 transition-colors"
              >
                <div className="p-2 rounded-full bg-[#2D5A27] text-[#D4AF37]">
                  <Sprout className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white font-serif tracking-wide">
                    {language === 'te' ? 'రైతు భరోసా' : 'Certified Seeds'}
                  </h4>
                  <p className="text-[11px] text-[#F9F8F4]/70 mt-0.5">
                    {language === 'te' ? 'హైబ్రిడ్ వరి, పత్తి, కంది' : 'Telangana Sona, Bt-2 Cotton'}
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -3, backgroundColor: 'rgba(249, 248, 244, 0.08)' }}
                className="flex items-start gap-3 bg-[#F9F8F4]/5 p-3.5 rounded-2xl border border-white/10 transition-colors"
              >
                <div className="p-2 rounded-full bg-[#2D5A27] text-[#D4AF37]">
                  <Tractor className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white font-serif tracking-wide">
                    {language === 'te' ? 'ట్రాక్టర్ సేవలు' : 'Machinery & Implements'}
                  </h4>
                  <p className="text-[11px] text-[#F9F8F4]/70 mt-0.5">
                    {language === 'te' ? 'దుక్కి, రోటవేటర్, రవాణా' : 'Rotavator, Plough, DCM'}
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -3, backgroundColor: 'rgba(249, 248, 244, 0.08)' }}
                className="flex items-start gap-3 bg-[#F9F8F4]/5 p-3.5 rounded-2xl border border-white/10 transition-colors"
              >
                <div className="p-2 rounded-full bg-[#2D5A27] text-[#D4AF37]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white font-serif tracking-wide">
                    {language === 'te' ? 'డిజిటల్ తూకం' : 'Direct Procurement'}
                  </h4>
                  <p className="text-[11px] text-[#F9F8F4]/70 mt-0.5">
                    {language === 'te' ? 'ఖచ్చితమైన కొనుగోలు' : 'Fair weighing & fast payout'}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Natural Tones Arch Visual Motif with Rotating Gold Seal */}
          <div className="lg:col-span-5 relative hidden lg:flex justify-center">
            {/* Rotating Gold Seal */}
            <motion.div
              animate={{ rotate: [10, 18, 10] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.08, rotate: 0 }}
              className="absolute -top-4 -right-4 z-20 w-28 h-28 rounded-full bg-[#D4AF37] text-[#1A2E22] flex flex-col items-center justify-center text-center p-2 border-4 border-[#F9F8F4] shadow-2xl cursor-default"
            >
              <span className="text-[9px] font-black uppercase tracking-widest leading-tight">Direct Farm</span>
              <span className="text-xs font-bold font-serif">BUYING</span>
              <span className="text-[9px] font-black uppercase tracking-wider text-[#1A2E22]/80">Center Open</span>
            </motion.div>

            {/* Arch Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-[340px] h-[480px] rounded-t-full border border-[#D4AF37]/40 overflow-hidden shadow-2xl relative bg-[#1A2E22] p-2 bg-gradient-to-b from-[#2D5A27]/40 to-[#1A2E22]"
            >
              <div className="w-full h-full rounded-t-full overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80"
                  alt="Madharam Agriculture Hub"
                  className="w-full h-full object-cover grayscale contrast-110 opacity-85 hover:grayscale-0 transition-all duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A2E22] via-[#1A2E22]/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F9F8F4] text-[#1A2E22] text-[10px] font-bold uppercase tracking-widest shadow-md">
                    <Sprout className="w-3 h-3 text-[#2D5A27]" />
                    <span>Sri Venkateshwara Hub</span>
                  </div>
                  <p className="text-xs text-[#F9F8F4] font-serif italic mt-2">
                    "Empowering farmers of Madharam & Urkonda since 1998"
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Interactive Bottom Scroll Cue */}
      <a
        href="#services"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity cursor-pointer z-10"
      >
        <span className="text-[10px] tracking-widest uppercase font-medium text-[#F9F8F4]/80">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center p-1"
        >
          <div className="w-1.5 h-2 rounded-full bg-[#D4AF37]" />
        </motion.div>
      </a>
    </section>
  );
};
