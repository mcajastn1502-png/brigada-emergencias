export default function ModalBrigadista({ miembro, onClose, onToggle }) {
  const colores = {
    emergencia: 'from-red-500 to-red-700',
    rescatista: 'from-teal-500 to-teal-700',
    incendios: 'from-orange-500 to-orange-700',
  };
  const roles = {
    emergencia: '🚑 Emergencias',
    rescatista: '🧗 Rescatista',
    incendios: '🔥 Anti-incendios',
  };

  const iniciales = (() => {
    if (!miembro.nombre) return '?';
    const preposiciones = ['de', 'del', 'la', 'las', 'los', 'y', 'van', 'von', 'da', 'dos'];
    const palabras = miembro.nombre
      .trim()
      .split(/\s+/)
      .filter((p) => p.length > 0 && !preposiciones.includes(p.toLowerCase()));
    if (palabras.length >= 2) {
      return (palabras[0][0] + palabras[1][0]).toUpperCase();
    }
    return miembro.nombre.substring(0, 2).toUpperCase();
  })();

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center p-3 md:p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#1a2027] border border-[#2d3748] rounded-xl w-full max-w-sm md:max-w-md max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`bg-gradient-to-r ${colores[miembro.rol]} p-4 flex items-center gap-3`}>
          <div className="w-14 h-14 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
            {iniciales}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-white font-bold text-base truncate">{miembro.nombre}</h2>
            <p className="text-white/90 text-xs">{roles[miembro.rol]}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-2xl leading-none flex-shrink-0 w-8 h-8 flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Info */}
        <div className="p-4 space-y-2 text-sm">
          <Row icon="📍" label="Estado actual">
            <span
              className={`px-2 py-0.5 rounded text-xs font-bold ${
                miembro.estado === 'indeterminado'
                  ? 'bg-purple-500/20 text-purple-300'
                  : miembro.estado === 'dentro'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-yellow-500/20 text-yellow-400'
              }`}
            >
              {miembro.estado === 'indeterminado'
                ? '🟣 Ubicación imprecisa'
                : miembro.estado === 'dentro'
                  ? '🟢 Dentro'
                  : '🟡 Alrededores'}
            </span>
          </Row>

          {miembro.gps_precision !== null && miembro.gps_precision !== undefined && (
            <Row icon="🎯" label="Precisión GPS">
              <span className="text-slate-300 text-xs">±{Math.round(miembro.gps_precision)} m</span>
            </Row>
          )}

          <Row icon="📞" label="Teléfono">
            {miembro.telefono ? (
              <a href={`tel:${miembro.telefono}`} className="text-blue-400 hover:underline text-xs">
                {miembro.telefono}
              </a>
            ) : (
              <span className="text-slate-500 text-xs">No registrado</span>
            )}
          </Row>

          <Row icon="🚨" label="Emergencia">
            {miembro.telefono_emergencia ? (
              <a
                href={`tel:${miembro.telefono_emergencia}`}
                className="text-red-400 hover:underline text-xs"
              >
                {miembro.telefono_emergencia}
              </a>
            ) : (
              <span className="text-slate-500 text-xs">No registrado</span>
            )}
          </Row>

          <Row icon="👥" label="Contacto">
            <span className="text-slate-300 text-xs text-right">
              {miembro.contacto_emergencia || 'No registrado'}
            </span>
          </Row>

          <Row icon="🩸" label="Tipo de sangre">
            <span className="text-red-400 font-bold text-xs">{miembro.tipo_sangre || '—'}</span>
          </Row>

          <Row icon="✉️" label="Email">
            <span className="text-slate-300 text-xs truncate max-w-[180px]">
              {miembro.email || 'No registrado'}
            </span>
          </Row>

          <Row icon="🆔" label="ID">
            <span className="text-slate-400 font-mono text-xs">#{miembro.id}</span>
          </Row>
        </div>

        {/* Acciones */}
        <div className="p-3 border-t border-[#2d3748] flex gap-2 sticky bottom-0 bg-[#1a2027]">
          <button
            onClick={onToggle}
            className={`flex-1 py-2.5 rounded-lg font-bold text-sm transition ${
              miembro.estado === 'dentro'
                ? 'bg-yellow-500 hover:bg-yellow-600 text-black'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {miembro.estado === 'dentro' ? '↑ Marcar salida' : '↓ Marcar entrada'}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-lg border border-[#2d3748] text-slate-300 hover:bg-[#252d38] text-sm"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({ icon, label, children }) {
  return (
    <div className="flex items-center justify-between gap-2 py-1.5 border-b border-[#2d3748]/50 last:border-0">
      <span className="text-slate-400 text-xs flex items-center gap-1.5 flex-shrink-0">
        <span>{icon}</span>
        {label}
      </span>
      <span className="text-right min-w-0 truncate">{children}</span>
    </div>
  );
}
