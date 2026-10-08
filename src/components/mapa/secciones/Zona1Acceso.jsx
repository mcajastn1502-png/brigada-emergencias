/**
 * Zona 1 — NODO BODEGA, oficina, vestidores, cancel, guardería (abajo)
 * Rango: x: 60-1340, y: 2200-2600
 */
export default function Zona1Acceso() {
  return (
    <g id="zona1">
      <rect x="60" y="2200" width="1280" height="400" fill="#1e293b" stroke="#334155" strokeWidth="2" />

      <text x="700" y="2235" fill="#94a3b8" fontSize="22" fontWeight="700" textAnchor="middle">
        ZONA 1 · NODO BODEGA · OFICINA · VESTIDORES
      </text>

      <rect x="300" y="2280" width="300" height="120" fill="#2d3748" stroke="#4a5568" strokeWidth="1.5" />
      <text x="450" y="2350" fill="#94a3b8" fontSize="18" textAnchor="middle" fontWeight="600">
        NODO BODEGA
      </text>

      <rect x="700" y="2280" width="200" height="120" fill="#2d3748" stroke="#4a5568" strokeWidth="1.5" />
      <text x="800" y="2350" fill="#94a3b8" fontSize="16" textAnchor="middle" fontWeight="600">
        Oficina
      </text>

      <rect x="100" y="2450" width="180" height="100" fill="#2d3748" stroke="#4a5568" strokeWidth="1.5" />
      <text x="190" y="2505" fill="#94a3b8" fontSize="14" textAnchor="middle">Vestidores</text>

      <rect x="1000" y="2450" width="200" height="100" fill="#2d3748" stroke="#4a5568" strokeWidth="1.5" />
      <text x="1100" y="2505" fill="#94a3b8" fontSize="14" textAnchor="middle">Cancel / Guardería</text>
    </g>
  );
}