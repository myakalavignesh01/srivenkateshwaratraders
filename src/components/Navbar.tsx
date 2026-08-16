import React, { useState, useEffect } from 'react';
import { Sprout, Phone, MessageSquare, Menu, X, Languages } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[language];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t.nav.services, href: '#services' },
    { label: t.nav.mandiRates, href: '#mandi-rates' },
    { label: t.nav.tractor, href: '#tractor-works' },
    { label: t.nav.machineryEstimator, href: '#tractor-estimator' },
    { label: t.nav.products, href: '#products' },
    { label: t.nav.contact, href: '#contact' },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F9F8F4]/95 backdrop-blur-md shadow-md border-b border-[#1A2E22]/10 py-3 text-[#1A2E22]'
          : 'bg-gradient-to-b from-[#1A2E22]/80 via-[#1A2E22]/40 to-transparent py-4 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <a
          href="#"
          id="nav-logo"
          className="flex items-center gap-3 group focus:outline-none rounded-lg p-1"
        >
          <div className="w-10 h-10 rounded-full bg-[#2D5A27] border border-[#D4AF37]/50 flex items-center justify-center text-[#F9F8F4] font-serif text-lg font-bold shadow-md group-hover:scale-105 transition-transform">
            S
          </div>
          <div className="flex flex-col">
            <span className={`font-serif text-sm sm:text-base font-bold tracking-widest uppercase leading-tight ${isScrolled ? 'text-[#1A2E22]' : 'text-white'}`}>
              {language === 'te' ? 'శ్రీ వెంకటేశ్వర ట్రేడర్స్' : 'Sri Venkateshwara'}
            </span>
            <span className={`text-[11px] uppercase tracking-[0.2em] font-medium ${isScrolled ? 'text-[#1A2E22]/60' : 'text-white/70'}`}>
              {language === 'te' ? 'మాధారం • ఉర్కొండ' : 'Traders • Madharam'}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className={`hidden lg:flex items-center gap-7 text-[11px] font-semibold uppercase tracking-widest ${isScrolled ? 'text-[#1A2E22]' : 'text-[#F9F8F4]'}`}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`transition-colors py-1 relative hover:text-[#2D5A27] ${
                isScrolled ? 'opacity-70 hover:opacity-100' : 'opacity-85 hover:opacity-100'
              } after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#2D5A27] after:scale-x-0 hover:after:scale-x-100 after:transition-transform`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side controls: Language, Call, WhatsApp, Admin Login */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Language Switcher */}
          <button
            id="lang-toggle-btn"
            onClick={() => onLanguageChange(language === 'en' ? 'te' : 'en')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold tracking-wider transition-all cursor-pointer ${
              isScrolled
                ? 'border-[#1A2E22]/30 text-[#1A2E22] bg-white/60 hover:bg-[#2D5A27] hover:text-white hover:border-[#2D5A27]'
                : 'border-white/40 text-white bg-black/20 hover:bg-white hover:text-[#1A2E22]'
            }`}
            title="Switch Language (English / తెలుగు)"
          >
            <Languages className="w-3 h-3 text-[#D4AF37]" />
            <span>{language === 'en' ? 'తెలుగు' : 'English'}</span>
          </button>

          {/* WhatsApp Direct Link */}
          <a
            id="nav-whatsapp-btn"
            href="https://wa.me/919705806070?text=Namaste%20Sri%20Venkateshwara%20Traders,%20I%20need%20information%20about%20agricultural%20seeds/services."
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all ${
              isScrolled
                ? 'bg-[#25D366]/10 border-[#25D366]/40 text-[#1B4D2C] hover:bg-[#25D366]/20'
                : 'bg-[#25D366]/20 border-[#25D366]/50 text-[#86EFAC] hover:bg-[#25D366]/30'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
            <span className="hidden md:inline">{t.nav.whatsApp}</span>
          </a>

          {/* Call CTA Button */}
          <a
            id="nav-call-btn"
            href="tel:9705806070"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#2D5A27] hover:bg-[#23481e] text-white text-xs font-bold uppercase tracking-widest shadow-md transition-all active:scale-98"
          >
            <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>9705806070</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            id="mobile-lang-btn"
            onClick={() => onLanguageChange(language === 'en' ? 'te' : 'en')}
            className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
              isScrolled
                ? 'border-[#1A2E22]/20 text-[#1A2E22] bg-white'
                : 'border-white/30 text-white bg-black/30'
            }`}
          >
            {language === 'en' ? 'తె' : 'EN'}
          </button>

          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-full border focus:outline-none ${
              isScrolled
                ? 'border-[#1A2E22]/15 text-[#1A2E22] hover:bg-[#1A2E22]/5'
                : 'border-white/20 text-white hover:bg-white/10'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="sm:hidden bg-[#F9F8F4] border-b border-[#1A2E22]/15 text-[#1A2E22] px-5 py-5 space-y-3 shadow-2xl animate-in slide-in-from-top duration-200"
        >
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#1A2E22]/10">
            <a
              href="tel:9705806070"
              className="flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#2D5A27] text-white text-xs font-bold uppercase tracking-wider shadow"
            >
              <Phone className="w-4 h-4 text-[#D4AF37]" /> 9705806070
            </a>
            <a
              href="https://wa.me/919705806070"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#25D366]/15 border border-[#25D366]/40 text-[#174A25] text-xs font-bold uppercase tracking-wider"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" /> WhatsApp
            </a>
          </div>

          <div className="flex flex-col space-y-1 py-1 text-xs font-bold uppercase tracking-widest">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-lg hover:bg-[#2D5A27]/10 text-[#1A2E22] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
