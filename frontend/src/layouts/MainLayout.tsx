import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import SettingsModal from '../components/SettingsModal';
import { useAuthStore } from '../store/authStore';

const MainLayout = () => {
  const { isSettingsModalOpen, setSettingsModalOpen } = useAuthStore();

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-surface">
          <Outlet />
        </main>
      </div>
      <SettingsModal 
        isOpen={isSettingsModalOpen} 
        onClose={() => setSettingsModalOpen(false)} 
      />
    </div>
  );
};

export default MainLayout;
