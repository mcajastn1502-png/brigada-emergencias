import { useState, useEffect } from 'react';

/**
 * Cronómetro en vivo desde una fecha de inicio.
 * Se resetea a 00:00:00 cuando `activo` es false.
 * @param {{ inicio: string, activo?: boolean }} props
 */
export default function Cronometro({ inicio, activo = true }) {
  const [tiempo, setTiempo] = useState(0);

  useEffect(() => {
    // ⭐ Si no está activo, RESETEAR a 0
    if (!activo || !inicio) {
      setTiempo(0);
      return;
    }

    const calcular = () => {
      const t = Math.floor((Date.now() - new Date(inicio).getTime()) / 1000);
      setTiempo(t);
    };

    calcular();
    const intervalo = setInterval(calcular, 1000);
    return () => clearInterval(intervalo);
  }, [inicio, activo]);

  const h = String(Math.floor(tiempo / 3600)).padStart(2, '0');
  const m = String(Math.floor((tiempo % 3600) / 60)).padStart(2, '0');
  const s = String(tiempo % 60).padStart(2, '0');

  return (
    <div
      className={`font-mono text-4xl md:text-5xl font-bold text-center py-4 ${
        activo ? 'text-red-500 animate-pulse' : 'text-slate-500'
      }`}
      style={{
        textShadow: activo ? '0 0 20px rgba(230, 57, 70, 0.5)' : 'none',
      }}
    >
      {h}:{m}:{s}
    </div>
  );
}
