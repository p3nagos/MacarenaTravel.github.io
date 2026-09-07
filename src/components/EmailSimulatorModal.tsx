import React, { useState } from 'react';
import {
  Mail,
  X,
  Plane,
  Sparkles,
  CheckCircle2,
  QrCode,
  Tag,
  Send,
  Bell,
  Clock,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { EmailNotification, BookingConfirmation } from '../types';
import { MacarenaLogo } from './MacarenaLogo';

interface EmailSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingList: BookingConfirmation[];
  userEmail?: string;
  onSubscribePromo: (email: string) => void;
}

export const EmailSimulatorModal: React.FC<EmailSimulatorModalProps> = ({
  isOpen,
  onClose,
  bookingList,
  userEmail = 'Duoswar@gmail.com',
  onSubscribePromo,
}) => {
  const [selectedTab, setSelectedTab] = useState<'inbox' | 'subscribe'>('inbox');
  const [activeEmailId, setActiveEmailId] = useState<string>('email-welcome');
  const [customEmail, setCustomEmail] = useState('');
  const [subscribedMessage, setSubscribedMessage] = useState(false);

  // Generate dynamic email list combining system promos + user confirmed bookings
  const emails: EmailNotification[] = [
    ...(bookingList.length > 0
      ? bookingList.map((b, idx) => ({
          id: `email-booking-${b.pnr}`,
          recipient: b.passenger.email || userEmail,
          subject: `✈️ E-Ticket Confirmado [PNR: ${b.pnr}] - Vuelo a ${b.flight.destinationCity}`,
          type: 'BOOKING_CONFIRMATION' as const,
          date: 'Hoy, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          read: false,
          previewSnippet: `¡Tu vuelo ${b.flight.flightNumber} con ${b.flight.airline} está garantizado! Asiento asignado: ${b.passenger.seat}...`,
          bookingData: b,
        }))
      : []),
    {
      id: 'email-promo-1',
      recipient: userEmail,
      subject: '🌴 [Macarena Travel] ¡Oferta Flash: 40% OFF a Caño Cristales & San Andrés!',
      type: 'PROMOTION',
      date: 'Hoy, 09:30 AM',
      read: true,
      previewSnippet: 'Aprovecha las tarifas de preventa para la temporada de floración de la Macarenia clavigera con vuelos directos...',
      promoCode: 'MACARENA40',
    },
    {
      id: 'email-welcome',
      recipient: userEmail,
      subject: '✨ Bienvenido a Macarena Travel: Descubre los mejores destinos de Colombia',
      type: 'PROMOTION',
      date: 'Ayer, 14:15 PM',
      read: true,
      previewSnippet: 'Gracias por registrarte. Disfruta de validación directa de vuelos, pasarela de pago 3D Secure y asesoría 24/7...',
      promoCode: 'BIENVENIDOVIAJERO',
    },
  ];

  const currentEmail = emails.find((e) => e.id === activeEmailId) || emails[0];

  const handleSubscribeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail) return;
    onSubscribePromo(customEmail);
    setSubscribedMessage(true);
    setTimeout(() => setSubscribedMessage(false), 3500);
    setCustomEmail('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500 text-white">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Centro de Notificaciones por Correo Electrónico</span>
                <span className="text-[11px] bg-amber-500/30 text-amber-300 font-semibold px-2 py-0.5 rounded-full">
                  {userEmail}
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Confirmaciones de reservas automáticas, E-Tickets y promociones exclusivas
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-4 px-6 border-b border-slate-200 bg-slate-50 text-xs font-bold">
          <button
            onClick={() => setSelectedTab('inbox')}
            className={`py-3 border-b-2 transition-all cursor-pointer ${
              selectedTab === 'inbox'
                ? 'border-amber-500 text-amber-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Bandeja de Entrada ({emails.length})
          </button>
          <button
            onClick={() => setSelectedTab('subscribe')}
            className={`py-3 border-b-2 transition-all cursor-pointer ${
              selectedTab === 'subscribe'
                ? 'border-amber-500 text-amber-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Suscripción a Promociones Exclusivas
          </button>
        </div>

        {/* TAB 1: INBOX & EMAIL PREVIEW */}
        {selectedTab === 'inbox' && (
          <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden min-h-[460px]">
            {/* Left list of emails */}
            <div className="md:col-span-5 border-r border-slate-200 overflow-y-auto max-h-[60vh] md:max-h-none divide-y divide-slate-100">
              {emails.map((email) => {
                const isSelected = email.id === currentEmail?.id;
                const isBooking = email.type === 'BOOKING_CONFIRMATION';
                return (
                  <button
                    key={email.id}
                    onClick={() => setActiveEmailId(email.id)}
                    className={`w-full text-left p-4 transition-colors cursor-pointer flex flex-col gap-1 ${
                      isSelected ? 'bg-amber-50/70 border-l-4 border-amber-500' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900 flex items-center gap-1.5">
                        {isBooking ? (
                          <Plane className="w-3.5 h-3.5 text-amber-600" />
                        ) : (
                          <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                        )}
                        <span>{isBooking ? 'E-Ticket Confirmado' : 'Promo Flash'}</span>
                      </span>
                      <span className="text-[10px] text-slate-400">{email.date}</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-800 line-clamp-1">
                      {email.subject}
                    </p>
                    <p className="text-[11px] text-slate-500 line-clamp-2">
                      {email.previewSnippet}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Right: Email Body Simulation */}
            <div className="md:col-span-7 p-6 overflow-y-auto bg-slate-50/60 max-h-[65vh]">
              {currentEmail && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
                  {/* Email Meta Header */}
                  <div className="border-b border-slate-100 pb-4">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                      <span>De: <strong>Macarena Travel &lt;notificaciones@macarenatravel.com&gt;</strong></span>
                      <span>{currentEmail.date}</span>
                    </div>
                    <p className="text-xs text-slate-500">Para: <strong>{currentEmail.recipient}</strong></p>
                    <h2 className="text-base font-extrabold text-slate-900 mt-2 font-display">
                      {currentEmail.subject}
                    </h2>
                  </div>

                  {/* Transactional Booking Email Content */}
                  {currentEmail.bookingData ? (
                    <div className="space-y-4 text-xs text-slate-700">
                      <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3 flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                        <div>
                          <p className="font-bold text-slate-900">¡Tu viaje está 100% confirmado!</p>
                          <p className="text-[11px] text-slate-600">
                            Validación directa con la aerolínea completada y pago aprobado.
                          </p>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 font-mono">
                        <div className="flex justify-between">
                          <span className="text-slate-500">PNR LOCATOR:</span>
                          <span className="font-black text-amber-600 text-sm">{currentEmail.bookingData.pnr}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">VUELO:</span>
                          <span className="font-bold text-slate-800">
                            {currentEmail.bookingData.flight.airline} ({currentEmail.bookingData.flight.flightNumber})
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">RUTA:</span>
                          <span>{currentEmail.bookingData.flight.originCity} ({currentEmail.bookingData.flight.origin}) → {currentEmail.bookingData.flight.destinationCity} ({currentEmail.bookingData.flight.destination})</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">PASAJERO:</span>
                          <span>{currentEmail.bookingData.passenger.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">ASIENTO ASIGNADO:</span>
                          <span className="font-bold text-amber-600">{currentEmail.bookingData.passenger.seat}</span>
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-500 space-y-1">
                        <p>• Presentarse en el aeropuerto con 2 horas de anticipación para vuelos nacionales y 3 horas para internacionales.</p>
                        <p>• Incluye 1 pieza de equipaje de mano (10kg) y 1 maleta de bodega (23kg).</p>
                        <p>• Para asistencia inmediata contáctanos a través del Chat Concierge 24/7 de Macarena Travel.</p>
                      </div>
                    </div>
                  ) : (
                    /* Promotional Newsletter Content */
                    <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
                      <p>
                        Estimado viajero, te presentamos nuestras promociones exclusivas de esta semana para destinos mágicos en Colombia e internacionales.
                      </p>

                      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl p-4 shadow-md">
                        <h3 className="text-sm font-black mb-1 font-display">
                          Caño Cristales & Playas de San Andrés: 40% OFF
                        </h3>
                        <p className="text-xs text-amber-100 mb-3">
                          Usa el cupón exclusivo en tu próxima reserva antes del 30 de septiembre.
                        </p>
                        <div className="inline-block bg-white text-slate-900 font-mono font-black px-3 py-1.5 rounded-lg text-xs tracking-wider shadow-xs">
                          {currentEmail.promoCode || 'MACARENA40'}
                        </div>
                      </div>

                      <p>
                        Recuerda que con nuestro motor de búsqueda puedes fijar tu presupuesto y el sistema reservará automáticamente la mejor opción disponible en Avianca, LATAM, Wingo o Satena.
                      </p>
                    </div>
                  )}

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Macarena Travel S.A.S. • NIT 901.482.910-4</span>
                    <span className="text-emerald-600 font-bold">Email Autenticado DKIM / SPF</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: SUBSCRIBE TO PROMOTIONS */}
        {selectedTab === 'subscribe' && (
          <div className="p-8 max-w-lg mx-auto text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
              <Mail className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-black text-slate-900 font-display">
                Suscríbete a Notificaciones de Promociones Exclusivas
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Recibe en tu correo alertas anticipadas de vuelos con hasta 40% de descuento y la apertura de cupos para Caño Cristales.
              </p>
            </div>

            <form onSubmit={handleSubscribeSubmit} className="space-y-3 text-left">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  placeholder="tu.correo@ejemplo.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:bg-white focus:border-amber-500 focus:outline-hidden"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer"
              >
                Suscribirme a Alertas de Vuelos
              </button>
            </form>

            {subscribedMessage && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl animate-in fade-in">
                ✅ ¡Te has suscrito con éxito! Recibirás nuestras próximas promociones.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
