import ListaNormas from '@/components/normas/ListaNormas';

export default function NormasPage() {
  return (
    <div className="p-4 max-w-5xl mx-auto space-y-4">
      {/* Hero */}
      <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-[#2d3748] rounded-xl p-5">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          ⚖️ Normativa aplicable
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Marco legal y técnico que regula el funcionamiento de la bodega y la brigada de
          emergencias en Ecuador.
        </p>
        <p className="text-xs text-yellow-400 mt-2">
          ⚠ Verifique siempre la vigencia con la entidad oficial.
        </p>
      </div>

      {/* Lista */}
      <ListaNormas />
    </div>
  );
}
