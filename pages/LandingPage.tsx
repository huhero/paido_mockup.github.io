
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
      title: "Servicio de Potencia y Precisión Pro", 
      instructor: "Andrés M. Sampras", 
      tag: "TENIS", 
      price: "$180.000", 
      duration: "6 SEMANAS", 
      img: "https://images.unsplash.com/photo-1595435066319-4051d3828223?q=80&w=600&h=400&auto=format&fit=crop" 
    },
    { 
      title: "Táctica y Visión de Juego Moderna", 
      instructor: "Pro. Julián Álvarez", 
      tag: "FÚTBOL", 
      price: "$125.000", 
      duration: "8 SEMANAS", 
      img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600&h=400&auto=format&fit=crop" 
    },
    { 
      title: "Mecánica de Tiro y Salto Vertical", 
      instructor: "Coach Kevin Durant", 
      tag: "BASQUETBALL", 
      price: "$140.000", 
      duration: "5 SEMANAS", 
      img: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=600&h=400&auto=format&fit=crop" 
    },
    { 
      title: "Sprint: Técnica de Salida y Explosión", 
      instructor: "Usain B. Elite", 
      tag: "ATLETISMO", 
      price: "$90.000", 
      duration: "4 SEMANAS", 
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
        
        {/* Marca de agua lateral solo en desktop */}
        <div className="hidden lg:block absolute right-10 bottom-10 rotate-90 origin-right text-[10px] font-black tracking-[1em] opacity-20 uppercase">
          performance_tracking_v2.5
        </div>
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

      {/* Sección de Listado de Cursos */}
      <section className="py-12 md:py-20 bg-retro-gray border-b-4 border-retro-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-8 text-center md:text-left">
            <div className="relative">
              <div className="md:absolute -top-6 -left-2 text-[10px] font-black bg-retro-black text-white px-2 py-0.5 tracking-tighter mb-4 md:mb-0 inline-block">ELITE_CATALOGUE_2024</div>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-black uppercase tracking-tighter leading-none">CURSOS DISPONIBLES</h2>
              <p className="text-[10px] md:text-sm font-black uppercase mt-4 text-gray-500 flex items-center justify-center md:justify-start gap-2 tracking-widest">
                <span className="size-2 bg-retro-black animate-pulse"></span>
                Inicia tu camino a la excelencia deportiva
              </p>
            </div>
            
            <Link to="/course" className="group relative w-full sm:w-fit mx-auto md:mx-0">
               <div className="absolute inset-0 bg-retro-black translate-x-1 translate-y-1 sm:translate-x-2 sm:translate-y-2 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></div>
               <div className="relative border-4 border-retro-black bg-white px-4 sm:px-8 py-3 sm:py-4 font-black uppercase text-xs sm:text-sm md:text-base transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1 flex items-center justify-center gap-3">
                 VER TODOS LOS CURSOS <span className="material-symbols-outlined">apps</span>
               </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {topCourses.map((course, i) => (
              <div key={i} className="group border-2 md:border-4 border-retro-black bg-white shadow-retro-sm md:shadow-retro hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex flex-row md:flex-col overflow-hidden h-[120px] md:h-auto">
                {/* Imagen Lateral en Móvil, Superior en Desktop */}
                <div className="w-[100px] xs:w-[130px] md:w-full md:aspect-[4/3] border-r-2 md:border-r-0 md:border-b-4 border-retro-black relative overflow-hidden grayscale group-hover:grayscale-0 transition-all shrink-0">
                  <img src={course.img} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-0 right-0 bg-retro-black text-white px-1.5 md:px-3 py-0.5 md:py-1 text-[7px] md:text-[10px] font-black uppercase border-l-2 md:border-l-4 border-b-2 md:border-b-4 border-retro-black z-10">
                    {course.tag}
                  </div>
                </div>

                <div className="p-3 md:p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="text-[10px] xs:text-xs md:text-xl font-display font-black uppercase leading-[1.1] line-clamp-2 md:line-clamp-3 group-hover:underline">
                      {course.title}
                    </h3>
                  </div>
                  
                  <div className="hidden md:flex flex-col gap-1 mb-6 border-l-4 border-retro-black pl-3 bg-paido-offwhite py-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Instructor Pro</p>
                    <p className="text-xs font-bold uppercase truncate">{course.instructor}</p>
                  </div>
                  
                  <div className="mt-auto">
                    <div className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase mb-6 bg-retro-gray w-fit px-2 py-1 border border-retro-black">
                      <span className="material-symbols-outlined text-sm">timer</span>
                      {course.duration}
                    </div>
                    
                    <div className="flex items-center justify-between pt-1.5 md:pt-4 border-t md:border-t-4 border-retro-black">
                      <div className="flex flex-col">
                        <span className="hidden xs:block text-[6px] md:text-[8px] font-black uppercase text-gray-400">Inscripción</span>
                        <span className="text-xs sm:text-sm md:text-2xl font-display font-black italic leading-none tracking-tighter">{course.price}</span>
                      </div>
                      <Link 
                        to="/course" 
                        className="size-7 sm:size-8 md:size-12 bg-retro-black text-white flex items-center justify-center border md:border-2 border-retro-black transition-all hover:bg-white hover:text-retro-black group-hover:rotate-12"
                        title="Ver detalles"
                      >
                        <span className="material-symbols-outlined text-xs sm:text-sm md:text-base">arrow_outward</span>
                      </Link>
                    </div>
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
