import { ROLES } from '@/lib/constants';

/** @param {{ rol:string, onChangeRol:(r:any)=>void, sistemaAlerta?:boolean }} props */
export default function Header({ rol, onChangeRol, sistemaAlerta = false }) {
  return (
    <header className="bg-panel border-b border-borderDark px-5 py-2.5 flex justify-between items-center flex-wrap gap-3 z-50">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emergencia to-incendios flex items-center justify-center text-xl">
          🚨
        </div>
        <div>
          <div className="font-bold">Brigada de Emergencias</div>
          <div className="text-xs text-slate-400">Bodega Central · ECU-911</div>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div
          className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
            sistemaAlerta ? 'bg-emergencia animate-pulse' : 'bg-green-600'
          }`}
        >
          {sistemaAlerta ? '🚨 EMERGENCIA ACTIVA' : '✓ Sistema operativo'}
        </div>
        <select
          value={rol}
          onChange={(e) => onChangeRol(e.target.value)}
          className="bg-bgDark border border-borderDark text-slate-200 px-3 py-1.5 rounded text-sm"
        >
          <option value="visitante">👤 Visitante</option>
          <option value="brigadista">🧑‍🚒 Brigadista</option>
          <option value="coordinador">👨‍💼 Coordinador</option>
        </select>
      </div>
    </header>
  );
}