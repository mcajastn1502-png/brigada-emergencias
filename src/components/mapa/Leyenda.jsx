export default function Leyenda() {
  const items = [
    { color: 'bg-red-500', label: 'Emergencias' },
    { color: 'bg-teal-500', label: 'Rescatistas' },
    { color: 'bg-orange-500', label: 'Anti-incendios' },
    { color: 'bg-green-500 rounded-md', label: 'Salida emergencia' },
    { color: 'bg-amber-500', label: 'Punto de encuentro' },
  ];

  return (
    <div className="absolute bottom-4 left-4 z-50 bg-[#0f1419]/95 border border-[#2d3748] rounded-lg p-3 text-xs backdrop-blur-sm">
      <div className="font-bold mb-2 text-slate-200">Leyenda</div>
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2 my-1 text-slate-300">
          <div className={`w-3.5 h-3.5 rounded-full border-2 border-white ${item.color}`} />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
