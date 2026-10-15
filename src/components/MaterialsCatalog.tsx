import React, { useState } from 'react';
import { Search, Layers, Check, Phone, MessageSquare, Plus, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { MATERIALS_STOCK } from '../data/materialsData';
import { MaterialItem } from '../types';

interface MaterialsCatalogProps {
  onQuickInquireMaterial: (item: MaterialItem) => void;
}

export const MaterialsCatalog: React.FC<MaterialsCatalogProps> = ({ onQuickInquireMaterial }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cartItems, setCartItems] = useState<{ item: MaterialItem; quantity: number }[]>([]);
  const [showCartDrawer, setShowCartDrawer] = useState<boolean>(false);

  const filteredMaterials = MATERIALS_STOCK.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.gaugeOrSize.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.recommendedUse.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (item: MaterialItem) => {
    setCartItems((prev) => {
      const existing = prev.find((p) => p.item.id === item.id);
      if (existing) {
        return prev.map((p) => p.item.id === item.id ? { ...p, quantity: p.quantity + 1 } : p);
      }
      return [...prev, { item, quantity: 1 }];
    });
    setShowCartDrawer(true);
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prev) => prev.filter((p) => p.item.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCartItems((prev) => 
      prev.map((p) => {
        if (p.item.id === itemId) {
          const newQty = Math.max(1, p.quantity + delta);
          return { ...p, quantity: newQty };
        }
        return p;
      })
    );
  };

  const handleWhatsAppMaterialList = () => {
    if (cartItems.length === 0) return;
    const itemsText = cartItems
      .map((c, i) => `${i + 1}. ${c.item.name} (${c.item.gaugeOrSize}) — Qty: ${c.quantity} units`)
      .join('\n');
    
    const text = encodeURIComponent(
      `*FAHIM TRADERS — STEEL MATERIAL INQUIRY*\n` +
      `----------------------------------------\n` +
      `Hello! I need a price quote and stock confirmation for the following steel materials:\n\n` +
      `${itemsText}\n\n` +
      `Please provide current mill rates and delivery schedule to site.`
    );
    window.open(`https://wa.me/923000127565?text=${text}`, '_blank');
  };

  return (
    <section id="materials" className="py-20 bg-neutral-950 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-neutral-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
              Direct Mill Depot Inventory
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Iron & Steel Materials Supply
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm text-neutral-400 max-w-md leading-relaxed hidden sm:block">
              We stock all structural iron, pipes, channels, angles, and steel sheets required for building modern homes, gates, solar pergolas, and industrial frameworks.
            </p>
            {cartItems.length > 0 && (
              <button
                onClick={() => setShowCartDrawer(!showCartDrawer)}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors shrink-0 cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Selected List ({cartItems.reduce((acc, c) => acc + c.quantity, 0)})</span>
              </button>
            )}
          </div>
        </div>

        {/* Filters & Search Bar */}
        <div className="mt-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-900 rounded-xl border border-neutral-800 overflow-x-auto scrollbar-none">
            {[
              { id: 'all', label: 'All Materials' },
              { id: 'pipes', label: 'Square & Rect Box Pipes' },
              { id: 'channels', label: 'C-Channels' },
              { id: 'angles', label: 'Angle Iron' },
              { id: 'sheets', label: 'Plates & Sheets' },
              { id: 'bars', label: 'Bars & Rebar' },
              { id: 'solar-hardware', label: 'Solar Fasteners' },
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

          {/* Search Input */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search gauge, thickness, type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
            />
          </div>

        </div>

        {/* Materials Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 transition-all group"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight group-hover:text-amber-400 transition-colors">
                      {item.name}
                    </h3>
                    <div className="mt-1 flex items-center gap-2 text-xs text-amber-500/90 font-mono-numbers">
                      <span>{item.gaugeOrSize}</span>
                      <span aria-hidden="true" className="text-neutral-700">·</span>
                      <span className="text-neutral-400">{item.standardLength}</span>
                    </div>
                  </div>

                  <span className="shrink-0 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                    In Stock
                  </span>
                </div>

                <p className="mt-4 text-xs text-neutral-300 leading-relaxed">
                  {item.description}
                </p>

                {/* Technical Specifications */}
                <div className="mt-5 p-3 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-neutral-400">
                    <span>Dimensions</span>
                    <span className="font-mono-numbers text-white font-medium">{item.dimensions}</span>
                  </div>
                  <div className="flex items-center justify-between text-neutral-400">
                    <span>Weight Standard</span>
                    <span className="font-mono-numbers text-white font-medium">~ {item.weightPerUnitKg} kg</span>
                  </div>
                  <div className="flex items-center justify-between text-neutral-400">
                    <span>Best For</span>
                    <span className="text-amber-400 text-right truncate max-w-[170px]" title={item.recommendedUse}>
                      {item.recommendedUse}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-baseline justify-between">
                  <div className="text-xs text-neutral-400">Estimated Rate:</div>
                  <div className="text-sm font-bold text-white font-mono-numbers">
                    PKR {item.estimatedRatePKR.toLocaleString()} <span className="text-[11px] text-neutral-500 font-normal">{item.rateUnit}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center gap-2">
                <button
                  onClick={() => addToCart(item)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Inquiry</span>
                </button>

                <button
                  onClick={() => onQuickInquireMaterial(item)}
                  title="Inquire on WhatsApp"
                  className="inline-flex items-center justify-center p-2 text-xs font-medium text-neutral-300 bg-neutral-800 hover:bg-neutral-700 hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredMaterials.length === 0 && (
          <div className="mt-12 text-center py-12 bg-neutral-900/40 rounded-2xl border border-neutral-800">
            <p className="text-sm text-neutral-400">
              No materials match your search query "{searchQuery}".
            </p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="mt-3 text-xs font-semibold text-amber-500 hover:underline cursor-pointer"
            >
              Reset Filters & Show All
            </button>
          </div>
        )}

        {/* Selected Items Tray / Drawer */}
        {cartItems.length > 0 && showCartDrawer && (
          <div className="mt-10 p-6 rounded-2xl bg-neutral-900 border border-amber-500/30">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Material Inquiry List ({cartItems.length} items)
                </h3>
              </div>
              <button
                onClick={() => setCartItems([])}
                className="text-xs text-neutral-500 hover:text-red-400 transition-colors cursor-pointer"
              >
                Clear All
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cartItems.map(({ item, quantity }) => (
                <div key={item.id} className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 flex items-center justify-between">
                  <div className="truncate pr-2">
                    <div className="text-xs font-semibold text-white truncate">{item.name}</div>
                    <div className="text-[11px] text-neutral-400 font-mono-numbers">{item.gaugeOrSize}</div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="flex items-center border border-neutral-800 rounded bg-neutral-900">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-2 py-0.5 text-xs text-neutral-400 hover:text-white"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-mono-numbers text-white">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-2 py-0.5 text-xs text-neutral-400 hover:text-white"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 text-neutral-500 hover:text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-neutral-800">
              <div className="text-xs text-neutral-400">
                Ready to send to Fahim Khan (Phone: <span className="font-mono-numbers text-white font-semibold">0300-0127565</span>)
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={handleWhatsAppMaterialList}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send List via WhatsApp (0300-0127565)</span>
                </button>
                <a
                  href="tel:03000127565"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Directly</span>
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
