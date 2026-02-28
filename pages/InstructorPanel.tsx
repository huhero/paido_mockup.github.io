
import React, { useState } from 'react';

const InstructorPanel: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const settingsOptions = [
    { id: 'profile', label: 'Perfil del Centro', icon: 'domain', desc: 'Información pública de tu sede.' },
    { id: 'payouts', label: 'Configuración de Pagos', icon: 'account_balance', desc: 'Cuentas bancarias y retiros.' },
    { id: 'team', label: 'Gestión de Equipo', icon: 'badge', desc: 'Administra otros instructores.' },
    { id: 'security', label: 'Seguridad', icon: 'lock', desc: 'Contraseña y accesos.' },
  ];

  const navItems = [
    { label: 'Tablero', icon: 'dashboard', active: true },
    { label: 'Horario', icon: 'calendar_month', active: false },
    { label: 'Creador de Cursos', icon: 'video_library', active: false, badge: 'Nuevo' },
    { label: 'Finanzas', icon: 'payments', active: false },
    { label: 'Estudiantes', icon: 'groups', active: false },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row font-mono border-t-4 border-retro-black relative">
      {/* Settings Overlay */}
      {showSettings && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-retro-black/40 backdrop-blur-sm" onClick={() => setShowSettings(false)}></div>
          <div className="relative w-full max-w-2xl bg-white border-4 border-retro-black shadow-retro animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b-4 border-retro-black p-4 md:p-6 bg-paido-offwhite">
              <h2 className="text-2xl md:text-3xl font-display font-black uppercase tracking-tighter italic">Centro_Config_OS</h2>
              <button 
                onClick={() => setShowSettings(false)}
                className="size-10 bg-retro-black text-white flex items-center justify-center hover:rotate-90 transition-transform"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="p-4 md:p-8 max-h-[70vh] overflow-y-auto scrollbar-hide">
              <div className="space-y-4">
                {settingsOptions.map((option) => (
                  <button 
                    key={option.id}
                    className="w-full flex items-center gap-4 md:gap-6 p-4 border-2 border-retro-black hover:bg-paido-offwhite hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-retro-sm transition-all text-left group"
                  >
                    <div className="size-10 md:size-12 bg-retro-black text-white flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-retro-black transition-colors shrink-0">
                      <span className="material-symbols-outlined">{option.icon}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-black uppercase text-xs md:text-sm tracking-tight">{option.label}</p>
                      <p className="text-[8px] md:text-[10px] font-bold text-gray-500 uppercase">{option.desc}</p>
                    </div>
                    <span className="material-symbols-outlined text-gray-300 group-hover:text-retro-black transition-colors">chevron_right</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-retro-black text-white text-center">
              <p className="text-[8px] font-black uppercase tracking-[0.4em]">PAIDO_V2.5.0 // INSTRUCTOR_CONFIG_ACTIVE</p>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[150] lg:hidden">
          <div className="absolute inset-0 bg-retro-black/40 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white border-r-4 border-retro-black shadow-retro animate-in slide-in-from-left duration-300">
            <div className="p-6 flex flex-col gap-8 h-full">
              <div className="flex items-center justify-between border-b-2 border-retro-black pb-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 border-2 border-retro-black grayscale overflow-hidden">
                    <img src="https://picsum.photos/seed/coach/100/100" className="object-cover w-full h-full" alt="Entrenador" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase truncate">C. Ramirez</p>
                    <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">Instructor_Pro</p>
                  </div>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="size-8 bg-retro-black text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>

              <nav className="flex flex-col gap-2 flex-1">
                {navItems.map(item => (
                  <a 
                    key={item.label}
                    href="#"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 border-2 border-transparent transition-all uppercase font-bold text-sm tracking-tight ${item.active ? 'bg-retro-black text-white border-retro-black shadow-retro-sm' : 'text-gray-500 hover:border-retro-black hover:bg-gray-50 hover:text-retro-black'}`}
                  >
                    <span className="material-symbols-outlined">{item.icon}</span>
                    {item.label}
                  </a>
                ))}
                
                <div className="h-px bg-retro-black opacity-10 my-4"></div>

                <button 
                  onClick={() => { setShowSettings(true); setIsMobileMenuOpen(false); }}
                  className="flex items-center gap-3 px-4 py-3 border-2 border-transparent hover:border-retro-black hover:bg-gray-50 transition-all uppercase font-bold text-sm tracking-tight text-gray-500 hover:text-retro-black"
                >
                  <span className="material-symbols-outlined">settings</span>
                  Configuración
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Navegación Lateral (Desktop) */}
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
            {navItems.map(item => (
              <a 
                key={item.label}
                href="#"
                className={`flex items-center gap-3 px-4 py-3 border-2 border-transparent transition-all uppercase font-bold text-sm tracking-tight ${item.active ? 'bg-retro-black text-white border-retro-black shadow-retro-sm' : 'text-gray-500 hover:border-retro-black hover:bg-gray-50 hover:text-retro-black'}`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                {item.label}
              </a>
            ))}
            
            <div className="h-px bg-retro-black opacity-10 my-4"></div>

            <button 
              onClick={() => setShowSettings(true)}
              className="flex items-center gap-3 px-4 py-3 border-2 border-transparent hover:border-retro-black hover:bg-gray-50 transition-all uppercase font-bold text-sm tracking-tight text-gray-500 hover:text-retro-black"
            >
              <span className="material-symbols-outlined">settings</span>
              Configuración
            </button>
          </nav>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="container mx-auto max-w-7xl p-4 md:p-6 lg:p-10">
          <header className="mb-8 md:mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="flex items-center justify-between md:block">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black uppercase tracking-tighter border-b-4 border-retro-black inline-block pb-1">PANEL DE CONTROL</h2>
                <p className="mt-2 text-[10px] md:text-xs font-bold text-gray-500 tracking-tight md:tracking-normal">// Gestión avanzada de negocio deportivo.</p>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden size-12 border-4 border-retro-black flex items-center justify-center shadow-retro-sm bg-white active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                <span className="material-symbols-outlined">menu</span>
              </button>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <button className="w-full sm:w-auto bg-retro-black text-white px-6 py-3 font-bold uppercase text-xs md:text-sm border-2 border-retro-black shadow-retro flex items-center justify-center gap-2 hover:-translate-y-1 transition-all">
                <span className="material-symbols-outlined">add</span>
                Nuevo Curso
              </button>
            </div>
          </header>

          {/* Cuadrícula de Estadísticas */}
          <section className="mb-8 md:mb-10 border-4 border-retro-black bg-white shadow-retro flex flex-col">
            <div className="flex items-center justify-between border-b-2 border-retro-black bg-gray-100 px-4 md:px-6 py-3 md:py-4">
               <div className="flex items-center gap-2">
                 <span className="material-symbols-outlined text-sm md:text-base">account_balance_wallet</span>
                 <h3 className="font-bold uppercase tracking-tight text-[10px] md:text-xs">Estado de Cuenta (COP)</h3>
               </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
              <div className="p-4 md:p-6 border-b-2 sm:border-b-2 md:border-b-0 sm:border-r-2 md:border-r-2 border-retro-black border-dashed md:border-solid halftone opacity-60">
                <p className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase mb-1 md:mb-2">Ingresos Brutos</p>
                <p className="text-2xl md:text-3xl font-black">$2.500.000</p>
              </div>
              <div className="p-4 md:p-6 border-b-2 sm:border-b-2 md:border-b-0 md:border-r-2 border-retro-black border-dashed md:border-solid bg-white">
                <p className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase mb-1 md:mb-2">Retenciones</p>
                <p className="text-xl md:text-2xl font-black">-$250.000</p>
              </div>
              <div className="p-4 md:p-6 border-b-2 sm:border-b-0 md:border-b-0 sm:border-r-2 md:border-r-2 border-retro-black border-dashed md:border-solid bg-white">
                <p className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase mb-1 md:mb-2">Plataforma</p>
                <p className="text-xl md:text-2xl font-black">-$300.000</p>
              </div>
              <div className="p-4 md:p-6 bg-retro-black text-white">
                <p className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase mb-1 md:mb-2">Ingreso Neto</p>
                <p className="text-3xl md:text-4xl font-black">$1.950.000</p>
              </div>
            </div>
          </section>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                {[
                  { label: 'Estudiantes', value: '1,248', icon: 'groups' },
                  { label: 'Rating', value: '4.9', suffix: '/5', icon: 'star' },
                  { label: 'Cursos', value: '8', icon: 'play_lesson' }
                ].map((stat, i) => (
                  <div key={i} className="border-4 border-retro-black bg-white p-4 md:p-5 shadow-retro-sm flex flex-col justify-center">
                    <p className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase">{stat.label}</p>
                    <p className="text-2xl md:text-3xl font-black">{stat.value}{stat.suffix && <span className="text-xs align-top">{stat.suffix}</span>}</p>
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
