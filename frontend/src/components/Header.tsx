import { Bell, History, HelpCircle, LogOut } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout, setSettingsModalOpen } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className='flex justify-between items-center px-8 w-full sticky top-0 z-40 bg-slate-50 h-16 shrink-0 border-b border-slate-100'>
      <div className='flex items-center gap-8 flex-1'>
        <span className='font-headline text-lg font-extrabold tracking-tight text-slate-900'>
          Monitor de Segurança
        </span>
      </div>

      <div className='flex items-center gap-6'>
        <div className='flex items-center gap-4'>
          <button className='px-5 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:opacity-90 active:opacity-80 transition-all shadow-sm'>
            Conceder Acesso
          </button>
<<<<<<< HEAD

          <div
            onClick={() => setSettingsModalOpen(true)}
            className='flex items-center gap-3 border-l border-slate-200 pl-4 ml-2 cursor-pointer hover:opacity-80 transition-opacity'
          >
=======
          
          <div className='flex items-center gap-3 border-l border-slate-200 pl-4 ml-2'>
>>>>>>> 900d69e09a80369cd7271ce725352fa24fe9cfb0
            <div className='flex-col items-end hidden sm:flex'>
              <span className='text-xs font-bold text-slate-900'>
                {user?.name || "Usuário"}
              </span>
              <span className='text-[10px] font-bold text-slate-400 uppercase tracking-tighter'>
                {user?.role || "Acesso Limitado"}
              </span>
            </div>
            <img
              src={user?.avatar || "/avatar.png"}
              alt='Perfil do Usuário'
              className='w-10 h-10 rounded-full border-2 border-slate-200 object-cover shadow-sm bg-slate-200'
            />
<<<<<<< HEAD
=======
            <button
              onClick={handleLogout}
              className='ml-2 p-2 text-slate-400 hover:text-error transition-colors ring-1 ring-slate-200 rounded-lg hover:ring-error/20'
              title='Sair do System'
            >
              <LogOut className='w-5 h-5' />
            </button>
>>>>>>> 900d69e09a80369cd7271ce725352fa24fe9cfb0
          </div>
          <button
            onClick={handleLogout}
            className='ml-2 p-2 text-slate-400 hover:text-error transition-colors ring-1 ring-slate-200 rounded-lg hover:ring-error/20'
            title='Sair do System'
          >
            <LogOut className='w-5 h-5' />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
