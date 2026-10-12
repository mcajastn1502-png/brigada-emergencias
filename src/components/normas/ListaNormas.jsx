import { useState, useMemo } from 'react';
import { NORMAS, CATEGORIAS_NORMAS } from '@/lib/constants';

/**
 * Lista de normas legales con búsqueda, filtro por categoría y acordeones.
 */
export default function ListaNormas() {
  const [busqueda, setBusqueda] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('todas');
  const [abiertos, setAbiertos] = useState({});

  const toggle = (id) => {
    setAbiertos((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const normasFiltradas = useMemo(() => {
    const busq = busqueda.toLowerCase().trim();
    return NORMAS.filter((n) => {
      const coincideCategoria = filtroCategoria === 'todas' || n.categoria === filtroCategoria;
      const coincideBusqueda =
        !busq ||
        n.titulo.toLowerCase().includes(busq) ||
        n.detalle.toLowerCase().includes(busq) ||
        n.entidad.toLowerCase().includes(busq);
      return coincideCategoria && coincideBusqueda;
    });
  }, [busqueda, filtroCategoria]);

  // Contadores por categoría
  const contadores = useMemo(() => {
    const c = { total: NORMAS.length };
    NORMAS.forEach((n) => {
      c[n.categoria] = (c[n.categoria] || 0) + 1;
    });
    return c;
  }, []);

  const colorCategoria = {
    laboral: 'border-blue-500/50 bg-blue-500/5',
    seguridad: 'border-purple-500/50 bg-purple-500/5',
    emergencias: 'border-red-500/50 bg-red-500/5',
    tecnico: 'border-green-500/50 bg-green-500/5',
  };

  const badgeCategoria = {
    laboral: 'bg-blue-500',
    seguridad: 'bg-purple-500',
    emergencias: 'bg-red-500',
    tecnico: 'bg-green-500',
  };

  const iconoCategoria = {
    laboral: '⚖️',
    seguridad: '🛡️',
    emergencias: '🚨',
    tecnico: '🔧',
  };

  return (
    <div className="space-y-4">
      {/* Contadores */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {CATEGORIAS_NORMAS.map((cat) => {
          const valor = cat.value === 'todas' ? contadores.total : contadores[cat.value] || 0;
          const activo = filtroCategoria === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => setFiltroCategoria(cat.value)}
              className={`bg-[#1a2027] border rounded-lg p-3 text-center transition ${
                activo
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-[#2d3748] hover:border-blue-500/50'
              }`}
            >
              <div className="text-2xl font-bold text-white">{valor}</div>
              <div className="text-xs text-slate-400 mt-0.5">{cat.label}</div>
            </button>
          );
        })}
      </div>

      {/* Buscador */}
      <input
        type="text"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="🔍 Buscar norma por título, entidad o contenido..."
        className="w-full bg-[#0f1419] border border-[#2d3748] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
      />

      <div className="text-xs text-slate-400">
        Mostrando <strong className="text-white">{normasFiltradas.length}</strong> de{' '}
        <strong className="text-white">{NORMAS.length}</strong> normas
      </div>

      {/* Lista */}
      {normasFiltradas.length === 0 ? (
        <div className="bg-[#1a2027] border border-[#2d3748] rounded-lg p-8 text-center text-slate-400">
          No se encontraron normas con esos filtros
        </div>
      ) : (
        normasFiltradas.map((n) => {
          const abierto = abiertos[n.id];
          return (
            <div
              key={n.id}
              className={`bg-[#1a2027] border rounded-lg overflow-hidden ${
                colorCategoria[n.categoria] || 'border-[#2d3748]'
              }`}
            >
              <button
                onClick={() => toggle(n.id)}
                className="w-full flex justify-between items-center p-4 hover:bg-[#252d38]/50 transition text-left gap-3"
              >
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <span className="text-2xl flex-shrink-0 mt-0.5">
                    {iconoCategoria[n.categoria] || '📄'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-white text-sm md:text-base">{n.titulo}</span>
                      <span
                        className={`${
                          badgeCategoria[n.categoria] || 'bg-slate-500'
                        } text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase`}
                      >
                        {n.categoria}
                      </span>
                      {n.vigente && (
                        <span className="bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                          ✓ VIGENTE
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">🏛 {n.entidad}</div>
                  </div>
                </div>
                <span className="text-slate-400 text-lg flex-shrink-0">{abierto ? '▲' : '▼'}</span>
              </button>

              {abierto && (
                <div className="px-4 pb-4 pt-1">
                  <div className="text-sm text-slate-300 leading-relaxed border-l-2 border-slate-600 pl-3">
                    {n.detalle}
                  </div>
                </div>
              )}
            </div>
          );
        })
      )}

      {/* Nota al pie */}
      <div className="bg-yellow-500/5 border border-yellow-500/30 rounded-lg p-3 text-xs text-yellow-400">
        ⚠ Verifique siempre la vigencia y el texto completo de cada norma con la entidad oficial
        correspondiente. Esta lista es informativa y no sustituye asesoría legal.
      </div>
    </div>
  );
}
