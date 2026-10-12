import { useState } from 'react';
import { useIncidentes } from '@/hooks/useIncidentes';
import { useMiembros } from '@/hooks/useMiembros';
import { useToast } from '@/hooks/useToast';
import Cronometro from '@/components/incidentes/Cronometro';
import ModalNuevoIncidente from '@/components/incidentes/ModalNuevoIncidente';
import ProtocolosRecomendados from '@/components/incidentes/ProtocolosRecomendados';
import { ROLES, PROTOCOLOS } from '@/lib/constants';

export default function IncidentesPage() {
  const { incidenteActivo, loading, declarar, finalizar } = useIncidentes();
  const { miembros } = useMiembros();
  const { toasts, toast } = useToast();

  const [modalAbierto, setModalAbierto] = useState(false);

  const handleDeclarar = async (datos) => {
    const { error } = await declarar(datos);
    if (error) {
      toast('❌ Error al declarar: ' + error.message, 'error');
      return;
    }
    toast(`🚨 Incidente declarado: ${datos.categoria}`, 'error');
    setModalAbierto(false);
  };

  const handleFinalizar = async () => {
    if (!incidenteActivo) return;
    if (!window.confirm('¿Finalizar y archivar este incidente?')) return;

    const { error } = await finalizar(incidenteActivo.id);
    if (error) {
      toast('❌ Error al finalizar', 'error');
      return;
    }
    toast('✓ Incidente finalizado y archivado', 'success');
  };

  // Equipo asignado (miembros activos del rol que corresponde)
  const protocoloActual = incidenteActivo
    ? PROTOCOLOS.find((p) => p.categoria === incidenteActivo.categoria)
    : null;
  const rolAsignado = protocoloActual?.rolAsignado;
  const equipoAsignado = rolAsignado
    ? miembros.filter((m) => m.activo && m.rol === rolAsignado)
    : [];

  if (loading) {
    return <div className="p-6 text-slate-400 text-center">Cargando incidentes...</div>;
  }

  return (
    <div className="p-4 space-y-4 max-w-5xl mx-auto">
      {/* Título */}
      <h2 className="text-lg font-bold text-white">🚨 Gestión de incidentes</h2>

      {/* Alerta activa */}
      {incidenteActivo && (
        <div
          className={`${
            incidenteActivo.simulacro
              ? 'bg-yellow-600/20 border-yellow-500/50'
              : 'bg-red-600/20 border-red-500/50 animate-pulse'
          } border rounded-xl p-5`}
        >
          <div className="flex items-start gap-3">
            <div className="text-3xl">{incidenteActivo.simulacro ? '🧪' : '🚨'}</div>
            <div className="flex-1">
              <h3
                className={`font-bold text-lg ${
                  incidenteActivo.simulacro ? 'text-yellow-400' : 'text-red-400'
                }`}
              >
                {incidenteActivo.simulacro ? 'SIMULACRO ACTIVO' : 'EMERGENCIA ACTIVA'}
              </h3>
              <p className="text-white text-sm mt-1">
                <strong>Categoría:</strong> {incidenteActivo.categoria.toUpperCase()}
              </p>
              <p className="text-slate-300 text-sm">
                📍 {incidenteActivo.ubicacion}
              </p>
              {incidenteActivo.descripcion && (
                <p className="text-slate-400 text-xs mt-1">{incidenteActivo.descripcion}</p>
              )}
              <p className="text-slate-400 text-xs mt-2">
                👥 Equipo asignado: {equipoAsignado.map((m) => m.nombre).join(', ') || 'Sin asignar'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Cronómetro y controles */}
      <div className="bg-[#1a2027] border border-[#2d3748] rounded-lg p-4">
        <div className="text-center text-slate-400 text-xs mb-2">
          {incidenteActivo ? 'Tiempo transcurrido' : 'Sin incidente activo'}
        </div>

        <Cronometro
          inicio={incidenteActivo?.inicio}
          activo={Boolean(incidenteActivo)}
        />

        <div className="flex justify-center gap-2 mt-3 flex-wrap">
          {!incidenteActivo ? (
            <button
              onClick={() => setModalAbierto(true)}
              className="px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition"
            >
              + Declarar nuevo incidente
            </button>
          ) : (
            <button
              onClick={handleFinalizar}
              className="px-6 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-bold transition"
            >
              ✓ Finalizar incidente
            </button>
          )}
        </div>
      </div>

      {/* Información del incidente activo */}
      {incidenteActivo && (
        <div className="bg-[#1a2027] border border-[#2d3748] rounded-lg p-4">
          <h3 className="text-white font-bold text-sm mb-3">Información del incidente</h3>
          <div className="space-y-2 text-sm">
            <InfoRow label="Categoría" value={incidenteActivo.categoria.toUpperCase()} />
            <InfoRow label="Ubicación" value={incidenteActivo.ubicacion} />
            <InfoRow label="Descripción" value={incidenteActivo.descripcion || '—'} />
            <InfoRow
              label="Inicio"
              value={new Date(incidenteActivo.inicio).toLocaleString('es-EC')}
            />
            {incidenteActivo.simulacro && (
              <InfoRow
                label="Modo"
                value={<span className="text-yellow-400">🧪 Simulacro</span>}
              />
            )}
          </div>
        </div>
      )}

      {/* Protocolos recomendados */}
      <div className="bg-[#1a2027] border border-[#2d3748] rounded-lg p-4">
        <h3 className="text-white font-bold text-sm mb-3">
          📋 Protocolos de actuación recomendados
        </h3>
        <ProtocolosRecomendados categoria={incidenteActivo?.categoria} />
      </div>

      {/* Modal */}
      {modalAbierto && (
        <ModalNuevoIncidente onClose={() => setModalAbierto(false)} onDeclarar={handleDeclarar} />
      )}
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between gap-3 py-1 border-b border-[#2d3748]/50 last:border-0">
      <span className="text-slate-400 text-xs">{label}</span>
      <span className="text-slate-200 text-right text-xs">{value}</span>
    </div>
  );
}