import { useState, useRef, useEffect } from 'react';
import { useIncidentes } from '@/hooks/useIncidentes';
import { useToast } from '@/hooks/useToast';

const DURACION_MANTENER = 1500; // ms para "mantener presionado"

export default function BotonSOS() {
  const { incidenteActivo, declarar, finalizar } = useIncidentes();
  const { toast } = useToast();

  const [menuAbierto, setMenuAbierto] = useState(false);
  const [manteniendo, setManteniendo] = useState(false);
  const [progreso, setProgreso] = useState(0); // 0-100 para la barra de progreso
  const timerRef = useRef(null);
  const intervalRef = useRef(null);
  const mantenerCompletadoRef = useRef(false);

  // Limpiar timers al desmontar
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const iniciarMantener = (e) => {
    e?.preventDefault();
    // No hacer nada si hay incidente activo (en ese caso el botón finaliza con click)
    if (incidenteActivo) return;

    mantenerCompletadoRef.current = false;
    setManteniendo(true);
    setProgreso(0);

    const inicio = Date.now();
    intervalRef.current = setInterval(() => {
      const transcurrido = Date.now() - inicio;
      const p = Math.min((transcurrido / DURACION_MANTENER) * 100, 100);
      setProgreso(p);
    }, 50);

    timerRef.current = setTimeout(() => {
      mantenerCompletadoRef.current = true;
      declararEmergencia();
    }, DURACION_MANTENER);
  };

  const cancelarMantener = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setManteniendo(false);
    setProgreso(0);
  };

  const handleClick = () => {
    // Si venía de un "mantener presionado", no abrir menú
    if (mantenerCompletadoRef.current) {
      mantenerCompletadoRef.current = false;
      return;
    }

    // Si hay incidente activo → finalizar
    if (incidenteActivo) {
      handleFinalizar();
      return;
    }

    // Click corto normal → abrir/cerrar menú
    setMenuAbierto((prev) => !prev);
  };

  const declararEmergencia = async () => {
    cancelarMantener();
    if (incidenteActivo) {
      toast('⚠ Ya hay un incidente activo', 'error');
      return;
    }

    const confirmar = window.confirm(
      '🚨 ¿Declarar EMERGENCIA de brigada AHORA?\n\nSe notificará a todos los brigadistas.'
    );
    if (!confirmar) return;

    const { error } = await declarar({
      categoria: 'accidente',
      ubicacion: 'Emergencia declarada por SOS',
      descripcion: 'Botón SOS presionado - ubicación por confirmar',
      simulacro: false,
    });

    if (error) {
      toast('❌ Error al declarar emergencia', 'error');
      return;
    }

    toast('🚨 EMERGENCIA DECLARADA', 'error');
    setTimeout(() => toast('📲 Notificación enviada a todos los brigadistas', 'success'), 1000);
  };

  const handleFinalizar = async () => {
    if (!incidenteActivo) return;
    if (!window.confirm('¿Finalizar la emergencia actual?')) return;

    const { error } = await finalizar(incidenteActivo.id);
    if (error) {
      toast('❌ Error al finalizar', 'error');
      return;
    }
    toast('✓ Emergencia finalizada', 'success');
    setMenuAbierto(false);
  };

  const llamar911 = (tipo) => {
    setMenuAbierto(false);
    const mensajes = {
      'ecu-911': '📞 Llamando al ECU-911...',
      ambulancia: '🏥 Llamando a ambulancia...',
      bomberos: '🚒 Llamando a bomberos...',
    };
    toast(mensajes[tipo] || '📞 Llamando...', 'error');

    setTimeout(() => {
      if (window.confirm(`¿Confirmar llamada al ${tipo.toUpperCase()}?`)) {
        window.location.href = 'tel:911';
      }
    }, 500);
  };

  return (
    <>
      {/* Menú flotante */}
      {menuAbierto && !incidenteActivo && (
        <div
          className="fixed bottom-[115px] right-6 z-[999] bg-[#1a2027] border border-[#2d3748] rounded-xl p-2 min-w-[240px] shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-3 py-2 text-xs text-slate-400 border-b border-[#2d3748] mb-1">
            <div className="font-bold text-slate-300">Toque corto: opciones</div>
            <div className="mt-0.5">Mantener presionado: emergencia brigada</div>
          </div>
          <button
            onClick={() => llamar911('ecu-911')}
            className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-[#0f1419] text-red-400 font-bold text-sm transition flex items-center gap-2"
          >
            📞 Llamar al ECU-911
          </button>
          <button
            onClick={() => llamar911('ambulancia')}
            className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-[#0f1419] text-red-400 text-sm transition flex items-center gap-2"
          >
            🏥 Llamar ambulancia
          </button>
          <button
            onClick={() => llamar911('bomberos')}
            className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-[#0f1419] text-red-400 text-sm transition flex items-center gap-2"
          >
            🚒 Llamar bomberos
          </button>
          <div className="border-t border-[#2d3748] mt-1 pt-1">
            <button
              onClick={declararEmergencia}
              className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-red-500/10 text-red-500 font-bold text-sm transition flex items-center gap-2"
            >
              🚨 Declarar emergencia de brigada
            </button>
          </div>
        </div>
      )}

      {/* Botón SOS */}
      <button
        onMouseDown={iniciarMantener}
        onMouseUp={cancelarMantener}
        onMouseLeave={cancelarMantener}
        onTouchStart={iniciarMantener}
        onTouchEnd={cancelarMantener}
        onClick={handleClick}
        className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[1000] w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white font-bold shadow-2xl text-white select-none transition-all duration-200 flex flex-col items-center justify-center overflow-hidden ${
          incidenteActivo
            ? 'bg-red-600 animate-pulse scale-110'
            : manteniendo
              ? 'bg-red-700 scale-95'
              : 'bg-emergencia hover:scale-105'
        }`}
        style={{
          boxShadow: incidenteActivo
            ? '0 0 40px rgba(230, 57, 70, 0.9)'
            : '0 0 25px rgba(230, 57, 70, 0.6)',
        }}
        title={
          incidenteActivo
            ? 'Click para FINALIZAR emergencia'
            : 'Toque corto: opciones · Mantener: emergencia'
        }
      >
        {/* Barra de progreso circular (mantener presionado) */}
        {manteniendo && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#fff"
              strokeWidth="6"
              strokeOpacity="0.25"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#fff"
              strokeWidth="6"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progreso / 100)}`}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.05s linear' }}
            />
          </svg>
        )}

        {/* Icono y texto */}
        <span className="text-xl md:text-2xl leading-none relative z-10"></span>
        <span className="text-[8px] md:text-[10px] font-bold relative z-10 leading-tight mt-0.5">
          {incidenteActivo ? 'FINALIZAR' : manteniendo ? 'SUELTE' : 'SOS'}
        </span>
      </button>

      {/* Overlay para cerrar menú al hacer click afuera */}
      {menuAbierto && (
        <div className="fixed inset-0 z-[998]" onClick={() => setMenuAbierto(false)} />
      )}
    </>
  );
}
