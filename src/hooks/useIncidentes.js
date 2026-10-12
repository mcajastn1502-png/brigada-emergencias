import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

/**
 * @typedef {Object} Incidente
 * @property {number} id
 * @property {'incendio'|'rescate'|'derrame'|'accidente'} categoria
 * @property {string} [ubicacion]
 * @property {string} [descripcion]
 * @property {number} [x]
 * @property {number} [y]
 * @property {boolean} simulacro
 * @property {string} inicio
 * @property {string} [fin]
 * @property {number} [duracion_seg]
 */

export function useIncidentes() {
  /** @type {[Incidente[], Function]} */
  const [incidentes, setIncidentes] = useState([]);
  /** @type {[Incidente|null, Function]} */
  const [incidenteActivo, setIncidenteActivo] = useState(null);
  const [loading, setLoading] = useState(true);

  const cargar = useCallback(async () => {
    const { data, error } = await supabase
      .from('incidentes')
      .select('*')
      .order('inicio', { ascending: false });

    if (error) {
      console.error('❌ Error al cargar incidentes:', error);
    } else {
      setIncidentes(data ?? []);
      // El incidente activo es el que no tiene "fin"
      const activo = (data ?? []).find((i) => !i.fin);
      setIncidenteActivo(activo ?? null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    cargar();

    // ⭐ Canal único por instancia del hook (evita colisiones cuando se usa en múltiples componentes)
    const nombreCanal = `incidentes-realtime-${Math.random().toString(36).slice(2, 10)}`;
    const canal = supabase
      .channel(nombreCanal)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'incidentes' }, () => {
        cargar();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(canal);
    };
  }, [cargar]);

  /**
   * Declarar un nuevo incidente
   * @param {{
   *   categoria: 'incendio'|'rescate'|'derrame'|'accidente',
   *   ubicacion: string,
   *   descripcion: string,
   *   simulacro: boolean
   * }} datos
   */
  const declarar = useCallback(async (datos) => {
    // Coordenadas por categoría (dentro del layout)
    const ubicaciones = {
      incendio: { x: 700, y: 400 },
      rescate: { x: 900, y: 400 },
      derrame: { x: 500, y: 400 },
      accidente: { x: 800, y: 600 },
    };

    const coord = ubicaciones[datos.categoria] || { x: 750, y: 400 };

    const { data, error } = await supabase
      .from('incidentes')
      .insert({
        categoria: datos.categoria,
        ubicacion: datos.ubicacion || 'No especificada',
        descripcion: datos.descripcion || 'Sin descripción',
        simulacro: datos.simulacro ?? false,
        x: coord.x,
        y: coord.y,
        inicio: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('❌ Error al declarar incidente:', error);
      return { error };
    }

    setIncidenteActivo(data);
    return { data };
  }, []);

  /**
   * Finalizar el incidente activo
   * @param {number} id
   */
  const finalizar = useCallback(
    async (id) => {
      const activo = incidenteActivo;
      if (!activo) return { error: 'No hay incidente activo' };

      const fin = new Date();
      const duracion = Math.floor((fin.getTime() - new Date(activo.inicio).getTime()) / 1000);

      const { data, error } = await supabase
        .from('incidentes')
        .update({
          fin: fin.toISOString(),
          duracion_seg: duracion,
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('❌ Error al finalizar:', error);
        return { error };
      }

      setIncidenteActivo(null);
      return { data };
    },
    [incidenteActivo]
  );
  /**
   * Elimina un incidente del historial
   * @param {number} id
   */
  const eliminarIncidente = useCallback(async (id) => {
    const { error } = await supabase.from('incidentes').delete().eq('id', id);
    if (error) {
      console.error('❌ Error al eliminar incidente:', error);
      return { error };
    }
    return { success: true };
  }, []);

  return {
    incidentes,
    incidenteActivo,
    loading,
    declarar,
    finalizar,
    eliminarIncidente,
    recargar: cargar,
  };
}
