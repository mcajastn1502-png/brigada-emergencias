/**
 * @typedef {'emergencia'|'rescatista'|'incendios'} RolBrigadista
 */

/** @type {Record<RolBrigadista, {nombre:string, color:string, icon:string}>} */
export const ROLES = {
  emergencia: { nombre: 'Emergencias', color: '#e63946', icon: '🚑' },
  rescatista: { nombre: 'Rescatista', color: '#2a9d8f', icon: '🧗' },
  incendios: { nombre: 'Anti-incendios', color: '#e76f51', icon: '🔥' },
};

/**
 * Protocolos de actuación por categoría de incidente
 */
export const PROTOCOLOS = [
  {
    id: 'incendio',
    titulo: '🔥 Protocolo de Incendio',
    categoria: 'incendio',
    rolAsignado: 'incendios',
    pasos: [
      {
        n: 1,
        txt: 'Dar aviso inmediato por radio o pulsando el botón SOS de brigada.',
        urgente: true,
      },
      {
        n: 2,
        txt: 'Evaluar magnitud del fuego. Si es pequeño, usar extintor (técnica P.A.S.S.).',
        urgente: true,
      },
      {
        n: 3,
        txt: 'P.A.S.S.: Pulsar la palanca, Apuntar a la base, Squeeze (presionar), Sweep (barrer en zigzag).',
      },
      { n: 4, txt: 'Cortar energía eléctrica y suministro de gas de la zona afectada.' },
      { n: 5, txt: 'Evacuar al personal por las salidas de emergencia.', urgente: true },
      { n: 6, txt: 'Reagrupar en el punto de encuentro y pasar lista.' },
      { n: 7, txt: 'Recibir a bomberos e informar ubicación y tipo de material en combustión.' },
      { n: 8, txt: 'NO reingresar hasta autorización de bomberos.' },
    ],
  },
  {
    id: 'rescate',
    titulo: '🧗 Protocolo de Rescate y Evacuación',
    categoria: 'rescate',
    rolAsignado: 'rescatista',
    pasos: [
      {
        n: 1,
        txt: 'Confirmar la ubicación exacta y el número de personas atrapadas.',
        urgente: true,
      },
      { n: 2, txt: 'Asegurar la escena: cortar energía, bloquear maquinaria, señalizar área.' },
      { n: 3, txt: 'Designar un jefe de rescate y asignar roles específicos.' },
      { n: 4, txt: 'Usar EPP adecuado: casco, guantes, arnés, botas de seguridad.' },
      { n: 5, txt: 'Establecer ruta de acceso y ruta de evacuación alterna.' },
      { n: 6, txt: 'Comunicar periódicamente avances por radio.' },
      { n: 7, txt: 'Trasladar a los rescatados a zona segura y aplicar primeros auxilios.' },
      { n: 8, txt: 'Registrar nombres y estado de los rescatados.' },
    ],
  },
  {
    id: 'derrame',
    titulo: '🧪 Protocolo de Derrame Químico',
    categoria: 'derrame',
    rolAsignado: 'emergencia',
    pasos: [
      { n: 1, txt: 'Alertar al personal cercano y evacuar la zona afectada.', urgente: true },
      { n: 2, txt: 'Identificar la sustancia usando la hoja de seguridad (MSDS).' },
      { n: 3, txt: 'Usar EPP químico: guantes, gafas, mascarilla, traje si es corrosivo.' },
      { n: 4, txt: 'Contener el derrame con material absorbente.' },
      { n: 5, txt: 'No usar agua si la sustancia reacciona violentamente con ella.' },
      { n: 6, txt: 'Ventilar el área si es un químico volátil.' },
      { n: 7, txt: 'Recoger residuos en contenedores etiquetados.' },
      { n: 8, txt: 'Reportar el incidente y registrar en bitácora.' },
    ],
  },
  {
    id: 'accidente',
    titulo: '🩹 Protocolo de Accidente Laboral',
    categoria: 'accidente',
    rolAsignado: 'emergencia',
    pasos: [
      { n: 1, txt: 'Verificar consciencia y respiración del accidentado.', urgente: true },
      { n: 2, txt: 'No mover a la persona si se sospecha lesión de columna.', urgente: true },
      { n: 3, txt: 'Llamar al 911 / ECU-911 inmediatamente.' },
      { n: 4, txt: 'Aplicar primeros auxilios según el tipo de lesión.' },
      { n: 5, txt: 'Contener hemorragias con presión directa si aplica.' },
      { n: 6, txt: 'Mantener a la persona abrigada y consciente hasta que llegue ayuda.' },
      { n: 7, txt: 'Registrar el incidente y notificar al coordinador.' },
      { n: 8, txt: 'Acompañar a la persona al centro médico.' },
    ],
  },
];

