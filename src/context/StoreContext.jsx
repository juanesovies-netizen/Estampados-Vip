import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { SEED_CREATORS, SEED_PRODUCTS, SEED_REQUESTS } from '../data/catalog';
import { load, save, uid } from '../lib/storage';
import { useAuth } from './AuthContext';

const StoreContext = createContext(null);

function usePersistentState(key, fallback) {
  const [state, setState] = useState(() => load(key, fallback));
  useEffect(() => save(key, state), [key, state]);
  return [state, setState];
}

export function StoreProvider({ children }) {
  const { user } = useAuth();
  const [products, setProducts] = usePersistentState('products', SEED_PRODUCTS);
  const [creators, setCreators] = usePersistentState('creators', SEED_CREATORS);
  const [requests, setRequests] = usePersistentState('requests', SEED_REQUESTS);
  const [orders, setOrders] = usePersistentState('orders', []);
  const [favoritesByUser, setFavoritesByUser] = usePersistentState('favorites', {});

  // Un vendedor recién registrado obtiene automáticamente su perfil público de diseñador.
  useEffect(() => {
    if (user?.role !== 'seller' || !user.creatorId) return;
    setCreators((list) => {
      if (list.some((c) => c.id === user.creatorId)) return list;
      const name = user.storeName || user.name;
      return [
        ...list,
        {
          id: user.creatorId,
          name,
          handle: `@${name.toLowerCase().replace(/[^a-z0-9]+/g, '')}`,
          city: 'Colombia',
          avatar: null,
          banner: null,
          bio: 'Diseñador independiente en VIP WEAR.',
          specialties: [],
          rating: null,
          salesCount: 0,
          verified: false,
          responseTime: 'Responde en menos de 24 h',
        },
      ];
    });
  }, [user, setCreators]);

  const getProduct = useCallback((id) => products.find((p) => p.id === id), [products]);
  const getCreator = useCallback((id) => creators.find((c) => c.id === id), [creators]);

  const favorites = useMemo(() => (user ? favoritesByUser[user.id] ?? [] : []), [user, favoritesByUser]);

  const toggleFavorite = useCallback(
    (productId) => {
      if (!user) return null;
      const current = favoritesByUser[user.id] ?? [];
      const isFav = current.includes(productId);
      setFavoritesByUser((all) => ({
        ...all,
        [user.id]: isFav ? current.filter((id) => id !== productId) : [...current, productId],
      }));
      return !isFav;
    },
    [user, favoritesByUser, setFavoritesByUser],
  );

  const addProduct = useCallback(
    (data) => {
      const product = {
        ...data,
        id: uid('p'),
        creatorId: user.creatorId,
        rating: null,
        reviews: 0,
        createdAt: new Date().toISOString(),
      };
      setProducts((list) => [product, ...list]);
      return product;
    },
    [user, setProducts],
  );

  const removeProduct = useCallback((id) => setProducts((list) => list.filter((p) => p.id !== id)), [setProducts]);

  const addRequest = useCallback(
    (data) => {
      const request = {
        ...data,
        id: uid('req'),
        buyerId: user.id,
        buyerName: user.name,
        buyerEmail: user.email,
        status: 'pendiente',
        response: '',
        createdAt: new Date().toISOString(),
      };
      setRequests((list) => [request, ...list]);
      return request;
    },
    [user, setRequests],
  );

  const updateRequest = useCallback(
    (id, changes) =>
      setRequests((list) =>
        list.map((r) => (r.id === id ? { ...r, ...changes, updatedAt: new Date().toISOString() } : r)),
      ),
    [setRequests],
  );

  const placeOrder = useCallback(
    (data) => {
      const order = {
        ...data,
        id: `VIP-${Math.floor(100000 + Math.random() * 900000)}`,
        userId: user.id,
        status: 'confirmado',
        createdAt: new Date().toISOString(),
      };
      setOrders((list) => [order, ...list]);
      return order;
    },
    [user, setOrders],
  );

  const value = useMemo(
    () => ({
      products,
      creators,
      requests,
      orders,
      favorites,
      getProduct,
      getCreator,
      toggleFavorite,
      addProduct,
      removeProduct,
      addRequest,
      updateRequest,
      placeOrder,
    }),
    [
      products,
      creators,
      requests,
      orders,
      favorites,
      getProduct,
      getCreator,
      toggleFavorite,
      addProduct,
      removeProduct,
      addRequest,
      updateRequest,
      placeOrder,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

// eslint-disable-next-line react/only-export-components
export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore debe usarse dentro de <StoreProvider>');
  return context;
}
