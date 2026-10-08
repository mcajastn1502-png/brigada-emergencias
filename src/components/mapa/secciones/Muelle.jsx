/**
 * Muelle — Acceso vehicular, andén, muelle de carga (Sur)
 * Rango SVG: x: 60-1444, y: 880-940
 */
export default function Muelle() {
  // Bloques grises del muelle (topes/barandas)
  const bloquesMuelle = [
    { x: 150 }, { x: 320 }, { x: 490 }, { x: 660 },
    { x: 830 }, { x: 1000 }, { x: 1170 }, { x: 1340 },
  ];

  return (
    <g id="muelle">
      {/* Fondo andén/muelle */}
      <rect x="60" y="880" width="1384" height="60" fill="#1a2027" stroke="#4a5568" strokeWidth="1.5" strokeDasharray="4,4" />

      {/* Texto del muelle */}
      <text x="200" y="905" fill="#64748b" fontSize="10" textAnchor="middle" fontWeight="700">
        VEHICULAR · SALIDA MERCANCÍA
      </text>

      {/* Bloques grises (topes del muelle) */}
      {bloquesMuelle.map((b, i) => (
        <rect key={i} x={b.x} y={875} width="40" height="10" fill="#4a5568" stroke="#2d3748" strokeWidth="0.5" />
      ))}

      {/* Franja verde larga (anden principal) */}
      <rect x="60" y="945" width="1384" height="25" fill="#4ade80" stroke="#22c55e" strokeWidth="1" opacity="0.35" />

      {/* Salida mercancía (puerta izquierda) */}
      <rect x="60" y="880" width="30" height="60" fill="#22c55e" opacity="0.4" />
      <text x="75" y="915" fill="#dcfce7" fontSize="8" textAnchor="middle" fontWeight="700">
        SE-1
      </text>
    </g>
  );
}