/**
 * Categorías de incidentes (para el modal)
 */
export const CATEGORIAS_INCIDENTE = [
  { value: 'incendio', label: '🔥 Incendio', rol: 'incendios' },
  { value: 'rescate', label: '🧗 Rescate / Evacuación', rol: 'rescatista' },
  { value: 'derrame', label: '🧪 Derrame químico', rol: 'emergencia' },
  { value: 'accidente', label: '🩹 Accidente laboral', rol: 'emergencia' },
];
/**
 * Protocolos de primeros auxilios con videos tutoriales
 * Los IDs de video son de YouTube (formato: https://www.youtube.com/watch?v=ID)
 */
export const PRIMEROS_AUXILIOS = [
  {
    id: 'rcp',
    titulo: '❤️ RCP (Reanimación Cardiopulmonar)',
    pasos: [
      {
        n: 1,
        txt: 'Verificar consciencia y respiración. Sacudir suavemente y preguntar "¿Está bien?".',
        urgente: true,
      },
      {
        n: 2,
        txt: 'Llamar al 911 / ECU-911 inmediatamente o pedir a alguien que lo haga.',
        urgente: true,
      },
      { n: 3, txt: 'Colocar a la persona boca arriba sobre superficie firme.' },
      {
        n: 4,
        txt: 'Colocar el talón de una mano en el centro del pecho, la otra encima, entrelazando dedos.',
      },
      {
        n: 5,
        txt: 'Comprimir fuerte y rápido: 30 compresiones a 100-120 por minuto, 5-6 cm de profundidad.',
      },
      {
        n: 6,
        txt: 'Inclinar la cabeza hacia atrás, levantar el mentón y dar 2 ventilaciones de 1 segundo.',
      },
      { n: 7, txt: 'Repetir ciclo 30:2 hasta que llegue ayuda o la persona reaccione.' },
      { n: 8, txt: 'Usar DEA (desfibrilador) si está disponible y seguir sus instrucciones.' },
    ],
    videos: [
      {
        id: '15uIXFQm8pE',
        titulo: '¿Sabes cómo realizar una RCP de forma adecuada?',
        canal: 'Pídeme',
        duracion: 'Short',
        nota: 'Demostración breve de RCP en formato vertical.',
        esShort: true,
      },
    ],
  },
  {
    id: 'hemorragia',
    titulo: '🩸 Control de Hemorragias',
    pasos: [
      {
        n: 1,
        txt: 'Colocarse guantes si es posible. Evitar contacto directo con sangre.',
        urgente: true,
      },
      {
        n: 2,
        txt: 'Aplicar presión directa sobre la herida con gasa o paño limpio.',
        urgente: true,
      },
      { n: 3, txt: 'No retirar el apósito si se empapa; añadir más encima y seguir presionando.' },
      { n: 4, txt: 'Elevar la extremidad por encima del nivel del corazón si es posible.' },
      {
        n: 5,
        txt: 'Si la hemorragia es masiva en extremidad, aplicar torniquete 5-7 cm por encima de la herida.',
      },
      { n: 6, txt: 'Anotar la hora de colocación del torniquete y no aflojarlo.' },
      { n: 7, txt: 'Cubrir con vendaje y trasladar a centro médico de inmediato.' },
    ],
    videos: [
      {
        id: 'p7UNkf-06EY',
        titulo: 'Control de Hemorragias',
        canal: 'Primeros Auxilios',
        duracion: 'Video',
        nota: 'Cómo controlar una hemorragia con presión directa y torniquete.',
      },
    ],
  },
  {
    id: 'fracturas',
    titulo: '🦴 Fracturas y Esguinces',
    pasos: [
      {
        n: 1,
        txt: 'No mover a la persona si se sospecha lesión de columna o cuello.',
        urgente: true,
      },
      { n: 2, txt: 'Inmovilizar la zona afectada en la posición encontrada.' },
      { n: 3, txt: 'Usar tablillas, cartón o revistas; acolchar con tela.' },
      {
        n: 4,
        txt: 'Aplicar frío local (hielo envuelto en tela) 15-20 min para reducir inflamación.',
      },
      { n: 5, txt: 'No intentar alinear el hueso ni masajear la zona.' },
      { n: 6, txt: 'Verificar circulación: temperatura, color y pulso distal.' },
      { n: 7, txt: 'Trasladar a centro médico para evaluación radiológica.' },
    ],
    videos: [
      {
        id: 'Hhg2HKiAN-o',
        titulo: 'Fracturas y Esguinces',
        canal: 'Primeros Auxilios',
        duracion: 'Video',
        nota: 'Cómo inmovilizar fracturas y tratar esguinces.',
      },
    ],
  },
  {
    id: 'quemaduras',
    titulo: '🔥 Quemaduras',
    pasos: [
      {
        n: 1,
        txt: 'Alejar a la persona de la fuente de calor y apagar ropa en llamas (rodar).',
        urgente: true,
      },
      { n: 2, txt: 'Enfriar la zona con agua corriente a temperatura ambiente 15-20 min.' },
      { n: 3, txt: 'No usar hielo, pasta dental, aceites ni remedios caseros.' },
      { n: 4, txt: 'No reventar ampollas. Cubrir con gasa estéril húmeda.' },
      { n: 5, txt: 'Retirar anillos, relojes o ropa que pueda comprimir por inflamación.' },
      { n: 6, txt: 'No retirar ropa adherida a la quemadura.' },
      {
        n: 7,
        txt: 'Trasladar a centro médico; quemaduras extensas o en cara/manos requieren urgencia.',
      },
    ],
    videos: [
      {
        id: 'cECkv6xUuTY',
        titulo: 'Quemaduras',
        canal: 'Primeros Auxilios',
        duracion: 'Video',
        nota: 'Tratamiento inicial de quemaduras según su grado.',
      },
    ],
  },
  {
    id: 'asfixia',
    titulo: '😰 Atragantamiento / Asfixia',
    pasos: [
      {
        n: 1,
        txt: 'Preguntar "¿Te estás atragantando?". Si tose con fuerza, animar a toser.',
        urgente: true,
      },
      {
        n: 2,
        txt: 'Si no puede toser, hablar ni respirar, aplicar 5 golpes entre los omóplatos.',
        urgente: true,
      },
      {
        n: 3,
        txt: 'Si no funciona, aplicar maniobra de Heimlich: puño sobre ombligo, comprimir hacia adentro y arriba.',
      },
      { n: 4, txt: 'Alternar 5 golpes en espalda y 5 compresiones abdominales.' },
      { n: 5, txt: 'Si pierde consciencia, iniciar RCP y llamar al 911.' },
      { n: 6, txt: 'En embarazadas o bebés, usar técnica adaptada (compresiones torácicas).' },
    ],
    videos: [
      {
        id: '2txGz7zLdHE',
        titulo: 'Atragantamiento / Asfixia',
        canal: 'Primeros Auxilios',
        duracion: 'Video',
        nota: 'Cómo desobstruir la vía aérea (maniobra de Heimlich).',
      },
    ],
  },
  {
    id: 'posicion-lateral',
    titulo: '🛌 Posición Lateral de Seguridad (PLS)',
    pasos: [
      { n: 1, txt: 'Aplicar solo si la persona respira y está inconsciente.', urgente: true },
      {
        n: 2,
        txt: 'Arrodillarse junto a la persona y colocar el brazo más cercano en ángulo recto.',
      },
      { n: 3, txt: 'Cruzar el otro brazo sobre el pecho, con la mano en la mejilla opuesta.' },
      { n: 4, txt: 'Levantar la rodilla más lejana y girar a la persona hacia usted.' },
      {
        n: 5,
        txt: 'Asegurar que la cabeza quede ligeramente inclinada hacia atrás para mantener vía aérea abierta.',
      },
      { n: 6, txt: 'Verificar respiración cada 2 minutos hasta que llegue ayuda.' },
    ],
    videos: [
      {
        id: 'cLA-g8mWal4',
        titulo: 'Posición Lateral de Seguridad (PLS)',
        canal: 'Primeros Auxilios',
        duracion: 'Video',
        nota: 'Paso a paso para colocar a una persona inconsciente que respira.',
      },
    ],
  },
];
/**
 * Normativa legal aplicable al funcionamiento de la bodega y la brigada
 */
