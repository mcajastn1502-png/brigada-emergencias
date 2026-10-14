import { useRef, useEffect } from 'react';

/**
 * @param {{ activo:string, onChange:(t:string)=>void, rol:string }} props
 */
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

  const scrollRef = useRef(null);
  const activeRef = useRef(null);

  // Auto-scroll hacia el tab activo
  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const tab = activeRef.current;
      const container = scrollRef.current;
      const tabLeft = tab.offsetLeft;
      const tabWidth = tab.offsetWidth;
      const containerWidth = container.offsetWidth;
      const targetScroll = tabLeft - containerWidth / 2 + tabWidth / 2;

      container.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: 'smooth',
      });
    }
  }, [activo]);

  return (
    <nav
      ref={scrollRef}
      className="bg-panel border-b border-borderDark flex overflow-x-auto px-1 md:px-2 gap-0.5 md:gap-1 scrollbar-hide"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      {tabs.map((t) => {
        const bloqueado = t.lock && rol !== t.lock;
        const esActivo = activo === t.id;
        return (
          <button
            key={t.id}
            ref={esActivo ? activeRef : null}
            disabled={bloqueado}
            onClick={() => !bloqueado && onChange(t.id)}
            className={`px-3 md:px-4 py-2.5 md:py-3 text-xs md:text-sm font-medium whitespace-nowrap border-b-[3px] transition flex-shrink-0 ${
              esActivo
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
