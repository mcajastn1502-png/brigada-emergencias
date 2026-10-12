import { useState, useEffect } from 'react';

const ROLES = [
  { value: 'emergencia', label: '🚑 Emergencias' },
  { value: 'rescatista', label: '🧗 Rescatista' },
  { value: 'incendios', label: '🔥 Anti-incendios' },
];

const TIPOS_SANGRE = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];

export default function ModalMiembro({ miembro, onClose, onGuardar, onEliminar }) {
  const esEdicion = Boolean(miembro);

  const [form, setForm] = useState({
    nombre: '',
    rol: 'emergencia',
    telefono: '',
    telefono_emergencia: '',
    contacto_emergencia: '',
    tipo_sangre: '',
    email: '',
    activo: true,
  });

  useEffect(() => {
    if (miembro) {
      setForm({
        nombre: miembro.nombre || '',
        rol: miembro.rol || 'emergencia',
        telefono: miembro.telefono || '',
        telefono_emergencia: miembro.telefono_emergencia || '',
        contacto_emergencia: miembro.contacto_emergencia || '',
        tipo_sangre: miembro.tipo_sangre || '',
        email: miembro.email || '',
        activo: miembro.activo ?? true,
      });
    }
  }, [miembro]);

  const handleChange = (campo, valor) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  };

  const handleSubmit = () => {
    if (!form.nombre.trim()) {
      alert('El nombre es obligatorio');
      return;
    }

    const iniciales = (() => {
      const preposiciones = ['de', 'del', 'la', 'las', 'los', 'y', 'van', 'von', 'da', 'dos'];
      const palabras = form.nombre
        .trim()
        .split(/\s+/)
        .filter((p) => p.length > 0 && !preposiciones.includes(p.toLowerCase()));
      if (palabras.length >= 2) return (palabras[0][0] + palabras[1][0]).toUpperCase();
      return form.nombre.substring(0, 2).toUpperCase();
    })();

    const payload = {
      ...form,
      iniciales,
    };

    // Si es nuevo, asignar posiciones por defecto
    if (!esEdicion) {
      payload.x = 300 + Math.random() * 600;
      payload.y = 300 + Math.random() * 400;
      payload.x_fuera = payload.x;
      payload.y_fuera = 920;
      payload.estado = 'alrededores';
    }

    onGuardar(payload);
  };

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#1a2027] border border-[#2d3748] rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#2d3748] sticky top-0 bg-[#1a2027] z-10">
          <h2 className="text-white font-bold text-lg">
            {esEdicion ? '✏️ Editar brigadista' : '➕ Nuevo brigadista'}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-2xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Formulario */}
        <div className="p-5 space-y-4">
          <Field label="Nombre completo *">
            <input
              type="text"
              value={form.nombre}
              onChange={(e) => handleChange('nombre', e.target.value)}
              placeholder="Ej: Juan Pérez"
              className="w-full bg-[#0f1419] border border-[#2d3748] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </Field>

          <Field label="Rol">
            <select
              value={form.rol}
              onChange={(e) => handleChange('rol', e.target.value)}
              className="w-full bg-[#0f1419] border border-[#2d3748] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
            >
              {ROLES.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="📞 Teléfono">
              <input
                type="text"
                value={form.telefono}
                onChange={(e) => handleChange('telefono', e.target.value)}
                placeholder="+593 99 123 4567"
                className="w-full bg-[#0f1419] border border-[#2d3748] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </Field>

            <Field label="🚨 Emergencia">
              <input
                type="text"
                value={form.telefono_emergencia}
                onChange={(e) => handleChange('telefono_emergencia', e.target.value)}
                placeholder="+593 99 911 0000"
                className="w-full bg-[#0f1419] border border-[#2d3748] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </Field>
          </div>

          <Field label="👥 Contacto de emergencia">
            <input
              type="text"
              value={form.contacto_emergencia}
              onChange={(e) => handleChange('contacto_emergencia', e.target.value)}
              placeholder="Ej: María Pérez (madre)"
              className="w-full bg-[#0f1419] border border-[#2d3748] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="🩸 Tipo de sangre">
              <select
                value={form.tipo_sangre}
                onChange={(e) => handleChange('tipo_sangre', e.target.value)}
                className="w-full bg-[#0f1419] border border-[#2d3748] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              >
                <option value="">— Seleccionar —</option>
                {TIPOS_SANGRE.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="✅ Activo">
              <div className="flex items-center h-full pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.activo}
                    onChange={(e) => handleChange('activo', e.target.checked)}
                    className="w-5 h-5 accent-green-500"
                  />
                  <span className="text-slate-300 text-sm">
                    {form.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </label>
              </div>
            </Field>
          </div>

          <Field label="✉️ Email">
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="correo@ejemplo.com"
              className="w-full bg-[#0f1419] border border-[#2d3748] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </Field>
        </div>

        {/* Acciones */}
        <div className="p-4 border-t border-[#2d3748] flex flex-wrap gap-2">
          {esEdicion && onEliminar && (
            <button
              onClick={onEliminar}
              className="px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition"
            >
              🗑️ Eliminar
            </button>
          )}
          <div className="flex-1"></div>
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-lg border border-[#2d3748] text-slate-300 hover:bg-[#252d38] text-sm"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition"
          >
            💾 {esEdicion ? 'Guardar cambios' : 'Crear brigadista'}
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
