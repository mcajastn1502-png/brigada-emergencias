/**
 * Panel de estadísticas del historial de incidentes
 * @param {{ incidentes: any[] }} props
 */
export default function Estadisticas({ incidentes }) {
  const cerrados = incidentes.filter((i) => i.fin);
  const activos = incidentes.filter((i) => !i.fin);
  const simulacros = incidentes.filter((i) => i.simulacro);
  const reales = incidentes.filter((i) => !i.simulacro);

  // Duración promedio (solo de los cerrados)
  const promedioDuracion =
    cerrados.length > 0
      ? Math.round(cerrados.reduce((sum, i) => sum + (i.duracion_seg || 0), 0) / cerrados.length)
      : 0;

  const h = String(Math.floor(promedioDuracion / 3600)).padStart(2, '0');
  const m = String(Math.floor((promedioDuracion % 3600) / 60)).padStart(2, '0');
  const s = String(promedioDuracion % 60).padStart(2, '0');

  // Incidentes últimos 30 días
  const hace30dias = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const ultimos30 = incidentes.filter((i) => new Date(i.inicio).getTime() > hace30dias);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <StatCard
        icon="📋"
        label="Total incidentes"
        value={incidentes.length}
        color="text-blue-400"
      />
      <StatCard
        icon="✅"
        label="Cerrados"
        value={cerrados.length}
        sub={`${activos.length} activos`}
        color="text-green-400"
      />
      <StatCard
        icon="⏱️"
        label="Duración promedio"
        value={promedioDuracion > 0 ? `${h}:${m}:${s}` : '—'}
        sub="Tiempo por incidente"
        color="text-yellow-400"
      />
      <StatCard
        icon="📅"
        label="Últimos 30 días"
        value={ultimos30.length}
        sub={`${simulacros.length} simulacros · ${reales.length} reales`}
        color="text-purple-400"
      />
    </div>
  );
}

function StatCard({ icon, label, value, sub, color }) {
  return (
    <div className="bg-[#1a2027] border border-[#2d3748] rounded-lg p-4">
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <span>{icon}</span>
        <span>{label}</span>
      </div>
      <div className={`text-2xl md:text-3xl font-bold ${color} mt-1`}>{value}</div>
      {sub && <div className="text-xs text-slate-500 mt-1">{sub}</div>}
    </div>
  );
}
