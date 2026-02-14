
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="py-20 bg-retro-black text-white border-t-4 border-retro-black">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="size-10 bg-white flex items-center justify-center text-retro-black border-2 border-white">
              <span className="material-symbols-outlined">fitness_center</span>
            </div>
            <h2 className="text-4xl font-display font-black uppercase">Paido</h2>
          </div>
          <p className="text-gray-400 font-bold text-sm mb-8 leading-relaxed">
            Construido en Bogotá. Diseñado para el mundo. El rendimiento es el único lenguaje que hablamos con fluidez.
          </p>
        </div>

        <div>
          <h4 className="font-black uppercase mb-6 text-xs tracking-widest border-b border-gray-800 pb-2">Ecosistema</h4>
          <ul className="space-y-4 text-sm font-bold text-gray-400 uppercase tracking-tight">
            <li><Link to="/dashboard" className="hover:text-white transition-colors underline-offset-4 hover:underline">Portal del Atleta</Link></li>
            <li><Link to="/instructor" className="hover:text-white transition-colors underline-offset-4 hover:underline">Portal del Centro Deportivo</Link></li>
            <li><Link to="/course" className="hover:text-white transition-colors underline-offset-4 hover:underline">Catálogo Deportivo</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black uppercase mb-6 text-xs tracking-widest border-b border-gray-800 pb-2">Compañía</h4>
          <ul className="space-y-4 text-sm font-bold text-gray-400 uppercase tracking-tight">
            <li><a href="#" className="hover:text-white transition-colors underline-offset-4 hover:underline">Nuestra Misión</a></li>
            <li><a href="#" className="hover:text-white transition-colors underline-offset-4 hover:underline">Soporte Técnico</a></li>
            <li><a href="#" className="hover:text-white transition-colors underline-offset-4 hover:underline">Legal</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black uppercase mb-6 text-xs tracking-widest border-b border-gray-800 pb-2">Canales Oficiales</h4>
          <div className="flex flex-wrap gap-4">
            {[
              { name: 'Instagram', icon: 'camera' },
              { name: 'X', icon: 'close' },
              { name: 'LinkedIn', icon: 'share' },
              { name: 'YouTube', icon: 'smart_display' }
            ].map((social) => (
              <a 
                key={social.name} 
                href="#" 
                className="size-12 border-2 border-white flex items-center justify-center hover:bg-white hover:text-retro-black transition-all shadow-retro-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
                title={social.name}
              >
                <span className="material-symbols-outlined">{social.icon}</span>
              </a>
            ))}
          </div>
          <p className="mt-8 text-[10px] font-black uppercase text-gray-500 tracking-widest">
            © 2024 PAIDO ECOSYSTEM INC. <br />
            SÉ TU MEJOR VERSIÓN.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
