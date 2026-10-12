import { useIncidentes } from '@/hooks/useIncidentes';
import { useToast } from '@/hooks/useToast';
import Estadisticas from '@/components/historial/Estadisticas';
import TablaHistorial from '@/components/historial/TablaHistorial';

export default function HistorialPage({ rol }) {
  const { incidentes, loading, eliminarIncidente } = useIncidentes();
  const { toasts, toast } = useToast();

  // 🔒 Control de acceso
  if (rol !== 'coordinador') {
    return (
      <div className="p-6 text-center">
        <div className="inline-block bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6 max-w-md">
          <div className="text-4xl mb-2">🔒</div>
          <h2 className="text-yellow-400 font-bold text-lg mb-2">Acceso restringido</h2>
          <p className="text-slate-400 text-sm">
            Solo el <strong className="text-white">Coordinador de Brigada</strong> puede ver el
            historial completo de incidentes.
          </p>
        </div>
      </div>
    );
  }

  const handleEliminar = async (id) => {
    const { error } = await eliminarIncidente(id);
    if (error) {
      toast('❌ Error al eliminar', 'error');
      return;
    }
    toast('🗑️ Incidente eliminado', 'success');
  };

  if (loading) {
    return <div className="p-6 text-slate-400 text-center">Cargando historial...</div>;
  }

  return (
    <div className="p-4 max-w-6xl mx-auto space-y-4">
      {/* Hero */}
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-[#2d3748] rounded-xl p-5">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          📁 Historial de incidentes
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Registro completo de todas las emergencias y simulacros de la bodega. Incluye duración,
          ubicación y tipo.
        </p>
      </div>

      {/* Estadísticas */}
      <Estadisticas incidentes={incidentes} />

      {/* Tabla */}
      <TablaHistorial incidentes={incidentes} onEliminar={handleEliminar} />
    </div>
  );
}
