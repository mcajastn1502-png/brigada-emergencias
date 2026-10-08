/**
 * Perchas — 8 filas horizontales de perchas a la izquierda
 * Rango SVG: x: 60-450, y: 280-750
 * Cada fila: 11 slots (P0X11 → P0X01)
 */
export default function Perchas() {
  const filas = [
    {
      id: 'P1111',
      y: 290,
      slots: [
        'P1111',
        'P1110',
        'P1109',
        'P1108',
        'P1107',
        'P1106',
        'P1105',
        'P1104',
        'P1103',
        'P1102',
        'P1101',
      ],
      alt: 3,
    },
    {
      id: 'P1011',
      y: 350,
      slots: [
        'P1011',
        'P1010',
        'P1009',
        'P1008',
        'P1007',
        'P1006',
        'P1005',
        'P1004',
        'P1003',
        'P1002',
        'P1001',
      ],
      alt: null,
    },
    {
      id: 'P0911',
      y: 410,
      slots: [
        'P0911',
        'P0910',
        'P0909',
        'P0908',
        'P0907',
        'P0906',
        'P0905',
        'P0904',
        'P0903',
        'P0902',
        'P0901',
      ],
      alt: 7,
    },
    {
      id: 'P0811',
      y: 470,
      slots: [
        'P0811',
        'P0810',
        'P0809',
        'P0808',
        'P0807',
        'P0806',
        'P0805',
        'P0804',
        'P0803',
        'P0802',
        'P0801',
      ],
      alt: null,
    },
    {
      id: 'P0711',
      y: 530,
      slots: [
        'P0711',
        'P0710',
        'P0709',
        'P0708',
        'P0707',
        'P0706',
        'P0705',
        'P0704',
        'P0703',
        'P0702',
        'P0701',
      ],
      alt: null,
    },
    {
      id: 'P0611',
      y: 590,
      slots: [
        'P0611',
        'P0610',
        'P0609',
        'P0608',
        'P0607',
        'P0606',
        'P0605',
        'P0604',
        'P0603',
        'P0602',
        'P0601',
      ],
      alt: 4,
    },
    {
      id: 'P0511',
      y: 650,
      slots: [
        'P0511',
        'P0510',
        'P0509',
        'P0508',
        'P0507',
        'P0506',
        'P0505',
        'P0504',
        'P0503',
        'P0502',
        'P0501',
      ],
      alt: 2,
    },
  ];

  const filaUltima = {
    slots: [
      'P0111',
      'P0110',
      'P0109',
      'P0108',
      'P0107',
      'P0106',
      'P0105',
      'P0104',
      'P0103',
      'P0102',
      'P0101',
    ],
    jsp: ['JSP01', 'JSP02', 'JSP03', 'JSP04', 'JSP05'],
    alt: 4,
  };

  const slotW = 32; // ancho de cada slot
  const slotH = 20; // alto de cada slot
  const inicioX = 90;

  return (
    <g id="perchas">
      {/* Fondo zona perchas */}
      <rect
        x="60"
        y="280"
        width="390"
        height="470"
        fill="#1a2027"
        stroke="#334155"
        strokeWidth="1.5"
      />
      <text x="255" y="275" fill="#94a3b8" fontSize="11" fontWeight="700" textAnchor="middle">
        PERCHAS
      </text>

      {/* Filas de perchas */}
      {filas.map((fila, fi) => (
        <g key={fila.id}>
          {/* Etiqueta izquierda (nombre de la fila) */}
          <text x="85" y={fila.y + 14} fill="#94a3b8" fontSize="8" textAnchor="end">
            {fila.id.replace(/\d$/, '')}
          </text>

          {/* Slots */}
          {fila.slots.map((slot, si) => {
            const esNaranja = fila.alt !== null && si === 11 - fila.alt;
            return (
              <g key={slot}>
                <rect
                  x={inicioX + si * slotW}
                  y={fila.y}
                  width={slotW - 2}
                  height={slotH}
                  fill={esNaranja ? '#7c2d12' : '#166534'}
                  stroke={esNaranja ? '#ea580c' : '#22c55e'}
                  strokeWidth="0.8"
                />
                <text
                  x={inicioX + si * slotW + slotW / 2 - 1}
                  y={fila.y + 13}
                  fill={esNaranja ? '#fed7aa' : '#dcfce7'}
                  fontSize="7"
                  textAnchor="middle"
                >
                  {slot}
                </text>
              </g>
            );
          })}
        </g>
      ))}

      {/* Fila inferior (P0111 + JSP) */}
      <text
        x="85"
        y={filaUltima.slots.length ? 738 : 738}
        fill="#94a3b8"
        fontSize="8"
        textAnchor="end"
      >
        P0111
      </text>
      {filaUltima.slots.map((slot, si) => {
        const esNaranja = si === 11 - filaUltima.alt;
        return (
          <g key={slot}>
            <rect
              x={inicioX + si * slotW}
              y={725}
              width={slotW - 2}
              height={slotH}
              fill={esNaranja ? '#7c2d12' : '#166534'}
              stroke={esNaranja ? '#ea580c' : '#22c55e'}
              strokeWidth="0.8"
            />
            <text
              x={inicioX + si * slotW + slotW / 2 - 1}
              y={738}
              fill={esNaranja ? '#fed7aa' : '#dcfce7'}
              fontSize="7"
              textAnchor="middle"
            >
              {slot}
            </text>
          </g>
        );
      })}

      {/* JSP (ubicaciones especiales) */}
      {filaUltima.jsp.map((jsp, i) => (
        <g key={jsp}>
          <rect
            x={inicioX + i * slotW}
            y={755}
            width={slotW - 2}
            height={slotH}
            fill="#1e3a5f"
            stroke="#3b82f6"
            strokeWidth="0.8"
          />
          <text
            x={inicioX + i * slotW + slotW / 2 - 1}
            y={768}
            fill="#bfdbfe"
            fontSize="7"
            textAnchor="middle"
          >
            {jsp}
          </text>
        </g>
      ))}

      {/* RACK 23 — Cables (zona morada) */}
      <rect
        x="65"
        y="725"
        width="55"
        height="55"
        fill="#4c1d95"
        stroke="#7c3aed"
        strokeWidth="1.5"
      />
      <text x="92" y="750" fill="#c4b5fd" fontSize="9" textAnchor="middle" fontWeight="700">
        RACK
      </text>
      <text x="92" y="765" fill="#c4b5fd" fontSize="9" textAnchor="middle" fontWeight="700">
        23
      </text>
    </g>
  );
}
