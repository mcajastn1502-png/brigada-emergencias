import { ROLES } from '@/lib/constants';

/**
 * @param {{ rol: string, onChangeRol: (r:any)=>void, sistemaAlerta?: boolean }} props
 */
export default function Header({ rol, onChangeRol, sistemaAlerta = false }) {
  return (
    <header className="bg-panel border-b border-borderDark px-3 md:px-5 py-2 md:py-2.5 flex justify-between items-center gap-2 md:gap-3 z-50">
      {/* Logo y título */}
      <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-shrink">
        <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-gradient-to-br from-emergencia to-incendios flex items-center justify-center text-lg md:text-xl flex-shrink-0">
          🚨
        </div>
        <div className="min-w-0">
          <div className="font-bold text-sm md:text-base truncate">Brigada de Emergencias</div>
          <div className="text-[10px] md:text-xs text-slate-400 truncate">
            Bodega Central · ECU-911
          </div>
        </div>
      </div>

      {/* Estado + Selector */}
      <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
        {/* Estado del sistema — versión completa en desktop */}
        <div
          className={`hidden md:block px-3 py-1 rounded-full text-xs font-semibold text-white whitespace-nowrap ${
            sistemaAlerta ? 'bg-emergencia animate-pulse' : 'bg-green-600'
          }`}
        >
          {sistemaAlerta ? '🚨 EMERGENCIA ACTIVA' : '✓ Sistema operativo'}
        </div>

        {/* Estado del sistema — versión compacta en móvil */}
        <div
          className={`md:hidden w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 ${
            sistemaAlerta ? 'bg-emergencia animate-pulse' : 'bg-green-600'
          }`}
          title={sistemaAlerta ? 'Emergencia activa' : 'Sistema operativo'}
        >
          {sistemaAlerta ? '🚨' : '✓'}
        </div>

        {/* Selector de rol */}
        <select
          value={rol}
          onChange={(e) => onChangeRol(e.target.value)}
          className="bg-bgDark border border-borderDark text-slate-200 px-2 md:px-3 py-1 md:py-1.5 rounded text-xs md:text-sm max-w-[100px] md:max-w-none"
        >
          <option value="visitante">👤 Visitante</option>
          <option value="brigadista">🧑‍🚒 Brigadista</option>
          <option value="coordinador">👨‍💼 Coordinador</option>
        </select>
      </div>
    </header>
  );
}
