import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShoppingBag, 
  Heart, 
  MapPin, 
  Package, 
  Truck, 
  Clock, 
  ArrowLeft, 
  LogOut, 
  Palette, 
  Sparkles, 
  PlusCircle,
  ShieldCheck,
  Award
} from 'lucide-react';
import { formatCOP } from '../utils/formatCurrency';

export default function BuyerProfileView() {
  const { 
    user, 
    orders, 
    customRequests, 
    favorites, 
    products, 
    addToCart, 
    navigateTo, 
    loginAs, 
    logout, 
    openCustomModal,
    creators,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'requests' | 'wishlist' | 'shipping'

  // Dirección editable de demostración
  const [address, setAddress] = useState(user?.address || 'Carrera 15 # 93-45, Apto 402, Chicó Norte');
  const [city, setCity] = useState(user?.city || 'Bogotá D.C.');
  const [phone, setPhone] = useState(user?.phone || '+57 312 458 9210');

  // Prendas favoritas
  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  // Conteo total de prendas compradas
  const totalItemsPurchased = orders.reduce(
    (acc, ord) => acc + ord.items.reduce((sum, item) => sum + (item.quantity || 1), 0),
    0
  );

  const handleSaveShipping = (e) => {
    e.preventDefault();
    showToast('Dirección de entrega actualizada correctamente');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16">
      
      {/* Top Banner & Profile Header */}
      <div className="bg-black text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Navigation Bar inside profile */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800 text-xs">
            <button
              onClick={() => navigateTo('store')}
              className="inline-flex items-center gap-2 text-slate-300 hover:text-white font-semibold transition"
            >
              <ArrowLeft className="w-4 h-4 text-blue-400" />
              <span>Volver a la Tienda</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => loginAs('seller')}
                className="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition"
                title="Cambiar al rol de Diseñador"
              >
                <Palette className="w-3.5 h-3.5 text-blue-400" />
                <span>Cambiar a Perfil Diseñador</span>
              </button>

              <button
                onClick={logout}
                className="py-1.5 px-3 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-200 border border-red-800/50 text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>

          {/* Profile Identity Details */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                alt={user?.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-blue-500 shadow"
              />
              <span className="absolute -bottom-1 -right-1 bg-black border border-blue-400 text-blue-400 p-1 rounded-full shadow" title="Cliente VIP">
                <Sparkles className="w-4 h-4" />
              </span>
            </div>

            <div className="space-y-1 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-black text-white font-['Space_Grotesk']">
                  {user?.name || 'Sofía Morales'}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[11px] font-bold uppercase tracking-wide">
                  {user?.membershipTier || 'Cliente VIP Platino'}
                </span>
              </div>
              <p className="text-xs text-blue-400 font-semibold">
                {user?.email || 'sofia.morales@cliente.vip'} • Miembro desde 2026
              </p>
              <p className="text-xs text-slate-300 max-w-xl flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>{city} • {address}</span>
              </p>
            </div>

            <div className="pt-2 sm:pt-0">
              <button
                onClick={() => openCustomModal(creators[0])}
                className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Encargar Diseño a Medida</span>
              </button>
            </div>
          </div>

          {/* Buyer Summary Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-8">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Pedidos Realizados</span>
                <Package className="w-4 h-4 text-blue-400" />
              </div>
              <p className="text-lg sm:text-xl font-black text-white mt-1">
                {orders.length} pedidos
              </p>
              <span className="text-[10px] text-emerald-400 font-semibold">1 pedido activo</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Prendas en Mi Armario</span>
                <ShoppingBag className="w-4 h-4 text-blue-400" />
              </div>
              <p className="text-lg sm:text-xl font-black text-white mt-1">
                {totalItemsPurchased} prendas
              </p>
              <span className="text-[10px] text-slate-300 font-medium">Estampados exclusivos</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Encargos a Diseñadores</span>
                <Palette className="w-4 h-4 text-blue-400" />
              </div>
              <p className="text-lg sm:text-xl font-black text-white mt-1">
                {customRequests.length} proyectos
              </p>
              <span className="text-[10px] text-slate-300 font-medium">Cotizaciones directas</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Puntos VIP Acumulados</span>
                <Award className="w-4 h-4 text-blue-400" />
              </div>
              <p className="text-lg sm:text-xl font-black text-white mt-1">
                {user?.vipPoints || 480} pts
              </p>
              <span className="text-[10px] text-blue-400 font-medium">Equivale a $48.000 COP</span>
            </div>
          </div>

        </div>
      </div>

      {/* Main Profile Tabs and Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 gap-2 sm:gap-6 overflow-x-auto text-sm font-semibold">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 px-2 flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'orders'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Mis Pedidos de Ropa ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('requests')}
            className={`pb-3 px-2 flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'requests'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Mis Encargos Personalizados ({customRequests.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`pb-3 px-2 flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'wishlist'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Prendas Favoritas ({favoriteProducts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('shipping')}
            className={`pb-3 px-2 flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'shipping'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Dirección & Datos de Envío</span>
          </button>
        </div>

        {/* Tab 1: Mis Pedidos de Ropa Estampada */}
        {activeTab === 'orders' && (
          <div className="pt-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Historial de Compras de Ropa Estampada
                </h3>
                <p className="text-xs text-slate-500">
                  Revisa el estado de estampado, preparación y despacho de cada una de tus prendas.
                </p>
              </div>

              <button
                onClick={() => navigateTo('store')}
                className="py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center gap-1.5 self-start sm:self-auto shadow-sm"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Explorar Nuevos Diseños</span>
              </button>
            </div>

            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm space-y-4 p-5 sm:p-6"
                >
                  {/* Order Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-900 text-base">
                          Pedido {order.id}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">• {order.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Truck className="w-3.5 h-3.5 text-blue-600" />
                        <span>Transportadora: <strong className="text-slate-800">{order.carrier}</strong></span>
                        <span className="text-slate-300">|</span>
                        <span>Guía: <strong className="text-blue-600 font-mono">{order.trackingNumber}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-blue-600" />
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Order Items List */}
                  <div className="divide-y divide-slate-100">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="py-3 flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 rounded-xl object-cover border border-slate-200 bg-slate-100 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-slate-900 text-sm truncate">
                            {item.title}
                          </h4>
                          <p className="text-xs text-slate-500">
                            {item.garment} • Talla: <strong className="text-slate-800">{item.size}</strong> • Color: {item.color}
                          </p>
                          <span className="text-xs text-blue-600 font-semibold mt-0.5 block">
                            Cantidad: {item.quantity} ud.
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="font-black text-slate-900 text-sm">
                            {formatCOP(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer */}
                  <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-slate-600">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Garantía de estampado intacto por 50 lavados</span>
                    </div>

                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                      <span className="text-slate-500 font-medium">Total Pagado:</span>
                      <span className="text-base font-black text-slate-900">
                        {formatCOP(order.totalPrice)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Mis Encargos Personalizados */}
        {activeTab === 'requests' && (
          <div className="pt-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Tus Solicitudes de Personalización
                </h3>
                <p className="text-xs text-slate-500">
                  Proyectos a medida enviados a nuestros artistas para serigrafía o estampado exclusivo.
                </p>
              </div>

              <button
                onClick={() => openCustomModal(creators[0])}
                className="py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center gap-1.5 self-start sm:self-auto shadow-sm"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>+ Nuevo Encargo a Diseñador</span>
              </button>
            </div>

            <div className="space-y-4">
              {customRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">
                        Diseñador Asignado: <span className="text-blue-600">{req.creatorName}</span>
                      </h4>
                      <span className="text-xs text-slate-400">Solicitado: {req.createdAt}</span>
                    </div>

                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 self-start sm:self-auto">
                      {req.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 block font-medium">Prenda Base</span>
                      <span className="font-bold text-slate-800">{req.garment}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Presupuesto Estimado</span>
                      <span className="font-black text-slate-900">{req.budget}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Concepto</span>
                      <span className="font-semibold text-slate-800">{req.projectType}</span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                    <span className="font-bold block text-slate-800 mb-1">Tu Instrucción:</span>
                    {req.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Prendas Favoritas */}
        {activeTab === 'wishlist' && (
          <div className="pt-6 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Tus Prendas Guardadas
              </h3>
              <p className="text-xs text-slate-500">
                Diseños que has marcado como favoritos para adquirir en tu próxima compra.
              </p>
            </div>

            {favoriteProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow transition flex flex-col justify-between"
                  >
                    <div className="relative aspect-[4/5] bg-slate-100 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 flex flex-col gap-1">
                        <span className="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded">
                          {product.category}
                        </span>
                        <span className="bg-white text-slate-900 text-[10px] font-semibold px-2 py-0.5 rounded border border-slate-200">
                          {product.apparelType}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm line-clamp-1">
                          {product.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Por {product.creatorName}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <span className="font-black text-slate-900 text-base">
                          {formatCOP(product.price)}
                        </span>
                        <button
                          onClick={() =>
                            addToCart({
                              product,
                              size: 'L',
                              color: product.availableColors[0] || '#000000',
                              colorName: 'Negro Profundo',
                              apparelType: product.apparelType,
                              printPlacement: 'Pecho Frontal Grande',
                              quantity: 1,
                              price: product.price
                            })
                          }
                          className="py-1.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-sm"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Añadir al Carrito</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center bg-white border border-slate-200 rounded-2xl p-6">
                <Heart className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <h4 className="font-bold text-slate-700 text-sm">No tienes favoritos aún</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Guarda tus estampados preferidos haciendo clic en el corazón de cualquier prenda.
                </p>
                <button
                  onClick={() => navigateTo('store')}
                  className="mt-4 py-2 px-4 rounded-xl bg-blue-600 text-white font-bold text-xs"
                >
                  Explorar Catálogo
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Dirección de Entrega */}
        {activeTab === 'shipping' && (
          <div className="pt-6 max-w-2xl mx-auto">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  Dirección de Entrega Predeterminada
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Los pedidos de tus prendas estampadas se enviarán automáticamente a esta ubicación.
                </p>
              </div>

              <form onSubmit={handleSaveShipping} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Ciudad y Departamento
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Ej. Bogotá D.C."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Dirección Completa (Calle, Carrera, Edificio, Apto)
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Ej. Carrera 15 # 93-45, Apto 402"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Teléfono Celular de Contacto
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ej. +57 312 458 9210"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-sm transition"
                  >
                    Guardar Cambios de Dirección
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
