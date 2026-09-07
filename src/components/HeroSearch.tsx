import React, { useState } from 'react';
import {
  Plane,
  Calendar,
  Users,
  DollarSign,
  Sliders,
  CheckCircle2,
  Sparkles,
  ArrowRightLeft,
  Luggage,
  ShieldCheck,
  Zap,
  MapPin,
  ChevronDown
} from 'lucide-react';
import { Flight } from '../types';

interface HeroSearchProps {
  currency: 'COP' | 'USD';
  onSearchFlights: (criteria: any) => void;
  onSelectQuickDestination: (destName: string) => void;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  currency,
  onSearchFlights,
  onSelectQuickDestination,
}) => {
  const [searchTab, setSearchTab] = useState<'flights' | 'packages' | 'hotels'>('flights');
  const [origin, setOrigin] = useState('Bogotá (BOG)');
  const [destination, setDestination] = useState('La Macarena - Caño Cristales (LMC)');
  const [departureDate, setDepartureDate] = useState('2026-09-18');
  const [returnDate, setReturnDate] = useState('2026-09-22');
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState<'economy' | 'premium_economy' | 'business'>('economy');

  // Customer Budget & Airline Preferences for the Auto-Booking Engine
  const defaultBudget = currency === 'COP' ? 1500000 : 380;
  const [maxBudget, setMaxBudget] = useState<number>(defaultBudget);
  const [preferDirect, setPreferDirect] = useState(true);
  const [preferBaggage, setPreferBaggage] = useState(true);
  const [selectedAirline, setSelectedAirline] = useState('Todas (Mejor Tarifa)');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Quick swap origin & destination
  const handleSwapRoute = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchFlights({
      origin,
      destination,
      departureDate,
      returnDate,
      passengers,
      cabinClass,
      maxBudget,
      currency,
      preferDirect,
      preferBaggage,
      selectedAirline,
    });
  };

  const quickDestinations = [
    { name: 'La Macarena (Caño Cristales)', code: 'LMC', emoji: '🌈', tag: 'Top Insignia' },
    { name: 'San Andrés Islas', code: 'ADZ', emoji: '🏖️', tag: 'Playa' },
    { name: 'Cartagena de Indias', code: 'CTG', emoji: '🏰', tag: 'Colonial' },
    { name: 'Santa Marta (Tayrona)', code: 'SMR', emoji: '🌴', tag: 'Aventura' },
    { name: 'Cancún, México', code: 'CUN', emoji: '☀️', tag: 'Caribe' },
    { name: 'Madrid, España', code: 'MAD', emoji: '🇪🇸', tag: 'Europa' },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white pt-10 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Subtle background ambient travel glow */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero Brand Title */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-semibold mb-4 backdrop-blur-xs">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Reserva Inteligente de Vuelos con Validación Directa en Aerolíneas</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight font-display text-white mb-4 leading-tight">
            Descubre el Mundo con <br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 bg-clip-text text-transparent">
              Macarena Travel
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Especialistas en <strong>Caño Cristales</strong>, playas del Caribe y destinos globales. 
            Nuestro motor analiza inventarios de aerolíneas en tiempo real y reserva automáticamente tu vuelo ideal respetando tu presupuesto.
          </p>
        </div>

        {/* Main Search & Booking Box */}
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/90 text-slate-800 p-4 sm:p-6 lg:p-8 backdrop-blur-xl">
          {/* Tab Selector */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-6 border-b border-slate-100 pb-4">
            <button
              onClick={() => setSearchTab('flights')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                searchTab === 'flights'
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Plane className="w-4 h-4" />
              <span>Vuelos con Validación Directa</span>
            </button>
            <button
              onClick={() => setSearchTab('packages')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                searchTab === 'packages'
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Paquetes Macarena & Caribe</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Origin, Destination & Swap */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              {/* Origin */}
              <div className="md:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-3.5 hover:border-amber-400 transition-colors">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Origen
                </label>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  <select
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full bg-transparent font-bold text-slate-800 focus:outline-hidden text-sm sm:text-base cursor-pointer"
                  >
                    <option value="Bogotá (BOG)">Bogotá (BOG) - El Dorado</option>
                    <option value="Medellín (MDE)">Medellín (MDE) - J.M. Córdova</option>
                    <option value="Cali (CLO)">Cali (CLO) - Alfonso Bonilla</option>
                    <option value="Barranquilla (BAQ)">Barranquilla (BAQ) - Cortissoz</option>
                    <option value="Cartagena (CTG)">Cartagena (CTG) - Rafael Núñez</option>
                  </select>
                </div>
              </div>

              {/* Swap Route Button */}
              <div className="md:col-span-2 flex justify-center -my-2 md:my-0">
                <button
                  type="button"
                  onClick={handleSwapRoute}
                  className="p-3 rounded-full bg-slate-100 hover:bg-amber-50 text-slate-600 hover:text-amber-600 border border-slate-200 shadow-xs transition-transform active:rotate-180 cursor-pointer"
                  title="Intercambiar origen y destino"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                </button>
              </div>

              {/* Destination */}
              <div className="md:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-3.5 hover:border-amber-400 transition-colors">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Destino
                </label>
                <div className="flex items-center gap-2">
                  <Plane className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-transparent font-bold text-slate-800 focus:outline-hidden text-sm sm:text-base cursor-pointer"
                  >
                    <option value="La Macarena - Caño Cristales (LMC)">🌈 La Macarena (LMC) - Caño Cristales</option>
                    <option value="Cartagena (CTG)">🏰 Cartagena de Indias (CTG)</option>
                    <option value="San Andrés Islas (ADZ)">🏖️ San Andrés Islas (ADZ)</option>
                    <option value="Santa Marta (SMR)">🌴 Santa Marta (SMR) - Tayrona</option>
                    <option value="Cancún (CUN)">☀️ Cancún, México (CUN)</option>
                    <option value="Madrid (MAD)">🇪🇸 Madrid, España (MAD)</option>
                    <option value="Miami (MIA)">🇺🇸 Miami, EE.UU. (MIA)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Dates, Passengers & Cabin Class */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Departure Date */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 hover:border-amber-400 transition-colors">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Fecha de Ida</span>
                </label>
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="w-full bg-transparent font-bold text-slate-800 text-sm focus:outline-hidden cursor-pointer"
                />
              </div>

              {/* Return Date */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 hover:border-amber-400 transition-colors">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Fecha de Regreso</span>
                </label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full bg-transparent font-bold text-slate-800 text-sm focus:outline-hidden cursor-pointer"
                />
              </div>

              {/* Passengers */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 hover:border-amber-400 transition-colors">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span>Pasajeros</span>
                </label>
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="w-full bg-transparent font-bold text-slate-800 text-sm focus:outline-hidden cursor-pointer"
                >
                  <option value={1}>1 Pasajero Adulto</option>
                  <option value={2}>2 Pasajeros (Pareja)</option>
                  <option value={3}>3 Pasajeros</option>
                  <option value={4}>4 Pasajeros (Familia)</option>
                  <option value={5}>5+ Pasajeros (Grupo)</option>
                </select>
              </div>

              {/* Cabin Class */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 hover:border-amber-400 transition-colors">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Clase de Cabina
                </label>
                <select
                  value={cabinClass}
                  onChange={(e) => setCabinClass(e.target.value as any)}
                  className="w-full bg-transparent font-bold text-slate-800 text-sm focus:outline-hidden cursor-pointer"
                >
                  <option value="economy">Económica Turista</option>
                  <option value="premium_economy">Premium Economy</option>
                  <option value="business">Ejecutiva / Business</option>
                </select>
              </div>
            </div>

            {/* KEY FEATURE: Direct Airline Validation Engine & Budget Selector */}
            <div className="bg-gradient-to-r from-amber-50 via-orange-50/70 to-sky-50 border border-amber-200/80 rounded-2xl p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-amber-500 text-white">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">
                      Presupuesto Máximo Seleccionado por Pasajero
                    </h2>
                    <p className="text-xs text-slate-600">
                      El validador de Macarena Travel analizará aerolíneas aliadas para reservar automáticamente sin exceder este valor.
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xl sm:text-2xl font-black text-amber-700 font-display">
                    {currency === 'COP'
                      ? `$${maxBudget.toLocaleString('es-CO')} COP`
                      : `$${maxBudget} USD`}
                  </span>
                </div>
              </div>

              {/* Range Slider */}
              <div className="space-y-2">
                <input
                  type="range"
                  min={currency === 'COP' ? 300000 : 70}
                  max={currency === 'COP' ? 6000000 : 1500}
                  step={currency === 'COP' ? 50000 : 25}
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(Number(e.target.value))}
                  className="w-full accent-amber-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />

                {/* Quick Budget Chips */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-xs text-slate-500 font-medium">Ajuste rápido:</span>
                  {(currency === 'COP' ? [500000, 1000000, 1500000, 2500000, 4000000] : [120, 250, 380, 600, 1000]).map((preset) => (
                    <button
                      type="button"
                      key={preset}
                      onClick={() => setMaxBudget(preset)}
                      className={`text-xs px-2.5 py-1 rounded-lg border font-semibold transition-colors cursor-pointer ${
                        maxBudget === preset
                          ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-amber-400'
                      }`}
                    >
                      {currency === 'COP' ? `$${(preset / 1000000 >= 1 ? (preset / 1000000).toFixed(1) + 'M' : (preset / 1000) + 'k')} COP` : `$${preset} USD`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferences Checklist: Direct, Baggage, Airline */}
              <div className="mt-4 pt-3 border-t border-amber-200/60 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferDirect}
                    onChange={(e) => setPreferDirect(e.target.checked)}
                    className="w-4 h-4 rounded-sm text-amber-500 focus:ring-amber-400 accent-amber-500 cursor-pointer"
                  />
                  <span>Priorizar vuelos directos</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferBaggage}
                    onChange={(e) => setPreferBaggage(e.target.checked)}
                    className="w-4 h-4 rounded-sm text-amber-500 focus:ring-amber-400 accent-amber-500 cursor-pointer"
                  />
                  <span>Incluir maleta en bodega (23kg)</span>
                </label>

                <div className="flex items-center gap-1 text-xs">
                  <span className="text-slate-500 font-medium">Aerolínea:</span>
                  <select
                    value={selectedAirline}
                    onChange={(e) => setSelectedAirline(e.target.value)}
                    className="bg-white border border-slate-200 rounded-md px-2 py-1 text-xs font-bold text-slate-800 focus:outline-hidden cursor-pointer"
                  >
                    <option value="Todas (Mejor Tarifa)">Mejor Tarifa Algorítmica</option>
                    <option value="Avianca">Avianca (AV)</option>
                    <option value="LATAM Airlines">LATAM Airlines (LA)</option>
                    <option value="Wingo">Wingo (P5)</option>
                    <option value="Copa Airlines">Copa Airlines (CM)</option>
                    <option value="Satena">Satena (9R)</option>
                    <option value="Iberia">Iberia (IB)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Action Button & Security Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-3 text-xs text-slate-600">
                <div className="flex items-center gap-1 text-emerald-600 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Validación Directa con GDS de Aerolíneas</span>
                </div>
                <span className="text-slate-300">•</span>
                <span>Bloqueo de tarifa sin cobros ocultos</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-base shadow-lg hover:shadow-xl transition-all transform active:scale-98 flex items-center justify-center gap-3 cursor-pointer"
              >
                <Zap className="w-5 h-5 text-amber-200 fill-amber-200" />
                <span>Buscar & Validar Vuelos en Tiempo Real</span>
              </button>
            </div>
          </form>
        </div>

        {/* Quick Destiniations Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <span className="text-xs text-slate-400 font-medium">Destinos populares:</span>
          {quickDestinations.map((dest) => (
            <button
              key={dest.code}
              onClick={() => {
                setDestination(`${dest.name} (${dest.code})`);
                onSelectQuickDestination(dest.name);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700/90 text-xs font-semibold text-slate-200 border border-slate-700 hover:border-amber-400 transition-all cursor-pointer backdrop-blur-xs"
            >
              <span>{dest.emoji}</span>
              <span>{dest.name}</span>
              <span className="text-[10px] bg-amber-500/30 text-amber-300 px-1.5 py-0.2 rounded-full">
                {dest.tag}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
