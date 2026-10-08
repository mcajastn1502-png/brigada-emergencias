import MarkerBrigadista from './MarkerBrigadista';
import MarkerSalida from './MarkerSalida';
import MarkerPuntoEncuentro from './MarkerPuntoEncuentro';
import ZonaNorte from './secciones/ZonaNorte';
import Perchas from './secciones/Perchas';
import RacksCentrales from './secciones/RacksCentrales';
import RacksDerecha from './secciones/RacksDerecha';
import ZonaSur from './secciones/ZonaSur';
import Muelle from './secciones/Muelle';
import Exteriores from './secciones/Exteriores';

/**
 * Canvas SVG: 1500 × 1000 px
 * Bodega: x 60-1444 (1384 px = 72,85 m) · y 100-870 (770 px = 36,70 m)
 * Escala: 1 m = 19 px
 */
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
  return (
    <div className="relative">
      <svg
        width={CANVAS_W}
        height={CANVAS_H}
        viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
        preserveAspectRatio="xMidYMid meet"
        className="bg-[#1a2027] rounded-lg"
      >
        {/* Fondo general */}
        <rect x="0" y="0" width={CANVAS_W} height={CANVAS_H} fill="#1a2027" />

        {/* Perímetro de la bodega */}
        <rect
          x="60"
          y="100"
          width="1384"
          height="770"
          fill="#0f1419"
          stroke="#4299e1"
          strokeWidth="3"
        />

        {/* Etiquetas de dimensiones */}
        <text x={CANVAS_W / 2} y="80" fill="#64748b" fontSize="12" textAnchor="middle">
          ← 72,85 m →
        </text>
        <text
          x="1480"
          y={CANVAS_H / 2}
          fill="#64748b"
          fontSize="12"
          textAnchor="middle"
          transform={`rotate(90 1480 ${CANVAS_H / 2})`}
        >
          ← 36,70 m →
        </text>

        {/* ============ SECCIONES DEL PLANO ============ */}
        <ZonaNorte />
        <Perchas />
        <RacksCentrales />
        <RacksDerecha />
        <ZonaSur />
        <Muelle />
        <Exteriores />

        {/* ============ MARKERS ============ */}
        {SALIDAS.map((s) => (
          <MarkerSalida key={s.id} salida={s} />
        ))}

        {PUNTOS_ENCUENTRO.map((p) => (
          <MarkerPuntoEncuentro key={p.id} punto={p} />
        ))}

        {/* Brigadistas — renderizados dentro del SVG para que escalen con el zoom */}
        {miembros
          .filter((m) => m.activo)
          .map((m) => (
            <MarkerBrigadista
              key={m.id}
              miembro={m}
              onToggle={() => onToggleEstado(m.id)}
              dentroSVG
            />
          ))}
      </svg>
    </div>
  );
}
