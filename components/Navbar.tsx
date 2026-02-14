
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [isAccessMenuOpen, setIsAccessMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  const checkUser = () => {
    const storedUser = localStorage.getItem('paido_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    checkUser();
    window.addEventListener('storage', checkUser);
    
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsAccessMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('storage', checkUser);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('paido_user');
    setUser(null);
    setIsAccessMenuOpen(false);
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  const discoveryLinks = [
    { path: '/', label: 'Inicio', icon: 'home' },
    { path: '/course', label: 'Cursos', icon: 'exercise' },
    { path: '/centers', label: 'Centros', icon: 'location_on' },
    { path: '/community', label: 'Comunidad', icon: 'forum' },
  ];

  return (
    <>
      {/* TOP HEADER */}
      <header className="border-b-4 border-retro-black bg-white sticky top-0 z-[100] h-20 flex items-center">
        <div className="max-w-7xl mx-auto px-4 md:px-6 w-full flex items-center justify-between relative">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="size-9 md:size-10 bg-retro-black flex items-center justify-center text-white border-2 border-retro-black transition-transform group-hover:rotate-12 shadow-retro-sm">
              <span className="material-symbols-outlined text-xl md:text-2xl">fitness_center</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-display font-black uppercase tracking-tighter">Paido</h1>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-10">
            {discoveryLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`text-[10px] lg:text-xs font-black uppercase tracking-widest transition-all px-2 py-1 border-b-2 ${
                  isActive(link.path) ? 'border-retro-black bg-retro-black text-white' : 'border-transparent hover:border-retro-black'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Botón de Acceso (Trigger para el menú desplegable) */}
          <div className="relative" ref={menuRef}>
            <button 
              onClick={() => setIsAccessMenuOpen(!isAccessMenuOpen)}
              className="flex items-center gap-2 bg-retro-black text-white px-4 md:px-6 py-2.5 border-2 border-retro-black font-black uppercase text-[10px] md:text-xs shadow-retro-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
            >
              {user ? (
                <>
                  <span className="size-5 bg-white text-retro-black flex items-center justify-center text-[10px]">{user.name.charAt(0)}</span>
                  <span className="hidden sm:inline">MI CUENTA</span>
                  <span className="material-symbols-outlined text-sm">expand_more</span>
                </>
              ) : (
                <>
                  ACCESO
                  <span className="material-symbols-outlined text-sm">login</span>
                </>
              )}
            </button>

            {/* Menú Desplegable Neo-Brutalista (Mobile & Desktop) */}
            {isAccessMenuOpen && (
              <div className="absolute right-0 mt-3 w-56 md:w-64 bg-white border-4 border-retro-black shadow-retro p-2 z-[110] animate-in fade-in slide-in-from-top-2 duration-200">
                {!user ? (
                  <div className="flex flex-col gap-2">
                    <Link 
                      to="/login/alumno" 
                      onClick={() => setIsAccessMenuOpen(false)}
                      className="flex items-center justify-between p-4 border-2 border-transparent hover:border-retro-black hover:bg-paido-offwhite transition-all group"
                    >
                      <span className="text-xs font-black uppercase tracking-widest group-hover:translate-x-1 transition-transform">Atleta</span>
                      <span className="material-symbols-outlined text-gray-300 group-hover:text-retro-black">sports_score</span>
                    </Link>
                    <div className="h-0.5 bg-retro-black opacity-10 mx-2"></div>
                    <Link 
                      to="/login/profesor" 
                      onClick={() => setIsAccessMenuOpen(false)}
                      className="flex items-center justify-between p-4 border-2 border-transparent hover:border-retro-black hover:bg-paido-offwhite transition-all group"
                    >
                      <span className="text-xs font-black uppercase tracking-widest group-hover:translate-x-1 transition-transform">Centros</span>
                      <span className="material-symbols-outlined text-gray-300 group-hover:text-retro-black">domain</span>
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <div className="p-4 bg-retro-black text-white mb-2">
                      <p className="text-[8px] font-black uppercase text-gray-400">Sesión iniciada</p>
                      <p className="text-xs font-black uppercase truncate">{user.name}</p>
                    </div>
                    <Link 
                      to={user.type === 'profesor' ? '/instructor' : '/dashboard'} 
                      onClick={() => setIsAccessMenuOpen(false)}
                      className="flex items-center gap-3 p-3 border-2 border-transparent hover:border-retro-black hover:bg-paido-offwhite transition-all font-black text-[10px] uppercase"
                    >
                      <span className="material-symbols-outlined text-lg">dashboard</span>
                      Ir al Tablero
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-3 p-3 border-2 border-transparent hover:border-retro-black hover:bg-red-50 text-red-600 transition-all font-black text-[10px] uppercase text-left w-full"
                    >
                      <span className="material-symbols-outlined text-lg">logout</span>
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* BOTTOM NAV BAR (Solo Mobile - Descubrimiento) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-4 border-retro-black z-[100] px-2 py-3">
        <nav className="flex items-center justify-around">
          {discoveryLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path}
              className={`flex flex-col items-center gap-1 transition-all active:scale-90 px-3 py-1.5 rounded-none ${
                isActive(link.path) 
                  ? 'text-retro-black scale-105' 
                  : 'text-gray-400 opacity-60'
              }`}
            >
              <div className={`size-10 flex items-center justify-center border-2 transition-all ${
                isActive(link.path) ? 'border-retro-black bg-yellow-400 shadow-retro-sm' : 'border-transparent'
              }`}>
                <span className="material-symbols-outlined text-2xl">{link.icon}</span>
              </div>
              <span className={`text-[8px] font-black uppercase tracking-tighter ${isActive(link.path) ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
                {link.label}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
