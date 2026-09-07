import React, { useState } from 'react';
import {
  BookOpen,
  Calendar,
  Clock,
  User,
  ArrowRight,
  Search,
  Tag,
  Share2,
  X,
  Compass
} from 'lucide-react';
import { BlogPost } from '../types';
import { BLOG_POSTS_DATA } from '../data/mockData';

interface BlogSectionProps {
  onBookDestination: (destinationName: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onBookDestination }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const filteredPosts = BLOG_POSTS_DATA.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <section id="blog" className="py-16 sm:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Bitácora & Guías de Macarena Travel</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 font-display">
              Blog de Destinos & Consejos para Viajeros
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              Inspírate con nuestras guías exclusivas, mejores temporadas para ver Caño Cristales, tips de ahorro en vuelos y secretos locales.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar guías o tips..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium focus:bg-white focus:border-amber-500 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Cover Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-amber-600 transition-colors leading-snug font-display mb-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                {/* Author info & Read More */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-7 h-7 rounded-full object-cover border border-slate-200"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-800">{post.author.name}</p>
                      <p className="text-[10px] text-slate-400">{post.author.role}</p>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-amber-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Leer <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            {/* Modal Header Bar */}
            <div className="relative h-64 sm:h-80 overflow-hidden flex-shrink-0">
              <img
                src={selectedPost.coverImage}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="bg-amber-500 text-white text-xs font-black px-3 py-1 rounded-full mb-3 inline-block">
                  {selectedPost.category}
                </span>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black font-display leading-tight">
                  {selectedPost.title}
                </h2>
                <div className="flex items-center gap-3 text-xs text-slate-300 mt-2">
                  <span>Por {selectedPost.author.name}</span>
                  <span>•</span>
                  <span>{selectedPost.date}</span>
                  <span>•</span>
                  <span>{selectedPost.readTime}</span>
                </div>
              </div>
            </div>

            {/* Modal Body Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-slate-700 text-sm leading-relaxed flex-1">
              {selectedPost.content.map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}

              {/* Tags */}
              <div className="pt-4 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-400">Etiquetas:</span>
                {selectedPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Direct Booking Callout */}
              <div className="mt-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    ¿Inspirado para visitar {selectedPost.destination}?
                  </h4>
                  <p className="text-xs text-slate-600">
                    Asegura tu vuelo y paquete con validación de tarifas y reserva automática garantizada.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const dest = selectedPost.destination;
                    setSelectedPost(null);
                    onBookDestination(dest);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-md flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
                >
                  <Compass className="w-4 h-4" />
                  <span>Cotizar este Destino</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
