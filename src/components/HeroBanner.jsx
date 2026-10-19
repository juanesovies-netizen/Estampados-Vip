import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ArrowRight, Palette, ShieldCheck, Shirt, Star } from 'lucide-react';

export default function HeroBanner({ onExploreClick, onRequestCustomClick }) {
  const { user, setIsSellerDashboardOpen, setIsAuthModalOpen, setAuthDefaultRole } = useApp();

  return (
    <section className="relative overflow-hidden py-14 lg:py-20 border-b border-slate-800/60 bg-gradient-to-b from-[#0e121b] via-[#0b0d13] to-[#0b0d13]">
      {/* Background Decorative Glows - Minimalist & Warm */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-slate-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-semibold tracking-wide">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Estampados de Autor & Estética Minimalista</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-white tracking-tight leading-[1.1] font-['Space_Grotesk']">
              Prendas de autor con <br />
              <span className="bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 bg-clip-text text-transparent">
                diseños minimalistas
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
              Explora estampados en trazo continuo, tipografía suiza y arte botánico, o <strong className="text-white font-semibold">contacta directamente a un diseñador</strong> para estampar tu propia idea personalizada en camisetas, hoodies o tote bags.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreClick}
                className="px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Shirt className="w-4 h-4" />
                Explorar Colección Minimal
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onRequestCustomClick}
                className="px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-amber-400/40 transition-all flex items-center gap-2"
              >
                <Palette className="w-4 h-4 text-amber-400" />
                Pedir Diseño a Medida
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80 max-w-lg">
              <div>
                <p className="text-xl sm:text-2xl font-black text-white font-['Space_Grotesk']">+1,200</p>
                <p className="text-xs text-slate-400 font-medium">Diseños listos</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-white font-['Space_Grotesk']">100%</p>
                <p className="text-xs text-slate-400 font-medium">Algodón pesado 240g</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-amber-400 font-['Space_Grotesk'] flex items-center gap-1">
                  4.9 <Star className="w-4 h-4 fill-amber-400 inline" />
                </p>
                <p className="text-xs text-slate-400 font-medium">Calificación clientes</p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase Mockup Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md rounded-3xl p-1 bg-gradient-to-b from-amber-500/40 via-slate-800 to-slate-900/50 shadow-2xl shadow-amber-500/10">
              <div className="rounded-[22px] bg-[#11141c] overflow-hidden p-5 space-y-4">
                
                {/* Image Mockup Showcase */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-950 group">
                  <img
                    src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80"
                    alt="Mockup minimalista de camiseta estampada"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-amber-300 border border-amber-400/30 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    Drop Minimalista de la Semana
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold text-white border border-slate-700">
                    Desde <span className="text-amber-400 text-sm font-['Space_Grotesk']">$ 79.000 COP</span>
                  </div>
                </div>

                {/* Creator and Product Highlight Box */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                      alt="Studio Kanso"
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-400"
                    />
                    <div>
                      <p className="text-xs font-bold text-white">Studio Kanso (Zen & Line)</p>
                      <p className="text-[11px] text-amber-400/90 font-medium">Diseñador Verificado VIP</p>
                    </div>
                  </div>

                  <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                    Tacto Cero al Agua
                  </span>
                </div>

                {/* Micro Action Pill */}
                <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl flex items-center justify-between text-xs">
                  <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Disponible en Camiseta y Hoodie
                  </span>
                  <span className="text-amber-400 font-semibold cursor-pointer hover:underline" onClick={onExploreClick}>
                    Ver catálogo →
                  </span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
