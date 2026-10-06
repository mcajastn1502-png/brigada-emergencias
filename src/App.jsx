import { useState } from 'react';
import Header from '@/components/layout/Header';
import NavTabs from '@/components/layout/NavTabs';
import Toast from '@/components/layout/Toast';
import PersonalPage from '@/pages/PersonalPage';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';

export default function App() {
  const { rol, cambiarRol } = useAuth();
  const { toasts, toast } = useToast();
  const [tab, setTab] = useState('personal');

  return (
    <div className="h-screen flex flex-col bg-bgDark text-slate-200">
      <Header rol={rol} onChangeRol={cambiarRol} />
      <NavTabs activo={tab} onChange={setTab} rol={rol} />
      <main className="flex-1 overflow-y-auto">
        {tab === 'personal' && <PersonalPage />}
        {tab === 'mapa' && <div className="p-6 text-slate-400">🚧 Migrando mapa...</div>}
        {tab === 'incidentes' && <div className="p-6 text-slate-400">🚧 Migrando incidentes...</div>}
        {/* ...resto de páginas se migran progresivamente */}
      </main>
      <Toast toasts={toasts} />
      <button
        onClick={() => toast('Prueba de toast ✓', 'success')}
        className="fixed bottom-6 right-6 w-20 h-20 rounded-full bg-emergencia border-4 border-white font-bold shadow-2xl"
      >
        SOS
      </button>
    </div>
  );
}