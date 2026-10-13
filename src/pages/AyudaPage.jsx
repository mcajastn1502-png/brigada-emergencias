import TourGuiado from '@/components/ayuda/TourGuiado';
import FAQ from '@/components/ayuda/FAQ';
import { ROLES_TABLA, ROLES, MEJORAS } from '@/lib/constants';

export default function AyudaPage({ onNavegar }) {
  const estadoBadge = {
    activo: { label: '✓ Activo', color: 'bg-green-600' },
    pendiente: { label: '⏳ Pendiente', color: 'bg-yellow-600' },
    fase2: { label: '🔜 Fase 2', color: 'bg-slate-600' },
  };

  return (
    <div className="p-4 max-w-5xl mx-auto space-y-6">
      {/* Hero */}
      <div className="bg-gradient-to-r from-red-500/10 via-purple-500/10 to-blue-500/10 border border-[#2d3748] rounded-xl p-6 text-center">
        <h1 className="text-2xl font-bold text-white">❓ Centro de Ayuda</h1>
        <p className="text-sm text-slate-400 mt-2 max-w-2xl mx-auto">
          Guía interactiva para brigadistas, coordinadores y personal nuevo. Sigue el tour paso a
          paso o consulta las secciones de referencia.
        </p>
      </div>

      {/* Tour guiado */}
      <section>
        <h2 className="text-base font-bold text-white mb-3">🎬 Tour guiado — 8 pasos</h2>
        <TourGuiado onNavegar={onNavegar} />
      </section>

      {/* Tabla de roles */}
      <section>
        <h2 className="text-base font-bold text-white mb-3">👥 Roles y responsabilidades</h2>
        <div className="bg-[#1a2027] border border-[#2d3748] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#0f1419] text-xs text-slate-400">
                <tr>
                  <th className="text-left px-4 py-2">Rol</th>
                  <th className="text-left px-4 py-2">Cantidad</th>
                  <th className="text-left px-4 py-2">Responsabilidad principal</th>
                  <th className="text-left px-4 py-2">Prioridad</th>
                </tr>
              </thead>
              <tbody>
                {ROLES_TABLA.map((r) => (
                  <tr key={r.rol} className="border-t border-[#2d3748]">
                    <td className="px-4 py-3">
                      <span
                        className="px-2 py-1 rounded text-xs font-bold text-white whitespace-nowrap"
                        style={{ background: ROLES[r.rol].color }}
                      >
                        {ROLES[r.rol].icon} {ROLES[r.rol].nombre}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-white font-bold">{r.cantidad}</td>
                    <td className="px-4 py-3 text-slate-300 text-xs">{r.responsabilidad}</td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{r.prioridad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Guía rápida */}
      <section>
        <h2 className="text-base font-bold text-white mb-3">⚡ Guía rápida por tarea</h2>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="bg-[#1a2027] border border-[#2d3748] rounded-lg p-4">
            <h3 className="text-blue-400 font-bold text-sm mb-2">🆘 Reportar una emergencia</h3>
            <ol className="text-xs text-slate-300 space-y-1.5 list-decimal list-inside">
              <li>
                Presiona el botón rojo <strong>SOS</strong> (abajo a la derecha).
              </li>
              <li>Toque corto → menú con opciones (911, ambulancia, bomberos).</li>
              <li>Mantener 1.5 s → declara emergencia inmediata a toda la brigada.</li>
            </ol>
          </div>

          <div className="bg-[#1a2027] border border-[#2d3748] rounded-lg p-4">
            <h3 className="text-blue-400 font-bold text-sm mb-2">
              📍 Cambiar estado de brigadista
            </h3>
            <ol className="text-xs text-slate-300 space-y-1.5 list-decimal list-inside">
              <li>
                En <strong>👥 Personal</strong>, usa el botón de la fila del brigadista.
              </li>
              <li>
                O en <strong>🗺️ Mapa</strong>, haz clic en su marcador.
              </li>
              <li>
                Cambia entre <strong>Dentro</strong> ↔ <strong>Alrededores</strong>.
              </li>
            </ol>
          </div>

          <div className="bg-[#1a2027] border border-[#2d3748] rounded-lg p-4">
            <h3 className="text-blue-400 font-bold text-sm mb-2">📁 Consultar historial</h3>
            <ol className="text-xs text-slate-300 space-y-1.5 list-decimal list-inside">
              <li>
                Cambia a <strong>Coordinador</strong> (arriba derecha).
              </li>
              <li>
                Abre la pestaña <strong>📁 Historial</strong>.
              </li>
              <li>
                Filtra y exporta a <strong>CSV</strong> para auditorías.
              </li>
            </ol>
          </div>

          <div className="bg-[#1a2027] border border-[#2d3748] rounded-lg p-4">
            <h3 className="text-blue-400 font-bold text-sm mb-2">🩹 Consultar primeros auxilios</h3>
            <ol className="text-xs text-slate-300 space-y-1.5 list-decimal list-inside">
              <li>
                Ve a <strong>🩹 Primeros Auxilios</strong>.
              </li>
              <li>Expande el protocolo que necesites (RCP, hemorragias, etc.).</li>
              <li>
                Pulsa el video tutorial → se abre <strong>YouTube</strong> en otra pestaña.
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="text-base font-bold text-white mb-3">💬 Preguntas frecuentes</h2>
        <FAQ />
      </section>

      {/* Mejoras */}
      <section>
        <h2 className="text-base font-bold text-white mb-3">🎁 Estado de mejoras</h2>
        <div className="bg-[#1a2027] border border-[#2d3748] rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {MEJORAS.map((m, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-2 p-2 border-b border-[#2d3748]/40 last:border-0"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-lg">{m.icono}</span>
                  <span className="text-sm text-slate-300 truncate">{m.nombre}</span>
                </div>
                <span
                  className={`${estadoBadge[m.estado].color} text-white text-[10px] font-bold px-2 py-0.5 rounded whitespace-nowrap`}
                >
                  {estadoBadge[m.estado].label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="text-center text-xs text-slate-500 py-4">
        Brigada de Emergencias · Bodega Central · ECU-911
        <br />
        Construido con React + Vite + Supabase
      </div>
    </div>
  );
}
