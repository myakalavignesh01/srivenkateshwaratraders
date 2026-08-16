import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Tractor, Wrench, Calendar, Phone, CheckCircle2, ChevronRight, Gauge, Shield, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface TractorSignatureSectionProps {
  language: Language;
  onOpenBooking: () => void;
}

export const TractorSignatureSection: React.FC<TractorSignatureSectionProps> = ({
  language,
  onOpenBooking,
}) => {
  const t = translations[language];
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      id: 'step1',
      title: t.tractorSignature.step1Title,
      desc: t.tractorSignature.step1Desc,
      tagline: language === 'te' ? 'భారీ నాగలి దుక్కి & నేల తయారీ' : 'Deep Tillage & Soil Aeration',
      implement: language === 'te' ? 'భారీ డిస్క్ నాగలి (MB Plough)' : 'Reversible MB / Disc Plough',
      soilTilth: '35% Moisture Retention Boost',
      tractorPower: '50 - 55 HP Heavy Duty',
      bgImage: 'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'step2',
      title: t.tractorSignature.step2Title,
      desc: t.tractorSignature.step2Desc,
      tagline: language === 'te' ? 'రోటవేటర్ మట్టి మెత్తదనం' : 'Rotavator Pulverization & Tilth',
      implement: language === 'te' ? '6-అడుగుల రోటవేటర్ & 9-పారల కల్టివేటర్' : '6-Foot Heavy-Duty Rotavator',
      soilTilth: 'Fine Seedbed Ready for Sowing',
      tractorPower: 'Dual Clutch PTO Power',
      bgImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'step3',
      title: t.tractorSignature.step3Title,
      desc: t.tractorSignature.step3Desc,
      tagline: language === 'te' ? 'పంట కోత & సురక్షిత రవాణా' : 'Harvesting & Farm Gate Transit',
      implement: language === 'te' ? 'వరి కోత యంత్రం & హై-కెపాసిటీ ట్రాలీ' : 'Crop Harvester & DCM Trolley',
      soilTilth: 'Zero Harvest Wastage Transit',
      tractorPower: 'Field-to-Godown Logistics',
      bgImage: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  return (
    <section id="tractor-works" className="py-24 bg-[#1A2E22] text-[#F9F8F4] relative overflow-hidden">
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-8 border-b border-[#F9F8F4]/10"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[1px] bg-[#D4AF37]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
                {t.tractorSignature.tag}
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#F9F8F4] tracking-tight">
              {t.tractorSignature.title}
            </h2>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <motion.button
              id="tractor-section-book-btn"
              onClick={onOpenBooking}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="px-6 py-3 rounded-full bg-[#D4AF37] hover:bg-[#c5a028] text-[#1A2E22] font-bold text-xs uppercase tracking-widest shadow-lg flex items-center gap-2 transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#1A2E22]" />
              <span>{t.tractorSignature.bookCTA}</span>
            </motion.button>

            <motion.a
              href="tel:9705806070"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-4 py-3 rounded-full border border-white/20 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#D4AF37]" />
              <span className="hidden sm:inline">9705806070</span>
            </motion.a>
          </div>
        </motion.div>

        {/* 3-Step Interactive Timeline Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
        >
          {steps.map((step, index) => (
            <motion.button
              key={step.id}
              onClick={() => setActiveStep(index)}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              className={`text-left p-5 rounded-2xl border transition-all cursor-pointer ${
                activeStep === index
                  ? 'bg-[#2D5A27]/40 border-[#D4AF37] shadow-lg shadow-[#1A2E22]/50'
                  : 'bg-[#15271D]/70 border-white/10 hover:border-white/20 opacity-75 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full ${
                    activeStep === index ? 'bg-[#D4AF37] text-[#1A2E22]' : 'bg-white/10 text-white/70'
                  }`}
                >
                  Stage 0{index + 1}
                </span>
                <ChevronRight
                  className={`w-4 h-4 transition-transform ${
                    activeStep === index ? 'text-[#D4AF37] translate-x-1' : 'text-white/40'
                  }`}
                />
              </div>
              <h3 className="font-serif font-bold text-lg sm:text-xl text-white">
                {step.title}
              </h3>
              <p className="text-xs text-[#F9F8F4]/70 mt-1 font-light line-clamp-1">
                {step.tagline}
              </p>
            </motion.button>
          ))}
        </motion.div>

        {/* Dynamic Interactive Stage Viewer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-[#14251B] border border-[#D4AF37]/30 overflow-hidden shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Visual Screen with Tractor Overlay */}
            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[460px] overflow-hidden bg-black">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeStep}
                  src={steps[activeStep].bgImage}
                  alt={steps[activeStep].title}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-[#14251B] via-black/30 to-transparent" />

              {/* Dynamic Interactive HUD Overlay */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-xs font-mono text-[#D4AF37] flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-[#D4AF37]" />
                  <span>{steps[activeStep].tractorPower}</span>
                </div>

                <div className="px-3 py-1.5 rounded-full bg-[#2D5A27] text-[10px] font-bold uppercase tracking-wider text-white shadow">
                  Madharam Machinery Unit
                </div>
              </div>

              {/* Field Rows SVG Graphic Accent */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="p-3.5 rounded-2xl bg-black/75 backdrop-blur-md border border-white/15 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Wrench className="w-4 h-4 text-[#D4AF37]" />
                    <span className="text-xs font-semibold text-white">
                      {steps[activeStep].implement}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#D4AF37] font-mono">
                    {steps[activeStep].soilTilth}
                  </span>
                </div>
              </div>
            </div>

            {/* Description & Machinery Specifications */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D4AF37] mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{steps[activeStep].tagline}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4">
                  {steps[activeStep].title}
                </h3>

                <p className="text-sm sm:text-base text-[#F9F8F4]/80 font-light leading-relaxed mb-6">
                  {steps[activeStep].desc}
                </p>

                {/* Available Implements Checklist */}
                <div className="space-y-2.5 pt-4 border-t border-white/10">
                  <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#D4AF37]">
                    {t.tractorSignature.viewImplements}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {t.tractorSignature.implements.map((imp, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#F9F8F4]/90">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                        <span>{imp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Box */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onOpenBooking}
                  className="flex-1 py-3 px-4 rounded-full bg-[#2D5A27] hover:bg-[#23481e] text-white text-xs font-bold uppercase tracking-widest text-center transition-all shadow-md active:scale-98 cursor-pointer border border-[#D4AF37]/40"
                >
                  {language === 'te' ? 'ఈ పనికి బుక్ చేయండి' : 'Schedule This Service'}
                </button>

                <a
                  href="https://wa.me/919705806070?text=Hello%20Sri%20Venkateshwara%20Traders,%20I%20want%20to%20inquire%20about%20tractor%20services%20in%20Urkonda%20mandal."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-full bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/40 text-[#86EFAC] text-xs font-bold uppercase tracking-wider text-center transition-all"
                >
                  WhatsApp Inquiry
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
