/**
 * Racks Centrales — Racks 13, 14, 15, 16, 17, 18, 19, 20, 21, 22
 * Rango SVG: x: 470-1130, y: 280-750
 * ⚠️ Zona de alto riesgo (racks con material almacenado)
 */
export default function RacksCentrales() {
  // Ancho y alto de cada slot dentro de un rack
  const slotW = 60;
  const slotH = 20;

  // Racks horizontales (filas)
  const racks = [
    {
      id: 'RACK 13',
      y: 300,
      slots: [
        'R1301',
        'R1302',
        'R1303',
        'R1304',
        'R1305',
        'R1306',
        'R1307',
        'R1308',
        'R1309',
        'R1310',
      ],
      xStart: 500,
      color: 'verde',
    },
    {
      id: 'RACK 14',
      y: 400,
      slots: ['R1401', 'R1402', 'R1403', 'R1404', 'R1405', 'R1406', 'R1407', 'R1408'],
      xStart: 540,
      color: 'verde',
      label: 'RACK 14',
    },
    {
      id: 'RACK 15',
      y: 430,
      slots: ['R1501', 'R1502', 'R1503', 'R1504', 'R1505', 'R1506', 'R1507', 'R1508'],
      xStart: 540,
      color: 'verde',
      label: 'RACK 15',
    },
    {
      id: 'RACK 16',
      y: 550,
      slots: ['R1601', 'R1602', 'R1603', 'R1604', 'R1605', 'R1606', 'R1607', 'R1608'],
      xStart: 540,
      color: 'verde',
      label: 'RACK 16',
    },
    {
      id: 'RACK 17',
      y: 580,
      slots: ['R1701', 'R1702', 'R1703', 'R1704', 'R1705', 'R1706', 'R1707', 'R1708'],
      xStart: 540,
      color: 'verde',
      label: 'RACK 17',
    },
    {
      id: 'RACK 18',
      y: 700,
      slots: ['R1801', 'R1802', 'R1803', 'R1804'],
      xStart: 600,
      color: 'verde',
      label: 'RACK 18',
    },
    {
      id: 'RACK 19',
      y: 730,
      slots: ['R1901', 'R1902', 'R1903', 'R1904'],
      xStart: 600,
      color: 'verde',
      label: 'RACK 19',
    },
    {
      id: 'RACK 20',
      y: 700,
      slots: ['R2001', 'R2002', 'R2003', 'R2004'],
      xStart: 830,
      color: 'verde',
      label: 'RACK 20',
    },
  ];

  // Rack 22 (pequeño, izquierda)
  const rack22 = {
    x: 470,
    y: 470,
    slots: ['R2201', 'R2202'],
  };

  return (
    <g id="racks-centrales">
      {/* Fondo zona con alerta roja suave */}
      <rect
        x="460"
        y="280"
        width="680"
        height="480"
        fill="#2a1f1f"
        stroke="#ef4444"
        strokeWidth="2"
      />

      {/* Título */}
      <text x="800" y="295" fill="#ef4444" fontSize="11" fontWeight="700" textAnchor="middle">
        ⚠ RACKS CENTRALES (ALTO RIESGO)
      </text>

      {/* Racks horizontales */}
      {racks.map((rack) => (
        <g key={rack.id}>
          {/* Etiqueta a la izquierda del rack */}
          {rack.label && (
            <text x={rack.xStart - 10} y={rack.y + 13} fill="#94a3b8" fontSize="8" textAnchor="end">
              {rack.label}
            </text>
          )}

          {/* Slots */}
          {rack.slots.map((slot, i) => (
            <g key={slot}>
              <rect
                x={rack.xStart + i * slotW}
                y={rack.y}
                width={slotW - 2}
                height={slotH}
                fill="#166534"
                stroke="#22c55e"
                strokeWidth="0.8"
              />
              <text
                x={rack.xStart + i * slotW + slotW / 2 - 1}
                y={rack.y + 13}
                fill="#dcfce7"
                fontSize="7"
                textAnchor="middle"
              >
                {slot}
              </text>
            </g>
          ))}
        </g>
      ))}

      {/* Rack 22 (vertical pequeño) */}
      <text x={rack22.x - 5} y={rack22.y + 15} fill="#94a3b8" fontSize="8" textAnchor="end">
        RACK 22
      </text>
      {rack22.slots.map((slot, i) => (
        <g key={slot}>
          <rect
            x={rack22.x}
            y={rack22.y + i * (slotH + 2)}
            width={100}
            height={slotH}
            fill="#166534"
            stroke="#22c55e"
            strokeWidth="0.8"
          />
          <text
            x={rack22.x + 50}
            y={rack22.y + i * (slotH + 2) + 13}
            fill="#dcfce7"
            fontSize="7"
            textAnchor="middle"
          >
            {slot}
          </text>
        </g>
      ))}

      {/* Zonas beige (espacios libres entre racks) */}
      <rect
        x="560"
        y="455"
        width="350"
        height="80"
        fill="#3a2a1a"
        stroke="#57534e"
        strokeWidth="0.5"
        strokeDasharray="3,3"
        opacity="0.4"
      />
      <rect
        x="560"
        y="605"
        width="350"
        height="80"
        fill="#3a2a1a"
        stroke="#57534e"
        strokeWidth="0.5"
        strokeDasharray="3,3"
        opacity="0.4"
      />
      <rect
        x="600"
        y="460"
        width="200"
        height="80"
        fill="#3a2a1a"
        stroke="#57534e"
        strokeWidth="0.5"
        strokeDasharray="3,3"
        opacity="0.4"
      />
    </g>
  );
}
