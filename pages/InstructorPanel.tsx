
import React from 'react';

const InstructorPanel: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex font-mono border-t-4 border-retro-black">
      {/* Navegación Lateral */}
      <aside className="hidden lg:flex flex-col w-72 border-r-4 border-retro-black bg-white">
        <div className="p-6 flex flex-col gap-8 flex-1">
          <div className="flex items-center gap-4 border-b-2 border-retro-black pb-4">
            <div className="size-12 border-2 border-retro-black grayscale overflow-hidden">
               <img src="https://picsum.photos/seed/coach/100/100" className="object-cover w-full h-full" alt="Entrenador" />
            </div>
            <div>
              <p className="text-xs font-black uppercase truncate">C. Ramirez</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Instructor_Pro</p>
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            {[
              { label: 'Tablero', icon: 'dashboard', active: true },
              { label: 'Horario', icon: 'calendar_month', active: false },
              { label: 'Creador de Cursos', icon: 'video_library', active: false, badge: 'Nuevo' },
              { label: 'Finanzas', icon: 'payments', active: false },
              { label: 'Estudiantes', icon: 'groups', active: false },
            ].map(item => (
              <a 
                key={item.label}
                href="#"
                className={`flex items-center gap-3 px-4 py-3 border-2 border-transparent transition-all uppercase font-bold text-sm tracking-tight ${item.active ? 'bg-retro-black text-white border-retro-black shadow-retro-sm' : 'text-gray-500 hover:border-retro-black hover:bg-gray-50 hover:text-retro-black'}`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="container mx-auto max-w-7xl p-6 lg:p-10">
          <header className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="text-4xl font-display font-black uppercase tracking-tighter border-b-4 border-retro-black inline-block pb-1">PANEL DE CONTROL</h2>
              <p className="mt-2 text-xs font-bold text-gray-500">// Gestión avanzada de negocio deportivo.</p>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <button className="bg-retro-black text-white px-6 py-2.5 font-bold uppercase text-sm border-2 border-retro-black shadow-retro flex items-center gap-2 hover:-translate-y-1 transition-all">
                <span className="material-symbols-outlined">add</span>
                Nuevo Curso
              </button>
            </div>
          </header>

          {/* Cuadrícula de Estadísticas */}
          <section className="mb-10 border-4 border-retro-black bg-white shadow-retro flex flex-col">
            <div className="flex items-center justify-between border-b-2 border-retro-black bg-gray-100 px-6 py-4">
               <div className="flex items-center gap-2">
                 <span className="material-symbols-outlined">account_balance_wallet</span>
                 <h3 className="font-bold uppercase tracking-tight text-xs">Estado de Cuenta (COP)</h3>
               </div>
            </div>
            
            <div className="grid md:grid-cols-4">
              <div className="p-6 border-b-2 md:border-b-0 md:border-r-2 border-retro-black border-dashed md:border-solid halftone opacity-60">
                <p className="text-[10px] font-black text-gray-400 uppercase mb-2">Ingresos Brutos</p>
                <p className="text-3xl font-black">$2.500.000</p>
              </div>
              <div className="p-6 border-b-2 md:border-b-0 md:border-r-2 border-retro-black border-dashed md:border-solid bg-white">
                <p className="text-[10px] font-black text-gray-400 uppercase mb-2">Retenciones</p>
                <p className="text-2xl font-black">-$250.000</p>
              </div>
              <div className="p-6 border-b-2 md:border-b-0 md:border-r-2 border-retro-black border-dashed md:border-solid bg-white">
                <p className="text-[10px] font-black text-gray-400 uppercase mb-2">Plataforma</p>
                <p className="text-2xl font-black">-$300.000</p>
              </div>
              <div className="p-6 bg-retro-black text-white">
                <p className="text-[10px] font-black text-gray-400 uppercase mb-2">Ingreso Neto</p>
                <p className="text-4xl font-black">$1.950.000</p>
              </div>
            </div>
          </section>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { label: 'Estudiantes', value: '1,248', icon: 'groups' },
                  { label: 'Rating', value: '4.9', suffix: '/5', icon: 'star' },
                  { label: 'Cursos', value: '8', icon: 'play_lesson' }
                ].map((stat, i) => (
                  <div key={i} className="border-4 border-retro-black bg-white p-5 shadow-retro-sm">
                    <p className="text-[10px] font-black text-gray-400 uppercase">{stat.label}</p>
                    <p className="text-3xl font-black">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InstructorPanel;
