import { useState } from 'react';
import { useGPS } from '@/hooks/useGPS';
import SelectorBrigadista from './SelectorBrigadista';

/**
 * Botón flotante para compartir ubicación GPS
 */
export default function BotonGPS({ miembros }) {
  const [miembroSeleccionado, setMiembroSeleccionado] = useState(null);
  const [mostrarSelector, setMostrarSelector] = useState(false);

  const { soportado, activo, precision, error, iniciar, detener } = useGPS(
    miembroSeleccionado?.id
  );

  const handleClick = () => {
    if (activo) {
      detener();
    } else if (!miembroSeleccionado) {
      setMostrarSelector(true);
    } else {
      iniciar();
    }
  };

  const handleSeleccionar = (miembro) => {
    setMiembroSeleccionado(miembro);
    setMostrarSelector(false);
    // Iniciar GPS después de un pequeño delay (para que el estado se propague)
    setTimeout(() => iniciar(), 300);
  };

  const handleCambiarBrigadista = () => {
    if (activo) detener();
    setMiembroSeleccionado(null);
    setMostrarSelector(true);
  };

  if (!soportado) {
    return null; // No mostrar si el dispositivo no soporta GPS
  }

  return (
    <>
      {/* Botón flotante */}
      <div className="fixed bottom-4 right-24 md:right-32 z-[999] flex flex-col items-end gap-2">
        {/* Indicador de brigadista seleccionado (si activo) */}
        {miembroSeleccionado && activo && (
          <div className="bg-[#1a2027]/95 border border-[#2d3748] rounded-lg px-3 py-2 text-xs backdrop-blur-sm shadow-lg">
            <div className="text-white font-bold text-[10px]">
              {miembroSeleccionado.nombre}
            </div>
            {precision !== null && (
              <div className="text-slate-400 text-[10px]">Precisión: ±{Math.round(precision)} m</div>
            )}
          </div>
        )}

        {/* Botón principal */}
        <button
          onClick={handleClick}
          className={`w-14 h-14 md:w-16 md:h-16 rounded-full border-4 border-white font-bold shadow-2xl text-white flex flex-col items-center justify-center transition-all ${
            activo
              ? 'bg-green-600 animate-pulse scale-110'
              : error
                ? 'bg-red-600 hover:scale-105'
                : 'bg-blue-600 hover:scale-105'
          }`}
          title={
            activo
              ? 'Detener GPS'
              : error
                ? 'Reintentar GPS'
                : miembroSeleccionado
                  ? 'Iniciar GPS'
                  : 'Compartir ubicación'
          }
        >
          <span className="text-xl md:text-2xl leading-none">
            {activo ? '🟢' : error ? '⚠️' : '📍'}
          </span>
          <span className="text-[7px] md:text-[8px] font-bold leading-tight mt-0.5">
            {activo ? 'ACTIVO' : error ? 'ERROR' : 'GPS'}
          </span>
        </button>

        {/* Cambiar brigadista (si ya hay uno seleccionado) */}
        {miembroSeleccionado && !activo && (
          <button
            onClick={handleCambiarBrigadista}
            className="text-[10px] text-slate-400 hover:text-white bg-[#1a2027]/95 border border-[#2d3748] rounded px-2 py-1 backdrop-blur-sm"
          >
            Cambiar
          </button>
        )}
      </div>

      {/* Modal selector */}
      {mostrarSelector && (
        <SelectorBrigadista
          miembros={miembros}
          onSeleccionar={handleSeleccionar}
          onCerrar={() => setMostrarSelector(false)}
        />
      )}

      {/* Mensaje de error */}
      {error && (
        <div className="fixed bottom-24 right-24 md:right-32 z-[999] bg-red-600 text-white px-3 py-2 rounded-lg text-xs max-w-xs shadow-xl">
          ⚠ {error}
        </div>
      )}
    </>
  );
}