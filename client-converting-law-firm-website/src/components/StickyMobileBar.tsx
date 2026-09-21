import React from 'react';
import { Phone, Calendar } from 'lucide-react';

interface StickyMobileBarProps {
  onOpenScheduler: () => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({ onOpenScheduler }) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#41342E] border-t border-[#5A4840] p-2.5 px-3 sm:px-4 flex items-center gap-2 sm:gap-3 shadow-2xl backdrop-blur-md">
      {/* 1-Click Dialing Button */}
      <a
        id="mobile-sticky-call-btn"
        href="tel:+18005550199"
        className="flex-1 min-w-0 py-3 px-2 sm:px-3 rounded-xl bg-[#41342E] hover:bg-[#5A4840] text-[#F5E9C8] font-bold text-[11px] sm:text-xs flex items-center justify-center gap-1.5 sm:gap-2 border border-[#6A554B] active:scale-98 transition-all"
      >
        <Phone className="w-4 h-4 fill-current" />
        <span>Call (800) 555-0199</span>
      </a>

      {/* Book Online Button */}
      <button
        id="mobile-sticky-book-btn"
        onClick={onOpenScheduler}
        className="flex-1 min-w-0 py-3 px-2 sm:px-3 rounded-xl bg-[#C7A14C] hover:bg-[#D7C17A] text-[#241B17] font-bold text-[11px] sm:text-xs flex items-center justify-center gap-1.5 sm:gap-2 shadow-lg active:scale-98 transition-all"
      >
        <Calendar className="w-4 h-4" />
        <span>Book Online Free</span>
      </button>
    </div>
  );
};



