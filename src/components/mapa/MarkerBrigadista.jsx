/**
 * @param {{
 *   miembro: {
 *     id: number,
 *     nombre: string,
 *     rol: 'emergencia'|'rescatista'|'incendios',
 *     estado: 'dentro'|'alrededores',
 *     iniciales: string,
 *     x: number,
 *     y: number
 *   },
 *   onToggle: () => void,
 *   dentroSVG?: boolean
 * }} props
 */
export default function MarkerBrigadista({ miembro, onToggle, dentroSVG = false }) {
  // Conversión: coordenadas BD 0-1000 → SVG 1500×1000
  const svgX = (miembro.x / 1000) * 1500;
  const svgY = (miembro.y / 1000) * 1000;

  const colores = {
    emergencia: '#ef4444',
    rescatista: '#14b8a6',
    incendios: '#f97316',
  };

  const color = colores[miembro.rol] || '#64748b';

  // ===== Versión SVG (escala con el zoom) =====
  if (dentroSVG) {
    return (
      <g style={{ cursor: 'pointer' }} onClick={onToggle}>
        <title>
          {miembro.nombre} — {miembro.estado === 'dentro' ? 'Dentro' : 'Alrededores'}
        </title>

        {/* Círculo exterior de estado */}
        <circle
          cx={svgX}
          cy={svgY}
          r="20"
          fill={miembro.estado === 'dentro' ? '#22c55e' : '#eab308'}
          opacity="0.35"
        />

        {/* Círculo principal con iniciales */}
        <circle
          cx={svgX}
          cy={svgY}
          r="14"
          fill={color}
          stroke="white"
          strokeWidth="2.5"
        />
        <text
          x={svgX}
          y={svgY + 4}
          fill="white"
          fontSize="9"
          fontWeight="700"
          textAnchor="middle"
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          {miembro.iniciales}
        </text>

        {/* Etiqueta con nombre */}
        <rect
          x={svgX - 40}
          y={svgY + 20}
          width="80"
          height="16"
          rx="3"
          fill="rgba(0,0,0,0.85)"
          stroke="#2d3748"
          strokeWidth="0.5"
        />
        <text
          x={svgX}
          y={svgY + 31}
          fill="#e2e8f0"
          fontSize="9"
          textAnchor="middle"
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          {miembro.nombre.length > 16 ? miembro.nombre.slice(0, 15) + '…' : miembro.nombre}
        </text>
      </g>
    );
  }

  // ===== Versión HTML (fallback) =====
  return (
    <div
      className="absolute z-10 cursor-pointer transition-all duration-500 ease-out"
      style={{ left: `${svgX}px`, top: `${svgY}px`, transform: 'translate(-50%, -50%)' }}
      onClick={onToggle}
      title={`${miembro.nombre} — Clic para cambiar entrada/salida`}
    >
      <div
        className="w-[26px] h-[26px] rounded-full border-[3px] border-white shadow-[0_0_12px_rgba(0,0,0,0.6)] flex items-center justify-center text-white text-[10px] font-bold"
        style={{ backgroundColor: color }}
      >
        {miembro.iniciales}
      </div>
      <div className="absolute top-[30px] left-1/2 -translate-x-1/2 bg-black/85 text-white px-2 py-0.5 rounded text-[11px] whitespace-nowrap border border-[#2d3748] pointer-events-none">
        {miembro.nombre}
      </div>
    </div>
  );
}