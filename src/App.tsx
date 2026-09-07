import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSearch } from './components/HeroSearch';
import { FlightResultsView } from './components/FlightResultsView';
import { DestinationsSection } from './components/DestinationsSection';
import { BlogSection } from './components/BlogSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BookingValidationModal } from './components/BookingValidationModal';
import { EmailSimulatorModal } from './components/EmailSimulatorModal';
import { PushNotificationCenter } from './components/PushNotificationCenter';
import { ChatConcierge } from './components/ChatConcierge';
import { MyBookingsView } from './components/MyBookingsView';
import { Footer } from './components/Footer';
import { FLIGHTS_DATA, DESTINATIONS_DATA } from './data/mockData';
import { Flight, BookingConfirmation, DestinationPackage, PushNotification } from './types';
import {
  ShieldCheck,
  Zap,
  Sparkles,
  Plane,
  Bell,
  X,
  CreditCard,
  Lock,
  Headphones,
  CheckCircle2,
  Calendar
} from 'lucide-react';

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<'home' | 'vuelos' | 'paquetes' | 'blog' | 'testimonios' | 'mis-reservas'>('home');
  const [currency, setCurrency] = useState<'COP' | 'USD'>('COP');

  // Search criteria for flights
  const [searchCriteria, setSearchCriteria] = useState({
    origin: 'Bogotá (BOG)',
    destination: 'La Macarena - Caño Cristales (LMC)',
    departureDate: '2026-09-18',
    returnDate: '2026-09-22',
    passengers: 1,
    cabinClass: 'economy',
    maxBudget: 1500000,
    currency: 'COP',
    preferDirect: true,
    preferBaggage: true,
    selectedAirline: 'Todas (Mejor Tarifa)',
  });

  // Modal controls
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedFlightForBooking, setSelectedFlightForBooking] = useState<Flight | null>(null);

  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isPushCenterOpen, setIsPushCenterOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Real-time Push Notifications State
  const [notifications, setNotifications] = useState<PushNotification[]>([
    {
      id: 'notif-1',
      title: '✈️ Bienvenido a Macarena Travel',
      body: 'Tu sesión está activa con cifrado seguro y enlace directo a aerolíneas.',
      time: 'Hace un momento',
      read: false,
      type: 'flight_status',
    },
    {
      id: 'notif-2',
      title: '🌈 Temporada Caño Cristales 2026',
      body: 'Cupos aéreos habilitados para septiembre y octubre. Reserva con tarifa protegida.',
      time: 'Hoy',
      read: false,
      type: 'promo',
    },
  ]);

  // Toast banner for newly incoming push alert
  const [activeToast, setActiveToast] = useState<{ title: string; body: string } | null>(null);

  // Confirmed Bookings list (with 1 initial confirmed flight to show immediate value)
  const [bookings, setBookings] = useState<BookingConfirmation[]>([
    {
      status: 'CONFIRMED',
      pnr: 'MC8291A',
      ticketNumber: '134-9284102941',
      issuedAt: '2026-09-06T14:30:00Z',
      flight: {
        id: 'AV-9421',
        airline: 'Avianca',
        airlineCode: 'AV',
        flightNumber: 'AV 9421',
        airlineLogo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=100&auto=format&fit=crop&q=60',
        origin: 'BOG',
        originCity: 'Bogotá',
        originAirport: 'El Dorado (BOG)',
        destination: 'LMC',
        destinationCity: 'La Macarena (Caño Cristales)',
        destinationAirport: 'Javier Cortissoz (LMC)',
        departureTime: '06:15',
        arrivalTime: '07:30',
        duration: '1h 15m',
        stops: 0,
        aircraft: 'ATR 42-600',
        cabinClass: 'economy',
        priceCOP: 480000,
        priceUSD: 120,
        availableSeats: 6,
        baggageIncluded: true,
        refundable: true,
      },
      passenger: {
        name: 'Duoswar Viajero',
        document: 'CC 1098234509',
        email: 'Duoswar@gmail.com',
        phone: '+57 312 456 7890',
        seat: '08A (Ventana)',
        gate: 'G2',
        terminal: 'T1',
        boardingTime: '05:30',
      },
      payment: {
        status: 'APPROVED',
        method: 'Tarjeta Débito (3D Secure)',
        currency: 'COP',
        amount: 480000,
        authorizationCode: 'AUTH-942810',
        securityHash: 'SHA256-TOKEN-AVIANCA',
      },
      validationAudit: {
        engine: 'Macarena Direct Airline Reservation Engine v2.4',
        latencyMs: 310,
        airlinesQueried: ['Avianca (AV)', 'LATAM Airlines (LA)', 'Satena (9R)', 'Wingo (P5)'],
        budgetRequested: 1500000,
        criteriaMatchScore: '99/100',
        verificationBadge: 'CERTIFICADO IATA / ANATO',
      },
    },
  ]);

  // Handler for triggering push notification
  const handleTriggerPushNotification = (
    title: string,
    body: string,
    type: 'booking' | 'flight_status' | 'promo' = 'booking'
  ) => {
    const newNotif: PushNotification = {
      id: `push-${Date.now()}`,
      title,
      body,
      time: 'Ahora',
      read: false,
      type,
    };

    setNotifications((prev) => [newNotif, ...prev]);

    // Trigger visual toast
    setActiveToast({ title, body });
    setTimeout(() => {
      setActiveToast(null);
    }, 6000);
  };

  // Handler when user performs search in HeroSearch
  const handleSearchFlights = (criteria: any) => {
    setSearchCriteria(criteria);
    setActiveTab('vuelos');
    // Scroll to results
    window.scrollTo({ top: 380, behavior: 'smooth' });
    handleTriggerPushNotification(
      '🔍 Búsqueda y Validación en Progreso',
      `Auditando tarifas para la ruta ${criteria.origin} → ${criteria.destination} sin exceder tu presupuesto.`,
      'flight_status'
    );
  };

  // Handler for quick destination buttons
  const handleSelectQuickDestination = (destName: string) => {
    setActiveTab('vuelos');
  };

  // Handler to open booking modal for a specific flight
  const handleSelectFlightToBook = (flight: Flight) => {
    setSelectedFlightForBooking(flight);
    setIsBookingModalOpen(true);
  };

  // Handler to open booking modal from a destination package
  const handleSelectPackage = (pkg: DestinationPackage) => {
    const matchedFlight = FLIGHTS_DATA.find((f) => f.destinationCity.includes(pkg.location.split(',')[0])) || FLIGHTS_DATA[0];
    setSelectedFlightForBooking(matchedFlight);
    setIsBookingModalOpen(true);
  };

  // Handler when booking is validated and confirmed
  const handleBookingSuccess = (newBooking: BookingConfirmation) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const unreadNotificationsCount = (notifications || []).filter((n) => !n.read).length;

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans antialiased selection:bg-amber-500 selection:text-white">
      
      {/* Top Real-time Push Alert Toast (if triggered) */}
      {activeToast && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 max-w-md w-full bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border border-amber-500/50 flex items-start justify-between gap-3 animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-500 text-white flex-shrink-0 mt-0.5">
              <Bell className="w-4 h-4 animate-bounce" />
            </div>
            <div className="text-xs">
              <p className="font-bold text-amber-300">{activeToast.title}</p>
              <p className="text-slate-300 mt-0.5 leading-relaxed">{activeToast.body}</p>
            </div>
          </div>
          <button
            onClick={() => setActiveToast(null)}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Responsive Header / Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currency={currency}
        setCurrency={setCurrency}
        notifications={notifications}
        onOpenNotifications={() => setIsPushCenterOpen(true)}
        onOpenEmailInbox={() => setIsEmailModalOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenMyBookings={() => {
          setActiveTab('mis-reservas');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        confirmedBookingsCount={bookings.length}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {/* HERO SECTION: Visible on 'home' and 'vuelos' */}
        {(activeTab === 'home' || activeTab === 'vuelos') && (
          <HeroSearch
            currency={currency}
            onSearchFlights={handleSearchFlights}
            onSelectQuickDestination={handleSelectQuickDestination}
          />
        )}

        {/* FEATURE HIGHLIGHTS BAR */}
        {activeTab === 'home' && (
          <div className="bg-slate-900 text-white py-6 border-y border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold">Validación Directa</h4>
                  <p className="text-[11px] text-slate-400">Reserva automática al pagar</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold">Pagos Seguros</h4>
                  <p className="text-[11px] text-slate-400">3D Secure, PSE y PayPal</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold">Alertas en Tiempo Real</h4>
                  <p className="text-[11px] text-slate-400">Push y correo electrónico</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold">Atención 24/7</h4>
                  <p className="text-[11px] text-slate-400">Concierge con IA en vivo</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB VIEWS */}
        {activeTab === 'home' && (
          <>
            <FlightResultsView
              flights={FLIGHTS_DATA.slice(0, 4)}
              searchCriteria={searchCriteria}
              currency={currency}
              onSelectFlightToBook={handleSelectFlightToBook}
            />
            <DestinationsSection
              currency={currency}
              onSelectPackage={handleSelectPackage}
            />
            <BlogSection
              onBookDestination={(dest) => {
                setActiveTab('vuelos');
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
            />
            <TestimonialsSection />
          </>
        )}

        {activeTab === 'vuelos' && (
          <FlightResultsView
            flights={FLIGHTS_DATA}
            searchCriteria={searchCriteria}
            currency={currency}
            onSelectFlightToBook={handleSelectFlightToBook}
          />
        )}

        {activeTab === 'paquetes' && (
          <DestinationsSection
            currency={currency}
            onSelectPackage={handleSelectPackage}
          />
        )}

        {activeTab === 'blog' && (
          <BlogSection
            onBookDestination={(dest) => {
              setActiveTab('vuelos');
              window.scrollTo({ top: 300, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'testimonios' && (
          <TestimonialsSection />
        )}

        {activeTab === 'mis-reservas' && (
          <MyBookingsView
            bookings={bookings}
            currency={currency}
            onGoToSearch={() => {
              setActiveTab('vuelos');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* MODAL 1: DIRECT AIRLINE VALIDATION & SECURE PAYMENT */}
      <BookingValidationModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        flightData={selectedFlightForBooking}
        searchCriteria={searchCriteria}
        currency={currency}
        onBookingSuccess={handleBookingSuccess}
        onTriggerPushNotification={handleTriggerPushNotification}
      />

      {/* MODAL 2: EMAIL NOTIFICATIONS SIMULATOR & PROMOTIONS */}
      <EmailSimulatorModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        bookingList={bookings}
        userEmail="Duoswar@gmail.com"
        onSubscribePromo={(email) => {
          handleTriggerPushNotification(
            '📩 Suscripción Confirmada',
            `Te has suscrito con éxito a las ofertas exclusivas con el correo: ${email}`,
            'promo'
          );
        }}
      />

      {/* MODAL 3: PUSH NOTIFICATION CENTER */}
      <PushNotificationCenter
        isOpen={isPushCenterOpen}
        onClose={() => setIsPushCenterOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={() => {
          setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
        }}
        onClearAll={() => setNotifications([])}
        onSendTestNotification={() => {
          handleTriggerPushNotification(
            '🔔 Alerta de Vuelo en Tiempo Real',
            'Tu vuelo AV 9421 a Caño Cristales se encuentra a tiempo. Puerta G2 asignada.',
            'flight_status'
          );
        }}
      />

      {/* MODAL 4: PERSONALIZED CUSTOMER SERVICE CHAT (GEMINI POWERED) */}
      <ChatConcierge
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
        onNavigateTab={(tab) => {
          setActiveTab(tab as any);
          setIsChatOpen(false);
        }}
      />

      {/* Footer */}
      <Footer
        onOpenEmailModal={() => setIsEmailModalOpen(true)}
        onNavigateTab={(tab) => {
          setActiveTab(tab as any);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}

