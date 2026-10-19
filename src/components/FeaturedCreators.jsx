import React from 'react';
import { useApp } from '../context/AppContext';
import { Palette, Star, MessageSquarePlus, Clock, ShieldCheck, Flame } from 'lucide-react';

export default function FeaturedCreators({ onSelectCreatorFilter }) {
  const { creators, openCustomModal } = useApp();

  return (
    <section id="creators-section" className="py-14 border-t border-slate-800/80 bg-[#0d1017]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20 text-xs font-semibold mb-2">
              <Palette className="w-3.5 h-3.5" />
              Comunidad de Creadores Oficiales
            </div>
            <h2 className="text-3xl font-black text-white font-['Space_Grotesk']">
              Diseñadores & Vendedores Destacados
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Cada prenda apoya directamente a ilustradores independientes. Conéctate con ellos para encargar modificaciones o arte nuevo para tu ropa.
            </p>
          </div>
        </div>

        {/* Creators Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {creators.map((creator) => (
            <div
              key={creator.id}
              className="rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-400/40 p-5 transition flex flex-col justify-between group shadow-lg hover:shadow-amber-500/5"
            >
              <div>
                {/* Header: Avatar, Name, Handle */}
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="relative">
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-13 h-13 rounded-2xl object-cover ring-2 ring-amber-400/50 group-hover:scale-105 transition-transform"
                    />
                    {creator.verified && (
                      <span className="absolute -bottom-1 -right-1 bg-amber-400 text-black p-0.5 rounded-full" title="Artista Verificado">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-white truncate">
                      {creator.name}
                    </h3>
                    <p className="text-xs text-amber-400/90 font-medium">
                      {creator.handle}
                    </p>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="font-semibold text-slate-200">{creator.rating}</span>
                      <span>• {creator.salesCount} ventas</span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 mb-3">
                  {creator.bio}
                </p>

                {/* Response Time Pill */}
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-4 bg-slate-950 p-2 rounded-xl border border-slate-800/80">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Respuesta rápida: <strong>{creator.responseTime}</strong></span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2 border-t border-slate-800/60">
                <button
                  onClick={() => openCustomModal(creator)}
                  className="w-full py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs transition flex items-center justify-center gap-1.5 shadow"
                >
                  <MessageSquarePlus className="w-3.5 h-3.5" />
                  Pedir Diseño Personalizado
                </button>

                <button
                  onClick={() => onSelectCreatorFilter(creator.name)}
                  className="w-full py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition text-center"
                >
                  Ver sus estampados
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
