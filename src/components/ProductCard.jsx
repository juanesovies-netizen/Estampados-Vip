import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Heart, Sparkles, Star, MessageSquarePlus, ShoppingBag, Eye, Shirt } from 'lucide-react';
import { formatCOP } from '../utils/formatCurrency';

export default function ProductCard({ product }) {
  const { 
    openProductDetail, 
    favorites, 
    toggleFavorite, 
    openCustomModal, 
    creators,
    addToCart
  } = useApp();

  const [viewMode, setViewMode] = useState('mockup'); // 'mockup' | 'design'
  const isFav = favorites.includes(product.id);

  const creator = creators.find((c) => c.id === product.creatorId) || {
    id: product.creatorId,
    name: product.creatorName,
    avatar: product.creatorAvatar,
    verified: true
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart({
      product,
      size: 'L',
      color: product.availableColors[0] || '#000000',
      colorName: 'Negro Profundo',
      apparelType: product.apparelType,
      printPlacement: 'Pecho Frontal Grande',
      quantity: 1,
      price: product.price
    });
  };

  return (
    <div className="group rounded-2xl bg-white border border-slate-200 hover:border-blue-600 transition-all duration-300 flex flex-col overflow-hidden shadow-sm hover:shadow-md">
      
      {/* Top Image Preview Container */}
      <div className="relative aspect-[4/5] bg-slate-100 overflow-hidden cursor-pointer">
        <img
          src={viewMode === 'mockup' ? (product.mockupTshirt || product.image) : (product.designOnly || product.image)}
          alt={product.title}
          onClick={() => openProductDetail(product)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Category & Garment Pills */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 pointer-events-none">
          <span className="bg-black text-white px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shadow-sm">
            {product.category}
          </span>
          <span className="bg-white text-slate-900 px-2 py-0.5 rounded text-[10px] font-semibold border border-slate-200 shadow-sm">
            {product.apparelType}
          </span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-slate-700 hover:text-red-500 hover:scale-110 transition border border-slate-200 shadow-sm"
          title={isFav ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
        </button>

        {/* View Mode Toggle (Mockup vs Solo Estampado) */}
        {product.designOnly && (
          <div className="absolute bottom-3 left-3 flex bg-white/95 rounded-lg p-0.5 shadow border border-slate-200 text-[10px] font-bold">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setViewMode('mockup');
              }}
              className={`px-2 py-1 rounded transition ${
                viewMode === 'mockup' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Prenda
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setViewMode('design');
              }}
              className={`px-2 py-1 rounded transition ${
                viewMode === 'design' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Estampado
            </button>
          </div>
        )}
      </div>

      {/* Card Information */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-white">
        
        {/* Creator Info */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <img
              src={creator.avatar}
              alt={creator.name}
              className="w-5 h-5 rounded-full object-cover border border-slate-300"
            />
            <span className="text-slate-600 font-semibold truncate max-w-[150px]">
              {creator.name}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-800">
            <Star className="w-3 h-3 text-blue-600 fill-blue-600" />
            <span>{product.rating}</span>
            <span className="text-slate-400 font-normal">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Product Title & Technical Details */}
        <div>
          <h3 
            onClick={() => openProductDetail(product)}
            className="font-bold text-slate-900 text-base leading-snug group-hover:text-blue-600 transition-colors cursor-pointer line-clamp-1"
          >
            {product.title}
          </h3>
          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Print Technique Pill */}
        <div className="pt-1">
          <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 inline-block">
            {product.printTechnique?.split(' ')[0] || 'Serigrafía'} • Tacto Cero
          </span>
        </div>

        {/* Price & Action Buttons */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold uppercase">Precio</span>
            <span className="text-lg font-black text-slate-900">
              {formatCOP(product.price)}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => openProductDetail(product)}
              className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition flex items-center gap-1"
              title="Personalizar color y talla"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Ver</span>
            </button>

            <button
              onClick={handleQuickAdd}
              className="py-2 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
              title="Añadir directo al carrito"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Comprar</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
