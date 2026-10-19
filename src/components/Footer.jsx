import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Sparkles, Heart, Shirt } from 'lucide-react';

export default function Footer() {
  const { loginAs, user, navigateTo } = useApp();

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Shirt className="w-4 h-4" />
              </div>
              <span className="text-lg font-black tracking-tight text-white font-['Space_Grotesk']">
                TIENDA<span className="text-blue-500">VIP</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Plataforma de moda gráfica donde convergen ilustradores independientes y amantes de las prendas estampadas de autor.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-blue-400">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Garantía de estampado de 50 lavados</span>
            </div>
          </div>

          {/* Buyers Column */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Para Compradores
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => {
                    navigateTo('store');
                    document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-blue-400 transition"
                >
                  Catálogo de Ropa Estampada
                </button>
              </li>
              <li>
                <button
                  onClick={() => loginAs('buyer')}
                  className="hover:text-blue-400 transition"
                >
                  Mi Perfil de Comprador
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigateTo('store');
                    document.getElementById('custom-info-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-blue-400 transition"
                >
                  Solicitar Prenda a Medida
                </button>
              </li>
              <li><span className="text-slate-500">Envíos a todo el país</span></li>
            </ul>
          </div>

          {/* Creators / Sellers Column */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Para Diseñadores
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button 
                  onClick={() => loginAs('seller')} 
                  className="hover:text-blue-400 transition text-left"
                >
                  Acceder a Perfil Diseñador
                </button>
              </li>
              <li>
                <button 
                  onClick={() => loginAs('seller')} 
                  className="hover:text-blue-400 transition text-left"
                >
                  Publicar Nuevos Estampados
                </button>
              </li>
              <li><span className="text-slate-500">Comisiones y Pagos Directos</span></li>
              <li><span className="text-slate-500">Guía de Serigrafía & DTG</span></li>
            </ul>
          </div>

          {/* Direct Access Column */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Portal de Acceso
            </h4>
            <p className="text-[11px] text-slate-400">
              Inicia sesión o regístrate para acceder a tu perfil personalizado.
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={() => navigateTo('login')}
                className="py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition text-center shadow-sm"
              >
                Ir a Iniciar Sesión
              </button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 mt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
          <p>© 2026 TiendaVIP Drops. Moda gráfica de autor con serigrafía de alta densidad.</p>
          <div className="flex items-center gap-4 text-xs">
            <span>Términos y Condiciones</span>
            <span>•</span>
            <span>Privacidad de Datos</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
