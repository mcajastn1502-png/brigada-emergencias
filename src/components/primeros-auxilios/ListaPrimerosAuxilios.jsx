import { useState, useMemo } from 'react';
import { PRIMEROS_AUXILIOS } from '@/lib/constants';
import VideoModal from './VideoModal';

export default function ListaPrimerosAuxilios() {
  const [busqueda, setBusqueda] = useState('');
  const [abiertos, setAbiertos] = useState({});
  const [videoAbierto, setVideoAbierto] = useState(null);

  const toggle = (id) => {
    setAbiertos((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const todosAbiertos = PRIMEROS_AUXILIOS.every((p) => abiertos[p.id]);

  const toggleTodos = () => {
    const nuevo = {};
    PRIMEROS_AUXILIOS.forEach((p) => {
      nuevo[p.id] = !todosAbiertos;
    });
    setAbiertos(nuevo);
  };

  const filtrados = useMemo(() => {
    const busq = busqueda.toLowerCase().trim();
    return PRIMEROS_AUXILIOS.filter((p) => {
      return (
        !busq ||
        p.titulo.toLowerCase().includes(busq) ||
        p.pasos.some((paso) => paso.txt.toLowerCase().includes(busq))
      );
    });
  }, [busqueda]);

  const abrirVideo = (video) => setVideoAbierto(video);
  const cerrarVideo = () => setVideoAbierto(null);

  return (
    <div className="space-y-4">
      {/* Controles */}
      <div className="flex flex-wrap gap-2 items-center">
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="🔍 Buscar en primeros auxilios..."
          className="flex-1 min-w-[200px] bg-[#0f1419] border border-[#2d3748] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={toggleTodos}
          className="px-3 py-2 rounded-lg border border-[#2d3748] text-slate-300 hover:bg-[#252d38] text-xs transition"
        >
          {todosAbiertos ? '▲ Cerrar' : '▼ Abrir'} todos
        </button>
      </div>

      <div className="text-xs text-slate-400">
        Mostrando <strong className="text-white">{filtrados.length}</strong> de{' '}
        <strong className="text-white">{PRIMEROS_AUXILIOS.length}</strong> protocolos
      </div>

      {/* Lista */}
      {filtrados.length === 0 ? (
        <div className="bg-[#1a2027] border border-[#2d3748] rounded-lg p-8 text-center text-slate-400">
          No se encontraron resultados
        </div>
      ) : (
        filtrados.map((p) => {
          const abierto = abiertos[p.id];
          const pasosUrgentes = p.pasos.filter((paso) => paso.urgente).length;
          const numVideos = p.videos?.length ?? 0;

          return (
            <div
              key={p.id}
              className="bg-[#1a2027] border border-[#2d3748] rounded-lg overflow-hidden"
            >
              {/* Header */}
              <button
                onClick={() => toggle(p.id)}
                className="w-full flex justify-between items-center p-4 hover:bg-[#252d38] transition text-left gap-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-white text-sm md:text-base">{p.titulo}</div>
                  <div className="text-xs text-slate-400 mt-1 flex gap-3 flex-wrap">
                    <span>📋 {p.pasos.length} pasos</span>
                    {pasosUrgentes > 0 && (
                      <span className="text-red-400">⚠ {pasosUrgentes} críticos</span>
                    )}
                    {numVideos > 0 && (
                      <span className="text-blue-400">
                        🎥 {numVideos} {numVideos === 1 ? 'video' : 'videos'}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-slate-400 text-lg flex-shrink-0">{abierto ? '▲' : '▼'}</span>
              </button>

              {/* Contenido */}
              {abierto && (
                <div className="px-4 pb-4 space-y-2">
                  {p.pasos.map((paso) => (
                    <div
                      key={paso.n}
                      className={`flex gap-3 py-3 border-b border-[#2d3748]/50 last:border-0 ${
                        paso.urgente ? 'bg-red-500/5 -mx-4 px-4 rounded' : ''
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold text-white ${
                          paso.urgente ? 'bg-red-500' : 'bg-blue-500'
                        }`}
                      >
                        {paso.n}
                      </div>
                      <div className="flex-1 pt-0.5">
                        <div className="text-sm text-slate-200 leading-relaxed">{paso.txt}</div>
                        {paso.urgente && (
                          <div className="text-red-400 text-xs font-bold mt-1.5">
                            ⚠ PASO CRÍTICO
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Videos */}
                  {numVideos > 0 && (
                    <div className="mt-4 pt-3 border-t border-[#2d3748]">
                      <div className="text-xs text-blue-400 font-bold mb-2">
                        🎥 VIDEOS TUTORIALES
                      </div>
                      {p.videos.map((v, i) => (
                        <button
                          key={i}
                          onClick={() => abrirVideo(v)}
                          className="w-full flex items-center gap-3 p-2 rounded-lg border border-[#2d3748] hover:border-blue-500 hover:bg-[#252d38] transition text-left mb-2"
                        >
                          <img
                            src={`https://img.youtube.com/vi/${v.id}/default.jpg`}
                            alt={v.titulo}
                            className="w-16 h-10 object-cover rounded flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-xs text-white font-bold truncate">{v.titulo}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5">
                              📺 {v.canal} · ⏱ {v.duracion}
                            </div>
                          </div>
                          <div className="text-blue-400 text-lg flex-shrink-0">▶</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })
      )}

      {/* Modal de video */}
      {videoAbierto && <VideoModal video={videoAbierto} onClose={cerrarVideo} />}
    </div>
  );
}
