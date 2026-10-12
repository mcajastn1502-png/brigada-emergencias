import { useState, useMemo } from 'react';
import { PROTOCOLOS } from '@/lib/constants';

/**
 * Lista completa de protocolos con búsqueda, filtro y acordeones.
 */
export default function ListaProtocolos() {
  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState('todos');
  const [abiertos, setAbiertos] = useState({ incendio: true });

  const toggle = (id) => {
    setAbiertos((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const todosAbiertos = PROTOCOLOS.every((p) => abiertos[p.id]);

  const toggleTodos = () => {
    const nuevo = {};
    PROTOCOLOS.forEach((p) => {
      nuevo[p.id] = !todosAbiertos;
    });
    setAbiertos(nuevo);
  };

  const protocolosFiltrados = useMemo(() => {
    return PROTOCOLOS.filter((p) => {
      const coincideFiltro = filtro === 'todos' || p.categoria === filtro;
      const busq = busqueda.toLowerCase().trim();
      const coincideBusqueda =
        !busq ||
        p.titulo.toLowerCase().includes(busq) ||
        p.pasos.some((paso) => paso.txt.toLowerCase().includes(busq));
      return coincideFiltro && coincideBusqueda;
    });
  }, [busqueda, filtro]);

  const imprimir = () => {
    window.print();
  };

  return (
    <div className="space-y-4">
      {/* Controles */}
      <div className="flex flex-wrap gap-2 items-center">
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="🔍 Buscar en protocolos..."
          className="flex-1 min-w-[200px] bg-[#0f1419] border border-[#2d3748] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
        />

        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="bg-[#0f1419] border border-[#2d3748] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
        >
          <option value="todos">Todos</option>
          <option value="incendio">🔥 Incendio</option>
          <option value="rescate">🧗 Rescate</option>
          <option value="derrame">🧪 Derrame</option>
          <option value="accidente">🩹 Accidente</option>
        </select>

        <button
          onClick={toggleTodos}
          className="px-3 py-2 rounded-lg border border-[#2d3748] text-slate-300 hover:bg-[#252d38] text-xs transition"
          title={todosAbiertos ? 'Cerrar todos' : 'Abrir todos'}
        >
          {todosAbiertos ? '▲ Cerrar' : '▼ Abrir'} todos
        </button>

        <button
          onClick={imprimir}
          className="px-3 py-2 rounded-lg border border-[#2d3748] text-slate-300 hover:bg-[#252d38] text-xs transition"
          title="Imprimir protocolos"
        >
          🖨️ Imprimir
        </button>
      </div>

      {/* Contador */}
      <div className="text-xs text-slate-400">
        Mostrando <strong className="text-white">{protocolosFiltrados.length}</strong> de{' '}
        <strong className="text-white">{PROTOCOLOS.length}</strong> protocolos
      </div>

      {/* Lista */}
      {protocolosFiltrados.length === 0 ? (
        <div className="bg-[#1a2027] border border-[#2d3748] rounded-lg p-8 text-center text-slate-400">
          No se encontraron protocolos con esos filtros
        </div>
      ) : (
        protocolosFiltrados.map((p) => {
          const abierto = abiertos[p.id];
          const pasosUrgentes = p.pasos.filter((paso) => paso.urgente).length;

          return (
            <div
              key={p.id}
              className="bg-[#1a2027] border border-[#2d3748] rounded-lg overflow-hidden"
            >
              {/* Header del protocolo */}
              <button
                onClick={() => toggle(p.id)}
                className="w-full flex justify-between items-center p-4 hover:bg-[#252d38] transition text-left gap-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-white text-sm md:text-base">{p.titulo}</div>
                  <div className="text-xs text-slate-400 mt-1 flex gap-3 flex-wrap">
                    <span>📋 {p.pasos.length} pasos</span>
                    {pasosUrgentes > 0 && (
                      <span className="text-red-400">⚠ {pasosUrgentes} críticos</span>
                    )}
                  </div>
                </div>
                <span className="text-slate-400 text-lg flex-shrink-0">{abierto ? '▲' : '▼'}</span>
              </button>

              {/* Pasos */}
              {abierto && (
                <div className="px-4 pb-4 space-y-2">
                  {p.pasos.map((paso) => (
                    <div
                      key={paso.n}
                      className={`flex gap-3 py-3 border-b border-[#2d3748]/50 last:border-0 ${
                        paso.urgente ? 'bg-red-500/5 -mx-4 px-4 rounded' : ''
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold text-white ${
                          paso.urgente ? 'bg-red-500' : 'bg-blue-500'
                        }`}
                      >
                        {paso.n}
                      </div>
                      <div className="flex-1 pt-0.5">
                        <div className="text-sm text-slate-200 leading-relaxed">{paso.txt}</div>
                        {paso.urgente && (
                          <div className="text-red-400 text-xs font-bold mt-1.5">
                            ⚠ PASO CRÍTICO
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}