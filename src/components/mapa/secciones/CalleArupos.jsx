/**
 * Zona exterior — Andén, acceso vehicular, Calle de los Arupos (abajo)
 * Rango: x: 0-1400, y: 2600-2800
 */
export default function CalleArupos() {
  return (
    <g id="calle-arupos">
      <rect x="60" y="2620" width="1280" height="80" fill="#1a2027" stroke="#4a5568" strokeDasharray="4,4" />
      <text x="700" y="2660" fill="#64748b" fontSize="16" textAnchor="middle">
        ANDÉN · ACCESO VEHICULAR
      </text>

      <polygon points="700,2690 680,2670 720,2670" fill="#22c55e" opacity="0.9" />

      <rect x="0" y="2720" width="1400" height="60" fill="#0f1419" stroke="#334155" strokeWidth="2" />
      <text x="700" y="2758" fill="#64748b" fontSize="18" fontWeight="700" textAnchor="middle">
        CALLE DE LOS ARUPOS
      </text>
    </g>
  );
}