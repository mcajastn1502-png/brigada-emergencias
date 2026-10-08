import { useState } from 'react';
import MarkerBrigadista from './MarkerBrigadista';
import MarkerSalida from './MarkerSalida';
import MarkerPuntoEncuentro from './MarkerPuntoEncuentro';
import ModalBrigadista from './ModalBrigadista';
import ZonaNorte from './secciones/ZonaNorte';
import Perchas from './secciones/Perchas';
import RacksCentrales from './secciones/RacksCentrales';
import RacksDerecha from './secciones/RacksDerecha';
import ZonaSur from './secciones/ZonaSur';
import Muelle from './secciones/Muelle';
import Exteriores from './secciones/Exteriores';

const CANVAS_W = 1500;
const CANVAS_H = 1000;

const SALIDAS = [
  { id: 'SE-1', nombre: 'Salida Mercancía', x: 80, y: 850 },
  { id: 'SE-2', nombre: 'Puerta Principal', x: 750, y: 955 },
  { id: 'SE-3', nombre: 'Salida Emergencia Superior Derecha', x: 1440, y: 400 },
];

const PUNTOS_ENCUENTRO = [
  { id: 'PE-1', nombre: 'Punto de Encuentro — Acceso Vehicular', x: 750, y: 985 },
];

export default function MapaBodega({ miembros, onToggleEstado }) {
  const [miembroSeleccionado, setMiembroSeleccionado] = useState(null);

  const handleToggleDesdeModal = (id) => {
    onToggleEstado(id);
    setMiembroSeleccionado(null);
  };

  return (
    <div className="relative">
      <svg
        width={CANVAS_W}
        height={CANVAS_H}
        viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
        preserveAspectRatio="xMidYMid meet"
        className="bg-[#1a2027] rounded-lg"
      >
        <rect x="0" y="0" width={CANVAS_W} height={CANVAS_H} fill="#1a2027" />
        <rect x="60" y="100" width="1384" height="770" fill="#0f1419" stroke="#4299e1" strokeWidth="3" />

        <text x={CANVAS_W / 2} y="80" fill="#64748b" fontSize="12" textAnchor="middle">
          ← 72,85 m →
        </text>

        <ZonaNorte />
        <Perchas />
        <RacksCentrales />
        <RacksDerecha />
        <ZonaSur />
        <Muelle />
        <Exteriores />

        {SALIDAS.map((s) => (
          <MarkerSalida key={s.id} salida={s} />
        ))}

        {PUNTOS_ENCUENTRO.map((p) => (
          <MarkerPuntoEncuentro key={p.id} punto={p} />
        ))}

        {miembros
          .filter((m) => m.activo)
          .map((m) => (
            <MarkerBrigadista
              key={m.id}
              miembro={m}
              onClick={() => setMiembroSeleccionado(m)}
            />
          ))}
      </svg>

      {miembroSeleccionado && (
        <ModalBrigadista
          miembro={miembroSeleccionado}
          onClose={() => setMiembroSeleccionado(null)}
          onToggle={() => handleToggleDesdeModal(miembroSeleccionado.id)}
        />
      )}
    </div>
  );
}