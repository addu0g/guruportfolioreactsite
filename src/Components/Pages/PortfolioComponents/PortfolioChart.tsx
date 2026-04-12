import { useEffect, useRef } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Interfaces para tipar nuestro JSON estructurado
interface Asset {
  name: string;
  percentage: number;
  amount: number;
  reason: string;
}

export interface PortfolioData {
  totalAmount: number;
  riskProfile: string;
  assets: Asset[];
}

// Paleta de colores amigables para la gráfica
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#F28482', '#F6BD60', '#F7EDE2'];

export const PortfolioChart = ({ newData }: { newData?: PortfolioData | null }) => {
  // 1. Usamos useRef en lugar de useState para guardar el estado inicial
  // y evitar re-renders y bucles infinitos
  const dataRef = useRef<PortfolioData | null>(null);

  // Efecto para manejar actualizaciones de newData
  useEffect(() => {
    if (newData  !== undefined) {
      // Verifica si la estructura del objeto realmente cambió
      if (JSON.stringify(dataRef.current) === JSON.stringify(newData)) {
        console.log('Los datos no han cambiado.');
        return;
      }

      // Actualiza el valor de dataRef con los nuevos datos
      dataRef.current = newData;

      // Realiza cualquier acción que necesites con newData aquí
      console.log('Datos actualizados:', newData);
    }
  }, [newData]);

  useEffect(() => {
    // Efecto para cargar datos desde localStorage cuando el componente se monta
    if (!dataRef.current) {
      const saved = localStorage.getItem('savedPortfolio');
      if (saved) {
        try {
          const parsedData = JSON.parse(saved);
          dataRef.current = parsedData;
          console.log('Datos cargados desde localStorage:', parsedData);
        } catch (error) {
          console.error('Error al parsear los datos del localStorage:', error);
        }
      }
    }
  }, []); // Efecto de montaje

  // 3. Determinamos la data a mostrar usando la que viene por props o la guardada en la ref
  const displayData = newData || dataRef.current;

  if (!displayData || !displayData.assets || displayData.assets.length === 0) {
    return null;
  }

  return (
    <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid #e2e8f0' }}>
      <h3 style={{ textAlign: 'center', color: '#0f172a', marginBottom: '2rem', fontSize: '1.5rem' }}>
        Distribución de tu Portafolio
      </h3>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', justifyItems: 'center' }}>
        
        {/* Contenedor de la gráfica de Recharts */}
        <div style={{ width: '100%', flex: '1 1 300px', height: '550px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={displayData.assets}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={110}
                paddingAngle={4}
                dataKey="percentage"
                nameKey="name"
              >
                {displayData.assets.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Lista de Activos, Pesos y Explicación */}
        <div style={{ flex: '1 1 550px' }}>
          <h4 style={{ color: '#334155', marginBottom: '1rem', fontSize: '0.1rem' }}>Resumen de Activos</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {displayData.assets.map((asset, index) => (
              <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                <div style={{ width: '16px', height: '16px', borderRadius: '4px', backgroundColor: COLORS[index % COLORS.length], flexShrink: 0, marginTop: '4px' }}></div>
                <div>
                  <div style={{ fontWeight: 'bold', color: '#0f172a', fontSize: '1.1rem' }}>
                    {asset.name} <span style={{ color: '#2563eb' }}>({asset.percentage}%)</span>
                  </div>
                  <div style={{ fontSize: '0.95rem', color: '#475569', margin: '4px 0' }}>
                    <strong>Monto sugerido:</strong> ${asset.amount.toLocaleString()} USD
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.4' }}>
                    {asset.reason}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};