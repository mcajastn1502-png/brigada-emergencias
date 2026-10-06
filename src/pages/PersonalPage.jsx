import { useMiembros } from '@/hooks/useMiembros';
import { ROLES } from '@/lib/constants';

export default function PersonalPage() {
  const { miembros, loading, toggleEstado } = useMiembros();
  const activos = miembros.filter((m) => m.activo);

  if (loading) return <div className="p-6 text-slate-400">Cargando personal...</div>;

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-bold">👥 Personal en bodega</h2>

      <div className="grid grid-cols-3 gap-3">
        <Stat label="Total" value={activos.length} color="text-blue-400" />
        <Stat label="Dentro" value={activos.filter((m) => m.estado === 'dentro').length} color="text-green-500" />
        <Stat label="Alrededores" value={activos.filter((m) => m.estado === 'alrededores').length} color="text-yellow-500" />
      </div>

      <div className="bg-panel border border-borderDark rounded-lg">
        {activos.map((m) => (
          <div
            key={m.id}
            className="flex justify-between items-center px-4 py-3 border-b border-borderDark last:border-0 text-sm"
          >
            <div className="flex items-center gap-3">
              <span
                className="px-2 py-0.5 rounded text-xs font-semibold text-white"
                style={{ background: ROLES[m.rol].color }}
              >
                {ROLES[m.rol].icon} {ROLES[m.rol].nombre}
              </span>
              <strong>{m.nombre}</strong>
              <span className="text-slate-400">
                {m.estado === 'dentro' ? '🟢 Dentro' : '🟡 Alrededores'}
              </span>
            </div>
            <button
              onClick={() => toggleEstado(m.id)}
              className="border border-borderDark px-3 py-1 rounded text-xs hover:bg-bgDark"
            >
              {m.estado === 'dentro' ? '↑ Marcar salida' : '↓ Marcar entrada'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value, color }) {
  return (
    <div className="bg-panel border border-borderDark rounded-lg p-4 text-center">
      <div className={`text-3xl font-bold ${color}`}>{value}</div>
      <div className="text-xs text-slate-400 mt-1">{label}</div>
    </div>
  );
}