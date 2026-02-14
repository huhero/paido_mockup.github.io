
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import AthleteDashboard from './pages/AthleteDashboard';
import InstructorPanel from './pages/InstructorPanel';
import CourseDetail from './pages/CourseDetail';
import CourseInfoPage from './pages/CourseInfoPage';
import InstructorProfilePage from './pages/InstructorProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SportsCenters from './pages/SportsCenters';
import SportsCenterDetail from './pages/SportsCenterDetail';
import EnrollmentPage from './pages/EnrollmentPage';
import CommunityPage from './pages/CommunityPage';
import NewsArticlePage from './pages/NewsArticlePage';

// Componente Interno para manejar la lógica de carga al cambiar de ruta
const PageTransitionWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('SINCRONIZANDO...');

  const messages = [
    "CARGANDO RENDIMIENTO...",
    "SINCRONIZANDO DATOS...",
    "CALIBRANDO SENSORES...",
    "PREPARANDO PISTA...",
    "CONECTANDO con LA ÉLITE...",
    "ACTUALIZANDO TELEMETRÍA..."
  ];

  useEffect(() => {
    setIsPageLoading(true);
    setLoadingProgress(0);
    setLoadingText(messages[Math.floor(Math.random() * messages.length)]);

    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 40);

    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 700);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [location.pathname]);

  return (
    <>
      {isPageLoading && (
        <div className="fixed inset-0 z-[1000] bg-paido-offwhite flex items-center justify-center p-6 border-[12px] border-retro-black">
          <div className="max-w-md w-full space-y-8">
            <div className="flex items-center justify-between border-b-4 border-retro-black pb-4">
               <h2 className="text-4xl font-display font-black uppercase tracking-tighter italic">PAIDO_OS</h2>
               <div className="size-10 bg-retro-black flex items-center justify-center text-white">
                 <span className="material-symbols-outlined animate-spin">sync</span>
               </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                <span>{loadingText}</span>
                <span>{loadingProgress}%</span>
              </div>
              <div className="h-10 border-4 border-retro-black p-1 bg-white">
                <div 
                  className="h-full bg-retro-black transition-all duration-300 ease-out" 
                  style={{ width: `${loadingProgress}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 opacity-20">
              <div className="halftone h-8 border-2 border-retro-black"></div>
              <div className="halftone h-8 border-2 border-retro-black"></div>
              <div className="halftone h-8 border-2 border-retro-black"></div>
            </div>

            <p className="text-center text-[8px] font-black uppercase text-gray-400 tracking-[0.3em]">
              SISTEMA DE ALTO RENDIMIENTO V2.5.0 // BOGOTÁ_COL
            </p>
          </div>
        </div>
      )}
      <div className={isPageLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
        {children}
      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col relative selection:bg-retro-black selection:text-white bg-paido-offwhite">
        <Navbar />
        <main className="flex-1 pb-24 md:pb-0">
          <PageTransitionWrapper>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login/:type" element={<LoginPage />} />
              <Route path="/register/:type" element={<RegisterPage />} />
              <Route path="/dashboard" element={<AthleteDashboard />} />
              <Route path="/instructor" element={<InstructorPanel />} />
              <Route path="/course" element={<CourseDetail />} />
              <Route path="/course/:id" element={<CourseInfoPage />} />
              <Route path="/instructor-profile/:name" element={<InstructorProfilePage />} />
              <Route path="/centers" element={<SportsCenters />} />
              <Route path="/centers/:id" element={<SportsCenterDetail />} />
              <Route path="/enroll/:id" element={<EnrollmentPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/community/:id" element={<NewsArticlePage />} />
            </Routes>
          </PageTransitionWrapper>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
