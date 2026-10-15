import React from 'react';
import { ArrowRight, MessageSquare, ShieldCheck, Flame, Wrench, Sparkles } from 'lucide-react';

interface HeroProps {
  onScrollToEstimator: () => void;
  onScrollToInquiry: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToEstimator, onScrollToInquiry }) => {
  const heroImage = '/src/assets/images/hero_welding_fabrication_1791990205566.jpg';

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      "Hello Fahim Traders! I would like to inquire about structural welding, main gates, solar structures, and steel materials."
    );
    window.open(`https://wa.me/923000127565?text=${text}`, '_blank');
  };

  return (
    <section className="relative overflow-hidden bg-neutral-950 pt-8 pb-16 lg:py-20 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Trust Kicker (Unboxed text with typographic separators) */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-neutral-400 mb-6">
          <span className="text-amber-500 uppercase tracking-wider">Heavy Structural Welding</span>
          <span aria-hidden="true" className="text-neutral-700">·</span>
          <span>Architectural Home Gates</span>
          <span aria-hidden="true" className="text-neutral-700">·</span>
          <span>Engineered Solar Structures</span>
          <span aria-hidden="true" className="text-neutral-700">·</span>
          <span className="text-neutral-300">Bin Qasim, Karachi (Nasirabad Mor)</span>
        </div>

        {/* 2-Column Balanced Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-between py-2">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] text-balance">
                Precision Structural Welding & Complete Home Steel Fabrication
              </h1>
              
              <p className="mt-5 text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl">
                FAHIM TRADERS supplies all certified iron and steel materials needed to construct modern homes—from custom designer main gates and elevated solar mounting pergolas to heavy warehouse trusses and boundary security metalwork.
              </p>

              {/* Core Proof Pillars */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-neutral-800/80 pt-6">
                <div>
                  <div className="flex items-center gap-2 text-white font-semibold text-sm">
                    <Flame className="w-4 h-4 text-amber-500" />
                    <span>MIG / ARC Welding</span>
                  </div>
                  <p className="mt-1 text-xs text-neutral-400">
                    High penetration structural joints tested for heavy load bearing.
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-white font-semibold text-sm">
                    <ShieldCheck className="w-4 h-4 text-amber-500" />
                    <span>Prime Steel Stock</span>
                  </div>
                  <p className="mt-1 text-xs text-neutral-400">
                    Mill-certified C-channels, square box pipes, angles & sheets.
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-white font-semibold text-sm">
                    <Wrench className="w-4 h-4 text-amber-500" />
                    <span>Turnkey Installation</span>
                  </div>
                  <p className="mt-1 text-xs text-neutral-400">
                    Precision site measurement, custom fabrication, and rigging.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onScrollToEstimator}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors shadow-lg shadow-amber-500/10 cursor-pointer whitespace-nowrap"
              >
                <span>Calculate Project Estimate</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleWhatsAppDirect}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp: 0300-0127565</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero High-Impact Visual */}
          <div className="lg:col-span-5 relative group min-h-[360px] lg:min-h-full rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900">
            <img
              src={heroImage}
              alt="Fahim Traders structural welding and metal fabrication workshop"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Measured contrast scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/30 to-transparent pointer-events-none" />
            
            {/* Visual caption */}
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-neutral-900/90 border border-neutral-800/90 backdrop-blur-sm">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span className="font-semibold text-white">Workshop & Stock Depot</span>
                <span className="font-mono-numbers">0300-0127565</span>
              </div>
              <p className="mt-1 text-xs text-neutral-300">
                Nasirabad Mor, near Ataullah Grass, Bin Qasim, Karachi. Precision welding, custom home gates, solar pergolas & raw steel supply.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
