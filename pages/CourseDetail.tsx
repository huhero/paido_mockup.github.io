
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

interface Course {
  id: number;
  title: string;
  instructor: string;
  tag: string;
  center: string;
  price: string;
  duration: string;
  level: string;
  weekType: 'Lunes a Viernes' | 'Fines de Semana';
  schedule: 'Mañana' | 'Tarde' | 'Noche';
  img: string;
}

const CourseDetail: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Datos base
  const allCourses: Course[] = [
    { id: 1, title: "Servicio de Potencia Pro", instructor: "Andrés M. Sampras", tag: "TENIS", center: "Elite Tennis Club", price: "$180k", duration: "6 SEM", level: 'Avanzado', weekType: 'Fines de Semana', schedule: 'Mañana', img: "https://images.unsplash.com/photo-1595435066319-4051d3828223?q=80&w=600&h=400&auto=format&fit=crop" },
    { id: 2, title: "Táctica y Visión Moderna", instructor: "Julián Álvarez", tag: "FÚTBOL", center: "Power House", price: "$125k", duration: "8 SEM", level: 'Intermedio', weekType: 'Lunes a Viernes', schedule: 'Tarde', img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600&h=400&auto=format&fit=crop" },
    { id: 3, title: "Mecánica de Tiro y Salto", instructor: "Kevin Durant", tag: "BASKET", center: "Iron House Gym", price: "$140k", duration: "5 SEM", level: 'Avanzado', weekType: 'Fines de Semana', schedule: 'Noche', img: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=600&h=400&auto=format&fit=crop" },
    { id: 4, title: "Sprint: Técnica de Salida", instructor: "Usain B. Elite", tag: "TRACK", center: "Lift Academy", price: "$90k", duration: "4 SEM", level: 'Principiante', weekType: 'Lunes a Viernes', schedule: 'Mañana', img: "https://images.unsplash.com/photo-1461896756913-647f00716c02?q=80&w=600&h=400&auto=format&fit=crop" },
    { id: 5, title: "Patinaje de Velocidad", instructor: "Mariana Pajón S.", tag: "SPEED", center: "Power House", price: "$160k", duration: "10 SEM", level: 'Intermedio', weekType: 'Lunes a Viernes', schedule: 'Tarde', img: "https://images.unsplash.com/photo-1518384401463-d3876063c195?q=80&w=600&h=400&auto=format&fit=crop" },
    { id: 6, title: "Resiliencia Bajo Presión", instructor: "Elena Gomez", tag: "PSIC", center: "Zenith Studio", price: "$110k", duration: "4 SEM", level: 'Principiante', weekType: 'Fines de Semana', schedule: 'Mañana', img: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=600&h=400&auto=format&fit=crop" },
    { id: 7, title: "Prep. Física Integral", instructor: "Chris Bumstead", tag: "GYM", center: "Iron House Gym", price: "$200k", duration: "12 SEM", level: 'Avanzado', weekType: 'Lunes a Viernes', schedule: 'Noche', img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&h=400&auto=format&fit=crop" },
    { id: 8, title: "Yoga Flexibilidad", instructor: "Sadhguru Master", tag: "YOGA", center: "Zenith Studio", price: "$85k", duration: "8 SEM", level: 'Principiante', weekType: 'Fines de Semana', schedule: 'Tarde', img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&h=400&auto=format&fit=crop" },
    { id: 9, title: "Fundamentos de Boxeo", instructor: "Canelo A.", tag: "BOX", center: "Power House", price: "$130k", duration: "6 SEM", level: 'Principiante', weekType: 'Lunes a Viernes', schedule: 'Noche', img: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=600&h=400&auto=format&fit=crop" },
    { id: 10, title: "Pilates para Core", instructor: "Marta Pro", tag: "PILATES", center: "Zenith Studio", price: "$95k", duration: "5 SEM", level: 'Intermedio', weekType: 'Lunes a Viernes', schedule: 'Mañana', img: "https://images.unsplash.com/photo-1518611012118-2960520ee86c?q=80&w=600&h=400&auto=format&fit=crop" },
    { id: 11, title: "Crossfit: Endurance", instructor: "Mat Fraser", tag: "CROSS", center: "Power House", price: "$150k", duration: "4 SEM", level: 'Avanzado', weekType: 'Fines de Semana', schedule: 'Mañana', img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600&h=400&auto=format&fit=crop" },
  ];

  // Estados de filtros
  const [selectedFilters, setSelectedFilters] = useState({
    level: [] as string[],
    tag: [] as string[],
    center: [] as string[],
    instructor: [] as string[],
    weekType: [] as string[],
    schedule: [] as string[],
  });

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const centerParam = searchParams.get('center');
    if (centerParam) {
      setSelectedFilters(prev => ({ ...prev, center: [centerParam] }));
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('center');
      setSearchParams(newParams, { replace: true });
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Efecto para scroll suave al inicio de la página cuando cambia la página
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilters]);

  const filterLabels: Record<keyof typeof selectedFilters, string> = {
    level: 'Nivel',
    tag: 'Disciplina',
    center: 'Centro',
    instructor: 'Profesor',
    weekType: 'Semana',
    schedule: 'Horario'
  };

  const [filterSearch, setFilterSearch] = useState({
    level: '', tag: '', center: '', instructor: '', weekType: '', schedule: '',
  });

  const filteredCourses = useMemo(() => {
    return allCourses.filter(course => {
      return (Object.keys(selectedFilters) as Array<keyof typeof selectedFilters>).every(key => {
        const selected = selectedFilters[key];
        return selected.length === 0 || selected.includes(course[key as keyof Course] as string);
      });
    });
  }, [selectedFilters]);

  const paginatedCourses = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCourses.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCourses, currentPage]);

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  const getOptions = (key: keyof typeof selectedFilters) => {
    const uniqueValues = Array.from(new Set(allCourses.map(c => c[key as keyof Course] as string)));
    const searchTerm = filterSearch[key].toLowerCase();
    return uniqueValues.filter(val => val.toLowerCase().includes(searchTerm)).sort();
  };

  const handleToggleFilter = (key: keyof typeof selectedFilters, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter(v => v !== value) : [...prev[key], value]
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({ level: [], tag: [], center: [], instructor: [], weekType: [], schedule: [] });
    setActiveDropdown(null);
  };

  const FilterContent = ({ filterKey, isMobile = false }: { filterKey: keyof typeof selectedFilters, isMobile?: boolean }) => {
    const options = getOptions(filterKey);
    return (
      <div className={`${isMobile ? 'mb-6' : ''}`}>
        {!isMobile && (
          <div className="mb-4">
            <input 
              type="text" 
              placeholder={`Buscar...`}
              value={filterSearch[filterKey]}
              onChange={(e) => setFilterSearch(prev => ({ ...prev, [filterKey]: e.target.value }))}
              className="w-full bg-paido-offwhite border-2 border-retro-black p-2 text-[10px] font-black focus:ring-0 outline-none uppercase"
            />
          </div>
        )}
        <div className={`space-y-2 ${isMobile ? '' : 'max-h-60 overflow-y-auto pr-2 scrollbar-hide'}`}>
          {options.map(opt => (
            <label key={opt} className="flex items-center gap-3 cursor-pointer group py-1">
              <div className="relative flex items-center">
                <input 
                  type="checkbox" 
                  className="peer appearance-none size-5 border-2 border-retro-black bg-white checked:bg-retro-black transition-colors"
                  checked={selectedFilters[filterKey].includes(opt)}
                  onChange={() => handleToggleFilter(filterKey, opt)}
                />
                <span className="material-symbols-outlined absolute text-white text-xs left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 pointer-events-none">done</span>
              </div>
              <span className="text-[10px] font-black uppercase group-hover:underline transition-all text-retro-black">
                {opt}
              </span>
            </label>
          ))}
        </div>
      </div>
    );
  };

  const activeFilterCount = Object.values(selectedFilters).flat().length;

  return (
    <div className="bg-paido-offwhite font-mono text-retro-black min-h-screen pb-20">
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="mb-8 md:mb-12">
          <h2 className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter border-b-[12px] border-retro-black inline-block pb-2 leading-none">CURSOS</h2>
          <div className="flex items-center gap-3 mt-6">
             <span className="bg-retro-black text-white px-2 py-0.5 text-[10px] font-black uppercase italic">V2.5.0</span>
             <p className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
               // MAX_PAGINACIÓN: 10_RESULTADOS
             </p>
          </div>
        </div>

        {/* Barra de Herramientas Principal */}
        <div className="sticky top-[80px] z-40 bg-paido-offwhite/90 backdrop-blur-md py-4 mb-8 border-b-4 border-retro-black flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileDrawerOpen(true)}
              className="lg:hidden flex items-center gap-3 px-6 py-3 bg-retro-black text-white border-4 border-retro-black font-black uppercase text-xs shadow-retro transition-all"
            >
              <span className="material-symbols-outlined">tune</span>
              Filtros {activeFilterCount > 0 && `(${activeFilterCount})`}
            </button>

            <div className="hidden lg:flex items-center gap-3" ref={dropdownRef}>
              {(Object.keys(selectedFilters) as Array<keyof typeof selectedFilters>).map((key) => {
                const isOpen = activeDropdown === key;
                const hasActive = selectedFilters[key].length > 0;
                return (
                  <div key={key} className="relative">
                    <button
                      onClick={() => setActiveDropdown(isOpen ? null : key)}
                      className={`flex items-center gap-2 px-4 py-2 border-2 border-retro-black font-black uppercase text-[10px] transition-all
                        ${isOpen || hasActive ? 'bg-retro-black text-white' : 'bg-white text-retro-black hover:bg-retro-gray'}
                      `}
                    >
                      {filterLabels[key]} {hasActive && `[${selectedFilters[key].length}]`}
                      <span className={`material-symbols-outlined text-xs transition-transform ${isOpen ? 'rotate-180' : ''}`}>expand_more</span>
                    </button>
                    {isOpen && (
                      <div className="absolute top-full left-0 mt-2 w-56 bg-white border-4 border-retro-black shadow-retro p-4 z-50">
                        <FilterContent filterKey={key} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-6 border-t-2 md:border-t-0 border-dashed border-gray-300 pt-4 md:pt-0">
            <span className="text-[10px] font-black uppercase text-gray-400">
               {paginatedCourses.length} DE {filteredCourses.length}
            </span>
            {activeFilterCount > 0 && (
              <button onClick={clearFilters} className="text-[10px] font-black uppercase underline">Limpiar</button>
            )}
          </div>
        </div>

        {/* Listado de Cursos */}
        {paginatedCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
            {paginatedCourses.map((course) => (
              <div key={course.id} className="group border-2 md:border-4 border-retro-black bg-white shadow-retro-sm md:shadow-retro flex flex-row md:flex-col overflow-hidden h-[100px] md:h-auto">
                <div className="w-[100px] md:w-full md:aspect-[16/10] border-r-2 md:border-r-0 md:border-b-4 border-retro-black relative shrink-0">
                  <img src={course.img} alt={course.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0" />
                  <div className="hidden md:block absolute top-0 right-0 bg-retro-black text-white px-2 py-0.5 text-[8px] font-black uppercase border-l-2 border-b-2 border-retro-black z-10">
                    {course.tag}
                  </div>
                </div>

                <div className="p-2 md:p-6 flex flex-col flex-1 justify-between min-w-0">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="md:hidden text-[7px] font-black uppercase text-retro-black bg-yellow-400 px-1 border border-retro-black">{course.tag}</span>
                      <span className="bg-paido-offwhite border border-retro-black px-1 text-[6px] md:text-[8px] font-black uppercase">{course.level}</span>
                    </div>
                    <h3 className="text-xs md:text-xl font-display font-black uppercase leading-tight truncate md:whitespace-normal group-hover:underline">
                      {course.title}
                    </h3>
                    <p className="text-[8px] font-black text-gray-400 uppercase md:hidden mt-0.5">{course.instructor} // {course.center}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-sm md:text-2xl font-display font-black italic">{course.price}</span>
                    <Link 
                      to={`/enroll/${course.id}`}
                      className="bg-retro-black text-white px-3 md:px-6 py-1 md:py-3 text-[8px] md:text-[10px] font-black uppercase border-2 border-retro-black flex items-center gap-1 active:translate-y-0.5 transition-all"
                    >
                      <span className="hidden xs:inline">DETALLES</span> <span className="material-symbols-outlined text-[12px] md:text-xs">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border-4 border-retro-black border-dashed p-12 text-center bg-white">
            <h3 className="text-2xl font-display font-black uppercase italic">SIN COINCIDENCIAS</h3>
            <button onClick={clearFilters} className="mt-6 bg-retro-black text-white px-6 py-2 font-black uppercase text-xs">RESETEAR</button>
          </div>
        )}

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-3">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`p-2 border-2 border-retro-black ${currentPage === 1 ? 'opacity-20' : 'bg-white shadow-retro-sm active:translate-y-0.5'}`}
            >
              <span className="material-symbols-outlined">west</span>
            </button>
            <span className="text-xs font-black px-4">{currentPage} / {totalPages}</span>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`p-2 border-2 border-retro-black ${currentPage === totalPages ? 'opacity-20' : 'bg-white shadow-retro-sm active:translate-y-0.5'}`}
            >
              <span className="material-symbols-outlined">east</span>
            </button>
          </div>
        )}
      </main>

      {/* Drawer Filtros Mobile */}
      <div className={`fixed inset-0 z-[100] transition-opacity ${isMobileDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-retro-black/40" onClick={() => setIsMobileDrawerOpen(false)}></div>
        <div className={`absolute right-0 top-0 bottom-0 w-[85vw] bg-paido-offwhite border-l-8 border-retro-black flex flex-col transition-transform ${isMobileDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-4 border-b-4 border-retro-black bg-white flex justify-between items-center">
             <h2 className="text-xl font-display font-black uppercase">FILTROS</h2>
             <button onClick={() => setIsMobileDrawerOpen(false)} className="material-symbols-outlined font-black">close</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {(Object.keys(selectedFilters) as Array<keyof typeof selectedFilters>).map((key) => (
              <div key={key}>
                <h3 className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-3 border-b border-gray-200">{filterLabels[key]}</h3>
                <FilterContent filterKey={key} isMobile />
              </div>
            ))}
          </div>
          <div className="p-4 bg-white border-t-4 border-retro-black">
             <button onClick={() => setIsMobileDrawerOpen(false)} className="w-full bg-retro-black text-white py-4 font-black uppercase text-sm shadow-retro-sm">APLICAR</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
