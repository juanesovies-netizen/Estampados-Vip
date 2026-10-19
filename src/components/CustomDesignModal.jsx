import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Send, 
  Sparkles, 
  Clock, 
  DollarSign, 
  UploadCloud, 
  CheckCircle2, 
  Palette,
  ShieldCheck,
  Shirt
} from 'lucide-react';

export default function CustomDesignModal() {
  const { 
    isCustomDesignModalOpen, 
    setIsCustomDesignModalOpen, 
    selectedSellerForCustom, 
    user, 
    addCustomRequest,
    creators 
  } = useApp();

  const targetSeller = selectedSellerForCustom || creators[0];

  const [formData, setFormData] = useState({
    buyerName: user?.name || '',
    buyerEmail: user?.email || '',
    projectType: 'Ilustración desde cero',
    garment: 'Camiseta Oversize 240g',
    budget: '$85.000 - $140.000 COP',
    deadline: 'Normal (1-2 semanas)',
    description: '',
    referenceFileName: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isCustomDesignModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description.trim()) return;

    addCustomRequest({
      buyerName: formData.buyerName || user?.name || 'Cliente VIP',
      buyerEmail: formData.buyerEmail || user?.email || 'cliente@vipwear.com',
      creatorName: targetSeller.name,
      creatorId: targetSeller.id,
      projectType: formData.projectType,
      garment: formData.garment,
      budget: formData.budget,
      description: formData.description
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsCustomDesignModalOpen(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 text-slate-900 rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Close Button */}
        <button
          onClick={() => setIsCustomDesignModalOpen(false)}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition border border-slate-200"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="p-8 sm:p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 border border-blue-200 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 font-['Space_Grotesk']">
              ¡Solicitud Enviada con Éxito!
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              El diseñador <strong>{targetSeller.name}</strong> ha recibido tu proyecto. Te enviará un boceto y cotización detallada.
            </p>
          </div>
        ) : (
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Header info */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold mb-2">
                <Palette className="w-3.5 h-3.5 text-blue-600" />
                Encargo Personalizado Directo
              </div>
              <h2 className="text-2xl font-black text-slate-900 font-['Space_Grotesk']">
                Cotizar Diseño a Medida
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Trabaja en conjunto con el artista para estampar tu visión en ropa de primera calidad.
              </p>
            </div>

            {/* Target Creator Profile Strip */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={targetSeller.avatar}
                  alt={targetSeller.name}
                  className="w-11 h-11 rounded-xl object-cover border border-slate-300"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{targetSeller.name}</h4>
                  <span className="text-xs text-blue-600 font-semibold">{targetSeller.handle}</span>
                </div>
              </div>

              <span className="text-[11px] text-slate-600 bg-white px-2.5 py-1 rounded-lg border border-slate-200 font-semibold">
                Respuesta: {targetSeller.responseTime}
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Tu Nombre o Empresa
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.buyerName}
                    onChange={(e) => setFormData({ ...formData, buyerName: e.target.value })}
                    placeholder="Ej. Sofía Morales"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Tu Correo Electrónico
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.buyerEmail}
                    onChange={(e) => setFormData({ ...formData, buyerEmail: e.target.value })}
                    placeholder="sofia@cliente.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Prenda a Estampar
                  </label>
                  <select
                    value={formData.garment}
                    onChange={(e) => setFormData({ ...formData, garment: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-600"
                  >
                    <option value="Camiseta Oversize 240g">Camiseta Oversize 240g</option>
                    <option value="Hoodie Unisex con Capucha">Hoodie Unisex con Capucha</option>
                    <option value="Camiseta Lavado Vintage">Camiseta Lavado Vintage</option>
                    <option value="Sudadera Crewneck">Sudadera Crewneck</option>
                    <option value="Chaqueta Denim Estampada">Chaqueta Denim Estampada</option>
                    <option value="Tote Bag Lona Pesada">Tote Bag Lona Pesada</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Presupuesto Estimado
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-600"
                  >
                    <option value="$75.000 - $110.000 COP">$75.000 - $110.000 COP</option>
                    <option value="$110.000 - $160.000 COP">$110.000 - $160.000 COP</option>
                    <option value="$160.000 - $250.000 COP">$160.000 - $250.000 COP</option>
                    <option value="Mayor a $250.000 COP (Colección o Lote)">Mayor a $250.000 COP (Lote)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Describe tu Idea de Estampado *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Explica qué quieres que aparezca en el estampado: colores preferidos, texto o tipografía, ubicación (espalda o pecho), referencias estéticas..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCustomDesignModalOpen(false)}
                  className="py-2.5 px-4 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="py-2.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Cotización al Artista</span>
                </button>
              </div>
            </form>

          </div>
        )}

      </div>
    </div>
  );
}
