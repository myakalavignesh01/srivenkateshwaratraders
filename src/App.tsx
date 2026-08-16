import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { ChevronUp } from 'lucide-react';
import { Language, Product, ServiceArea } from './types';
import { initialProducts, initialServiceAreas } from './data/initialData';
import { BusinessApiService } from './services/api';

import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WeatherAdvisory } from './components/WeatherAdvisory';
import { ServicesSection } from './components/ServicesSection';
import { MandiRatesTracker } from './components/MandiRatesTracker';
import { TractorSignatureSection } from './components/TractorSignatureSection';
import { MachineryEstimator } from './components/MachineryEstimator';
import { ProductsCatalog } from './components/ProductsCatalog';
import { FarmerFirstSection } from './components/FarmerFirstSection';
import { TractorBookingForm } from './components/TractorBookingForm';
import { ServiceAreaMap } from './components/ServiceAreaMap';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MobileActionBar } from './components/MobileActionBar';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [serviceAreas, setServiceAreas] = useState<ServiceArea[]>(initialServiceAreas);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Modals
  const [isTractorModalOpen, setIsTractorModalOpen] = useState(false);
  const [tractorInitialService, setTractorInitialService] = useState<string | undefined>(undefined);
  const [tractorInitialArea, setTractorInitialArea] = useState<string | undefined>(undefined);

  const [showBackToTop, setShowBackToTop] = useState(false);
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setShowBackToTop(latest > 400);
    });
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTractorBooking = (service?: string, acres?: number) => {
    if (service) setTractorInitialService(service);
    if (acres) setTractorInitialArea(`${acres} Acres`);
    setIsTractorModalOpen(true);
  };

  // Initial load from backend API
  const refreshData = async () => {
    try {
      const [fetchedProducts, fetchedAreas] = await Promise.all([
        BusinessApiService.getProducts(),
        BusinessApiService.getServiceAreas(),
      ]);
      if (fetchedProducts.length > 0) setProducts(fetchedProducts);
      if (fetchedAreas.length > 0) setServiceAreas(fetchedAreas);
    } catch (err) {
      console.warn('Using local fallback data', err);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <div className="min-h-screen bg-[#F9F8F4] text-[#1A2E22] font-sans antialiased selection:bg-[#2D5A27] selection:text-white relative">
      {/* Golden Top Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#2D5A27] via-[#D4AF37] to-[#F3E5AB] z-[100] origin-left shadow-[0_0_12px_rgba(212,175,55,0.7)] pointer-events-none"
        style={{ scaleX }}
      />

      {/* 1. Cinematic Loading Entrance */}
      <LoadingScreen />

      {/* 2. Sticky Brand Navbar */}
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
      />

      {/* 3. Main Hero Banner */}
      <main>
        <HeroSection
          language={language}
          onOpenTractorBooking={() => handleOpenTractorBooking()}
        />

        {/* 4. Live Agricultural Weather & Spraying Advisory */}
        <WeatherAdvisory language={language} />

        {/* 5. Core Agricultural Solutions */}
        <ServicesSection
          language={language}
          onOpenTractorBooking={() => handleOpenTractorBooking()}
          onSelectCategory={setSelectedCategory}
        />

        {/* 6. Live Mandi Rates Tracker */}
        <MandiRatesTracker language={language} />

        {/* 7. Cinematic Tractor Signature Journey */}
        <TractorSignatureSection
          language={language}
          onOpenBooking={() => handleOpenTractorBooking()}
        />

        {/* 8. Tractor & Implement Cost & Fuel Estimator */}
        <MachineryEstimator
          language={language}
          onOpenBookingWithDetails={(service, acres) => handleOpenTractorBooking(service, acres)}
        />

        {/* 9. Products & Agri-Inputs Catalog */}
        <ProductsCatalog
          products={products}
          language={language}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* 12. Farmer First Storytelling */}
        <FarmerFirstSection language={language} />

        {/* 13. Regional Service Areas & Topology Map */}
        <ServiceAreaMap serviceAreas={serviceAreas} language={language} />

        {/* 14. Direct Contact & Location Section */}
        <ContactSection language={language} />
      </main>

      {/* 15. Editorial Footer */}
      <Footer language={language} />

      {/* 16. Bottom Sticky Action Bar for Mobile Farmers */}
      <MobileActionBar
        language={language}
        onLanguageChange={setLanguage}
        onOpenTractorBooking={() => handleOpenTractorBooking()}
      />

      {/* 17. Standalone Tractor Booking Modal */}
      {isTractorModalOpen && (
        <TractorBookingForm
          language={language}
          isOpenModal={true}
          initialServiceType={tractorInitialService}
          initialLandArea={tractorInitialArea}
          onCloseModal={() => {
            setIsTractorModalOpen(false);
            setTractorInitialService(undefined);
            setTractorInitialArea(undefined);
          }}
          onSuccessBooked={() => {
            refreshData();
          }}
        />
      )}

      {/* Floating Scroll To Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            id="scroll-to-top-btn"
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            title="Scroll to top"
            aria-label="Scroll to top"
            className="fixed bottom-24 sm:bottom-8 right-5 z-40 w-11 h-11 rounded-full bg-[#2D5A27] hover:bg-[#1A2E22] text-[#D4AF37] border border-[#D4AF37]/50 shadow-xl flex items-center justify-center cursor-pointer transition-colors backdrop-blur-sm"
          >
            <ChevronUp className="w-5 h-5 stroke-[2.5]" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
