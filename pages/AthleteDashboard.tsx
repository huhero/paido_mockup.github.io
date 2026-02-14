
import React from 'react';

const AthleteDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-retro-white border-x-2 border-retro-black max-w-[1440px] mx-auto font-mono">
      <main className="max-w-[1280px] mx-auto px-4 lg:px-10 py-10">
        {/* Perfil Rápido */}
        <div className="flex items-center justify-between mb-10 border-b-4 border-retro-black pb-6">
           <div className="flex items-center gap-6">
              <div className="size-20 border-4 border-retro-black overflow-hidden grayscale bg-gray-200">
                 <img src="https://picsum.photos/seed/mateo/200/200" className="object-cover w-full h-full" alt="Perfil" />
              </div>
              <div>
                <h2 className="text-3xl font-display font-black uppercase tracking-tighter">Mateo G.</h2>
                <p className="text-xs font-black bg-retro-black text-white px-2 py-0.5 w-fit uppercase">Atleta Pro</p>
              </div>
           </div>
           <div className="flex gap-4">
              <button className="size-12 border-4 border-retro-black flex items-center justify-center shadow-retro-sm hover:bg-retro-gray">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="size-12 border-4 border-retro-black flex items-center justify-center shadow-retro-sm hover:bg-retro-gray">
                <span className="material-symbols-outlined">settings</span>
              </button>
           </div>
        </div>

        {/* Sección de Bienvenida */}
        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-8">
            <h1 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter leading-[0.85] mb-4">
              TABLERO DE<br />
              <span className="italic font-light">RENDIMIENTO</span>
            </h1>
            <p className="border-l-4 border-retro-black pl-4 text-lg font-medium max-w-xl">
              Tu próximo desafío te espera. La consistencia es la única moneda que importa aquí.
            </p>
          </div>
          <div className="lg:col-span-4 flex items-center lg:justify-end">
            <button className="bg-retro-black text-white px-8 py-4 font-bold uppercase flex items-center gap-3 border-2 border-retro-black shadow-retro hover:shadow-hover transition-all group">
              <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">calendar_month</span>
              Horario Completo
            </button>
          </div>
        </div>

        {/* Tarjetas Superiores */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="border-2 border-retro-black bg-white p-6 shadow-retro relative overflow-hidden group cursor-pointer">
            <div className="flex justify-between items-start mb-4 relative z-10">
              <p className="text-xs font-black uppercase border-b-2 border-retro-black inline-block">Racha Actual</p>
              <span className="material-symbols-outlined text-4xl group-hover:scale-110 transition-transform">local_fire_department</span>
            </div>
            <h3 className="text-6xl font-display font-black relative z-10">12 <span className="text-xl align-top">DÍAS</span></h3>
            <p className="text-xs font-bold mt-4 flex items-center gap-2 relative z-10">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              TOP 5% DE ATLETAS
            </p>
            <div className="absolute inset-0 opacity-10 halftone group-hover:opacity-20 transition-opacity"></div>
          </div>

          <div className="md:col-span-2 border-2 border-retro-black bg-retro-black text-white p-6 shadow-retro relative overflow-hidden flex flex-col justify-between">
            <div className="flex justify-between items-start z-10 relative">
              <div>
                <p className="text-xs font-bold uppercase text-gray-400 mb-2">A continuación • 10:00 AM</p>
                <h3 className="text-3xl font-display font-bold uppercase leading-tight">HIIT Avanzado:<br/><span className="italic font-light">Resistencia</span></h3>
                <p className="mt-2 text-sm border-l-2 border-white pl-2">con la Entrenadora Sarah Jenkins</p>
              </div>
              <div className="bg-white text-retro-black px-3 py-1 text-xs font-black uppercase animate-pulse">En vivo en 15m</div>
            </div>
            <div className="flex gap-4 mt-8 z-10 relative">
              <button className="flex-1 bg-white text-retro-black py-3 font-bold uppercase text-sm border-2 border-white flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
                <span className="material-symbols-outlined">play_circle</span> Unirse a Clase
              </button>
              <button className="px-8 py-3 border-2 border-white font-bold uppercase text-sm hover:bg-white hover:text-retro-black transition-all">Detalles</button>
            </div>
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[length:8px_8px]"></div>
          </div>
        </div>

        {/* Búsqueda y Filtros */}
        <div className="mb-12">
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2">search</span>
            <input 
              type="text" 
              placeholder="BUSCAR GIMNASIOS, CLASES O INSTRUCTORES..." 
              className="w-full bg-white border-2 border-retro-black p-4 pl-12 text-lg font-black uppercase focus:ring-0 focus:shadow-retro transition-shadow"
            />
          </div>
        </div>

        {/* Contenido Destacado */}
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-6 border-b-2 border-retro-black pb-2">
              <h2 className="text-2xl font-display font-black uppercase">Cursos Inscritos</h2>
              <button className="text-xs font-bold uppercase flex items-center gap-1 hover:underline">
                Ver Todo <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
            
            <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x">
              {[
                { title: 'Fundamentos de Powerlifting', coach: 'Carlos Rodriguez', tag: 'Fuerza', price: '$45.000', weeks: '8 Semanas', rating: '4.8', img: 'https://picsum.photos/seed/lift/400/300' },
                { title: 'Fortaleza Mental para Élite', coach: 'Dra. Elena Gomez', tag: 'Salud Mental', price: '$30.000', weeks: '4 Semanas', rating: '4.9', img: 'https://picsum.photos/seed/meditate/400/300' },
              ].map((course, idx) => (
                <div key={idx} className="min-w-[300px] border-2 border-retro-black bg-white shadow-retro-sm hover:-translate-y-1 hover:shadow-retro transition-all group snap-center flex flex-col">
                  <div className="aspect-[4/3] relative border-b-2 border-retro-black grayscale group-hover:grayscale-0 transition-all overflow-hidden">
                    <img src={course.img} className="object-cover w-full h-full" alt={course.title} />
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-display font-bold uppercase text-lg leading-tight mb-1">{course.title}</h3>
                    <p className="text-[10px] text-gray-500 font-bold mb-4 uppercase">Por {course.coach}</p>
                    <div className="mt-auto pt-4 border-t-2 border-dashed border-retro-black flex justify-between items-center">
                      <span className="text-[10px] font-bold uppercase flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">schedule</span> {course.weeks}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white border-2 border-retro-black p-6 shadow-retro">
              <h2 className="text-2xl font-display font-black uppercase mb-6 border-b-2 border-retro-black pb-2">Mi Progreso</h2>
              <div className="mb-8">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-black uppercase">Actividad Semanal</span>
                  <span className="text-xl font-black">4/5</span>
                </div>
                <div className="h-4 border-2 border-retro-black p-0.5">
                  <div className="h-full bg-retro-black w-[80%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AthleteDashboard;
