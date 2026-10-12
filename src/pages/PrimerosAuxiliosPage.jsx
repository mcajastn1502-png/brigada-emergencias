import ListaPrimerosAuxilios from '@/components/primeros-auxilios/ListaPrimerosAuxilios';

export default function PrimerosAuxiliosPage() {
  return (
    <div className="p-4 max-w-5xl mx-auto space-y-4">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-[#2d3748] rounded-xl p-5">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          🩹 Primeros Auxilios
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Procedimientos paso a paso con videos tutoriales. Los pasos marcados en{' '}
          <span className="text-red-400 font-bold">rojo</span> son críticos.
        </p>
        <p className="text-xs text-yellow-400 mt-2">
          ⚠ Material de apoyo. No sustituye capacitación certificada.
        </p>
      </div>

      {/* Lista */}
      <ListaPrimerosAuxilios />
    </div>
  );
}