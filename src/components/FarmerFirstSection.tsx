import React from 'react';
import { motion } from 'motion/react';
import { HeartHandshake, Scale, Clock, Users, ShieldCheck, Wheat } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface FarmerFirstSectionProps {
  language: Language;
}

export const FarmerFirstSection: React.FC<FarmerFirstSectionProps> = ({ language }) => {
  const t = translations[language];

  return (
    <section className="py-24 bg-[#1A2E22] text-[#F9F8F4] relative overflow-hidden">
      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />

      {/* Decorative Radial Background */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[radial-gradient(circle,rgba(212,175,55,0.12)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Emotional Storytelling */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-[#D4AF37]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
                {language === 'te' ? 'రైతు సేవలో మా నిబద్ధత' : 'Farmer-First Values'}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight leading-tight mb-6">
              {language === 'te' ? (
                <span className="font-telugu">
                  ప్రతి పంట వెనుకా <br />
                  <span className="text-[#D4AF37]">రైతన్న చెమట చుక్క ఉంది.</span>
                </span>
              ) : (
                <>
                  BEHIND EVERY CROP <br />
                  <span className="text-[#D4AF37]">IS A FARMER.</span>
                </>
              )}
            </h2>

            <blockquote className="border-l-2 border-[#D4AF37] pl-4 text-base sm:text-lg text-[#F9F8F4]/80 italic mb-8 font-serif leading-relaxed">
              {t.farmerFirst.quote}
            </blockquote>

            {/* 3 Core Pillars */}
            <div className="space-y-5">
              <motion.div
                whileHover={{ x: 6 }}
                className="flex items-start gap-4 transition-transform"
              >
                <div className="w-10 h-10 rounded-full bg-[#2D5A27] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-serif font-bold text-white mb-1">
                    {t.farmerFirst.pillar1Title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#F9F8F4]/70 font-light leading-relaxed">
                    {t.farmerFirst.pillar1Desc}
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 6 }}
                className="flex items-start gap-4 transition-transform"
              >
                <div className="w-10 h-10 rounded-full bg-[#2D5A27] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-serif font-bold text-white mb-1">
                    {t.farmerFirst.pillar2Title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#F9F8F4]/70 font-light leading-relaxed">
                    {t.farmerFirst.pillar2Desc}
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 6 }}
                className="flex items-start gap-4 transition-transform"
              >
                <div className="w-10 h-10 rounded-full bg-[#2D5A27] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-serif font-bold text-white mb-1">
                    {t.farmerFirst.pillar3Title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#F9F8F4]/70 font-light leading-relaxed">
                    {t.farmerFirst.pillar3Desc}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Visual Collage with Farmer Pride */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl bg-[#14251B]">
              <img
                src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1000&q=80"
                alt="Farmer in agricultural field"
                loading="lazy"
                className="w-full h-[440px] sm:h-[500px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14251B] via-black/20 to-transparent" />

              {/* Floating Testimonial/Highlight Box */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-[#14251B]/95 backdrop-blur-md border border-[#D4AF37]/30 shadow-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#2D5A27] flex items-center justify-center text-[#D4AF37]">
                    <Wheat className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-serif font-bold text-white">
                      {language === 'te' ? 'మాధారం & ఉర్కొండ రైతాంగం' : 'Serving Our Local Farming Community'}
                    </h4>
                    <span className="text-[10px] uppercase tracking-wider text-[#D4AF37]">
                      Nagarkurnool District • Telangana
                    </span>
                  </div>
                </div>
                <p className="text-xs text-[#F9F8F4]/80 font-light leading-relaxed">
                  {language === 'te'
                    ? 'విత్తనం నాటినప్పటి నుండి ధాన్యం అమ్ముకునే దాకా రైతుకు నమ్మకమైన తోడుగా నిలవడమే మా లక్ష్యం.'
                    : 'From seed selection to harvest sale, providing dependable support, fair prices, and reliable machinery at your doorstep.'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
