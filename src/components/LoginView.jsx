import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Palette, 
  ShoppingBag, 
  ArrowLeft, 
  Mail, 
  Lock, 
  User, 
  Store, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function LoginView() {
  const { loginAs, loginCustom, navigateTo } = useApp();

  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const [selectedRole, setSelectedRole] = useState('buyer'); // 'buyer' | 'seller'

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [storeName, setStoreName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    loginCustom({
      id: `usr-${Date.now()}`,
      name: name || (selectedRole === 'seller' ? storeName || 'Estudio de Diseño' : 'Comprador VIP'),
      email: email,
      role: selectedRole,
      storeName: selectedRole === 'seller' ? (storeName || 'Estudio de Estampado') : undefined,
      avatar: selectedRole === 'seller'
        ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      ordersCount: 0,
      customRequestsCount: 0,
      activeDesigns: selectedRole === 'seller' ? 1 : 0
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Top Back Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigateTo('store')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Catálogo de Ropa Estampada
          </button>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            <span className="text-xs font-bold tracking-wider uppercase text-blue-700">
              Plataforma TiendaVIP
            </span>
          </div>
        </div>

        {/* Header Info */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-blue-600" />
            Portal de Autenticación & Perfiles
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-['Space_Grotesk'] tracking-tight">
            Acceso a tu Cuenta VIP
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Elige el tipo de perfil con el que deseas interactuar: publica tus diseños de autor o adquiere prendas estampadas exclusivas.
          </p>
        </div>

        {/* 2 Main Role Profiles Entry Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          {/* Card Perfil Diseñador */}
          <div className="bg-white border-2 border-slate-200 hover:border-blue-600 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-md group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
                  <Palette className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                  Perfil Creador
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Perfil de Diseñador
                </h3>
                <p className="text-xs text-blue-600 font-semibold mt-0.5">
                  Artistas, Ilustradores y Marcas Independientes
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Publica tus propias colecciones de ropa estampada (camisetas, hoodies, tote bags), administra tu catálogo, gestiona pedidos y recibe encargos personalizados de clientes.
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>Publicación de nuevos estampados y precios</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>Métricas de ventas e ingresos en tiempo real</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>Bandeja de encargos a medida de clientes</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => loginAs('seller')}
                className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Acceder como Diseñador</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-center text-slate-400 mt-2 font-medium">
                Demostración con cuenta precargada de NeoTokyo Arts
              </p>
            </div>
          </div>

          {/* Card Perfil Comprador */}
          <div className="bg-white border-2 border-slate-200 hover:border-black rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-md group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center shadow-sm">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 border border-slate-200">
                  Perfil Cliente
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Perfil de Comprador
                </h3>
                <p className="text-xs text-slate-700 font-semibold mt-0.5">
                  Coleccionistas y Amantes de la Moda Gráfica
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Descubre diseños únicos de autor en prendas de algodón premium, haz seguimiento en vivo de tus pedidos de estampado y solicita prendas personalizadas directamente a diseñadores.
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-black" />
                  <span>Historial de pedidos y tracking de envíos</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-black" />
                  <span>Guardar prendas estampadas en favoritos</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-black" />
                  <span>Solicitar prendas personalizadas a medida</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => loginAs('buyer')}
                className="w-full py-3.5 px-4 rounded-xl bg-black hover:bg-slate-800 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Acceder como Comprador</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-center text-slate-400 mt-2 font-medium">
                Demostración con cuenta precargada de Sofía Morales
              </p>
            </div>
          </div>

        </div>

        {/* Traditional Credentials Form Section */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 max-w-xl mx-auto shadow-sm">
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-slate-900">
              O ingresa con tus credenciales
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Selecciona tu tipo de cuenta para continuar
            </p>

            {/* Role Switcher Pill */}
            <div className="flex p-1 bg-slate-100 rounded-xl max-w-xs mx-auto mt-4 border border-slate-200">
              <button
                type="button"
                onClick={() => setSelectedRole('buyer')}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  selectedRole === 'buyer'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                Comprador
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('seller')}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  selectedRole === 'seller'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                Diseñador
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === 'register' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  {selectedRole === 'seller' ? 'Nombre Artístico / Marca' : 'Nombre Completo'}
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={selectedRole === 'seller' ? storeName : name}
                    onChange={(e) =>
                      selectedRole === 'seller'
                        ? setStoreName(e.target.value)
                        : setName(e.target.value)
                    }
                    placeholder={
                      selectedRole === 'seller'
                        ? 'Ej. NeoTokyo Studio'
                        : 'Ej. Juan Pérez'
                    }
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-3 px-4 rounded-xl text-white font-bold text-sm transition-colors shadow-sm mt-2 ${
                selectedRole === 'seller'
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-black hover:bg-slate-800'
              }`}
            >
              {activeTab === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </button>
          </form>

          <div className="text-center pt-4 border-t border-slate-100 mt-5">
            <button
              type="button"
              onClick={() => setActiveTab(activeTab === 'login' ? 'register' : 'login')}
              className="text-xs text-slate-600 hover:text-blue-600 font-semibold transition"
            >
              {activeTab === 'login'
                ? '¿No tienes cuenta aún? Regístrate aquí'
                : '¿Ya tienes una cuenta registrada? Inicia sesión aquí'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
