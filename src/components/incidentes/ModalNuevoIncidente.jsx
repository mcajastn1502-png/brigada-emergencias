import { useState } from 'react';
import { CATEGORIAS_INCIDENTE } from '@/lib/constants';

export default function ModalNuevoIncidente({ onClose, onDeclarar }) {
  const [categoria, setCategoria] = useState('incendio');
  const [ubicacion, setUbicacion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [simulacro, setSimulacro] = useState(false);

  const [errores, setErrores] = useState({});

  const validar = () => {
    const nuevos = {};
    if (!categoria) nuevos.categoria = 'Seleccione una categoría';
    if (!ubicacion.trim()) nuevos.ubicacion = 'Ingrese la ubicación';
    if (!descripcion.trim()) nuevos.descripcion = 'Ingrese una descripción';
    setErrores(nuevos);
    return Object.keys(nuevos).length === 0;
  };

  const handleSubmit = () => {
    if (!validar()) return;
    onDeclarar({ categoria, ubicacion, descripcion, simulacro });
  };

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#1a2027] border border-[#2d3748] rounded-xl max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#2d3748]">
          <h2 className="text-red-500 font-bold text-lg">🚨 Declarar nuevo incidente</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-2xl leading-none">
            ✕
          </button>
        </div>

        {/* Formulario */}
        <div className="p-5 space-y-4">
          <Field label="Categoría *">
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className={`w-full bg-[#0f1419] border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500 ${errores.categoria ? 'border-red-500' : 'border-[#2d3748]'}`}
            >
              {CATEGORIAS_INCIDENTE.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
            {errores.categoria && <span className="text-red-500 text-xs mt-1 block">{errores.categoria}</span>}
          </Field>

          <Field label="Ubicación / zona *">
            <input
              type="text"
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
              placeholder="Ej: Galpón principal, pasillo 3"
              className={`w-full bg-[#0f1419] border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500 ${errores.ubicacion ? 'border-red-500' : 'border-[#2d3748]'}`}
            />
            {errores.ubicacion && <span className="text-red-500 text-xs mt-1 block">{errores.ubicacion}</span>}
          </Field>

          <Field label="Descripción *">
            <textarea
              rows="3"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Describa brevemente lo ocurrido..."
              className={`w-full bg-[#0f1419] border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500 resize-none ${errores.descripcion ? 'border-red-500' : 'border-[#2d3748]'}`}
            />
            {errores.descripcion && <span className="text-red-500 text-xs mt-1 block">{errores.descripcion}</span>}
          </Field>

          {/* Modo simulacro */}
          <label className="flex items-center gap-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg cursor-pointer">
            <input
              type="checkbox"
              checked={simulacro}
              onChange={(e) => setSimulacro(e.target.checked)}
              className="w-5 h-5 accent-yellow-500"
            />
            <div>
              <div className="text-yellow-400 text-sm font-bold">🧪 Modo simulacro</div>
              <div className="text-slate-400 text-xs">No se notifica al ECU-911</div>
            </div>
          </label>
        </div>

        {/* Acciones */}
        <div className="p-4 border-t border-[#2d3748] flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-lg border border-[#2d3748] text-slate-300 hover:bg-[#252d38] text-sm"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition"
          >
            🚨 Declarar incidente
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-slate-400 text-xs mb-1.5">{label}</label>
      {children}
    </div>
  );
}