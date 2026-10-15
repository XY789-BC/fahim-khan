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
