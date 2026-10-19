import React, { useState, useMemo } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import Filters from './components/Filters';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import CustomDesignModal from './components/CustomDesignModal';
import AuthModal from './components/AuthModal';
import SellerDashboardModal from './components/SellerDashboardModal';
import CartDrawer from './components/CartDrawer';
import FeaturedCreators from './components/FeaturedCreators';
import CustomDesignExplainer from './components/CustomDesignExplainer';
import Footer from './components/Footer';
import Toast from './components/Toast';
import LoginView from './components/LoginView';
import DesignerProfileView from './components/DesignerProfileView';
import BuyerProfileView from './components/BuyerProfileView';
import { Sparkles, Shirt, Palette, User } from 'lucide-react';

function MainStoreContent() {
  const { 
    products, 
    user, 
    openCustomModal, 
    creators, 
    activeView, 
    navigateTo 
  } = useApp();

  // Estados de filtros locales
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedApparel, setSelectedApparel] = useState('Todos');
  const [sortBy, setSortBy] = useState('popular');

  // Filtrado y ordenación dinámica
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Filtro por búsqueda
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = p.title.toLowerCase().includes(q);
          const matchesCreator = p.creatorName.toLowerCase().includes(q);
          const matchesCategory = p.category.toLowerCase().includes(q);
          const matchesTags = p.tags?.some((t) => t.toLowerCase().includes(q));
          if (!matchesTitle && !matchesCreator && !matchesCategory && !matchesTags) {
            return false;
          }
        }

        // Filtro por categoría/estilo
        if (selectedCategory !== 'Todos' && p.category !== selectedCategory) {
          return false;
        }

        // Filtro por prenda
        if (selectedApparel !== 'Todos' && p.apparelType !== selectedApparel) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'recent') return b.id.localeCompare(a.id);
        return (b.reviewsCount || 0) - (a.reviewsCount || 0);
      });
  }, [products, searchQuery, selectedCategory, selectedApparel, sortBy]);

  const handleNavigateSection = (sectionId) => {
    if (sectionId === 'catalog') {
      document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'creators') {
      document.getElementById('creators-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'custom-info') {
      document.getElementById('custom-info-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Render view conditional
  if (activeView === 'login') {
    return (
      <>
        <Toast />
        <LoginView />
      </>
    );
  }

  if (activeView === 'profile') {
    if (!user) {
      return (
        <>
          <Toast />
          <LoginView />
        </>
      );
    }
    return (
      <>
        <Toast />
        {user.role === 'seller' ? <DesignerProfileView /> : <BuyerProfileView />}
        <ProductDetailModal />
        <CustomDesignModal />
        <CartDrawer />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Toast notifications */}
      <Toast />

      {/* Navigation */}
      <Navbar onNavigateSection={handleNavigateSection} />

      {/* Hero Section */}
      <HeroBanner
        onExploreClick={() => handleNavigateSection('catalog')}
        onRequestCustomClick={() => openCustomModal(creators[0])}
      />

      {/* Designer Active Bar if logged in as Designer */}
      {user?.role === 'seller' && (
        <div className="bg-blue-600 text-white py-3 px-4 border-y border-blue-700 shadow-sm">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
              <span className="font-bold">Modo Diseñador Activo:</span>
              <span className="text-blue-100">
                Conectado como <strong>{user.storeName || user.name}</strong> ({user.handle || '@neotokyo.arts'})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateTo('profile')}
                className="py-1.5 px-3.5 rounded-xl bg-white text-blue-700 hover:bg-slate-100 font-bold text-xs transition flex items-center gap-1.5 shadow-sm"
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Gestionar Mis Diseños & Encargos</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Buyer Bar if logged in as Buyer */}
      {user?.role === 'buyer' && (
        <div className="bg-black text-white py-2.5 px-4 border-y border-slate-800 text-xs">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>Hola, <strong>{user.name}</strong> • Tienes 1 pedido en producción de estampado</span>
            </div>
            <button
              onClick={() => navigateTo('profile')}
              className="py-1 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <User className="w-3.5 h-3.5 text-blue-400" />
              <span>Ver Mis Pedidos & Armario</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Catalog Section */}
      <main id="catalog-section" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Catálogo de Colecciones
            </div>
            <h2 className="text-3xl font-black text-slate-900 font-['Space_Grotesk'] tracking-tight">
              Prendas de Ropa con Estampados de Autor
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Selecciona cualquier obra y elígela en camiseta oversize, hoodie o sudadera en tu color preferido.
            </p>
          </div>
        </div>

        {/* Filters and search */}
        <Filters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedApparel={selectedApparel}
          setSelectedApparel={setSelectedApparel}
          sortBy={sortBy}
          setSortBy={setSortBy}
          totalResults={filteredProducts.length}
        />

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center space-y-4 rounded-3xl bg-white border border-slate-200 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
              <Shirt className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No se encontraron diseños</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Prueba cambiando los filtros de categoría o buscando un término como "anime", "samurai", "vintage" o "zen".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Todos');
                setSelectedApparel('Todos');
              }}
              className="py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white transition shadow-sm"
            >
              Restablecer Filtros
            </button>
          </div>
        )}

      </main>

      {/* Featured Creators Section */}
      <FeaturedCreators
        onSelectCreatorFilter={(creatorName) => {
          setSearchQuery(creatorName);
          handleNavigateSection('catalog');
        }}
      />

      {/* Custom Commission Explainer Section */}
      <CustomDesignExplainer />

      {/* Footer */}
      <Footer />

      {/* Interactive Modals and Drawers */}
      <ProductDetailModal />
      <CustomDesignModal />
      <AuthModal />
      <SellerDashboardModal />
      <CartDrawer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainStoreContent />
    </AppProvider>
  );
}
