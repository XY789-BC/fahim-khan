import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Copy, 
  Check, 
  Clock, 
  Truck, 
  Phone, 
  MessageSquare, 
  Compass, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export const WorkshopLocationSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const exactAddress = "Nasirabad Mor, near Ataullah Grass, Bin Qasim, Karachi, Pakistan";
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Nasirabad+Mor+Bin+Qasim+Karachi";

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(exactAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsAppLocation = () => {
    const text = encodeURIComponent(
      `*FAHIM TRADERS WELDING WORKS & STEEL DEPOT*\n` +
      `📍 *Location:* Nasirabad Mor, near Ataullah Grass, Bin Qasim, Karachi\n` +
      `📞 *Phone:* 0300-0127565\n` +
      `🗺️ *Google Maps:* ${googleMapsUrl}\n` +
      `Structural welding, home main gates, solar structures & raw steel materials.`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const deliveryZones = [
    { name: 'Bin Qasim & Port Qasim', desc: 'Direct industrial hub delivery within 1 hour' },
    { name: 'Steel Town & Gulshan-e-Hadeed', desc: 'Immediate site delivery and free measurement visits' },
    { name: 'Malir, Landhi & Korangi', desc: 'Daily truck dispatches for fabrication projects' },
    { name: 'DHA Karachi & Clifton', desc: 'Luxury architectural gates & elevated solar pergolas' },
    { name: 'Bahria Town Karachi & Scheme 33', desc: 'Solar structures & residential villa gates delivery' },
    { name: 'Greater Karachi & Interior Sindh', desc: 'Full trailer load deliveries with crane offloading' },
  ];

  return (
    <section id="location" className="py-20 bg-neutral-950 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-500">
              <MapPin className="w-3.5 h-3.5" />
              <span>Workshop & Materials Depot Location</span>
            </div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Visit FAHIM TRADERS in Bin Qasim, Karachi
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md leading-relaxed">
            Our physical workshop and steel yard are strategically located in Bin Qasim, Karachi with full trailer access, overhead cranes, and direct transport links.
          </p>
        </div>

        {/* Location Showcase Grid */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Location Details & Quick Actions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-6">
            
            <div>
              {/* Landmark Highlight Banner */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
                <Compass className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Primary Landmark & Junction
                  </span>
                  <div className="mt-1 text-base sm:text-lg font-bold text-white">
                    Nasirabad Mor, Near Ataullah Grass
                  </div>
                  <div className="text-xs text-neutral-300">
                    Bin Qasim Town, Karachi, Sindh, Pakistan
                  </div>
                </div>
              </div>

              {/* Address details list */}
              <div className="mt-6 space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-850 space-y-2">
                  <div className="flex items-center justify-between text-neutral-400">
                    <span className="font-semibold text-white uppercase text-[11px] tracking-wider">
                      Official Postal / Delivery Address
                    </span>
                    <button
                      onClick={handleCopyAddress}
                      className="inline-flex items-center gap-1 text-amber-500 hover:text-amber-400 font-medium cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Address</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-sm font-medium text-neutral-200">
                    FAHIM TRADERS WELDING WORKS & STEEL DEPOT<br />
                    Nasirabad Mor, Near Ataullah Grass, Bin Qasim, Karachi
                  </p>
                </div>

                {/* Logistics & Accessibility */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-850">
                    <div className="flex items-center gap-2 text-white font-semibold">
                      <Truck className="w-4 h-4 text-amber-500" />
                      <span>Heavy Transport Access</span>
                    </div>
                    <p className="mt-1 text-neutral-400 text-[11px] leading-relaxed">
                      Wide road access accommodating 40ft flatbed trailers, Mazda trucks, and crane unloading.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-850">
                    <div className="flex items-center gap-2 text-white font-semibold">
                      <Clock className="w-4 h-4 text-amber-500" />
                      <span>Working Hours</span>
                    </div>
                    <p className="mt-1 text-neutral-400 text-[11px] leading-relaxed">
                      Mon – Sat: 8:00 AM – 8:00 PM<br />
                      Friday: Break for Jummah prayers
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Navigation Action Buttons */}
            <div className="pt-4 border-t border-neutral-800/80 flex flex-wrap sm:flex-nowrap items-center gap-3">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-xl transition-colors cursor-pointer shadow-md shadow-amber-500/10 whitespace-nowrap"
              >
                <Navigation className="w-4 h-4" />
                <span>Navigate via Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>

              <a
                href="tel:03000127565"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold text-white bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-colors whitespace-nowrap"
              >
                <Phone className="w-4 h-4 text-amber-500" />
                <span>0300-0127565</span>
              </a>

              <button
                onClick={handleShareWhatsAppLocation}
                title="Share location details on WhatsApp"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold text-emerald-400 bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </button>
            </div>

          </div>

          {/* Right Column: Karachi Delivery Coverage & Visual Route Map (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-6">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  Karachi Delivery & Site Measurement
                </span>
                <span className="text-[11px] text-amber-500 font-semibold">
                  Entire Karachi Covered
                </span>
              </div>

              <p className="mt-3 text-xs text-neutral-300 leading-relaxed">
                Operating directly out of Nasirabad Mor, Bin Qasim, our crane trucks and mobile welding teams dispatch daily to all major residential schemes and industrial sectors:
              </p>

              {/* Delivery Zones List */}
              <div className="mt-4 space-y-2.5">
                {deliveryZones.map((zone) => (
                  <div 
                    key={zone.name}
                    className="p-2.5 bg-neutral-950 rounded-lg border border-neutral-850 flex items-start gap-2.5"
                  >
                    <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-white">{zone.name}</div>
                      <div className="text-[11px] text-neutral-400">{zone.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Site inspection prompt */}
            <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 text-xs">
              <span className="font-semibold text-white block">Need On-Site Measurement in Karachi?</span>
              <p className="text-neutral-400 text-[11px] mt-1">
                Our fabricators visit your home or factory plot anywhere in Karachi to take precise laser measurements for gates, solar pergolas, and roof trusses.
              </p>
              <div className="mt-3">
                <a
                  href="tel:03000127565"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-500 hover:text-amber-400"
                >
                  <span>Book Free Karachi Site Visit: 0300-0127565 →</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
