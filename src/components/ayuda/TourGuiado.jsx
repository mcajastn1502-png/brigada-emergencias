import { useState, useEffect } from 'react';
import { TOUR_PASOS } from '@/lib/constants';

const STORAGE_KEY = 'brigada_tour_progreso';

export default function TourGuiado({ onNavegar }) {
  const [completados, setCompletados] = useState([]);

  // Cargar progreso desde localStorage
  useEffect(() => {
    try {
      const guardados = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      setCompletados(guardados);
    } catch (e) {
      console.error('Error al cargar progreso del tour:', e);
    }
  }, []);

  // Guardar progreso
  const guardarProgreso = (nuevos) => {
    setCompletados(nuevos);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevos));
    } catch (e) {
      console.error('Error al guardar progreso:', e);
    }
  };

  const marcarCompletado = (pasoId) => {
    if (completados.includes(pasoId)) return;
    guardarProgreso([...completados, pasoId]);
  };

  const desmarcarCompletado = (pasoId) => {
    guardarProgreso(completados.filter((id) => id !== pasoId));
  };

  const reiniciarTour = () => {
    if (!window.confirm('¿Reiniciar el progreso del tour?')) return;
    guardarProgreso([]);
  };

  const ejecutarAccion = (paso) => {
    if (paso.irA && onNavegar) {
      onNavegar(paso.irA);
    }
    marcarCompletado(paso.id);
  };

  const total = TOUR_PASOS.length;
  const completados_count = completados.length;
  const porcentaje = Math.round((completados_count / total) * 100);

  return (
    <div className="space-y-4">
      {/* Barra de progreso */}
      <div className="bg-[#1a2027] border border-[#2d3748] rounded-lg p-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 flex-1 min-w-[200px]">
            <span className="text-xs text-slate-400 whitespace-nowrap font-bold">
              Progreso del tour:
            </span>
            <div className="flex-1 h-2.5 bg-[#0f1419] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500"
                style={{ width: `${porcentaje}%` }}
              />
            </div>
            <span className="text-sm font-bold text-white whitespace-nowrap">
              {completados_count} / {total}
            </span>
          </div>
          <button
            onClick={reiniciarTour}
            className="px-3 py-1.5 rounded-lg border border-[#2d3748] text-slate-300 hover:bg-[#252d38] text-xs transition"
          >
            ↺ Reiniciar
          </button>
        </div>
      </div>

      {/* Pasos */}
      <div className="space-y-2">
        {TOUR_PASOS.map((paso, i) => {
          const completado = completados.includes(paso.id);
          return (
            <div
              key={paso.id}
              className={`bg-[#1a2027] border rounded-lg p-4 transition ${
                completado
                  ? 'border-green-500/50 opacity-70'
                  : 'border-[#2d3748] hover:border-blue-500/50'
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Número */}
                <div
                  className={`w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-sm ${
                    completado ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
                  }`}
                >
                  {completado ? '✓' : i + 1}
                </div>

                {/* Contenido */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-white text-sm">{paso.titulo}</h4>
                  <p
                    className="text-xs text-slate-400 mt-1 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: paso.descripcion }}
                  />

                  <div className="flex gap-2 mt-3 flex-wrap">
                    <button
                      onClick={() => ejecutarAccion(paso)}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition"
                    >
                      {paso.accion} →
                    </button>
                    {completado ? (
                      <button
                        onClick={() => desmarcarCompletado(paso.id)}
                        className="px-3 py-1.5 rounded-lg border border-green-500/50 text-green-400 hover:bg-green-500/10 text-xs transition"
                      >
                        ✓ Completado (desmarcar)
                      </button>
                    ) : (
                      <button
                        onClick={() => marcarCompletado(paso.id)}
                        className="px-3 py-1.5 rounded-lg border border-[#2d3748] text-slate-400 hover:bg-[#252d38] text-xs transition"
                      >
                        Marcar como completado
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Felicitación */}
      {completados_count === total && (
        <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/50 rounded-lg p-5 text-center">
          <div className="text-5xl mb-2">🎉</div>
          <h3 className="text-white font-bold text-lg">¡Tour completado!</h3>
          <p className="text-sm text-slate-300 mt-1">
            Ya conoces todas las funcionalidades de la app. ¡Bienvenido a la brigada!
          </p>
        </div>
      )}
    </div>
  );
}
