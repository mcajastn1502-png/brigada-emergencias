import ListaProtocolos from '@/components/protocolos/ListaProtocolos';

export default function ProtocolosPage() {
  return (
    <div className="p-4 max-w-5xl mx-auto space-y-4">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-[#2d3748] rounded-xl p-5">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          📋 Protocolos de actuación
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Guías de actuación paso a paso para las principales emergencias en la bodega. Los
          pasos marcados en <span className="text-red-400 font-bold">rojo</span> son críticos.
        </p>
      </div>

      {/* Lista */}
      <ListaProtocolos />
    </div>
  );
}