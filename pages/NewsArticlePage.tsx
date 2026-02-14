
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const NewsArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [id]);

  // Mock de datos enriquecido
  const articles: Record<string, any> = {
    "1": {
      title: "GRAN APERTURA: ELITE BOXING CHAPINERO",
      category: "EVENTO",
      date: "12 OCT, 2024",
      school: "Elite Tennis Club",
      author: "EQUIPO PAIDO",
      authorRole: "Senior Editorial",
      authorBio: "El equipo editorial de PAIDO OS se encarga de traerte las últimas novedades del ecosistema deportivo en Colombia.",
      readTime: "5 MIN READ",
      views: "1.2K",
      tags: ["BOXEO", "INAUGURACIÓN", "CHAPINERO", "TECNOLOGÍA"],
      image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop",
      content: [
        "Bogotá recibe hoy una nueva joya en su corona deportiva. Elite Boxing Chapinero abre sus puertas con una propuesta que redefine el entrenamiento de contacto. No se trata solo de sacos y guantes; es un laboratorio de biomecánica aplicada al combate.",
        "Ubicado en el corazón de Chapinero Alto, este centro cuenta con tecnología de rastreo de impacto en tiempo real. Cada golpe es analizado por sensores de alta precisión que envían datos directamente a la plataforma PAIDO.",
        "Nuestra visión es profesionalizar cada sesión. Queremos que el deportista recreativo tenga acceso a las mismas herramientas que un campeón mundial. La inauguración contará con una masterclass gratuita.",
        "El espacio incluye áreas de recuperación criogénica y una zona de nutrición especializada para optimizar la ventana anabólica post-entrenamiento."
      ]
    },
    "2": {
      title: "MATEO G. ROMPE EL RÉCORD DE SPRINT 100M",
      category: "RÉCORD",
      date: "08 OCT, 2024",
      school: "Lift Academy",
      author: "TELEMETRÍA PAIDO",
      authorRole: "Data Analyst System",
      authorBio: "Sistema automatizado de análisis de datos que destaca los hitos más importantes de nuestra red de atletas.",
      readTime: "3 MIN READ",
      views: "2.5K",
      tags: ["ATLETISMO", "RÉCORD", "VELOCIDAD", "DATA"],
      image: "https://images.unsplash.com/photo-1461896756913-647f00716c02?q=80&w=1200&auto=format&fit=crop",
      content: [
        "La pista del Parque Simón Bolívar fue testigo de una hazaña sin precedentes. Mateo G., utilizando los planes de entrenamiento de Lift Academy, logró marcar un tiempo histórico de 10.4 segundos.",
        "Este tiempo lo coloca en la cima del ranking semanal. Es el registro más veloz capturado por nuestro sistema desde el lanzamiento de la V2.5.",
        "Mateo ha integrado datos de sueño y nutrición en su tablero de rendimiento, permitiendo ajustes milimétricos en sus fases de carga y descarga.",
        "Felicitamos a Mateo y animamos a todos los atletas a seguir cargando sus datos. El próximo récord podría ser el tuyo."
      ]
    },
    "3": {
      title: "NUTRICIÓN: MACROS PARA FUERZA EXPLOSIVA",
      category: "TIPS",
      date: "05 OCT, 2024",
      school: "Power House",
      author: "DR. JULIÁN CASTRO",
      authorRole: "Nutricionista Jefe",
      authorBio: "Especialista en nutrición deportiva con más de 10 años optimizando el rendimiento de atletas olímpicos.",
      readTime: "6 MIN READ",
      views: "890",
      tags: ["NUTRICIÓN", "FUERZA", "DIETA", "RENDIMIENTO"],
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop",
      content: [
        "La fuerza no solo se construye en el rack, se cocina en el plato. Hoy desglosamos la importancia de los carbohidratos complejos en la fase de potencia.",
        "Muchos atletas temen a la carga calórica, pero sin el glucógeno adecuado, la fibra tipo II no puede disparar a su máxima capacidad.",
        "Recomendamos una distribución de 60% carbohidratos, 25% proteínas y 15% grasas saludables para días de entrenamiento de alta intensidad.",
        "No olvides la hidratación: un músculo deshidratado pierde hasta un 15% de su capacidad contráctil."
      ]
    }
  };

  const article = articles[id || "1"] || articles["1"];

  return (
    <div className="bg-paido-offwhite min-h-screen font-mono text-retro-black pb-20">
      {/* Barra de Progreso de Lectura */}
      <div className="fixed top-20 left-0 w-full h-2 bg-gray-200 z-[90]">
        <div 
          className="h-full bg-retro-black transition-all duration-100 ease-out"
          style={{ width: `${readingProgress}%` }}
        ></div>
      </div>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Navegación y Header del Blog */}
        <div className="mb-12 border-b-8 border-retro-black pb-10">
          <Link to="/community" className="inline-flex items-center gap-2 text-xs font-black uppercase mb-8 hover:bg-retro-black hover:text-white px-2 py-1 transition-colors border-2 border-transparent hover:border-retro-black">
            <span className="material-symbols-outlined text-sm">arrow_back</span> 
            Volver a Comunidad
          </Link>
          
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <span className="bg-yellow-400 border-2 border-retro-black px-3 py-1 text-[10px] font-black uppercase shadow-retro-sm">
                {article.category}
              </span>
              <span className="text-[10px] font-black text-gray-400 tracking-widest">// {article.readTime}</span>
              <div className="flex items-center gap-2 text-[10px] font-black bg-white border-2 border-retro-black px-2 py-1 italic">
                <span className="material-symbols-outlined text-sm">domain</span>
                {article.school}
              </div>
            </div>
            
            <h1 className="text-4xl md:text-7xl font-display font-black uppercase leading-[0.9] tracking-tighter italic">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-6 border-t-2 border-dashed border-gray-300">
              <div className="flex items-center gap-3">
                <div className="size-12 border-2 border-retro-black bg-retro-black text-white flex items-center justify-center font-black uppercase halftone">
                  {article.author.charAt(0)}
                </div>
                <div>
                  <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Publicado por</p>
                  <p className="text-xs font-black uppercase">{article.author}</p>
                  <p className="text-[8px] font-bold text-gray-400 uppercase">{article.authorRole}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="size-10 border-2 border-retro-black flex items-center justify-center bg-white">
                  <span className="material-symbols-outlined text-lg">calendar_today</span>
                </div>
                <div>
                  <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Fecha de emisión</p>
                  <p className="text-xs font-black uppercase">{article.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="size-10 border-2 border-retro-black flex items-center justify-center bg-white">
                  <span className="material-symbols-outlined text-lg">visibility</span>
                </div>
                <div>
                  <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Impacto</p>
                  <p className="text-xs font-black uppercase">{article.views} Vistas</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Imagen Principal */}
        <div className="mb-16 border-8 border-retro-black shadow-retro bg-white overflow-hidden aspect-video relative group">
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105" 
          />
          <div className="absolute top-4 right-4 bg-retro-black text-white px-3 py-1 text-[10px] font-black uppercase border-2 border-white">
            PRO_ARTICLE_{id}
          </div>
        </div>

        {/* Contenido principal */}
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-12 space-y-12">
            <div className="space-y-8 text-xl font-medium leading-relaxed text-gray-800">
              {article.content.map((paragraph: string, i: number) => (
                <p key={i} className={i === 0 ? "text-3xl font-black border-l-8 border-retro-black pl-8 mb-16 italic" : "first-letter:text-6xl first-letter:font-black first-letter:float-left first-letter:mr-4 first-letter:leading-none"}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Sección de Tags Neo-Brutalistas */}
            <div className="py-8 border-y-4 border-retro-black flex flex-wrap items-center gap-4">
              <span className="text-[10px] font-black uppercase text-gray-400 mr-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">tag</span> Etiquetas:
              </span>
              {article.tags.map((tag: string) => (
                <span key={tag} className="bg-white border-2 border-retro-black px-3 py-1 text-[10px] font-black uppercase hover:bg-retro-black hover:text-white transition-all cursor-pointer shadow-retro-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Biografía del Autor - Rediseñada */}
            <div className="border-4 border-retro-black p-10 bg-paido-offwhite halftone relative overflow-hidden group">
               <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                  <div className="size-24 border-4 border-retro-black bg-white flex items-center justify-center shrink-0 shadow-retro-sm">
                    <span className="text-4xl font-display font-black">{article.author.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-xl font-display font-black uppercase italic tracking-tighter">{article.author}</h4>
                      <span className="bg-retro-black text-white px-2 py-0.5 text-[8px] font-black uppercase">{article.authorRole}</span>
                    </div>
                    <p className="text-xs font-bold text-gray-600 leading-relaxed uppercase max-w-xl">
                      {article.authorBio}
                    </p>
                  </div>
               </div>
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                 <span className="material-symbols-outlined text-6xl">verified</span>
               </div>
            </div>

            {/* Acciones de Footer de Artículo */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-10 border-t-2 border-dashed border-gray-300">
               <div className="flex items-center gap-4">
                 <button className="flex items-center gap-2 bg-retro-black text-white px-8 py-4 border-4 border-retro-black shadow-retro-sm hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all font-black text-xs uppercase">
                    <span className="material-symbols-outlined">favorite</span> APOYAR NOTICIA
                 </button>
                 <button className="flex items-center gap-2 bg-white text-retro-black px-8 py-4 border-4 border-retro-black shadow-retro-sm hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all font-black text-xs uppercase">
                    <span className="material-symbols-outlined">share</span> COMPARTIR
                 </button>
               </div>
               
               <div className="text-right">
                 <p className="text-[10px] font-black uppercase text-gray-400">Próxima Lectura Recomendada</p>
                 <Link to="/community" className="text-sm font-black uppercase underline hover:bg-retro-black hover:text-white px-1">Ver más en el feed de comunidad</Link>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewsArticlePage;
