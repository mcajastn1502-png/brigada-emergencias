/**
 * Zona Norte — Baños, escaleras, oficinas admin, comedor, recepción proveedores
 * Rango SVG: x: 60-1444, y: 100-260
 * (Ancho bodega: 1384 px = 72,85 m)
 */
export default function ZonaNorte() {
  return (
    <g id="zona-norte">
      {/* Fondo zona */}
      <rect x="60" y="100" width="1384" height="160" fill="#1e293b" stroke="#334155" strokeWidth="2" />

      {/* Título */}
      <text x="752" y="125" fill="#94a3b8" fontSize="13" fontWeight="700" textAnchor="middle">
        ZONA NORTE · BAÑOS · ESCALERAS · OFICINAS ADMIN · RECEPCIÓN PROVEEDORES
      </text>

      {/* Baños */}
      <rect x="90" y="145" width="70" height="45" fill="#2d3748" stroke="#4a5568" strokeWidth="1" />
      <text x="125" y="172" fill="#94a3b8" fontSize="10" textAnchor="middle">Baños</text>
      <rect x="90" y="200" width="70" height="45" fill="#2d3748" stroke="#4a5568" strokeWidth="1" />
      <text x="125" y="227" fill="#94a3b8" fontSize="10" textAnchor="middle">Baños</text>

      {/* Escaleras */}
      <rect x="180" y="145" width="80" height="100" fill="#2d3748" stroke="#4a5568" strokeWidth="1" />
      {Array.from({ length: 8 }).map((_, i) => (
        <line key={i} x1="185" y1={155 + i * 11} x2="255" y2={155 + i * 11} stroke="#4a5568" strokeWidth="0.5" />
      ))}
      <text x="220" y="258" fill="#94a3b8" fontSize="9" textAnchor="middle">Escaleras</text>

      {/* Zona cyan — Recepción de proveedores */}
      <rect x="290" y="145" width="180" height="100" fill="#0e3a4a" stroke="#22d3ee" strokeWidth="2" />
      <text x="380" y="185" fill="#22d3ee" fontSize="12" fontWeight="700" textAnchor="middle">
        RECEPCIÓN
      </text>
      <text x="380" y="205" fill="#22d3ee" fontSize="10" textAnchor="middle">
        PROVEEDORES
      </text>
      <text x="380" y="225" fill="#67e8f9" fontSize="9" textAnchor="middle">
        (Zona Cyan · KX)
      </text>

      {/* Oficinas admin */}
      <rect x="520" y="145" width="200" height="100" fill="#2d3748" stroke="#4a5568" strokeWidth="1" />
      <text x="620" y="200" fill="#94a3b8" fontSize="14" textAnchor="middle" fontWeight="600">
        Oficinas
      </text>

      {/* Rack 12 (rack especial aislado) */}
      <rect x="780" y="155" width="100" height="80" fill="#2d3748" stroke="#4a5568" strokeWidth="1" />
      <text x="830" y="200" fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="600">
        RACK 12
      </text>

      {/* Comedor (zona amarilla) */}
      <rect x="1180" y="140" width="240" height="110" fill="#3a3a1a" stroke="#eab308" strokeWidth="2" />
      <text x="1300" y="180" fill="#facc15" fontSize="14" fontWeight="700" textAnchor="middle">
        🍽️ COMEDOR
      </text>
      {/* Subdivisiones del comedor */}
      {Array.from({ length: 3 }).map((_, i) => (
        <line key={i} x1="1185" y1={200 + i * 15} x2="1415" y2={200 + i * 15} stroke="#854d0e" strokeWidth="0.5" strokeDasharray="2,2" />
      ))}
    </g>
  );
}