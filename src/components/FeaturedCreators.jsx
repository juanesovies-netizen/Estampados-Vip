import React from 'react';
import { useApp } from '../context/AppContext';
import { Palette, Star, MessageSquarePlus, Clock, ShieldCheck, Shirt } from 'lucide-react';

export default function FeaturedCreators({ onSelectCreatorFilter }) {
  const { creators, openCustomModal } = useApp();

  return (
    <section id="creators-section" className="py-14 border-t border-slate-200 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold mb-2">
              <Palette className="w-3.5 h-3.5 text-blue-600" />
              Comunidad de Creadores Oficiales
            </div>
            <h2 className="text-3xl font-black text-slate-900 font-['Space_Grotesk']">
              Diseñadores & Creadores Destacados
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Cada prenda apoya directamente a ilustradores independientes. Conéctate con ellos para encargar modificaciones o arte nuevo para tu ropa.
            </p>
          </div>
        </div>

        {/* Creators Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {creators.map((creator) => (
            <div
              key={creator.id}
              className="rounded-2xl bg-white border border-slate-200 hover:border-blue-600 p-5 transition flex flex-col justify-between group shadow-sm hover:shadow"
            >
              <div>
                {/* Header: Avatar, Name, Handle */}
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="relative">
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-13 h-13 rounded-2xl object-cover border-2 border-slate-200 group-hover:border-blue-600 transition"
                    />
                    {creator.verified && (
                      <span className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-0.5 rounded-full" title="Artista Verificado">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-slate-900 truncate">
                      {creator.name}
                    </h3>
                    <p className="text-xs text-blue-600 font-semibold truncate">
                      {creator.handle}
                    </p>
                    <div className="flex items-center gap-1 text-[11px] text-slate-600 mt-0.5">
                      <Star className="w-3 h-3 text-blue-600 fill-blue-600" />
                      <span className="font-bold text-slate-900">{creator.rating}</span>
                      <span className="text-slate-400">({creator.salesCount} ventas)</span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                  {creator.bio}
                </p>

                {/* Response speed badge */}
                <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-4 bg-slate-50 p-2 rounded-xl border border-slate-100">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  <span>Respuesta rápida: <strong>{creator.responseTime}</strong></span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => openCustomModal(creator)}
                  className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <MessageSquarePlus className="w-3.5 h-3.5" />
                  <span>Solicitar Encargo</span>
                </button>

                <button
                  onClick={() => onSelectCreatorFilter(creator.name)}
                  className="w-full py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition flex items-center justify-center gap-1"
                >
                  <Shirt className="w-3.5 h-3.5 text-slate-500" />
                  <span>Ver sus prendas</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