export const NORMAS = [
  {
    id: 'ley-sst',
    categoria: 'laboral',
    titulo: 'Ley de Seguridad y Salud en el Trabajo',
    entidad: 'Ministerio del Trabajo · Ecuador',
    detalle:
      'Establece la obligación de conformar brigadas de emergencia en centros de trabajo con más de 10 trabajadores. Regula la prevención de riesgos laborales, la señalización de seguridad y la capacitación obligatoria del personal.',
    vigente: true,
  },
  {
    id: 'inen-2261',
    categoria: 'tecnico',
    titulo: 'Norma INEN 2261',
    entidad: 'INEN · Ecuador',
    detalle:
      'Señalización y demarcación de áreas de trabajo, rutas de evacuación y equipos contra incendios. Define los colores, formas y tamaños de las señales de seguridad obligatorias.',
    vigente: true,
  },
  {
    id: 'inen-2262',
    categoria: 'tecnico',
    titulo: 'Norma INEN 2262',
    entidad: 'INEN · Ecuador',
    detalle:
      'Requisitos para la gestión de emergencias y conformación de brigadas. Establece la estructura mínima de una brigada (jefe, coordinador y brigadistas) y sus responsabilidades.',
    vigente: true,
  },
  {
    id: 'iso-45001',
    categoria: 'seguridad',
    titulo: 'ISO 45001',
    entidad: 'ISO · Internacional',
    detalle:
      'Sistema de gestión de seguridad y salud en el trabajo. Estándar internacional que busca reducir lesiones y enfermedades laborales mediante la identificación y control de riesgos.',
    vigente: true,
  },
  {
    id: 'ecu-911',
    categoria: 'emergencias',
    titulo: 'Sistema Nacional de Emergencias ECU-911',
    entidad: 'Gobierno del Ecuador',
    detalle:
      'Coordina a bomberos, policía y ambulancias en situaciones de emergencia. La brigada debe estar articulada con el ECU-911 y reportar eventos por los canales oficiales.',
    vigente: true,
  },
  {
    id: 'cuerpo-bomberos',
    categoria: 'emergencias',
    titulo: 'Reglamento de Prevención de Incendios',
    entidad: 'Cuerpo de Bomberos local',
    detalle:
      'Requiere extintores, salidas de emergencia adecuadas, señalización luminosa, y la realización de simulacros periódicos. La brigada debe tener un plan de evacuación vigente.',
    vigente: true,
  },
  {
    id: 'codigo-trabajo',
    categoria: 'laboral',
    titulo: 'Código del Trabajo (Ecuador)',
    entidad: 'Congreso Nacional · Ecuador',
    detalle:
      'Art. 410 y ss. sobre riesgos laborales. Obliga al empleador a proveer un ambiente seguro de trabajo y a implementar medidas de prevención frente a riesgos específicos de la actividad.',
    vigente: true,
  },
  {
    id: 'acuerdo-1404',
    categoria: 'laboral',
    titulo: 'Acuerdo Ministerial 1404',
    entidad: 'Ministerio del Trabajo · Ecuador',
    detalle:
      'Reglamento de Seguridad y Salud en el Trabajo para la prevención de accidentes mayores. Aplica a actividades con almacenamiento de sustancias peligrosas.',
    vigente: true,
  },
  {
    id: 'iso-14001',
    categoria: 'seguridad',
    titulo: 'ISO 14001',
    entidad: 'ISO · Internacional',
    detalle:
      'Sistema de gestión ambiental. Relevante para el manejo de residuos (derrames químicos, aceites) que se generen durante las operaciones.',
    vigente: true,
  },
  {
    id: 'nfpa-10',
    categoria: 'emergencias',
    titulo: 'NFPA 10',
    entidad: 'NFPA · Internacional',
    detalle:
      'Norma estándar para la instalación y mantenimiento de extintores portátiles. Define los tipos de extintores según el tipo de fuego (A, B, C, D, K).',
    vigente: true,
  },
];

