/** @param {{ activo:string, onChange:(t:string)=>void, rol:string }} props */
export default function NavTabs({ activo, onChange, rol }) {
  const tabs = [
    { id: 'mapa', label: '🗺️ Mapa en vivo' },
    { id: 'personal', label: '👥 Personal' },
    { id: 'incidentes', label: '🚨 Incidentes' },
    { id: 'protocolos', label: '📋 Protocolos' },
    { id: 'primeros', label: '🩹 Primeros Auxilios' },
    { id: 'normas', label: '⚖️ Normas' },
    { id: 'miembros', label: '🪪 Miembros', lock: 'coordinador' },
    { id: 'historial', label: '📁 Historial', lock: 'coordinador' },
    { id: 'ayuda', label: '❓ Ayuda / Demo' },
  ];

  return (
    <nav className="bg-panel border-b border-borderDark flex overflow-x-auto px-2 gap-1">
      {tabs.map((t) => {
        const bloqueado = t.lock && rol !== t.lock;
        return (
          <button
            key={t.id}
            disabled={bloqueado}
            onClick={() => !bloqueado && onChange(t.id)}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-[3px] transition ${
              activo === t.id
                ? 'text-white border-emergencia'
                : 'text-slate-400 border-transparent hover:text-white'
            } ${bloqueado ? 'opacity-40 cursor-not-allowed' : ''}`}
          >
            {t.label}
          </button>
        );
      })}
    </nav>
  );
}