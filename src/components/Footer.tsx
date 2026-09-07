import React from 'react';
import {
  Plane,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Heart,
  Send,
  Sparkles,
  Lock
} from 'lucide-react';
import { MacarenaLogo } from './MacarenaLogo';

interface FooterProps {
  onOpenEmailModal: () => void;
  onNavigateTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenEmailModal, onNavigateTab }) => {
  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand & Mission (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <MacarenaLogo size="md" lightMode={true} />
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Agencia de viajes líder en expediciones a <strong>Caño Cristales</strong>, 
              San Andrés, Cartagena y destinos mundiales. Integra nuestro motor inteligente de 
              <strong> validación directa con aerolíneas</strong> al momento del pago para garantizar tu tarifa óptima.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="text-[11px] bg-slate-800 text-slate-300 px-3 py-1 rounded-lg border border-slate-700 font-mono">
                RNT: 48291
              </span>
              <span className="text-[11px] bg-emerald-950/80 text-emerald-400 px-3 py-1 rounded-lg border border-emerald-800/80 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ANATO & IATA Certificados</span>
              </span>
            </div>
          </div>

          {/* Destinos */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-amber-400 uppercase tracking-wider font-display">
              Destinos Destacados
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigateTab('paquetes')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  🌈 Caño Cristales (La Macarena)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('paquetes')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  🏖️ San Andrés & Providencia
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('paquetes')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  🏰 Cartagena & Barú
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('paquetes')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  🌴 Santa Marta & Parque Tayrona
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('paquetes')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  ☀️ Cancún & Riviera Maya
                </button>
              </li>
            </ul>
          </div>

          {/* Navegación & Servicios */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-amber-400 uppercase tracking-wider font-display">
              Servicios
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigateTab('vuelos')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Validación Directa de Vuelos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('mis-reservas')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Mis Reservas & E-Tickets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('blog')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Blog de Destinos & Tips
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('testimonios')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Testimonios de Clientes
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenEmailModal}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Notificaciones & Promociones
                </button>
              </li>
            </ul>
          </div>

          {/* Contacto & Notificaciones */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-amber-400 uppercase tracking-wider font-display">
              Atención 24/7
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <span>PBX: +57 (601) 745-8900</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-500" />
                <span>reservas@macarenatravel.com</span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                <span>Aeropuerto El Dorado, Muelle Nacional T1, Bogotá</span>
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenEmailModal}
                className="w-full py-2 px-3 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Recibir Ofertas por Correo</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Macarena Travel S.A.S. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <Lock className="w-3.5 h-3.5" />
              <span>Pasarela de Pago Segura con Cifrado SSL 256-Bit</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
