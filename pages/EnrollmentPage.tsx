
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

interface Session {
  center: string;
  instructor: string;
  weekType: string;
  schedule: string;
}

interface Course {
  id: number;
  title: string;
  tag: string;
  price: number;
  priceDisplay: string;
  level: string;
  description: string;
  img: string;
  availableSessions: Session[];
}

const EnrollmentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isConfigConfirmed, setIsConfigConfirmed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Datos del curso con múltiples sesiones para filtrar
  const courseData: Course = {
    id: Number(id),
    title: "Servicio de Potencia y Precisión Pro",
    tag: "TENIS",
    price: 180000,
    priceDisplay: "$180.000",
    level: 'Avanzado',
    description: "Este programa intensivo está diseñado para atletas que buscan perfeccionar su técnica de saque y control de fondo.",
    img: "https://images.unsplash.com/photo-1595435066319-4051d3828223?q=80&w=600&h=400&auto=format&fit=crop",
    availableSessions: [
      { center: "Elite Tennis Club", instructor: "Andrés M. Sampras", weekType: "Fines de Semana", schedule: "Mañana (08:00 - 10:00)" },
      { center: "Elite Tennis Club", instructor: "Andrés M. Sampras", weekType: "Fines de Semana", schedule: "Tarde (14:00 - 16:00)" },
      { center: "Elite Tennis Club", instructor: "Julián Álvarez", weekType: "Lunes a Viernes", schedule: "Noche (19:00 - 21:00)" },
      { center: "Power House", instructor: "Andrés M. Sampras", weekType: "Lunes a Viernes", schedule: "Mañana (07:00 - 09:00)" },
      { center: "Power House", instructor: "Julián Álvarez", weekType: "Fines de Semana", schedule: "Mañana (09:00 - 11:00)" },
      { center: "Zenith Studio", instructor: "Andrés M. Sampras", weekType: "Lunes a Viernes", schedule: "Tarde (16:00 - 18:00)" }
    ]
  };

  // Estados de selección
  const [selection, setSelection] = useState({
    center: '',
    instructor: '',
    weekType: '',
    schedule: ''
  });

  // Estado del formulario de usuario
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    documentId: '',
    phone: '',
    paymentMethod: 'PSE'
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const storedUser = localStorage.getItem('paido_user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setIsLoggedIn(true);
      setFormData(prev => ({
        ...prev,
        fullName: user.name || '',
        email: user.email || ''
      }));
    }
  }, []);

  // Lógica de filtrado dinámico
  const availableCenters = useMemo(() => Array.from(new Set(courseData.availableSessions.map(s => s.center))), []);
  
  const availableInstructors = useMemo(() => {
    const filtered = courseData.availableSessions.filter(s => !selection.center || s.center === selection.center);
    return Array.from(new Set(filtered.map(s => s.instructor)));
  }, [selection.center]);

  const availableWeeks = useMemo(() => {
    const filtered = courseData.availableSessions.filter(s => 
      (!selection.center || s.center === selection.center) &&
      (!selection.instructor || s.instructor === selection.instructor)
    );
    return Array.from(new Set(filtered.map(s => s.weekType)));
  }, [selection.center, selection.instructor]);

  const availableSchedules = useMemo(() => {
    const filtered = courseData.availableSessions.filter(s => 
      (!selection.center || s.center === selection.center) &&
      (!selection.instructor || s.instructor === selection.instructor) &&
      (!selection.weekType || s.weekType === selection.weekType)
    );
    return Array.from(new Set(filtered.map(s => s.schedule)));
  }, [selection.center, selection.instructor, selection.weekType]);

  const platformFee = courseData.price * 0.04;
  const totalAmount = courseData.price + platformFee;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(val);
  };

  const handleEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAgreed || !isLoggedIn || !isConfigConfirmed) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2500);
  };

  const resetSelection = () => {
    setSelection({ center: '', instructor: '', weekType: '', schedule: '' });
    setIsConfigConfirmed(false);
  };

  const isConfigComplete = selection.center && selection.instructor && selection.weekType && selection.schedule;

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-paido-offwhite flex items-center justify-center p-6 py-20 font-mono">
        <div className="max-w-3xl w-full bg-white border-8 border-retro-black p-8 md:p-12 shadow-retro animate-in fade-in zoom-in duration-500">
          <div className="flex flex-col items-center mb-10">
            <div className="size-20 bg-retro-black text-white flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-5xl">verified</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter italic text-center leading-none">REGISTRO EXITOSO</h2>
            <p className="text-[10px] font-black uppercase text-gray-500 tracking-[0.4em] mt-2 italic">ID_PAIDO_{id}_{Math.floor(Math.random() * 9999)}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 border-y-4 border-retro-black py-8 mb-10">
            <div className="space-y-4">
               <h3 className="text-xl font-display font-black uppercase tracking-tighter truncate">{courseData.title}</h3>
               <div className="space-y-2">
                 <p className="text-[10px] font-black uppercase text-gray-400">CONFIGURACIÓN ELEGIDA</p>
                 <div className="text-[10px] font-black uppercase space-y-1">
                   <p className="flex justify-between gap-2 overflow-hidden"><span className="shrink-0">Sede:</span> <span className="truncate">{selection.center}</span></p>
                   <p className="flex justify-between gap-2 overflow-hidden"><span className="shrink-0">Coach:</span> <span className="truncate">{selection.instructor}</span></p>
                   <p className="flex justify-between gap-2 overflow-hidden"><span className="shrink-0">Día:</span> <span className="truncate">{selection.weekType}</span></p>
                   <p className="flex justify-between gap-2 overflow-hidden"><span className="shrink-0">Hora:</span> <span className="truncate">{selection.schedule}</span></p>
                 </div>
               </div>
            </div>
            <div className="bg-paido-offwhite border-4 border-retro-black p-6">
              <p className="text-[8px] font-black text-gray-400 uppercase mb-4">PAGO CONFIRMADO</p>
              <p className="text-3xl font-display font-black italic">{formatCurrency(totalAmount)}</p>
              <p className="text-[8px] font-bold mt-4 opacity-50 uppercase tracking-widest italic">PAIDO_FINANCE_OS</p>
            </div>
          </div>

          <Link to="/dashboard" className="block w-full bg-retro-black text-white px-8 py-4 font-black uppercase border-4 border-retro-black shadow-retro-sm text-center">
            IR A MI TABLERO
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-paido-offwhite min-h-screen font-mono text-retro-black">
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12 border-b-8 border-retro-black pb-4">
          <Link to={`/course/${id}`} className="inline-flex items-center gap-2 text-xs font-black uppercase mb-6 hover:underline">
            <span className="material-symbols-outlined text-sm">arrow_back</span> Cancelar Proceso
          </Link>
          <h1 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter leading-none">INSCRIPCIÓN</h1>
          <p className="text-xs font-black text-gray-500 uppercase tracking-[0.3em] mt-2 italic">// CONFIGURACIÓN DE CURSADA</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-12">
            
            {/* SELECTORES DE CONFIGURACIÓN */}
            <section className={`bg-white border-4 border-retro-black p-6 md:p-10 shadow-retro transition-opacity ${isConfigConfirmed ? 'opacity-50' : 'opacity-100'}`}>
               <div className="flex items-center justify-between mb-10 border-b-4 border-retro-black pb-4">
                 <h2 className="text-xl md:text-2xl font-display font-black uppercase italic tracking-tighter">1. Elige tu Sesión</h2>
                 <button onClick={resetSelection} className="text-[10px] font-black uppercase underline decoration-2">Reiniciar</button>
               </div>
               
               <div className="space-y-10">
                 {/* Sede */}
                 <div className="space-y-4">
                   <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest flex items-center gap-2">
                     <span className="material-symbols-outlined text-sm">location_on</span> Selecciona la Sede
                   </p>
                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                     {availableCenters.map(center => (
                       <button
                         key={center}
                         disabled={isConfigConfirmed}
                         onClick={() => setSelection({...selection, center, instructor: '', weekType: '', schedule: ''})}
                         className={`p-4 border-4 border-retro-black text-[10px] font-black uppercase transition-all shadow-retro-sm
                           ${selection.center === center ? 'bg-retro-black text-white translate-x-1 translate-y-1 shadow-none' : 'bg-white hover:bg-gray-50'}
                         `}
                       >
                         {center}
                       </button>
                     ))}
                   </div>
                 </div>

                 {/* Instructor */}
                 <div className={`space-y-4 transition-all ${!selection.center ? 'opacity-20 pointer-events-none' : ''}`}>
                   <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest flex items-center gap-2">
                     <span className="material-symbols-outlined text-sm">school</span> Selecciona el Coach
                   </p>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                     {availableInstructors.map(ins => (
                       <button
                         key={ins}
                         disabled={isConfigConfirmed}
                         onClick={() => setSelection({...selection, instructor: ins, weekType: '', schedule: ''})}
                         className={`p-4 border-4 border-retro-black text-[10px] font-black uppercase transition-all shadow-retro-sm text-left flex items-center gap-3
                           ${selection.instructor === ins ? 'bg-retro-black text-white translate-x-1 translate-y-1 shadow-none' : 'bg-white hover:bg-gray-50'}
                         `}
                       >
                         <div className={`size-4 border-2 ${selection.instructor === ins ? 'border-white' : 'border-retro-black'}`}></div>
                         {ins}
                       </button>
                     ))}
                   </div>
                 </div>

                 {/* Días y Horarios */}
                 <div className="grid md:grid-cols-2 gap-10">
                    <div className={`space-y-4 transition-all ${!selection.instructor ? 'opacity-20 pointer-events-none' : ''}`}>
                      <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">calendar_month</span> Jornada
                      </p>
                      <div className="space-y-3">
                        {availableWeeks.map(week => (
                          <button
                            key={week}
                            disabled={isConfigConfirmed}
                            onClick={() => setSelection({...selection, weekType: week, schedule: ''})}
                            className={`w-full p-4 border-4 border-retro-black text-[10px] font-black uppercase transition-all text-left
                              ${selection.weekType === week ? 'bg-retro-black text-white' : 'bg-white hover:bg-gray-50'}
                            `}
                          >
                            {week}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className={`space-y-4 transition-all ${!selection.weekType ? 'opacity-20 pointer-events-none' : ''}`}>
                      <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">schedule</span> Bloque Horario
                      </p>
                      <div className="space-y-3">
                        {availableSchedules.map(sched => (
                          <button
                            key={sched}
                            disabled={isConfigConfirmed}
                            onClick={() => setSelection({...selection, schedule: sched})}
                            className={`w-full p-4 border-4 border-retro-black text-[10px] font-black uppercase transition-all text-left
                              ${selection.schedule === sched ? 'bg-retro-black text-white' : 'bg-white hover:bg-gray-50'}
                            `}
                          >
                            {sched}
                          </button>
                        ))}
                      </div>
                    </div>
                 </div>
               </div>

               {/* Botón de Confirmación de Configuración */}
               {isConfigComplete && !isConfigConfirmed && (
                 <div className="mt-12 p-6 border-4 border-dashed border-retro-black bg-paido-offwhite animate-in slide-in-from-bottom-4">
                   <p className="text-xs font-black uppercase text-center mb-6">¿Confirmas asistir a esta sede y horario?</p>
                   <button 
                     onClick={() => setIsConfigConfirmed(true)}
                     className="w-full bg-retro-black text-white py-4 font-black uppercase border-4 border-retro-black shadow-retro-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-3"
                   >
                     CONFIRMAR CONFIGURACIÓN <span className="material-symbols-outlined">verified</span>
                   </button>
                 </div>
               )}
            </section>

            {/* SECCIÓN DE PAGO (Bloqueada hasta confirmar configuración) */}
            <section className={`transition-all duration-500 ${!isConfigConfirmed ? 'opacity-20 grayscale pointer-events-none' : 'opacity-100'}`}>
              <form onSubmit={handleEnroll} className="bg-white border-4 border-retro-black p-6 md:p-10 shadow-retro space-y-8">
                <div className="flex items-center justify-between border-b-4 border-retro-black pb-4 mb-4">
                  <h2 className="text-xl md:text-2xl font-display font-black uppercase italic tracking-tighter">2. Datos de Pago</h2>
                  <button type="button" onClick={() => setIsConfigConfirmed(false)} className="text-[10px] font-black uppercase underline">Editar Sesión</button>
                </div>

                {!isLoggedIn ? (
                  <div className="border-4 border-retro-black p-10 bg-paido-offwhite text-center">
                    <h3 className="text-2xl font-display font-black uppercase tracking-tighter italic mb-4">Acceso Requerido</h3>
                    <Link to="/login/alumno" className="bg-retro-black text-white px-8 py-4 font-black uppercase border-4 border-retro-black inline-block">INICIAR SESIÓN</Link>
                  </div>
                ) : (
                  <>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="block text-[10px] font-black uppercase text-gray-400">Nombre Completo</label>
                        <input type="text" readOnly value={formData.fullName} className="w-full border-4 border-retro-black p-4 text-sm font-bold bg-paido-offwhite text-gray-500 cursor-not-allowed outline-none truncate" />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-[10px] font-black uppercase text-gray-400">Documento de Identidad</label>
                        <input 
                          type="text" 
                          required 
                          value={formData.documentId} 
                          onChange={(e) => setFormData({...formData, documentId: e.target.value})} 
                          placeholder="1.000.000.000" 
                          className="w-full border-4 border-retro-black p-4 text-sm font-bold focus:ring-0 focus:shadow-retro-sm outline-none" 
                        />
                      </div>
                    </div>

                    <div className="pt-8 border-t-4 border-dashed border-retro-black">
                      <label className="block text-[10px] font-black uppercase text-gray-400 mb-4">Pasarela de Pago</label>
                      <div className="grid grid-cols-1 xs:grid-cols-3 gap-4">
                        {['PSE', 'TARJETA', 'DÉBITO'].map(method => (
                          <button
                            key={method}
                            type="button"
                            onClick={() => setFormData({...formData, paymentMethod: method})}
                            className={`py-4 border-4 border-retro-black text-[10px] font-black transition-all
                              ${formData.paymentMethod === method ? 'bg-retro-black text-white' : 'bg-white hover:bg-gray-100'}
                            `}
                          >
                            {method}
                          </button>
                        ))}
                      </div>
                    </div>

                    <label className="flex items-center gap-4 cursor-pointer group p-4 border-4 border-retro-black bg-paido-offwhite overflow-hidden">
                      <input type="checkbox" className="size-6 border-4 border-retro-black shrink-0" checked={isAgreed} onChange={() => setIsAgreed(!isAgreed)} />
                      <span className="text-[10px] font-black uppercase leading-tight italic break-words">ACEPTO TÉRMINOS, CONDICIONES Y POLÍTICAS DE PAIDO_OS</span>
                    </label>

                    <button 
                      type="submit"
                      disabled={isProcessing || !isAgreed}
                      className={`w-full py-6 text-xl md:text-2xl font-display font-black uppercase tracking-tighter italic border-4 border-retro-black transition-all flex items-center justify-center gap-4
                        ${isAgreed ? 'bg-retro-black text-white shadow-retro hover:shadow-none translate-x-1 translate-y-1' : 'bg-gray-100 text-gray-400 border-gray-300 opacity-50'}
                      `}
                    >
                      {isProcessing ? 'PROCESANDO...' : <>FINALIZAR INSCRIPCIÓN <span className="material-symbols-outlined">payments</span></>}
                    </button>
                  </>
                )}
              </form>
            </section>
          </div>

          {/* SIDEBAR RESUMEN - TICKET DE RESERVA */}
          <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-28">
            <div className="bg-white border-4 border-retro-black p-6 md:p-8 shadow-retro overflow-hidden max-w-full">
              <h3 className="text-sm font-black uppercase mb-6 border-b-4 border-retro-black pb-2 italic truncate">Ticket de Reserva</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-center overflow-hidden">
                  <div className="size-16 border-4 border-retro-black overflow-hidden bg-gray-100 shrink-0">
                    <img src={courseData.img} className="w-full h-full object-cover grayscale" alt="Thumbnail" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="bg-retro-black text-white px-2 py-0.5 text-[8px] font-black uppercase italic truncate block w-fit max-w-full">{courseData.tag}</span>
                    <h4 className="text-xs font-black uppercase tracking-tight leading-tight mt-1 break-words line-clamp-2">{courseData.title}</h4>
                  </div>
                </div>

                <div className="space-y-3 bg-paido-offwhite border-2 border-retro-black p-4 overflow-hidden">
                  <p className="text-[9px] font-black uppercase text-gray-400 border-b border-gray-300 pb-1 mb-2 truncate">Resumen Selección</p>
                  <div className="space-y-2">
                    <div className="flex justify-between gap-2 overflow-hidden text-[9px] font-black uppercase">
                      <span className="shrink-0">Sede:</span> 
                      <span className={`truncate ${selection.center ? 'text-retro-black' : 'text-gray-300'}`}>{selection.center || 'NO ELEGIDO'}</span>
                    </div>
                    <div className="flex justify-between gap-2 overflow-hidden text-[9px] font-black uppercase">
                      <span className="shrink-0">Coach:</span> 
                      <span className={`truncate ${selection.instructor ? 'text-retro-black' : 'text-gray-300'}`}>{selection.instructor || 'NO ELEGIDO'}</span>
                    </div>
                    <div className="flex justify-between gap-2 overflow-hidden text-[9px] font-black uppercase">
                      <span className="shrink-0">Horario:</span> 
                      <span className={`truncate ${selection.schedule ? 'text-retro-black' : 'text-gray-300'}`}>{selection.schedule || 'NO ELEGIDO'}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t-2 border-dashed border-retro-black space-y-4 overflow-hidden">
                  <div className="flex justify-between gap-2 text-[10px] font-black uppercase">
                    <span className="shrink-0">Valor Curso</span> 
                    <span className="truncate">{formatCurrency(courseData.price)}</span>
                  </div>
                  <div className="flex justify-between gap-2 text-[10px] font-black uppercase">
                    <span className="shrink-0">Servicio (4%)</span> 
                    <span className="truncate">{formatCurrency(platformFee)}</span>
                  </div>
                  <div className="flex justify-between items-end gap-2 border-t-4 border-retro-black pt-4 mt-4 overflow-hidden">
                    <span className="text-lg font-display font-black italic shrink-0">TOTAL</span>
                    <span className="text-xl md:text-2xl font-display font-black italic truncate">{formatCurrency(totalAmount)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-retro-black text-white p-6 border-4 border-retro-black flex flex-col items-center text-center overflow-hidden">
               <span className="material-symbols-outlined text-4xl mb-2 text-yellow-400">verified</span>
               <p className="text-[10px] font-black uppercase tracking-[0.2em] truncate w-full">PAIDO_SECURE_GATEWAY</p>
               <p className="text-[8px] font-bold text-gray-400 mt-2 truncate w-full">GARANTÍA DE CUPO INSTANTÁNEA</p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default EnrollmentPage;
