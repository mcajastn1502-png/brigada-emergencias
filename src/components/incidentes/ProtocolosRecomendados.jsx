import { useState } from 'react';
import { PROTOCOLOS } from '@/lib/constants';

/**
 * @param {{ categoria: string }} props
 */
export default function ProtocolosRecomendados({ categoria }) {
  const [abiertos, setAbiertos] = useState({ [categoria]: true });

  const protocolosFiltrados = categoria
    ? PROTOCOLOS.filter((p) => p.categoria === categoria)
    : PROTOCOLOS;

  const toggle = (id) => {
    setAbiertos((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (protocolosFiltrados.length === 0) {
    return <div className="text-slate-400 text-sm p-4">Sin protocolo específico</div>;
  }

  return (
    <div className="space-y-3">
      {protocolosFiltrados.map((p) => {
        const abierto = abiertos[p.id];
        return (
          <div
            key={p.id}
            className="bg-[#1a2027] border border-[#2d3748] rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggle(p.id)}
              className="w-full flex justify-between items-center p-4 hover:bg-[#252d38] transition text-left"
            >
              <span className="font-bold text-white text-sm">{p.titulo}</span>
              <span className="text-slate-400 text-lg">{abierto ? '▲' : '▼'}</span>
            </button>

            {abierto && (
              <div className="px-4 pb-4 space-y-2">
                {p.pasos.map((paso) => (
                  <div
                    key={paso.n}
                    className="flex gap-3 py-2 border-b border-[#2d3748]/50 last:border-0"
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white ${
                        paso.urgente ? 'bg-red-500' : 'bg-blue-500'
                      }`}
                    >
                      {paso.n}
                    </div>
                    <div className="text-sm text-slate-300 leading-relaxed pt-1">{paso.txt}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}