/**
 * Categorías de normas
 */
export const CATEGORIAS_NORMAS = [
  { value: 'todas', label: '📚 Todas' },
  { value: 'laboral', label: '⚖️ Laboral' },
  { value: 'seguridad', label: '🛡️ Seguridad' },
  { value: 'emergencias', label: '🚨 Emergencias' },
  { value: 'tecnico', label: '🔧 Técnico' },
];
/**
 * Pasos del tour guiado
 */
export const TOUR_PASOS = [
  {
    id: 'paso1',
    titulo: '🗺️ Explora el mapa en vivo',
    descripcion:
      'Ve a la pestaña <strong>Mapa en vivo</strong>. Verás los 12 brigadistas posicionados en el plano de la bodega con sus iniciales.',
    accion: 'Ir al mapa',
    irA: 'mapa',
  },
  {
    id: 'paso2',
    titulo: '👆 Haz clic en un brigadista',
    descripcion:
      'En el mapa, haz <strong>clic sobre cualquier brigadista</strong> para ver su información completa: teléfono, contacto de emergencia, tipo de sangre, etc.',
    accion: 'Probar ahora',
    irA: 'mapa',
  },
  {
    id: 'paso3',
    titulo: '👥 Revisa la pestaña Personal',
    descripcion:
      'Ve a <strong>👥 Personal</strong> para ver la lista completa de brigadistas con contadores por rol.',
    accion: 'Ir a Personal',
    irA: 'personal',
  },
  {
    id: 'paso4',
    titulo: '🚨 Declara un incidente',
    descripcion:
      'En <strong>🚨 Incidentes</strong>, pulsa <em>+ Declarar nuevo incidente</em>. El cronómetro arranca y se muestra el protocolo recomendado.',
    accion: 'Ir a Incidentes',
    irA: 'incidentes',
  },
  {
    id: 'paso5',
    titulo: '🧪 Usa modo simulacro',
    descripcion:
      'Al declarar un incidente, marca <strong>Modo simulacro</strong>. Ideal para entrenamientos sin alertar al ECU-911.',
    accion: 'Probar simulacro',
    irA: 'incidentes',
  },
  {
    id: 'paso6',
    titulo: '🚨 Domina el botón SOS',
    descripcion:
      'Toque corto → menú con opciones (911, ambulancia, bomberos). <strong>Mantener 1.5 s</strong> → emergencia inmediata a toda la brigada.',
    accion: 'Ver ahora',
    irA: 'ayuda',
    extra: 'sos',
  },
  {
    id: 'paso7',
    titulo: '🎥 Consulta los videos',
    descripcion:
      'En <strong>🩹 Primeros Auxilios</strong>, cada procedimiento tiene un video tutorial con su miniatura.',
    accion: 'Ver videos',
    irA: 'primeros',
  },
  {
    id: 'paso8',
    titulo: '📁 Audita el historial',
    descripcion:
      'Cambia a <strong>Coordinador</strong> (arriba derecha) y abre <strong>📁 Historial</strong>. Puedes filtrar, buscar y exportar a CSV.',
    accion: 'Ir a Historial',
    irA: 'historial',
  },
];

