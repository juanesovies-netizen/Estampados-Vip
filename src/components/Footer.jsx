import React from 'react';
import { useApp } from '../context/AppContext';
import { Flame, ShieldCheck, Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  const { loginAs, user } = useApp();

  return (
    <footer className="border-t border-slate-800 bg-[#08090f] text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center">
                <Flame className="w-4 h-4 text-black" />
              </div>
              <span className="text-lg font-black tracking-tight text-white font-['Space_Grotesk']">
                VIP<span className="text-amber-400">WEAR</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              La plataforma exclusiva de moda gráfica donde convergen artistas independientes y amantes de las prendas de autor.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-amber-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Garantía de estampado de 50 lavados</span>
            </div>
          </div>

          {/* Buyers Column */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Para Compradores
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li><a href="#catalog" className="hover:text-amber-400 transition">Catálogo de Estampados</a></li>
              <li><a href="#custom-info-section" className="hover:text-amber-400 transition">Solicitar Diseño a Medida</a></li>
              <li><span className="text-slate-500">Guía de Tallas Oversize</span></li>
              <li><span className="text-slate-500">Envíos y Devoluciones</span></li>
            </ul>
          </div>

          {/* Creators / Sellers Column */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Para Vendedores / Diseñadores
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button 
                  onClick={() => loginAs('seller')} 
                  className="hover:text-amber-400 transition text-left"
                >
                  Abrir Tienda VIP (Vender)
                </button>
              </li>
              <li><span className="text-slate-500">Comisiones y Pagos Directos</span></li>
              <li><span className="text-slate-500">Guía de Formatos para DTG</span></li>
              <li><span className="text-slate-500">Términos de Propiedad Intelectual</span></li>
            </ul>
          </div>

          {/* Demo Controls Callout */}
          <div className="space-y-3 p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Entregable Demo para Cliente
            </h4>
            <p className="text-[11px] text-slate-300">
              Alterna la vista activa entre los dos roles principales para evaluar la experiencia de usuario:
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => loginAs('buyer')}
                className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold border transition ${
                  user?.role === 'buyer'
                    ? 'bg-amber-400 text-black border-amber-400'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                }`}
              >
                Comprador
              </button>
              <button
                onClick={() => loginAs('seller')}
                className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold border transition ${
                  user?.role === 'seller'
                    ? 'bg-amber-400 text-black border-amber-400'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                }`}
              >
                Vendedor
              </button>
            </div>
          </div>

        </div>

        <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <p>© 2026 VIP WEAR. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            Diseñado con pasión para la moda gráfica independiente <Heart className="w-3 h-3 text-red-500 fill-red-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
