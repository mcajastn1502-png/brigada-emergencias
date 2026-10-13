import { useState } from 'react';
import { FAQ_ITEMS } from '@/lib/constants';

export default function FAQ() {
  const [abiertos, setAbiertos] = useState({});

  const toggle = (id) => {
    setAbiertos((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-2">
      {FAQ_ITEMS.map((item) => {
        const abierto = abiertos[item.id];
        return (
          <div
            key={item.id}
            className="bg-[#1a2027] border border-[#2d3748] rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggle(item.id)}
              className="w-full flex justify-between items-center p-4 hover:bg-[#252d38] transition text-left gap-3"
            >
              <span className="font-bold text-white text-sm">{item.pregunta}</span>
              <span className="text-slate-400 text-lg flex-shrink-0">{abierto ? '▲' : '▼'}</span>
            </button>
            {abierto && (
              <div className="px-4 pb-4 pt-1">
                <p
                  className="text-sm text-slate-300 leading-relaxed border-l-2 border-blue-500 pl-3"
                  dangerouslySetInnerHTML={{ __html: item.respuesta }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}