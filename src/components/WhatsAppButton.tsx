import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle } from "lucide-react";

const WA_NUMBER = "971506312472";
const MSG = "Hello Port Khalid Cold Stores, I would like to inquire about your cold storage services.";
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(MSG)}`;

export const WhatsAppButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed z-[9999] bottom-[18px] right-[18px] sm:bottom-6 sm:right-6 flex flex-col items-end">
      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.8 }}
            className="mb-3 px-4 py-2 bg-[#0D2B3E] text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-xl pointer-events-none whitespace-nowrap"
          >
            Chat With Us
            {/* Tooltip Arrow */}
            <div className="absolute -bottom-1 right-6 w-2 h-2 bg-[#0D2B3E] rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulsing Background Effect */}
      <div className="relative group">
        <div className="absolute inset-0 bg-[#00A3B5] rounded-full animate-ping opacity-20 pointer-events-none" />
        
        <motion.a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="relative w-14 h-14 sm:w-16 sm:h-16 bg-[#00A3B5] text-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(0,163,181,0.4)] transition-colors hover:bg-[#0092a3]"
          aria-label="Chat with us on WhatsApp"
        >
          <MessageCircle size={28} className="sm:w-8 sm:h-8" fill="white" />
          
          {/* Subtle Shine Effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
        </motion.a>
      </div>
    </div>
  );
};
