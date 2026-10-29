import { useState, useMemo } from 'react';
import { useMiembros } from '@/hooks/useMiembros';
import { useToast } from '@/hooks/useToast';
import ModalMiembro from '@/components/miembros/ModalMiembro';

const ROLES = {
  emergencia: { nombre: 'Emergencias', color: 'bg-red-500', icon: '🚑' },
  rescatista: { nombre: 'Rescatista', color: 'bg-teal-500', icon: '🧗' },
  incendios: { nombre: 'Anti-incendios', color: 'bg-orange-500', icon: '🔥' },
};

export default function MiembrosPage({ rol }) {
  const { miembros, loading, actualizarMiembro, crearMiembro, toggleActivo, eliminarMiembro } =
    useMiembros();
  const { toasts, toast } = useToast();

  const [busqueda, setBusqueda] = useState('');
  const [filtroRol, setFiltroRol] = useState('todos');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [miembroEditando, setMiembroEditando] = useState(null);

  // 🔒 Control de acceso
  if (rol !== 'coordinador') {
    return (
      <div className="p-6 text-center">
        <div className="inline-block bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6 max-w-md">
          <div className="text-4xl mb-2">🔒</div>
          <h2 className="text-yellow-400 font-bold text-lg mb-2">Acceso restringido</h2>
          <p className="text-slate-400 text-sm">
            Solo el <strong className="text-white">Coordinador de Brigada</strong> puede gestionar
            miembros. Cambia tu rol en el selector superior.
          </p>
        </div>
      </div>
    );
  }

  // Lista filtrada
  const miembrosFiltrados = useMemo(() => {
    return miembros.filter((m) => {
      const coincideRol = filtroRol === 'todos' || m.rol === filtroRol;
      const coincideBusqueda =
        !busqueda ||
        m.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        (m.email || '').toLowerCase().includes(busqueda.toLowerCase()) ||
        (m.telefono || '').includes(busqueda);
      return coincideRol && coincideBusqueda;
    });
  }, [miembros, busqueda, filtroRol]);

  // Contadores
  const contadores = useMemo(
    () => ({
      total: miembros.length,
      activos: miembros.filter((m) => m.activo).length,
      emergencia: miembros.filter((m) => m.rol === 'emergencia' && m.activo).length,
      rescatista: miembros.filter((m) => m.rol === 'rescatista' && m.activo).length,
      incendios: miembros.filter((m) => m.rol === 'incendios' && m.activo).length,
    }),
    [miembros]
  );

  const abrirCrear = () => {
    setMiembroEditando(null);
    setModalAbierto(true);
  };

  const abrirEditar = (miembro) => {
    setMiembroEditando(miembro);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setMiembroEditando(null);
  };

  const guardar = async (payload) => {
    if (miembroEditando) {
      const { error } = await actualizarMiembro(miembroEditando.id, payload);
      if (error) {
        toast('❌ Error al actualizar: ' + error.message, 'error');
        return;
      }
      toast('✅ Brigadista actualizado', 'success');
    } else {
      const { error } = await crearMiembro(payload);
      if (error) {
        toast('❌ Error al crear: ' + error.message, 'error');
        return;
      }
      toast('✅ Brigadista creado', 'success');
    }
    cerrarModal();
  };

  const eliminar = async () => {
    if (!miembroEditando) return;
    if (!window.confirm(`¿Eliminar a ${miembroEditando.nombre}? Esta acción no se puede deshacer.`))
      return;
    const { error } = await eliminarMiembro(miembroEditando.id);
    if (error) {
      toast('❌ Error al eliminar', 'error');
      return;
    }
    toast('🗑️ Brigadista eliminado', 'success');
    cerrarModal();
  };

  if (loading) {
    return <div className="p-6 text-slate-400 text-center">Cargando miembros...</div>;
  }

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div>
          <h2 className="text-lg font-bold text-white">🪪 Gestión de miembros</h2>
          <p className="text-xs text-slate-400 mt-1">
            {contadores.activos} activos · {contadores.total} totales
          </p>
        </div>
        <button
          onClick={abrirCrear}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition"
        >
          ➕ Agregar brigadista
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Total" value={contadores.total} color="text-blue-400" />
        <StatCard label="🚑 Emergencias" value={contadores.emergencia} color="text-red-400" />
        <StatCard label="🧗 Rescatistas" value={contadores.rescatista} color="text-teal-400" />
        <StatCard label="🔥 Anti-incendios" value={contadores.incendios} color="text-orange-400" />
      </div>

      {/* Filtros */}
      <div className="flex gap-2 flex-wrap">
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="🔍 Buscar por nombre, email o teléfono..."
          className="flex-1 min-w-[200px] bg-[#0f1419] border border-[#2d3748] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
        />
        <select
          value={filtroRol}
          onChange={(e) => setFiltroRol(e.target.value)}
          className="bg-[#0f1419] border border-[#2d3748] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
        >
          <option value="todos">Todos los roles</option>
          <option value="emergencia">🚑 Emergencias</option>
          <option value="rescatista">🧗 Rescatistas</option>
          <option value="incendios">🔥 Anti-incendios</option>
        </select>
      </div>

      {/* Lista */}
      <div className="bg-[#1a2027] border border-[#2d3748] rounded-lg overflow-hidden overflow-y-auto max-h-[65vh]">
        {miembrosFiltrados.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-sm">
            No se encontraron brigadistas con esos filtros
          </div>
        ) : (
          miembrosFiltrados.map((m) => (
            <div
              key={m.id}
              className={`flex justify-between items-center gap-3 px-4 py-3 border-b border-[#2d3748] last:border-0 hover:bg-[#252d38]/50 transition ${
                !m.activo ? 'opacity-50' : ''
              }`}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span
                  className={`${ROLES[m.rol].color} text-white text-xs font-bold px-2 py-1 rounded whitespace-nowrap`}
                >
                  {ROLES[m.rol].icon} {ROLES[m.rol].nombre}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <strong className="text-white text-sm">{m.nombre}</strong>
                    {!m.activo && (
                      <span className="text-[10px] bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded">
                        INACTIVO
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 flex flex-wrap gap-x-3 gap-y-0.5 mt-0.5">
                    {m.telefono && <span>📞 {m.telefono}</span>}
                    {m.email && <span>✉️ {m.email}</span>}
                    {m.tipo_sangre && <span>🩸 {m.tipo_sangre}</span>}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => abrirEditar(m)}
                  className="px-2.5 py-1 rounded border border-[#2d3748] text-slate-300 hover:bg-[#252d38] text-xs transition"
                  title="Editar"
                >
                  ✏️
                </button>
                <button
                  onClick={() => toggleActivo(m.id)}
                  className={`px-2.5 py-1 rounded border text-xs transition ${
                    m.activo
                      ? 'border-yellow-600/50 text-yellow-400 hover:bg-yellow-500/10'
                      : 'border-green-600/50 text-green-400 hover:bg-green-500/10'
                  }`}
                  title={m.activo ? 'Inactivar' : 'Activar'}
                >
                  {m.activo ? '🚫' : '✓'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {modalAbierto && (
        <ModalMiembro
          miembro={miembroEditando}
          onClose={cerrarModal}
          onGuardar={guardar}
          onEliminar={miembroEditando ? eliminar : null}
        />
      )}
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className="bg-[#1a2027] border border-[#2d3748] rounded-lg p-3 text-center">
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <div className="text-xs text-slate-400 mt-0.5">{label}</div>
    </div>
  );
}
