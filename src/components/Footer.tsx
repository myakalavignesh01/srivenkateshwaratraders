import React from 'react';
import { Sprout, Phone, MessageSquare, MapPin, Heart, ArrowUp } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = translations[language];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1A2E22] text-[#F9F8F4]/80 border-t border-[#D4AF37]/20 pt-16 pb-24 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2D5A27] flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/40">
                <Sprout className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-white tracking-wide">
                  {language === 'te' ? 'శ్రీ వెంకటేశ్వర ట్రేడర్స్' : 'SRI VENKATESHWARA TRADERS'}
                </h3>
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] block">
                  Madharam • Urkonda Mandal • Nagarkurnool Dist
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#F9F8F4]/70 font-light leading-relaxed max-w-sm">
              {language === 'te'
                ? 'వ్యవసాయ విత్తనాలు, ఎరువులు, సస్యరక్షణ మందులు, ఆధునిక ట్రాక్టర్ యంత్రాలు మరియు ధాన్యం కొనుగోలు సేవలు.'
                : 'Dedicated to empowering regional farmers through certified seeds, crop protection, modern tractor mechanization, and transparent harvest procurement.'}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="tel:9705806070"
                className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white flex items-center gap-2 transition-colors uppercase tracking-wider"
              >
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>9705806070</span>
              </a>

              <a
                href="https://wa.me/919705806070"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-xs font-bold text-[#86EFAC] flex items-center gap-2 transition-colors uppercase tracking-wider"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              {language === 'te' ? 'త్వరిత లింకులు' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-2 text-xs text-[#F9F8F4]/70 font-light">
              <li>
                <a href="#services" className="hover:text-[#D4AF37] transition-colors">
                  {t.nav.services}
                </a>
              </li>
              <li>
                <a href="#mandi-rates" className="hover:text-[#D4AF37] transition-colors">
                  {t.nav.mandiRates}
                </a>
              </li>
              <li>
                <a href="#tractor-works" className="hover:text-[#D4AF37] transition-colors">
                  {t.nav.tractor}
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-[#D4AF37] transition-colors">
                  {t.nav.products}
                </a>
              </li>
              <li>
                <a href="#service-areas" className="hover:text-[#D4AF37] transition-colors">
                  {t.nav.areas}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#D4AF37] transition-colors">
                  {t.nav.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Business Hub & Details */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              {language === 'te' ? 'వ్యాపార చిరునామా' : 'Business Location'}
            </h4>
            <div className="text-xs text-[#F9F8F4]/70 font-light space-y-1">
              <p className="font-semibold text-white">Madharam Village, Urkonda Mandal</p>
              <p>Nagarkurnool District, Telangana - 509320</p>
              <p className="pt-2 text-[11px] text-[#D4AF37]">Hours: Mon - Sun: 6:30 AM - 8:30 PM</p>
              <p className="text-[11px] text-[#F9F8F4]/60">Dedicated to farmer welfare & verified quality supplies</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F9F8F4]/60 font-light">
          <p>© {new Date().getFullYear()} Sri Venkateshwara Traders, Madharam. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Made for rural Telangana agriculture with <Heart className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
