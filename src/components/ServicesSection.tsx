import React from 'react';
import { Shield, Sun, Warehouse, Lock, Layers, ArrowUpRight } from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceForEstimate: (category: 'gate' | 'solar' | 'shed' | 'grill') => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForEstimate }) => {
  const services = [
    {
      num: '01',
      title: 'Architectural Home Main Gates',
      category: 'gate' as const,
      icon: Shield,
      tagline: 'Modern Slats · Heavy Wrought Iron · Motorized Sliding Tracks',
      description: 'Custom engineered residential driveway gates designed for maximum curb appeal, anti-sag structural rigidity, and long-term durability. Fabricated with 14 or 16-gauge steel, reinforced hinges, and weather-resistant polyurethane coating.',
      specs: ['14-16 Gauge Steel Framework', 'Full Penetration MIG Welds', 'Automated Sliding Track Options', 'Anti-Rust Red Oxide Base']
    },
    {
      num: '02',
      title: 'Engineered Solar Mounting Structures',
      category: 'solar' as const,
      icon: Sun,
      tagline: 'Elevated Rooftop Pergolas · Hot-Dip Galvanized C-Channels',
      description: 'Heavy-duty elevated structures that convert your rooftop into a shaded, walkable recreational terrace while generating clean energy. Built with 80-micron hot-dip galvanized C-channels and high-tensile angle cross bracing rated for 140+ km/h winds.',
      specs: ['Hot-Dip Galvanized (80 Micron)', 'High Wind Load Resistance', 'Walkable Clearance (8ft - 9ft)', 'SS304 Rust-Free Clamps']
    },
    {
      num: '03',
      title: 'Structural Welding & Warehouse Sheds',
      category: 'shed' as const,
      icon: Warehouse,
      tagline: 'Industrial I-Beams · Truss Roofing · Mezzanines',
      description: 'Complete certified structural fabrication for industrial sheds, commercial car porchs, mezzanine floor frameworks, and steel staircases. Tested joints conforming to high load tolerances and structural engineering codes.',
      specs: ['Certified Welder Workmanship', 'Heavy I-Beam & C-Channel Columns', 'Corrugated & Sandwich Roofing', 'Custom Span Engineering']
    },
    {
      num: '04',
      title: 'Safety Grills & Boundary Security Metalwork',
      category: 'grill' as const,
      icon: Lock,
      tagline: 'Window Grills · Boundary Wall Spikes · Balcony Railings',
      description: 'High-security forged iron and modern square-box perimeter protection. Custom crafted for residential villas, housing schemes, and commercial compounds with burglar-resistant anchoring.',
      specs: ['Solid Forged 12mm Iron Bars', 'Laser-Cut Balcony Panels', 'Anti-Climb Boundary Spikes', 'Clean Flush Welded Joints']
    },
    {
      num: '05',
      title: 'Iron & Steel Raw Material Supply',
      category: 'materials' as const,
      icon: Layers,
      tagline: 'Wholesale Mill Stock · Pipes · Channels · Angles · Sheets',
      description: 'Fahim Traders maintains extensive depot inventory of prime structural steel for contractors and self-builders. Direct mill rates on square box tubing, C-channels, deformed bars, and GI sheets with custom precision cutting.',
      specs: ['Prime Commercial & Structural Grades', 'Complete Dimension Availability', 'Custom Length Cutting On-site', 'Direct Vehicle Delivery Available']
    }
  ];

  return (
    <section id="services" className="py-20 bg-neutral-950 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-neutral-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
              Our Capabilities & Solutions
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
              Engineered Metalwork & Structural Fabrication
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md leading-relaxed">
            From single custom residential home gates to multi-kilowatt commercial solar pergolas, we combine certified welding expertise with direct mill material pricing.
          </p>
        </div>

        {/* Services List / Asymmetric Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon;
            const isMarquee = idx === 0 || idx === 1;

            return (
              <div
                key={service.num}
                className={`flex flex-col justify-between p-7 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-amber-500/40 transition-all group ${
                  isMarquee && idx === 0 ? 'lg:col-span-2' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between pb-5 border-b border-neutral-800/80">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-neutral-950 transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono-numbers text-xs font-semibold text-neutral-400">
                        {service.num}.
                      </span>
                    </div>

                    {service.category !== 'materials' && (
                      <button
                        onClick={() => onSelectServiceForEstimate(service.category as any)}
                        className="text-xs font-medium text-neutral-400 hover:text-amber-400 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>Estimate</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-white tracking-tight group-hover:text-amber-400 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="mt-1 text-xs font-medium text-amber-500/90">
                    {service.tagline}
                  </p>

                  <p className="mt-4 text-sm text-neutral-300 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Tech specs bullet list */}
                  <ul className="mt-5 space-y-2 text-xs text-neutral-400">
                    {service.specs.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-neutral-800/80">
                  {service.category !== 'materials' ? (
                    <button
                      onClick={() => onSelectServiceForEstimate(service.category as any)}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-neutral-200 bg-neutral-800 hover:bg-neutral-700 hover:text-white rounded-lg transition-colors cursor-pointer"
                    >
                      <span>Configure & Calculate {service.title.split(' ')[0]}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-amber-500" />
                    </button>
                  ) : (
                    <a
                      href="#materials"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-neutral-200 bg-neutral-800 hover:bg-neutral-700 hover:text-white rounded-lg transition-colors cursor-pointer"
                    >
                      <span>Browse Iron & Steel Stocks</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-amber-500" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