/**
 * Preguntas frecuentes
 */
export const FAQ_ITEMS = [
  {
    id: 'faq1',
    pregunta: '¿Qué hago si presiono SOS por error?',
    respuesta:
      'Ve a 🚨 Incidentes → pulsa <strong>✓ Finalizar incidente</strong> y reporta al coordinador. Quedará registrado como "falso positivo" en el historial.',
  },
  {
    id: 'faq2',
    pregunta: '¿La app funciona sin internet dentro de la bodega?',
    respuesta:
      'Parcialmente. Los datos se cargan desde Supabase, por lo que necesitas conexión para ver información actualizada. Los protocolos y primeros auxilios se pueden consultar si ya se cargaron previamente en el navegador.',
  },
  {
    id: 'faq3',
    pregunta: '¿Cómo agrego un brigadista nuevo?',
    respuesta:
      'Cambia a <strong>Coordinador</strong> → <strong>🪪 Miembros</strong> → <em>+ Agregar brigadista</em>. Rellena nombre, rol y datos de contacto.',
  },
  {
    id: 'faq4',
    pregunta: '¿Por qué mi ubicación en el mapa no es exacta?',
    respuesta:
      'La ubicación actual se asigna manualmente en la base de datos. En una futura versión se integrará GPS del celular con precisión de ±2 m.',
  },
  {
    id: 'faq5',
    pregunta: '¿Puedo probar todo sin afectar registros reales?',
    respuesta:
      'Sí. Marca <strong>Modo simulacro</strong> al declarar cualquier incidente. Los simulacros quedan registrados pero diferenciados en el historial.',
  },
  {
    id: 'faq6',
    pregunta: '¿Los videos de primeros auxilios son oficiales?',
    respuesta:
      'Provienen de YouTube y son material de apoyo. <strong>No sustituyen capacitación certificada</strong> de la Cruz Roja o bomberos.',
  },
  {
    id: 'faq7',
    pregunta: '¿Qué diferencia hay entre los 3 roles?',
    respuesta:
      '<strong>Visitante:</strong> solo lectura. <strong>Brigadista:</strong> puede declarar incidentes y ver el mapa. <strong>Coordinador:</strong> acceso total (miembros, historial, eliminar registros).',
  },
  {
    id: 'faq8',
    pregunta: '¿Con qué frecuencia se actualiza la app?',
    respuesta:
      'Cada vez que se hace push a GitHub, el deploy es automático. Puedes verificar la versión más reciente recargando con Ctrl+Shift+R.',
  },
];

