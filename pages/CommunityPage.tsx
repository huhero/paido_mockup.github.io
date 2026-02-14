
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CommunityPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const itemsPerPage = 10;

  // Datos de noticias
  const allNews = [
    {
      id: 1,
      date: "12 OCT",
      category: "EVENTO",
      title: "GRAN APERTURA: ELITE BOXING CHAPINERO",
      desc: "Nueva sede con tecnología de rastreo de impacto lista para recibir a los primeros 50 atletas.",
      image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=600&h=400&auto=format&fit=crop",
      tags: ["#BOXING_PRO", "#ELITE_TRAINING"]
    },
    {
      id: 2,
      date: "08 OCT",
      category: "RÉCORD",
      title: "MATEO G. ROMPE EL RÉCORD DE SPRINT 100M",
      desc: "Con un tiempo de 10.4s, Mateo se posiciona como el atleta más veloz de la semana.",
      image: "https://images.unsplash.com/photo-1461896756913-647f00716c02?q=80&w=600&h=400&auto=format&fit=crop",
      tags: ["#ELITE_TRAINING"]
    },
    {
      id: 3,
      date: "05 OCT",
      category: "TIPS",
      title: "NUTRICIÓN: MACROS PARA FUERZA EXPLOSIVA",
      desc: "Nuestros expertos desglosan la dieta ideal para atletas de Powerlifting.",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=600&h=400&auto=format&fit=crop",
      tags: ["#ELITE_TRAINING", "#CROSSFIT"]
    },
    {
      id: 4,
      date: "01 OCT",
      category: "EQUIPO",
      title: "LANZAMIENTO: GRIPS PAIDO_ULTRA",
      desc: "Nuevos accesorios de agarre con nanotecnología para evitar deslizamientos.",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600&h=400&auto=format&fit=crop",
      tags: ["#CROSSFIT"]
    },
    {
      id: 5,
      date: "28 SEP",
      category: "TORNEO",
      title: "OPEN TENNIS PAIDO 2024",
      desc: "Inscripciones abiertas para el torneo relámpago de singles en Bogotá.",
      image: "https://images.unsplash.com/photo-1595435066319-4051d3828223?q=80&w=600&h=400&auto=format&fit=crop",
      tags: ["#ELITE_TRAINING"]
    },
    {
      id: 6,
      date: "25 SEP",
      category: "SALUD",
      title: "RECUPERACIÓN: EL PODER DEL SUEÑO",
      desc: "Cómo optimizar tus fases REM para duplicar la síntesis de proteína muscular.",
      image: "https://images.unsplash.com/photo-1541480601022-2308c0f02487?q=80&w=600&h=400&auto=format&fit=crop",
      tags: ["#YOGA", "#ELITE_TRAINING"]
    },
    {
      id: 7,
      date: "20 SEP",
      category: "CENTRO",
      title: "ZENITH STUDIO SUMA PILATES REFORMER",
      desc: "Nuevas máquinas de última generación llegan a la sede de Usaquén.",
      image: "https://images.unsplash.com/photo-1518611012118-2960520ee86c?q=80&w=600&h=400&auto=format&fit=crop",
      tags: ["#YOGA"]
    },
    {
      id: 8,
      date: "15 SEP",
      category: "LOGRO",
      title: "COMUNIDAD: +5000 ATLETAS ACTIVOS",
      desc: "Celebramos un hito en nuestra red de alto rendimiento.",
      image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=600&h=400&auto=format&fit=crop",
      tags: ["#ELITE_TRAINING"]
    },
    {
      id: 9,
      date: "10 SEP",
      category: "PRO",
      title: "MASTERCLASS: DEFENSA PERSONAL",
      desc: "El Coach Ramirez dictará un taller intensivo de defensa este sábado.",
      image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=600&h=400&auto=format&fit=crop",
      tags: ["#BOXING_PRO"]
    },
    {
      id: 10,
      date: "05 SEP",
      category: "CIENCIA",
      title: "BIOHACKING: EXPOSICIÓN AL FRÍO",
      desc: "Probamos los nuevos tanques de crioterapia de Power House.",
      image: "https://images.unsplash.com/photo-1517130038641-a774d04afb3c?q=80&w=600&h=400&auto=format&fit=crop",
      tags: ["#CROSSFIT", "#ELITE_TRAINING"]
    },
    {
      id: 11,
      date: "01 SEP",
      category: "EQUIPO",
      title: "CALZADO: SUELA PAIDO_GRIP 2.0",
      desc: "Mejora el tracción en superficies húmedas con el nuevo compuesto volcánico.",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&h=400&auto=format&fit=crop",
      tags: ["#CROSSFIT"]
    },
    {
      id: 12,
      date: "28 AGO",
      category: "EVENTO",
      title: "SÁBADO DE SPARRING: OPEN MAT",
      desc: "Sesión abierta para todos los niveles en la sede Cedritos.",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&h=400&auto=format&fit=crop",
      tags: ["#BOXING_PRO"]
    }
  ];

  const filteredNews = useMemo(() => {
    if (selectedTags.length === 0) return allNews;
    return allNews.filter(news => 
      news.tags.some(tag => selectedTags.includes(tag))
    );
  }, [selectedTags]);

  const paginatedNews = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredNews.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredNews, currentPage]);

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
    setCurrentPage(1);
  };

  // Efecto para scroll suave al inicio de la página cuando cambia la página
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className="bg-paido-offwhite min-h-screen font-mono text-retro-black overflow-x-hidden">
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="mb-8 md:mb-16 border-b-8 border-retro-black pb-6">
          <h1 className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter leading-none">COMUNIDAD</h1>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-4 italic">
            // NOVEDADES_RENDIMIENTO_V2.5
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Listado de Noticias */}
          <div className="lg:col-span-8 space-y-4 md:space-y-8">
            {paginatedNews.length > 0 ? (
              paginatedNews.map((item) => (
                <article 
                  key={item.id} 
                  className="bg-white border-2 md:border-4 border-retro-black shadow-retro-sm md:shadow-retro flex flex-row overflow-hidden h-[100px] md:h-auto group transition-all w-full box-border"
                >
                  <div className="w-[100px] md:w-1/3 border-r-2 md:border-r-4 border-retro-black grayscale group-hover:grayscale-0 transition-all shrink-0">
                    <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="News" />
                  </div>

                  <div className="p-2 md:p-8 flex-1 flex flex-col justify-between min-w-0">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[7px] md:text-[10px] font-black bg-retro-black text-white px-1.5 py-0.5 uppercase shrink-0">
                          {item.category}
                        </span>
                        <span className="text-[7px] md:text-[9px] font-black text-gray-400 uppercase truncate">
                          {item.date}
                        </span>
                      </div>
                      
                      <h3 className="text-[10px] xs:text-[11px] md:text-3xl font-display font-black uppercase leading-tight tracking-tighter group-hover:underline line-clamp-2 md:line-clamp-none whitespace-normal">
                        <Link to={`/community/${item.id}`}>{item.title}</Link>
                      </h3>
                      
                      <p className="hidden md:block text-xs font-bold text-gray-500 mt-4 line-clamp-2">
                        {item.desc}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="hidden md:flex flex-wrap gap-2">
                        {item.tags.map(tag => (
                          <span key={tag} className="text-[7px] font-black uppercase opacity-40">#{tag.replace('#', '')}</span>
                        ))}
                      </div>
                      <Link 
                        to={`/community/${item.id}`}
                        className="bg-retro-black text-white px-2 xs:px-3 md:px-6 py-1 md:py-3 text-[7px] xs:text-[8px] md:text-[10px] font-black uppercase border-2 border-retro-black hover:bg-white hover:text-retro-black transition-all flex items-center gap-1 active:translate-y-0.5"
                      >
                        LEER <span className="material-symbols-outlined text-[10px] xs:text-[12px] md:text-xs">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="border-4 border-retro-black border-dashed p-12 text-center bg-white">
                 <h3 className="text-2xl font-display font-black uppercase italic">SIN COINCIDENCIAS</h3>
                 <button onClick={() => setSelectedTags([])} className="mt-4 bg-retro-black text-white px-6 py-2 text-xs font-black uppercase border-2 border-retro-black">RESETEAR</button>
              </div>
            )}

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-3">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className={`p-2 border-2 border-retro-black ${currentPage === 1 ? 'opacity-20' : 'bg-white shadow-retro-sm active:translate-y-0.5'}`}
                >
                  <span className="material-symbols-outlined">west</span>
                </button>
                <span className="text-xs font-black px-4">{currentPage} / {totalPages}</span>
                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className={`p-2 border-2 border-retro-black ${currentPage === totalPages ? 'opacity-20' : 'bg-white shadow-retro-sm active:translate-y-0.5'}`}
                >
                  <span className="material-symbols-outlined">east</span>
                </button>
              </div>
            )}
          </div>

          {/* Barra Lateral / Filtros */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white border-4 border-retro-black p-6 shadow-retro-sm">
               <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 border-b-2 border-retro-black pb-1 italic">Tendencias_Tags</h3>
               <div className="flex flex-wrap gap-2">
                 {['#CROSSFIT', '#ELITE_TRAINING', '#BOXING_PRO', '#YOGA'].map(tag => (
                   <button 
                     key={tag} 
                     onClick={() => toggleTag(tag)}
                     className={`text-[8px] md:text-[10px] font-black uppercase border-2 border-retro-black px-2 py-1 transition-all
                       ${selectedTags.includes(tag) ? 'bg-retro-black text-white' : 'bg-white hover:bg-gray-100'}
                     `}
                   >
                     {tag}
                   </button>
                 ))}
               </div>
            </div>

            <div className="bg-yellow-400 border-4 border-retro-black p-6 shadow-retro rotate-1">
               <h4 className="text-lg font-display font-black uppercase italic leading-none mb-2">NEWSLETTER_PRO</h4>
               <p className="text-[8px] font-bold uppercase mb-4">Recibe tácticas de alto rendimiento en tu correo.</p>
               <input type="email" placeholder="TU@EMAIL.COM" className="w-full bg-white border-2 border-retro-black p-2 text-[10px] font-black uppercase mb-2 outline-none" />
               <button className="w-full bg-retro-black text-white py-2 text-[10px] font-black uppercase border-2 border-retro-black shadow-retro-sm active:translate-x-0.5 active:translate-y-0.5">SUSCRIBIRSE</button>
            </div>

            {/* Canales Oficiales Sidebar */}
            <div className="bg-white border-4 border-retro-black p-6 shadow-retro-sm">
               <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6 border-b-2 border-retro-black pb-1 italic">CANALES_OFICIALES</h3>
               <div className="grid grid-cols-2 gap-4">
                 {[
                   { name: 'Instagram', icon: 'camera' },
                   { name: 'X', icon: 'close' },
                   { name: 'LinkedIn', icon: 'share' },
                   { name: 'YouTube', icon: 'smart_display' }
                 ].map((social) => (
                   <a 
                     key={social.name} 
                     href="#" 
                     className="flex flex-col items-center gap-2 p-3 border-2 border-retro-black hover:bg-retro-black hover:text-white transition-all shadow-retro-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none group"
                     title={social.name}
                   >
                     <span className="material-symbols-outlined text-2xl group-hover:rotate-12 transition-transform">{social.icon}</span>
                     <span className="text-[8px] font-black uppercase tracking-widest">{social.name}</span>
                   </a>
                 ))}
               </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default CommunityPage;
