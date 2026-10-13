import { useState } from 'react';
import Header from '@/components/layout/Header';
import NavTabs from '@/components/layout/NavTabs';
import Toast from '@/components/layout/Toast';
import BotonSOS from '@/components/sos/BotonSOS';
import PersonalPage from '@/pages/PersonalPage';
import MapaPage from '@/pages/MapaPage';
import MiembrosPage from '@/pages/MiembrosPage';
import IncidentesPage from '@/pages/IncidentesPage';
import ProtocolosPage from '@/pages/ProtocolosPage';
import PrimerosAuxiliosPage from '@/pages/PrimerosAuxiliosPage';
import NormasPage from '@/pages/NormasPage';
import HistorialPage from '@/pages/HistorialPage';
import AyudaPage from '@/pages/AyudaPage';
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
        {tab === 'mapa' && <MapaPage />}
        {tab === 'personal' && <PersonalPage />}
        {tab === 'incidentes' && <IncidentesPage />}
        {tab === 'protocolos' && <ProtocolosPage />}
        {tab === 'primeros' && <PrimerosAuxiliosPage />}
        {tab === 'normas' && <NormasPage />}
        {tab === 'miembros' && <MiembrosPage rol={rol} />}
        {tab === 'historial' && <HistorialPage rol={rol} />}
        {tab === 'ayuda' && <AyudaPage onNavegar={setTab} />}
      </main>

      <BotonSOS />
      <Toast toasts={toasts} />
    </div>
  );
}
