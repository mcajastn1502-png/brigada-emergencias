/**
 * Marker de salida de emergencia — SVG nativo (escala con el zoom)
 * @param {{ salida: { id: string, nombre: string, x: number, y: number } }} props
 */
export default function MarkerSalida({ salida }) {
  return (
    <g style={{ pointerEvents: 'auto' }}>
      <title>{salida.nombre}</title>

      {/* Halo pulsante */}
      <circle cx={salida.x} cy={salida.y} r="24" fill="#22c55e" opacity="0.25">
        <animate attributeName="r" values="20;28;20" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.35;0.1;0.35" dur="1.5s" repeatCount="indefinite" />
      </circle>

      {/* Círculo principal */}
      <rect
        x={salida.x - 14}
        y={salida.y - 14}
        width="28"
        height="28"
        rx="6"
        fill="#22c55e"
        stroke="white"
        strokeWidth="2"
      />
      <text
        x={salida.x}
        y={salida.y + 5}
        fill="white"
        fontSize="14"
        textAnchor="middle"
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        🚪
      </text>

      {/* Etiqueta */}
      <rect
        x={salida.x - 25}
        y={salida.y + 18}
        width="50"
        height="14"
        rx="3"
        fill="rgba(0,0,0,0.85)"
        stroke="#22c55e"
        strokeWidth="0.5"
      />
      <text
        x={salida.x}
        y={salida.y + 28}
        fill="#dcfce7"
        fontSize="9"
        fontWeight="700"
        textAnchor="middle"
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        {salida.id}
      </text>
    </g>
  );
}