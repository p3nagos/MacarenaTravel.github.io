import React from 'react';
import {
  Plane,
  Clock,
  Luggage,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Zap,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Flight } from '../types';

interface FlightResultsViewProps {
  flights: Flight[];
  searchCriteria: any;
  currency: 'COP' | 'USD';
  onSelectFlightToBook: (flight: Flight) => void;
}

export const FlightResultsView: React.FC<FlightResultsViewProps> = ({
  flights,
  searchCriteria,
  currency,
  onSelectFlightToBook,
}) => {
  const maxBudget = searchCriteria?.maxBudget || (currency === 'COP' ? 1500000 : 380);

  return (
    <section id="vuelos" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Search Criteria Summary */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-8 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold mb-3 border border-amber-400/30">
                <Zap className="w-3.5 h-3.5 fill-amber-300" />
                <span>Resultados con Validación Directa en Sistemas GDS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
                Vuelos Disponibles en Tiempo Real
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Comparativa entre <strong>Avianca, LATAM, Wingo, Satena, Copa e Iberia</strong>. Al pagar se valida automáticamente tu cupo sin cobros adicionales.
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 text-xs space-y-1">
              <span className="text-slate-400 block font-medium">Tu Presupuesto Máximo:</span>
              <span className="text-lg sm:text-xl font-black text-amber-400 font-display">
                {currency === 'COP' ? `$${Number(maxBudget).toLocaleString('es-CO')} COP` : `$${maxBudget} USD`}
              </span>
              <p className="text-[11px] text-slate-400">
                {searchCriteria?.preferDirect ? '✓ Priorizar Directos' : ''} • {searchCriteria?.preferBaggage ? '✓ Maleta 23kg' : ''}
              </p>
            </div>
          </div>
        </div>

        {/* Flight Cards List */}
        <div className="space-y-4">
          {flights.map((flight) => {
            const flightPrice = currency === 'COP' ? flight.priceCOP : flight.priceUSD;
            const isWithinBudget = flightPrice <= maxBudget;

            return (
              <div
                key={flight.id}
                className="bg-white rounded-3xl border border-slate-200/90 hover:border-amber-400 shadow-xs hover:shadow-xl transition-all duration-300 p-5 sm:p-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  
                  {/* Airline Info & Flight Number */}
                  <div className="lg:col-span-3 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-slate-800 text-sm shadow-xs border border-slate-200">
                      {flight.airlineCode}
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-tight">
                        {flight.airline}
                      </h3>
                      <p className="text-xs text-slate-500">{flight.flightNumber} • {flight.aircraft}</p>
                      <span className="inline-block text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold mt-1">
                        {flight.cabinClass === 'economy' ? 'Económica' : 'Premium'}
                      </span>
                    </div>
                  </div>

                  {/* Flight Times & Duration Graphic */}
                  <div className="lg:col-span-5 grid grid-cols-3 items-center text-center">
                    <div className="text-left">
                      <span className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                        {flight.departureTime}
                      </span>
                      <p className="text-xs font-bold text-slate-700">{flight.origin}</p>
                      <p className="text-[11px] text-slate-400">{flight.originCity}</p>
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="text-[11px] font-semibold text-slate-400">{flight.duration}</span>
                      <div className="w-full flex items-center justify-center my-1 relative">
                        <div className="w-full h-0.5 bg-slate-200" />
                        <Plane className="w-3.5 h-3.5 text-amber-500 rotate-90 absolute" />
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                        {flight.stops === 0 ? 'Directo' : `${flight.stops} escala`}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                        {flight.arrivalTime}
                      </span>
                      <p className="text-xs font-bold text-slate-700">{flight.destination}</p>
                      <p className="text-[11px] text-slate-400">{flight.destinationCity}</p>
                    </div>
                  </div>

                  {/* Amenities (Baggage, Seats) */}
                  <div className="lg:col-span-2 text-xs text-slate-600 space-y-1.5 border-t lg:border-t-0 lg:border-l border-slate-100 pt-3 lg:pt-0 lg:pl-4">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Luggage className="w-3.5 h-3.5 text-slate-400" />
                      <span>{flight.baggageIncluded ? 'Equipaje 23kg incl.' : 'Solo equipaje mano'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-orange-600 font-semibold">{flight.availableSeats} cupos restantes</span>
                    </div>
                    {isWithinBudget ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>En tu presupuesto</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                        <AlertCircle className="w-3 h-3 text-amber-600" />
                        <span>Supera presupuesto</span>
                      </span>
                    )}
                  </div>

                  {/* Price & Book Action */}
                  <div className="lg:col-span-2 flex flex-row lg:flex-col items-center lg:items-end justify-between gap-3 border-t lg:border-t-0 border-slate-100 pt-3 lg:pt-0">
                    <div className="text-left lg:text-right">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Por persona</span>
                      <span className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                        {currency === 'COP' ? `$${flight.priceCOP.toLocaleString('es-CO')}` : `$${flight.priceUSD}`}
                      </span>
                      <span className="text-[10px] text-slate-500 block font-semibold">{currency} final con tasas</span>
                    </div>

                    <button
                      onClick={() => onSelectFlightToBook(flight)}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-black shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Validar & Pagar</span>
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
