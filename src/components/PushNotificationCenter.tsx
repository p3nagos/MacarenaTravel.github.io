import React from 'react';
import {
  Bell,
  X,
  Plane,
  Sparkles,
  ShieldCheck,
  CheckCheck,
  Volume2,
  Trash2,
  Clock
} from 'lucide-react';
import { PushNotification } from '../types';

interface PushNotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: PushNotification[];
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
  onSendTestNotification: () => void;
}

export const PushNotificationCenter: React.FC<PushNotificationCenterProps> = ({
  isOpen,
  onClose,
  notifications = [],
  onMarkAllAsRead,
  onClearAll,
  onSendTestNotification,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end p-2 sm:p-4 bg-slate-950/40 backdrop-blur-xs">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in slide-in-from-right-8 duration-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500 text-white">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white">Notificaciones Push</h3>
              <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Alertas en Tiempo Real Activas
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action bar */}
        <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs">
          <button
            onClick={onMarkAllAsRead}
            className="text-slate-600 hover:text-amber-700 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Marcar leídas</span>
          </button>

          <button
            onClick={onSendTestNotification}
            className="text-amber-700 hover:text-amber-800 font-bold bg-amber-100/70 hover:bg-amber-100 px-2 py-0.5 rounded-lg transition-colors cursor-pointer"
          >
            Probar Alerta Push
          </button>
        </div>

        {/* Notifications list */}
        <div className="flex-1 p-3 overflow-y-auto space-y-2.5">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <Bell className="w-10 h-10 mx-auto text-slate-300" />
              <p className="text-xs">No tienes notificaciones pendientes.</p>
            </div>
          ) : (
            notifications.map((notif) => {
              const isBooking = notif.type === 'booking';
              const isPromo = notif.type === 'promo';
              return (
                <div
                  key={notif.id}
                  className={`p-3.5 rounded-2xl border transition-all text-xs ${
                    notif.read
                      ? 'bg-white border-slate-200/70 text-slate-600'
                      : 'bg-amber-50/50 border-amber-200 text-slate-900 shadow-2xs'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div
                      className={`p-2 rounded-xl flex-shrink-0 ${
                        isBooking
                          ? 'bg-blue-100 text-blue-700'
                          : isPromo
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {isBooking ? (
                        <Plane className="w-4 h-4" />
                      ) : isPromo ? (
                        <Sparkles className="w-4 h-4" />
                      ) : (
                        <ShieldCheck className="w-4 h-4" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-bold leading-tight">{notif.title}</p>
                        <span className="text-[10px] text-slate-400">{notif.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                        {notif.body}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
            <button
              onClick={onClearAll}
              className="text-xs text-slate-500 hover:text-red-600 flex items-center justify-center gap-1 w-full cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Limpiar historial</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
