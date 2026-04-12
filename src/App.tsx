import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { NotFound } from './Components/HTMLErrors/notfound';
import { Home } from './Components/Pages/HomePage/home';
//import { About } from './Components/Pages/AboutPage/about';
import { AIConfigForm } from './Components/Pages/AIConfigForm/AIConfigForm';
import { AIPortfolio } from './Components/Pages/AIPortfolio/AIPortfolio';

function App() {
  return (
    <BrowserRouter>
      {/* Menú de navegación global */}
      <nav style={{ padding: '1.2rem 2rem', borderBottom: '1px solid #e5e7eb', backgroundColor: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
        <div style={{ fontWeight: 'bold', fontSize: '1.4rem', color: '#0f172a' }}>Gurú del Portafolio</div>
        <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0, alignItems: 'center' }}>
          <li>
            <Link to="/" style={{ color: '#475569', fontWeight: '500' }}>Inicio</Link>
          </li>
          <li>
            <Link to="/config" style={{ color: '#475569', fontWeight: '500' }}>Configuración IA</Link>
          </li>
          <li>
            <Link to="/portfolio" style={{ padding: '0.6rem 1.2rem', backgroundColor: '#2563eb', color: '#ffffff', borderRadius: '6px', fontWeight: '600' }}>Generar Portafolio</Link>
          </li>
        </ul>
      </nav>

      {/* Contenedor principal donde React Router inyectará las vistas */}
      <main style={{ minHeight: 'calc(100vh - 80px)' }}>
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
