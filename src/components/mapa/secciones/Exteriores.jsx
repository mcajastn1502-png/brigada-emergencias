/**
 * Exteriores — Zonas verdes A/B/C, calle de los Arupos, puerta principal
 * Rango SVG: x: 0-1500, y: 970-1000
 */
export default function Exteriores() {
  return (
    <g id="exteriores">
      {/* Zona A (patio arriba-derecha) */}
      <rect
        x="40"
        y="100"
        width="15"
        height="60"
        fill="#4ade80"
        opacity="0.3"
        stroke="#22c55e"
        strokeWidth="0.5"
      />
      <text x="47" y="135" fill="#22c55e" fontSize="7" textAnchor="middle" fontWeight="700">
        A
      </text>

      {/* Zona B (patio abajo-izquierda, lateral) */}
      <rect
        x="40"
        y="300"
        width="15"
        height="400"
        fill="#4ade80"
        opacity="0.3"
        stroke="#22c55e"
        strokeWidth="0.5"
      />
      <text
        x="47"
        y="500"
        fill="#22c55e"
        fontSize="7"
        textAnchor="middle"
        fontWeight="700"
        transform="rotate(-90 47 500)"
      >
        ZONA B · EXT03
      </text>

      {/* Zona C (patio derecha, franja larga) */}
      <rect
        x="1450"
        y="200"
        width="15"
        height="500"
        fill="#4ade80"
        opacity="0.3"
        stroke="#22c55e"
        strokeWidth="0.5"
      />
      <text
        x="1457"
        y="450"
        fill="#22c55e"
        fontSize="7"
        textAnchor="middle"
        fontWeight="700"
        transform="rotate(90 1457 450)"
      >
        ZONA C
      </text>

      {/* Calle de los Arupos */}
      <rect
        x="0"
        y="970"
        width="1500"
        height="30"
        fill="#0f1419"
        stroke="#334155"
        strokeWidth="1.5"
      />
      <text x="750" y="990" fill="#64748b" fontSize="11" fontWeight="700" textAnchor="middle">
        CALLE DE LOS ARUPOS
      </text>

      {/* Puerta principal de acceso (SE-2) */}
      <polygon points="750,960 735,940 765,940" fill="#22c55e" opacity="0.9" />

      {/* Etiqueta dimensiones ancho */}
      <text x="750" y="80" fill="#64748b" fontSize="11" textAnchor="middle">
        ← 72,85 m →
      </text>
    </g>
  );
}
