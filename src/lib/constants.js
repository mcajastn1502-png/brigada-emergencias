/**
 * @typedef {'emergencia'|'rescatista'|'incendios'} RolBrigadista
 */

/** @type {Record<RolBrigadista, {nombre:string, color:string, icon:string}>} */
export const ROLES = {
  emergencia: { nombre: 'Emergencias', color: '#e63946', icon: '🚑' },
  rescatista: { nombre: 'Rescatista', color: '#2a9d8f', icon: '🧗' },
  incendios: { nombre: 'Anti-incendios', color: '#e76f51', icon: '🔥' },
};

export const TOUR_PASOS = [
  { id: 'paso1', titulo: '🗺️ Explora el mapa en vivo', irA: 'mapa' },
  // ...copia los 8 pasos tal cual desde el HTML
];

export const PROTOCOLOS = [
  // ...copia tal cual desde el HTML
];

export const PRIMEROS_AUXILIOS = [
  // ...copia tal cual desde el HTML
];

export const NORMAS = [
  // ...copia tal cual desde el HTML
];

export const FAQ_ITEMS = [
  // ...copia tal cual desde el HTML
];