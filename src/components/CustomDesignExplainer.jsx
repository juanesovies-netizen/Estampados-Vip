import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Palette, CheckCircle2, Shirt, ArrowRight, MessageSquareText } from 'lucide-react';

export default function CustomDesignExplainer() {
  const { openCustomModal, creators } = useApp();

  return (
    <section id="custom-info-section" className="py-16 border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                Servicio a Medida para Compradores
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white font-['Space_Grotesk'] leading-tight">
                ¿Tienes una idea en mente? <br />
                <span className="text-blue-400">Pide un diseño 100% personalizado</span>
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                Nuestros diseñadores independientes aceptan encargos directos. Ya sea una camiseta para tu marca, una ilustración con tu anime o banda favorita, o una variante exclusiva de un estampado ya existente.
              </p>

              {/* 3 Step Workflow */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3">
                <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700 space-y-1.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <h4 className="text-xs font-bold text-white">Describe tu idea</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Elige el artista, el tipo de prenda y tu presupuesto estimado.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700 space-y-1.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <h4 className="text-xs font-bold text-white">Aprueba el boceto</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    El diseñador te envía un preview digital y ajustan detalles juntos.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700 space-y-1.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                    3
                  </div>
                  <h4 className="text-xs font-bold text-white">Estampado & Envío</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Impresión serigráfica de alta densidad y despacho a tu puerta.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => openCustomModal(creators[0])}
                  className="py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow transition inline-flex items-center gap-2"
                >
                  <Palette className="w-4 h-4" />
                  <span>Empezar Proyecto Personalizado</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Card Illustration / Showcase */}
            <div className="lg:col-span-5 bg-slate-800/80 rounded-2xl p-6 border border-slate-700 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                <div className="flex items-center gap-2">
                  <Shirt className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-bold text-white">Garantías VIP de Estampado</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-900/40 px-2 py-0.5 rounded border border-blue-500/30">
                  Calidad Pro
                </span>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span><strong>Serigrafía artesanal tacto cero:</strong> Tinta absorbida directamente en la fibra de algodón.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span><strong>DTG Direct-to-Garment Ultra HD:</strong> Colores intensos y degradados fotográficos impecables.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span><strong>Algodón peinado 240g/m²:</strong> Tejido pesado con caída estructurada tipo streetwear contemporáneo.</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
