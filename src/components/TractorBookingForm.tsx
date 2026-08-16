import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Tractor, CheckCircle2, Phone, Calendar, Clock, AlertCircle, Wrench } from 'lucide-react';
import { Language, TractorRequest } from '../types';
import { translations } from '../data/translations';
import { BusinessApiService } from '../services/api';

interface TractorBookingFormProps {
  language: Language;
  isOpenModal?: boolean;
  onCloseModal?: () => void;
  onSuccessBooked?: (req: TractorRequest) => void;
  initialServiceType?: string;
  initialLandArea?: string;
}

export const TractorBookingForm: React.FC<TractorBookingFormProps> = ({
  language,
  isOpenModal = false,
  onCloseModal,
  onSuccessBooked,
  initialServiceType,
  initialLandArea,
}) => {
  const t = translations[language];

  const [formData, setFormData] = useState({
    farmerName: '',
    phone: '',
    village: 'Madharam',
    serviceType: initialServiceType || 'Rotavator (రోటవేటర్)',
    landArea: initialLandArea || '3 Acres',
    preferredDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    preferredTime: 'Morning (6:30 AM)',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookedRequest, setBookedRequest] = useState<TractorRequest | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const serviceOptions = [
    'Rotavator (రోటవేటర్ - Fine Soil Tilth)',
    'Ploughing (దున్నడం - Deep MB/Disc Plough)',
    'Cultivation (కల్టివేటర్ - 9 Tine)',
    'Harvesting (కోత కోయడం - Paddy / Crops)',
    'Land Leveling (భూమి చదును చేయడం - Laser)',
    'DCM / Crop Transport (రవాణా)',
    'Other Farm Works (ఇతర పనులు)',
  ];

  const villageOptions = [
    'Madharam (మాధారం)',
    'Urkonda (ఉర్కొండ)',
    'Gundlapally (గుండ్లపల్లి)',
    'Kotra (కొట్ర)',
    'Udimilla (ఉడిమిళ్ల)',
    'Nagarkurnool Route Area',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.farmerName.trim() || !formData.phone.trim()) {
      setErrorMessage(
        language === 'te'
          ? 'దయచేసి రైతు పేరు మరియు మొబైల్ నంబర్ నమోదు చేయండి.'
          : 'Please enter farmer name and mobile number.'
      );
      return;
    }

    if (formData.phone.replace(/\D/g, '').length < 10) {
      setErrorMessage(
        language === 'te'
          ? 'దయచేసి 10 అంకెల మొబైల్ నంబర్ నమోదు చేయండి.'
          : 'Please enter a valid 10-digit mobile number.'
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const created = await BusinessApiService.submitTractorRequest({
        farmerName: formData.farmerName.trim(),
        phone: formData.phone.trim(),
        village: formData.village,
        serviceType: formData.serviceType,
        landArea: formData.landArea.trim(),
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        notes: formData.notes.trim(),
      });

      setBookedRequest(created);
      if (onSuccessBooked) onSuccessBooked(created);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit tractor booking.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setBookedRequest(null);
    setFormData({
      farmerName: '',
      phone: '',
      village: 'Madharam',
      serviceType: 'Rotavator (రోటవేటర్)',
      landArea: '3 Acres',
      preferredDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      preferredTime: 'Morning (6:30 AM)',
      notes: '',
    });
  };

  const formContent = (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#1A2E22]/10 shadow-xl">
      <AnimatePresence mode="wait">
        {bookedRequest ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-6 px-2"
          >
            <div className="w-16 h-16 rounded-full bg-[#2D5A27]/10 text-[#2D5A27] flex items-center justify-center mx-auto mb-4 border border-[#2D5A27]/20">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] px-3.5 py-1 bg-[#1A2E22] rounded-full">
              Booking Ref: {bookedRequest.id}
            </span>

            <h3 className="text-2xl font-serif font-bold text-[#1A2E22] mt-3">
              {t.tractorBooking.successTitle}
            </h3>

            <p className="text-xs sm:text-sm text-[#1A2E22]/70 font-light max-w-md mx-auto mt-2 leading-relaxed">
              {t.tractorBooking.successDesc}
            </p>

            <div className="my-5 p-4 rounded-2xl bg-[#F9F8F4] border border-[#1A2E22]/10 text-left text-xs space-y-2 max-w-md mx-auto text-[#1A2E22]">
              <div className="flex justify-between border-b border-[#1A2E22]/5 pb-1">
                <span className="text-[#1A2E22]/60">Farmer:</span>
                <span className="font-bold">{bookedRequest.farmerName}</span>
              </div>
              <div className="flex justify-between border-b border-[#1A2E22]/5 pb-1">
                <span className="text-[#1A2E22]/60">Service:</span>
                <span className="font-bold text-[#2D5A27]">{bookedRequest.serviceType}</span>
              </div>
              <div className="flex justify-between border-b border-[#1A2E22]/5 pb-1">
                <span className="text-[#1A2E22]/60">Land Area:</span>
                <span className="font-bold">{bookedRequest.landArea}</span>
              </div>
              <div className="flex justify-between border-b border-[#1A2E22]/5 pb-1">
                <span className="text-[#1A2E22]/60">Scheduled Date:</span>
                <span className="font-bold">{bookedRequest.preferredDate} ({bookedRequest.preferredTime})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#1A2E22]/60">Village:</span>
                <span className="font-bold">{bookedRequest.village}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={handleReset}
                className="px-6 py-3 rounded-full bg-[#2D5A27] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#1A2E22] transition-colors"
              >
                Book Another Service
              </button>

              <a
                href={`https://wa.me/919705806070?text=Hello%20Sri%20Venkateshwara%20Traders,%20I%20have%20booked%20Tractor%20service%20(${bookedRequest.id})%20for%20${bookedRequest.landArea}%20in%20${bookedRequest.village}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-[#25D366]/15 text-[#1A2E22] border border-[#25D366]/40 text-xs font-bold uppercase tracking-wider hover:bg-[#25D366]/25 transition-colors"
              >
                Confirm via WhatsApp
              </a>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="border-b border-[#1A2E22]/10 pb-3 mb-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-6 h-[1px] bg-[#D4AF37]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                  Mechanization Service
                </span>
              </div>
              <h3 className="text-xl font-serif font-bold text-[#1A2E22] flex items-center gap-2">
                <Tractor className="w-5 h-5 text-[#2D5A27]" />
                <span>{language === 'te' ? 'ట్రాక్టర్ బుకింగ్ ఫారం' : 'Tractor Machinery Reservation'}</span>
              </h3>
              <p className="text-xs text-[#1A2E22]/70 font-light mt-0.5">
                {language === 'te' ? 'సమయానికి ట్రాక్టర్ మరియు నిపుణుడైన ఆపరేటర్ సేవలు.' : 'Select implement, land size, and preferred schedule.'}
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A2E22] mb-1.5">
                  {t.tractorBooking.farmerName} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.farmerName}
                  onChange={(e) => setFormData({ ...formData, farmerName: e.target.value })}
                  placeholder="e.g. K. Ramesh Reddy"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F9F8F4] border border-[#1A2E22]/15 focus:border-[#2D5A27] text-xs sm:text-sm text-[#1A2E22] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A2E22] mb-1.5">
                  {t.tractorBooking.phone} *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. 9848123456"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F9F8F4] border border-[#1A2E22]/15 focus:border-[#2D5A27] text-xs sm:text-sm text-[#1A2E22] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A2E22] mb-1.5">
                  {t.tractorBooking.serviceType} *
                </label>
                <select
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F9F8F4] border border-[#1A2E22]/15 focus:border-[#2D5A27] text-xs sm:text-sm text-[#1A2E22] outline-none cursor-pointer"
                >
                  {serviceOptions.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A2E22] mb-1.5">
                  {t.tractorBooking.landArea} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.landArea}
                  onChange={(e) => setFormData({ ...formData, landArea: e.target.value })}
                  placeholder="e.g. 4.5 Acres / 30 Guntas"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F9F8F4] border border-[#1A2E22]/15 focus:border-[#2D5A27] text-xs sm:text-sm text-[#1A2E22] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A2E22] mb-1.5">
                  {t.tractorBooking.village}
                </label>
                <select
                  value={formData.village}
                  onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F9F8F4] border border-[#1A2E22]/15 text-xs sm:text-sm text-[#1A2E22] outline-none cursor-pointer"
                >
                  {villageOptions.map((v, i) => (
                    <option key={i} value={v.split(' ')[0]}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A2E22] mb-1.5">
                  {t.tractorBooking.preferredDate}
                </label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F9F8F4] border border-[#1A2E22]/15 text-xs sm:text-sm text-[#1A2E22] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A2E22] mb-1.5">
                  {t.tractorBooking.preferredTime}
                </label>
                <select
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F9F8F4] border border-[#1A2E22]/15 text-xs sm:text-sm text-[#1A2E22] outline-none cursor-pointer"
                >
                  <option value="Early Morning (6:00 AM)">Early Morning (6:00 AM)</option>
                  <option value="Morning (8:30 AM)">Morning (8:30 AM)</option>
                  <option value="Afternoon (1:30 PM)">Afternoon (1:30 PM)</option>
                  <option value="Evening (4:30 PM)">Evening (4:30 PM)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A2E22] mb-1.5">
                {t.tractorBooking.notes}
              </label>
              <input
                type="text"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="e.g. Red soil field near village pond"
                className="w-full px-4 py-2.5 rounded-xl bg-[#F9F8F4] border border-[#1A2E22]/15 text-xs sm:text-sm text-[#1A2E22] outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-full bg-[#2D5A27] hover:bg-[#1A2E22] text-white font-bold text-xs uppercase tracking-widest shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer disabled:opacity-70 mt-4"
            >
              <Tractor className="w-4 h-4 text-[#D4AF37]" />
              <span>{isSubmitting ? 'Booking Schedule...' : t.tractorBooking.submit}</span>
            </button>
          </form>
        )}
      </AnimatePresence>
    </div>
  );

  if (isOpenModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <div className="max-w-2xl w-full max-h-[95vh] overflow-y-auto relative">
          <button
            onClick={onCloseModal}
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-[#1A2E22] text-[#F9F8F4] hover:bg-[#2D5A27] flex items-center justify-center text-sm font-bold shadow"
          >
            ✕
          </button>
          {formContent}
        </div>
      </div>
    );
  }

  return (
    <section id="tractor-booking" className="py-16 bg-[#EEF2EB] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">{formContent}</div>
    </section>
  );
};
