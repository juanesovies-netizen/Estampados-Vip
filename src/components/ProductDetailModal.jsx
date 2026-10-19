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
  { id: 'hoodie-heavy', name: 'Hoodie Premium Forro Polar', priceDiff: 55000, tag: 'Clima Frío' },
  { id: 'crewneck', name: 'Sudadera Crewneck', priceDiff: 39000, tag: 'Clásica' },
  { id: 'totebag', name: 'Tote Bag Lona Pesada', priceDiff: -29000, tag: 'Accesorio' }
];

const COLOR_OPTIONS = [
  { hex: '#0f172a', name: 'Negro Lavado', border: '#334155' },
  { hex: '#f8fafc', name: 'Blanco Crudo', border: '#cbd5e1' },
  { hex: '#334155', name: 'Gris Carbón', border: '#475569' },
  { hex: '#1e293b', name: 'Azul Noche', border: '#3b82f6' },
  { hex: '#2e3828', name: 'Verde Militar', border: '#4d5b42' }
];

const PRINT_POSITIONS = [
  'Pecho Frontal Grande (30x40cm)',
  'Espalda Completa Gigante (35x45cm)',
  'Bolsillo Discreto Izquierdo (10x10cm)'
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

  if (!isDetailModalOpen || !selectedProduct) return null;

  const [selectedGarment, setSelectedGarment] = useState(GARMENT_OPTIONS[0]);
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);
  const [selectedSize, setSelectedSize] = useState('L');
  const [selectedPosition, setSelectedPosition] = useState(PRINT_POSITIONS[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTabImage, setActiveTabImage] = useState('mockup'); // 'mockup' | 'design'
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const basePrice = selectedProduct.price;
  const finalUnitPrice = Math.max(35000, basePrice + selectedGarment.priceDiff);

  const creator = creators.find((c) => c.id === selectedProduct.creatorId) || {
    name: selectedProduct.creatorName,
    avatar: selectedProduct.creatorAvatar,
    responseTime: '< 3 horas'
  };

  const handleAddToCart = () => {
    addToCart({
      product: selectedProduct,
      size: selectedSize,
      color: selectedColor.hex,
      colorName: selectedColor.name,
      apparelType: selectedGarment.name,
      printPlacement: selectedPosition,
      quantity: quantity,
      price: finalUnitPrice
    });
    setIsDetailModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#10141e] border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Close Button */}
        <button
          onClick={() => setIsDetailModalOpen(false)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          
          {/* Left Column: Visual Showcase & Mockup Preview */}
          <div className="md:col-span-5 bg-slate-950 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-800">
            <div>
              {/* Image Tabs */}
              <div className="flex items-center gap-2 mb-3">
                <button
                  onClick={() => setActiveTabImage('mockup')}
                  className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition ${
                    activeTabImage === 'mockup'
                      ? 'bg-amber-400 text-black'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  Mockup Prenda
                </button>
                <button
                  onClick={() => setActiveTabImage('design')}
                  className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition ${
                    activeTabImage === 'design'
                      ? 'bg-amber-400 text-black'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  Estampado Original
                </button>
              </div>

              {/* Main Image with dynamic color backdrop simulated */}
              <div 
                className="relative rounded-2xl overflow-hidden aspect-[4/5] flex items-center justify-center p-4 transition-colors duration-300 border border-slate-800"
                style={{ backgroundColor: activeTabImage === 'mockup' ? '#090a0f' : selectedColor.hex }}
              >
                <img
                  src={activeTabImage === 'mockup' ? (selectedProduct.mockupTshirt || selectedProduct.image) : (selectedProduct.designOnly || selectedProduct.image)}
                  alt={selectedProduct.title}
                  className="w-full h-full object-cover rounded-xl"
                />

                {/* Simulated garment color tag */}
                <div className="absolute bottom-3 left-3 bg-black/85 backdrop-blur-md px-3 py-1 rounded-lg text-[11px] text-white border border-slate-700">
                  Prenda: <span className="text-amber-400 font-semibold">{selectedColor.name}</span>
                </div>
              </div>
            </div>

            {/* Print Quality Assurance */}
            <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{selectedProduct.printTechnique}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Layers className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{selectedProduct.fabric}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Customization & Purchase Options */}
          <div className="md:col-span-7 p-6 sm:p-8 space-y-5 overflow-y-auto max-h-[85vh]">
            
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
                <span>{selectedProduct.category}</span>
                <span>•</span>
                <span className="text-slate-400">{selectedProduct.apparelType}</span>
              </div>
              <h2 className="text-2xl font-black text-white font-['Space_Grotesk'] leading-snug">
                {selectedProduct.title}
              </h2>

              {/* Creator Pill */}
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/60">
                <div className="flex items-center gap-2.5">
                  <img
                    src={selectedProduct.creatorAvatar}
                    alt={selectedProduct.creatorName}
                    className="w-6 h-6 rounded-full object-cover ring-1 ring-amber-400"
                  />
                  <span className="text-xs text-slate-300 font-medium">
                    Diseñado por <strong className="text-white">{selectedProduct.creatorName}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-1 text-xs text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{selectedProduct.rating}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedProduct.description}
            </p>

            {/* 1. Select Garment Type */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                <span>1. Elige la prenda base:</span>
                <span className="text-amber-400 font-normal">{selectedGarment.name}</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {GARMENT_OPTIONS.map((g) => {
                  const isSel = selectedGarment.id === g.id;
                  return (
                    <button
                      key={g.id}
                      onClick={() => setSelectedGarment(g)}
                      className={`p-2.5 rounded-xl border text-left transition relative ${
                        isSel
                          ? 'bg-amber-400/10 border-amber-400 text-white'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-bold leading-tight">{g.name}</div>
                      <div className="text-[11px] text-amber-300/80 font-medium mt-0.5">
                        {g.priceDiff === 0 ? 'Sin recargo' : g.priceDiff > 0 ? `+${formatCOP(g.priceDiff)}` : `-${formatCOP(Math.abs(g.priceDiff))}`}
                      </div>
                      {isSel && (
                        <Check className="w-3.5 h-3.5 text-amber-400 absolute top-2 right-2" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Select Garment Color */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                <span>2. Color de la tela:</span>
                <span className="text-amber-400 font-medium text-xs">{selectedColor.name}</span>
              </label>
              <div className="flex items-center gap-3">
                {COLOR_OPTIONS.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    style={{ backgroundColor: c.hex }}
                    className={`w-8 h-8 rounded-full border-2 transition-transform ${
                      selectedColor.name === c.name
                        ? 'ring-2 ring-amber-400 scale-110 border-white'
                        : 'border-slate-700 hover:scale-105'
                    }`}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* 3. Select Size */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  3. Talla de prenda:
                </label>
                <button
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                  className="text-[11px] text-amber-400 hover:underline flex items-center gap-1"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  Guía de tallas
                </button>
              </div>

              {showSizeGuide && (
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-[11px] text-slate-300 space-y-1">
                  <p><strong>S:</strong> Ancho 50cm • Largo 70cm</p>
                  <p><strong>M:</strong> Ancho 54cm • Largo 73cm</p>
                  <p><strong>L:</strong> Ancho 58cm • Largo 76cm (Corte Oversize)</p>
                  <p><strong>XL:</strong> Ancho 62cm • Largo 79cm</p>
                  <p><strong>2XL:</strong> Ancho 66cm • Largo 82cm</p>
                </div>
              )}

              <div className="flex items-center gap-2">
                {selectedProduct.availableSizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition ${
                      selectedSize === sz
                        ? 'bg-amber-400 text-black border-amber-400'
                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Placement of the Print */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                4. Ubicación del estampado:
              </label>
              <select
                value={selectedPosition}
                onChange={(e) => setSelectedPosition(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-medium text-slate-200 focus:outline-none focus:border-amber-400"
              >
                {PRINT_POSITIONS.map((pos) => (
                  <option key={pos} value={pos}>
                    {pos}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom Request Callout Banner */}
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3">
              <div className="text-xs text-amber-200">
                <span className="font-bold text-amber-400">¿Quieres un ajuste único?</span>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  Pide a este diseñador añadir tu nombre, cambiar la paleta o crear una versión personalizada.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsDetailModalOpen(false);
                  openCustomModal(creator);
                }}
                className="shrink-0 text-xs font-bold px-3 py-2 bg-amber-400 hover:bg-amber-300 text-black rounded-xl transition shadow"
              >
                Contactar Creador
              </button>
            </div>

            {/* Quantity and Final Add To Cart */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 font-bold flex items-center justify-center text-sm"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-bold text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 font-bold flex items-center justify-center text-sm"
                >
                  +
                </button>
              </div>

              <div className="flex-1 flex items-center justify-between gap-3">
                <div className="text-right">
                  <span className="text-[11px] text-slate-400 block -mb-1">Total Prenda + Estampado</span>
                  <span className="text-xl font-black text-white font-['Space_Grotesk']">
                    {formatCOP(finalUnitPrice * quantity)}
                  </span>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="py-3 px-5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-xs transition shadow-lg shadow-amber-500/20 flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Añadir al Carrito
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
