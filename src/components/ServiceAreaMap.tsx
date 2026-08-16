import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Phone, CheckCircle2, Building2, Compass, ShieldCheck } from 'lucide-react';
import { ServiceArea, Language } from '../types';
import { translations } from '../data/translations';

interface ServiceAreaMapProps {
  serviceAreas: ServiceArea[];
  language: Language;
}

export const ServiceAreaMap: React.FC<ServiceAreaMapProps> = ({ serviceAreas, language }) => {
  const t = translations[language];
  const [selectedVillage, setSelectedVillage] = useState<ServiceArea>(serviceAreas[0] || null);

  return (
    <section id="service-areas" className="py-24 bg-[#F9F8F4] relative border-b border-[#1A2E22]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#D4AF37]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
              {language === 'te' ? 'సేవా ప్రాంతాలు & పరిధి' : 'Local Village Network'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1A2E22] tracking-tight">
            {t.serviceAreas.heading}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#1A2E22]/70 font-light leading-relaxed">
            {t.serviceAreas.subheading}
          </p>
        </motion.div>

        {/* Map & Village List Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Vector Geo Canvas */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-[#1A2E22] rounded-3xl p-6 sm:p-8 text-[#F9F8F4] relative overflow-hidden shadow-xl border border-[#D4AF37]/30"
          >
            {/* Background Grid Lines */}
            <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,transparent_70%)]" />

            {/* Map Header */}
            <div className="relative z-10 flex items-center justify-between pb-6 border-b border-[#F9F8F4]/10 mb-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">
                  Nagarkurnool District • Urkonda Mandal
                </span>
                <h3 className="text-xl font-serif font-bold text-white mt-0.5">
                  Madharam Central Hub (16.634° N, 78.291° E)
                </h3>
              </div>
              <div className="px-3 py-1 rounded-full bg-[#2D5A27] text-[10px] font-bold uppercase tracking-wider text-white">
                Active Coverage
              </div>
            </div>

            {/* Interactive Vector Village Topology Node Graph */}
            <div className="relative z-10 h-72 sm:h-80 w-full rounded-2xl bg-[#14251B] border border-white/10 p-4 flex items-center justify-center">
              {/* Radial rings */}
              <div className="absolute w-64 h-64 rounded-full border border-dashed border-[#D4AF37]/20 animate-spin" style={{ animationDuration: '60s' }} />
              <div className="absolute w-44 h-44 rounded-full border border-[#D4AF37]/30" />
              <div className="absolute w-24 h-24 rounded-full border border-[#D4AF37]/40" />

              {/* Central Hub Pin (Madharam) */}
              <div
                onClick={() => setSelectedVillage(serviceAreas[0])}
                className="absolute z-20 flex flex-col items-center cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#2D5A27] border-2 border-[#D4AF37] flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                  <Building2 className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <span className="mt-1 px-2.5 py-0.5 rounded-full bg-black/80 text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] border border-[#D4AF37]/30 shadow whitespace-nowrap">
                  MADHARAM (HQ)
                </span>
              </div>

              {/* Satellite Village Nodes */}
              {/* Urkonda */}
              <button
                onClick={() => setSelectedVillage(serviceAreas[1] || serviceAreas[0])}
                className="absolute top-10 right-16 flex flex-col items-center group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-[#1A2E22] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform shadow">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-medium text-white/90 bg-black/60 px-2 py-0.5 rounded-full mt-1">
                  Urkonda (4.5 km)
                </span>
              </button>

              {/* Gundlapally */}
              <button
                onClick={() => setSelectedVillage(serviceAreas[2] || serviceAreas[0])}
                className="absolute bottom-10 left-16 flex flex-col items-center group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-[#1A2E22] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform shadow">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-medium text-white/90 bg-black/60 px-2 py-0.5 rounded-full mt-1">
                  Gundlapally (6.2 km)
                </span>
              </button>

              {/* Kotra */}
              <button
                onClick={() => setSelectedVillage(serviceAreas[3] || serviceAreas[0])}
                className="absolute top-14 left-14 flex flex-col items-center group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-[#1A2E22] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform shadow">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-medium text-white/90 bg-black/60 px-2 py-0.5 rounded-full mt-1">
                  Kotra (7.8 km)
                </span>
              </button>

              {/* Udimilla */}
              <button
                onClick={() => setSelectedVillage(serviceAreas[4] || serviceAreas[0])}
                className="absolute bottom-12 right-14 flex flex-col items-center group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-[#1A2E22] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform shadow">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-medium text-white/90 bg-black/60 px-2 py-0.5 rounded-full mt-1">
                  Udimilla (9.5 km)
                </span>
              </button>
            </div>

            {/* Bottom Actions */}
            <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Madharam+Urkonda+Mandal+Nagarkurnool"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-[#D4AF37] hover:bg-[#c5a028] text-[#1A2E22] text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow"
              >
                <Navigation className="w-3.5 h-3.5 text-[#1A2E22]" />
                <span>{t.serviceAreas.reachOut}</span>
              </a>

              <a
                href="tel:9705806070"
                className="text-xs text-[#D4AF37] hover:underline font-semibold flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{t.serviceAreas.callHub}</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Village Cards List & Selected Village Details */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 space-y-4"
          >
            <h3 className="text-lg font-serif font-bold text-[#1A2E22] flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#2D5A27]" />
              <span>{language === 'te' ? 'గ్రామాల వారీ సేవలు' : 'Covered Village Directory'}</span>
            </h3>

            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
              {serviceAreas.map((area) => {
                const isSelected = selectedVillage?.id === area.id;
                return (
                  <motion.div
                    key={area.id}
                    onClick={() => setSelectedVillage(area)}
                    whileHover={{ x: 4 }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white border-[#2D5A27] ring-1 ring-[#D4AF37]/30 shadow-md'
                        : 'bg-white border-[#1A2E22]/10 hover:border-[#1A2E22]/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="text-sm font-serif font-bold text-[#1A2E22]">
                        {language === 'te' && area.villageNameTe ? area.villageNameTe : area.villageName}
                      </h4>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#1A2E22]/5 text-[#2D5A27] uppercase tracking-wider">
                        {area.distanceKm === 0 ? 'HQ Central' : `${area.distanceKm} km`}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {area.servicesAvailable.map((srv, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-full bg-[#F9F8F4] text-[#1A2E22]/80 border border-[#1A2E22]/10 text-[10px] font-medium"
                        >
                          {srv}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
