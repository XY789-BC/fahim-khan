import React from 'react';
import { Phone, ClipboardList } from 'lucide-react';

interface HeaderProps {
  onOpenInquiriesModal: () => void;
  inquiryCount: number;
}

export const Header: React.FC<HeaderProps> = ({ onOpenInquiriesModal, inquiryCount }) => {
  return (
    <header className="sticky top-0 z-50 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single text element in display face, no subtitles) */}
        <a 
          href="#" 
          className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase whitespace-nowrap shrink-0 hover:text-amber-400 transition-colors"
        >
          FAHIM TRADERS
        </a>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-300">
          <a href="#services" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Services
          </a>
          <a href="#materials" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Materials
          </a>
          <a href="#showcase" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Portfolio
          </a>
          <a href="#location" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Location
          </a>
          <a href="#contact" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Contact
          </a>
        </nav>

        {/* Zone 3: 1 primary action + subtle inquiry desk trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenInquiriesModal}
            title="View Inquiries & Orders Desk"
            className="hidden sm:inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 rounded-lg hover:border-neutral-700 transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ClipboardList className="w-3.5 h-3.5 text-amber-500" />
            <span>Orders Desk</span>
            {inquiryCount > 0 && (
              <span className="font-mono-numbers px-1.5 py-0.2 bg-amber-500 text-neutral-950 rounded text-[11px] font-bold">
                {inquiryCount}
              </span>
            )}
          </button>

          <a
            href="tel:03000127565"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors shadow-sm whitespace-nowrap shrink-0"
          >
            <Phone className="w-4 h-4" />
            <span>0300-0127565</span>
          </a>
        </div>
      </div>
    </header>
  );
};
