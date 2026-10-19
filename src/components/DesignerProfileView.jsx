import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  PlusCircle, 
  Layers, 
  Star, 
  ShieldCheck, 
  MessageSquareText, 
  ArrowLeft, 
  LogOut, 
  User, 
  DollarSign, 
  Shirt, 
  CheckCircle2, 
  Eye
} from 'lucide-react';
import { CATEGORIES, APPAREL_TYPES } from '../data/mockData';
import { formatCOP } from '../utils/formatCurrency';

export default function DesignerProfileView() {
  const { 
    user, 
    products, 
    addNewProduct, 
    toggleProductStatus, 
    customRequests, 
    updateCustomRequestStatus, 
    navigateTo, 
    loginAs, 
    logout,
    openProductDetail,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState('designs'); // 'designs' | 'publish' | 'requests' | 'finances'

  // Formulario nuevo diseño
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState(CATEGORIES[1] || 'Streetwear Urbano');
  const [newApparel, setNewApparel] = useState(APPAREL_TYPES[1] || 'Camiseta Oversize 240g');
  const [newPrice, setNewPrice] = useState('85000');
  const [newDescription, setNewDescription] = useState('');
  const [newPrintTechnique, setNewPrintTechnique] = useState('Serigrafía textil con tinta al agua extra duradera');
  const [newFabric] = useState('100% Algodón peinado de alto gramaje 240g/m²');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80');

  // Filtrar diseños del diseñador
  const designerDesigns = products.filter(
    (p) => p.creatorId === user?.id || p.creatorName?.toLowerCase().includes('neotokyo') || p.creatorName === user?.name
  );

  const handlePublish = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addNewProduct({
      title: newTitle,
      category: newCategory,
      apparelType: newApparel,
      creatorId: user?.id || 'c1',
      creatorName: user?.storeName || user?.name || 'NeoTokyo Arts',
      creatorAvatar: user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      price: parseFloat(newPrice) || 85000,
      image: imageUrl,
      mockupTshirt: imageUrl,
      description: newDescription || 'Prenda estampada de autor con técnica duradera y algodón de primera calidad.',
      printTechnique: newPrintTechnique,
      fabric: newFabric,
      tags: [newCategory, 'Nuevo Drop', 'Autor'],
      availableColors: ['#000000', '#ffffff', '#2563eb'],
      availableSizes: ['S', 'M', 'L', 'XL']
    });

    // Limpiar formulario y cambiar a lista de diseños
    setNewTitle('');
    setNewDescription('');
    setActiveTab('designs');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16">
      
      {/* Top Banner & Profile Header */}
      <div className="bg-slate-900 text-white border-b border-slate-800">
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
                onClick={() => loginAs('buyer')}
                className="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition"
                title="Cambiar al rol de Comprador"
              >
                <User className="w-3.5 h-3.5 text-blue-400" />
                <span>Cambiar a Perfil Comprador</span>
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
                src={user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'}
                alt={user?.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-blue-500 shadow"
              />
              <span className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1 rounded-full shadow" title="Diseñador Verificado">
                <ShieldCheck className="w-4 h-4" />
              </span>
            </div>

            <div className="space-y-1 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-black text-white font-['Space_Grotesk']">
                  {user?.storeName || user?.name || 'NeoTokyo Arts Studio'}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[11px] font-bold uppercase tracking-wide">
                  Diseñador VIP Oficial
                </span>
              </div>
              <p className="text-xs text-blue-400 font-semibold">
                {user?.handle || '@neotokyo.arts'} • Especialidad en Ropa Gráfica & Serigrafía Textil
              </p>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                {user?.bio || 'Estudio de diseño gráfico y serigrafía textil especializado en anime, estética cyberpunk y tipografía brutalista en prendas de alto gramaje.'}
              </p>
            </div>

            <div className="pt-2 sm:pt-0">
              <button
                onClick={() => setActiveTab('publish')}
                className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ Publicar Nuevo Estampado</span>
              </button>
            </div>
          </div>

          {/* Designer KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-8">
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Ventas Totales</span>
                <DollarSign className="w-4 h-4 text-blue-400" />
              </div>
              <p className="text-lg sm:text-xl font-black text-white mt-1">
                {user?.totalSales || '$24.500.000 COP'}
              </p>
              <span className="text-[10px] text-emerald-400 font-semibold">+18% este mes</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Prendas Vendidas</span>
                <Shirt className="w-4 h-4 text-blue-400" />
              </div>
              <p className="text-lg sm:text-xl font-black text-white mt-1">
                {user?.salesCount || 640} unidades
              </p>
              <span className="text-[10px] text-slate-300 font-medium">Camisetas & hoodies</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Calificación Clientes</span>
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              </div>
              <p className="text-lg sm:text-xl font-black text-white mt-1">
                {user?.rating || 4.9} / 5.0
              </p>
              <span className="text-[10px] text-slate-300 font-medium">128 reseñas verificadas</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Diseños Publicados</span>
                <Layers className="w-4 h-4 text-blue-400" />
              </div>
              <p className="text-lg sm:text-xl font-black text-white mt-1">
                {designerDesigns.length} activos
              </p>
              <span className="text-[10px] text-blue-400 font-medium">En catálogo general</span>
            </div>
          </div>

        </div>
      </div>

      {/* Main Profile Tabs and Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 gap-2 sm:gap-6 overflow-x-auto text-sm font-semibold">
          <button
            onClick={() => setActiveTab('designs')}
            className={`pb-3 px-2 flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'designs'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Mis Prendas Publicadas ({designerDesigns.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('publish')}
            className={`pb-3 px-2 flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'publish'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Publicar Nueva Prenda</span>
          </button>

          <button
            onClick={() => setActiveTab('requests')}
            className={`pb-3 px-2 flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'requests'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <MessageSquareText className="w-4 h-4" />
            <span>Encargos de Clientes</span>
            {customRequests.length > 0 && (
              <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {customRequests.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('finances')}
            className={`pb-3 px-2 flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'finances'
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Finanzas & Retiros</span>
          </button>
        </div>

        {/* Tab 1: Mis Prendas Publicadas */}
        {activeTab === 'designs' && (
          <div className="pt-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Prendas Estampadas Activas
                </h3>
                <p className="text-xs text-slate-500">
                  Gestiona el catálogo de ropa con tus ilustraciones y diseños que los clientes pueden comprar.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('publish')}
                className="py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center gap-1.5 self-start sm:self-auto shadow-sm"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>+ Agregar Nuevo Estampado</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {designerDesigns.map((product) => (
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
                      <span className="bg-white text-slate-900 text-[10px] font-semibold px-2 py-0.5 rounded border border-slate-200 shadow-sm">
                        {product.apparelType}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm ${
                          product.isPaused
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        }`}
                      >
                        {product.isPaused ? 'Pausado' : 'Activo'}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm line-clamp-1">
                        {product.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                        {product.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-medium">Precio Venta</span>
                        <span className="font-black text-slate-900 text-sm">
                          {formatCOP(product.price)}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block font-medium">Técnica</span>
                        <span className="text-[11px] font-semibold text-blue-600">
                          {product.printTechnique?.split(' ')[0] || 'Serigrafía'}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => openProductDetail(product)}
                        className="flex-1 py-1.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-center gap-1 transition"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Ver Ficha</span>
                      </button>

                      <button
                        onClick={() => toggleProductStatus(product.id)}
                        className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition border ${
                          product.isPaused
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {product.isPaused ? 'Reanudar' : 'Pausar'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Publicar Nuevo Diseño */}
        {activeTab === 'publish' && (
          <div className="pt-6 max-w-3xl mx-auto">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-blue-600" />
                  Publicar Nueva Prenda Estampada
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Tu nuevo diseño aparecerá inmediatamente en el catálogo general de TiendaVIP disponible para compradores.
                </p>
              </div>

              <form onSubmit={handlePublish} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Título de la Obra o Estampado *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Ej. Camiseta Oversize Neo Samurai Blue"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Categoría del Diseño
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-600"
                    >
                      {CATEGORIES.filter((c) => c !== 'Todos').map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Prenda Base Recomendada
                    </label>
                    <select
                      value={newApparel}
                      onChange={(e) => setNewApparel(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-600"
                    >
                      {APPAREL_TYPES.filter((t) => t !== 'Todos').map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Precio de Venta (COP) *
                    </label>
                    <input
                      type="number"
                      required
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      placeholder="85000"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Técnica de Estampado
                    </label>
                    <select
                      value={newPrintTechnique}
                      onChange={(e) => setNewPrintTechnique(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-600"
                    >
                      <option value="Serigrafía textil con tinta al agua extra duradera">Serigrafía Textil al Agua</option>
                      <option value="DTG Ultra HD con curado térmico de larga duración">DTG Direct-to-Garment Ultra HD</option>
                      <option value="Descarga química directa (Discharge print)">Descarga Química (Discharge Print)</option>
                      <option value="Vinilo Textil de Alta Densidad Mate">Vinilo Textil Mate</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Descripción del Diseño & Concepto
                  </label>
                  <textarea
                    rows={3}
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Describe la inspiración del estampado, detalles de la ilustración y recomendaciones de cuidado..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    URL de la Imagen / Mockup del Diseño
                  </label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-blue-600"
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => setImageUrl('https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80')}
                      className="text-[10px] px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 font-semibold"
                    >
                      Preset Camiseta Anime
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageUrl('https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80')}
                      className="text-[10px] px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 font-semibold"
                    >
                      Preset Hoodie Street
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageUrl('https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80')}
                      className="text-[10px] px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 font-semibold"
                    >
                      Preset Camiseta Blanca
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('designs')}
                    className="py-2.5 px-4 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 transition"
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className="py-2.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Publicar Estampado en Catálogo</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tab 3: Encargos de Clientes */}
        {activeTab === 'requests' && (
          <div className="pt-6 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Encargos Personalizados de Compradores
              </h3>
              <p className="text-xs text-slate-500">
                Clientes que han cotizado ilustraciones o estampados a medida contigo.
              </p>
            </div>

            <div className="space-y-4">
              {customRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">
                          {req.buyerName}
                        </span>
                        <span className="text-xs text-blue-600">({req.buyerEmail})</span>
                      </div>
                      <span className="text-xs text-slate-400">Recibido: {req.createdAt}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold">
                        {req.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 block font-medium">Prenda Solicitada</span>
                      <span className="font-bold text-slate-800">{req.garment}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Presupuesto Estimado</span>
                      <span className="font-black text-slate-900">{req.budget}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Tipo de Proyecto</span>
                      <span className="font-semibold text-slate-800">{req.projectType}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
                    <span className="font-bold block text-slate-800 mb-1">Descripción del Cliente:</span>
                    <p className="leading-relaxed">{req.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      onClick={() => updateCustomRequestStatus(req.id, 'Boceto aprobado por diseñador')}
                      className="py-1.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Aprobar Boceto</span>
                    </button>

                    <button
                      onClick={() => updateCustomRequestStatus(req.id, 'Enviado a taller de serigrafía')}
                      className="py-1.5 px-3 rounded-lg bg-black hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-1.5"
                    >
                      <Shirt className="w-3.5 h-3.5" />
                      <span>Pasar a Producción</span>
                    </button>

                    <button
                      onClick={() => showToast(`Notificación enviada a ${req.buyerEmail}`)}
                      className="py-1.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
                    >
                      Enviar Mensaje al Comprador
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Finanzas & Retiros */}
        {activeTab === 'finances' && (
          <div className="pt-6 max-w-3xl mx-auto space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-blue-600" />
                Resumen de Ganancias & Retiros
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-blue-50 border border-blue-200">
                  <span className="text-xs text-blue-800 font-bold uppercase tracking-wider block">
                    Saldo Disponible para Retiro
                  </span>
                  <p className="text-2xl font-black text-blue-900 mt-1">
                    {user?.availablePayout || '$4.120.000 COP'}
                  </p>
                  <p className="text-[11px] text-blue-700 mt-1 font-medium">
                    Listo para consignación directa a tu cuenta bancaria
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">
                    Ventas Acumuladas Brutas
                  </span>
                  <p className="text-2xl font-black text-slate-900 mt-1">
                    {user?.totalSales || '$24.500.000 COP'}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1 font-medium">
                    640 prendas comercializadas en la plataforma
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase">
                  Cuenta Bancaria Asociada
                </h4>
                <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                      BC
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">Bancolombia Ahorros</span>
                      <span className="text-slate-500">•••• •••• •••• 4912</span>
                    </div>
                  </div>
                  <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Verificada
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => showToast('Solicitud de retiro procesada. Se acreditará en 24 horas bancarias.')}
                  className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition shadow-sm"
                >
                  Solicitar Transferencia de Saldo
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
