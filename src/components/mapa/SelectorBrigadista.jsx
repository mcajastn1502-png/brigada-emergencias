import { useState } from 'react';

/**
 * Modal para que el brigadista elija su nombre antes de compartir ubicación
 */
export default function SelectorBrigadista({ miembros, onSeleccionar, onCerrar }) {
  const [busqueda, setBusqueda] = useState('');

  const filtrados = miembros.filter(
    (m) => m.activo && m.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const colores = {
    emergencia: 'bg-red-500',
    rescatista: 'bg-teal-500',
    incendios: 'bg-orange-500',
  };

  const iconos = {
    emergencia: '🚑',
    rescatista: '🧗',
    incendios: '🔥',
  };

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center p-4"
      onClick={onCerrar}
    >
      <div
        className="bg-[#1a2027] border border-[#2d3748] rounded-xl w-full max-w-md max-h-[90vh] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-[#2d3748] flex justify-between items-center">
          <div>
            <h2 className="text-white font-bold">¿Quién eres?</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Selecciona tu nombre para compartir ubicación
            </p>
          </div>
          <button
            onClick={onCerrar}
            className="text-slate-400 hover:text-white text-2xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Buscador */}
        <div className="p-3 border-b border-[#2d3748]">
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="🔍 Buscar mi nombre..."
            autoFocus
            className="w-full bg-[#0f1419] border border-[#2d3748] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Lista */}
        <div className="flex-1 overflow-y-auto">
          {filtrados.length === 0 ? (
            <div className="p-6 text-center text-slate-400 text-sm">
              No se encontraron brigadistas
            </div>
          ) : (
            filtrados.map((m) => (
              <button
                key={m.id}
                onClick={() => onSeleccionar(m)}
                className="w-full flex items-center gap-3 p-3 border-b border-[#2d3748]/50 hover:bg-[#252d38] transition text-left"
              >
                <div
                  className={`w-10 h-10 rounded-full ${colores[m.rol]} border-2 border-white flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                >
                  {m.iniciales}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-bold truncate">{m.nombre}</div>
                  <div className="text-xs text-slate-400">
                    {iconos[m.rol]} {m.rol}
                  </div>
                </div>
                <div className="text-slate-400 text-lg">→</div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}