/**
 * Mejoras integradas en esta versión
 */
export const MEJORAS = [
  { icono: '🧪', nombre: 'Modo simulacro', estado: 'activo' },
  { icono: '🎯', nombre: 'Asignación automática de equipo', estado: 'activo' },
  { icono: '📊', nombre: 'Realtime con Supabase', estado: 'activo' },
  { icono: '👤', nombre: 'Roles diferenciados', estado: 'activo' },
  { icono: '🔔', nombre: 'Toasts de retroalimentación', estado: 'activo' },
  { icono: '🚨', nombre: 'SOS escalonado (corto/mantener)', estado: 'activo' },
  { icono: '🎥', nombre: 'Videos tutoriales', estado: 'activo' },
  { icono: '📁', nombre: 'Historial con exportación CSV', estado: 'activo' },
  { icono: '🗺️', nombre: 'Mapa arquitectónico horizontal', estado: 'activo' },
  { icono: '🎙️', nombre: 'Modo Manos Libres por voz', estado: 'pendiente' },
  { icono: '📷', nombre: 'QR/NFC para check-in', estado: 'fase2' },
  { icono: '📡', nombre: 'GPS en tiempo real', estado: 'fase2' },
];

/**
 * Tabla de roles para la pestaña Ayuda
 */
export const ROLES_TABLA = [
  {
    rol: 'emergencia',
    cantidad: 4,
    responsabilidad: 'Atención inicial, evaluación médica, comunicación con ECU-911',
    prioridad: 'Derrames, accidentes',
  },
  {
    rol: 'rescatista',
    cantidad: 4,
    responsabilidad: 'Evacuación, rescate de personas, rutas seguras',
    prioridad: 'Rescates, evacuaciones',
  },
  {
    rol: 'incendios',
    cantidad: 4,
    responsabilidad: 'Control de fuego, uso de extintores, corte de energía',
    prioridad: 'Incendios, explosiones',
  },
];
/**
 * Coordenadas de referencia de la bodega
 * ⚠️ IMPORTANTE: ajustar con las coordenadas reales
 *
 * Esquina NW = arriba-izquierda del SVG (x=60, y=100)
 * Esquina SE = abajo-derecha del SVG (x=1444, y=870)
 */
/**
 * Coordenadas reales de las 4 esquinas de la bodega (Google Maps)
 * Orden: NW (arriba-izq), NE (arriba-der), SW (abajo-izq), SE (abajo-der)
 */
export const BODEGA_REF = {
  nw: { lat: -0.112451, lon: -78.473528, x: 60, y: 100 }, // Noroeste
  ne: { lat: -0.112478, lon: -78.473315, x: 1444, y: 100 }, // Noreste
  sw: { lat: -0.113064, lon: -78.4736, x: 60, y: 870 }, // Suroeste
  se: { lat: -0.113107, lon: -78.473347, x: 1444, y: 870 }, // Sureste
};

/**
 * Convertir lat/lon a coordenadas del SVG usando transformación bilineal
 * Maneja correctamente la bodega aunque esté ligeramente rotada.
 */
