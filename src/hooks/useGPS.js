import { useState, useRef, useCallback, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { latLonAXY, estaDentroBodega } from '@/lib/constants';

/**
 * Hook para rastrear la ubicación GPS del brigadista
 * @param {number} miembroId - ID del miembro que comparte ubicación
 */
export function useGPS(miembroId) {
  const [activo, setActivo] = useState(false);
  const [posicion, setPosicion] = useState(null);
  const [error, setError] = useState(null);
  const [ultimaActualizacion, setUltimaActualizacion] = useState(null);
  const [precision, setPrecision] = useState(null);
  const watchIdRef = useRef(null);
  const intervaloRef = useRef(null);

  // Verificar si el navegador soporta GPS
  const soportado = typeof navigator !== 'undefined' && 'geolocation' in navigator;

  // Actualizar Supabase con la nueva posición
  const actualizarSupabase = useCallback(
    async (lat, lon, precisionMetros) => {
      if (!miembroId) return { error: 'Sin miembro seleccionado' };

      const { x, y } = latLonAXY(lat, lon);
      const dentro = estaDentroBodega(lat, lon);

      const { error: err } = await supabase
        .from('miembros')
        .update({
          x,
          y,
          estado: dentro ? 'dentro' : 'alrededores',
          gps_activo: true,
          gps_ultima_actualizacion: new Date().toISOString(),
          gps_precision: precisionMetros,
          gps_latitud: lat,
          gps_longitud: lon,
        })
        .eq('id', miembroId);

      return { error: err };
    },
    [miembroId]
  );

  // Iniciar seguimiento
  const iniciar = useCallback(() => {
    if (!soportado) {
      setError('GPS no soportado en este dispositivo');
      return;
    }
    if (!miembroId) {
      setError('Selecciona un brigadista primero');
      return;
    }

    setActivo(true);
    setError(null);

    watchIdRef.current = navigator.geolocation.watchPosition(
      async (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        setPosicion({ lat: latitude, lon: longitude });
        setPrecision(accuracy);
        setUltimaActualizacion(new Date());
        setError(null);

        // Solo actualizar Supabase cada 15 segundos (para no saturar)
        const ahora = Date.now();
        if (!intervaloRef.current || ahora - intervaloRef.current > 5000) {
          intervaloRef.current = ahora;
          const { error: err } = await actualizarSupabase(latitude, longitude, accuracy);
          if (err) {
            console.error('❌ Error al guardar ubicación:', err);
            setError('Error al guardar ubicación en el servidor');
          }
        }
      },
      (err) => {
        console.error('❌ Error GPS:', err);
        let mensaje = 'Error de GPS';
        if (err.code === 1) mensaje = 'Permiso de ubicación denegado';
        else if (err.code === 2) mensaje = 'Ubicación no disponible';
        else if (err.code === 3) mensaje = 'Tiempo de espera agotado';
        setError(mensaje);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5000,
      }
    );
  }, [miembroId, soportado, actualizarSupabase]);

  // Detener seguimiento
  const detener = useCallback(async () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    intervaloRef.current = null;
    setActivo(false);
    setPosicion(null);
    setPrecision(null);
    setUltimaActualizacion(null);

    // Marcar como inactivo en Supabase
    if (miembroId) {
      await supabase.from('miembros').update({ gps_activo: false }).eq('id', miembroId);
    }
  }, [miembroId]);

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  return {
    soportado,
    activo,
    posicion,
    precision,
    ultimaActualizacion,
    error,
    iniciar,
    detener,
  };
}
