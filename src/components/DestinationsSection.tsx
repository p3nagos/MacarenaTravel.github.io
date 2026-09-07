import React, { useState } from 'react';
import {
  Compass,
  Star,
  MapPin,
  Calendar,
  Check,
  ArrowRight,
  Sparkles,
  Heart
} from 'lucide-react';
import { DestinationPackage } from '../types';
import { DESTINATIONS_DATA } from '../data/mockData';

interface DestinationsSectionProps {
  currency: 'COP' | 'USD';
  onSelectPackage: (pkg: DestinationPackage) => void;
}

export const DestinationsSection: React.FC<DestinationsSectionProps> = ({
  currency,
  onSelectPackage,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [favorites, setFavorites] = useState<string[]>(['cano-cristales']);

  const categories = [
    { id: 'todos', label: 'Todos los Destinos' },
    { id: 'naturaleza', label: '🌿 Naturaleza & Caño Cristales' },
    { id: 'playa', label: '🏖️ Playas del Caribe' },
    { id: 'cultural', label: '🏰 Cultural & Colonial' },
    { id: 'internacional', label: '✈️ Internacional' },
  ];

  const filtered = selectedCategory === 'todos'
    ? DESTINATIONS_DATA
    : DESTINATIONS_DATA.filter(d => d.category === selectedCategory);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  return (
    <section id="paquetes" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>Paquetes Turísticos Exclusivos Macarena Travel</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 font-display">
              Destinos Soñados con Vuelos & Experiencias Incluidas
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              Desde la magia multicolor de <strong>Caño Cristales</strong> hasta las playas de arena blanca de San Andrés y el encanto caribeño de Cartagena.
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((pkg) => {
            const isFav = favorites.includes(pkg.id);
            return (
              <div
                key={pkg.id}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  {/* Badge */}
                  {pkg.badge && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-amber-500 text-white text-xs font-black px-3 py-1 rounded-full shadow-md">
                        {pkg.badge}
                      </span>
                    </div>
                  )}

                  {/* Favorite Toggle */}
                  <button
                    onClick={(e) => toggleFavorite(pkg.id, e)}
                    className="absolute top-4 right-4 p-2.5 rounded-full bg-white/80 hover:bg-white text-slate-700 shadow-md backdrop-blur-xs transition-colors cursor-pointer"
                  >
                    <Heart
                      className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : 'text-slate-600'}`}
                    />
                  </button>

                  {/* Bottom Image Info */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{pkg.location}</span>
                    </div>
                    <h3 className="text-lg font-black leading-snug font-display drop-shadow-sm">
                      {pkg.title}
                    </h3>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                      {pkg.tagline}
                    </p>

                    {/* Rating & Duration */}
                    <div className="flex items-center justify-between py-2.5 border-y border-slate-100 text-xs">
                      <div className="flex items-center gap-1 font-bold text-slate-800">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span>{pkg.rating}</span>
                        <span className="text-slate-400 font-normal">({pkg.reviewsCount} reseñas)</span>
                      </div>

                      <div className="flex items-center gap-1 text-slate-600 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-amber-500" />
                        <span>{pkg.durationDays} días / {pkg.durationDays - 1} noches</span>
                      </div>
                    </div>

                    {/* Highlights bullet list */}
                    <div className="mt-3 space-y-1.5">
                      <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block">
                        Lo más destacado:
                      </span>
                      {pkg.highlights.slice(0, 3).map((hl, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer & Price */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-slate-400 block">Desde</span>
                      <span className="text-lg font-black text-slate-900 font-display">
                        {currency === 'COP'
                          ? `$${pkg.priceCOP.toLocaleString('es-CO')} COP`
                          : `$${pkg.priceUSD} USD`}
                      </span>
                    </div>

                    <button
                      onClick={() => onSelectPackage(pkg)}
                      className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Reservar</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
