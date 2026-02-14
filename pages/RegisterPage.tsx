
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const [role, setRole] = useState(type || 'alumno');
  const [showReferralInfo, setShowReferralInfo] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simular creación de cuenta y guardado de sesión
    const mockUser = {
      name: 'NUEVO ATLETA',
      email: 'usuario@paido.fit',
      type: role,
      id: `USR-${Math.floor(Math.random() * 999)}`
    };
    localStorage.setItem('paido_user', JSON.stringify(mockUser));

    if (role === 'profesor') {
      navigate('/instructor');
    } else {
      navigate('/dashboard');
    }
    // Forzar actualización de navbar
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="min-h-screen bg-paido-offwhite flex items-center justify-center p-4 sm:p-6 py-12 font-mono">
      <div className="max-w-xl w-full">
        <div className="bg-white border-4 border-retro-black shadow-retro p-6 sm:p-8 md:p-12 overflow-hidden">
          <div className="mb-10 border-b-4 border-retro-black pb-6 text-center overflow-hidden">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tighter italic break-words leading-[0.9]">
              UNIRSE_A_LA_ÉLITE
            </h2>
            <p className="text-[10px] font-black uppercase text-gray-400 mt-4 tracking-[0.2em]">
              SISTEMA DE REGISTRO PAIDO_V2.5.0
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Selector de Rol */}
            <div className="space-y-4">
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500">¿Cuál es tu perfil?</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole('alumno')}
                  className={`flex flex-col items-center justify-center p-4 border-4 border-retro-black transition-all shadow-retro-sm
                    ${role === 'alumno' ? 'bg-retro-black text-white translate-x-1 translate-y-1 shadow-none' : 'bg-white hover:bg-paido-offwhite'}
                  `}
                >
                  <span className="material-symbols-outlined text-2xl mb-2">sports_score</span>
                  <span className="text-[10px] font-black uppercase">Atleta</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('profesor')}
                  className={`flex flex-col items-center justify-center p-4 border-4 border-retro-black transition-all shadow-retro-sm
                    ${role === 'profesor' ? 'bg-retro-black text-white translate-x-1 translate-y-1 shadow-none' : 'bg-white hover:bg-paido-offwhite'}
                  `}
                >
                  <span className="material-symbols-outlined text-2xl mb-2">domain</span>
                  <span className="text-[10px] font-black uppercase">Centro Deportivo</span>
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-black uppercase mb-2">Nombre Completo</label>
                <input 
                  type="text" 
                  required
                  placeholder="JUAN PEREZ"
                  className="w-full border-4 border-retro-black p-4 text-sm font-bold focus:ring-0 focus:shadow-retro-sm transition-all outline-none uppercase"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase mb-2">Correo Electrónico</label>
                <input 
                  type="email" 
                  required
                  placeholder="atleta@paido.fit"
                  className="w-full border-4 border-retro-black p-4 text-sm font-bold focus:ring-0 focus:shadow-retro-sm transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase mb-2">Contraseña</label>
                <input 
                  type="password" 
                  required
                  placeholder="********"
                  className="w-full border-4 border-retro-black p-4 text-sm font-bold focus:ring-0 focus:shadow-retro-sm transition-all outline-none"
                />
              </div>

              {role === 'profesor' && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-black uppercase">Código de referido</label>
                    <button 
                      type="button"
                      onClick={() => setShowReferralInfo(!showReferralInfo)}
                      className="size-6 bg-retro-black text-white flex items-center justify-center shadow-retro-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
                    >
                      <span className="material-symbols-outlined text-sm">info</span>
                    </button>
                  </div>
                  
                  {showReferralInfo && (
                    <div className="mb-3 bg-retro-black text-white p-3 border-2 border-retro-black text-[9px] font-black uppercase leading-tight italic">
                      ESTE CÓDIGO DEBE SER SOLICITADO A UN CENTRO YA REGISTRADO EN EL ECOSISTEMA PAIDO.
                    </div>
                  )}

                  <input 
                    type="text" 
                    placeholder="PAIDO-REF-000"
                    className="w-full border-4 border-retro-black p-4 text-sm font-bold focus:ring-0 focus:shadow-retro-sm transition-all outline-none uppercase"
                  />
                </div>
              )}
            </div>

            <div className="pt-6 border-t-2 border-dashed border-gray-200">
              <button 
                type="submit"
                className="w-full bg-retro-black text-white py-5 text-xl font-black uppercase border-4 border-retro-black shadow-retro hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                CREAR CUENTA <span className="material-symbols-outlined">how_to_reg</span>
              </button>
            </div>
          </form>

          <div className="mt-10 text-center">
            <p className="text-[10px] font-black uppercase text-gray-500">
              ¿Ya tienes una cuenta? <br />
              <Link to={`/login/${role}`} className="text-retro-black font-black hover:bg-retro-black hover:text-white transition-colors px-2 py-1">Inicia sesión aquí</Link>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center opacity-40 italic">
          <p className="text-[8px] font-black uppercase tracking-[0.3em]">
            PAIDO ECOSYSTEM // RENDIMIENTO SIN COMPROMISOS
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
