/**
 * Zona Racks Bajos + laterales — Racks PC, PX, PR, PG, BX, BR, KX, P (izquierda)
 * Rango: x: 60-300, y: 530-2200
 */
export default function ZonaRacksBajos() {
  const racksIzq = [
    { id: 'KX', y: 550, height: 80 },
    { id: 'BR', y: 650, height: 80 },
    { id: 'PC', y: 750, height: 350 },
    { id: 'PX', y: 1120, height: 350 },
    { id: 'PR', y: 1490, height: 250 },
    { id: 'PG', y: 1760, height: 250 },
  ];

  return (
    <g id="zona-racks-bajos">
      <rect x="60" y="530" width="240" height="1670" fill="#252d38" stroke="#334155" strokeWidth="2" />

      <text
        x="180"
        y="800"
        fill="#94a3b8"
        fontSize="16"
        fontWeight="700"
        textAnchor="middle"
        transform="rotate(-90 180 800)"
      >
        RACKS LATERALES IZQ
      </text>

      {racksIzq.map((rack) => (
        <g key={rack.id}>
          <rect
            x="80"
            y={rack.y}
            width="200"
            height={rack.height}
            fill="#2d3748"
            stroke="#4a5568"
            strokeWidth="1.5"
          />
          {Array.from({ length: Math.floor(rack.height / 40) }).map((_, i) => (
            <line
              key={i}
              x1="85"
              y1={rack.y + 20 + i * 40}
              x2="275"
              y2={rack.y + 20 + i * 40}
              stroke="#4a5568"
              strokeWidth="1"
              strokeDasharray="2,2"
            />
          ))}
          <text
            x="180"
            y={rack.y + rack.height / 2 + 5}
            fill="#94a3b8"
            fontSize="14"
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