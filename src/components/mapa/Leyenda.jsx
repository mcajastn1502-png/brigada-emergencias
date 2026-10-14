import { useState } from 'react';

export default function Leyenda() {
  const [abierta, setAbierta] = useState(false);

  const items = [
    { color: 'bg-red-500', label: 'Emergencias' },
    { color: 'bg-teal-500', label: 'Rescatistas' },
    { color: 'bg-orange-500', label: 'Anti-incendios' },
    { color: 'bg-green-500 rounded-md', label: 'Salida emergencia' },
    { color: 'bg-amber-500', label: 'Punto de encuentro' },
  ];

  return (
    <>
      {/* ============ DESKTOP: Leyenda siempre visible ============ */}
      <div className="hidden lg:block absolute bottom-4 left-4 z-40 bg-[#0f1419]/95 border border-[#2d3748] rounded-lg p-3 text-xs backdrop-blur-sm">
        <div className="font-bold mb-2 text-slate-200">Leyenda</div>
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2 my-1 text-slate-300">
            <div className={`w-3.5 h-3.5 rounded-full border-2 border-white ${item.color}`} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      {/* ============ MÓVIL/TABLET: Botón flotante + popup ============ */}
      <div className="lg:hidden">
        {/* Botón flotante */}
        <button
          onClick={() => setAbierta(true)}
          className="absolute bottom-4 left-4 z-40 bg-[#1a2027]/95 border border-[#2d3748] rounded-full px-3 py-2 flex items-center gap-2 text-xs text-slate-200 backdrop-blur-sm shadow-xl hover:bg-[#252d38] transition"
        >
          <span>ℹ️</span>
          <span className="font-bold">Leyenda</span>
        </button>

        {/* Popup */}
        {abierta && (
          <>
            {/* Overlay para cerrar al hacer clic afuera */}
            <div className="absolute inset-0 z-50 bg-black/60" onClick={() => setAbierta(false)} />

            {/* Panel de la leyenda */}
            <div className="absolute bottom-4 left-4 right-4 z-50 bg-[#1a2027] border border-[#2d3748] rounded-xl p-4 shadow-2xl max-w-sm">
              {/* Header del popup */}
              <div className="flex justify-between items-center mb-3">
                <div className="font-bold text-slate-200 text-sm">📖 Leyenda del mapa</div>
                <button
                  onClick={() => setAbierta(false)}
                  className="text-slate-400 hover:text-white text-xl leading-none"
                >
                  ✕
                </button>
              </div>

              {/* Items */}
              <div className="space-y-2">
                {items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-sm text-slate-200 py-1.5 border-b border-[#2d3748]/40 last:border-0"
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 border-white ${item.color} flex-shrink-0`}
                    />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-3 pt-3 border-t border-[#2d3748] text-[10px] text-slate-500 text-center">
                Toca fuera o ✕ para cerrar
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
