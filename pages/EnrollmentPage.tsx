
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

interface Course {
  id: number;
  title: string;
  instructor: string;
  tag: string;
  center: string;
  price: number;
  priceDisplay: string;
  duration: string;
  level: string;
  weekType: string;
  schedule: string;
  description: string;
  img: string;
}

const EnrollmentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Estado del formulario
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    documentId: '',
    phone: '',
    paymentMethod: 'PSE'
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Verificar si el usuario está logueado
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

  const courseData: Course = {
    id: Number(id),
    title: "Servicio de Potencia y Precisión Pro",
    instructor: "Andrés M. Sampras",
    tag: "TENIS",
    center: "Elite Tennis Club",
    price: 180000,
    priceDisplay: "$180.000",
    duration: "6 SEMANAS",
    level: 'Avanzado',
    weekType: 'Fines de Semana',
    schedule: 'Jornada Mañana',
    description: "Este programa intensivo está diseñado para atletas que buscan perfeccionar su técnica de saque y control de fondo. El enfoque se centra en la biomecánica del movimiento y la optimización de la fuerza explosiva en cada impacto.",
    img: "https://images.unsplash.com/photo-1595435066319-4051d3828223?q=80&w=600&h=400&auto=format&fit=crop"
  };

  const platformFee = courseData.price * 0.04;
  const totalAmount = courseData.price + platformFee;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(val);
  };

  const handleEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAgreed || !isLoggedIn) return;
    
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-paido-offwhite flex items-center justify-center p-6 py-20 font-mono">
        <div className="max-w-3xl w-full bg-white border-8 border-retro-black p-8 md:p-12 shadow-retro animate-in fade-in zoom-in duration-500">
          <div className="flex flex-col items-center mb-10">
            <div className="size-20 bg-retro-black text-white flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-5xl">verified</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter italic text-center">¡ATLETA REGISTRADO!</h2>
            <p className="text-[10px] font-black uppercase text-gray-500 tracking-[0.4em] mt-2">ID_CONFIRMATION: PAIDO-{id}-{Math.floor(Math.random() * 9999)}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 border-y-4 border-retro-black py-8 mb-10">
            <div className="space-y-6">
              <div className="flex gap-4 items-center">
                <div className="size-24 border-4 border-retro-black overflow-hidden shrink-0">
                  <img src={courseData.img} className="w-full h-full object-cover" alt="Curso" />
                </div>
                <div>
                  <div className="bg-retro-black text-white px-2 py-0.5 text-[8px] font-black uppercase w-fit mb-1">{courseData.tag}</div>
                  <h3 className="text-xl font-display font-black uppercase leading-tight tracking-tighter">{courseData.title}</h3>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[9px] font-black uppercase text-gray-400">Detalles de la Reserva</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border-l-2 border-retro-black pl-2">
                    <p className="text-[8px] font-black text-gray-400 uppercase">Coach</p>
                    <p className="text-[10px] font-black uppercase">{courseData.instructor}</p>
                  </div>
                  <div className="border-l-2 border-retro-black pl-2">
                    <p className="text-[8px] font-black text-gray-400 uppercase">Sede</p>
                    <p className="text-[10px] font-black uppercase">{courseData.center}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-paido-offwhite border-4 border-retro-black p-6 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-black uppercase mb-4 border-b border-gray-300 pb-1">Comprobante de Pago</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] font-bold uppercase">
                    <span>Valor Base</span>
                    <span>{formatCurrency(courseData.price)}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-bold uppercase">
                    <span>Servicio Plataforma (4%)</span>
                    <span>{formatCurrency(platformFee)}</span>
                  </div>
                  <div className="border-t-2 border-retro-black pt-2 mt-4 flex justify-between items-end">
                    <span className="text-xs font-black uppercase">Total Pagado</span>
                    <span className="text-2xl font-display font-black italic">{formatCurrency(totalAmount)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard" className="bg-retro-black text-white px-8 py-4 font-black uppercase border-4 border-retro-black shadow-retro-sm hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all text-center">
              IR A MI TABLERO
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-paido-offwhite min-h-screen font-mono text-retro-black">
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12 border-b-8 border-retro-black pb-4">
          <Link to="/course" className="inline-flex items-center gap-2 text-xs font-black uppercase mb-6 hover:underline">
            <span className="material-symbols-outlined text-sm">arrow_back</span> Cancelar Proceso
          </Link>
          <h1 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter">INSCRIPCIÓN</h1>
          <p className="text-xs font-black text-gray-500 uppercase tracking-[0.3em] mt-2 italic">// REGISTRO OFICIAL DE ATLETA</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-8">
            <section className="bg-white border-4 border-retro-black p-8 shadow-retro-sm">
               <h2 className="text-xl font-display font-black uppercase mb-6 flex items-center gap-2">
                 <span className="material-symbols-outlined">info</span> Información del Curso
               </h2>
               
               <div className="mb-10">
                 <p className="text-[10px] font-black uppercase text-gray-400 mb-2">Resumen del programa</p>
                 <p className="text-sm font-bold text-gray-700 italic border-l-4 border-retro-black pl-4">
                   "{courseData.description}"
                 </p>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { label: 'Nivel', value: courseData.level, icon: 'military_tech' },
                    { label: 'Disciplina', value: courseData.tag, icon: 'category' },
                    { label: 'Centro', value: courseData.center, icon: 'domain' },
                    { label: 'Profesor', value: courseData.instructor, icon: 'person' },
                    { label: 'Semana', value: courseData.weekType, icon: 'calendar_today' },
                    { label: 'Horario', value: courseData.schedule, icon: 'schedule' }
                  ].map((attr, i) => (
                    <div key={i} className="bg-paido-offwhite border-2 border-retro-black p-4 flex flex-col justify-between">
                       <p className="text-[8px] font-black uppercase text-gray-400 flex items-center gap-1 mb-2">
                         <span className="material-symbols-outlined text-[10px]">{attr.icon}</span>
                         {attr.label}
                       </p>
                       <p className="text-[10px] font-black uppercase leading-tight tracking-tight">{attr.value}</p>
                    </div>
                  ))}
               </div>
            </section>

            {/* FORMULARIO CONDICIONAL POR ESTADO DE SESIÓN */}
            <form onSubmit={handleEnroll} className="space-y-8 bg-white border-4 border-retro-black p-10 shadow-retro">
              <div className="flex items-center justify-between mb-4 border-b-2 border-retro-black pb-2">
                <h2 className="text-xl font-display font-black uppercase">Datos del Alumno</h2>
                {isLoggedIn && (
                  <span className="text-[8px] font-black uppercase bg-green-100 border border-green-500 px-2 py-0.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[10px]">verified_user</span> Perfil Sincronizado
                  </span>
                )}
              </div>

              {!isLoggedIn ? (
                <div className="border-4 border-retro-black p-8 bg-paido-offwhite text-center space-y-6">
                  <div className="size-16 bg-retro-black text-white flex items-center justify-center mx-auto">
                    <span className="material-symbols-outlined text-4xl">lock</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-black uppercase tracking-tighter italic">Acceso Requerido</h3>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Debes iniciar sesión para inscribirte</p>
                  </div>
                  <Link 
                    to="/login/alumno" 
                    className="inline-flex w-full items-center justify-center gap-3 bg-retro-black text-white py-4 font-black uppercase text-sm border-4 border-retro-black shadow-retro-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
                  >
                    INICIAR SESIÓN <span className="material-symbols-outlined">login</span>
                  </Link>
                </div>
              ) : (
                <>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400">Nombre Completo</label>
                      <input 
                        type="text" 
                        required
                        readOnly
                        value={formData.fullName}
                        className="w-full border-4 border-retro-black p-4 text-sm font-bold bg-paido-offwhite text-gray-500 cursor-not-allowed outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400">Email de Contacto</label>
                      <input 
                        type="email" 
                        required
                        readOnly
                        value={formData.email}
                        className="w-full border-4 border-retro-black p-4 text-sm font-bold bg-paido-offwhite text-gray-500 cursor-not-allowed outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400">Documento de Identidad</label>
                      <input 
                        type="text" 
                        required
                        value={formData.documentId}
                        onChange={(e) => setFormData({...formData, documentId: e.target.value})}
                        placeholder="1.000.000.000"
                        className="w-full border-4 border-retro-black p-4 text-sm font-bold focus:ring-0 focus:shadow-retro-sm transition-all outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400">Celular</label>
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+57 300 000 0000"
                        className="w-full border-4 border-retro-black p-4 text-sm font-bold focus:ring-0 focus:shadow-retro-sm transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-8 border-t-4 border-dashed border-retro-black">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Método de Pago</label>
                    <div className="grid grid-cols-3 gap-4">
                      {['PSE', 'TARJETA', 'TRANSFERENCIA'].map(method => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => setFormData({...formData, paymentMethod: method})}
                          className={`py-4 border-4 border-retro-black text-[10px] font-black uppercase tracking-widest transition-all
                            ${formData.paymentMethod === method ? 'bg-retro-black text-white' : 'bg-white hover:bg-retro-gray'}
                          `}
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8 space-y-6">
                    <label className="flex items-center gap-4 cursor-pointer group p-4 border-4 border-retro-black bg-paido-offwhite hover:bg-retro-gray transition-colors">
                      <div className="relative flex items-center">
                        <input 
                          type="checkbox" 
                          className="peer appearance-none size-8 border-4 border-retro-black bg-white checked:bg-retro-black transition-all"
                          checked={isAgreed}
                          onChange={() => setIsAgreed(!isAgreed)}
                        />
                        <span className="material-symbols-outlined absolute text-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 pointer-events-none text-2xl">done</span>
                      </div>
                      <span className="text-[10px] font-black uppercase leading-tight select-none">
                        ESTOY DE ACUERDO CON LOS TÉRMINOS Y CONDICIONES DEL ENTRENAMIENTO Y POLÍTICAS DE PAIDO_ECOSYSTEM.
                      </span>
                    </label>

                    <button 
                      type="submit"
                      disabled={isProcessing || !isAgreed}
                      className={`w-full py-6 text-2xl font-display font-black uppercase tracking-tighter italic border-4 border-retro-black transition-all flex items-center justify-center gap-4
                        ${isAgreed 
                          ? 'bg-retro-black text-white shadow-retro hover:shadow-none hover:translate-x-1 hover:translate-y-1' 
                          : 'bg-gray-200 text-gray-400 border-gray-400 cursor-not-allowed opacity-50'}
                      `}
                    >
                      {isProcessing ? (
                        <>PROCESANDO... <span className="material-symbols-outlined animate-spin">sync</span></>
                      ) : (
                        <>CONFIRMAR INSCRIPCIÓN <span className="material-symbols-outlined">payments</span></>
                      )}
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>

          <aside className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            <div className="bg-white border-4 border-retro-black p-6 shadow-retro overflow-hidden">
              <h3 className="text-sm font-black uppercase mb-6 border-b-2 border-retro-black pb-2 italic">Resumen de Reserva</h3>
              <div className="flex gap-4 mb-6 items-center">
                <div className="size-20 border-4 border-retro-black shrink-0 overflow-hidden relative">
                  <img src={courseData.img} className="w-full h-full object-cover grayscale" alt="Thumbnail" />
                </div>
                <div className="flex-1">
                  <div className="bg-retro-black text-white px-2 py-0.5 text-[8px] font-black uppercase w-fit mb-1">{courseData.tag}</div>
                  <h4 className="text-sm font-black uppercase leading-tight tracking-tight">{courseData.title}</h4>
                </div>
              </div>
              <div className="bg-paido-offwhite border-2 border-retro-black p-4 mb-8 space-y-3">
                <p className="text-[9px] font-black uppercase text-gray-400 border-b border-gray-300 pb-1 mb-2">Detalles del Entrenamiento</p>
                <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                  {[
                    { l: 'Sede', v: courseData.center },
                    { l: 'Coach', v: courseData.instructor },
                    { l: 'Nivel', v: courseData.level },
                    { l: 'Semana', v: courseData.weekType }
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-[7px] font-black uppercase text-gray-500 leading-none mb-1">{item.l}</span>
                      <span className="text-[9px] font-black uppercase leading-none">{item.v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3 border-t-2 border-dashed border-retro-black pt-6">
                <div className="flex justify-between items-center text-[10px] font-black uppercase">
                  <span>Valor del Curso</span>
                  <span>{formatCurrency(courseData.price)}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-black uppercase text-retro-black">
                  <span>Servicio Plataforma <span className="text-[7px] bg-retro-black text-white px-1">4%</span></span>
                  <span>{formatCurrency(platformFee)}</span>
                </div>
                <div className="flex justify-between items-center text-3xl font-display font-black italic border-t-4 border-retro-black pt-4 mt-4">
                  <span>TOTAL</span>
                  <span>{formatCurrency(totalAmount)}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default EnrollmentPage;
