import { useState, useCallback, useRef } from 'react';

/**
 * @typedef {'success'|'error'|''} TipoToast
 * @typedef {{ id:number, mensaje:string, tipo:TipoToast }} ToastItem
 */

export function useToast() {
  /** @type {[ToastItem[], Function]} */
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  /** @param {string} mensaje @param {TipoToast} [tipo] */
  const toast = useCallback((mensaje, tipo = '') => {
    const id = ++idRef.current;
    setToasts((prev) => [...prev, { id, mensaje, tipo }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  }, []);

  return { toasts, toast };
}