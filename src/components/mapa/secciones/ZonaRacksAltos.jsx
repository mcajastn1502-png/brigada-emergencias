/**
 * Zona Racks Altos — Racks principales 14-23 (centro)
 * Rango: x: 300-1000, y: 530-2200
 * ⚠️ ZONA DE ALTO RIESGO
 */
export default function ZonaRacksAltos() {
  const racks = [
    { id: '14-15', x: 340 },
    { id: '16-17', x: 490 },
    { id: '18-19', x: 640 },
    { id: '20-21', x: 790 },
    { id: '22-23', x: 940 },
  ];

  return (
    <g id="zona-racks-altos">
      <rect x="300" y="530" width="700" height="1670" fill="#2a1f1f" stroke="#ef4444" strokeWidth="2" />

      <text x="650" y="570" fill="#ef4444" fontSize="22" fontWeight="700" textAnchor="middle">
        ⚠ ZONA 3 · RACKS ALTOS (ALTO RIESGO)
      </text>

      {racks.map((rack) => (
        <g key={rack.id}>
          <rect
            x={rack.x}
            y={600}
            width="100"
            height="1550"
            fill="#2d3748"
            stroke="#4a5568"
            strokeWidth="2"
          />

          {Array.from({ length: 18 }).map((_, i) => (
            <line
              key={i}
              x1={rack.x + 5}
              y1={640 + i * 82}
              x2={rack.x + 95}
              y2={640 + i * 82}
              stroke="#4a5568"
              strokeWidth="1"
              strokeDasharray="3,3"
            />
          ))}

          <rect x={rack.x} y={2160} width="100" height="30" fill="#1a2027" stroke="#4a5568" />
          <text
            x={rack.x + 50}
            y={2182}
            fill="#f87171"
            fontSize="13"
            fontWeight="700"
            textAnchor="middle"
          >
            {rack.id}
          </text>
        </g>
      ))}
    </g>
  );
}