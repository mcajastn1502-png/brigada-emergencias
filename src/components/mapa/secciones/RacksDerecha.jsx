/**
 * Racks Derecha — Zona derecha de la bodega
 * Contiene únicamente: estantería inclinada (zona morada)
 * Los racks R2101-R2108, PL y RE han sido removidos.
 * Rango SVG: x: 1150-1444, y: 280-750
 */
export default function RacksDerecha() {
  return (
    <g id="racks-derecha">
      {/* Fondo zona (sutil, punteado) */}
      <rect
        x="1150"
        y="280"
        width="294"
        height="480"
        fill="none"
        stroke="#334155"
        strokeWidth="1"
        strokeDasharray="4,4"
        opacity="0.3"
      />

      {/* Estantería inclinada (zona morada) */}
      <rect
        x="1405"
        y="400"
        width="30"
        height="280"
        fill="#3a2a4a"
        stroke="#7c3aed"
        strokeWidth="1.5"
        strokeDasharray="4,2"
      />
      <text
        x="1420"
        y="545"
        fill="#a78bfa"
        fontSize="8"
        textAnchor="middle"
        transform="rotate(90 1420 545)"
      >
        Estantería inclinada
      </text>
    </g>
  );
}
