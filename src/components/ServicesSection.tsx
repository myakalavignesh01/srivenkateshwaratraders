import React from 'react';
import { motion } from 'motion/react';
import { Sprout, ShieldAlert, Tractor, Wheat, Truck, Droplet, ArrowRight, Phone } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { TiltCard } from './TiltCard';

interface ServicesSectionProps {
  language: Language;
  onOpenTractorBooking: () => void;
  onSelectCategory: (category: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  language,
  onOpenTractorBooking,
  onSelectCategory,
}) => {
  const t = translations[language];

  const services = [
    {
      id: 'seeds',
      title: t.services.seedsTitle,
      desc: t.services.seedsDesc,
      icon: <Sprout className="w-6 h-6 text-[#2D6A4F]" />,
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
      badge: language === 'te' ? 'రైతు మేలు రకాలు' : 'Certified Hybrids',
      action: () => {
        onSelectCategory('seeds');
        document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
      },
      actionText: language === 'te' ? 'విత్తనాలు చూడండి' : 'Browse Seeds Catalog',
    },
    {
      id: 'fertilizers',
      title: t.services.fertilizersTitle,
      desc: t.services.fertilizersDesc,
      icon: <Droplet className="w-6 h-6 text-[#2D6A4F]" />,
      image: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=800&q=80',
      badge: language === 'te' ? 'సమతుల్య పోషణ' : 'Basal & Top Dress',
      action: () => {
        onSelectCategory('fertilizers');
        document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
      },
      actionText: language === 'te' ? 'ఎరువులు చూడండి' : 'View Fertilizers',
    },
    {
      id: 'pesticides',
      title: t.services.pesticidesTitle,
      desc: t.services.pesticidesDesc,
      icon: <ShieldAlert className="w-6 h-6 text-[#2D6A4F]" />,
      image: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=800&q=80',
      badge: language === 'te' ? 'సస్యరక్షణ' : 'Crop Protection',
      action: () => {
        onSelectCategory('pesticides');
        document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
      },
      actionText: language === 'te' ? 'సస్యరక్షణ మందులు' : 'Crop Care Products',
    },
    {
      id: 'tractor',
      title: t.services.tractorTitle,
      desc: t.services.tractorDesc,
      icon: <Tractor className="w-6 h-6 text-[#2D6A4F]" />,
      image: 'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?auto=format&fit=crop&w=800&q=80',
      badge: language === 'te' ? 'ఆధునిక యంత్రాలు' : 'Machinery & Implements',
      action: onOpenTractorBooking,
      actionText: language === 'te' ? 'ట్రాక్టర్ బుక్ చేయండి' : 'Book Tractor Online',
      highlight: true,
    },
    {
      id: 'transport',
      title: t.services.transportTitle,
      desc: t.services.transportDesc,
      icon: <Truck className="w-6 h-6 text-[#2D6A4F]" />,
      image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=800&q=80',
      badge: language === 'te' ? 'రవాణా సదుపాయం' : 'DCM & Field Transport',
      action: () => {
        window.location.href = 'tel:9705806070';
      },
      actionText: language === 'te' ? 'రవాణా కోసం కాల్ చేయండి' : 'Call for Transport',
    },
  ];

  return (
    <section id="services" className="py-24 bg-[#F9F8F4] relative border-b border-[#1A2E22]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#D4AF37]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
              {language === 'te' ? 'రైతు సమగ్ర సేవలు' : 'Comprehensive Agricultural Services'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1A2E22] tracking-tight leading-tight">
            {t.services.heading}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#1A2E22]/70 font-light leading-relaxed">
            {t.services.subheading}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((item, idx) => (
            <TiltCard
              key={item.id}
              maxTilt={8}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={`h-full rounded-2xl overflow-hidden bg-white border ${
                item.highlight ? 'border-[#2D5A27]/40 ring-1 ring-[#D4AF37]/30 shadow-md' : 'border-[#1A2E22]/10'
              } shadow-sm hover:shadow-2xl transition-shadow duration-300 flex flex-col group`}
            >
              {/* Image Container with hover zoom */}
              <div className="relative h-48 sm:h-52 overflow-hidden bg-[#1A2E22]">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A2E22]/80 via-transparent to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#1A2E22]/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] border border-[#D4AF37]/40">
                  {item.badge}
                </div>

                {/* Floating Icon */}
                <div className="absolute bottom-3 right-3 w-10 h-10 rounded-xl bg-[#F9F8F4] shadow-md border border-[#1A2E22]/10 flex items-center justify-center text-[#2D5A27]">
                  {item.icon}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-[#1A2E22] mb-2 group-hover:text-[#2D5A27] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#1A2E22]/70 font-light leading-relaxed line-clamp-3">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#1A2E22]/5 flex items-center justify-between">
                  <button
                    onClick={item.action}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#2D5A27] hover:text-[#1A2E22] transition-colors group/btn cursor-pointer"
                  >
                    <span>{item.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37] group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  <a
                    href="tel:9705806070"
                    title="Call directly"
                    className="w-8 h-8 rounded-full bg-[#D4AF37]/15 hover:bg-[#D4AF37]/30 flex items-center justify-center text-[#1A2E22] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};
