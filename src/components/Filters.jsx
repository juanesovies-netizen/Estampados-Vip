import React from 'react';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import { CATEGORIES, APPAREL_TYPES } from '../data/mockData';

export default function Filters({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedApparel,
  setSelectedApparel,
  sortBy,
  setSortBy,
  totalResults
}) {
  return (
    <div className="space-y-4 mb-8">
      
      {/* Top Search & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por estampado (anime, samurai, vintage, zen) o diseñador..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-800"
            >
              Limpiar
            </button>
          )}
        </div>

        {/* Apparel Type & Sort Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Garment Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-semibold hidden sm:inline">Prenda:</span>
            <select
              value={selectedApparel}
              onChange={(e) => setSelectedApparel(e.target.value)}
              className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-600 cursor-pointer shadow-sm"
            >
              {APPAREL_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type === 'Todos' ? 'Cualquier prenda' : type}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-semibold hidden sm:inline">Ordenar:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-600 cursor-pointer shadow-sm"
            >
              <option value="popular">Más Populares</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="rating">Mejor Calificación</option>
              <option value="recent">Novedades Recientes</option>
            </select>
          </div>
        </div>

      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
        <span className="text-xs font-bold text-slate-400 flex items-center gap-1 mr-1 shrink-0 uppercase tracking-wider">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Estilo:
        </span>
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`py-1.5 px-3.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 border ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Results Count & Active Filters Indicator */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
        <span>
          Mostrando <strong className="text-slate-900 font-bold">{totalResults}</strong> prendas estampadas
        </span>
        {(selectedCategory !== 'Todos' || selectedApparel !== 'Todos' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory('Todos');
              setSelectedApparel('Todos');
              setSearchQuery('');
            }}
            className="text-blue-600 font-bold hover:underline"
          >
            Restablecer todos los filtros
          </button>
        )}
      </div>

    </div>
  );
}
