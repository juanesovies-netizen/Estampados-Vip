import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_CREATORS, 
  DEMO_USERS, 
  DEMO_ORDERS, 
  DEMO_CUSTOM_REQUESTS 
} from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Vista actual: 'store' | 'login' | 'profile'
  const [activeView, setActiveView] = useState('store');

  // Autenticación & Usuario
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('tiendavip_user_v2');
    return saved ? JSON.parse(saved) : DEMO_USERS.buyer;
  });

  // Catálogo de productos reactivo
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('tiendavip_products_v3');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 8) return parsed;
      } catch (e) {
        // Fallback
      }
    }
    return INITIAL_PRODUCTS;
  });

  // Pedidos del comprador
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('tiendavip_orders_v2');
    return saved ? JSON.parse(saved) : DEMO_ORDERS;
  });

  // Carrito de compras
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('tiendavip_cart_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return [
      {
        id: 'cart-init-1',
        product: INITIAL_PRODUCTS[0],
        size: 'L',
        color: '#000000',
        colorName: 'Negro Profundo',
        apparelType: 'Camiseta Oversize 240g',
        printPlacement: 'Pecho Frontal Grande',
        quantity: 1,
        price: INITIAL_PRODUCTS[0].price
      }
    ];
  });

  // Solicitudes de diseño personalizado
  const [customRequests, setCustomRequests] = useState(() => {
    const saved = localStorage.getItem('tiendavip_custom_requests_v2');
    return saved ? JSON.parse(saved) : DEMO_CUSTOM_REQUESTS;
  });

  // Favoritos
  const [favorites, setFavorites] = useState(['p1', 'p2', 'p4']);

  // Modales y drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authDefaultRole, setAuthDefaultRole] = useState('buyer');
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCustomDesignModalOpen, setIsCustomDesignModalOpen] = useState(false);
  const [selectedSellerForCustom, setSelectedSellerForCustom] = useState(null);
  const [isSellerDashboardOpen, setIsSellerDashboardOpen] = useState(false);

  // Toast de notificación
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Persistencia local
  useEffect(() => {
    if (user) {
      localStorage.setItem('tiendavip_user_v2', JSON.stringify(user));
    } else {
      localStorage.removeItem('tiendavip_user_v2');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('tiendavip_cart_v2', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('tiendavip_products_v3', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('tiendavip_orders_v2', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('tiendavip_custom_requests_v2', JSON.stringify(customRequests));
  }, [customRequests]);

  // Funciones de navegación
  const navigateTo = (view) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Funciones de Carrito
  const addToCart = (item) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (i) =>
          i.product.id === item.product.id &&
          i.size === item.size &&
          i.color === item.color &&
          i.apparelType === item.apparelType &&
          i.printPlacement === item.printPlacement
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += item.quantity;
        return next;
      }
      return [...prev, { ...item, id: `cart-${Date.now()}` }];
    });

    showToast(`Añadido al carrito: "${item.product.title}"`);
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Producto eliminado del carrito', 'info');
  };

  const updateQuantity = (cartItemId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Funciones de favoritos
  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
    showToast(
      favorites.includes(productId) ? 'Eliminado de favoritos' : 'Guardado en tu lista de deseos'
    );
  };

  // Autenticación rápida y roles
  const loginAs = (roleType, autoNavigate = true) => {
    if (roleType === 'buyer') {
      setUser(DEMO_USERS.buyer);
      showToast('Sesión iniciada como Comprador: Sofía Morales');
    } else {
      setUser(DEMO_USERS.seller);
      showToast('Sesión iniciada como Diseñador: NeoTokyo Arts');
    }
    setIsAuthModalOpen(false);
    if (autoNavigate) {
      setActiveView('profile');
    }
  };

  const loginCustom = (userData, autoNavigate = true) => {
    setUser(userData);
    showToast(`Bienvenido de vuelta, ${userData.name}!`);
    setIsAuthModalOpen(false);
    if (autoNavigate) {
      setActiveView('profile');
    }
  };

  const logout = () => {
    setUser(null);
    showToast('Has cerrado sesión correctamente', 'info');
    setActiveView('store');
  };

  // Publicar nuevo diseño (Rol Diseñador / Vendedor)
  const addNewProduct = (productData) => {
    const newProd = {
      ...productData,
      id: `p-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 1,
      isFeatured: false,
      availableColors: productData.availableColors || ['#000000', '#ffffff', '#2563eb'],
      availableSizes: productData.availableSizes || ['S', 'M', 'L', 'XL']
    };
    setProducts((prev) => [newProd, ...prev]);
    showToast('¡Diseño publicado exitosamente en el catálogo VIP!');
  };

  // Pausar/Activar producto del diseñador
  const toggleProductStatus = (productId) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, isPaused: !p.isPaused } : p))
    );
    showToast('Estado del producto actualizado');
  };

  // Solicitar diseño personalizado
  const addCustomRequest = (reqData) => {
    const newReq = {
      ...reqData,
      id: `req-${Date.now()}`,
      status: 'Recibido por el artista',
      statusStep: 1,
      createdAt: 'Justo ahora'
    };
    setCustomRequests((prev) => [newReq, ...prev]);
    showToast('¡Solicitud enviada al diseñador! Te responderá a la brevedad.');
  };

  // Actualizar estado de solicitud personalizada
  const updateCustomRequestStatus = (reqId, newStatus) => {
    setCustomRequests((prev) =>
      prev.map((r) => (r.id === reqId ? { ...r, status: newStatus } : r))
    );
    showToast(`Solicitud actualizada a: ${newStatus}`);
  };

  // Completar compra / checkout
  const completeOrder = () => {
    if (cart.length === 0) return;
    const newOrder = {
      id: `VIP-ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' }),
      status: 'En preparación de estampado',
      statusColor: 'blue',
      trackingNumber: `ENV-${Math.floor(10000000 + Math.random() * 90000000)}-COL`,
      carrier: 'Coordinadora Express',
      totalPrice: cartTotal,
      items: cart.map((c) => ({
        id: c.product.id,
        title: c.product.title,
        garment: c.apparelType,
        size: c.size,
        color: c.colorName,
        quantity: c.quantity,
        price: c.price,
        image: c.product.image
      }))
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setIsCartOpen(false);
    showToast('¡Compra realizada con éxito! Tu pedido ha sido enviado a producción.');
    if (user?.role === 'buyer') {
      setActiveView('profile');
    }
  };

  // Abrir modal de producto
  const openProductDetail = (product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  // Abrir modal de encargo personalizado
  const openCustomModal = (seller) => {
    setSelectedSellerForCustom(seller);
    setIsCustomDesignModalOpen(true);
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        navigateTo,
        user,
        setUser,
        loginAs,
        loginCustom,
        logout,
        products,
        addNewProduct,
        toggleProductStatus,
        creators: INITIAL_CREATORS,
        orders,
        completeOrder,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        favorites,
        toggleFavorite,
        customRequests,
        addCustomRequest,
        updateCustomRequestStatus,
        // Modales
        isCartOpen,
        setIsCartOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authDefaultRole,
        setAuthDefaultRole,
        isDetailModalOpen,
        setIsDetailModalOpen,
        selectedProduct,
        openProductDetail,
        isCustomDesignModalOpen,
        setIsCustomDesignModalOpen,
        selectedSellerForCustom,
        openCustomModal,
        isSellerDashboardOpen,
        setIsSellerDashboardOpen,
        // Toast
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
