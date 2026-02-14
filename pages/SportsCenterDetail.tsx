
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

interface Instructor {
  name: string;
  role: string;
  image: string;
}

interface SocialLinks {
  instagram?: string;
  twitter?: string;
  facebook?: string;
  tiktok?: string;
}

interface SportsCenter {
  id: number;
  name: string;
  type: string;
  location: string;
  rating: string;
  coursesCount: number;
  image: string;
  tags: string[];
  description: string;
  facilities: string[];
  instructors: Instructor[];
  socials: SocialLinks;
}

const SportsCenterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Mock de datos extendido para el detalle
  const centerData: Record<number, SportsCenter> = {
    1: {
      id: 1,
      name: "Elite Tennis Club",
      type: "Club Especializado",
      location: "Chapinero Alto, Bogotá",
      rating: "4.9",
      coursesCount: 12,
      image: "https://images.unsplash.com/photo-1595435066319-4051d3828223?q=80&w=1200&auto=format&fit=crop",
      tags: ["Tenis", "Piscina", "Sauna"],
      description: "Elite Tennis Club no es solo un centro de entrenamiento, es un santuario para el rendimiento deportivo de alto nivel. Fundado con la visión de profesionalizar el deporte recreativo en Bogotá, nuestras instalaciones combinan tecnología de punta con la tradición de los grandes clubes europeos.",
      facilities: ["8 Canchas de polvo de ladrillo", "Piscina Olímpica climatizada", "Zona de recuperación criogénica", "Restaurante de nutrición deportiva"],
      instructors: [
        { name: "Andrés M. Sampras", role: "Maestro de Tenis", image: "https://picsum.photos/seed/coach1/300/300" },
        { name: "Julián Álvarez", role: "Estratega de Fútbol", image: "https://picsum.photos/seed/coach2/300/300" }
      ],
      socials: {
        instagram: "@elitetennis_bog",
        twitter: "@elitetennis",
        facebook: "elitetennisclub",
        tiktok: "@elitetennis_pro"
      }
    },
    2: {
      id: 2,
      name: "Power House",
      type: "Centro de Alto Rendimiento",
      location: "Cedritos, Bogotá",
      rating: "4.8",
      coursesCount: 25,
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
      tags: ["Crossfit", "Boxeo", "Fisioterapia"],
      description: "En Power House, la intensidad es nuestra moneda. Diseñado para atletas que buscan romper sus propios límites, ofrecemos un ecosistema integral donde el entrenamiento de fuerza, la técnica de combate y la recuperación muscular convergen en un solo lugar.",
      facilities: ["Zona de Crossfit de 500m2", "Ring de boxeo profesional", "Sala de fisioterapia avanzada", "Café de especialidad y pre-entreno"],
      instructors: [
        { name: "Carlos Ramirez", role: "Coach de Crossfit", image: "https://picsum.photos/seed/coach3/300/300" },
        { name: "Marta Pro", role: "Instructor de Pilates", image: "https://picsum.photos/seed/coach4/300/300" }
      ],
      socials: {
        instagram: "@powerhouse_bog",
        twitter: "@powerhouse_fit",
        facebook: "powerhousebogota",
        tiktok: "@powerhouse_clips"
      }
    }
  };

  const center = centerData[Number(id)] || centerData[1];

  return (
    <div className="bg-paido-offwhite font-mono text-retro-black min-h-screen">
      {/* Hero Header */}
      <section className="relative border-b-8 border-retro-black bg-white group overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-12 relative z-10">
          <Link to="/centers" className="inline-flex items-center gap-2 text-xs font-black uppercase mb-8 hover:underline">
            <span className="material-symbols-outlined text-sm">arrow_back</span> Volver a centros
          </Link>
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-4xl">
              <span className="bg-retro-black text-white px-3 py-1 text-[10px] font-black uppercase mb-4 inline-block tracking-[0.3em]">
                {center.type}
              </span>
              <h1 className="text-6xl md:text-8xl lg:text-[100px] font-display font-black uppercase leading-[0.85] tracking-tighter mb-4">
                {center.name}
              </h1>
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2 font-black text-sm uppercase italic">
                  <span className="material-symbols-outlined text-lg">location_on</span>
                  {center.location}
                </div>
                <div className="size-2 bg-retro-black rounded-full opacity-30"></div>
                <div className="flex items-center gap-1 font-black text-sm">
                  <span className="material-symbols-outlined text-yellow-500">star</span>
                  {center.rating} <span className="text-gray-400 font-bold ml-1">/ 5.0</span>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block text-right">
              <p className="text-[10px] font-black uppercase text-gray-400 mb-2">Código de Sede</p>
              <p className="text-2xl font-black italic">#{String(center.id).padStart(4, '0')}</p>
            </div>
          </div>
        </div>
        
        {/* Halftone Pattern Background */}
        <div className="absolute top-0 right-0 size-64 halftone opacity-10 -mr-32 -mt-32"></div>
      </section>

      {/* Featured Image */}
      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
        <div className="border-8 border-retro-black shadow-retro group bg-white overflow-hidden aspect-[21/9]">
          <img 
            src={center.image} 
            alt={center.name} 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" 
          />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Columna Izquierda: Contenido Principal */}
          <div className="lg:col-span-8 space-y-16">
            <section>
              <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                <span className="size-3 bg-retro-black"></span> Manifiesto del Centro
              </h2>
              <div className="prose prose-xl font-bold text-gray-800 leading-relaxed italic">
                "{center.description}"
              </div>
            </section>

            <section className="grid md:grid-cols-2 gap-8">
              <div className="border-4 border-retro-black p-8 bg-white shadow-retro-sm">
                <h3 className="text-xl font-display font-black uppercase mb-6 border-b-2 border-retro-black pb-2">Instalaciones</h3>
                <ul className="space-y-4">
                  {center.facilities.map((fac, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm font-bold uppercase tracking-tight leading-none">
                      <span className="material-symbols-outlined text-sm mt-0.5">check_circle</span>
                      {fac}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-4 border-retro-black p-8 bg-retro-black text-white shadow-retro-sm">
                <h3 className="text-xl font-display font-black uppercase mb-6 border-b-2 border-white pb-2">Disciplinas</h3>
                <div className="flex flex-wrap gap-3">
                  {center.tags.map(tag => (
                    <span key={tag} className="border-2 border-white px-3 py-1 text-xs font-black uppercase italic hover:bg-white hover:text-retro-black transition-colors cursor-default">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="mt-12 opacity-30 halftone h-12 w-full"></div>
              </div>
            </section>

            {/* SECCIÓN DE PROFESORES */}
            <section className="pt-8 border-t-8 border-retro-black">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-10 flex items-center justify-between">
                <span className="flex items-center gap-3"><span className="size-3 bg-retro-black"></span> Staff de Élite</span>
                <span className="text-gray-400">Verificados_OS</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {center.instructors.map((instructor, idx) => (
                  <div key={idx} className="bg-white border-4 border-retro-black p-6 shadow-retro-sm flex gap-6 group hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                    <div className="size-20 md:size-24 border-4 border-retro-black grayscale group-hover:grayscale-0 transition-all overflow-hidden shrink-0">
                      <img src={instructor.image} alt={instructor.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col justify-between min-w-0">
                      <div>
                        <span className="bg-retro-black text-white px-2 py-0.5 text-[8px] font-black uppercase italic mb-1 inline-block">
                          {instructor.role}
                        </span>
                        <h4 className="text-sm md:text-lg font-display font-black uppercase tracking-tighter truncate leading-tight">
                          {instructor.name}
                        </h4>
                      </div>
                      <Link 
                        to={`/instructor-profile/${encodeURIComponent(instructor.name)}`}
                        className="text-[10px] font-black uppercase underline decoration-2 underline-offset-4 hover:bg-retro-black hover:text-white transition-colors w-fit px-1"
                      >
                        Ver Perfil
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Galería Snapshot */}
            <section>
              <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                <span className="size-3 bg-retro-black"></span> Snapshot_Instalaciones
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="aspect-square border-4 border-retro-black bg-gray-200 grayscale overflow-hidden group">
                   <img src={`https://picsum.photos/seed/${center.id}1/400/400`} className="w-full h-full object-cover group-hover:grayscale-0 transition-all" alt="Facility 1" />
                </div>
                <div className="aspect-square border-4 border-retro-black bg-gray-300 halftone relative">
                   <div className="absolute inset-0 bg-white/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-4xl">add_a_photo</span>
                   </div>
                   <img src={`https://picsum.photos/seed/${center.id}2/400/400`} className="w-full h-full object-cover group-hover:grayscale-0 transition-all" alt="Facility 2" />
                </div>
                <div className="aspect-square border-4 border-retro-black bg-gray-400 grayscale overflow-hidden group">
                   <img src={`https://picsum.photos/seed/${center.id}3/400/400`} className="w-full h-full object-cover group-hover:grayscale-0 transition-all" alt="Facility 3" />
                </div>
              </div>
            </section>

            {/* SECCIÓN DE REDES SOCIALES */}
            <section className="pt-8 border-t-8 border-retro-black">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                <span className="size-3 bg-retro-black"></span> Conexión_Social
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { key: 'instagram', icon: 'camera', label: 'INSTAGRAM', color: 'hover:bg-pink-500' },
                  { key: 'twitter', icon: 'close', label: 'X_CORP', color: 'hover:bg-blue-400' },
                  { key: 'facebook', icon: 'share', label: 'FACEBOOK', color: 'hover:bg-blue-600' },
                  { key: 'tiktok', icon: 'smart_display', label: 'TIKTOK', color: 'hover:bg-retro-black' }
                ].map((social) => {
                  const handle = center.socials[social.key as keyof SocialLinks];
                  if (!handle) return null;
                  
                  return (
                    <a 
                      key={social.key}
                      href={`#${social.key}`} 
                      className={`group border-4 border-retro-black p-6 bg-white flex flex-col items-center justify-center gap-3 shadow-retro-sm hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all ${social.color} hover:text-white`}
                    >
                      <span className="material-symbols-outlined text-4xl group-hover:rotate-12 transition-transform">
                        {social.icon}
                      </span>
                      <div className="text-center">
                        <p className="text-[10px] font-black uppercase tracking-widest">{social.label}</p>
                        <p className="text-[8px] font-bold opacity-60 group-hover:opacity-100">{handle}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Columna Derecha: Sidebar Sticky */}
          <aside className="lg:col-span-4 space-y-8 sticky top-28">
            <div className="bg-white border-4 border-retro-black p-8 shadow-retro">
              <div className="text-center mb-8 border-b-2 border-retro-black pb-8">
                <p className="text-[10px] font-black uppercase text-gray-400 mb-2">Oferta Académica</p>
                <p className="text-6xl font-display font-black italic">{center.coursesCount}</p>
                <p className="text-xs font-black uppercase">Cursos Activos</p>
              </div>
              
              <div className="space-y-4">
                <Link 
                  to={`/course?center=${encodeURIComponent(center.name)}`}
                  className="w-full bg-retro-black text-white py-5 text-center font-black uppercase text-sm border-4 border-retro-black flex items-center justify-center gap-3 hover:bg-white hover:text-retro-black transition-all"
                >
                  VER TODOS LOS CURSOS <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
                <button className="w-full border-4 border-retro-black py-5 text-center font-black uppercase text-sm hover:bg-retro-gray transition-all flex items-center justify-center gap-3">
                  CONTACTAR SEDE <span className="material-symbols-outlined">mail</span>
                </button>
              </div>

              <div className="mt-10 pt-8 border-t-2 border-dashed border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="size-12 bg-retro-gray border-2 border-retro-black flex items-center justify-center">
                    <span className="material-symbols-outlined">schedule</span>
                  </div>
                  <div>
                    <p className="text-[8px] font-black uppercase text-gray-400">Horario de Atención</p>
                    <p className="text-[10px] font-black uppercase">LUN - VIE: 05:00 - 22:00</p>
                    <p className="text-[10px] font-black uppercase">SÁB - DOM: 07:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Badge de Verificación */}
            <div className="border-4 border-retro-black p-6 bg-yellow-400 flex flex-col items-center justify-center text-center rotate-2 shadow-retro">
               <span className="material-symbols-outlined text-4xl mb-4">verified</span>
               <h4 className="text-lg font-display font-black uppercase leading-tight">CENTRO DE ÉLITE VERIFICADO</h4>
               <p className="text-[9px] font-black mt-2">GARANTÍA DE CALIDAD PAIDO V2.5</p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default SportsCenterDetail;