export function latLonAXY(lat, lon) {
  const { nw, ne, sw } = BODEGA_REF;

  // Calcular progreso horizontal (u) y vertical (v) aproximados
  // Usamos los vectores desde NW.
  // Vector horizontal (Oeste -> Este)
  const vectorEste = { lat: ne.lat - nw.lat, lon: ne.lon - nw.lon };
  // Vector vertical (Norte -> Sur)
  const vectorSur = { lat: sw.lat - nw.lat, lon: sw.lon - nw.lon };

  // Proyectar el punto actual en los ejes
  // Para simplificar en distancias geográficas locales, multiplicamos lat por un factor (111320)
  // y lon por otro (111250) para que sean aproximadamente "metros".
  const latM = lat * 111320;
  const lonM = lon * 111250;
  const nwLatM = nw.lat * 111320;
  const nwLonM = nw.lon * 111250;

  const dx = lonM - nwLonM;
  const dy = latM - nwLatM;

  const vx = vectorEste.lon * 111250;
  const vy = vectorEste.lat * 111320;

  const wx = vectorSur.lon * 111250;
  const wy = vectorSur.lat * 111320;

  // Resolver sistema de ecuaciones para obtener u (0 a 1) y v (0 a 1)
  // dx = u * vx + v * wx
  // dy = u * vy + v * wy
  const det = vx * wy - vy * wx;

  let u = 0;
  let v = 0;

  if (Math.abs(det) > 0.0001) {
    u = (dx * wy - dy * wx) / det;
    v = (vx * dy - vy * dx) / det;
  }

  // Convertir u, v a coordenadas del SVG
  const x = nw.x + u * (ne.x - nw.x);
  const y = nw.y + v * (sw.y - nw.y);

  // Limitar a los bordes del SVG para que no se salga
  return {
    x: Math.max(60, Math.min(1444, x)),
    y: Math.max(100, Math.min(870, y)),
  };
}

/**
 * Calcular distancia entre 2 coordenadas (en metros)
 * Fórmula de Haversine
 */
export function distanciaMetros(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Radio de la Tierra en metros
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

/**
 * Determina si la ubicación está dentro de la bodega considerando el radio de
 * precisión reportado por el GPS. Devuelve null cuando el radio cruza el
 * perímetro y no es posible confirmar si la persona está dentro o fuera.
 * @returns {boolean|null}
 */
export function estaDentroBodega(lat, lon, precisionMetros = 0) {
  if (
    !Number.isFinite(lat) ||
    !Number.isFinite(lon) ||
    !Number.isFinite(precisionMetros) ||
    precisionMetros < 0 ||
    lat < -90 ||
    lat > 90 ||
    lon < -180 ||
    lon > 180
  ) {
    return null;
  }

  const { nw, ne, sw, se } = BODEGA_REF;
  const vertices = [nw, ne, se, sw];
  const latReferencia = vertices.reduce((suma, punto) => suma + punto.lat, 0) / vertices.length;
  const lonReferencia = vertices.reduce((suma, punto) => suma + punto.lon, 0) / vertices.length;
  const metrosPorGradoLon = 111320 * Math.cos((latReferencia * Math.PI) / 180);

  const proyectar = (punto) => ({
    x: (punto.lon - lonReferencia) * metrosPorGradoLon,
    y: (punto.lat - latReferencia) * 111320,
  });

  const punto = proyectar({ lat, lon });
  const poligono = vertices.map(proyectar);
  let dentro = false;
  let distanciaMinima = Infinity;

  for (let i = 0, j = poligono.length - 1; i < poligono.length; j = i++) {
    const a = poligono[j];
    const b = poligono[i];
    const cruza =
      (a.y > punto.y) !== (b.y > punto.y) &&
      punto.x < ((b.x - a.x) * (punto.y - a.y)) / (b.y - a.y) + a.x;
    if (cruza) dentro = !dentro;

    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const longitudCuadrada = dx * dx + dy * dy;
    const t =
      longitudCuadrada === 0
        ? 0
        : Math.max(
            0,
            Math.min(1, ((punto.x - a.x) * dx + (punto.y - a.y) * dy) / longitudCuadrada)
          );
    const distancia = Math.hypot(punto.x - (a.x + t * dx), punto.y - (a.y + t * dy));
    distanciaMinima = Math.min(distanciaMinima, distancia);
  }

  if (distanciaMinima <= precisionMetros) return null;
  return dentro;
}
