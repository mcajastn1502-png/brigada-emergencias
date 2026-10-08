import { useState } from 'react';
import { useMiembros } from '@/hooks/useMiembros';
import MapaBodega from '@/components/mapa/MapaBodega';
import Leyenda from '@/components/mapa/Leyenda';

export default function MapaPage() {
  const { miembros, loading, toggleEstado } = useMiembros();
  const [zoom, setZoom] = useState(0.65); // 65% por defecto para ver casi todo

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center text-slate-400">Cargando mapa...</div>
    );
  }

  return (
    <div className="relative w-full h-full bg-[#1e2530] overflow-auto">
      {/* Contenedor escalable */}
      <div className="min-h-full flex justify-center p-4">
        <div
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'top center',
            transition: 'transform 0.2s',
          }}
        >
          <MapaBodega miembros={miembros} onToggleEstado={toggleEstado} />
        </div>
      </div>

      {/* Leyenda flotante */}
      <div className="fixed bottom-4 left-4 z-50">
        <Leyenda />
      </div>

      {/* Controles de zoom */}
      <div className="fixed top-32 right-4 z-50 flex flex-col gap-2">
        <button
          onClick={() => setZoom((z) => Math.min(z + 0.1, 1.5))}
          className="w-10 h-10 rounded-lg bg-[#1a2027] border border-[#2d3748] text-white font-bold hover:bg-[#252d38] transition"
          title="Acercar"
        >
          +
        </button>
        <button
          onClick={() => setZoom((z) => Math.max(z - 0.1, 0.3))}
          className="w-10 h-10 rounded-lg bg-[#1a2027] border border-[#2d3748] text-white font-bold hover:bg-[#252d38] transition"
          title="Alejar"
        >
          −
        </button>
        <button
          onClick={() => setZoom(0.65)}
          className="w-10 h-10 rounded-lg bg-[#1a2027] border border-[#2d3748] text-white text-xs hover:bg-[#252d38] transition"
          title="Restablecer zoom"
        >
          ⌂
        </button>
        <div className="text-center text-white text-[10px] bg-[#1a2027] border border-[#2d3748] rounded-lg py-1 font-mono">
          {Math.round(zoom * 100)}%
        </div>
      </div>

      {/* Contador dentro/fuera */}
      <div className="fixed top-4 right-4 z-50 bg-[#1a2027]/95 border border-[#2d3748] rounded-lg p-3 text-xs backdrop-blur-sm">
        <div className="flex items-center gap-4 text-slate-300">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            <span>
              <strong className="text-white">
                {miembros.filter((m) => m.estado === 'dentro').length}
              </strong>{' '}
              dentro
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <span>
              <strong className="text-white">
                {miembros.filter((m) => m.estado === 'alrededores').length}
              </strong>{' '}
              fuera
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
