export interface ProjectInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  scope: string;
  preferredContact: 'Phone' | 'WhatsApp' | 'Email';
  details: string;
  timestamp: string;
  status: 'New' | 'Contacted' | 'Quoted' | 'In Fabrication' | 'Delivered';
  notes?: string;
  estimatedCostPKR?: number;
}

export interface MaterialItem {
  id: string;
  name: string;
  category: 'pipes' | 'channels' | 'angles' | 'sheets' | 'bars' | 'solar-hardware';
  gaugeOrSize: string;
  dimensions: string;
  standardLength: string;
  weightPerUnitKg: number;
  estimatedRatePKR: number; // approximate rate per unit or kg in PKR
  rateUnit: 'per kg' | 'per length (20ft)' | 'per sheet (8x4ft)' | 'per piece';
  inStock: boolean;
  description: string;
  recommendedUse: string;
}

export interface ShowcaseProject {
  id: string;
  title: string;
  category: 'gate' | 'solar' | 'structural' | 'materials';
  image: string;
  location: string;
  materialsUsed: string[];
  specs: {
    dimensions?: string;
    steelWeight?: string;
    gauge?: string;
    coating?: string;
    weldingType: string;
  };
  summary: string;
}

export interface EstimateParameters {
  category: 'gate' | 'solar' | 'shed' | 'grill';
  
  // Gate specific
  gateWidthFt: number;
  gateHeightFt: number;
  gateStyle: 'fahim-signature-palace' | 'modern-slats' | 'heavy-wrought-iron' | 'laser-cut-panel' | 'simple-square-pipe';
  gateGauge: '14-gauge-heavy' | '16-gauge-standard' | '18-gauge-economy';
  gateType: 'sliding' | 'double-swing' | 'single-swing';
  includeMotorization: boolean;
  
  // Solar specific
  solarSystemCapacityKW: number;
  solarStructureType: 'elevated-pergola-walkable' | 'standard-rooftop-l2' | 'heavy-ground-mount';
  solarSteelType: 'hot-dip-galvanized' | 'mild-steel-primer';
  solarWindRating: '120-kmh-standard' | '150-kmh-cyclone-resistant';
  
  // Shed specific
  shedLengthFt: number;
  shedWidthFt: number;
  shedRoofType: 'corrugated-gi-sheet' | 'sandwich-insulated-panel' | 'fiberglass';
  
  // Grill specific
  grillLinearFt: number;
  grillHeightFt: number;
  grillStyle: 'modern-horizontal' | 'security-spike-heavy' | 'ornamental-forged';

  paintFinish: 'red-oxide-primer-only' | 'duco-matte-black' | 'epoxy-industrial-powder';
}
