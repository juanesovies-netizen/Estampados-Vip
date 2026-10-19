import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShoppingBag, 
  Palette, 
  User, 
  Layers, 
  LogOut, 
  ChevronDown, 
  Sparkles,
  ShieldCheck,
  PlusCircle,
  Shirt
} from 'lucide-react';

export default function Navbar({ onNavigateSection }) {
  const { 
    user, 
    cartCount, 
    setIsCartOpen, 
    loginAs, 
    logout, 
    navigateTo,
    activeView
  } = useApp();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200">
      
      {/* Top Banner Ticker */}
      <div className="bg-slate-950 text-white text-[11px] font-semibold py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-3 overflow-hidden">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          Prendas Estampadas de Autor & Colecciones Exclusivas
        </span>
        <span className="hidden md:inline text-slate-600">•</span>
        <span className="hidden md:inline flex items-center gap-1 text-slate-300">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
          Algodón Pesado 240g/m² & Serigrafía de Alta Definición
        </span>
        <span className="hidden lg:inline text-slate-600">•</span>
        <span className="hidden lg:inline text-blue-400 font-bold">
          Envíos a todo el país & Encargos directos a ilustradores
        </span>
      </div>

      {/* Main Navbar Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand / Logo */}
        <div 
          onClick={() => navigateTo('store')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm group-hover:bg-blue-700 transition">
            <Shirt className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-slate-900 font-['Space_Grotesk']">
                TIENDA<span className="text-blue-600">VIP</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                DROPS
              </span>
            </div>
            <span className="text-[11px] text-slate-500 tracking-wide font-medium">
              Ropa Estampada & Arte Textil
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-700">
          <button 
            onClick={() => {
              if (activeView !== 'store') navigateTo('store');
              setTimeout(() => onNavigateSection('catalog'), 50);
            }} 
            className="hover:text-blue-600 transition flex items-center gap-1.5"
          >
            <Layers className="w-4 h-4 text-slate-400" />
            <span>Catálogo</span>
          </button>

          <button 
            onClick={() => {
              if (activeView !== 'store') navigateTo('store');
              setTimeout(() => onNavigateSection('creators'), 50);
            }} 
            className="hover:text-blue-600 transition flex items-center gap-1.5"
          >
            <Palette className="w-4 h-4 text-slate-400" />
            <span>Diseñadores</span>
          </button>

          <button 
            onClick={() => {
              if (activeView !== 'store') navigateTo('store');
              setTimeout(() => onNavigateSection('custom-info'), 50);
            }} 
            className="hover:text-blue-600 transition flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Pedidos a Medida</span>
          </button>
        </nav>

        {/* Action Controls: User Profile & Cart */}
        <div className="flex items-center gap-3">
          
          {/* User Profile Access */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 transition text-left"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-lg object-cover border border-blue-500 shrink-0"
                />
                <div className="hidden sm:flex flex-col min-w-0">
                  <span className="text-xs font-bold text-slate-900 truncate max-w-[130px]">
                    {user.name}
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    user.role === 'seller' ? 'text-blue-600' : 'text-slate-700'
                  }`}>
                    {user.role === 'seller' ? 'Diseñador' : 'Comprador'}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 hidden sm:inline" />
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div 
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                  className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 text-xs space-y-1 animate-fade-in"
                >
                  <div className="p-3 border-b border-slate-100 bg-slate-50 rounded-xl mb-1">
                    <p className="font-bold text-slate-900 truncate">{user.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    <span className={`inline-block mt-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      user.role === 'seller' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-slate-200 text-slate-800'
                    }`}>
                      {user.role === 'seller' ? 'Perfil Diseñador VIP' : 'Perfil Comprador VIP'}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      navigateTo('profile');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left py-2 px-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 font-bold flex items-center gap-2 transition"
                  >
                    <User className="w-4 h-4 text-blue-600" />
                    <span>Ver Mi Perfil ({user.role === 'seller' ? 'Diseñador' : 'Comprador'})</span>
                  </button>

                  <button
                    onClick={() => {
                      navigateTo('store');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-100 font-semibold flex items-center gap-2 transition text-slate-700"
                  >
                    <Shirt className="w-4 h-4 text-slate-500" />
                    <span>Ir a la Tienda de Ropa</span>
                  </button>

                  <div className="border-t border-slate-100 my-1 pt-1">
                    <button
                      onClick={() => {
                        loginAs(user.role === 'seller' ? 'buyer' : 'seller');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-100 font-semibold flex items-center gap-2 transition text-slate-700"
                    >
                      <Palette className="w-4 h-4 text-blue-600" />
                      <span>Cambiar a {user.role === 'seller' ? 'Comprador' : 'Diseñador'}</span>
                    </button>

                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left py-2 px-3 rounded-lg hover:bg-red-50 text-red-600 font-semibold flex items-center gap-2 transition"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Cerrar Sesión</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigateTo('login')}
              className="py-2.5 px-4 rounded-xl bg-black hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 transition shadow-sm"
            >
              <User className="w-4 h-4" />
              <span>Iniciar Sesión</span>
            </button>
          )}

          {/* Cart Drawer Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition flex items-center justify-center shadow-sm"
            title="Ver carrito de compras"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-black text-white text-[11px] font-black rounded-full flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>

        </div>

      </div>

    </header>
  );
}
