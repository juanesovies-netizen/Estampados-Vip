import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  ShoppingBag, 
  Sparkles, 
  Star, 
  Check, 
  Ruler, 
  ShieldCheck, 
  Shirt, 
  MessageSquarePlus, 
  Layers
} from 'lucide-react';
import { formatCOP } from '../utils/formatCurrency';

const GARMENT_OPTIONS = [
  { id: 'tshirt-oversize', name: 'Camiseta Oversize 240g', priceDiff: 0, tag: 'Recomendada' },
  { id: 'hoodie-heavy', name: 'Hoodie Unisex Forro Polar', priceDiff: 60000, tag: 'Clima Frío' },
  { id: 'crewneck', name: 'Sudadera Crewneck', priceDiff: 45000, tag: 'Clásica' },
  { id: 'totebag', name: 'Tote Bag Lona Pesada', priceDiff: -30000, tag: 'Accesorio' }
];

const COLOR_OPTIONS = [
  { hex: '#000000', name: 'Negro Profundo', border: '#334155' },
  { hex: '#ffffff', name: 'Blanco Óptico', border: '#cbd5e1' },
  { hex: '#2563eb', name: 'Azul Cobalto', border: '#3b82f6' },
  { hex: '#0f172a', name: 'Azul Noche Oscuro', border: '#1e293b' },
  { hex: '#475569', name: 'Gris Carbón', border: '#64748b' }
];

const PRINT_POSITIONS = [
  'Pecho Frontal Grande (30x40cm)',
  'Espalda Completa Gigante (35x45cm)',
  'Bolsillo Frontal Discreto (10x10cm)'
];

