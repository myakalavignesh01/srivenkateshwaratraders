import React from 'react';
import { motion } from 'motion/react';
import { CloudRain, Wind, Droplets, Sun, CheckCircle, AlertCircle, Compass, Thermometer } from 'lucide-react';
import { Language } from '../types';

interface WeatherAdvisoryProps {
  language: Language;
}

export const WeatherAdvisory: React.FC<WeatherAdvisoryProps> = ({ language }) => {
  // Simulated localized Nagarkurnool / Urkonda rural weather metrics
  const weatherData = {
    location: 'Madharam & Urkonda Mandal',
    locationTe: 'మాధారం & ఉర్కొండ మండలం',
    tempC: 31,
    condition: 'Partly Cloudy & Warm',
    conditionTe: 'పాక్షిక మేఘావృతం',
    humidity: 64,
    rainChancePercent: 15,
    windSpeedKmh: 8,
    windDirection: 'SW (నైరుతి)',
    uvIndex: 'High (7)',
    sprayingCondition: 'IDEAL',
    ploughingCondition: 'SUITABLE',
  };

  return (
    <section id="weather-advisory" className="py-12 bg-[#F9F8F4] border-b border-[#1A2E22]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl p-6 sm:p-8 border border-[#1A2E22]/10 shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Location & Current Temperature */}
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.05, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="w-14 h-14 rounded-2xl bg-[#D4AF37]/15 text-[#8A6D05] flex items-center justify-center shrink-0 border border-[#D4AF37]/30"
              >
                <Sun className="w-8 h-8 text-[#D4AF37]" />
              </motion.div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#2D5A27] bg-[#2D5A27]/10 px-2 py-0.5 rounded-full">
                    {language === 'te' ? 'స్థానిక వాతావరణం' : 'Live Agri-Weather'}
                  </span>
                  <span className="text-xs text-[#1A2E22]/60 font-light">
                    {language === 'te' ? weatherData.locationTe : weatherData.location}
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-serif font-black text-[#1A2E22]">
                    {weatherData.tempC}°C
                  </span>
                  <span className="text-xs font-semibold text-[#1A2E22]/70">
                    {language === 'te' ? weatherData.conditionTe : weatherData.condition}
                  </span>
                </div>
              </div>
            </div>

            {/* Weather Metrics */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 border-y lg:border-y-0 lg:border-x border-[#1A2E22]/10 py-3 lg:py-0 lg:px-6">
              {/* Rain Chance */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2.5 transition-transform"
              >
                <CloudRain className="w-4 h-4 text-blue-600 shrink-0" />
                <div>
                  <span className="text-[10px] text-[#1A2E22]/50 uppercase font-bold block">
                    {language === 'te' ? 'వర్ష సూచన' : 'Rain Prob.'}
                  </span>
                  <span className="text-xs font-bold text-[#1A2E22]">{weatherData.rainChancePercent}% (Low)</span>
                </div>
              </motion.div>

              {/* Wind Speed */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2.5 transition-transform"
              >
                <Wind className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="text-[10px] text-[#1A2E22]/50 uppercase font-bold block">
                    {language === 'te' ? 'గాలి వేగం' : 'Wind Speed'}
                  </span>
                  <span className="text-xs font-bold text-[#1A2E22]">{weatherData.windSpeedKmh} km/h</span>
                </div>
              </motion.div>

              {/* Humidity */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2.5 transition-transform"
              >
                <Droplets className="w-4 h-4 text-cyan-600 shrink-0" />
                <div>
                  <span className="text-[10px] text-[#1A2E22]/50 uppercase font-bold block">
                    {language === 'te' ? 'తేమ' : 'Humidity'}
                  </span>
                  <span className="text-xs font-bold text-[#1A2E22]">{weatherData.humidity}%</span>
                </div>
              </motion.div>
            </div>

            {/* Farm Activity Advisory Pills */}
            <div className="flex flex-col sm:flex-row gap-2.5">
              <motion.div
                whileHover={{ y: -2 }}
                className="p-2.5 px-4 rounded-xl bg-[#2D5A27]/10 border border-[#2D5A27]/20 flex items-center gap-2 shadow-sm"
              >
                <CheckCircle className="w-4 h-4 text-[#2D5A27] shrink-0" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D5A27] block">
                    {language === 'te' ? 'మందుల పిచికారీకి అనుకూలం' : 'Spraying Condition: IDEAL'}
                  </span>
                  <span className="text-[11px] text-[#1A2E22]/80 font-light">
                    {language === 'te' ? 'తక్కువ గాలి వేగం, వర్షం లేదు' : 'Low wind & clear morning window'}
                  </span>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -2 }}
                className="p-2.5 px-4 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center gap-2 shadow-sm"
              >
                <CheckCircle className="w-4 h-4 text-[#8A6D05] shrink-0" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A6D05] block">
                    {language === 'te' ? 'ట్రాక్టర్ దుక్కికి సిద్ధం' : 'Tillage: OPTIMAL'}
                  </span>
                  <span className="text-[11px] text-[#1A2E22]/80 font-light">
                    {language === 'te' ? 'సరైన పదును మరియు తేమ' : 'Dry topsoil suitable for MB plough'}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
