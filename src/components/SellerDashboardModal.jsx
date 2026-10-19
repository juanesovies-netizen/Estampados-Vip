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
  TrendingUp,
  Image as ImageIcon
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

  if (!isSellerDashboardOpen) return null;

  const [activeTab, setActiveTab] = useState('publish'); // 'publish' | 'my-designs' | 'requests'

  // Formulario nuevo diseño
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState(CATEGORIES[1] || 'Minimalista');
  const [newApparel, setNewApparel] = useState(APPAREL_TYPES[1] || 'Camiseta Oversize 240g');
  const [newPrice, setNewPrice] = useState('75000');
  const [newDescription, setNewDescription] = useState('');
  const [newPrintTechnique, setNewPrintTechnique] = useState('DTG HD Print (Tinta al agua ecológica)');
  const [newFabric, setNewFabric] = useState('100% Algodón peinado pesado 240g/m²');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80');

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
      creatorName: user?.storeName || user?.name || 'Mi Estudio de Diseño',
      creatorAvatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      price: parseFloat(newPrice) || 35.0,
      image: imageUrl,
      mockupTshirt: imageUrl,
      designOnly: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
      description: newDescription || 'Diseño de autor exclusivo con impresión de alta fidelidad sobre prenda premium.',
      tags: [newCategory, newApparel, 'Drop Exclusivo'],
      printTechnique: newPrintTechnique,
      fabric: newFabric,
      availableColors: ['#0f172a', '#1e293b', '#f8fafc'],
      availableSizes: ['S', 'M', 'L', 'XL', '2XL']
    });

    // Reset y cambio de tab
    setNewTitle('');
    setNewDescription('');
    setActiveTab('my-designs');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#11141e] border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 max-h-[90vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={() => setIsSellerDashboardOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold uppercase tracking-wider">
                Panel del Creador VIP
              </span>
              <span className="text-xs text-slate-400">
                {user?.storeName || 'Estudio Oficial'}
              </span>
            </div>
            <h2 className="text-2xl font-black text-white font-['Space_Grotesk'] mt-1">
              Gestión de Estampados & Encargos
            </h2>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-xl text-center">
              <span className="text-[10px] text-slate-400 block font-medium">Ventas Acumuladas</span>
              <span className="text-sm font-black text-emerald-400 font-['Space_Grotesk']">$18.450.000 COP</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-xl text-center">
              <span className="text-[10px] text-slate-400 block font-medium">Encargos Pendientes</span>
              <span className="text-sm font-black text-amber-400 font-['Space_Grotesk']">{customRequests.length}</span>
            </div>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex items-center gap-2 pt-4 pb-2 border-b border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('publish')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
              activeTab === 'publish'
                ? 'bg-amber-400 text-black font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            Publicar Nuevo Estampado
          </button>

          <button
            onClick={() => setActiveTab('my-designs')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
              activeTab === 'my-designs'
                ? 'bg-amber-400 text-black font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            Mis Diseños Activos ({myDesigns.length})
          </button>

          <button
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
              activeTab === 'requests'
                ? 'bg-amber-400 text-black font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Solicitudes de Clientes ({customRequests.length})
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto py-5 pr-1">
          
          {/* TAB 1: PUBLICAR NUEVO DISEÑO */}
          {activeTab === 'publish' && (
            <form onSubmit={handlePublish} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Título del Estampado / Obra *
                    </label>
                    <input
                      type="text"
                      required
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="Ej. Mecha Dragon Neo-Tokyo 2099"
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Estilo / Categoría
                      </label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-400"
                      >
                        {CATEGORIES.filter((c) => c !== 'Todos').map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Prenda Recomendada
                      </label>
                      <select
                        value={newApparel}
                        onChange={(e) => setNewApparel(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-400"
                      >
                        {APPAREL_TYPES.filter((a) => a !== 'Todos').map((a) => (
                          <option key={a} value={a}>{a}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Precio de Venta Base (COP) *
                      </label>
                      <input
                        type="number"
                        step="1000"
                        min="25000"
                        required
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Técnica de Estampado
                      </label>
                      <input
                        type="text"
                        value={newPrintTechnique}
                        onChange={(e) => setNewPrintTechnique(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Descripción del Arte y Concepto
                    </label>
                    <textarea
                      rows={3}
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      placeholder="Explica la inspiración, detalles gráficos, tintas recomendadas y detalles de la prenda..."
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Right: Mockup Image selector / preview */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Imagen del Mockup / Prenda con Estampado
                    </label>
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="URL de la imagen del diseño"
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400 mb-2"
                    />
                    
                    {/* Preset sample images for quick demo */}
                    <div className="text-[11px] text-slate-400 mb-1.5 font-medium">Ejemplos de muestra minimalista:</div>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setImageUrl('https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80')}
                        className="p-1.5 rounded-lg border border-slate-700 bg-slate-900 hover:border-amber-400 text-[10px] text-slate-300 text-center font-medium"
                      >
                        Línea Continua
                      </button>
                      <button
                        type="button"
                        onClick={() => setImageUrl('https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80')}
                        className="p-1.5 rounded-lg border border-slate-700 bg-slate-900 hover:border-amber-400 text-[10px] text-slate-300 text-center font-medium"
                      >
                        Botánico Mate
                      </button>
                      <button
                        type="button"
                        onClick={() => setImageUrl('https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80')}
                        className="p-1.5 rounded-lg border border-slate-700 bg-slate-900 hover:border-amber-400 text-[10px] text-slate-300 text-center font-medium"
                      >
                        Tipografía Suiza
                      </button>
                    </div>
                  </div>

                  {/* Image Preview Box */}
                  <div className="rounded-2xl border border-slate-800 bg-slate-950 aspect-[4/3] overflow-hidden flex items-center justify-center p-2 relative">
                    <img
                      src={imageUrl}
                      alt="Vista previa del nuevo diseño"
                      className="w-full h-full object-cover rounded-xl"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div className="absolute bottom-3 left-3 bg-black/80 px-2.5 py-1 rounded-md text-[10px] text-white">
                      Vista previa en tienda
                    </div>
                  </div>
                </div>

              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-sm transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Publicar Estampado en Catálogo VIP
                </button>
              </div>

            </form>
          )}

          {/* TAB 2: MIS DISEÑOS ACTIVOS */}
          {activeTab === 'my-designs' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400">
                Diseños asociados a tu cuenta de vendedor. Se actualizan en vivo en el catálogo de la tienda.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {myDesigns.map((p) => (
                  <div key={p.id} className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex gap-3 items-center">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-white truncate">{p.title}</p>
                      <p className="text-[11px] text-amber-400 font-semibold">{formatCOP(p.price)}</p>
                      <p className="text-[10px] text-slate-400 truncate">{p.apparelType}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SOLICITUDES DE CLIENTES */}
          {activeTab === 'requests' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-400">
                Bandeja de encargos enviados por compradores interesados en tus servicios de diseño:
              </p>
              {customRequests.map((req) => (
                <div key={req.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white">{req.buyerName}</span>
                      <span className="text-xs text-slate-400 ml-2">({req.buyerEmail})</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20">
                      {req.status}
                    </span>
                  </div>

                  <div className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <p className="font-semibold text-amber-300 mb-1">
                      {req.projectType} • {req.garment} • Presupuesto: {req.budget}
                    </p>
                    <p className="text-slate-300 leading-relaxed">
                      "{req.description}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <span className="text-slate-500">Recibido: {req.createdAt}</span>
                    <button
                      onClick={() => showToast(`Respuesta enviada a ${req.buyerEmail}`)}
                      className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs"
                    >
                      Aceptar & Enviar Boceto
                    </button>
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
