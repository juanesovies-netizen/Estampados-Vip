import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShoppingBag, 
  Sparkles, 
  User, 
  Palette, 
  PlusCircle, 
  LogOut, 
  ChevronDown, 
  Layers, 
  MessageSquareText,
  ShieldCheck,
  Flame
} from 'lucide-react';

export default function Navbar({ onNavigateSection }) {
  const { 
    user, 
    cartCount, 
    setIsCartOpen, 
    setIsAuthModalOpen, 
    setAuthDefaultRole,
    loginAs,
    logout,
    setIsSellerDashboardOpen,
    customRequests
  } = useApp();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0b0d13]/90 backdrop-blur-md border-b border-slate-800/80">
      {/* Top Banner Ticker */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-black text-xs font-semibold py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-4 overflow-hidden">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          Marketplace VIP de Estampados de Autor & Diseños Exclusivos
        </span>
        <span className="hidden md:inline">•</span>
        <span className="hidden md:inline flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          Algodón 240g/m² & Estampado DTG de Máxima Durabilidad
        </span>
        <span className="hidden lg:inline">•</span>
        <span className="hidden lg:inline font-bold">
          ⚡ Conecta directo con artistas y solicita prendas personalizadas
        </span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Flame className="w-6 h-6 text-black" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight text-white font-['Space_Grotesk']">
                VIP<span className="text-amber-400">WEAR</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/30">
                PRO
              </span>
            </div>
            <span className="text-[11px] text-slate-400 tracking-wide font-medium">
              Custom Prints & Creator Drops
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <button 
            onClick={() => onNavigateSection('catalog')} 
            className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
          >
            <Layers className="w-4 h-4 text-slate-400" />
            Catálogo de Estampados
          </button>

          <button 
            onClick={() => onNavigateSection('creators')} 
            className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
          >
            <Palette className="w-4 h-4 text-slate-400" />
            Diseñadores VIP
          </button>

          <button 
            onClick={() => onNavigateSection('custom-info')} 
            className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            Pedidos Personalizados
          </button>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* Quick Demo Switcher (Perfect for client presentation) */}
          <div className="hidden xl:flex items-center gap-1.5 bg-slate-900 border border-slate-700/60 p-1 rounded-xl text-xs">
            <span className="text-slate-400 px-2 font-medium">Demo:</span>
            <button
              onClick={() => loginAs('buyer')}
              className={`px-2.5 py-1 rounded-lg transition font-medium ${
                user?.role === 'buyer'
                  ? 'bg-amber-400 text-black shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              🛍️ Comprador
            </button>
            <button
              onClick={() => loginAs('seller')}
              className={`px-2.5 py-1 rounded-lg transition font-medium ${
                user?.role === 'seller'
                  ? 'bg-amber-400 text-black shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              🎨 Vendedor
            </button>
          </div>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:border-slate-700 transition group flex items-center justify-center"
            title="Ver carrito de compras"
          >
            <ShoppingBag className="w-5 h-5 text-slate-300 group-hover:text-amber-400 transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Auth / Profile */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-left transition"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-lg object-cover ring-2 ring-amber-400/40"
                />
                <div className="hidden sm:block">
                  <div className="text-xs font-semibold text-white leading-tight flex items-center gap-1.5">
                    {user.name.split(' ')[0]}
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                        user.role === 'seller'
                          ? 'bg-purple-900/60 text-purple-300 border border-purple-500/30'
                          : 'bg-emerald-900/60 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {user.role === 'seller' ? 'Vendedor' : 'Comprador'}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 truncate max-w-[120px]">
                    {user.email}
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 rounded-2xl bg-slate-900/95 border border-slate-800 shadow-2xl p-2 z-50 backdrop-blur-xl"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <div className="p-3 border-b border-slate-800 mb-1">
                    <p className="text-xs font-semibold text-white">{user.name}</p>
                    <p className="text-xs text-slate-400">{user.email}</p>
                    <div className="mt-2 text-[11px] text-amber-300/90 font-medium">
                      {user.role === 'seller' ? (
                        <span>✨ Tienda activa: {user.storeName || 'Estudio Oficial'}</span>
                      ) : (
                        <span>✨ Pedidos realizados: {user.ordersCount || 0}</span>
                      )}
                    </div>
                  </div>

                  {user.role === 'seller' && (
                    <button
                      onClick={() => setIsSellerDashboardOpen(true)}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-amber-400 hover:bg-amber-400/10 rounded-xl transition"
                    >
                      <PlusCircle className="w-4 h-4 text-amber-400" />
                      Publicar nuevo diseño / Panel
                    </button>
                  )}

                  <button
                    onClick={() => onNavigateSection('custom-info')}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 rounded-xl transition"
                  >
                    <MessageSquareText className="w-4 h-4 text-slate-400" />
                    Solicitudes de Diseños ({customRequests.length})
                  </button>

                  <div className="my-1 border-t border-slate-800" />

                  <div className="px-3 py-2">
                    <div className="text-[11px] text-slate-400 mb-1.5 font-medium">Cambiar rol (Demo):</div>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          loginAs('buyer');
                          setIsUserMenuOpen(false);
                        }}
                        className={`text-[11px] py-1.5 px-2 rounded-lg font-medium border text-center transition ${
                          user.role === 'buyer'
                            ? 'bg-amber-400 text-black border-amber-400'
                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                        }`}
                      >
                        Comprador
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          loginAs('seller');
                          setIsUserMenuOpen(false);
                        }}
                        className={`text-[11px] py-1.5 px-2 rounded-lg font-medium border text-center transition ${
                          user.role === 'seller'
                            ? 'bg-amber-400 text-black border-amber-400'
                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                        }`}
                      >
                        Vendedor
                      </button>
                    </div>
                  </div>

                  <div className="my-1 border-t border-slate-800" />

                  <button
                    onClick={() => logout()}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-red-400 hover:bg-red-500/10 rounded-xl transition"
                  >
                    <LogOut className="w-4 h-4 text-red-400" />
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setAuthDefaultRole('buyer');
                  setIsAuthModalOpen(true);
                }}
                className="px-3.5 py-2 text-xs font-semibold text-slate-200 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl transition flex items-center gap-1.5"
              >
                <User className="w-4 h-4 text-slate-400" />
                Iniciar Sesión
              </button>
              <button
                onClick={() => {
                  setAuthDefaultRole('seller');
                  setIsAuthModalOpen(true);
                }}
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-black bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-md shadow-amber-500/20 transition transform hover:-translate-y-0.5"
              >
                <Palette className="w-4 h-4" />
                Vender Diseños
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
