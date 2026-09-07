import React from 'react';
import {
  Plane,
  Download,
  Mail,
  QrCode,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  Luggage,
  ShieldCheck,
  Search
} from 'lucide-react';
import { BookingConfirmation } from '../types';

interface MyBookingsViewProps {
  bookings: BookingConfirmation[];
  currency: 'COP' | 'USD';
  onGoToSearch: () => void;
}

export const MyBookingsView: React.FC<MyBookingsViewProps> = ({
  bookings,
  currency,
  onGoToSearch,
}) => {
  return (
    <section id="mis-reservas" className="py-12 bg-slate-50 min-h-[600px]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Mis Reservas Aéreas Validadas</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
              Tus Vuelos & E-Tickets Confirmados
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Consulta el estado de tu PNR en tiempo real, asignación de asientos y descarga de pasabordos.
            </p>
          </div>

          <button
            onClick={onGoToSearch}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-md flex items-center gap-2 cursor-pointer self-start sm:self-auto"
          >
            <Search className="w-4 h-4" />
            <span>Reservar Nuevo Vuelo</span>
          </button>
        </div>

        {/* Empty state or bookings list */}
        {bookings.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-lg mx-auto">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plane className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-black text-slate-900 font-display mb-1">
              Aún no tienes vuelos confirmados
            </h3>
            <p className="text-xs text-slate-600 mb-6">
              Utiliza nuestro motor de búsqueda para definir tu presupuesto y validar tu reserva automática con las mejores aerolíneas aliadas.
            </p>
            <button
              onClick={onGoToSearch}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white text-xs font-black rounded-xl shadow-md cursor-pointer"
            >
              Comenzar Búsqueda de Vuelos
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking.pnr}
                className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden"
              >
                {/* Top Banner with PNR & Status */}
                <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 font-black flex items-center justify-center border border-amber-400/30">
                      {booking.flight.airlineCode}
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-white">
                        {booking.flight.airline} • Vuelo {booking.flight.flightNumber}
                      </h4>
                      <p className="text-xs text-slate-300">
                        Código PNR: <span className="font-mono font-black text-amber-400">{booking.pnr}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Reserva Confirmada</span>
                    </span>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  {/* Route & Times */}
                  <div className="lg:col-span-6 grid grid-cols-3 items-center text-center bg-slate-50 p-4 rounded-2xl">
                    <div className="text-left">
                      <span className="text-2xl font-black text-slate-900 font-display">
                        {booking.flight.origin}
                      </span>
                      <p className="text-xs font-bold text-slate-700">{booking.flight.originCity}</p>
                      <p className="text-xs text-amber-600 font-bold">{booking.flight.departureTime}</p>
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="text-[11px] font-semibold text-slate-400">{booking.flight.duration}</span>
                      <div className="w-full flex items-center justify-center my-1 relative">
                        <div className="w-full h-0.5 bg-slate-300" />
                        <Plane className="w-3.5 h-3.5 text-amber-500 rotate-90 absolute" />
                      </div>
                      <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                        {booking.flight.stops === 0 ? 'Directo' : `${booking.flight.stops} escala`}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-2xl font-black text-slate-900 font-display">
                        {booking.flight.destination}
                      </span>
                      <p className="text-xs font-bold text-slate-700">{booking.flight.destinationCity}</p>
                      <p className="text-xs text-amber-600 font-bold">{booking.flight.arrivalTime}</p>
                    </div>
                  </div>

                  {/* Passenger & Ticket Specs */}
                  <div className="lg:col-span-3 text-xs space-y-2">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Pasajero</span>
                      <span className="font-bold text-slate-800">{booking.passenger.name}</span>
                    </div>
                    <div className="flex gap-4">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Asiento</span>
                        <span className="font-mono font-black text-amber-600 text-sm">{booking.passenger.seat}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Puerta</span>
                        <span className="font-bold text-slate-800">{booking.passenger.gate} (T1)</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">E-Ticket Digital</span>
                      <span className="font-mono text-slate-600">{booking.ticketNumber}</span>
                    </div>
                  </div>

                  {/* Actions & QR */}
                  <div className="lg:col-span-3 flex flex-col items-center lg:items-end gap-3 border-t lg:border-t-0 border-slate-100 pt-4 lg:pt-0">
                    <div className="flex items-center gap-2">
                      <QrCode className="w-12 h-12 text-slate-800" />
                      <div className="text-right text-xs">
                        <span className="text-slate-400 block text-[10px]">Total Pagado</span>
                        <span className="font-black text-slate-900 text-base font-display">
                          {currency === 'COP'
                            ? `$${booking.payment.amount.toLocaleString('es-CO')} COP`
                            : `$${booking.payment.amount} USD`}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => alert(`Descargando E-Ticket PDF para la reserva PNR: ${booking.pnr}`)}
                        className="flex-1 sm:flex-initial px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>PDF</span>
                      </button>

                      <button
                        onClick={() => alert(`Confirmación reenviada a ${booking.passenger.email}`)}
                        className="flex-1 sm:flex-initial px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Reenviar</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
