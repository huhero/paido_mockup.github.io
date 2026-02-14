
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const CourseInfoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('resumen');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Mock de datos centralizado con múltiples opciones
  const courses: Record<string, any> = {
    "1": {
      title: "Servicio de Potencia Pro",
      tag: "TENIS",
      instructors: ["Andrés M. Sampras", "Julián Álvarez"],
      centers: ["Elite Tennis Club", "Power House", "Zenith Studio"],
      price: "$180.000",
      duration: "6 SEMANAS",
      level: "Avanzado",
      schedules: [
        "Sábados (08:00 - 10:00)", 
        "Domingos (10:00 - 12:00)",
        "Martes y Jueves (18:00 - 19:30)"
      ],
      image: "https://images.unsplash.com/photo-1595435066319-4051d3828223?q=80&w=1200&auto=format&fit=crop",
      description: "Programa intensivo de optimización técnica del saque. Trabajamos biomecánica, potencia explosiva y colocación bajo presión competitiva.",
      curriculum: [
        { title: "Mecánica del Lanzamiento", content: "Alineación del eje y punto de contacto óptimo." },
        { title: "Carga y Explosión", content: "Transferencia de energía desde el tren inferior." },
        { title: "Efectos Avanzados", content: "Dominando el Kick y el Slice para control total." }
      ],
      requirements: [
        "Nivel avanzado comprobado",
        "Raqueta de competición",
        "Certificado médico vigente"
      ]
    },
    "2": {
      title: "Táctica y Visión Moderna",
      tag: "FÚTBOL",
      instructors: ["Julián Álvarez", "Andrés M. Sampras"],
      centers: ["Power House", "Elite Tennis Club"],
      price: "$125.000",
      duration: "8 SEMANAS",
      level: "Intermedio",
      schedules: [
        "Lunes a Viernes (18:00 - 20:00)",
        "Sábados (09:00 - 12:00)"
      ],
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
      description: "Análisis estratégico y toma de decisiones en tiempo real. Mejora tu lectura de espacios y transiciones ofensivas.",
      curriculum: [
        { title: "Lectura de Espacios", content: "Identificación de líneas de pase y zonas de presión." },
        { title: "Transiciones Rápidas", content: "Mecanismos de ataque tras recuperación." },
        { title: "Finalización Pro", content: "Técnicas de remate en situaciones de 1 vs 1." }
      ],
      requirements: [
        "Estado físico intermedio",
        "Calzado para grama sintética",
        "App PAIDO instalada"
      ]
    }
  };

  const course = courses[id || "1"] || courses["1"];

  return (
    <div className="bg-paido-offwhite min-h-screen font-mono text-retro-black pb-20">
      
      {/* Header Simple */}
      <header className="max-w-7xl mx-auto px-6 pt-12 md:pt-20">
        <Link to="/course" className="inline-flex items-center gap-2 text-[10px] font-black uppercase mb-6 hover:underline">
          <span className="material-symbols-outlined text-sm">arrow_back</span> Volver al catálogo
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-8 border-retro-black pb-8">
          <div>
            <div className="flex gap-2 mb-4">
              <span className="bg-retro-black text-white px-2 py-0.5 text-[10px] font-black uppercase italic">{course.tag}</span>
              <span className="border-2 border-retro-black px-2 py-0.5 text-[10px] font-black uppercase">{course.level}</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter leading-none">
              {course.title}
            </h1>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">ID_REF</p>
            <p className="text-xl font-black italic">#PAIDO_00{id}</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Contenido Izquierdo */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Imagen Destacada */}
            <div className="border-4 border-retro-black aspect-video overflow-hidden shadow-retro-sm">
              <img src={course.image} alt={course.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
            </div>

            {/* Sistema de Navegación por Pestañas */}
            <div className="bg-white border-4 border-retro-black shadow-retro-sm">
              <nav className="flex border-b-4 border-retro-black bg-paido-offwhite">
                {[
                  { id: 'resumen', label: 'Resumen', icon: 'info' },
                  { id: 'plan', label: 'Plan de Estudio', icon: 'list_alt' },
                  { id: 'requisitos', label: 'Requisitos', icon: 'verified' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 text-[10px] font-black uppercase border-r-4 border-retro-black last:border-r-0 transition-all
                      ${activeTab === tab.id ? 'bg-retro-black text-white' : 'hover:bg-retro-gray'}
                    `}
                  >
                    <span className="material-symbols-outlined text-sm">{tab.icon}</span>
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </nav>

              <div className="p-8 md:p-12 min-h-[300px]">
                {activeTab === 'resumen' && (
                  <div className="animate-in fade-in duration-300 space-y-10">
                    <p className="text-2xl font-bold leading-tight italic border-l-8 border-retro-black pl-8">
                      "{course.description}"
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-8 border-t-2 border-dashed border-gray-200">
                      {/* Listado de Instructores */}
                      <div className="space-y-4">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-1">Instructores Disponibles</p>
                        <ul className="space-y-3">
                          {course.instructors.map((ins: string, i: number) => (
                            <li key={i} className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-xs">school</span>
                              <Link 
                                to={`/instructor-profile/${encodeURIComponent(ins)}`} 
                                className="text-xs font-black uppercase hover:underline decoration-2 underline-offset-4"
                              >
                                {ins}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Listado de Sedes */}
                      <div className="space-y-4">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-1">Sedes Activas</p>
                        <ul className="space-y-3">
                          {course.centers.map((center: string, i: number) => (
                            <li key={i} className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-xs">location_on</span>
                              <span className="text-xs font-black uppercase">{center}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Listado de Horarios */}
                      <div className="space-y-4">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-1">Opciones de Horario</p>
                        <ul className="space-y-3">
                          {course.schedules.map((schedule: string, i: number) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="material-symbols-outlined text-xs mt-0.5">schedule</span>
                              <span className="text-xs font-black uppercase leading-tight">{schedule}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'plan' && (
                  <div className="animate-in fade-in duration-300 space-y-6">
                    {course.curriculum.map((item: any, i: number) => (
                      <div key={i} className="flex gap-6 p-6 border-2 border-retro-black bg-paido-offwhite">
                        <span className="text-2xl font-display font-black italic opacity-30">0{i+1}</span>
                        <div>
                          <h4 className="font-black uppercase text-sm mb-1">{item.title}</h4>
                          <p className="text-xs font-bold text-gray-500 uppercase">{item.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'requisitos' && (
                  <div className="animate-in fade-in duration-300 space-y-4">
                    {course.requirements.map((req: string, i: number) => (
                      <div key={i} className="flex items-center gap-4 p-4 border-2 border-retro-black bg-white">
                        <span className="material-symbols-outlined text-yellow-500">check_circle</span>
                        <span className="text-xs font-black uppercase">{req}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar de Acción */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white border-4 border-retro-black p-8 shadow-retro">
              <div className="text-center mb-8 pb-6 border-b-2 border-retro-black">
                <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Costo de Inscripción</p>
                <h3 className="text-4xl md:text-5xl font-display font-black italic tracking-tighter">
                  {course.price}
                </h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[10px] font-black uppercase px-2">
                  <span className="text-gray-400 tracking-widest">Duración</span>
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-black uppercase px-2">
                  <span className="text-gray-400 tracking-widest">Certificación</span>
                  <span className="text-green-600">INCLUIDA</span>
                </div>

                <Link 
                  to={`/enroll/${id}`}
                  className="w-full bg-retro-black text-white py-5 border-4 border-retro-black font-black uppercase text-sm shadow-retro-sm hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-3 active:scale-95 mt-4"
                >
                  RESERVAR CUPO <span className="material-symbols-outlined">payments</span>
                </Link>
                
                <p className="text-[7px] font-black text-center text-gray-400 uppercase tracking-widest mt-4">
                  Pagos seguros vía PSE y Tarjeta // PAIDO OS
                </p>
              </div>
            </div>

            <div className="bg-retro-black text-white p-6 border-4 border-retro-black">
               <h4 className="text-xs font-black uppercase mb-2">¿Necesitas ayuda?</h4>
               <p className="text-[10px] font-bold text-gray-400 uppercase mb-4">Consulta disponibilidad inmediata por sede</p>
               <button className="w-full bg-white text-retro-black py-2 text-[10px] font-black uppercase border-2 border-white">SOPORTE_CENTRAL</button>
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
};

export default CourseInfoPage;
