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
  ShieldCheck
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

  if (!isCustomDesignModalOpen) return null;

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description.trim()) return;

    addCustomRequest({
      buyerName: formData.buyerName || 'Cliente VIP',
      buyerEmail: formData.buyerEmail || 'cliente@vipwear.com',
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
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#11141e] border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={() => setIsCustomDesignModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-white font-['Space_Grotesk']">
              ¡Solicitud Enviada con Éxito!
            </h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              El diseñador <strong>{targetSeller.name}</strong> ha recibido tu propuesta. Te responderá a tu correo <span className="text-amber-400 font-medium">{formData.buyerEmail}</span> con un boceto inicial y cotización.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Header / Seller profile snippet */}
            <div className="flex items-center gap-4 pb-4 border-b border-slate-800">
              <img
                src={targetSeller.avatar}
                alt={targetSeller.name}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-amber-400/60 shadow-lg"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">
                    Solicitar Diseño Personalizado a {targetSeller.name}
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/30 font-semibold">
                    VIP Artist
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-400 mt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    Responde en {targetSeller.responseTime || '< 3 horas'}
                  </span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Boceto previo antes de estampar
                  </span>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Tu Nombre o Alias
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.buyerName}
                    onChange={(e) => setFormData({ ...formData, buyerName: e.target.value })}
                    placeholder="Ej. Sofía M."
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Tu Correo de Contacto
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.buyerEmail}
                    onChange={(e) => setFormData({ ...formData, buyerEmail: e.target.value })}
                    placeholder="tu-correo@ejemplo.com"
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Tipo de Encargo
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Ilustración desde cero">Ilustración gráfica desde cero</option>
                    <option value="Modificar diseño existente">Personalizar un diseño existente del artista</option>
                    <option value="Estampado para Marca/Evento">Estampado para marca, banda o evento</option>
                    <option value="Retrato/Fanart personalizado">Retrato o fanart personalizado</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Prenda deseada para el estampado
                  </label>
                  <select
                    value={formData.garment}
                    onChange={(e) => setFormData({ ...formData, garment: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Camiseta Oversize 240g">Camiseta Oversize Pesada 240g</option>
                    <option value="Hoodie Forro Polar">Hoodie Premium Forro Polar</option>
                    <option value="Sudadera Crewneck">Sudadera Crewneck</option>
                    <option value="Tote Bag Pesada">Tote Bag Lona Pesada</option>
                    <option value="Solo el archivo de diseño">Solo el diseño digital (Sin prenda)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Presupuesto estimado
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="$60.000 - $100.000 COP">$60.000 - $100.000 COP (Ajuste simple / Tipografía)</option>
                    <option value="$100.000 - $180.000 COP">$100.000 - $180.000 COP (Ilustración completa de autor)</option>
                    <option value="$180.000 - $350.000 COP">$180.000 - $350.000 COP (Composición compleja / Serie de piezas)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Plazo deseado
                  </label>
                  <select
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Normal (1-2 semanas)">Normal (1-2 semanas)</option>
                    <option value="Urgente (3-5 días)">Urgente (3-5 días, con recargo express)</option>
                    <option value="Flexible">Sin prisa (Flexible)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Cuéntale tu idea al diseñador (Brief) *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe qué elementos quieres en el estampado, estilo visual, colores preferidos, si lleva texto y dónde te gustaría ubicarlo en la prenda..."
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Simulated reference upload */}
              <div className="p-3 border border-dashed border-slate-700 rounded-xl bg-slate-900/50 flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-slate-400">
                  <UploadCloud className="w-5 h-5 text-amber-400" />
                  <div>
                    <p className="text-xs text-slate-300 font-medium">Adjuntar imágenes de referencia (Opcional)</p>
                    <p className="text-[10px] text-slate-500">PNG, JPG, Procreate o PDF (Hasta 25MB)</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, referenceFileName: 'referencia-moodboard.png' })}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium"
                >
                  {formData.referenceFileName ? '✓ Adjuntado' : 'Subir Archivo'}
                </button>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-sm transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Enviar Solicitud al Diseñador
              </button>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
