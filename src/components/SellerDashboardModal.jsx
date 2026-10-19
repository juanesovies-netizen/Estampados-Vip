import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  PlusCircle, 
  DollarSign, 
  Layers, 
  Sparkles, 
  Upload, 
  CheckCircle, 
  Clock, 
  Eye, 
  Shirt, 
  MessageSquare,
  TrendingUp
} from 'lucide-react';
import { CATEGORIES, APPAREL_TYPES } from '../data/mockData';
import { formatCOP } from '../utils/formatCurrency';

export default function SellerDashboardModal() {
  const { 
    isSellerDashboardOpen, 
    setIsSellerDashboardOpen, 
    user, 
    products, 
    addNewProduct, 
    customRequests,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState('publish'); // 'publish' | 'my-designs' | 'requests'

  // Formulario nuevo diseño
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState(CATEGORIES[1] || 'Streetwear Urbano');
  const [newApparel, setNewApparel] = useState(APPAREL_TYPES[1] || 'Camiseta Oversize 240g');
  const [newPrice, setNewPrice] = useState('85000');
  const [newDescription, setNewDescription] = useState('');
  const [newPrintTechnique, setNewPrintTechnique] = useState('Serigrafía textil con tinta al agua extra duradera');
  const [newFabric, setNewFabric] = useState('100% Algodón peinado pesado 240g/m²');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80');

  if (!isSellerDashboardOpen) return null;

  // Filtrar diseños de este creador o todos
  const myDesigns = products.filter((p) => p.creatorId === user?.id || p.creatorName === user?.name);

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

    setNewTitle('');
    setNewDescription('');
    setIsSellerDashboardOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 text-slate-900 rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Close Button */}
        <button
          onClick={() => setIsSellerDashboardOpen(false)}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition border border-slate-200"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Bar */}
        <div className="bg-slate-900 text-white p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'}
                alt={user?.name}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-blue-500"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold font-['Space_Grotesk'] text-white">
                    {user?.storeName || user?.name || 'NeoTokyo Arts'}
                  </h3>
                  <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    Diseñador VIP
                  </span>
                </div>
                <p className="text-xs text-blue-400 font-medium">Panel de Publicación de Estampados</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700">
                <span className="text-slate-400 block text-[10px]">Ventas Totales</span>
                <span className="font-bold text-white text-sm">{user?.totalSales || '$24.500.000 COP'}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700">
                <span className="text-slate-400 block text-[10px]">Prendas Activas</span>
                <span className="font-bold text-blue-400 text-sm">{myDesigns.length || 12}</span>
              </div>
            </div>
          </div>

          {/* Modal Tabs */}
          <div className="flex gap-4 mt-6 border-b border-slate-800 text-xs font-bold">
            <button
              onClick={() => setActiveTab('publish')}
              className={`pb-2.5 border-b-2 transition flex items-center gap-1.5 ${
                activeTab === 'publish'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Publicar Nuevo Estampado</span>
            </button>

            <button
              onClick={() => setActiveTab('my-designs')}
              className={`pb-2.5 border-b-2 transition flex items-center gap-1.5 ${
                activeTab === 'my-designs'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Mis Diseños ({myDesigns.length})</span>
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto">
          {activeTab === 'publish' ? (
            <form onSubmit={handlePublish} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Nombre del Estampado / Colección *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ej. Camiseta Oversize Street Dragon"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Estilo / Categoría
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
                    Prenda Base
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
                    Precio en COP *
                  </label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
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
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Descripción
                </label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Detalles sobre el diseño y la ilustración..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsSellerDashboardOpen(false)}
                  className="py-2.5 px-4 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition"
                >
                  Publicar en la Tienda
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {myDesigns.map((prod) => (
                <div key={prod.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex gap-3">
                  <img src={prod.image} alt={prod.title} className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0 text-xs">
                    <h4 className="font-bold text-slate-900 truncate">{prod.title}</h4>
                    <p className="text-slate-500">{prod.apparelType}</p>
                    <span className="font-bold text-blue-600 mt-1 block">{formatCOP(prod.price)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
