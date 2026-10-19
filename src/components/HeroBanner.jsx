import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ArrowRight, Palette, ShieldCheck, Shirt, Star } from 'lucide-react';

export default function HeroBanner({ onExploreClick, onRequestCustomClick }) {
  const { user, navigateTo } = useApp();

  return (
    <section className="relative overflow-hidden py-14 lg:py-20 border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-wide">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Colecciones Exclusivas de Ropa Estampada</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] font-['Space_Grotesk']">
              Prendas de autor con <br />
              <span className="text-blue-600">
                estampados únicos
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl font-normal leading-relaxed">
              Descubre ropa gráfica de alto gramaje con arte contemporáneo, anime, trazo continuo y estética streetwear. Diseños creados por ilustradores independientes con serigrafía de máxima duración.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreClick}
                className="px-6 py-3.5 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition flex items-center gap-2"
              >
                <Shirt className="w-4 h-4" />
                <span>Explorar Ropa Estampada</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onRequestCustomClick}
                className="px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 transition flex items-center gap-2"
              >
                <Palette className="w-4 h-4 text-blue-600" />
                <span>Solicitar Prenda a Medida</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200 max-w-lg">
              <div className="space-y-1">
                <span className="text-xl sm:text-2xl font-black text-slate-900 block">240g</span>
                <p className="text-xs text-slate-500 font-medium">Algodón pesado premium</p>
              </div>

              <div className="space-y-1">
                <span className="text-xl sm:text-2xl font-black text-blue-600 block">50+</span>
                <p className="text-xs text-slate-500 font-medium">Lavados garantizados</p>
              </div>

              <div className="space-y-1">
                <span className="text-xl sm:text-2xl font-black text-slate-900 block">100%</span>
                <p className="text-xs text-slate-500 font-medium">Tintas ecológicas al agua</p>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-slate-100 shadow-lg group">
              <img
                src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80"
                alt="Camiseta Estampada de Autor"
                className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Floating Overlay Badge */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-md flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    <span className="text-xs font-bold text-slate-900">Drop de la Semana</span>
                  </div>
                  <p className="text-sm font-black text-slate-900 mt-0.5">
                    Camiseta Cyber Samurai 240g
                  </p>
                  <p className="text-xs text-slate-500">Por NeoTokyo Arts</p>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400 block font-medium">Desde</span>
                  <span className="text-base font-black text-blue-600">$85.000 COP</span>
                </div>
              </div>

              {/* Verified Tag */}
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black text-white text-xs font-bold shadow flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Serigrafía Directa</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
