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

    const canal = supabase
      .channel('miembros-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'miembros' }, (payload) => {
        if (payload.eventType === 'INSERT') setMiembros((prev) => [...prev, payload.new]);
        if (payload.eventType === 'UPDATE')
          setMiembros((prev) => prev.map((m) => (m.id === payload.new.id ? payload.new : m)));
        if (payload.eventType === 'DELETE')
          setMiembros((prev) => prev.filter((m) => m.id !== payload.old.id));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(canal);
    };
  }, [cargar]);

  /** @param {number} id */
  const toggleEstado = useCallback(async (id) => {
    const m = miembros.find((x) => x.id === id);
    if (!m) return;
    const nuevo = m.estado === 'dentro' ? 'alrededores' : 'dentro';
    await supabase.from('miembros').update({ estado: nuevo }).eq('id', id);
  }, [miembros]);

  return { miembros, loading, toggleEstado, recargar: cargar };
}