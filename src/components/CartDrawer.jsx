import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Tag
} from 'lucide-react';
import { formatCOP } from '../utils/formatCurrency';

export default function CartDrawer() {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    updateQuantity, 
    cartTotal, 
    clearCart,
    showToast,
    user
  } = useApp();

  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'VIP10') {
      setDiscountPercent(10);
      setCouponApplied(true);
      showToast('¡Cupón VIP10 aplicado! 10% de descuento concedido 🏷️');
    } else {
      showToast('Cupón no válido. Prueba usando "VIP10"', 'info');
    }
  };

  const discountAmount = (cartTotal * discountPercent) / 100;
  const shippingCost = cartTotal > 150000 ? 0 : 12000;
  const finalTotal = Math.max(0, cartTotal - discountAmount + (cart.length > 0 ? shippingCost : 0));

  const handleSimulatePayment = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderConfirmed(true);
      clearCart();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-fade-in flex justify-end">
      <div className="relative w-full max-w-md bg-[#0f121a] border-l border-slate-800 h-full flex flex-col shadow-2xl">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400/10 text-amber-400 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white font-['Space_Grotesk'] leading-tight">
                Tu Carrito VIP
              </h3>
              <p className="text-[11px] text-slate-400">
                {cart.length} {cart.length === 1 ? 'prenda lista' : 'prendas listas'} para estampar
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setIsCartOpen(false);
              setOrderConfirmed(false);
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        {orderConfirmed ? (
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-black text-white font-['Space_Grotesk']">
              ¡Pedido Confirmado con Éxito!
            </h4>
            <p className="text-xs text-slate-300 max-w-xs leading-relaxed">
              Hemos enviado los detalles de producción de estampado y comprobante a{' '}
              <strong className="text-amber-400">{user?.email || 'tu correo'}</strong>.
            </p>
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-left text-xs space-y-1 w-full max-w-xs">
              <p className="text-slate-400 text-[11px]">Número de orden: <strong>#VIP-8942</strong></p>
              <p className="text-slate-400 text-[11px]">Tiempo estimado: <strong>3-5 días hábiles</strong></p>
            </div>
            <button
              onClick={() => {
                setOrderConfirmed(false);
                setIsCartOpen(false);
              }}
              className="py-2.5 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold transition"
            >
              Seguir Explorando Diseños
            </button>
          </div>
        ) : cart.length === 0 ? (
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <div>
              <p className="text-base font-bold text-white font-['Space_Grotesk']">
                Tu carrito está vacío
              </p>
              <p className="text-xs text-slate-400 max-w-xs mt-1">
                Explora el catálogo y elige un diseño exclusivo para tu camiseta o hoodie favorita.
              </p>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="py-2.5 px-5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold transition"
            >
              Ver Catálogo de Estampados
            </button>
          </div>
        ) : (
          <>
            {/* List of Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800/80 flex gap-3 relative group"
                >
                  <img
                    src={item.product.mockupTshirt || item.product.image}
                    alt={item.product.title}
                    className="w-20 h-24 object-cover rounded-xl bg-slate-950 shrink-0 border border-slate-800"
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-bold text-white truncate pr-4">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-500 hover:text-red-400 transition p-1"
                          title="Eliminar de la bolsa"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[11px] text-amber-400/90 font-medium truncate mt-0.5">
                        Por {item.product.creatorName}
                      </p>

                      <div className="mt-1 text-[10px] text-slate-400 space-y-0.5">
                        <p>{item.apparelType} • Talla {item.size}</p>
                        <p className="flex items-center gap-1.5">
                          <span>Color: {item.colorName}</span>
                          <span
                            className="inline-block w-2.5 h-2.5 rounded-full border border-slate-600"
                            style={{ backgroundColor: item.color }}
                          />
                        </p>
                        <p className="text-slate-400 truncate">{item.printPlacement}</p>
                      </div>
                    </div>

                    {/* Quantity controls and price */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 mt-1">
                      <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-lg p-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-5 h-5 rounded flex items-center justify-center text-slate-300 hover:text-white text-xs hover:bg-slate-800"
                        >
                          -
                        </button>
                        <span className="w-5 text-center text-xs font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-5 h-5 rounded flex items-center justify-center text-slate-300 hover:text-white text-xs hover:bg-slate-800"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-bold text-white font-['Space_Grotesk']">
                        {formatCOP(item.price * item.quantity)}
                      </span>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Checkout Section */}
            <div className="p-4 bg-[#0c0e15] border-t border-slate-800 space-y-3">
              
              {/* Coupon input */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Código (ej. VIP10)"
                    disabled={couponApplied}
                    className="w-full pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <button
                  type="submit"
                  disabled={couponApplied}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition disabled:opacity-50"
                >
                  {couponApplied ? 'Aplicado' : 'Aplicar'}
                </button>
              </form>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal prendas:</span>
                  <span className="text-slate-200 font-medium">{formatCOP(cartTotal)}</span>
                </div>

                {discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Descuento cupón ({discountPercent}%):</span>
                    <span>-{formatCOP(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-400">
                  <span>Envío asegurado:</span>
                  <span>
                    {shippingCost === 0 ? (
                      <span className="text-emerald-400 font-bold">GRATIS (Orden &gt; $150.000)</span>
                    ) : (
                      formatCOP(shippingCost)
                    )}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-white">Total a Pagar:</span>
                  <span className="text-xl font-black text-amber-400 font-['Space_Grotesk']">
                    {formatCOP(finalTotal)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleSimulatePayment}
                disabled={isCheckingOut}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-xs transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
              >
                {isCheckingOut ? (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Procesando pago seguro...
                  </div>
                ) : (
                  <>
                    <span>Confirmar Pedido & Proceder al Pago</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                <span>Pago encriptado con garantía de devolución 30 días</span>
              </div>

            </div>
          </>
        )}

      </div>
    </div>
  );
}
