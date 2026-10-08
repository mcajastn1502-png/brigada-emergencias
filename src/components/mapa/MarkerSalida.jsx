export default function MarkerSalida({ salida }) {
  return (
    <div
      className="absolute z-20 animate-pulse"
      style={{ left: `${salida.x}px`, top: `${salida.y}px`, transform: 'translate(-50%, -50%)' }}
      title={salida.nombre}
    >
      <div className="w-[30px] h-[30px] rounded-md bg-green-500 border-[3px] border-white shadow-[0_0_15px_rgba(34,197,94,0.6)] flex items-center justify-center text-white text-sm">
        🚪
      </div>
      <div className="absolute top-[32px] left-1/2 -translate-x-1/2 bg-black/85 text-white px-2 py-0.5 rounded text-[11px] whitespace-nowrap border border-[#2d3748] pointer-events-none">
        {salida.id}
      </div>
    </div>
  );
}