
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const schoolLogos = [
    { name: "BOXING CLUB", icon: "sports_mma" },
    { name: "CROSSFIT PRO", icon: "fitness_center" },
    { name: "YOGA STUDIO", icon: "self_improvement" },
    { name: "LIFT ACADEMY", icon: "exercise" },
    { name: "ZENITH GYM", icon: "home_health" },
    { name: "POWER HOUSE", icon: "bolt" },
    { name: "ELITE TENNIS", icon: "sports_tennis" },
    { name: "CORE PILATES", icon: "accessibility_new" },
  ];

  const topCourses = [
    { 
      id: 1,
      title: "Servicio de Potencia Pro", 
      instructor: "Andrés M. Sampras", 
      tag: "TENIS", 
      price: "$180.000", 
      duration: "6 SEM",
      level: "PRO",
      img: "https://images.unsplash.com/photo-1595435066319-4051d3828223?q=80&w=600&h=400&auto=format&fit=crop" 
    },
    { 
      id: 2,
      title: "Táctica y Visión Moderna", 
      instructor: "Pro. Julián Álvarez", 
      tag: "FÚTBOL", 
      price: "$125.000", 
      duration: "8 SEM", 
      level: "INT",
      img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600&h=400&auto=format&fit=crop" 
    },
    { 
      id: 3,
      title: "Mecánica de Tiro y Salto", 
      instructor: "Coach Kevin Durant", 
      tag: "BASQUET", 
      price: "$140.000", 
      duration: "5 SEM", 
      level: "PRO",
      img: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=600&h=400&auto=format&fit=crop" 
    },
    { 
      id: 4,
      title: "Sprint: Técnica de Salida", 
      instructor: "Usain B. Elite", 
      tag: "TRACK", 
      price: "$90.000", 
      duration: "4 SEM", 
      level: "BEG",
      img: "https://images.unsplash.com/photo-1461896756913-647f00716c02?q=80&w=600&h=400&auto=format&fit=crop" 
    }
  ];

  return (
    <div className="font-mono text-retro-black">
      {/* Banner Hero Optimizado para Móvil */}
      <section className="relative overflow-hidden border-b-4 border-retro-black bg-white min-h-[calc(100vh-80px)] flex items-center py-12 lg:py-0">
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="inline-block bg-retro-black text-white px-3 py-1 text-[10px] md:text-xs font-black uppercase mb-6 -rotate-2">
            Rendimiento de Élite
          </div>
          
          <h1 className="text-4xl xs:text-5xl md:text-7xl lg:text-[90px] font-display font-black uppercase tracking-tighter leading-[0.9] md:leading-[0.85] mb-8">
            DOMINA TU<br />
            <span className="text-transparent" style={{ WebkitTextStroke: "1.5px black" }}>DISCIPLINA</span>
          </h1>
          
          <p className="text-base md:text-xl font-bold max-w-2xl border-l-4 md:border-l-8 border-retro-black pl-4 md:pl-6 mb-12 leading-snug text-gray-700">
            Entrena con los mejores, gestiona tu progreso con datos reales y alcanza tu máximo potencial en el ecosistema deportivo más avanzado.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/course" 
              className="w-full sm:w-auto bg-retro-black text-white px-8 py-5 text-base md:text-lg font-black uppercase border-4 border-retro-black shadow-retro hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-3"
            >
              Explorar Cursos <span className="material-symbols-outlined">explore</span>
            </Link>
            <Link 
              to="/login/profesor" 
              className="w-full sm:w-auto bg-white text-retro-black px-8 py-5 text-base md:text-lg font-black uppercase border-4 border-retro-black shadow-retro hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-3"
            >
              Soy Instructor <span className="material-symbols-outlined">school</span>
            </Link>
          </div>
        </div>
        
        {/* Elementos Decorativos Responsivos */}
        <div className="absolute top-[10%] right-[-10%] md:right-[-5%] size-[250px] md:size-[500px] border-4 border-retro-black rounded-full opacity-5 halftone pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-5%] size-[200px] md:size-[400px] bg-retro-black opacity-5 halftone pointer-events-none"></div>
      </section>

      {/* Carrusel de Logos de Escuelas */}
      <div className="bg-white border-b-4 border-retro-black py-8 overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>
        <div className="flex whitespace-nowrap animate-logo-scroll gap-12">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-12">
              {schoolLogos.map((logo, idx) => (
                <div key={idx} className="flex items-center gap-3 grayscale hover:grayscale-0 transition-all cursor-default">
                  <span className="material-symbols-outlined text-2xl md:text-3xl">{logo.icon}</span>
                  <span className="text-base md:text-lg font-display font-black uppercase tracking-tighter">{logo.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <style>{`
          @keyframes logo-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-25%); }
          }
          .animate-logo-scroll {
            animation: logo-scroll 40s linear infinite;
          }
        `}</style>
      </div>

      {/* Sección de Listado de Cursos - Rediseñada */}
      <section className="py-12 md:py-24 bg-paido-offwhite border-b-4 border-retro-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-10">
            <div className="max-w-2xl">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-2 italic">CATÁLOGO_ACTIVO_V2.5</p>
              <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter leading-[0.85]">
                RENDIMIENTO<br/><span className="italic underline decoration-8">SIN EXCUSAS</span>
              </h2>
            </div>
            
            <Link to="/course" className="group relative w-full sm:w-fit">
               <div className="absolute inset-0 bg-retro-black translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform"></div>
               <div className="relative border-4 border-retro-black bg-white px-10 py-5 font-black uppercase text-sm flex items-center justify-center gap-3 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform">
                 CATÁLOGO COMPLETO <span className="material-symbols-outlined">apps</span>
               </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {topCourses.map((course, i) => (
              <div key={i} className="group border-4 border-retro-black bg-white shadow-retro hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all flex flex-col relative overflow-hidden">
                {/* Header de la tarjeta */}
                <div className="flex items-center justify-between px-4 py-2 bg-retro-black text-white">
                  <span className="text-[8px] font-black uppercase tracking-widest">PAIDO_REF_00{course.id}</span>
                  <span className="material-symbols-outlined text-xs">verified</span>
                </div>

                {/* Imagen con Overlay */}
                <Link to={`/course/${course.id}`} className="aspect-[4/3] border-b-4 border-retro-black relative overflow-hidden block">
                  <img src={course.img} alt={course.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-yellow-400 text-retro-black px-2 py-1 text-[10px] font-black uppercase border-2 border-retro-black">
                      {course.tag}
                    </span>
                  </div>
                </Link>

                <div className="p-6 flex flex-col flex-1 relative bg-white">
                  {/* Patrón Halftone Decorativo al Hover */}
                  <div className="absolute inset-0 halftone opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"></div>
                  
                  <div className="mb-6 relative z-10">
                    <h3 className="text-xl font-display font-black uppercase leading-tight mb-2 group-hover:text-retro-black">
                      {course.title}
                    </h3>
                    <p className="text-[10px] font-black uppercase text-gray-400">Por {course.instructor}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-8 relative z-10">
                    <div className="border-2 border-retro-black p-2 flex flex-col items-center">
                      <span className="material-symbols-outlined text-sm mb-1">schedule</span>
                      <span className="text-[9px] font-black uppercase">{course.duration}</span>
                    </div>
                    <div className="border-2 border-retro-black p-2 flex flex-col items-center">
                      <span className="material-symbols-outlined text-sm mb-1">military_tech</span>
                      <span className="text-[9px] font-black uppercase">{course.level}</span>
                    </div>
                  </div>
                  
                  <div className="mt-auto border-t-4 border-retro-black pt-6 flex items-end justify-between relative z-10">
                    <div>
                      <p className="text-[8px] font-black uppercase text-gray-400 mb-1">Inversión_Pro</p>
                      <span className="text-3xl font-display font-black italic tracking-tighter">{course.price}</span>
                    </div>
                    <Link 
                      to={`/course/${course.id}`}
                      className="size-14 bg-retro-black text-white flex items-center justify-center hover:bg-yellow-400 hover:text-retro-black transition-all border-2 border-retro-black group/btn"
                    >
                      <span className="material-symbols-outlined text-2xl group-hover/btn:rotate-45 transition-transform">arrow_outward</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
