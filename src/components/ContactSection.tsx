import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, MessageSquare, MapPin, Clock, Send, CheckCircle2, Navigation, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface ContactSectionProps {
  language: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ language }) => {
  const t = translations[language];
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    
    // Construct WhatsApp message or acknowledge
    const text = encodeURIComponent(
      `Hello Sri Venkateshwara Traders, my name is ${formData.name} (Phone: ${formData.phone}). ${formData.message}`
    );
    window.open(`https://wa.me/919705806070?text=${text}`, '_blank');
    setFormSent(true);
  };

  return (
    <section id="contact" className="py-24 bg-[#F9F8F4] relative border-b border-[#1A2E22]/5">
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
              {language === 'te' ? 'రైతు సేవ కేంద్రం' : 'Direct Assistance'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1A2E22] tracking-tight">
            {t.contact.heading}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#1A2E22]/70 font-light leading-relaxed">
            {t.contact.subheading}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact Cards */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-4"
          >
            {/* Phone Card */}
            <motion.div
              whileHover={{ y: -3 }}
              className="p-6 rounded-2xl bg-white border border-[#1A2E22]/10 shadow-sm flex items-start gap-4 transition-shadow hover:shadow-md"
            >
              <div className="w-12 h-12 rounded-full bg-[#2D5A27]/10 text-[#2D5A27] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-[#2D5A27]" />
              </div>
              <div className="flex-1">
                <h4 className="text-[10px] font-bold uppercase text-[#D4AF37] tracking-widest">
                  {t.contact.phone}
                </h4>
                <a
                  href="tel:9705806070"
                  className="text-xl sm:text-2xl font-serif font-bold text-[#1A2E22] hover:text-[#2D5A27] transition-colors block mt-1"
                >
                  +91 9705806070
                </a>
                <p className="text-xs text-[#1A2E22]/70 mt-1 font-light">
                  {language === 'te' ? 'రైతు విచారణలకు నేరుగా కాల్ చేయండి' : 'Available everyday for farmer inquiries & bookings'}
                </p>
                <div className="mt-4">
                  <motion.a
                    href="tel:9705806070"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2D5A27] text-white text-xs font-bold uppercase tracking-widest shadow hover:bg-[#1A2E22] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" /> Call Direct
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* WhatsApp Card */}
            <motion.div
              whileHover={{ y: -3 }}
              className="p-6 rounded-2xl bg-white border border-[#1A2E22]/10 shadow-sm flex items-start gap-4 transition-shadow hover:shadow-md"
            >
              <div className="w-12 h-12 rounded-full bg-[#25D366]/15 text-[#25D366] flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5 text-[#25D366]" />
              </div>
              <div className="flex-1">
                <h4 className="text-[10px] font-bold uppercase text-[#D4AF37] tracking-widest">
                  {t.contact.whatsapp}
                </h4>
                <span className="text-xl sm:text-2xl font-serif font-bold text-[#1A2E22] block mt-1">
                  9705806070
                </span>
                <p className="text-xs text-[#1A2E22]/70 mt-1 font-light">
                  {language === 'te' ? 'వాట్సాప్‌లో వివరాలు మరియు ఫోటోలు పంపండి' : 'Send crop photos or ask about seed availability'}
                </p>
                <div className="mt-4">
                  <motion.a
                    href="https://wa.me/919705806070?text=Namaste%20Sri%20Venkateshwara%20Traders"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-bold uppercase tracking-widest shadow hover:bg-[#20BA5A] transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> Chat on WhatsApp
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Address & Hours */}
            <div className="p-6 rounded-2xl bg-white border border-[#1A2E22]/10 shadow-sm space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-[10px] font-bold uppercase text-[#D4AF37] tracking-widest">
                    {t.contact.location}
                  </h5>
                  <p className="text-sm font-serif font-bold text-[#1A2E22] mt-0.5">
                    Sri Venkateshwara Traders, Madharam Village, Urkonda Mandal, Nagarkurnool District, Telangana - 509320
                  </p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Madharam+Urkonda+Mandal+Nagarkurnool"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2D5A27] hover:underline mt-2"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Get Directions on Google Maps</span>
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-[#1A2E22]/5">
                <Clock className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-[10px] font-bold uppercase text-[#D4AF37] tracking-widest">
                    {t.contact.hours}
                  </h5>
                  <p className="text-sm text-[#1A2E22]/80 mt-0.5 font-light">
                    {t.contact.hoursDetails}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Quick Advisory Message Box */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#1A2E22]/10 shadow-sm"
          >
            <h3 className="text-xl font-serif font-bold text-[#1A2E22] mb-1">
              {language === 'te' ? 'రైతు సలహా & సందేశం' : 'Farmer Advisory & Quick Message'}
            </h3>
            <p className="text-xs text-[#1A2E22]/70 font-light mb-6">
              {language === 'te' ? 'మీ సందేహాన్ని తెలియజేయండి. నిపుణులు సమాధానం ఇస్తారు.' : 'Leave your inquiry. We will contact you or connect instantly via WhatsApp.'}
            </p>

            {formSent ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-[#D4AF37]/15 text-[#1A2E22] flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6 text-[#2D5A27]" />
                </div>
                <h4 className="text-base font-serif font-bold text-[#1A2E22]">Inquiry Prepared</h4>
                <p className="text-xs text-[#1A2E22]/70 font-light mt-1">
                  Thank you! We have opened WhatsApp to confirm your message.
                </p>
                <button
                  onClick={() => {
                    setFormSent(false);
                    setFormData({ name: '', phone: '', message: '' });
                  }}
                  className="mt-4 px-6 py-2.5 rounded-full bg-[#2D5A27] text-white text-xs font-bold uppercase tracking-wider"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1A2E22] mb-1.5">
                    Farmer Name / మీ పేరు *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh"
                    className="w-full px-4 py-3 rounded-xl bg-[#F9F8F4] border border-[#1A2E22]/15 focus:border-[#2D5A27] text-xs sm:text-sm text-[#1A2E22] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1A2E22] mb-1.5">
                    Phone Number / మొబైల్ నంబర్ *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 9705806070"
                    className="w-full px-4 py-3 rounded-xl bg-[#F9F8F4] border border-[#1A2E22]/15 focus:border-[#2D5A27] text-xs sm:text-sm text-[#1A2E22] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1A2E22] mb-1.5">
                    Your Question / Requirement (ఏ సేవ లేదా సమాచారం కావాలి?)
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="e.g. I need price details for Paddy seeds and tractor ploughing dates for next week in Madharam."
                    className="w-full px-4 py-3 rounded-xl bg-[#F9F8F4] border border-[#1A2E22]/15 focus:border-[#2D5A27] text-xs sm:text-sm text-[#1A2E22] outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#2D5A27] hover:bg-[#1A2E22] text-white font-bold text-xs uppercase tracking-widest shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#D4AF37]" />
                  <span>Send Advisory Message</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
