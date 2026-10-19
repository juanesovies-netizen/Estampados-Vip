import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  User, 
  Palette, 
  Lock, 
  Mail, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2 
} from 'lucide-react';

export default function AuthModal() {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authDefaultRole, 
    loginAs, 
    loginCustom,
    navigateTo 
  } = useApp();

  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const [selectedRole, setSelectedRole] = useState(authDefaultRole || 'buyer'); // 'buyer' | 'seller'

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [storeName, setStoreName] = useState('');

  if (!isAuthModalOpen) return null;

  const handleCustomSubmit = (e) => {
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-md bg-white border border-slate-200 text-slate-900 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 border border-slate-200 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Brand Title */}
        <div className="text-center space-y-1 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Acceso Rápido a TiendaVIP
          </div>
          <h3 className="text-2xl font-black text-slate-900 font-['Space_Grotesk']">
            {activeTab === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </h3>
          <p className="text-xs text-slate-500">
            Conecta con los mejores artistas de ropa estampada
          </p>
        </div>

        {/* Quick Demo Section (1-Click) */}
        <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
              ⚡ Acceso de Demostración Inmediato
            </span>
            <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">1-Clic</span>
          </div>
          <p className="text-xs text-slate-600">
            Prueba de inmediato alternando entre ambos perfiles:
          </p>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => loginAs('buyer')}
              className="py-2.5 px-3 rounded-xl bg-black hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-sm"
            >
              <User className="w-3.5 h-3.5 text-blue-400" />
              <span>Rol Comprador</span>
            </button>
            <button
              onClick={() => loginAs('seller')}
              className="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-sm"
            >
              <Palette className="w-3.5 h-3.5 text-white" />
              <span>Rol Diseñador</span>
            </button>
          </div>
        </div>

        {/* Role Selector Pill */}
        <div className="flex p-1 bg-slate-100 rounded-xl mb-4 border border-slate-200">
          <button
            type="button"
            onClick={() => setSelectedRole('buyer')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 ${
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
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 ${
              selectedRole === 'seller'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            Diseñador
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleCustomSubmit} className="space-y-3">
          {activeTab === 'register' && (
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                {selectedRole === 'seller' ? 'Nombre de tu Estudio / Marca' : 'Nombre Completo'}
              </label>
              <input
                type="text"
                required
                value={selectedRole === 'seller' ? storeName : name}
                onChange={(e) => selectedRole === 'seller' ? setStoreName(e.target.value) : setName(e.target.value)}
                placeholder={selectedRole === 'seller' ? 'Ej. NeoTokyo Arts' : 'Ej. Sofía Morales'}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600"
              />
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition shadow-sm mt-1"
          >
            {activeTab === 'login' ? 'Acceder al Perfil' : 'Crear Cuenta VIP'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setActiveTab(activeTab === 'login' ? 'register' : 'login')}
            className="text-xs text-slate-500 hover:text-blue-600 font-semibold"
          >
            {activeTab === 'login' ? '¿No tienes cuenta? Regístrate gratis' : '¿Ya tienes cuenta? Inicia sesión'}
          </button>
        </div>

      </div>
    </div>
  );
}
