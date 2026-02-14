
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const isProfesor = type === 'profesor';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simular guardado de sesión
    const mockUser = {
      name: isProfesor ? 'Carlos Ramirez' : 'MATEO G. NAVARRO',
      email: isProfesor ? 'c.ramirez@paido.fit' : 'mateo.atleta@paido.fit',
      type: type,
      id: 'USR-772'
    };
    localStorage.setItem('paido_user', JSON.stringify(mockUser));

    if (isProfesor) {
      navigate('/instructor');
    } else {
      navigate('/dashboard');
    }
    // Forzar actualización de navbar
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="min-h-screen bg-paido-offwhite flex items-center justify-center p-6 font-mono">
      <div className="max-w-md w-full">
        <div className="bg-white border-4 border-retro-black shadow-retro p-8">
          <div className="mb-8 border-b-4 border-retro-black pb-4">
            <h2 className="text-3xl font-display font-black uppercase tracking-tighter">
              Ingresar como <br />
              <span className={isProfesor ? "text-retro-black italic underline" : "text-retro-black"}>
                {isProfesor ? 'Centro' : 'Atleta'}
              </span>
            </h2>
            <p className="text-[10px] font-black uppercase text-gray-400 mt-2">
              Acceso seguro a la plataforma PAIDO_V2.5
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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

            <button 
              type="submit"
              className="w-full bg-retro-black text-white py-5 text-xl font-black uppercase border-4 border-retro-black shadow-retro hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-3"
            >
              Entrar <span className="material-symbols-outlined">login</span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t-2 border-dashed border-gray-200 text-center">
            <p className="text-[10px] font-black uppercase text-gray-500">
              ¿No tienes una cuenta? <br />
              <Link to={`/register/${type}`} className="text-retro-black font-black hover:bg-retro-black hover:text-white transition-colors px-2 py-1">Regístrate aquí</Link>
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-4">
           {isProfesor ? (
             <Link to="/login/alumno" className="text-[10px] font-black uppercase underline">¿Eres atleta? Accede aquí</Link>
           ) : (
             <Link to="/login/profesor" className="text-[10px] font-black uppercase underline">¿Eres una sede o centro? Accede aquí</Link>
           )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