export default function ProductDetailModal() {
  const { 
    isDetailModalOpen, 
    setIsDetailModalOpen, 
    selectedProduct, 
    addToCart, 
    openCustomModal,
    creators 
  } = useApp();

  const [selectedGarment, setSelectedGarment] = useState(GARMENT_OPTIONS[0]);
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);
  const [selectedSize, setSelectedSize] = useState('L');
  const [selectedPosition, setSelectedPosition] = useState(PRINT_POSITIONS[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTabImage, setActiveTabImage] = useState('mockup'); // 'mockup' | 'design'
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  if (!isDetailModalOpen || !selectedProduct) return null;

  const basePrice = selectedProduct.price;
  const finalUnitPrice = Math.max(45000, basePrice + selectedGarment.priceDiff);

  const creator = creators.find((c) => c.id === selectedProduct.creatorId) || {
    id: selectedProduct.creatorId,
    name: selectedProduct.creatorName,
    avatar: selectedProduct.creatorAvatar,
    verified: true
  };

  const handleAddToCart = () => {
    addToCart({
      product: selectedProduct,
      apparelType: selectedGarment.name,
      size: selectedSize,
      color: selectedColor.hex,
      colorName: selectedColor.name,
      printPlacement: selectedPosition,
      quantity,
      price: finalUnitPrice
    });
    setIsDetailModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Close Button */}
        <button
          onClick={() => setIsDetailModalOpen(false)}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition border border-slate-200"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto">
          
          {/* Left Column: Image & View Modes */}
          <div className="md:col-span-5 bg-slate-100 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200">
            <div className="space-y-4">
              
              {/* Image Preview Box */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm">
                <img
                  src={activeTabImage === 'mockup' ? (selectedProduct.mockupTshirt || selectedProduct.image) : (selectedProduct.designOnly || selectedProduct.image)}
                  alt={selectedProduct.title}
                  className="w-full h-full object-cover transition-all duration-300"
                />

                {/* View Mode Pill Toggle */}
                {selectedProduct.designOnly && (
                  <div className="absolute bottom-3 left-3 right-3 flex bg-white/95 rounded-xl p-1 shadow border border-slate-200 text-xs font-bold justify-center gap-1">
                    <button
                      onClick={() => setActiveTabImage('mockup')}
                      className={`flex-1 py-1.5 rounded-lg transition ${
                        activeTabImage === 'mockup'
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Prenda Terminada
                    </button>
                    <button
                      onClick={() => setActiveTabImage('design')}
                      className={`flex-1 py-1.5 rounded-lg transition ${
                        activeTabImage === 'design'
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Ilustración Sola
                    </button>
                  </div>
                )}
              </div>

              {/* Creator Card */}
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <img
                    src={creator.avatar}
                    alt={creator.name}
                    className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{creator.name}</h4>
                    <span className="text-[11px] text-blue-600 font-semibold">Diseñador VIP</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsDetailModalOpen(false);
                    openCustomModal(creator);
                  }}
                  className="py-1 px-2.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 transition"
                >
                  Pedir Encargo
                </button>
              </div>

            </div>

            {/* Quality Note */}
            <div className="pt-4 text-[11px] text-slate-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Garantía de estampado de 50 lavados sin desgaste</span>
            </div>
          </div>

          {/* Right Column: Customization Controls */}
          <div className="md:col-span-7 p-6 sm:p-8 space-y-6 bg-white">
            
            {/* Header Title & Pricing */}
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                  {selectedProduct.category}
                </span>
                <span className="text-xs text-slate-500 font-semibold">
                  Técnica: {selectedProduct.printTechnique?.split(' ')[0] || 'Serigrafía'}
                </span>
              </div>

              <h2 className="text-2xl font-black text-slate-900 font-['Space_Grotesk']">
                {selectedProduct.title}
              </h2>

              <div className="flex items-center gap-3 mt-2">
                <span className="text-3xl font-black text-slate-900">
                  {formatCOP(finalUnitPrice)}
                </span>
                <span className="text-xs text-slate-400">IVA incluido • Envío nacional</span>
              </div>
            </div>

            {/* Prenda Base Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 uppercase flex items-center gap-1.5">
                <Shirt className="w-4 h-4 text-blue-600" />
                <span>1. Elige la prenda base:</span>
              </label>

              <div className="grid grid-cols-2 gap-2">
                {GARMENT_OPTIONS.map((garment) => {
                  const isSelected = selectedGarment.id === garment.id;
                  return (
                    <button
                      key={garment.id}
                      onClick={() => setSelectedGarment(garment)}
                      className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50 text-slate-900'
                          : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold">{garment.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-blue-600" />}
                      </div>
                      <span className="text-[11px] text-slate-500 mt-1">
                        {garment.priceDiff > 0 ? `+${formatCOP(garment.priceDiff)}` : 'Precio base'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Color Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 uppercase">
                2. Color de Prenda: <span className="text-blue-600 font-bold">{selectedColor.name}</span>
              </label>

              <div className="flex items-center gap-3">
                {COLOR_OPTIONS.map((color) => {
                  const isSelected = selectedColor.hex === color.hex;
                  return (
                    <button
                      key={color.hex}
                      onClick={() => setSelectedColor(color)}
                      style={{ backgroundColor: color.hex }}
                      className={`w-9 h-9 rounded-full border-2 transition-transform ${
                        isSelected
                          ? 'scale-110 ring-2 ring-blue-600 ring-offset-2'
                          : 'hover:scale-105'
                      }`}
                      title={color.name}
                    />
                  );
                })}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800 uppercase">
                  3. Talla: <span className="text-blue-600 font-bold">{selectedSize}</span>
                </label>
                <button
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                  className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1 font-semibold"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Guía de Tallas</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                {['XS', 'S', 'M', 'L', 'XL', '2XL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition ${
                      selectedSize === size
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {showSizeGuide && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                  <p><strong>Corte Oversize:</strong> Recomendamos pedir tu talla habitual para un fit relajado y holgado.</p>
                  <p>Talla M: Pecho 56cm, Largo 72cm • Talla L: Pecho 60cm, Largo 75cm.</p>
                </div>
              )}
            </div>

            {/* Print Placement Position */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 uppercase">
                4. Ubicación del Estampado:
              </label>

              <select
                value={selectedPosition}
                onChange={(e) => setSelectedPosition(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-600 cursor-pointer"
              >
                {PRINT_POSITIONS.map((pos) => (
                  <option key={pos} value={pos}>{pos}</option>
                ))}
              </select>
            </div>

            {/* Add to Cart Actions */}
            <div className="pt-4 border-t border-slate-200 flex items-center gap-4">
              <div className="flex items-center border border-slate-300 rounded-xl bg-white overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100"
                >
                  -
                </button>
                <span className="px-3 py-2 text-xs font-bold text-slate-900 min-w-[2rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow transition flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Añadir al Carrito ({formatCOP(finalUnitPrice * quantity)})</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
