
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

interface SportsCenter {
  id: number;
  name: string;
  type: string;
  location: string;
  rating: string;
  coursesCount: number;
  image: string;
  tags: string[];
}

const SportsCenters: React.FC = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const allCenters: SportsCenter[] = [
    { id: 1, name: "Elite Tennis Club", type: "Club Especializado", location: "Chapinero, Bogotá", rating: "4.9", coursesCount: 12, image: "https://images.unsplash.com/photo-1595435066319-4051d3828223?q=80&w=800&auto=format&fit=crop", tags: ["Tenis", "Piscina"] },
    { id: 2, name: "Power House", type: "Centro Pro", location: "Cedritos, Bogotá", rating: "4.8", coursesCount: 25, image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop", tags: ["Crossfit", "Boxeo"] },
    { id: 3, name: "Zenith Studio", type: "Bienestar", location: "Usaquén, Bogotá", rating: "4.7", coursesCount: 8, image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=800&auto=format&fit=crop", tags: ["Yoga", "Pilates"] },
    { id: 4, name: "Iron House Gym", type: "Fuerza", location: "Teusaquillo, Bogotá", rating: "4.6", coursesCount: 15, image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop", tags: ["Weights"] },
    { id: 5, name: "Lift Academy", type: "Escuela", location: "Salitre, Bogotá", rating: "4.9", coursesCount: 6, image: "https://images.unsplash.com/photo-1461896756913-647f00716c02?q=80&w=800&auto=format&fit=crop", tags: ["Running"] },
    { id: 6, name: "Dojo Central", type: "Artes Marciales", location: "Chapinero, Bogotá", rating: "4.5", coursesCount: 10, image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=800&auto=format&fit=crop", tags: ["Judo", "MMA"] },
    { id: 7, name: "Spin Pro Studio", type: "Cycling", location: "Calle 100, Bogotá", rating: "4.8", coursesCount: 14, image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop", tags: ["Cycle"] },
    { id: 8, name: "Climb Zone", type: "Escalada", location: "Rosales, Bogotá", rating: "4.7", coursesCount: 4, image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=800&auto=format&fit=crop", tags: ["Bouldering"] },
    { id: 9, name: "Aqua Center", type: "Natación", location: "Modelia, Bogotá", rating: "4.6", coursesCount: 9, image: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?q=80&w=800&auto=format&fit=crop", tags: ["Piscina"] },
    { id: 10, name: "Cross Elite", type: "Crossfit", location: "Suba, Bogotá", rating: "4.9", coursesCount: 20, image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop", tags: ["WOD"] },
    { id: 11, name: "Padel Pro Hub", type: "Raqueta", location: "Colina, Bogotá", rating: "4.8", coursesCount: 7, image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=800&auto=format&fit=crop", tags: ["Padel"] },
  ];

  // Estados de filtros
  const [selectedFilters, setSelectedFilters] = useState({
    type: [] as string[],
    location: [] as string[],
    tags: [] as string[],
  });

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [filterSearch, setFilterSearch] = useState({ type: '', location: '', tags: '' });

  const filterLabels: Record<keyof typeof selectedFilters, string> = {
    type: 'Tipo',
    location: 'Ubicación',
    tags: 'Disciplinas'
  };

  // Efecto para scroll suave al inicio de la página cuando cambia la página
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectedFilters]);

  const filteredCenters = useMemo(() => {
    return allCenters.filter(center => {
      const matchType = selectedFilters.type.length === 0 || selectedFilters.type.includes(center.type);
      const matchLocation = selectedFilters.location.length === 0 || selectedFilters.location.includes(center.location);
      const matchTags = selectedFilters.tags.length === 0 || selectedFilters.tags.some(tag => center.tags.includes(tag));
      return matchType && matchLocation && matchTags;
    });
  }, [selectedFilters]);

  const paginatedCenters = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCenters.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCenters, currentPage]);

  const totalPages = Math.ceil(filteredCenters.length / itemsPerPage);

  const getOptions = (key: keyof typeof selectedFilters) => {
    let values: string[] = key === 'tags' ? Array.from(new Set(allCenters.flatMap(c => c.tags))) : Array.from(new Set(allCenters.map(c => c[key as keyof SportsCenter] as string)));
    return values.filter(val => val.toLowerCase().includes(filterSearch[key].toLowerCase())).sort();
  };

  const handleToggleFilter = (key: keyof typeof selectedFilters, value: string) => {
    setSelectedFilters(prev => ({ ...prev, [key]: prev[key].includes(value) ? prev[key].filter(v => v !== value) : [...prev[key], value] }));
  };

  const activeFilterCount = Object.values(selectedFilters).flat().length;

  const FilterContent = ({ filterKey, isMobile = false }: { filterKey: keyof typeof selectedFilters, isMobile?: boolean }) => {
    const options = getOptions(filterKey);
    return (
      <div className={`${isMobile ? 'mb-6' : ''}`}>
        {!isMobile && (
          <input type="text" placeholder="Filtrar..." value={filterSearch[filterKey]} onChange={(e) => setFilterSearch(prev => ({ ...prev, [filterKey]: e.target.value }))} className="w-full bg-paido-offwhite border-2 border-retro-black p-2 text-[10px] font-black focus:ring-0 outline-none uppercase mb-2" />
        )}
        <div className={`space-y-2 ${isMobile ? '' : 'max-h-60 overflow-y-auto'}`}>
          {options.map(opt => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer py-1">
              <input type="checkbox" className="peer appearance-none size-4 border-2 border-retro-black bg-white checked:bg-retro-black" checked={selectedFilters[filterKey].includes(opt)} onChange={() => handleToggleFilter(filterKey, opt)} />
              <span className="text-[10px] font-black uppercase text-retro-black">{opt}</span>
            </label>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-paido-offwhite font-mono text-retro-black min-h-screen pb-20">
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="mb-8">
          <h2 className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter border-b-[12px] border-retro-black inline-block leading-none">CENTROS</h2>
          <p className="text-xs font-black text-gray-400 mt-4 uppercase tracking-widest">// MAPA_MAX_10_ITEMS</p>
        </div>

        {/* Barra de Herramientas Principal */}
        <div className="sticky top-[80px] z-40 bg-paido-offwhite/90 backdrop-blur-md py-4 mb-8 border-b-4 border-retro-black flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileDrawerOpen(true)} className="lg:hidden flex items-center gap-3 px-6 py-3 bg-retro-black text-white border-4 border-retro-black font-black uppercase text-xs shadow-retro">
              <span className="material-symbols-outlined text-sm">filter_alt</span> FILTROS
            </button>
            <div className="hidden lg:flex items-center gap-3" ref={dropdownRef}>
              {(Object.keys(selectedFilters) as Array<keyof typeof selectedFilters>).map((key) => (
                <div key={key} className="relative">
                  <button onClick={() => setActiveDropdown(activeDropdown === key ? null : key)} className={`px-4 py-2 border-2 border-retro-black font-black uppercase text-[10px] ${activeDropdown === key ? 'bg-retro-black text-white' : 'bg-white'}`}>
                    {filterLabels[key]} {selectedFilters[key].length > 0 && `[${selectedFilters[key].length}]`}
                  </button>
                  {activeDropdown === key && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white border-4 border-retro-black shadow-retro p-4 z-50 animate-in fade-in slide-in-from-top-1">
                      <FilterContent filterKey={key} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <p className="text-[10px] font-black uppercase text-gray-400">{filteredCenters.length} TOTAL</p>
        </div>

        {paginatedCenters.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-12">
            {paginatedCenters.map((center) => (
              <div key={center.id} className="group border-2 md:border-4 border-retro-black bg-white shadow-retro-sm md:shadow-retro flex flex-row md:flex-col overflow-hidden h-[110px] md:h-auto">
                <Link to={`/centers/${center.id}`} className="w-[110px] md:w-full md:aspect-video border-r-2 md:border-r-0 md:border-b-4 border-retro-black relative shrink-0 overflow-hidden">
                  <img src={center.image} alt={center.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute top-1 right-1 bg-white border border-retro-black px-1 flex items-center gap-1 font-black text-[8px] md:text-xs">
                    <span className="material-symbols-outlined text-[10px] text-yellow-500">star</span> {center.rating}
                  </div>
                </Link>

                <div className="p-2 md:p-8 flex flex-col flex-1 justify-between min-w-0">
                  <div>
                    <p className="text-[7px] md:text-[10px] font-black uppercase text-gray-400 tracking-widest">{center.type}</p>
                    <Link to={`/centers/${center.id}`}>
                      <h3 className="text-xs md:text-3xl font-display font-black uppercase tracking-tighter truncate group-hover:underline">{center.name}</h3>
                    </Link>
                    <div className="flex items-center gap-1 text-[7px] md:text-xs font-bold text-gray-500 truncate mt-1">
                      <span className="material-symbols-outlined text-[10px]">location_on</span> {center.location}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-[8px] md:text-sm font-black italic">{center.coursesCount} CURSOS</span>
                    <Link to={`/course?center=${encodeURIComponent(center.name)}`} className="bg-retro-black text-white px-3 md:px-6 py-1 md:py-3 text-[8px] md:text-xs font-black uppercase border-2 border-retro-black hover:bg-white hover:text-retro-black transition-all flex items-center gap-1">
                      IR <span className="material-symbols-outlined text-[10px]">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border-4 border-retro-black border-dashed p-12 text-center bg-white">
            <h3 className="text-2xl font-display font-black uppercase italic tracking-tighter">SIN RESULTADOS</h3>
            <button onClick={() => setSelectedFilters({type:[], location:[], tags:[]})} className="mt-4 bg-retro-black text-white px-8 py-3 font-black uppercase text-xs">RECARGAR</button>
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-4">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className={`p-2 border-2 border-retro-black ${currentPage === 1 ? 'opacity-20' : 'bg-white shadow-retro-sm active:translate-y-0.5'}`}><span className="material-symbols-outlined">west</span></button>
            <span className="text-xs font-black">{currentPage} / {totalPages}</span>
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className={`p-2 border-2 border-retro-black ${currentPage === totalPages ? 'opacity-20' : 'bg-white shadow-retro-sm active:translate-y-0.5'}`}><span className="material-symbols-outlined">east</span></button>
          </div>
        )}
      </main>

      {/* Drawer Filtros Mobile */}
      <div className={`fixed inset-0 z-[100] transition-opacity ${isMobileDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-retro-black/40" onClick={() => setIsMobileDrawerOpen(false)}></div>
        <div className={`absolute right-0 top-0 bottom-0 w-[85vw] bg-paido-offwhite border-l-8 border-retro-black flex flex-col transition-transform ${isMobileDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-4 border-b-4 border-retro-black bg-white flex justify-between items-center">
             <h2 className="text-xl font-display font-black uppercase">MAPA_FILTROS</h2>
             <button onClick={() => setIsMobileDrawerOpen(false)} className="material-symbols-outlined">close</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {(Object.keys(selectedFilters) as Array<keyof typeof selectedFilters>).map((key) => (
              <div key={key}>
                <h3 className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2 border-b border-gray-200 pb-1">{filterLabels[key]}</h3>
                <FilterContent filterKey={key} isMobile />
              </div>
            ))}
          </div>
          <div className="p-4 bg-white border-t-4 border-retro-black">
             <button onClick={() => setIsMobileDrawerOpen(false)} className="w-full bg-retro-black text-white py-4 font-black uppercase text-sm shadow-retro-sm">APLICAR_MAPA</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SportsCenters;
