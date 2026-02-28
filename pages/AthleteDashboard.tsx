
import React, { useState } from 'react';

const AthleteDashboard: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [activeSetting, setActiveSetting] = useState<string | null>(null);
  const [dependents, setDependents] = useState([
    { id: 1, name: 'Lucas G. Navarro', age: 12, relation: 'Hijo' },
    { id: 2, name: 'Sofía G. Navarro', age: 8, relation: 'Hija' }
  ]);
  const [newDependent, setNewDependent] = useState({ name: '', age: '', relation: '' });

  const settingsOptions = [
    { id: 'profile', label: 'Perfil Público', icon: 'person', desc: 'Gestiona cómo te ven otros atletas.' },
    { id: 'dependents', label: 'Personas Dependientes', icon: 'family_restroom', desc: 'Gestiona cuentas de menores (hijos, familiares).' },
    { id: 'notifications', label: 'Notificaciones', icon: 'notifications', desc: 'Alertas de clases y mensajes.' },
    { id: 'security', label: 'Seguridad', icon: 'shield', desc: 'Contraseña y autenticación.' },
    { id: 'privacy', label: 'Privacidad', icon: 'visibility_off', desc: 'Control de datos y visibilidad.' },
    { id: 'billing', label: 'Pagos y Suscripción', icon: 'credit_card', desc: 'Métodos de pago y facturas.' },
  ];

  const handleAddDependent = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDependent.name && newDependent.age) {
      setDependents([...dependents, { 
        id: Date.now(), 
        name: newDependent.name, 
        age: parseInt(newDependent.age), 
        relation: newDependent.relation || 'Dependiente' 
      }]);
      setNewDependent({ name: '', age: '', relation: '' });
    }
  };

  const removeDependent = (id: number) => {
    setDependents(dependents.filter(d => d.id !== id));
  };

  return (
    <div className="min-h-screen bg-retro-white border-x-2 border-retro-black max-w-[1440px] mx-auto font-mono relative">
      {/* Settings Overlay */}
      {showSettings && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-retro-black/40 backdrop-blur-sm" onClick={() => { setShowSettings(false); setActiveSetting(null); }}></div>
          <div className="relative w-full max-w-2xl bg-white border-4 border-retro-black shadow-retro animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b-4 border-retro-black p-6 bg-paido-offwhite">
              <div className="flex items-center gap-4">
                {activeSetting && (
                  <button onClick={() => setActiveSetting(null)} className="size-8 bg-retro-black text-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                  </button>
                )}
                <h2 className="text-2xl md:text-3xl font-display font-black uppercase tracking-tighter italic">
                  {activeSetting ? settingsOptions.find(o => o.id === activeSetting)?.label : 'Configuración_OS'}
                </h2>
              </div>
              <button 
                onClick={() => { setShowSettings(false); setActiveSetting(null); }}
                className="size-10 bg-retro-black text-white flex items-center justify-center hover:rotate-90 transition-transform"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="p-6 md:p-8 max-h-[70vh] overflow-y-auto scrollbar-hide">
              {!activeSetting ? (
                <div className="space-y-4">
                  {settingsOptions.map((option) => (
                    <button 
                      key={option.id}
                      onClick={() => setActiveSetting(option.id)}
                      className="w-full flex items-center gap-6 p-4 border-2 border-retro-black hover:bg-paido-offwhite hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-retro-sm transition-all text-left group"
                    >
                      <div className="size-12 bg-retro-black text-white flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-retro-black transition-colors">
                        <span className="material-symbols-outlined">{option.icon}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-black uppercase text-sm tracking-tight">{option.label}</p>
                        <p className="text-[10px] font-bold text-gray-500 uppercase">{option.desc}</p>
                      </div>
                      <span className="material-symbols-outlined text-gray-300 group-hover:text-retro-black transition-colors">chevron_right</span>
                    </button>
                  ))}

                  <div className="mt-10 pt-6 border-t-4 border-retro-black border-dashed">
                    <div className="flex items-center justify-between p-4 bg-red-50 border-2 border-red-600 text-red-600">
                      <div>
                        <p className="font-black uppercase text-xs">Zona de Peligro</p>
                        <p className="text-[10px] font-bold uppercase">Eliminar cuenta permanentemente</p>
                      </div>
                      <button className="bg-red-600 text-white px-4 py-2 text-[10px] font-black uppercase hover:bg-red-700 transition-colors">
                        Borrar
                      </button>
                    </div>
                  </div>
                </div>
              ) : activeSetting === 'dependents' ? (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="bg-yellow-50 border-2 border-retro-black p-4 text-[10px] font-bold uppercase leading-tight">
                    <p className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-sm">info</span>
                      IMPORTANTE
                    </p>
                    Los menores de 18 años no pueden crear cuentas independientes. Como tutor, puedes gestionar sus inscripciones y progreso desde aquí.
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase border-b-2 border-retro-black pb-1">Dependientes Registrados ({dependents.length})</h3>
                    {dependents.length === 0 ? (
                      <p className="text-[10px] text-gray-400 italic">No hay dependientes registrados.</p>
                    ) : (
                      <div className="grid gap-3">
                        {dependents.map(dep => (
                          <div key={dep.id} className="flex items-center justify-between p-4 border-2 border-retro-black bg-white shadow-retro-sm">
                            <div className="flex items-center gap-4">
                              <div className="size-10 bg-paido-offwhite border-2 border-retro-black flex items-center justify-center">
                                <span className="material-symbols-outlined">child_care</span>
                              </div>
                              <div>
                                <p className="font-black uppercase text-xs">{dep.name}</p>
                                <p className="text-[8px] font-bold text-gray-400 uppercase">{dep.relation} • {dep.age} años</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button className="size-8 border-2 border-retro-black flex items-center justify-center hover:bg-paido-offwhite">
                                <span className="material-symbols-outlined text-sm">edit</span>
                              </button>
                              <button 
                                onClick={() => removeDependent(dep.id)}
                                className="size-8 border-2 border-red-600 text-red-600 flex items-center justify-center hover:bg-red-50"
                              >
                                <span className="material-symbols-outlined text-sm">delete</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-6 border-t-4 border-retro-black border-dashed">
                    <h3 className="text-xs font-black uppercase mb-4">Agregar Nuevo Dependiente</h3>
                    <form onSubmit={handleAddDependent} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-[8px] font-black uppercase mb-1">Nombre Completo</label>
                          <input 
                            type="text" 
                            value={newDependent.name}
                            onChange={(e) => setNewDependent({...newDependent, name: e.target.value})}
                            className="w-full border-2 border-retro-black p-2 text-xs font-bold outline-none focus:bg-paido-offwhite uppercase"
                            placeholder="EJ: LUCAS G. NAVARRO"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] font-black uppercase mb-1">Edad</label>
                          <input 
                            type="number" 
                            value={newDependent.age}
                            onChange={(e) => setNewDependent({...newDependent, age: e.target.value})}
                            className="w-full border-2 border-retro-black p-2 text-xs font-bold outline-none focus:bg-paido-offwhite"
                            placeholder="12"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] font-black uppercase mb-1">Parentesco</label>
                          <select 
                            value={newDependent.relation}
                            onChange={(e) => setNewDependent({...newDependent, relation: e.target.value})}
                            className="w-full border-2 border-retro-black p-2 text-xs font-bold outline-none focus:bg-paido-offwhite uppercase"
                          >
                            <option value="">Seleccionar</option>
                            <option value="Hijo">Hijo</option>
                            <option value="Hija">Hija</option>
                            <option value="Familiar">Familiar</option>
                            <option value="Otro">Otro</option>
                          </select>
                        </div>
                      </div>
                      <button 
                        type="submit"
                        className="w-full bg-retro-black text-white py-3 font-black uppercase text-xs shadow-retro-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                      >
                        Registrar Dependiente
                      </button>
                    </form>
                  </div>
                </div>
              ) : (
                <div className="py-20 text-center animate-in fade-in duration-300">
                  <span className="material-symbols-outlined text-6xl text-gray-200 mb-4">construction</span>
                  <p className="text-xs font-black uppercase text-gray-400 tracking-widest">Módulo en construcción</p>
                  <button onClick={() => setActiveSetting(null)} className="mt-6 text-[10px] font-black uppercase underline">Volver</button>
                </div>
              )}
            </div>

            <div className="p-4 bg-retro-black text-white text-center">
              <p className="text-[8px] font-black uppercase tracking-[0.4em]">PAIDO_V2.5.0 // CONFIG_MODULE_ACTIVE</p>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-10 py-6 md:py-10">
        {/* Perfil Rápido */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 md:mb-10 border-b-4 border-retro-black pb-6 gap-6 sm:gap-0">
           <div className="flex items-center gap-4 md:gap-6">
              <div className="size-16 md:size-20 border-4 border-retro-black overflow-hidden grayscale bg-gray-200 flex-shrink-0">
                 <img src="https://picsum.photos/seed/mateo/200/200" className="object-cover w-full h-full" alt="Perfil" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-black uppercase tracking-tighter">Mateo G.</h2>
                <p className="text-[10px] md:text-xs font-black bg-retro-black text-white px-2 py-0.5 w-fit uppercase">Atleta Pro</p>
              </div>
           </div>
           <div className="flex gap-3 sm:gap-4">
              <button className="flex-1 sm:flex-none h-12 sm:size-12 border-4 border-retro-black flex items-center justify-center shadow-retro-sm hover:bg-retro-gray transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none">
                <span className="material-symbols-outlined">notifications</span>
                <span className="sm:hidden ml-2 font-black text-[10px] uppercase">Alertas</span>
              </button>
              <button 
                onClick={() => setShowSettings(true)}
                className="flex-1 sm:flex-none h-12 sm:size-12 border-4 border-retro-black flex items-center justify-center shadow-retro-sm hover:bg-retro-gray transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                <span className="material-symbols-outlined">settings</span>
                <span className="sm:hidden ml-2 font-black text-[10px] uppercase">Ajustes</span>
              </button>
           </div>
        </div>

        {/* Sección de Bienvenida */}
        <div className="grid lg:grid-cols-12 gap-6 md:gap-8 mb-10 md:mb-12">
          <div className="lg:col-span-8">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-black uppercase tracking-tighter leading-[0.85] mb-4">
              TABLERO DE<br />
              <span className="italic font-light">RENDIMIENTO</span>
            </h1>
            <p className="border-l-4 border-retro-black pl-4 text-base md:text-lg font-medium max-w-xl">
              Tu próximo desafío te espera. La consistencia es la única moneda que importa aquí.
            </p>
          </div>
          <div className="lg:col-span-4 flex items-center lg:justify-end">
            <button className="w-full sm:w-auto bg-retro-black text-white px-8 py-4 font-bold uppercase flex items-center justify-center gap-3 border-2 border-retro-black shadow-retro hover:shadow-hover transition-all group">
              <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">calendar_month</span>
              Horario Completo
            </button>
          </div>
        </div>

        {/* Tarjetas Superiores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-12">
          <div className="border-2 border-retro-black bg-white p-6 shadow-retro relative overflow-hidden group cursor-pointer">
            <div className="flex justify-between items-start mb-4 relative z-10">
              <p className="text-[10px] md:text-xs font-black uppercase border-b-2 border-retro-black inline-block">Racha Actual</p>
              <span className="material-symbols-outlined text-3xl md:text-4xl group-hover:scale-110 transition-transform">local_fire_department</span>
            </div>
            <h3 className="text-5xl md:text-6xl font-display font-black relative z-10">12 <span className="text-lg md:text-xl align-top">DÍAS</span></h3>
            <p className="text-[10px] md:text-xs font-bold mt-4 flex items-center gap-2 relative z-10">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              TOP 5% DE ATLETAS
            </p>
            <div className="absolute inset-0 opacity-10 halftone group-hover:opacity-20 transition-opacity"></div>
          </div>

          <div className="md:col-span-2 border-2 border-retro-black bg-retro-black text-white p-6 shadow-retro relative overflow-hidden flex flex-col justify-between min-h-[200px]">
            <div className="flex justify-between items-start z-10 relative">
              <div>
                <p className="text-[10px] md:text-xs font-bold uppercase text-gray-400 mb-2">A continuación • 10:00 AM</p>
                <h3 className="text-2xl md:text-3xl font-display font-bold uppercase leading-tight">HIIT Avanzado:<br/><span className="italic font-light">Resistencia</span></h3>
                <p className="mt-2 text-xs md:text-sm border-l-2 border-white pl-2">con la Entrenadora Sarah Jenkins</p>
              </div>
              <div className="bg-white text-retro-black px-2 md:px-3 py-1 text-[8px] md:text-xs font-black uppercase animate-pulse shrink-0 ml-4">En vivo en 15m</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 z-10 relative">
              <button className="flex-1 bg-white text-retro-black py-3 font-bold uppercase text-xs md:text-sm border-2 border-white flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
                <span className="material-symbols-outlined">play_circle</span> Unirse a Clase
              </button>
              <button className="px-8 py-3 border-2 border-white font-bold uppercase text-xs md:text-sm hover:bg-white hover:text-retro-black transition-all">Detalles</button>
            </div>
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[length:8px_8px]"></div>
          </div>
        </div>

        {/* Búsqueda y Filtros */}
        <div className="mb-10 md:mb-12">
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2">search</span>
            <input 
              type="text" 
              placeholder="BUSCAR GIMNASIOS, CLASES..." 
              className="w-full bg-white border-2 border-retro-black p-4 pl-12 text-base md:text-lg font-black uppercase focus:ring-0 focus:shadow-retro transition-shadow placeholder:text-gray-300"
            />
          </div>
        </div>

        {/* Contenido Destacado */}
        <div className="grid lg:grid-cols-12 gap-10 md:gap-12">
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-6 border-b-2 border-retro-black pb-2">
              <h2 className="text-xl md:text-2xl font-display font-black uppercase">Cursos Inscritos</h2>
              <button className="text-[10px] md:text-xs font-bold uppercase flex items-center gap-1 hover:underline">
                Ver Todo <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
            
            <div className="flex gap-4 md:gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x">
              {[
                { title: 'Fundamentos de Powerlifting', coach: 'Carlos Rodriguez', tag: 'Fuerza', price: '$45.000', weeks: '8 Semanas', rating: '4.8', img: 'https://picsum.photos/seed/lift/400/300' },
                { title: 'Fortaleza Mental para Élite', coach: 'Dra. Elena Gomez', tag: 'Salud Mental', price: '$30.000', weeks: '4 Semanas', rating: '4.9', img: 'https://picsum.photos/seed/meditate/400/300' },
              ].map((course, idx) => (
                <div key={idx} className="min-w-[260px] sm:min-w-[300px] border-2 border-retro-black bg-white shadow-retro-sm hover:-translate-y-1 hover:shadow-retro transition-all group snap-center flex flex-col">
                  <div className="aspect-[4/3] relative border-b-2 border-retro-black grayscale group-hover:grayscale-0 transition-all overflow-hidden">
                    <img src={course.img} className="object-cover w-full h-full" alt={course.title} />
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-display font-bold uppercase text-base md:text-lg leading-tight mb-1">{course.title}</h3>
                    <p className="text-[9px] md:text-[10px] text-gray-500 font-bold mb-4 uppercase">Por {course.coach}</p>
                    <div className="mt-auto pt-4 border-t-2 border-dashed border-retro-black flex justify-between items-center">
                      <span className="text-[9px] md:text-[10px] font-bold uppercase flex items-center gap-1">
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
              <h2 className="text-xl md:text-2xl font-display font-black uppercase mb-6 border-b-2 border-retro-black pb-2">Mi Progreso</h2>
              <div className="mb-4 md:mb-8">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[10px] md:text-xs font-black uppercase">Actividad Semanal</span>
                  <span className="text-lg md:text-xl font-black">4/5</span>
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
