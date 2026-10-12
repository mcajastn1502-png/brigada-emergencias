import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

/**
 * @typedef {Object} Miembro
 * @property {number} id
 * @property {string} nombre
 * @property {'emergencia'|'rescatista'|'incendios'} rol
 * @property {'dentro'|'alrededores'} estado
 * @property {string} iniciales
 * @property {boolean} activo
 * @property {number} x
 * @property {number} y
 * @property {number} [x_fuera]
 * @property {number} [y_fuera]
 * @property {string} [telefono]
 * @property {string} [telefono_emergencia]
 * @property {string} [contacto_emergencia]
 * @property {string} [tipo_sangre]
 * @property {string} [email]
 */

export function useMiembros() {
  /** @type {[Miembro[], Function]} */
  const [miembros, setMiembros] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargar = useCallback(async () => {
    const { data, error } = await supabase.from('miembros').select('*').order('id');
    if (error) console.error(error);
    else setMiembros(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    cargar();

    const nombreCanal = `miembros-realtime-${Math.random().toString(36).slice(2, 10)}`;
    const canal = supabase
      .channel(nombreCanal)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'miembros' }, (payload) => {
        // ...
      })
      .subscribe();

    return () => {
      supabase.removeChannel(canal);
    };
  }, [cargar]);

  /** Cambia el estado (dentro ↔ alrededores) */
  const toggleEstado = useCallback(
    async (id) => {
      const m = miembros.find((x) => x.id === id);
      if (!m) return;

      const nuevo = m.estado === 'dentro' ? 'alrededores' : 'dentro';

      setMiembros((prev) => prev.map((x) => (x.id === id ? { ...x, estado: nuevo } : x)));

      const { error } = await supabase.from('miembros').update({ estado: nuevo }).eq('id', id);

      if (error) {
        console.error('❌ Error al actualizar miembro:', error);
        setMiembros((prev) => prev.map((x) => (x.id === id ? { ...x, estado: m.estado } : x)));
      }
    },
    [miembros]
  );

  /** Actualiza un miembro completo */
  const actualizarMiembro = useCallback(async (id, cambios) => {
    const { data, error } = await supabase
      .from('miembros')
      .update(cambios)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('❌ Error al actualizar:', error);
      return { error };
    }
    return { data };
  }, []);

  /** Crea un nuevo miembro */
  const crearMiembro = useCallback(async (nuevo) => {
    const { data, error } = await supabase.from('miembros').insert(nuevo).select().single();
    if (error) {
      console.error('❌ Error al crear:', error);
      return { error };
    }
    return { data };
  }, []);

  /** Inactiva / reactiva un miembro */
  const toggleActivo = useCallback(
    async (id) => {
      const m = miembros.find((x) => x.id === id);
      if (!m) return;

      const nuevo = !m.activo;
      setMiembros((prev) => prev.map((x) => (x.id === id ? { ...x, activo: nuevo } : x)));

      const { error } = await supabase.from('miembros').update({ activo: nuevo }).eq('id', id);

      if (error) {
        console.error('❌ Error al cambiar activo:', error);
        setMiembros((prev) => prev.map((x) => (x.id === id ? { ...x, activo: m.activo } : x)));
      }
    },
    [miembros]
  );

  /** Elimina un miembro permanentemente */
  const eliminarMiembro = useCallback(async (id) => {
    const { error } = await supabase.from('miembros').delete().eq('id', id);
    if (error) {
      console.error('❌ Error al eliminar:', error);
      return { error };
    }
    return { success: true };
  }, []);

  return {
    miembros,
    loading,
    toggleEstado,
    actualizarMiembro,
    crearMiembro,
    toggleActivo,
    eliminarMiembro,
    recargar: cargar,
  };
}
