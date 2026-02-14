
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const InstructorProfilePage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const decodedName = decodeURIComponent(name || "");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [name]);

  // Mock de datos de instructores actualizado con Profesión
  const instructors: Record<string, any> = {
    "Andrés M. Sampras": {
      role: "Maestro de Tenis",
      profession: "Lic. en Educación Física",
      specialty: "BIOMECÁNICA DEL SAQUE",
      experience: "15 AÑOS",
      bio: "Ex-competidor de circuito nacional con especialización en ciencias del deporte. Enfocado en la optimización del rendimiento técnico mediante análisis cinemático.",
      achievements: [
        "Certificación ITF Nivel 3",
        "Head Coach en Elite Tennis Club",
        "Consultor de biomecánica para atletas pro"
      ],
      courses: [
        { id: 1, title: "Servicio de Potencia Pro", tag: "TENIS", price: "$180.000" },
        { id: 12, title: "Control de Fondo: Topspin", tag: "TENIS", price: "$150.000" }
      ],
      image: "https://picsum.photos/seed/coach-andres/400/500"
    },
    "Julián Álvarez": {
      role: "Estratega de Fútbol",
      profession: "Director Técnico Profesional",
      specialty: "TÁCTICA MODERNA",
      experience: "8 AÑOS",
      bio: "Analista de video y entrenador de campo. Su enfoque combina la tecnología de tracking con ejercicios de toma de decisiones bajo presión.",
      achievements: [
        "Licencia Pro CONMEBOL",
        "Analista de datos certificado",
        "Campeón distrital sub-21 (2022)"
      ],
      courses: [
        { id: 2, title: "Táctica y Visión Moderna", tag: "FÚTBOL", price: "$125.000" }
      ],
      image: "https://picsum.photos/seed/coach-julian/400/500"
    }
  };

  const coach = instructors[decodedName] || instructors["Andrés M. Sampras"];

  return (
    <div className="bg-paido-offwhite min-h-screen font-mono text-retro-black pb-20">
      
      {/* Hero Header Coach */}
      <header className="bg-white border-b-8 border-retro-black">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row items-center gap-12">
          
          {/* Foto del Coach */}
          <div className="w-full md:w-1/3 aspect-[3/4] border-8 border-retro-black shadow-retro relative overflow-hidden group">
             <img src={coach.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={decodedName} />
             <div className="absolute top-4 left-4 bg-retro-black text-white px-3 py-1 text-[10px] font-black uppercase border-2 border-white">
               COACH_VERIFICADO
             </div>
          </div>

          {/* Info Principal */}
          <div className="flex-1 space-y-6">
            <Link to="/course" className="inline-flex items-center gap-2 text-[10px] font-black uppercase hover:underline mb-4">
              <span className="material-symbols-outlined text-sm">west</span> Volver al catálogo
            </Link>
            
            <div className="space-y-2">
              <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">// {coach.role}</h2>
              <h1 className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter leading-[0.85] italic">
                {decodedName}
              </h1>
              <p className="bg-retro-black text-white px-4 py-1 text-sm font-black uppercase w-fit skew-x-[-10deg]">
                {coach.specialty}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-8 border-t-4 border-retro-black">
               <div className="text-left">
                  <p className="text-[8px] font-black text-gray-400 uppercase mb-1">Experiencia</p>
                  <p className="text-xl font-black italic">{coach.experience}</p>
               </div>
               <div className="text-left border-l-2 border-retro-black pl-4">
                  <p className="text-[8px] font-black text-gray-400 uppercase mb-1">Profesión</p>
                  <p className="text-xl font-black italic uppercase">{coach.profession}</p>
               </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-12 gap-16">
        
        {/* Lado Izquierdo: Bio y Logros */}
        <div className="lg:col-span-8 space-y-16">
          <section>
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6 border-b-2 border-gray-100 pb-2">TRAYECTORIA_Y_FILOSOFÍA</h3>
            <p className="text-2xl font-bold leading-relaxed italic border-l-8 border-retro-black pl-8">
              "{coach.bio}"
            </p>
          </section>

          <section>
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-8 border-b-2 border-gray-100 pb-2">CERTIFICACIONES_Y_LOGROS</h3>
            <div className="grid md:grid-cols-1 gap-4">
              {coach.achievements.map((ach: string, i: number) => (
                <div key={i} className="flex items-center gap-6 p-6 border-4 border-retro-black bg-white group hover:bg-yellow-400 transition-colors">
                  <div className="size-10 border-2 border-retro-black flex items-center justify-center font-black group-hover:bg-retro-black group-hover:text-white transition-all">
                    {i + 1}
                  </div>
                  <p className="text-xs md:text-sm font-black uppercase italic">{ach}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Lado Derecho: Cursos Activos */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="bg-white border-4 border-retro-black p-8 shadow-retro sticky top-28">
            <h3 className="text-sm font-black uppercase mb-6 border-b-4 border-retro-black pb-4 italic">Cursos Dictados</h3>
            
            <div className="space-y-6">
              {coach.courses.map((course: any) => (
                <div key={course.id} className="border-2 border-retro-black p-4 hover:bg-paido-offwhite transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="bg-retro-black text-white px-2 py-0.5 text-[8px] font-black uppercase italic">{course.tag}</span>
                    <span className="text-[10px] font-black">{course.price}</span>
                  </div>
                  <Link to={`/course/${course.id}`} className="text-sm font-black uppercase hover:underline leading-tight block mb-4">
                    {course.title}
                  </Link>
                  <Link to={`/course/${course.id}`} className="text-[8px] font-black uppercase border-2 border-retro-black px-3 py-1 inline-block hover:bg-retro-black hover:text-white transition-all">
                    DETALLES_CURSO
                  </Link>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t-2 border-dashed border-gray-200 text-center">
               <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">
                 PAIDO PROFESSIONAL NETWORK
               </p>
            </div>
          </div>
        </aside>

      </main>
    </div>
  );
};

export default InstructorProfilePage;
