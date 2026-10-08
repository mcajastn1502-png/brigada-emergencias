/**
 * Marker de punto de encuentro — SVG nativo (escala con el zoom)
 * @param {{ punto: { id: string, nombre: string, x: number, y: number } }} props
 */
export default function MarkerPuntoEncuentro({ punto }) {
  return (
    <g style={{ pointerEvents: 'auto' }}>
      <title>{punto.nombre}</title>

      {/* Halo pulsante */}
      <circle cx={punto.x} cy={punto.y} r="26" fill="#eab308" opacity="0.3">
        <animate attributeName="r" values="22;30;22" dur="1.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0.1;0.4" dur="1.8s" repeatCount="indefinite" />
      </circle>

      {/* Círculo principal */}
      <circle cx={punto.x} cy={punto.y} r="16" fill="#eab308" stroke="white" strokeWidth="2.5" />
      <text
        x={punto.x}
        y={punto.y + 6}
        fill="white"
        fontSize="16"
        textAnchor="middle"
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        📍
      </text>

      {/* Etiqueta */}
      <rect
        x={punto.x - 30}
        y={punto.y + 20}
        width="60"
        height="14"
        rx="3"
        fill="rgba(0,0,0,0.85)"
        stroke="#eab308"
        strokeWidth="0.5"
      />
      <text
        x={punto.x}
        y={punto.y + 30}
        fill="#fef3c7"
        fontSize="9"
        fontWeight="700"
        textAnchor="middle"
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        {punto.id}
      </text>
    </g>
  );
}