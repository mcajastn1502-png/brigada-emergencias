/**
 * Modal para ver videos de YouTube
 * @param {{ video: { id: string, titulo: string, canal: string, nota?: string, esShort?: boolean }, onClose: () => void }} props
 */
export default function VideoModal({ video, onClose }) {
  if (!video) return null;

  const urlYouTube = `https://www.youtube.com/watch?v=${video.id}`;
  const urlMiniatura = `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`;
  const urlMiniaturaFallback = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#1a2027] border border-[#2d3748] rounded-xl max-w-3xl w-full overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#2d3748]">
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-bold text-sm truncate">🎥 {video.titulo}</h3>
            {video.canal && <p className="text-xs text-slate-400 mt-0.5">📺 {video.canal}</p>}
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-2xl leading-none ml-3"
          >
            ✕
          </button>
        </div>

        {/* Tarjeta del video — miniatura clicable */}
        <a
          href={urlYouTube}
          target="_blank"
          rel="noopener noreferrer"
          className="relative group block bg-black"
        >
          {/* Miniatura */}
          <img
            src={urlMiniatura}
            alt={video.titulo}
            className="w-full max-h-[60vh] object-contain"
            onError={(e) => {
              if (e.target.src !== urlMiniaturaFallback) {
                e.target.src = urlMiniaturaFallback;
              }
            }}
          />

          {/* Overlay con botón de play */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 flex items-center justify-center transition">
            <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center text-white text-3xl shadow-2xl group-hover:scale-110 transition">
              ▶
            </div>
          </div>

          {/* Etiqueta inferior */}
          <div className="absolute bottom-3 left-3 right-3 text-white text-sm font-bold bg-black/70 rounded-lg px-3 py-2 flex items-center justify-between">
            <span className="truncate">▶ Reproducir en YouTube</span>
            <span className="text-xs text-slate-300 ml-2 flex-shrink-0">
              ↗ se abre en otra pestaña
            </span>
          </div>
        </a>

        {/* Footer */}
        <div className="p-4 border-t border-[#2d3748]">
          <div className="text-xs text-slate-400">
            {video.nota && <div className="mb-2">{video.nota}</div>}
            <div className="text-yellow-400">
              ⚠ Material de apoyo. No sustituye capacitación certificada.
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-3">
            <a
              href={urlYouTube}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition"
            >
              ▶ Abrir en YouTube
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-[#2d3748] text-slate-300 hover:bg-[#252d38] text-xs transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
