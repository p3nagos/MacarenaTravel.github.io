import React, { useState } from 'react';
import {
  Star,
  CheckCircle2,
  ThumbsUp,
  MessageSquarePlus,
  X,
  Camera,
  Heart,
  Quote
} from 'lucide-react';
import { Testimonial } from '../types';
import { TESTIMONIALS_DATA } from '../data/mockData';

export const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(TESTIMONIALS_DATA);
  const [modalOpen, setModalOpen] = useState(false);

  // New testimonial form state
  const [newName, setNewName] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newDestination, setNewDestination] = useState('Caño Cristales, Meta');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');

  const handleAddTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newComment) return;

    const newEntry: Testimonial = {
      id: `test-${Date.now()}`,
      name: newName,
      location: newLocation || 'Colombia',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      rating: newRating,
      destination: newDestination,
      tripDate: 'Septiembre 2026',
      comment: newComment,
      verified: true,
      helpfulCount: 1,
    };

    setTestimonials([newEntry, ...testimonials]);
    setModalOpen(false);
    setNewName('');
    setNewLocation('');
    setNewComment('');
  };

  const handleHelpful = (id: string) => {
    setTestimonials(prev =>
      prev.map(t => (t.id === id ? { ...t, helpfulCount: t.helpfulCount + 1 } : t))
    );
  };

  return (
    <section id="testimonios" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Average Score summary */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
              <Star className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
              <span>Experiencias Reales de Viajeros Macarena</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 font-display">
              Lo que Dicen Nuestros Clientes
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              Más de 850 viajeros han confiado en nuestro sistema de reservas y validación directa con aerolíneas.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-white px-4 py-3 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
              <div className="text-right">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-slate-500 font-medium">4.96 de 5.0 (850+ opiniones)</span>
              </div>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="px-4 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer flex-shrink-0"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Dejar Testimonio</span>
            </button>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header: Avatar, Name, Location */}
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={test.avatar}
                    alt={test.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-amber-500/30"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <h4 className="text-sm font-extrabold text-slate-900 leading-tight">
                        {test.name}
                      </h4>
                      {test.verified && (
                        <CheckCircle2
                          className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0"
                          title="Viajero Verificado"
                        />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400">{test.location}</p>
                  </div>
                </div>

                {/* Rating & Destination badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-0.5">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md">
                    {test.destination}
                  </span>
                </div>

                {/* Comment */}
                <p className="text-xs text-slate-600 leading-relaxed italic mb-4">
                  "{test.comment}"
                </p>

                {/* Traveler Photos */}
                {test.tripPhotos && test.tripPhotos.length > 0 && (
                  <div className="flex items-center gap-2 mb-4">
                    {test.tripPhotos.map((photo, pIdx) => (
                      <img
                        key={pIdx}
                        src={photo}
                        alt="Foto de viaje"
                        className="w-14 h-14 rounded-xl object-cover border border-slate-100 shadow-2xs"
                        referrerPolicy="no-referrer"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Footer: Date & Helpful button */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>{test.tripDate}</span>
                <button
                  onClick={() => handleHelpful(test.id)}
                  className="flex items-center gap-1 hover:text-amber-600 transition-colors cursor-pointer"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{test.helpfulCount}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Testimonial Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 animate-in zoom-in-95 duration-200 my-auto">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-slate-900 font-display mb-1">
              Comparte tu Experiencia de Viaje
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Tu reseña ayudará a miles de viajeros a descubrir destinos increíbles con Macarena Travel.
            </p>

            <form onSubmit={handleAddTestimonial} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tu Nombre Completo
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ej: Laura Gómez"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium focus:bg-white focus:border-amber-500 focus:outline-hidden"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Ciudad / País
                  </label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="Ej: Bucaramanga, Col"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium focus:bg-white focus:border-amber-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Destino Visitado
                  </label>
                  <select
                    value={newDestination}
                    onChange={(e) => setNewDestination(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium focus:bg-white focus:border-amber-500 focus:outline-hidden cursor-pointer"
                  >
                    <option value="Caño Cristales, Meta">Caño Cristales, Meta</option>
                    <option value="San Andrés Islas">San Andrés Islas</option>
                    <option value="Cartagena de Indias">Cartagena de Indias</option>
                    <option value="Parque Tayrona">Parque Tayrona</option>
                    <option value="Cancún, México">Cancún, México</option>
                    <option value="Madrid, España">Madrid, España</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Calificación
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewRating(star)}
                      className="cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= newRating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-2">{newRating} de 5</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tu Testimonio o Comentario
                </label>
                <textarea
                  rows={4}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Cuéntanos sobre el vuelo, la atención de Macarena Travel, la facilidad al pagar y la experiencia en el destino..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium focus:bg-white focus:border-amber-500 focus:outline-hidden"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer"
                >
                  Publicar Testimonio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
