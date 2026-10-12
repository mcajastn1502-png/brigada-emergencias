import { useState, useMemo } from 'react';

const CATEGORIAS = [
  { value: 'todas', label: 'Todas' },
  { value: 'incendio', label: '🔥 Incendio' },
  { value: 'rescate', label: '🧗 Rescate' },
  { value: 'derrame', label: '🧪 Derrame' },
  { value: 'accidente', label: '🩹 Accidente' },
];

const iconoCategoria = {
  incendio: '🔥',
  rescate: '🧗',
  derrame: '🧪',
  accidente: '🩹',
};

/**
 * @param {{ incidentes: any[], onEliminar: (id:number)=>void }} props
 */
export default function TablaHistorial({ incidentes, onEliminar }) {
  const [busqueda, setBusqueda] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('todas');
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [orden, setOrden] = useState('recientes');

  const filtrados = useMemo(() => {
    const busq = busqueda.toLowerCase().trim();
    let lista = incidentes.filter((i) => {
      const coincideCat = filtroCategoria === 'todas' || i.categoria === filtroCategoria;
      const coincideTipo =
        filtroTipo === 'todos' ||
        (filtroTipo === 'simulacro' && i.simulacro) ||
        (filtroTipo === 'real' && !i.simulacro);
      const coincideBusqueda =
        !busq ||
        (i.ubicacion || '').toLowerCase().includes(busq) ||
        (i.descripcion || '').toLowerCase().includes(busq);

      return coincideCat && coincideTipo && coincideBusqueda;
    });

    // Ordenamiento
    if (orden === 'recientes') {
      lista.sort((a, b) => new Date(b.inicio) - new Date(a.inicio));
    } else if (orden === 'antiguos') {
      lista.sort((a, b) => new Date(a.inicio) - new Date(b.inicio));
    } else if (orden === 'duracion') {
      lista.sort((a, b) => (b.duracion_seg || 0) - (a.duracion_seg || 0));
    }

    return lista;
  }, [incidentes, busqueda, filtroCategoria, filtroTipo, orden]);

  const exportarCSV = () => {
    const headers = [
      'ID',
      'Categoría',
      'Ubicación',
      'Descripción',
      'Inicio',
      'Fin',
      'Duración (seg)',
      'Simulacro',
    ];
    const rows = filtrados.map((i) => [
      i.id,
      i.categoria,
      `"${(i.ubicacion || '').replace(/"/g, '""')}"`,
      `"${(i.descripcion || '').replace(/"/g, '""')}"`,
      i.inicio,
      i.fin || '',
      i.duracion_seg || '',
      i.simulacro ? 'Sí' : 'No',
    ]);

    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `historial_incidentes_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatearDuracion = (seg) => {
    if (!seg) return '—';
    const h = String(Math.floor(seg / 3600)).padStart(2, '0');
    const m = String(Math.floor((seg % 3600) / 60)).padStart(2, '0');
    const s = String(seg % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const formatearFecha = (iso) => {
    if (!iso) return '—';
    const d = new Date(iso);
    return d.toLocaleString('es-EC', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-3">
      {/* Filtros */}
      <div className="flex flex-wrap gap-2">
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="🔍 Buscar por ubicación o descripción..."
          className="flex-1 min-w-[200px] bg-[#0f1419] border border-[#2d3748] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
        />

        <select
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
          className="bg-[#0f1419] border border-[#2d3748] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
        >
          {CATEGORIAS.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>

        <select
          value={filtroTipo}
          onChange={(e) => setFiltroTipo(e.target.value)}
          className="bg-[#0f1419] border border-[#2d3748] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
        >
          <option value="todos">Todos</option>
          <option value="real">🚨 Reales</option>
          <option value="simulacro">🧪 Simulacros</option>
        </select>

        <select
          value={orden}
          onChange={(e) => setOrden(e.target.value)}
          className="bg-[#0f1419] border border-[#2d3748] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
        >
          <option value="recientes">Más recientes</option>
          <option value="antiguos">Más antiguos</option>
          <option value="duracion">Mayor duración</option>
        </select>

        <button
          onClick={exportarCSV}
          disabled={filtrados.length === 0}
          className="px-3 py-2 rounded-lg bg-green-600 hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold transition"
        >
          ⬇️ Exportar CSV
        </button>
      </div>

      <div className="text-xs text-slate-400">
        Mostrando <strong className="text-white">{filtrados.length}</strong> de{' '}
        <strong className="text-white">{incidentes.length}</strong> incidentes
      </div>

      {/* Tabla */}
      {filtrados.length === 0 ? (
        <div className="bg-[#1a2027] border border-[#2d3748] rounded-lg p-8 text-center text-slate-400">
          No hay incidentes que coincidan con los filtros
        </div>
      ) : (
        <div className="bg-[#1a2027] border border-[#2d3748] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#0f1419] text-xs text-slate-400">
                <tr>
                  <th className="text-left px-3 py-2">Categoría</th>
                  <th className="text-left px-3 py-2">Ubicación</th>
                  <th className="text-left px-3 py-2">Inicio</th>
                  <th className="text-left px-3 py-2">Duración</th>
                  <th className="text-left px-3 py-2">Estado</th>
                  <th className="text-right px-3 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.map((i) => (
                  <tr
                    key={i.id}
                    className="border-t border-[#2d3748] hover:bg-[#252d38]/40 transition"
                  >
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{iconoCategoria[i.categoria] || '📋'}</span>
                        <span className="text-white font-bold text-xs uppercase">
                          {i.categoria}
                        </span>
                        {i.simulacro && (
                          <span className="bg-yellow-500 text-black text-[9px] font-bold px-1.5 py-0.5 rounded">
                            SIMULACRO
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="text-white text-xs">{i.ubicacion || '—'}</div>
                      {i.descripcion && (
                        <div className="text-slate-400 text-[10px] mt-0.5 truncate max-w-[200px]">
                          {i.descripcion}
                        </div>
                      )}
                    </td>
                    <td className="px-3 py-3 text-slate-300 text-xs">{formatearFecha(i.inicio)}</td>
                    <td className="px-3 py-3 text-yellow-400 font-mono text-xs">
                      {formatearDuracion(i.duracion_seg)}
                    </td>
                    <td className="px-3 py-3">
                      {i.fin ? (
                        <span className="bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                          ✅ CERRADO
                        </span>
                      ) : (
                        <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded animate-pulse">
                          🚨 ACTIVO
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-3 text-right">
                      {i.fin && (
                        <button
                          onClick={() => {
                            if (window.confirm('¿Eliminar este incidente del historial?')) {
                              onEliminar(i.id);
                            }
                          }}
                          className="px-2 py-1 rounded border border-red-500/50 text-red-400 hover:bg-red-500/10 text-xs transition"
                          title="Eliminar"
                        >
                          🗑️
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
