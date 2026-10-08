/**
 * Zona 4 — Baños, escaleras, oficinas administrativas (arriba)
 * Rango: x: 60-1340, y: 100-500
 */
export default function Zona4() {
  return (
    <g id="zona4">
      <rect x="60" y="100" width="1280" height="400" fill="#1e293b" stroke="#334155" strokeWidth="2" />

      <text x="700" y="135" fill="#94a3b8" fontSize="22" fontWeight="700" textAnchor="middle">
        ZONA 4 · BAÑOS · ESCALERAS · OFICINAS ADMIN
      </text>

      <rect x="100" y="180" width="120" height="80" fill="#2d3748" stroke="#4a5568" strokeWidth="1.5" />
      <text x="160" y="225" fill="#94a3b8" fontSize="14" textAnchor="middle">Baños</text>

      <rect x="100" y="280" width="120" height="80" fill="#2d3748" stroke="#4a5568" strokeWidth="1.5" />
      <text x="160" y="325" fill="#94a3b8" fontSize="14" textAnchor="middle">Baños</text>

      <rect x="260" y="180" width="120" height="180" fill="#2d3748" stroke="#4a5568" strokeWidth="1.5" />
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={i} x1="270" y1={200 + i * 18} x2="370" y2={200 + i * 18} stroke="#4a5568" strokeWidth="1" />
      ))}
      <text x="320" y="380" fill="#94a3b8" fontSize="13" textAnchor="middle">Escaleras</text>

      <rect x="1000" y="180" width="300" height="180" fill="#2d3748" stroke="#4a5568" strokeWidth="1.5" />
      <text x="1150" y="280" fill="#94a3b8" fontSize="18" textAnchor="middle" fontWeight="600">Oficinas</text>

      <rect x="1100" y="380" width="200" height="100" fill="#3a3a1a" stroke="#eab308" strokeWidth="2" />
      <text x="1200" y="435" fill="#facc15" fontSize="16" textAnchor="middle" fontWeight="700">🍽️ COMEDOR</text>

      <rect x="60" y="500" width="1280" height="30" fill="#1a2027" stroke="#4a5568" strokeDasharray="4,4" />
    </g>
  );
}