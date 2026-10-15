import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onOpenInquiriesModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenInquiriesModal }) => {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-neutral-900">
          
          {/* Col 1: Wordmark & Statement */}
          <div className="space-y-3 md:col-span-1">
            <span className="text-lg font-black tracking-tight text-white uppercase">
              FAHIM TRADERS
            </span>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Prime structural steel materials and certified welding works. Specialized in architectural home main gates, heavy-duty solar mounting pergolas, and industrial warehouse structures.
            </p>
          </div>

          {/* Col 2: Capabilities */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Fabrication Services
            </h4>
            <ul className="space-y-2">
              <li><a href="#showcase" className="hover:text-amber-400 transition-colors">Architectural Main Gates</a></li>
              <li><a href="#showcase" className="hover:text-amber-400 transition-colors">Walkable Solar Pergolas</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Industrial Warehouse Sheds</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Boundary Safety Grills</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Precision MIG & ARC Welding</a></li>
            </ul>
          </div>

          {/* Col 3: Steel Materials Stock */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Raw Materials Supply
            </h4>
            <ul className="space-y-2">
              <li><a href="#materials" className="hover:text-amber-400 transition-colors">Mild Steel Square Box Pipes</a></li>
              <li><a href="#materials" className="hover:text-amber-400 transition-colors">Structural C-Channels & H-Beams</a></li>
              <li><a href="#materials" className="hover:text-amber-400 transition-colors">Hot-Dip Galvanized Unistrut</a></li>
              <li><a href="#materials" className="hover:text-amber-400 transition-colors">Equal & Heavy Angle Iron</a></li>
              <li><a href="#materials" className="hover:text-amber-400 transition-colors">GI & MS Laser-Cut Sheets</a></li>
            </ul>
          </div>

          {/* Col 4: Contact Line */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Direct Contact
            </h4>
            <div className="space-y-2 text-xs">
              <a href="tel:03000127565" className="flex items-center gap-2 hover:text-amber-400 transition-colors">
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <span className="font-mono-numbers font-medium text-white">0300-0127565</span>
              </a>
              <a href="mailto:fahimkhan234568@gmail.com" className="flex items-center gap-2 hover:text-amber-400 transition-colors">
                <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="truncate">fahimkhan234568@gmail.com</span>
              </a>
              <div className="flex items-start gap-2 text-neutral-300">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Nasirabad Mor, Near Ataullah Grass</span>
                  <span className="text-neutral-400">Bin Qasim, Karachi, Pakistan</span>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Nasirabad+Mor+Bin+Qasim+Karachi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-[11px] text-amber-500 hover:text-amber-400 underline mt-0.5"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>
              <button
                onClick={onOpenInquiriesModal}
                className="mt-2 inline-flex items-center text-xs font-semibold text-amber-500 hover:text-amber-400 underline cursor-pointer"
              >
                Open Orders Desk
              </button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} FAHIM TRADERS WELDING WORKS. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Direct Mill Pricing</span>
            <span aria-hidden="true">·</span>
            <span>Certified Structural Welding</span>
            <span aria-hidden="true">·</span>
            <span>Home Gate & Solar Specialists</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
