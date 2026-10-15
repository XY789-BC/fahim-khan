import React, { useState } from 'react';
import { Eye, Shield, CheckCircle2, X, ArrowUpRight, Wrench, Sparkles } from 'lucide-react';
import { SHOWCASE_PROJECTS } from '../data/showcaseData';
import { ShowcaseProject } from '../types';

interface ShowcaseGalleryProps {
  onSelectProjectForEstimate: (category: 'gate' | 'solar' | 'shed' | 'grill') => void;
}

export const ShowcaseGallery: React.FC<ShowcaseGalleryProps> = ({ onSelectProjectForEstimate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<ShowcaseProject | null>(null);

  const filteredProjects = SHOWCASE_PROJECTS.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  return (
    <section id="showcase" className="py-20 bg-neutral-900 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-neutral-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
              Workmanship & Delivered Structures
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Fabrication & Welding Portfolio
            </h2>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-950 rounded-xl border border-neutral-800 overflow-x-auto scrollbar-none">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'gate', label: 'Main Gates' },
              { id: 'solar', label: 'Solar Structures' },
              { id: 'structural', label: 'Structural Welding' },
              { id: 'materials', label: 'Steel Stockyard' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-neutral-950 shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => {
            const isSignature = project.id === 'proj-signature-gate-fahim';

            if (isSignature && (selectedCategory === 'all' || selectedCategory === 'gate')) {
              return (
                <div
                  key={project.id}
                  className="md:col-span-2 rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 border-2 border-amber-500/40 hover:border-amber-500/70 overflow-hidden transition-all shadow-xl shadow-amber-500/5 group"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                    {/* Left: Image Frame */}
                    <div 
                      onClick={() => setActiveProject(project)}
                      className="lg:col-span-5 relative aspect-3/4 sm:aspect-4/3 lg:aspect-auto overflow-hidden bg-neutral-900 cursor-pointer min-h-[400px]"
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />

                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="px-3 py-1 text-xs font-black uppercase tracking-wider text-neutral-950 bg-amber-400 rounded shadow-md">
                          FAHIM TRADERS Flagship
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-neutral-300 bg-neutral-900/90 p-2.5 rounded-xl border border-neutral-800 backdrop-blur-sm">
                        <span className="font-semibold text-white">Official Brand Plaque & Masterpiece</span>
                        <span className="text-amber-400 font-mono-numbers">Palace Gate</span>
                      </div>
                    </div>

                    {/* Right: Rich Showcase Content */}
                    <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-neutral-400 mb-2">
                          <span className="text-amber-400 uppercase tracking-wider">Custom Architectural Bronze & Steel</span>
                          <span aria-hidden="true" className="text-neutral-700">·</span>
                          <span className="text-neutral-300 font-mono-numbers">{project.location}</span>
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-amber-400 transition-colors">
                          {project.title}
                        </h3>

                        <p className="mt-3 text-sm text-neutral-300 leading-relaxed">
                          {project.summary}
                        </p>

                        {/* Highlight Features */}
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-850">
                            <span className="text-neutral-500 font-semibold block uppercase text-[10px]">Perimeter & Panels:</span>
                            <span className="text-neutral-200 mt-1 block">12-Gauge MS Box + Fluted Vertical Slats</span>
                          </div>
                          <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-850">
                            <span className="text-neutral-500 font-semibold block uppercase text-[10px]">Laser-Cut Filigree:</span>
                            <span className="text-neutral-200 mt-1 block">Antique Brass Lattice + Greek Key Medallion</span>
                          </div>
                          <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-850">
                            <span className="text-neutral-500 font-semibold block uppercase text-[10px]">Dimensions:</span>
                            <span className="text-amber-400 font-mono-numbers mt-1 block">{project.specs.dimensions}</span>
                          </div>
                          <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-850">
                            <span className="text-neutral-500 font-semibold block uppercase text-[10px]">Total Weight:</span>
                            <span className="text-amber-400 font-mono-numbers mt-1 block">{project.specs.steelWeight}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="pt-4 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center gap-3">
                        <button
                          onClick={() => {
                            const text = encodeURIComponent(
                              `Hello Fahim Traders! I saw your Flagship Architectural Palace Gate (Medallion & Fluted Panels) on your website. I want to inquire about custom fabrication and pricing for my residence.`
                            );
                            window.open(`https://wa.me/923000127565?text=${text}`, '_blank');
                          }}
                          className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-xl transition-colors cursor-pointer shadow-md shadow-amber-500/10"
                        >
                          <span>Inquire on WhatsApp for Similar Gate</span>
                        </button>

                        <button
                          onClick={() => setActiveProject(project)}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-xl transition-colors cursor-pointer"
                        >
                          <Eye className="w-4 h-4 text-amber-500" />
                          <span>View Full Blueprint Specs</span>
                        </button>

                        <button
                          onClick={() => onSelectProjectForEstimate('gate')}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 text-xs sm:text-sm font-bold text-neutral-950 bg-neutral-200 hover:bg-white rounded-xl transition-colors cursor-pointer"
                        >
                          <span>Estimate Cost</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={project.id}
                className="group flex flex-col rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 overflow-hidden transition-all"
              >
                {/* Image Frame */}
                <div 
                  onClick={() => setActiveProject(project)}
                  className="relative aspect-4/3 overflow-hidden bg-neutral-900 cursor-pointer"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  
                  <div className="absolute inset-0 -z-10 flex flex-col items-center justify-center p-6 text-center bg-neutral-900 text-neutral-500">
                    <Wrench className="w-12 h-12 mb-2 text-neutral-700" />
                    <span className="text-xs font-semibold text-neutral-400">{project.title}</span>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent pointer-events-none" />

                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-neutral-950 bg-amber-500 rounded">
                      {project.category}
                    </span>
                    <span className="text-xs font-mono-numbers text-neutral-300 bg-neutral-900/80 px-2 py-0.5 rounded backdrop-blur-sm">
                      {project.location}
                    </span>
                  </div>

                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-neutral-900/90 rounded-lg border border-neutral-700 backdrop-blur-sm">
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Technical Specs</span>
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-amber-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-xs text-neutral-400 leading-relaxed line-clamp-2">
                      {project.summary}
                    </p>

                    <div className="mt-4 pt-4 border-t border-neutral-800/80 flex flex-wrap gap-2 text-[11px] font-mono-numbers text-neutral-400">
                      {project.specs.dimensions && (
                        <span className="px-2 py-1 bg-neutral-900 rounded border border-neutral-800">
                          {project.specs.dimensions}
                        </span>
                      )}
                      {project.specs.steelWeight && (
                        <span className="px-2 py-1 bg-neutral-900 rounded border border-neutral-800 text-amber-400">
                          {project.specs.steelWeight}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <button
                      onClick={() => setActiveProject(project)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Specs & Materials</span>
                    </button>

                    {project.category !== 'materials' && (
                      <button
                        onClick={() => onSelectProjectForEstimate(project.category as any)}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors cursor-pointer"
                      >
                        <span>Estimate Cost</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Detail Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-neutral-800 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
                  Project Technical Specification
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {activeProject.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveProject(null)}
                className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-900 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="rounded-xl overflow-hidden aspect-16/9 bg-neutral-900 border border-neutral-800">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Project Overview
                </h4>
                <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
                  {activeProject.summary}
                </p>
              </div>

              {/* Specs Grid */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
                  Engineering Specifications
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800">
                    <span className="text-neutral-500">Structural Welding:</span>
                    <p className="font-semibold text-white mt-1">{activeProject.specs.weldingType}</p>
                  </div>
                  <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800">
                    <span className="text-neutral-500">Coating & Finish:</span>
                    <p className="font-semibold text-white mt-1">{activeProject.specs.coating}</p>
                  </div>
                  {activeProject.specs.dimensions && (
                    <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800">
                      <span className="text-neutral-500">Dimensions:</span>
                      <p className="font-semibold text-white mt-1 font-mono-numbers">{activeProject.specs.dimensions}</p>
                    </div>
                  )}
                  {activeProject.specs.steelWeight && (
                    <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-800">
                      <span className="text-neutral-500">Total Steel Weight:</span>
                      <p className="font-semibold text-amber-400 mt-1 font-mono-numbers">{activeProject.specs.steelWeight}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Bill of Materials Used */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
                  Steel & Iron Materials Utilized
                </h4>
                <ul className="space-y-2 text-xs text-neutral-300">
                  {activeProject.materialsUsed.map((mat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{mat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 border-t border-neutral-800 bg-neutral-950 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-neutral-400">
                Inquire directly with Fahim Khan at <span className="text-white font-mono-numbers font-semibold">0300-0127565</span>
              </span>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => {
                    const text = encodeURIComponent(`Hello Fahim Traders! I am interested in building a structure similar to: "${activeProject.title}". Please advise timeline and quotation.`);
                    window.open(`https://wa.me/923000127565?text=${text}`, '_blank');
                  }}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors cursor-pointer"
                >
                  <span>Request Similar Build</span>
                </button>
                <button
                  onClick={() => setActiveProject(null)}
                  className="px-4 py-2.5 text-xs font-medium text-neutral-400 hover:text-white bg-neutral-900 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
