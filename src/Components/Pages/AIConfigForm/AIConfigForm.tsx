import { useState, useEffect, type FormEvent } from 'react';

// Interfaz para tipar los modelos que devuelve la API de Google Gemini
interface GeminiModel {
  name: string;
  displayName?: string;
  supportedGenerationMethods?: string[];
}

// Definimos los modelos de IA disponibles (puedes expandir esta lista)
const DEFAULT_AI_MODELS = [
  { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro' },
  { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash' },
  { id: 'gpt-4o', name: 'GPT-4o' },
  { id: 'claude-3-opus', name: 'Claude 3 Opus' },
];

export const AIConfigForm = () => {
  // Inicializamos el estado leyendo de LocalStorage, si existe. 
  // Usamos una función (lazy initialization) para que solo se ejecute en el primer render.
  const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem('apiKey') || '');
  const [models, setModels] = useState<{id: string, name: string}[]>(DEFAULT_AI_MODELS);
  const [selectedModel, setSelectedModel] = useState<string>(() => localStorage.getItem('selectedModel') || DEFAULT_AI_MODELS[0].id);
  const [isLoadingModels, setIsLoadingModels] = useState<boolean>(false);

  // Efecto para obtener los modelos de Gemini cuando cambia la API Key
  useEffect(() => {
    if (!apiKey) {
      setModels(DEFAULT_AI_MODELS);
      return;
    }
    const fetchModels = async () => {
      setIsLoadingModels(true);
      try {
        // Endpoint oficial de la API de Gemini para listar modelos
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        if (!response.ok) throw new Error('Error al obtener los modelos');
        
        const data = await response.json();
        
        // Filtramos para obtener solo modelos que soportan generación de contenido
        const fetchedModels = (data.models as GeminiModel[])
          .filter((m) => m.supportedGenerationMethods?.includes('generateContent'))
          .filter((m) => m.displayName?.toLowerCase().includes('pro') || m.displayName?.toLowerCase().includes('flash'))
          .map((m) => ({
            id: m.name.replace('models/', ''), // Limpiamos el prefijo 'models/'
            name: m.displayName || m.name.replace('models/', '')
          }));
          
        if (fetchedModels.length > 0) {
          setModels(fetchedModels);
          // Si el modelo seleccionado previamente no existe en la lista, seleccionamos el primero
          
          setSelectedModel(prev => fetchedModels.find((m) => m.id === prev) ? prev : fetchedModels[0].id);
        }
      } catch (error) {
        console.error('No se pudieron obtener los modelos. Revisa tu API Key.', error);
        setModels(DEFAULT_AI_MODELS);
      } finally {
        setIsLoadingModels(false);
      }
    };

    // Debounce de 800ms para no hacer peticiones continuas mientras el usuario escribe
    const timeoutId = setTimeout(fetchModels, 800);
    return () => clearTimeout(timeoutId);
  }, [apiKey]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Guardamos la configuración en LocalStorage
    localStorage.setItem('apiKey', apiKey);
    localStorage.setItem('selectedModel', selectedModel);

    console.log('Configuración guardada:', { apiKey, selectedModel });
    alert(`Configuración guardada exitosamente.\nModelo: ${selectedModel}`);
  };

  return (
    <div style={{ maxWidth: '450px', margin: '2rem auto', padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
      <h2 style={{ marginTop: 0, color: '#1f2937' }}>Configuración del cerebro IA</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="apiKey" style={{ fontWeight: 'bold' }}>API Key:</label>
          <input
            id="apiKey"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Introduce tu API Key"
            required
            style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem' }}
          />
          <a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer">
            Obtén tu API Key aquí
          </a>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="modelSelect" style={{ fontWeight: 'bold' }}>Modelo de IA:</label>
          <select
            id="modelSelect"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            disabled={isLoadingModels}
            style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc', fontSize: '1rem' }}
          >
            {isLoadingModels ? <option>Cargando modelos...</option> : models.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" style={{ padding: '0.75rem', backgroundColor: '#2563eb', color: '#FFF', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold', marginTop: '0.5rem' }}>
          Guardar Configuración
        </button>
      </form>
    </div>
  );
};
