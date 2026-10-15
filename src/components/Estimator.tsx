import React, { useState } from 'react';
import { 
  Calculator, 
  Send, 
  Download, 
  Check, 
  Sparkles, 
  Layers, 
  Weight, 
  DollarSign, 
  Clock, 
  ChevronRight,
  Shield,
  Sun,
  Warehouse,
  Lock
} from 'lucide-react';
import { EstimateParameters, ProjectInquiry } from '../types';

interface EstimatorProps {
  initialCategory?: 'gate' | 'solar' | 'shed' | 'grill';
  onSaveInquiry: (inquiry: Omit<ProjectInquiry, 'id' | 'timestamp' | 'status'>) => void;
}

export const Estimator: React.FC<EstimatorProps> = ({ 
  initialCategory = 'gate',
  onSaveInquiry 
}) => {
  const [params, setParams] = useState<EstimateParameters>({
    category: initialCategory,
    gateWidthFt: 14,
    gateHeightFt: 7,
    gateStyle: 'modern-slats',
    gateGauge: '14-gauge-heavy',
    gateType: 'double-swing',
    includeMotorization: false,
    solarSystemCapacityKW: 10,
    solarStructureType: 'elevated-pergola-walkable',
    solarSteelType: 'hot-dip-galvanized',
    solarWindRating: '120-kmh-standard',
    shedLengthFt: 30,
    shedWidthFt: 20,
    shedRoofType: 'corrugated-gi-sheet',
    grillLinearFt: 40,
    grillHeightFt: 4,
    grillStyle: 'modern-horizontal',
    paintFinish: 'duco-matte-black'
  });

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync category if initialCategory changes
  React.useEffect(() => {
    if (initialCategory) {
      setParams(prev => ({ ...prev, category: initialCategory }));
    }
  }, [initialCategory]);

  // CALCULATION LOGIC
  const calculateQuote = () => {
    let steelWeightKg = 0;
    let materialCostPKR = 0;
    let weldingLaborPKR = 0;
    let coatingCostPKR = 0;
    let hardwareCostPKR = 0;
    let summaryText = '';

    const steelRatePerKg = 265; // average steel rate in PKR
    const galvanizedRatePerKg = 345; // hot-dip galvanized rate in PKR

    if (params.category === 'gate') {
      const areaSqFt = params.gateWidthFt * params.gateHeightFt;
      let weightFactor = 2.8; // kg per sq ft
      if (params.gateGauge === '14-gauge-heavy') weightFactor = 3.4;
      if (params.gateGauge === '18-gauge-economy') weightFactor = 2.2;
      if (params.gateStyle === 'heavy-wrought-iron') weightFactor *= 1.4;
      if (params.gateStyle === 'laser-cut-panel') weightFactor *= 1.25;
      if (params.gateStyle === 'fahim-signature-palace') weightFactor *= 1.55;

      steelWeightKg = Math.round(areaSqFt * weightFactor);
      materialCostPKR = steelWeightKg * steelRatePerKg;
      weldingLaborPKR = Math.round(steelWeightKg * 85); // fabrication & MIG welding rate
      
      if (params.paintFinish === 'duco-matte-black') {
        coatingCostPKR = Math.round(areaSqFt * 280);
      } else if (params.paintFinish === 'epoxy-industrial-powder') {
        coatingCostPKR = Math.round(areaSqFt * 420);
      } else {
        coatingCostPKR = Math.round(areaSqFt * 120);
      }

      hardwareCostPKR = params.gateType === 'sliding' ? 22000 : 14000;
      if (params.includeMotorization) {
        hardwareCostPKR += 85000; // heavy duty sliding automated motor kit
      }

      summaryText = `Main Gate (${params.gateWidthFt}ft x ${params.gateHeightFt}ft) - ${params.gateStyle.replace('-', ' ').toUpperCase()} in ${params.gateGauge.replace('-', ' ').toUpperCase()}`;
    } else if (params.category === 'solar') {
      // 10kW is approx 18 panels of 580W
      const panelCount = Math.ceil((params.solarSystemCapacityKW * 1000) / 580);
      let weightPerPanelKg = 32; // standard L2/L3

      if (params.solarStructureType === 'elevated-pergola-walkable') {
        weightPerPanelKg = 54; // heavy elevated structure with columns & C-channel girders
      } else if (params.solarStructureType === 'heavy-ground-mount') {
        weightPerPanelKg = 42;
      }

      if (params.solarWindRating === '150-kmh-cyclone-resistant') {
        weightPerPanelKg *= 1.2;
      }

      steelWeightKg = Math.round(panelCount * weightPerPanelKg);
      const rate = params.solarSteelType === 'hot-dip-galvanized' ? galvanizedRatePerKg : steelRatePerKg;
      materialCostPKR = steelWeightKg * rate;
      weldingLaborPKR = Math.round(steelWeightKg * 65);
      
      coatingCostPKR = params.solarSteelType === 'hot-dip-galvanized' 
        ? 0 // already included in galvanized rate
        : Math.round(steelWeightKg * 40); // primer & industrial paint
      
      // Hardware: SS304 clamps + anchor bolts
      hardwareCostPKR = panelCount * 950 + 12000;

      summaryText = `${params.solarSystemCapacityKW}kW Solar Structure (${panelCount} panels) - ${params.solarStructureType.replace(/-/g, ' ').toUpperCase()} (${params.solarSteelType})`;
    } else if (params.category === 'shed') {
      const areaSqFt = params.shedLengthFt * params.shedWidthFt;
      steelWeightKg = Math.round(areaSqFt * 3.8); // truss + purlins + columns
      materialCostPKR = steelWeightKg * steelRatePerKg;
      
      // Roof sheeting cost
      const sheetRateSqFt = params.shedRoofType === 'sandwich-insulated-panel' ? 450 : 220;
      const roofSheetsCost = areaSqFt * sheetRateSqFt;
      materialCostPKR += roofSheetsCost;

      weldingLaborPKR = Math.round(areaSqFt * 160);
      coatingCostPKR = Math.round(steelWeightKg * 35);
      hardwareCostPKR = 25000;

      summaryText = `Structural Shed (${params.shedLengthFt}ft x ${params.shedWidthFt}ft = ${areaSqFt} sq ft) with ${params.shedRoofType.replace(/-/g, ' ')}`;
    } else {
      // Grills
      const linearFt = params.grillLinearFt;
      const heightFt = params.grillHeightFt;
      const areaSqFt = linearFt * heightFt;
      steelWeightKg = Math.round(areaSqFt * 2.2);
      materialCostPKR = steelWeightKg * steelRatePerKg;
      weldingLaborPKR = Math.round(areaSqFt * 120);
      coatingCostPKR = Math.round(areaSqFt * 140);
      hardwareCostPKR = 6000;

      summaryText = `Boundary/Window Grills (${linearFt} Rft x ${heightFt}ft height) - ${params.grillStyle.replace('-', ' ')}`;
    }

    const totalEstimatePKR = materialCostPKR + weldingLaborPKR + coatingCostPKR + hardwareCostPKR;

    return {
      steelWeightKg,
      materialCostPKR,
      weldingLaborPKR,
      coatingCostPKR,
      hardwareCostPKR,
      totalEstimatePKR,
      summaryText
    };
  };

  const quote = calculateQuote();

  const handleSendToWhatsApp = () => {
    const text = encodeURIComponent(
      `*FAHIM TRADERS — PROJECT ESTIMATE REQUEST*\n` +
      `----------------------------------------\n` +
      `*Client:* ${customerName || 'Inquirer'}\n` +
      `*Phone:* ${customerPhone || 'Not specified'}\n` +
      `*City/Site:* ${customerCity || 'Local'}\n` +
      `*Service:* ${quote.summaryText}\n` +
      `*Estimated Steel Weight:* ${quote.steelWeightKg.toLocaleString()} kg\n` +
      `*Material Estimate:* PKR ${quote.materialCostPKR.toLocaleString()}\n` +
      `*Welding & Fabrication Labor:* PKR ${quote.weldingLaborPKR.toLocaleString()}\n` +
      `*Coating & Finish:* PKR ${quote.coatingCostPKR.toLocaleString()}\n` +
      `*Hardware & Anchors:* PKR ${quote.hardwareCostPKR.toLocaleString()}\n` +
      `*Total Turnkey Estimate:* PKR ${quote.totalEstimatePKR.toLocaleString()}\n` +
      `----------------------------------------\n` +
      `Please review and share finalized quotation and site measurement schedule.`
    );
    window.open(`https://wa.me/923000127565?text=${text}`, '_blank');
  };

  const handleSaveToDesk = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveInquiry({
      name: customerName.trim() || 'Website Estimator User',
      email: 'direct@fahimtraders.com',
      phone: customerPhone.trim() || '03000127565',
      service: quote.summaryText,
      scope: `${quote.steelWeightKg} kg Steel, Turnkey PKR ${quote.totalEstimatePKR.toLocaleString()}`,
      preferredContact: 'WhatsApp',
      details: `Configured via interactive estimator. Estimated steel weight: ${quote.steelWeightKg} kg. Finish: ${params.paintFinish}. City: ${customerCity || 'Not specified'}.`,
      estimatedCostPKR: quote.totalEstimatePKR,
      notes: 'Generated via Live Interactive Project Estimator.'
    });

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 4000);
  };

  return (
    <section id="estimator" className="py-20 bg-neutral-900 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-neutral-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
              Interactive Fabrication Calculator
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Project Scope & Steel Cost Estimator
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md leading-relaxed">
            Configure your gate dimensions, solar pergola kilowatt capacity, or structural steel specs for instant weight, raw material, and welding cost estimates.
          </p>
        </div>

        {/* Category Tabs (Segmented control) */}
        <div className="mt-8 flex flex-wrap gap-2 p-1.5 bg-neutral-950 rounded-xl border border-neutral-800 max-w-3xl">
          <button
            onClick={() => setParams({ ...params, category: 'gate' })}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
              params.category === 'gate' 
                ? 'bg-amber-500 text-neutral-950 shadow-sm' 
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Main Entrance Gate</span>
          </button>

          <button
            onClick={() => setParams({ ...params, category: 'solar' })}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
              params.category === 'solar' 
                ? 'bg-amber-500 text-neutral-950 shadow-sm' 
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Sun className="w-4 h-4" />
            <span>Solar Mounting Structure</span>
          </button>

          <button
            onClick={() => setParams({ ...params, category: 'shed' })}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
              params.category === 'shed' 
                ? 'bg-amber-500 text-neutral-950 shadow-sm' 
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Warehouse className="w-4 h-4" />
            <span>Industrial Shed / Truss</span>
          </button>

          <button
            onClick={() => setParams({ ...params, category: 'grill' })}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
              params.category === 'grill' 
                ? 'bg-amber-500 text-neutral-950 shadow-sm' 
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Security Grills & Railings</span>
          </button>
        </div>

        {/* Calculator Main Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Input Form Controls (7 cols) */}
          <div className="lg:col-span-7 bg-neutral-950 rounded-2xl border border-neutral-800 p-6 sm:p-8 space-y-6">
            
            {/* GATE CONTROLS */}
            {params.category === 'gate' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-2">
                      Gate Width: <span className="text-amber-500 font-mono-numbers">{params.gateWidthFt} Feet</span>
                    </label>
                    <input
                      type="range"
                      min="8"
                      max="24"
                      step="1"
                      value={params.gateWidthFt}
                      onChange={(e) => setParams({ ...params, gateWidthFt: Number(e.target.value) })}
                      className="w-full accent-amber-500 bg-neutral-800 cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-neutral-500 mt-1">
                      <span>8 ft (Single Car)</span>
                      <span>14 ft (Standard)</span>
                      <span>24 ft (Wide Estate)</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-2">
                      Gate Height: <span className="text-amber-500 font-mono-numbers">{params.gateHeightFt} Feet</span>
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="10"
                      step="0.5"
                      value={params.gateHeightFt}
                      onChange={(e) => setParams({ ...params, gateHeightFt: Number(e.target.value) })}
                      className="w-full accent-amber-500 bg-neutral-800 cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-neutral-500 mt-1">
                      <span>5 ft (Low)</span>
                      <span>7 ft (Standard)</span>
                      <span>10 ft (Security)</span>
                    </div>
                  </div>
                </div>

                {/* Gate Style */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-2">
                    Architectural Design Style
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: 'fahim-signature-palace', label: 'FAHIM TRADERS Signature Palace Gate', sub: 'Fluted panels & brass Greek-key medallion' },
                      { id: 'modern-slats', label: 'Modern Horizontal Louver Slats', sub: 'Minimalist & sleek privacy' },
                      { id: 'heavy-wrought-iron', label: 'Heavy Ornate Wrought Iron', sub: 'Hand-forged classic curves' },
                      { id: 'laser-cut-panel', label: 'CNC Laser-Cut Geometric Pattern', sub: 'Contemporary designer steel' },
                      { id: 'simple-square-pipe', label: 'Standard Heavy Box Tubing', sub: 'Clean economic durability' },
                    ].map((style) => (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => setParams({ ...params, gateStyle: style.id as any })}
                        className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                          params.gateStyle === style.id
                            ? 'bg-neutral-900 border-amber-500 text-white'
                            : 'bg-neutral-900/40 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                        }`}
                      >
                        <div className="font-semibold text-xs text-white">{style.label}</div>
                        <div className="text-[11px] text-neutral-400 mt-0.5">{style.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Gauge & Mechanism */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-2">
                      Steel Thickness / Gauge
                    </label>
                    <select
                      value={params.gateGauge}
                      onChange={(e) => setParams({ ...params, gateGauge: e.target.value as any })}
                      className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs font-medium text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="14-gauge-heavy">14 Gauge (2.0mm Heavy - Anti-Sag Recommended)</option>
                      <option value="16-gauge-standard">16 Gauge (1.6mm Standard Residential)</option>
                      <option value="18-gauge-economy">18 Gauge (1.2mm Economy)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-2">
                      Gate Operation
                    </label>
                    <select
                      value={params.gateType}
                      onChange={(e) => setParams({ ...params, gateType: e.target.value as any })}
                      className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs font-medium text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="double-swing">Double Swing (2 Leaves on Heavy Pivot Hinges)</option>
                      <option value="sliding">Sliding Track (Ground Bearing Rail & Rollers)</option>
                      <option value="single-swing">Single Wide Swing Door</option>
                    </select>
                  </div>
                </div>

                {/* Motorization toggle */}
                <div className="flex items-center justify-between p-4 bg-neutral-900 rounded-xl border border-neutral-800">
                  <div>
                    <span className="text-xs font-semibold text-white">Include Automatic Motorized Opener Kit</span>
                    <p className="text-[11px] text-neutral-400">
                      Italian/Heavy motor, remote controls, infrared safety obstacle sensor & manual key release.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={params.includeMotorization}
                    onChange={(e) => setParams({ ...params, includeMotorization: e.target.checked })}
                    className="w-4 h-4 accent-amber-500 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* SOLAR CONTROLS */}
            {params.category === 'solar' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-2">
                    Solar System Size: <span className="text-amber-500 font-mono-numbers">{params.solarSystemCapacityKW} kW</span>
                    <span className="text-neutral-500 ml-2 font-mono-numbers">
                      (~{Math.ceil((params.solarSystemCapacityKW * 1000) / 580)} solar panels)
                    </span>
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="50"
                    step="1"
                    value={params.solarSystemCapacityKW}
                    onChange={(e) => setParams({ ...params, solarSystemCapacityKW: Number(e.target.value) })}
                    className="w-full accent-amber-500 bg-neutral-800 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-neutral-500 mt-1">
                    <span>3 kW (Small Home)</span>
                    <span>10 kW (5 Marla / 10 Marla)</span>
                    <span>20 kW (1 Kanal Villa)</span>
                    <span>50 kW (Commercial)</span>
                  </div>
                </div>

                {/* Structure Type */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-2">
                    Mounting Architecture
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { 
                        id: 'elevated-pergola-walkable', 
                        label: 'Elevated Rooftop Pergola', 
                        desc: '8.5ft high walkable terrace, heavy columns' 
                      },
                      { 
                        id: 'standard-rooftop-l2', 
                        label: 'Standard Rooftop (L2/L3)', 
                        desc: 'Low profile direct slab mount angle frames' 
                      },
                      { 
                        id: 'heavy-ground-mount', 
                        label: 'Heavy Ground Mount', 
                        desc: 'Open plot / farm ground structural frame' 
                      },
                    ].map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setParams({ ...params, solarStructureType: type.id as any })}
                        className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                          params.solarStructureType === type.id
                            ? 'bg-neutral-900 border-amber-500 text-white'
                            : 'bg-neutral-900/40 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                        }`}
                      >
                        <div className="font-semibold text-xs text-white">{type.label}</div>
                        <div className="text-[11px] text-neutral-400 mt-1">{type.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-2">
                      Steel Corrosion Protection
                    </label>
                    <select
                      value={params.solarSteelType}
                      onChange={(e) => setParams({ ...params, solarSteelType: e.target.value as any })}
                      className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs font-medium text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="hot-dip-galvanized">Hot-Dip Galvanized (80 Micron - 25yr Rust Proof)</option>
                      <option value="mild-steel-primer">Heavy Mild Steel with Red Oxide + Epoxy Paint</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-2">
                      Wind Storm Resistance Rating
                    </label>
                    <select
                      value={params.solarWindRating}
                      onChange={(e) => setParams({ ...params, solarWindRating: e.target.value as any })}
                      className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs font-medium text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="120-kmh-standard">120 km/h (Standard Urban Zone)</option>
                      <option value="150-kmh-cyclone-resistant">150 km/h (Extra Cross-Braced & Heavy Anchors)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* SHED CONTROLS */}
            {params.category === 'shed' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-2">
                      Shed Length: <span className="text-amber-500 font-mono-numbers">{params.shedLengthFt} ft</span>
                    </label>
                    <input
                      type="range"
                      min="15"
                      max="100"
                      step="5"
                      value={params.shedLengthFt}
                      onChange={(e) => setParams({ ...params, shedLengthFt: Number(e.target.value) })}
                      className="w-full accent-amber-500 bg-neutral-800 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-2">
                      Shed Span / Width: <span className="text-amber-500 font-mono-numbers">{params.shedWidthFt} ft</span>
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="60"
                      step="5"
                      value={params.shedWidthFt}
                      onChange={(e) => setParams({ ...params, shedWidthFt: Number(e.target.value) })}
                      className="w-full accent-amber-500 bg-neutral-800 cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-2">
                    Roof Sheeting Specification
                  </label>
                  <select
                    value={params.shedRoofType}
                    onChange={(e) => setParams({ ...params, shedRoofType: e.target.value as any })}
                    className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs font-medium text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="corrugated-gi-sheet">Pre-Painted Corrugated GI Sheet (28 Gauge)</option>
                    <option value="sandwich-insulated-panel">Insulated Sandwich Polyurethane Panel (50mm Heat Barrier)</option>
                    <option value="fiberglass">Translucent Industrial Fiberglass Skylight Panels</option>
                  </select>
                </div>
              </div>
            )}

            {/* GRILL CONTROLS */}
            {params.category === 'grill' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-2">
                      Total Running Feet: <span className="text-amber-500 font-mono-numbers">{params.grillLinearFt} Rft</span>
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="200"
                      step="5"
                      value={params.grillLinearFt}
                      onChange={(e) => setParams({ ...params, grillLinearFt: Number(e.target.value) })}
                      className="w-full accent-amber-500 bg-neutral-800 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-2">
                      Height: <span className="text-amber-500 font-mono-numbers">{params.grillHeightFt} ft</span>
                    </label>
                    <input
                      type="range"
                      min="2"
                      max="8"
                      step="0.5"
                      value={params.grillHeightFt}
                      onChange={(e) => setParams({ ...params, grillHeightFt: Number(e.target.value) })}
                      className="w-full accent-amber-500 bg-neutral-800 cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-2">
                    Security Style
                  </label>
                  <select
                    value={params.grillStyle}
                    onChange={(e) => setParams({ ...params, grillStyle: e.target.value as any })}
                    className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs font-medium text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="modern-horizontal">Modern Square Box Horizontal Bars</option>
                    <option value="security-spike-heavy">Boundary Wall Razor Spikes & Solid 12mm Iron Bar</option>
                    <option value="ornamental-forged">Ornamental Forged Scrollwork</option>
                  </select>
                </div>
              </div>
            )}

            {/* Common Finish Control */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-2">
                Primer & Paint Finish
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'duco-matte-black', label: 'Matte Graphite / Duco', desc: 'Double coat sleek finish' },
                  { id: 'epoxy-industrial-powder', label: 'Industrial Powder Coat', desc: 'Oven-baked scratch proof' },
                  { id: 'red-oxide-primer-only', label: 'Anti-Rust Red Oxide Only', desc: 'Base primer for on-site painter' },
                ].map((finish) => (
                  <button
                    key={finish.id}
                    type="button"
                    onClick={() => setParams({ ...params, paintFinish: finish.id as any })}
                    className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                      params.paintFinish === finish.id
                        ? 'bg-neutral-900 border-amber-500 text-white'
                        : 'bg-neutral-900/40 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div className="font-semibold text-xs text-white">{finish.label}</div>
                    <div className="text-[11px] text-neutral-400 mt-0.5">{finish.desc}</div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right: Instant Cost Breakdown Slip (5 cols) */}
          <div className="lg:col-span-5 bg-neutral-950 rounded-2xl border border-neutral-800 p-6 sm:p-7 space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Live Cost Breakdown
                </h3>
              </div>
              <span className="text-xs font-mono-numbers text-neutral-400">
                FAHIM TRADERS
              </span>
            </div>

            {/* Summary Tag */}
            <div className="p-3.5 bg-neutral-900/70 rounded-xl border border-neutral-800/80">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-amber-500">
                Configured Specification
              </span>
              <p className="mt-1 text-xs font-medium text-white leading-relaxed">
                {quote.summaryText}
              </p>
            </div>

            {/* Metric Items */}
            <div className="space-y-3.5 text-xs">
              <div className="flex items-center justify-between py-2 border-b border-neutral-900">
                <div className="flex items-center gap-2 text-neutral-300">
                  <Weight className="w-3.5 h-3.5 text-amber-500" />
                  <span>Estimated Steel Weight</span>
                </div>
                <span className="font-mono-numbers font-semibold text-white">
                  {quote.steelWeightKg.toLocaleString()} kg
                </span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-neutral-900">
                <div className="flex items-center gap-2 text-neutral-300">
                  <Layers className="w-3.5 h-3.5 text-amber-500" />
                  <span>Raw Iron / Steel Material</span>
                </div>
                <span className="font-mono-numbers font-semibold text-white">
                  PKR {quote.materialCostPKR.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-neutral-900">
                <div className="flex items-center gap-2 text-neutral-300">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Cutting, Fabrication & MIG Welding</span>
                </div>
                <span className="font-mono-numbers font-semibold text-white">
                  PKR {quote.weldingLaborPKR.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-neutral-900">
                <div className="flex items-center gap-2 text-neutral-300">
                  <Shield className="w-3.5 h-3.5 text-amber-500" />
                  <span>Surface Prep, Primer & Coating</span>
                </div>
                <span className="font-mono-numbers font-semibold text-white">
                  PKR {quote.coatingCostPKR.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-neutral-900">
                <div className="flex items-center gap-2 text-neutral-300">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>Fittings, Hinges, Rollers & Anchors</span>
                </div>
                <span className="font-mono-numbers font-semibold text-white">
                  PKR {quote.hardwareCostPKR.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Total Highlight */}
            <div className="p-4 bg-gradient-to-br from-amber-500/10 via-neutral-900 to-neutral-950 rounded-xl border border-amber-500/30">
              <div className="flex items-center justify-between text-xs text-neutral-300">
                <span className="font-semibold uppercase tracking-wider text-amber-500">
                  Total Turnkey Estimate
                </span>
                <span className="text-[11px] text-neutral-400 font-mono-numbers">
                  ~ ${(quote.totalEstimatePKR / 280).toFixed(0)} USD
                </span>
              </div>
              <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-white font-mono-numbers tracking-tight">
                PKR {quote.totalEstimatePKR.toLocaleString()}
              </div>
              <p className="mt-1 text-[11px] text-neutral-400">
                Includes material supply, precision welding, and workshop fabrication.
              </p>
            </div>

            {/* Quick Customer Info for WhatsApp & Save */}
            <form onSubmit={handleSaveToDesk} className="space-y-3 pt-2">
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Your Name (Optional)"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
                <input
                  type="text"
                  placeholder="City / Area"
                  value={customerCity}
                  onChange={(e) => setCustomerCity(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <input
                type="tel"
                placeholder="Phone / WhatsApp Number (e.g. 03000127565)"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 font-mono-numbers"
              />

              <div className="flex flex-col gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleSendToWhatsApp}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors cursor-pointer shadow-md shadow-amber-500/10"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Quote to WhatsApp (0300-0127565)</span>
                </button>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-colors cursor-pointer"
                >
                  {saveSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Quote Saved to Inquiries Desk!</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5 text-amber-500" />
                      <span>Save Inquiry to Orders Desk</span>
                    </>
                  )}
                </button>
              </div>
            </form>

          </div>

        </div>

      </div>
    </section>
  );
};
