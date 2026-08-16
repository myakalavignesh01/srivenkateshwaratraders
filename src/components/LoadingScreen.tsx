import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sprout, Wheat } from 'lucide-react';

interface LoadingScreenProps {
  onFinish?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onFinish) onFinish();
    }, 1100);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1A2E22] text-[#F9F8F4] px-6"
        >
          {/* Subtle background radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,transparent_70%)] pointer-events-none" />

          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative flex flex-col items-center text-center max-w-md"
          >
            {/* Emblem Icon */}
            <div className="w-16 h-16 rounded-full bg-[#2D5A27] border border-[#D4AF37]/30 flex items-center justify-center mb-6 shadow-2xl">
              <Sprout className="w-8 h-8 text-[#D4AF37]" />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-2"
            >
              Madharam • Urkonda • Nagarkurnool
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-[#F9F8F4]"
            >
              SRI VENKATESHWARA
              <span className="block text-[#D4AF37] font-serif text-xl sm:text-2xl mt-1 tracking-widest">
                TRADERS
              </span>
            </motion.h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 140 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="h-[1px] bg-[#D4AF37] my-5"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.45 }}
              className="text-xs text-[#F9F8F4]/80 tracking-wider flex items-center gap-2 font-light"
            >
              <Wheat className="w-3.5 h-3.5 text-[#D4AF37]" />
              Smart Agriculture & Farm Services
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
