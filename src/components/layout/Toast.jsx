/** @param {{ toasts: {id:number, mensaje:string, tipo:string}[] }} props */
export default function Toast({ toasts }) {
  return (
    <div className="fixed top-20 right-5 z-[3000] space-y-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`bg-panel border px-4 py-3 rounded-lg text-sm shadow-2xl ${
            t.tipo === 'error'
              ? 'border-emergencia'
              : t.tipo === 'success'
                ? 'border-green-600'
                : 'border-blue-500'
          }`}
        >
          {t.mensaje}
        </div>
      ))}
    </div>
  );
}