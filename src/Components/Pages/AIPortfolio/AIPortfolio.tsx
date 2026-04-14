import { useState, type FormEvent } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import "./AIPortfolio.css"
import { PortfolioChart, type PortfolioData } from '../PortfolioComponents/PortfolioChart';

export const AIPortfolio = () => {
  const [amount, setAmount] = useState<string>('');
  const [risk, setRisk] = useState<string>('medium');
  const [portfolio, setPortfolio] = useState<string | null>(null);
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setPortfolio(null);
    setPortfolioData(null);

    // 1. Obtenemos las variables de configuración desde LocalStorage
    const apiKey = localStorage.getItem('apiKey');
    const model = localStorage.getItem('selectedModel') || 'gemini-1.5-flash'; // Fallback a flash por defecto

    if (!apiKey) {
      setError('No se ha configurado la API Key. Por favor, ve a la sección de "Configuración IA" y guarda tu llave.');
      return;
    }

    setIsLoading(true);

    // 2. Preparamos el Prompt (instrucción) para la IA
    const prompt = `Actúa como un asesor financiero experto. Crea un portafolio de inversión diversificado para un capital de $${amount} USD, considerando que mi tolerancia al riesgo es "${risk}". Explica brevemente la distribución en porcentajes y por qué elegiste esos tipos de activos. Formatea tu respuesta con claridad.

IMPORTANTE: Al final de tu respuesta, debes incluir obligatoriamente un bloque de código delimitado por \`\`\`json y \`\`\` que contenga los datos extraídos del portafolio. El JSON debe seguir exactamente esta estructura:
{
  "totalAmount": ${amount},
  "riskProfile": "${risk}",
  "assets": [
    { "name": "Nombre del activo (ej. S&P 500)", "percentage": 40, "amount": 4000, "reason": "Razón corta" }
  ]
}`;

    try {
      // 3. Consumimos la API de generación de contenido de Gemini
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      if (!response.ok) {
        throw new Error(`Error de la API de Gemini (Status: ${response.status})`);
      }

      const data = await response.json();
      
      // Extraemos el texto de la respuesta estructurada de Google Gemini
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (generatedText) {
        // Extraer el JSON usando Expresiones Regulares
        const jsonRegex = /```(?:json)?\s*(\{[\s\S]*?\})\s*```/i;
        const match = generatedText.match(jsonRegex);
        
        if (match && match[1]) {
          try {
            const jsonPortfolio = JSON.parse(match[1]);
            // Persistir el objeto JSON en localStorage
            localStorage.setItem('savedPortfolio', JSON.stringify(jsonPortfolio));
            setPortfolioData(jsonPortfolio);
            console.log('Portafolio estructurado guardado en localStorage:', jsonPortfolio);
          } catch (parseError) {
            console.error('Error al intentar parsear el JSON del portafolio:', parseError);
          }
        }
        
        // Removemos el bloque JSON del texto generado para mantener limpia la interfaz gráfica (UI)
        const cleanText = generatedText.replace(jsonRegex, '').trim();
        setPortfolio(cleanText);
      } else {
        throw new Error('La IA no devolvió el formato esperado.');
      }
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'Ocurrió un error al generar el portafolio. Revisa tu conexión o tu API Key.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="portfolio-container">
      <h2 className="portfolio-title">Generador de Portafolio con IA</h2>
      <p className="portfolio-description">Ingresa tus datos y nuestra IA diseñará una estrategia de inversión para ti.</p>
      
      <form onSubmit={handleGenerate} className="portfolio-form">
        <div className="form-group">
          <label htmlFor="amount" className="form-label">Monto a invertir ($):</label>
          <input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Ej. 10000" min="10" required className="form-input" />
        </div>
        
        <div className="form-group">
          <label htmlFor="risk" className="form-label">Tolerancia al riesgo:</label>
          <select id="risk" value={risk} onChange={(e) => setRisk(e.target.value)} className="form-input">
            <option value="Bajo (Conservador)">Bajo (Conservador)</option>
            <option value="Medio (Moderado)">Medio (Moderado)</option>
            <option value="Alto (Agresivo)">Alto (Agresivo)</option>
          </select>
        </div>

        <button type="submit" disabled={isLoading} className="submit-button">
          {isLoading ? 'Analizando el mercado y generando...' : 'Generar Portafolio'}
        </button>
      </form>

      {error && (
        <div className="error-message"><strong>Error:</strong> {error}</div>
      )}

      {portfolio && (
        <div id="printable-portfolio" className="portfolio-result">
          <button 
            className="print-button print-hidden"
            onClick={() => window.print()}
            title="Imprimir portafolio"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
            Imprimir
          </button>
          
          <h3 className="result-title">Tu Portafolio Sugerido</h3>
          <div className="result-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{portfolio}</ReactMarkdown>
          </div>

          {/* Componente del Gráfico y Lista de Pesos */}
          <div className='print-hidden'>
            <PortfolioChart newData={portfolioData} />  
          </div>

          {/* Aviso Legal y Descargo de Responsabilidad */}
          <hr style={{ marginTop: '2.5rem', marginBottom: '1.5rem', border: 'none', borderTop: '1px solid #000000' }} />
          <section style={{ fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif", lineHeight: 1.6, fontSize: '7px', color: '#64748b' }}>
            <h2 style={{ fontSize: '10px', color:'#000' }}>Aviso Legal y Descargo de Responsabilidad</h2>
            <div>
              <h3>Propósito Informativo</h3>
              <p>El presente <strong>Reporte Financiero</strong> y los análisis de portafolio aquí contenidos tienen un propósito única y exclusivamente informativo y educativo. Ninguna parte de este documento constituye, ni debe interpretarse como, asesoramiento financiero, de inversión, legal, fiscal o contable.</p>
            </div>
            <div className="disclaimer-section">
              <h3>Uso de Inteligencia Artificial y Herramientas Cuantitativas</h3>
              <p>Este reporte ha sido generado utilizando algoritmos cuantitativos y modelos de lenguaje de Inteligencia Artificial (IA) para procesar y estructurar datos del mercado financiero. Aunque los datos provienen de fuentes consideradas confiables y el sistema está diseñado para ofrecer evaluaciones lógicas, el usuario reconoce que los modelos algorítmicos y de IA pueden presentar errores de interpretación, desactualización de datos o <em>alucinaciones</em> inherentes a esta tecnología.</p>
            </div>
            <div>
              <h3>Ausencia de Recomendación de Compra o Venta</h3>
              <p>Las evaluaciones, diagnósticos y simulaciones de resiliencia ante recesiones no representan una oferta, solicitud o recomendación explícita para comprar, retener o vender valores, instrumentos financieros o activos digitales mencionados en este documento. Las estrategias analizadas pueden no ser adecuadas para su perfil de riesgo individual.</p>
            </div>
          </section>
          <section style={{ fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif", lineHeight: 1.6, fontSize: '7px', color: '#64748b' }}>
            <div>
              <h3>Riesgo de Inversión</h3>
              <p>La inversión en los mercados financieros, especialmente en activos de renta variable, sectores de crecimiento (growth), criptoactivos y mercados emergentes, conlleva un <strong>alto nivel de riesgo</strong>, incluyendo la posible pérdida total del capital invertido. Rendimientos pasados no garantizan ni son indicativos de rendimientos futuros.</p>
            </div>
            <div style={{ marginTop: '16px' }}>
              <h3>Exención de Responsabilidad</h3>
              <p>El desarrollador, la plataforma y los proveedores de tecnología (incluyendo los motores de IA subyacentes) se eximen expresamente de cualquier responsabilidad, directa o indirecta, por pérdidas, daños o perjuicios económicos que pudieran derivarse del uso de la información contenida en este reporte para la toma de decisiones de inversión. <strong>Toda decisión financiera tomada con base en este documento es bajo la absoluta responsabilidad del usuario.</strong></p>
            </div>
          </section>
        </div>
      )}

      {/* Modal de Carga (Overlay) */}
      {isLoading && (
        <div className="modal-overlay">
          <div className="modal-content">
            <svg width="60" height="60" viewBox="0 0 50 50" stroke="#10b981">
              <g fill="none" fillRule="evenodd" strokeWidth="4">
                <circle cx="25" cy="25" r="20" strokeOpacity="0.2" />
                <path d="M25 5a20 20 0 0 1 20 20">
                  <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1s" repeatCount="indefinite" />
                </path>
              </g>
            </svg>
            <h3 className="modal-title">Generando Portafolio...</h3>
            <p className="modal-text">La IA está analizando los datos por ti</p>
          </div>
        </div>
      )}
    </div>
  );
};