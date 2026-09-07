import React, { useState, useRef, useEffect } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Plane,
  ChevronDown,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { ChatMessage } from '../types';
import { MacarenaLogo } from './MacarenaLogo';

interface ChatConciergeProps {
  isOpen: boolean;
  onToggle: () => void;
  onNavigateTab: (tab: string) => void;
}

export const ChatConcierge: React.FC<ChatConciergeProps> = ({
  isOpen,
  onToggle,
  onNavigateTab,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'agent',
      text: '¡Hola! 🌴 Te doy la bienvenida a **Macarena Travel**. Soy tu Concierge personal de viajes. ¿Te gustaría cotizar vuelos con validación directa, conocer la temporada de Caño Cristales o resolver dudas sobre pagos y reservas?',
      timestamp: 'Ahora',
      quickReplies: [
        '¿Cuándo viajar a Caño Cristales?',
        '¿Cómo funciona la validación de vuelos?',
        'Cotizar vuelo a San Andrés',
        '¿Qué métodos de pago aceptan?',
      ],
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
        }),
      });

      const data = await response.json();
      const replyText = data.reply || 'Con gusto te ayudo a preparar tu viaje en Macarena Travel.';

      const agentMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'agent',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, agentMsg]);
    } catch (error) {
      console.warn('Chat error:', error);
      const fallbackMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'agent',
        text: 'En Macarena Travel estamos listos para atenderte. Puedes usar nuestro motor de reservas superior para cotizar y validar vuelos con Avianca, LATAM, Wingo o Satena con confirmación instantánea.',
        timestamp: 'Ahora',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
          <div className="hidden sm:block bg-slate-900 text-white text-xs font-semibold px-3 py-2 rounded-2xl shadow-xl border border-slate-700 animate-bounce">
            👋 ¿Tienes dudas con tu viaje? ¡Chatea aquí!
          </div>

          <button
            onClick={onToggle}
            className="relative p-4 rounded-full bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-600 text-white shadow-2xl hover:shadow-amber-500/50 hover:scale-105 transition-all cursor-pointer group"
            aria-label="Abrir chat de atención personalizada"
          >
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
            <MessageCircle className="w-7 h-7 text-white" />
          </button>
        </div>
      )}

      {/* Chat Window Dialog */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 md:w-[420px] h-[580px] max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in slide-in-from-bottom-6 duration-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-400/40">
                  <Bot className="w-6 h-6 text-amber-400" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white flex items-center gap-1.5 font-display">
                  <span>Macarena Concierge</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </h3>
                <p className="text-[11px] text-slate-300">Asesor Personal de Viajes 24/7</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={onToggle}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Cerrar chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                      isUser
                        ? 'bg-amber-500 text-white rounded-br-xs'
                        : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>

                  <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>

                  {/* Quick replies for the latest agent greeting */}
                  {!isUser && msg.quickReplies && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[95%]">
                      {msg.quickReplies.map((reply, rIdx) => (
                        <button
                          key={rIdx}
                          onClick={() => handleSendMessage(reply)}
                          className="text-[11px] px-2.5 py-1 rounded-full bg-white border border-amber-300 text-slate-700 hover:bg-amber-50 hover:text-amber-800 transition-colors shadow-2xs cursor-pointer font-medium"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Loading typing bubble */}
            {isLoading && (
              <div className="flex items-center gap-2 text-slate-400 text-xs bg-white border border-slate-200 rounded-2xl px-3 py-2 w-max">
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse delay-75" />
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse delay-150" />
                <span className="text-[11px] text-slate-500 font-medium">Macarena Concierge escribiendo...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick action bar */}
          <div className="px-3 py-1.5 bg-slate-100/90 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
            <span className="truncate">✈️ Pregunta por Caño Cristales, vuelos o tarifas</span>
            <button
              onClick={() => onNavigateTab('vuelos')}
              className="text-amber-700 font-bold hover:underline ml-2 whitespace-nowrap cursor-pointer"
            >
              Ir a Reservas
            </button>
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Escribe tu consulta aquí..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-medium focus:bg-white focus:border-amber-500 focus:outline-hidden"
            />
            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-white transition-colors cursor-pointer"
              aria-label="Enviar mensaje"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
