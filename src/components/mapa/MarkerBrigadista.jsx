/**
 * Calcula las iniciales desde el nombre, ignorando preposiciones.
 * "Alexis de la Cruz" → "AC"
 */
function calcularIniciales(nombre) {
  if (!nombre) return '?';
  const preposiciones = ['de', 'del', 'la', 'las', 'los', 'y', 'van', 'von', 'da', 'dos'];
  const palabras = nombre
    .trim()
    .split(/\s+/)
    .filter((p) => p.length > 0 && !preposiciones.includes(p.toLowerCase()));
  if (palabras.length >= 2) {
    return (palabras[0][0] + palabras[1][0]).toUpperCase();
  }
  return nombre.substring(0, 2).toUpperCase();
}

/**
 * @param {{
 *   miembro: {
 *     id: number, nombre: string,
 *     rol: 'emergencia'|'rescatista'|'incendios',
 *     estado: 'dentro'|'alrededores',
 *     iniciales: string, x: number, y: number,
 *     x_fuera?: number, y_fuera?: number
 *   },
 *   onClick: () => void
 * }} props
 */
export default function MarkerBrigadista({ miembro, onClick }) {
  // Elegir posición según estado
  const xPos = miembro.estado === 'dentro' ? miembro.x : miembro.x_fuera ?? miembro.x;
  const yPos = miembro.estado === 'dentro' ? miembro.y : miembro.y_fuera ?? 920;

  // Convertir 0-1000 → 1500×1000
  const svgX = (xPos / 1000) * 1500;
  const svgY = (yPos / 1000) * 1000;

  const colores = {
    emergencia: '#ef4444',
    rescatista: '#14b8a6',
    incendios: '#f97316',
  };
  const color = colores[miembro.rol] || '#64748b';
  const iniciales = calcularIniciales(miembro.nombre);

  return (
    <g
      style={{
        cursor: 'pointer',
        transition: 'transform 0.6s ease-out',
        transform: `translate(${svgX}px, ${svgY}px)`,
      }}
      onClick={onClick}
    >
      <title>
        {miembro.nombre} — {miembro.estado === 'dentro' ? 'Dentro' : 'Alrededores'} (clic para ver info)
      </title>

      {/* Halo de estado */}
      <circle
        cx="0"
        cy="0"
        r="22"
        fill={miembro.estado === 'dentro' ? '#22c55e' : '#eab308'}
        opacity="0.3"
      />

      {/* Círculo principal */}
      <circle cx="0" cy="0" r="14" fill={color} stroke="white" strokeWidth="2.5" />

      {/* Iniciales */}
      <text
        x="0"
        y="4"
        fill="white"
        fontSize="9"
        fontWeight="700"
        textAnchor="middle"
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        {iniciales}
      </text>

      {/* Etiqueta con nombre */}
      <rect
        x="-45"
        y="18"
        width="90"
        height="15"
        rx="3"
        fill="rgba(0,0,0,0.85)"
        stroke="#2d3748"
        strokeWidth="0.5"
      />
      <text
        x="0"
        y="29"
        fill="#e2e8f0"
        fontSize="9"
        textAnchor="middle"
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        {miembro.nombre.length > 18 ? miembro.nombre.slice(0, 17) + '…' : miembro.nombre}
      </text>
    </g>
  );
}