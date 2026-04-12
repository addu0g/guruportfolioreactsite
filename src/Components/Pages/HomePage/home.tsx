import { Link } from 'react-router-dom';

export const Home = () => (
  <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1rem' }}>
    
    {/* Hero Section */}
    <section style={{ textAlign: 'center', padding: '4rem 0', borderBottom: '1px solid #e5e7eb' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#111827', margin: '0 0 1rem 0', lineHeight: '1.2' }}>
        Diseña tu Futuro Financiero con <span style={{ color: '#2563eb' }}>Inteligencia Artificial</span>
      </h1>
      <p style={{ fontSize: '1.15rem', color: '#4b5563', maxWidth: '700px', margin: '0 auto 2.5rem auto', lineHeight: '1.6' }}>
        Genera portafolios de inversión diversificados y adaptados a tu tolerancia al riesgo en cuestión de segundos, impulsado por el motor cognitivo de Google Gemini.
      </p>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <Link 
          to="/portfolio" 
          style={{ padding: '0.875rem 1.5rem', backgroundColor: '#10b981', color: '#ffffff', textDecoration: 'none', borderRadius: '6px', fontWeight: '600', fontSize: '1rem', boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.4)', transition: 'transform 0.2s' }}
        >
          Generar mi Portafolio
        </Link>
        <Link 
          to="/config" 
          style={{ padding: '0.875rem 1.5rem', backgroundColor: '#f3f4f6', color: '#374151', textDecoration: 'none', borderRadius: '6px', fontWeight: '600', fontSize: '1rem', border: '1px solid #d1d5db' }}
        >
          Configurar API Key
        </Link>
      </div>
    </section>

    {/* Features Section */}
    <section style={{ padding: '4rem 0' }}>
      <h2 style={{ textAlign: 'center', fontSize: '1.8rem', color: '#1f2937', marginBottom: '3rem' }}>¿Por qué usar nuestra plataforma?</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        
        {/* Card 1 */}
        <div style={{ padding: '1.5rem', backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }}>
          <div style={{ width: '48px', height: '48px', backgroundColor: '#dbeafe', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <svg width="24" height="24" fill="none" stroke="#2563eb" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <h3 style={{ fontSize: '1.2rem', color: '#111827', margin: '0 0 0.5rem 0' }}>Análisis Instantáneo</h3>
          <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
            Olvídate de horas de investigación. Obtén una distribución de activos recomendada al instante basada en tu perfil de inversor.
          </p>
        </div>

        {/* Card 2 */}
        <div style={{ padding: '1.5rem', backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }}>
          <div style={{ width: '48px', height: '48px', backgroundColor: '#dcfce7', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <svg width="24" height="24" fill="none" stroke="#10b981" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
          </div>
          <h3 style={{ fontSize: '1.2rem', color: '#111827', margin: '0 0 0.5rem 0' }}>Estrategias Diversificadas</h3>
          <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
            Desde ETFs conservadores hasta acciones de crecimiento. La IA estructura un portafolio diseñado para minimizar riesgos y maximizar retornos.
          </p>
        </div>

        {/* Card 3 */}
        <div style={{ padding: '1.5rem', backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }}>
          <div style={{ width: '48px', height: '48px', backgroundColor: '#fee2e2', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <svg width="24" height="24" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          </div>
          <h3 style={{ fontSize: '1.2rem', color: '#111827', margin: '0 0 0.5rem 0' }}>100% Privado y Seguro</h3>
          <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
            No almacenamos tus datos en servidores externos. Tu API Key de Gemini se guarda localmente en tu propio dispositivo.
          </p>
        </div>

      </div>
    </section>
    
    {/* Footer Call to Action */}
    <section style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
      <h2 style={{ fontSize: '1.5rem', color: '#0f172a', margin: '0 0 1rem 0' }}>¿Listo para invertir con ventaja?</h2>
      <p style={{ color: '#475569', marginBottom: '2rem' }}>Configura tu API Key en segundos y comienza a generar tus estrategias financieras.</p>
      <Link 
        to="/config" 
        style={{ padding: '0.75rem 1.5rem', backgroundColor: '#2563eb', color: '#ffffff', textDecoration: 'none', borderRadius: '6px', fontWeight: '600' }}
      >
        Comenzar Ahora
      </Link>
    </section>
  </div>
);