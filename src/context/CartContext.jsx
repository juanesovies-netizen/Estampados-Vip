import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { load, save } from '../lib/storage';

const CartContext = createContext(null);
const MAX_QTY = 20;

const itemKey = (i) => [i.productId, i.garmentId, i.colorId, i.size, i.placementId].join('|');

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => load('cart', []));
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => save('cart', items), [items]);

  const add = useCallback((item) => {
    const key = itemKey(item);
    setItems((list) => {
      const existing = list.find((i) => i.key === key);
      if (existing) {
        return list.map((i) =>
          i.key === key ? { ...i, quantity: Math.min(MAX_QTY, i.quantity + item.quantity) } : i,
        );
      }
      return [...list, { ...item, key }];
    });
  }, []);

  const updateQuantity = useCallback((key, quantity) => {
    const qty = Math.max(1, Math.min(MAX_QTY, quantity));
    setItems((list) => list.map((i) => (i.key === key ? { ...i, quantity: qty } : i)));
  }, []);

  const remove = useCallback((key) => setItems((list) => list.filter((i) => i.key !== key)), []);
  const clear = useCallback(() => setItems([]), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => {
    const count = items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
    return { items, count, subtotal, add, updateQuantity, remove, clear, isOpen, open, close };
  }, [items, isOpen, add, updateQuantity, remove, clear, open, close]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// eslint-disable-next-line react/only-export-components
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart debe usarse dentro de <CartProvider>');
  return context;
}
