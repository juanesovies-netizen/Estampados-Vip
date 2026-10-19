import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Palette, CheckCircle2, Shirt, ArrowRight, MessageSquareText } from 'lucide-react';

export default function CustomDesignExplainer() {
  const { openCustomModal, creators, customRequests } = useApp();

  return (
    <section id="custom-info-section" className="py-16 border-t border-slate-800/80 bg-gradient-to-b from-[#0b0d13] to-[#0e121b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-3xl bg-gradient-to-br from-slate-900/90 via-[#121622] to-slate-900/90 border border-slate-800 p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          {/* Subtle Ambient Light */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                Servicio a Medida para Compradores
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white font-['Space_Grotesk'] leading-tight">
                ¿Tienes una idea en mente? <br />
                <span className="text-amber-400">Pide un diseño 100% personalizado</span>
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                Nuestros diseñadores independientes aceptan encargos directos. Ya sea una camiseta para tu marca, una ilustración con tu anime o mascota favorita, o una variante exclusiva de un estampado ya existente.
              </p>

              {/* 3 Step Workflow */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3">
                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-400/15 text-amber-400 flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <h4 className="text-xs font-bold text-white">Describe tu idea</h4>
                  <p className="text-[11px] text-slate-400">
                    Elige el artista, el tipo de prenda y tu presupuesto estimado.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-400/15 text-amber-400 flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <h4 className="text-xs font-bold text-white">Aprueba el boceto</h4>
                  <p className="text-[11px] text-slate-400">
                    El diseñador te envía un preview digital y ajustan detalles juntos.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-400/15 text-amber-400 flex items-center justify-center font-bold text-xs">
                    3
                  </div>
                  <h4 className="text-xs font-bold text-white">Estampado & Envío</h4>
                  <p className="text-[11px] text-slate-400">
                    Impresión DTG textil HD en algodón pesado directo a tu puerta.
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <button
                  onClick={() => openCustomModal(creators[0])}
                  className="py-3 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs transition shadow-lg shadow-amber-500/20 inline-flex items-center gap-2"
                >
                  <MessageSquareText className="w-4 h-4" />
                  Iniciar Solicitud de Diseño Personalizado
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right: Live Request Counter Box */}
            <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Palette className="w-4 h-4 text-amber-400" />
                  Solicitudes en Proceso ({customRequests.length})
                </span>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-semibold">
                  Activas hoy
                </span>
              </div>

              {customRequests.slice(0, 2).map((req) => (
                <div key={req.id} className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">{req.buyerName}</span>
                    <span className="text-[10px] text-slate-400">Artista: {req.creatorName}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 line-clamp-2 italic">
                    "{req.description}"
                  </p>
                  <div className="flex items-center justify-between pt-1 text-[10px]">
                    <span className="text-amber-400 font-medium">{req.projectType}</span>
                    <span className="text-slate-400">{req.budget}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
