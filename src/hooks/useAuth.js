import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

/**
 * @typedef {'visitante'|'brigadista'|'coordinador'} RolSesion
 */

export function useAuth() {
  /** @type {[RolSesion, Function]} */
  const [rol, setRol] = useState(/** @type {RolSesion} */ ('visitante'));

  useEffect(() => {
    const guardado = /** @type {RolSesion|null} */ (localStorage.getItem('brigada_rol'));
    if (guardado) setRol(guardado);
  }, []);

  /** @param {RolSesion} nuevo */
  const cambiarRol = (nuevo) => {
    setRol(nuevo);
    localStorage.setItem('brigada_rol', nuevo);
  };

  return { rol, cambiarRol };
}