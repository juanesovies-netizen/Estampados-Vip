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
  Store, 
  ShieldCheck, 
  CheckCircle2 
} from 'lucide-react';

export default function AuthModal() {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authDefaultRole, 
    loginAs, 
    loginCustom 
  } = useApp();

  if (!isAuthModalOpen) return null;

  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const [selectedRole, setSelectedRole] = useState(authDefaultRole || 'buyer'); // 'buyer' | 'seller'

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [storeName, setStoreName] = useState('');

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    loginCustom({
      id: `usr-${Date.now()}`,
      name: name || (selectedRole === 'seller' ? storeName || 'Estudio VIP' : 'Cliente VIP'),
      email: email,
      role: selectedRole,
      storeName: selectedRole === 'seller' ? (storeName || 'Mi Tienda VIP') : undefined,
      avatar: selectedRole === 'seller' 
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
        : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      ordersCount: 0,
      customRequestsCount: 0,
      activeDesigns: selectedRole === 'seller' ? 1 : 0
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-md bg-[#10131d] border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Brand Title */}
        <div className="text-center space-y-1 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/30 text-[11px] font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            Acceso a la Plataforma VIP
          </div>
          <h3 className="text-2xl font-black text-white font-['Space_Grotesk']">
            {activeTab === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </h3>
          <p className="text-xs text-slate-400">
            Conecta con los mejores artistas de ropa estampada
          </p>
        </div>

        {/* Quick Demo Section (Highlighted for client review) */}
        <div className="mb-6 p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-slate-900 to-slate-900 border border-amber-500/30 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1">
              ⚡ Acceso Rápido para Demostración
            </span>
            <span className="text-[10px] text-slate-400">1-Clic</span>
          </div>
          <p className="text-[11px] text-slate-300">
            Prueba de inmediato la plataforma alternando los dos roles:
          </p>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => loginAs('buyer')}
              className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition hover:text-white"
            >
              <User className="w-3.5 h-3.5 text-emerald-400" />
              <span>Rol Comprador</span>
            </button>
            <button
              onClick={() => loginAs('seller')}
              className="py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold flex items-center justify-center gap-1.5 transition shadow"
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Rol Vendedor</span>
            </button>
          </div>
        </div>

        {/* Role Selector Tabs */}
        <div className="space-y-1.5 mb-5">
          <label className="text-xs font-semibold text-slate-400">
            Selecciona tu Rol:
          </label>
          <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-slate-900 border border-slate-800">
            <button
              type="button"
              onClick={() => setSelectedRole('buyer')}
              className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition ${
                selectedRole === 'buyer'
                  ? 'bg-amber-400 text-black shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              Comprador
            </button>

            <button
              type="button"
              onClick={() => setSelectedRole('seller')}
              className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition ${
                selectedRole === 'seller'
                  ? 'bg-amber-400 text-black shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              Vendedor / Creador
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleCustomSubmit} className="space-y-3.5 text-xs">
          
          {activeTab === 'register' && (
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                {selectedRole === 'seller' ? 'Nombre del Diseñador / Artista' : 'Tu Nombre Completo'}
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={selectedRole === 'seller' ? 'Ej. Mateo Ruiz' : 'Ej. Camila Gómez'}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          )}

          {activeTab === 'register' && selectedRole === 'seller' && (
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Nombre de tu Marca o Estudio de Estampados
              </label>
              <div className="relative">
                <Store className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  placeholder="Ej. CyberVibes Apparel"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Correo Electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@correo.com"
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 mt-2"
          >
            <span>
              {activeTab === 'login' 
                ? (selectedRole === 'seller' ? 'Entrar a mi Panel de Vendedor' : 'Entrar a Comprar')
                : 'Registrar Cuenta VIP'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Tab Toggle Footer */}
        <div className="mt-5 pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
          {activeTab === 'login' ? (
            <p>
              ¿No tienes cuenta aún?{' '}
              <button
                type="button"
                onClick={() => setActiveTab('register')}
                className="text-amber-400 font-bold hover:underline"
              >
                Regístrate gratis
              </button>
            </p>
          ) : (
            <p>
              ¿Ya tienes cuenta registrada?{' '}
              <button
                type="button"
                onClick={() => setActiveTab('login')}
                className="text-amber-400 font-bold hover:underline"
              >
                Inicia sesión aquí
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
