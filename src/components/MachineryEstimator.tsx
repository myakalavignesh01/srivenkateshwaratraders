import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Tractor, Fuel, Clock, Calculator, ShieldCheck, ArrowRight, CheckCircle2, Wrench } from 'lucide-react';
import { Language } from '../types';
import { tractorImplementsSpecs, TractorImplementSpec } from '../data/agriAdvisoryData';

interface MachineryEstimatorProps {
  language: Language;
  onOpenBookingWithDetails: (implementName: string, acres: number) => void;
}

export const MachineryEstimator: React.FC<MachineryEstimatorProps> = ({
  language,
  onOpenBookingWithDetails,
}) => {
  const [selectedImplementId, setSelectedImplementId] = useState<string>('mb-plough');
  const [acres, setAcres] = useState<number>(4);
  const [soilFactor, setSoilFactor] = useState<number>(1.0); // 1.0 = Red Chalka, 1.2 = Heavy Black, 0.9 = Light Loam

  const currentImplement: TractorImplementSpec =
    tractorImplementsSpecs.find((i) => i.id === selectedImplementId) || tractorImplementsSpecs[0];

  // Calculations
  const calculatedHours = Number((acres * currentImplement.avgHoursPerAcre * soilFactor).toFixed(1));
  const calculatedDiesel = Number((acres * currentImplement.avgDieselLitersPerAcre * soilFactor).toFixed(1));
  const estimatedCost = Math.round(acres * currentImplement.acreRate * soilFactor);

  return (
    <section id="tractor-estimator" className="py-20 bg-[#14251B] text-[#F9F8F4] relative border-b border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-[#D4AF37]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
              {language === 'te' ? 'యంత్ర సేవల అంచనా & డీజిల్ కాలిక్యులేటర్' : 'TRACTOR WORK & FUEL COST ESTIMATOR'}
            </span>
            <span className="w-6 h-[1px] bg-[#D4AF37]" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight">
            {language === 'te' ? (
              <>
                మీ పొలానికి <span className="text-[#D4AF37] font-bold">ట్రాక్టర్ పనుల ఖర్చు అంచనా</span>
              </>
            ) : (
              <>
                Plan Your Land Tillage & <span className="text-[#D4AF37] font-bold">Machinery Budget</span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-[#F9F8F4]/70 font-light mt-3">
            {language === 'te'
              ? 'నాగలి దుక్కి, రోటవేటర్ లేదా కల్టివేటర్ పనులకు ఎంత సమయం, డీజిల్ మరియు అంచనా ఖర్చు అవుతుందో సులభంగా తెలుసుకోండి.'
              : 'Calculate operating hours, estimated diesel consumption, and transparent rental costs before scheduling our high-power tractor fleet.'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="bg-[#1A2E22] rounded-3xl p-6 sm:p-10 border border-[#D4AF37]/30 shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Inputs */}
            <div className="lg:col-span-7 space-y-6">
              {/* Implement Selector */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#D4AF37] mb-2">
                  {language === 'te' ? '1. ట్రాక్టర్ పని రకాన్ని ఎంచుకోండి' : '1. Select Implement / Operation'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {tractorImplementsSpecs.map((item) => {
                    const isSelected = item.id === selectedImplementId;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setSelectedImplementId(item.id)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#2D5A27] border-[#D4AF37] text-white shadow-md'
                            : 'bg-[#14251B] border-white/10 text-white/80 hover:border-white/30'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-lg">{item.icon}</span>
                          <span className="text-[10px] text-[#D4AF37] font-bold">
                            ₹{item.acreRate}/Acre
                          </span>
                        </div>
                        <span className="text-xs font-serif font-bold block leading-tight truncate">
                          {language === 'te' ? item.nameTe.split(' ')[0] : item.name.split('(')[0]}
                        </span>
                        <span className="text-[10px] text-white/50 block truncate mt-0.5">
                          {item.recommendedHP}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Acreage and Soil Condition */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#D4AF37] mb-2">
                    {language === 'te' ? 'పొలం విస్తీర్ణం (ఎకరాలు)' : 'Field Area (Acres)'}
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="1"
                      max="25"
                      step="0.5"
                      value={acres}
                      onChange={(e) => setAcres(Number(e.target.value))}
                      className="w-full h-2 bg-black/40 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                    />
                    <span className="text-lg font-serif font-bold text-white shrink-0 min-w-[60px] text-right">
                      {acres} <span className="text-xs text-white/60">Ac</span>
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#D4AF37] mb-2">
                    {language === 'te' ? 'నేల రకం (Soil Condition)' : 'Soil Condition'}
                  </label>
                  <select
                    value={soilFactor}
                    onChange={(e) => setSoilFactor(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#14251B] border border-white/15 text-xs text-white font-semibold outline-none cursor-pointer focus:border-[#D4AF37]"
                  >
                    <option value={1.0}>
                      {language === 'te' ? 'ఎర్ర చల్క నేలలు (Standard Red Soil)' : 'Standard Red Chalka Soil'}
                    </option>
                    <option value={1.2}>
                      {language === 'te' ? 'భారీ నల్ల రేగడి / గట్టి నేల (+20% load)' : 'Heavy Black Cotton (+20% load)'}
                    </option>
                    <option value={0.9}>
                      {language === 'te' ? 'ఇసుక / తేలికపాటి నేల (-10% load)' : 'Light Sandy Loam (-10% load)'}
                    </option>
                  </select>
                </div>
              </div>

              {/* Implement description */}
              <div className="p-4 rounded-xl bg-[#14251B]/80 border border-white/10 text-xs text-[#F9F8F4]/80 flex items-start gap-3">
                <Wrench className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">
                    {language === 'te' ? currentImplement.nameTe : currentImplement.name}
                  </span>
                  <p className="mt-0.5 text-white/70 font-light leading-relaxed">
                    {language === 'te' ? currentImplement.descriptionTe : currentImplement.description}
                  </p>
                  <span className="inline-block text-[10px] text-[#D4AF37] font-semibold mt-1">
                    Recommended Tractor: {currentImplement.recommendedHP} • Soil: {language === 'te' ? currentImplement.recommendedSoilTe : currentImplement.recommendedSoil}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Estimation Result Panel */}
            <div className="lg:col-span-5 bg-[#14251B] p-6 sm:p-7 rounded-2xl border border-[#D4AF37]/40 shadow-xl space-y-5">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] block">
                {language === 'te' ? 'ఖర్చు & డీజిల్ అంచనా' : 'ESTIMATED WORK & RENTAL METRICS'}
              </span>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-[#1A2E22] border border-white/10">
                  <div className="flex items-center gap-1.5 text-white/60 text-[10px] uppercase font-bold tracking-wider">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Est. Time</span>
                  </div>
                  <span className="text-xl sm:text-2xl font-serif font-black text-white mt-1 block">
                    {calculatedHours} <span className="text-xs font-normal text-white/60">Hours</span>
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#1A2E22] border border-white/10">
                  <div className="flex items-center gap-1.5 text-white/60 text-[10px] uppercase font-bold tracking-wider">
                    <Fuel className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Est. Diesel</span>
                  </div>
                  <span className="text-xl sm:text-2xl font-serif font-black text-white mt-1 block">
                    ~{calculatedDiesel} <span className="text-xs font-normal text-white/60">Liters</span>
                  </span>
                </div>
              </div>

              {/* Total Estimated Cost */}
              <div className="p-4 rounded-xl bg-[#2D5A27]/20 border border-[#2D5A27]/40 text-center">
                <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-bold block mb-0.5">
                  {language === 'te' ? 'సుమారు మొత్తం పని ఖర్చు' : 'Estimated Total Rental Cost'}
                </span>
                <span className="text-3xl sm:text-4xl font-serif font-bold text-white">
                  ₹{estimatedCost.toLocaleString('en-IN')}
                </span>
                <span className="text-[11px] text-white/60 block mt-1">
                  ({acres} Acres @ ₹{Math.round(currentImplement.acreRate * soilFactor)}/Acre)
                </span>
              </div>

              {/* CTA Book Tractor */}
              <button
                onClick={() => onOpenBookingWithDetails(currentImplement.name, acres)}
                className="w-full py-3.5 rounded-full bg-[#D4AF37] hover:bg-[#c5a028] text-[#1A2E22] font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
              >
                <Tractor className="w-4 h-4 text-[#1A2E22]" />
                <span>{language === 'te' ? 'ఈ పని కోసం ట్రాక్టర్ బుక్ చేయండి' : 'Schedule Tractor for this Work'}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
