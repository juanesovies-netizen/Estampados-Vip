import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Heart, Sparkles, Star, MessageSquarePlus, ShoppingBag, Eye } from 'lucide-react';
import { formatCOP } from '../utils/formatCurrency';

export default function ProductCard({ product }) {
  const { 
    openProductDetail, 
    favorites, 
    toggleFavorite, 
    openCustomModal, 
    creators 
  } = useApp();

  const [viewMode, setViewMode] = useState('mockup'); // 'mockup' | 'design'
  const isFav = favorites.includes(product.id);

  const creator = creators.find((c) => c.id === product.creatorId) || {
    id: product.creatorId,
    name: product.creatorName,
    avatar: product.creatorAvatar,
    verified: true
  };

  return (
    <div className="group rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-amber-400/50 transition-all duration-300 flex flex-col overflow-hidden hover:shadow-xl hover:shadow-amber-500/5">
      
      {/* Top Image Preview Container */}
      <div className="relative aspect-[4/5] bg-slate-950 overflow-hidden cursor-pointer">
        <img
          src={viewMode === 'mockup' ? (product.mockupTshirt || product.image) : (product.designOnly || product.image)}
          alt={product.title}
          onClick={() => openProductDetail(product)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Category Pill */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 pointer-events-none">
          <span className="bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-amber-300 border border-amber-400/20">
            {product.category}
          </span>
          <span className="bg-slate-900/85 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-medium text-slate-300 border border-slate-800">
            {product.apparelType}
          </span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:text-red-400 hover:scale-110 transition border border-white/10"
          title={isFav ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
        </button>

        {/* Hover View Mode Toggle (Mockup vs Solo Estampado) */}
        {product.designOnly && (
          <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md rounded-lg p-1 flex items-center gap-1 border border-slate-700/80">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setViewMode('mockup');
              }}
              className={`text-[10px] px-2 py-0.5 rounded font-semibold transition ${
                viewMode === 'mockup' ? 'bg-amber-400 text-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              Prenda
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setViewMode('design');
              }}
              className={`text-[10px] px-2 py-0.5 rounded font-semibold transition ${
                viewMode === 'design' ? 'bg-amber-400 text-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              Estampado
            </button>
          </div>
        )}

        {/* Quick View Button on Image */}
        <button
          onClick={() => openProductDetail(product)}
          className="absolute bottom-3 right-3 p-2 rounded-lg bg-black/80 backdrop-blur-md text-slate-200 hover:text-amber-400 hover:bg-black transition border border-slate-700"
          title="Vista rápida y tallas"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Card Content & Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        
        {/* Creator Info & Custom Request Link */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={product.creatorAvatar}
              alt={product.creatorName}
              className="w-5 h-5 rounded-full object-cover ring-1 ring-amber-400/40"
            />
            <span className="text-xs text-slate-400 font-medium hover:text-slate-200 cursor-pointer">
              {product.creatorName}
            </span>
          </div>

          <button
            onClick={() => openCustomModal(creator)}
            className="text-[10px] font-semibold text-amber-400/90 hover:text-amber-300 flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-400/10 hover:bg-amber-400/20 transition"
            title="Solicitar diseño personalizado a este creador"
          >
            <MessageSquarePlus className="w-3 h-3" />
            Pedir Encargo
          </button>
        </div>

        {/* Product Title */}
        <div>
          <h3 
            onClick={() => openProductDetail(product)}
            className="text-sm font-bold text-white hover:text-amber-400 transition cursor-pointer line-clamp-1"
          >
            {product.title}
          </h3>
          <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
            {product.printTechnique}
          </p>
        </div>

        {/* Rating and Price */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="font-bold text-white">{product.rating}</span>
            <span className="text-slate-400 text-[11px]">({product.reviewsCount})</span>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400 block -mb-1">Desde</span>
            <span className="text-base font-extrabold text-white font-['Space_Grotesk']">
              {formatCOP(product.price)}
            </span>
          </div>
        </div>

        {/* Action Button: Personalize & Buy */}
        <button
          onClick={() => openProductDetail(product)}
          className="w-full py-2.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold transition flex items-center justify-center gap-2 shadow-md shadow-amber-400/10"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          Elegir Talla & Prenda
        </button>

      </div>
    </div>
  );
}
