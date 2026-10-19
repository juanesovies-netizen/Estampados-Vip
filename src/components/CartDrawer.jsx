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
    completeOrder,
    showToast,
    user,
    navigateTo
  } = useApp();

  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'VIP10') {
      setDiscountPercent(10);
      setCouponApplied(true);
      showToast('¡Cupón VIP10 aplicado! 10% de descuento concedido');
    } else {
      showToast('Cupón no válido. Prueba usando "VIP10"', 'info');
    }
  };

  const discountAmount = (cartTotal * discountPercent) / 100;
  const shippingCost = cartTotal > 150000 ? 0 : 12000;
  const finalTotal = Math.max(0, cartTotal - discountAmount + (cart.length > 0 ? shippingCost : 0));

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      completeOrder();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end animate-fade-in">
      <div className="w-full max-w-md bg-white text-slate-900 h-full flex flex-col justify-between shadow-2xl border-l border-slate-200">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Carrito de Ropa</h3>
              <p className="text-xs text-slate-500">
                {cart.length} {cart.length === 1 ? 'prenda seleccionada' : 'prendas seleccionadas'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex gap-3.5 relative group"
              >
                <img
                  src={item.product.mockupTshirt || item.product.image}
                  alt={item.product.title}
                  className="w-20 h-20 rounded-xl object-cover border border-slate-200 bg-white shrink-0"
                />

                <div className="flex-1 min-w-0 pr-6 space-y-1">
                  <h4 className="font-bold text-slate-900 text-xs truncate">
                    {item.product.title}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    {item.apparelType} • Talla: <strong className="text-slate-800">{item.size}</strong>
                  </p>
                  <p className="text-[10px] text-blue-600 font-semibold truncate">
                    {item.colorName} • {item.printPlacement?.split(' ')[0]}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <span className="font-black text-slate-900 text-xs">
                      {formatCOP(item.price)}
                    </span>

                    <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden text-xs">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-2 py-0.5 font-bold hover:bg-slate-100 text-slate-600"
                      >
                        -
                      </button>
                      <span className="px-2 py-0.5 font-bold text-slate-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-2 py-0.5 font-bold hover:bg-slate-100 text-slate-600"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Remove Item Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="absolute top-3 right-3 text-slate-400 hover:text-red-500 transition"
                  title="Eliminar de carrito"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="py-16 text-center space-y-3">
              <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
              <h4 className="font-bold text-slate-800 text-sm">Tu carrito está vacío</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Explora los estampados disponibles y elige tu prenda preferida para agregarla.
              </p>
            </div>
          )}
        </div>

        {/* Drawer Footer: Totals and Checkout */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-slate-200 bg-white space-y-4">
            
            {/* Coupon Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Cupón: prueba VIP10"
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs uppercase font-bold text-slate-800 focus:outline-none focus:border-blue-600"
                />
              </div>
              <button
                type="submit"
                className="py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition border border-slate-300"
              >
                Aplicar
              </button>
            </form>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal prendas:</span>
                <span className="font-bold text-slate-900">{formatCOP(cartTotal)}</span>
              </div>

              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Descuento cupón (10%):</span>
                  <span>-{formatCOP(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Envío nacional:</span>
                <span className="font-bold text-slate-900">
                  {shippingCost === 0 ? '¡Gratis por compra mayor a $150.000!' : formatCOP(shippingCost)}
                </span>
              </div>

              <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-100">
                <span>Total a pagar:</span>
                <span className="text-blue-600">{formatCOP(finalTotal)}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isCheckingOut ? (
                <span>Procesando Pedido...</span>
              ) : (
                <>
                  <span>Confirmar Pedido & Estampar</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="text-[11px] text-center text-slate-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Compra 100% protegida • Garantía de serigrafía</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
