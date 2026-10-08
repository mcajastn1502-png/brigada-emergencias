/**
 * Zona Sur — NODO BODEGA, oficina, vestidores, cancel, guardería
 * Rango SVG: x: 60-1444, y: 760-870
 */
export default function ZonaSur() {
  return (
    <g id="zona-sur">
      {/* Fondo zona */}
      <rect x="60" y="760" width="1384" height="110" fill="#1e293b" stroke="#334155" strokeWidth="2" />

      {/* Título */}
      <text x="752" y="782" fill="#94a3b8" fontSize="12" fontWeight="700" textAnchor="middle">
        ZONA SUR · NODO BODEGA · OFICINA · VESTIDORES
      </text>

      {/* NODO BODEGA */}
      <rect x="400" y="795" width="200" height="60" fill="#2d3748" stroke="#4a5568" strokeWidth="1" />
      <text x="500" y="830" fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="600">
        NODO BODEGA
      </text>

      {/* Oficina */}
      <rect x="640" y="795" width="150" height="60" fill="#2d3748" stroke="#4a5568" strokeWidth="1" />
      <text x="715" y="830" fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="600">
        Oficina
      </text>

      {/* Vestidores */}
      <rect x="100" y="795" width="140" height="60" fill="#2d3748" stroke="#4a5568" strokeWidth="1" />
      <text x="170" y="830" fill="#94a3b8" fontSize="10" textAnchor="middle">
        Vestidores
      </text>

      {/* Cancel / Guardería */}
      <rect x="1000" y="795" width="180" height="60" fill="#2d3748" stroke="#4a5568" strokeWidth="1" />
      <text x="1090" y="830" fill="#94a3b8" fontSize="10" textAnchor="middle">
        Cancel / Guardería
      </text>

      {/* Salida mercancía (SE-1) */}
      <rect x="60" y="820" width="20" height="30" fill="#22c55e" opacity="0.6" />
    </g>
  );
}