import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS, INITIAL_CREATORS, DEMO_USERS } from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Autenticación & Usuario
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('vipwear_user');
    return saved ? JSON.parse(saved) : DEMO_USERS.buyer; // Inicia con comprador demo para experiencia inmediata
  });

  // Catálogo de productos reactivo
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('vipwear_products');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Si los datos guardados son viejos (precios en USD menores a 1000), resetear a COP
        if (parsed[0]?.price < 1000) return INITIAL_PRODUCTS;
        return parsed;
      } catch (e) {
        return INITIAL_PRODUCTS;
      }
    }
    return INITIAL_PRODUCTS;
  });

  // Carrito de compras
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('vipwear_cart');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed[0]?.price < 1000) {
          return [
            {
              id: 'cart-init-1',
              product: INITIAL_PRODUCTS[0],
              size: 'L',
              color: '#0f172a',
              colorName: 'Negro Carbón',
              apparelType: 'Camiseta Oversize 240g',
              printPlacement: 'Pecho Frontal Grande',
              quantity: 1,
              price: INITIAL_PRODUCTS[0].price
            }
          ];
        }
        return parsed;
      } catch (e) {
        // fallback
      }
    }
    return [
      {
        id: 'cart-init-1',
        product: INITIAL_PRODUCTS[0],
        size: 'L',
        color: '#0f172a',
        colorName: 'Negro Carbón',
        apparelType: 'Camiseta Oversize 240g',
        printPlacement: 'Pecho Frontal Grande',
        quantity: 1,
        price: INITIAL_PRODUCTS[0].price
      }
    ];
  });

  // Solicitudes de diseño personalizado
  const [customRequests, setCustomRequests] = useState(() => {
    const saved = localStorage.getItem('vipwear_custom_requests');
    return saved ? JSON.parse(saved) : [
      {
        id: 'req-1',
        buyerName: 'Sofía Morales',
        buyerEmail: 'sofia@cliente.vip',
        creatorName: 'Studio Kanso (Zen & Line)',
        creatorId: 'c2',
        projectType: 'Ilustración desde cero',
        garment: 'Camiseta Oversize 240g',
        budget: '$85.000 - $140.000 COP',
        description: 'Quiero una ilustración botánica en trazo continuo lineal con ramas de olivo y tipografía sobria para la espalda de una camiseta cruda.',
        status: 'En revisión por el artista',
        createdAt: 'Hace 1 hora'
      }
    ];
  });

  // Favoritos
  const [favorites, setFavorites] = useState(['p1', 'p3']);

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
      localStorage.setItem('vipwear_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('vipwear_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('vipwear_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('vipwear_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('vipwear_custom_requests', JSON.stringify(customRequests));
  }, [customRequests]);

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

    showToast(`¡Añadido al carrito! "${item.product.title}"`);
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
      favorites.includes(productId) ? 'Eliminado de favoritos' : 'Guardado en tu lista de deseos ❤️'
    );
  };

  // Autenticación rápida y roles
  const loginAs = (roleType) => {
    if (roleType === 'buyer') {
      setUser(DEMO_USERS.buyer);
      showToast('Sesión iniciada como Comprador: Sofía Morales 🛍️');
    } else {
      setUser(DEMO_USERS.seller);
      showToast('Sesión iniciada como Vendedor: NeoTokyo Arts 🎨');
    }
    setIsAuthModalOpen(false);
  };

  const loginCustom = (userData) => {
    setUser(userData);
    showToast(`Bienvenido de vuelta, ${userData.name}!`);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    showToast('Has cerrado sesión correctamente', 'info');
  };

  // Publicar nuevo diseño (Rol Vendedor)
  const addNewProduct = (productData) => {
    const newProd = {
      ...productData,
      id: `p-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 1,
      isFeatured: false
    };
    setProducts((prev) => [newProd, ...prev]);
    showToast('¡Diseño publicado exitosamente en el catálogo VIP! 🚀');
  };

  // Solicitar diseño personalizado a un vendedor
  const addCustomRequest = (reqData) => {
    const newReq = {
      ...reqData,
      id: `req-${Date.now()}`,
      status: 'Recibido por el artista',
      createdAt: 'Justo ahora'
    };
    setCustomRequests((prev) => [newReq, ...prev]);
    showToast('¡Solicitud enviada al vendedor! Te contactará a tu email.');
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
        user,
        setUser,
        loginAs,
        loginCustom,
        logout,
        products,
        addNewProduct,
        creators: INITIAL_CREATORS,
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
