import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, TrendingDown, Minus, RefreshCw, Calculator, Scale, ArrowRight, Wheat, CheckCircle2, PhoneCall, MessageSquare } from 'lucide-react';
import { Language } from '../types';
import { mandiRatesData, MandiCropRate } from '../data/agriAdvisoryData';

interface MandiRatesTrackerProps {
  language: Language;
}

export const MandiRatesTracker: React.FC<MandiRatesTrackerProps> = ({
  language,
}) => {
  const [selectedCrop, setSelectedCrop] = useState<MandiCropRate>(mandiRatesData[0]);
  const [moistureInput, setMoistureInput] = useState<number>(14);
  const [quantityQuintals, setQuantityQuintals] = useState<number>(50);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  // Moisture deduction logic:
  // For paddy standard is 14%. Every 1% excess moisture above standard deducts ~1.2% in net payable weight or rate.
  const excessMoisture = Math.max(0, moistureInput - selectedCrop.standardMoisture);
  const moistureDeductionPercent = excessMoisture * 1.2;
  const effectiveRate = Math.round(selectedCrop.svTradersRate * (1 - moistureDeductionPercent / 100));
  const estimatedGrossAmount = Math.round(quantityQuintals * selectedCrop.svTradersRate);
  const estimatedNetAmount = Math.round(quantityQuintals * effectiveRate);

  return (
    <section id="mandi-rates" className="py-20 bg-[#F9F8F4] relative border-b border-[#1A2E22]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title & Refresh */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[1px] bg-[#D4AF37]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
                {language === 'te' ? 'నేటి మార్కెట్ ధరలు & కొనుగోలు' : 'LIVE MANDI RATES & TRANSPARENT PRICING'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1A2E22] tracking-tight">
              {language === 'te' ? (
                <>
                  నాగర్‌కర్నూల్ జిల్లా <span className="text-[#2D5A27] font-bold">మార్కెట్ ధరలు</span>
                </>
              ) : (
                <>
                  Regional Mandi & <span className="text-[#2D5A27] font-bold">SV Traders Rates</span>
                </>
              )}
            </h2>
            <p className="text-sm sm:text-base text-[#1A2E22]/70 font-light mt-2 max-w-2xl">
              {language === 'te'
                ? 'ప్రభుత్వ కనీస మద్దతు ధర (MSP), స్థానిక మార్కెట్ యార్డ్ ధరలు మరియు మాధారం గోదాము వద్ద నేరుగా కొనుగోలు ధరల వివరాలు.'
                : 'Indicative market prices from Nagarkurnool & Mahabubnagar mandis alongside direct farm-gate procurement quotes at Sri Venkateshwara Traders.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-[#1A2E22]/15 text-xs font-serif font-semibold text-[#1A2E22] shadow-sm hover:border-[#2D5A27] transition-all cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#2D5A27] ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{language === 'te' ? 'ధరలు తాజావి' : 'Updated: Today 08:30 AM'}</span>
            </button>

            <a
              href="tel:9705806070"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2D5A27] hover:bg-[#1A2E22] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-[#D4AF37]" />
              <span>{language === 'te' ? 'మార్కెట్ విచారణ: 9705806070' : 'Mandi Desk: 9705806070'}</span>
            </a>
          </div>
        </div>

        {/* Live Rates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {mandiRatesData.map((crop, index) => {
            const isSelected = selectedCrop.id === crop.id;
            return (
              <motion.div
                key={crop.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                whileHover={{ y: -4 }}
                onClick={() => {
                  setSelectedCrop(crop);
                  setMoistureInput(crop.standardMoisture);
                }}
                className={`p-5 rounded-2xl transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-white border-[#2D5A27] shadow-xl ring-2 ring-[#2D5A27]/20 scale-[1.01]'
                    : 'bg-white/80 hover:bg-white border-[#1A2E22]/10 hover:border-[#1A2E22]/30 shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{crop.icon}</span>
                    <div>
                      <h4 className="text-sm font-serif font-bold text-[#1A2E22]">
                        {language === 'te' ? crop.nameTe : crop.name}
                      </h4>
                      <span className="text-[11px] text-[#1A2E22]/60 font-light block">
                        {language === 'te' ? crop.varietyTe : crop.variety}
                      </span>
                    </div>
                  </div>

                  {/* Trend Indicator */}
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      crop.trend === 'UP'
                        ? 'bg-[#2D5A27]/10 text-[#2D5A27]'
                        : crop.trend === 'DOWN'
                        ? 'bg-red-50 text-red-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {crop.trend === 'UP' && <TrendingUp className="w-3 h-3" />}
                    {crop.trend === 'DOWN' && <TrendingDown className="w-3 h-3" />}
                    {crop.trend === 'STEADY' && <Minus className="w-3 h-3" />}
                    {crop.trendPercent}
                  </span>
                </div>

                {/* Price Breakdown */}
                <div className="grid grid-cols-2 gap-3 py-3 border-y border-[#1A2E22]/5 my-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#1A2E22]/50 block">
                      Govt MSP Rate
                    </span>
                    <span className="text-xs font-semibold text-[#1A2E22]">
                      ₹{crop.mspRate.toLocaleString('en-IN')}{' '}
                      <span className="text-[9px] text-[#1A2E22]/50">/Qtl</span>
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#1A2E22]/50 block">
                      Mandi Range
                    </span>
                    <span className="text-xs font-semibold text-[#1A2E22]">
                      ₹{crop.minRate} - ₹{crop.maxRate}
                    </span>
                  </div>
                </div>

                {/* SV Traders Direct Spot Rate */}
                <div className="flex items-center justify-between mt-2 pt-1">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#2D5A27] font-bold block">
                      {language === 'te' ? 'శ్రీ వెంకటేశ్వర కొనుగోలు ధర' : 'SV Traders Spot Rate'}
                    </span>
                    <span className="text-lg font-serif font-black text-[#2D5A27]">
                      ₹{crop.svTradersRate.toLocaleString('en-IN')}{' '}
                      <span className="text-xs font-normal text-[#1A2E22]/60">/Qtl</span>
                    </span>
                  </div>

                  <a
                    href={`https://wa.me/919705806070?text=${encodeURIComponent(`Hello Sri Venkateshwara Traders, I want to inquire about today's ${crop.name} rate.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="px-3 py-1.5 rounded-full bg-[#1A2E22] hover:bg-[#2D5A27] text-white text-[11px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1 shadow-sm"
                  >
                    <span>{language === 'te' ? 'ధర విచారణ' : 'Inquire'}</span>
                    <MessageSquare className="w-3 h-3 text-[#D4AF37]" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Moisture & Net Payout Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl p-6 sm:p-10 border border-[#1A2E22]/10 shadow-xl"
        >
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            {/* Left: Calculator Inputs */}
            <div className="flex-1 w-full space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2D5A27]/10 text-[#2D5A27] flex items-center justify-center border border-[#2D5A27]/20">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#1A2E22]">
                    {language === 'te'
                      ? 'పంట తేమ & నికర ఆదాయ అంచనా కాలిక్యులేటర్'
                      : 'Crop Moisture & Net Payout Estimator'}
                  </h3>
                  <p className="text-xs text-[#1A2E22]/70 font-light">
                    {language === 'te'
                      ? 'ధాన్యం తేమ శాతాన్ని బట్టి సరైన విలువను ముందే లెక్కించండి.'
                      : 'Calculate accurate harvest revenue based on grain moisture and quantity.'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Crop Selection */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A2E22] mb-1.5">
                    {language === 'te' ? 'పంటను ఎంచుకోండి' : 'Selected Crop'}
                  </label>
                  <select
                    value={selectedCrop.id}
                    onChange={(e) => {
                      const found = mandiRatesData.find((c) => c.id === e.target.value);
                      if (found) {
                        setSelectedCrop(found);
                        setMoistureInput(found.standardMoisture);
                      }
                    }}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F9F8F4] border border-[#1A2E22]/15 text-xs sm:text-sm text-[#1A2E22] font-semibold outline-none cursor-pointer focus:border-[#2D5A27]"
                  >
                    {mandiRatesData.map((c) => (
                      <option key={c.id} value={c.id}>
                        {language === 'te' ? c.nameTe : c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quantity in Quintals */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A2E22] mb-1.5">
                    {language === 'te' ? 'ధాన్యం పరిమాణం (క్వింటాళ్ళు)' : 'Quantity (Quintals)'}
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={quantityQuintals}
                    onChange={(e) => setQuantityQuintals(Math.max(1, Number(e.target.value)))}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F9F8F4] border border-[#1A2E22]/15 text-xs sm:text-sm text-[#1A2E22] font-semibold outline-none focus:border-[#2D5A27]"
                  />
                </div>

                {/* Moisture % Slider/Input */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#1A2E22]">
                      {language === 'te' ? 'తేమ శాతం (Moisture %)' : 'Moisture %'}
                    </label>
                    <span className="text-xs font-bold text-[#2D5A27]">{moistureInput}%</span>
                  </div>
                  <input
                    type="range"
                    min={Math.max(5, selectedCrop.standardMoisture - 5)}
                    max={selectedCrop.standardMoisture + 10}
                    step="0.5"
                    value={moistureInput}
                    onChange={(e) => setMoistureInput(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2D5A27]"
                  />
                  <div className="flex justify-between text-[10px] text-[#1A2E22]/50 mt-1">
                    <span>Base: {selectedCrop.standardMoisture}%</span>
                    <span>Max: {selectedCrop.standardMoisture + 10}%</span>
                  </div>
                </div>
              </div>

              {/* Moisture status feedback */}
              <div className="p-3.5 rounded-xl bg-[#F9F8F4] border border-[#1A2E22]/10 flex items-start gap-3">
                <Scale className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <p className="text-xs text-[#1A2E22]/80 leading-relaxed font-light">
                  {moistureInput <= selectedCrop.standardMoisture ? (
                    <span className="text-[#2D5A27] font-semibold">
                      {language === 'te'
                        ? `తేమ ${moistureInput}% ప్రమాణబద్ధంగా ఉంది (${selectedCrop.standardMoisture}% కన్నా తక్కువ). పూర్తి రేటు వర్తిస్తుంది.`
                        : `Moisture ${moistureInput}% is optimal (≤ ${selectedCrop.standardMoisture}% standard). Full spot price applies.`}
                    </span>
                  ) : (
                    <span>
                      {language === 'te'
                        ? `తేమ ${selectedCrop.standardMoisture}% కంటే ${excessMoisture.toFixed(1)}% ఎక్కువగా ఉంది. తేమ తగ్గింపు సుమారు ₹${(selectedCrop.svTradersRate - effectiveRate)}/క్వింటాలు.`
                        : `Moisture is ${excessMoisture.toFixed(1)}% above base ${selectedCrop.standardMoisture}%. Estimated moisture deduction of ₹${(selectedCrop.svTradersRate - effectiveRate)}/Qtl.`}
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Right: Estimated Payout Card */}
            <div className="w-full lg:w-96 rounded-2xl bg-[#1A2E22] text-[#F9F8F4] p-6 border border-[#D4AF37]/30 shadow-2xl relative overflow-hidden shrink-0">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle,rgba(212,175,55,0.15)_0%,transparent_70%)] pointer-events-none" />

              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold block mb-1">
                {language === 'te' ? 'అంచనా నికర చెల్లింపు' : 'Estimated Net Payout'}
              </span>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl sm:text-4xl font-serif font-bold text-white">
                  ₹{estimatedNetAmount.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-[#F9F8F4]/60">
                  ({quantityQuintals} Qtl @ ₹{effectiveRate}/Qtl)
                </span>
              </div>

              <div className="space-y-2 border-t border-[#F9F8F4]/10 pt-3 text-xs text-[#F9F8F4]/80">
                <div className="flex justify-between">
                  <span className="text-[#F9F8F4]/60">{language === 'te' ? 'బేస్ రేట్:' : 'Base Spot Rate:'}</span>
                  <span className="font-semibold text-white">₹{selectedCrop.svTradersRate} / Qtl</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#F9F8F4]/60">{language === 'te' ? 'తేమ మదింపు:' : 'Moisture Adjustment:'}</span>
                  <span className="font-semibold text-[#D4AF37]">
                    {moistureDeductionPercent > 0 ? `-${moistureDeductionPercent.toFixed(1)}%` : '0% (Standard)'}
                  </span>
                </div>
                <div className="flex justify-between border-t border-[#F9F8F4]/10 pt-1.5 font-bold text-white">
                  <span>{language === 'te' ? 'మొత్తం విలువ:' : 'Total Value:'}</span>
                  <span className="text-[#86EFAC]">₹{estimatedNetAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <a
                href="tel:9705806070"
                className="w-full mt-5 py-3 rounded-full bg-[#D4AF37] hover:bg-[#c5a028] text-[#1A2E22] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow cursor-pointer active:scale-98"
              >
                <PhoneCall className="w-4 h-4 text-[#1A2E22]" />
                <span>{language === 'te' ? 'ధర నిర్ధారణకు కాల్ చేయండి: 9705806070' : 'Call Madharam Shop: 9705806070'}</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
