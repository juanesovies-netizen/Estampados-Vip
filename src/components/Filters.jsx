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
            placeholder="Buscar por diseño, estilo (minimalista, trazo continuo, zen, suizo) o artista..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              Limpiar
            </button>
          )}
        </div>

        {/* Apparel Type & Sort By Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Garment Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">Prenda:</span>
            <select
              value={selectedApparel}
              onChange={(e) => setSelectedApparel(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 focus:outline-none focus:border-amber-400 cursor-pointer"
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
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">Ordenar:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              <option value="popular">Más Populares</option>
              <option value="recent">Más Recientes</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="rating">Mejor Calificados</option>
            </select>
          </div>
        </div>

      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-1">
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold mr-1 shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Estilo:</span>
        </div>
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium shrink-0 transition ${
                isSelected
                  ? 'bg-amber-400 text-black font-bold shadow-sm shadow-amber-400/20'
                  : 'bg-slate-900/90 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          );
        })}

        <span className="ml-auto text-xs text-slate-400 shrink-0 pl-4">
          Mostrando <strong className="text-white">{totalResults}</strong> diseños
        </span>
      </div>
    </div>
  );
}
