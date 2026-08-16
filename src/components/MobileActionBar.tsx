import React from 'react';
import { Phone, MessageSquare, Tractor, Package, Languages } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface MobileActionBarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenTractorBooking: () => void;
}

export const MobileActionBar: React.FC<MobileActionBarProps> = ({
  language,
  onLanguageChange,
  onOpenTractorBooking,
}) => {
  const t = translations[language];

  return (
    <div
      id="mobile-sticky-action-bar"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#1A2E22]/95 backdrop-blur-md border-t border-[#D4AF37]/30 px-3 py-2 shadow-2xl"
    >
      <div className="flex items-center justify-between gap-1.5 max-w-md mx-auto">
        {/* Call CTA */}
        <a
          id="mobile-action-call"
          href="tel:9705806070"
          className="flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-full bg-[#2D5A27] text-white active:scale-95 transition-transform"
        >
          <Phone className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-[10px] font-bold mt-0.5 uppercase tracking-wider">Call</span>
        </a>

        {/* WhatsApp CTA */}
        <a
          id="mobile-action-whatsapp"
          href="https://wa.me/919705806070?text=Namaste%20Sri%20Venkateshwara%20Traders"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 text-[#86EFAC] active:scale-95 transition-transform"
        >
          <MessageSquare className="w-4 h-4 text-[#25D366]" />
          <span className="text-[10px] font-bold mt-0.5 uppercase tracking-wider">Chat</span>
        </a>

        {/* Book Tractor Modal Trigger */}
        <button
          id="mobile-action-tractor"
          onClick={onOpenTractorBooking}
          className="flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-full bg-[#14251B] text-[#D4AF37] border border-[#D4AF37]/30 active:scale-95 transition-transform cursor-pointer"
        >
          <Tractor className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-[10px] font-bold mt-0.5 uppercase tracking-wider">Tractor</span>
        </button>

        {/* Products Shortcut */}
        <a
          id="mobile-action-products"
          href="#products"
          className="flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-full bg-[#14251B] text-white border border-white/10 active:scale-95 transition-transform"
        >
          <Package className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-[10px] font-bold mt-0.5 uppercase tracking-wider">
            {language === 'te' ? 'స్టాక్' : 'Products'}
          </span>
        </a>

        {/* Language Toggle */}
        <button
          id="mobile-action-lang"
          onClick={() => onLanguageChange(language === 'en' ? 'te' : 'en')}
          className="flex flex-col items-center justify-center py-2 px-2.5 rounded-full bg-[#D4AF37] text-[#1A2E22] active:scale-95 transition-transform cursor-pointer"
        >
          <Languages className="w-4 h-4 text-[#1A2E22]" />
          <span className="text-[10px] font-black mt-0.5 uppercase tracking-wider">
            {language === 'en' ? 'తెలుగు' : 'EN'}
          </span>
        </button>
      </div>
    </div>
  );
};
