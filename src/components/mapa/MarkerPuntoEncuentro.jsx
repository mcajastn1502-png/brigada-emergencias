export default function MarkerPuntoEncuentro({ punto }) {
  return (
    <div
      className="absolute z-20"
      style={{ left: `${punto.x}px`, top: `${punto.y}px`, transform: 'translate(-50%, -50%)' }}
      title={punto.nombre}
    >
      <div className="w-[32px] h-[32px] rounded-full bg-amber-500 border-[3px] border-white shadow-[0_0_15px_rgba(245,158,11,0.6)] flex items-center justify-center text-white text-base">
        📍
      </div>
      <div className="absolute top-[34px] left-1/2 -translate-x-1/2 bg-black/85 text-white px-2 py-0.5 rounded text-[11px] whitespace-nowrap border border-[#2d3748] pointer-events-none">
        {punto.id}
      </div>
    </div>
  );
}