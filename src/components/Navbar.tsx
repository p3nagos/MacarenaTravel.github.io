import React, { useState } from 'react';
import { MacarenaLogo } from './MacarenaLogo';
import {
  Bell,
  Mail,
  Menu,
  X,
  Plane,
  Compass,
  BookOpen,
  MessageCircle,
  Star,
  ShieldCheck,
  Globe,
  ChevronDown
} from 'lucide-react';
import { PushNotification } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currency: 'COP' | 'USD';
  setCurrency: (c: 'COP' | 'USD') => void;
  notifications?: PushNotification[];
  onOpenNotifications: () => void;
  onOpenEmailInbox: () => void;
  onOpenChat: () => void;
  onOpenMyBookings: () => void;
  confirmedBookingsCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currency,
  setCurrency,
  notifications = [],
  onOpenNotifications,
  onOpenEmailInbox,
  onOpenChat,
  onOpenMyBookings,
  confirmedBookingsCount = 0,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const unreadNotifs = (notifications || []).filter(n => !n.read).length;

  const navLinks = [
    { id: 'vuelos', label: 'Vuelos & Reservas', icon: Plane },
    { id: 'paquetes', label: 'Paquetes Turísticos', icon: Compass },
    { id: 'blog', label: 'Blog de Destinos', icon: BookOpen },
    { id: 'testimonios', label: 'Testimonios', icon: Star },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top micro bar for certifications & quick perks */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              Agencia Certificada RNT #48291 • Miembro IATA / ANATO
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">
              ✈️ Validación Directa Multi-Aerolínea con Reserva Automática al Pagar
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenEmailInbox}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
              title="Ver notificaciones de correo de Macarena Travel"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>Notificaciones por Correo</span>
            </button>
            <span className="text-slate-500">|</span>
            <div className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              <span>Moneda:</span>
              <button
                onClick={() => setCurrency(currency === 'COP' ? 'USD' : 'COP')}
                className="font-bold text-amber-300 hover:underline cursor-pointer"
              >
                {currency} ($)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button
            onClick={() => {
              setActiveTab('vuelos');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 text-left cursor-pointer focus:outline-hidden"
          >
            <MacarenaLogo size="md" />
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setActiveTab(link.id);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-50 text-amber-700 font-bold border border-amber-200/80 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-600' : 'text-slate-400'}`} />
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Bookings CTA */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Currency toggle for mobile/desktop */}
            <button
              onClick={() => setCurrency(currency === 'COP' ? 'USD' : 'COP')}
              className="px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 flex items-center gap-1 sm:hidden cursor-pointer"
            >
              <span>{currency}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {/* Email Inbox shortcut */}
            <button
              onClick={onOpenEmailInbox}
              className="p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors relative cursor-pointer"
              title="Notificaciones por Correo"
            >
              <Mail className="w-5 h-5 text-slate-700" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            </button>

            {/* Push Notifications Bell */}
            <button
              onClick={onOpenNotifications}
              className="p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors relative cursor-pointer"
              title="Notificaciones Push en Tiempo Real"
            >
              <Bell className="w-5 h-5 text-slate-700" />
              {unreadNotifs > 0 && (
                <span className="absolute top-1 right-1 bg-amber-500 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {unreadNotifs}
                </span>
              )}
            </button>

            {/* Concierge Chat shortcut */}
            <button
              onClick={onOpenChat}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-sky-600" />
              <span>Chat Concierge</span>
            </button>

            {/* My Bookings Pill */}
            <button
              onClick={onOpenMyBookings}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md hover:from-amber-600 hover:to-orange-600 transition-all cursor-pointer transform active:scale-95"
            >
              <Plane className="w-4 h-4" />
              <span className="hidden sm:inline">Mis Reservas</span>
              <span className="sm:hidden">Reservas</span>
              {confirmedBookingsCount > 0 && (
                <span className="bg-white text-orange-600 text-[11px] font-black px-1.5 py-0.5 rounded-full shadow-xs">
                  {confirmedBookingsCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 md:hidden cursor-pointer"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-4">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setActiveTab(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-white font-bold shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenChat();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-sky-50 text-sky-800 text-sm font-semibold cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-sky-600" />
                <span>Chat Asesor Macarena Concierge</span>
              </div>
              <span className="text-xs bg-sky-200/80 px-2 py-0.5 rounded-full font-bold">24/7 En Vivo</span>
            </button>

            <button
              onClick={() => {
                onOpenEmailInbox();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-orange-50 text-orange-800 text-sm font-semibold cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-orange-600" />
                <span>Bandeja de Confirmaciones por Correo</span>
              </div>
              <span className="text-xs bg-orange-200/80 px-2 py-0.5 rounded-full font-bold">E-Tickets</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
