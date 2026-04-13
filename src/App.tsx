import { useState } from 'react';
import './App.css'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { NotFound } from './Components/HTMLErrors/notfound';
import { Home } from './Components/Pages/HomePage/home';
//import { About } from './Components/Pages/AboutPage/about';
import { AIConfigForm } from './Components/Pages/AIConfigForm/AIConfigForm';
import { AIPortfolio } from './Components/Pages/AIPortfolio/AIPortfolio';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      {/* Menú de navegación global */}
      <nav className="flex justify-between items-center px-6 md:px-8 py-4 md:py-[1.2rem] border-b border-slate-200 bg-white shadow-sm sticky top-0 z-50">
        {/* Botón de Hamburguesa */}
        <button 
          className="hamburger-btn p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Abrir menú"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Overlay oscuro para móvil */}
        <div 
          className={`mobile-overlay ${isMenuOpen ? 'is-open' : ''}`} 
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Menú (Lateral en Móvil, Fila en Desktop) */}
        <ul className={`nav-menu ${isMenuOpen ? 'is-open' : ''}`}>
          {/* Botón Cerrar (Solo Móvil) */}
          <li className="close-btn">
            <button className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none" onClick={() => setIsMenuOpen(false)} aria-label="Cerrar menú">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </li>

          <li className="w-full md:w-auto">
            <NavLink 
              to="/" 
              onClick={() => setIsMenuOpen(false)} 
              className={({ isActive }) => `block w-full transition-colors text-lg md:text-base text-slate-600 font-medium hover:text-blue-600 ${isActive ? 'selected-btn' : 'normal-btn'}`}
            >
              Inicio 
            </NavLink>
            |
          </li>
          <li className="w-full md:w-auto">
            <NavLink 
              to="/config" 
              onClick={() => setIsMenuOpen(false)} 
              className={({ isActive }) => `block w-full transition-colors text-lg md:text-base text-slate-600 font-medium hover:text-blue-600 ${isActive ? 'selected-btn' : 'normal-btn'}`}
            >
              Configuración IA 
            </NavLink>
            |
          </li>
          <li className="w-full md:w-auto mt-4 md:mt-0">
            <NavLink 
              to="/portfolio" 
              onClick={() => setIsMenuOpen(false)} 
              className={({ isActive }) => `block w-full text-center px-4 py-3 md:py-[0.6rem] md:px-[1.2rem] text-white rounded-md font-semibold text-lg md:text-base transition-colors shadow-sm bg-blue-600 hover:bg-blue-700 ${isActive ? 'selected-btn' : 'normal-btn'}`}
            >
              Generar Portafolio
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Contenedor principal donde React Router inyectará las vistas */}
      <main className="min-h-[calc(100vh-80px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/config" element={<AIConfigForm />} />
          <Route path="/portfolio" element={<AIPortfolio />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
