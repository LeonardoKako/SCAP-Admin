import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ClipboardList, Users, MapPin, Settings, Shield, LogOut } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { toast } from 'react-toastify';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Sidebar = () => {
  const navigate = useNavigate();

  const navItems = [
    { icon: LayoutDashboard, label: 'Painel', path: '/dashboard' },
    { icon: ClipboardList, label: 'Registros', path: '/logs' },
    { icon: Users, label: 'Usuários', path: '/users' },
    { icon: MapPin, label: 'Setores', path: '/sectors' },
  ];

  const bottomItems = [
    { icon: Settings, label: 'Configurações', path: '/configuracoes' },
  ];

  const handleLogout = () => {
    toast.info("Sessão encerrada com sucesso.");
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-slate-100 h-screen sticky top-0 flex flex-col py-6 border-r-0 shrink-0 hidden md:flex">
      <div className="px-6 mb-8">
        <NavLink to="/dashboard" className="flex items-center gap-3 mb-1 group">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white transition-transform group-hover:scale-105">
            <Shield className="w-5 h-5" />
          </div>
          <h1 className="font-headline text-xl font-extrabold text-slate-900 group-hover:text-primary transition-colors">SCAP Admin</h1>
        </NavLink>
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest px-1">Gestão de Segurança</p>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group text-sm font-bold",
                isActive 
                  ? "bg-slate-200 text-slate-900 shadow-sm relative after:content-[''] after:absolute after:left-0 after:w-1 after:h-4 after:bg-primary" 
                  : "text-slate-500 hover:bg-slate-200 hover:text-slate-900"
              )
            }
          >
            <item.icon className="w-5 h-5 shrink-0" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="px-4 mt-auto space-y-1 border-t border-slate-200 pt-6">
        {bottomItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group text-sm font-bold",
                isActive 
                  ? "bg-slate-200 text-slate-900 shadow-sm" 
                  : "text-slate-500 hover:bg-slate-200 hover:text-slate-900"
              )
            }
          >
            <item.icon className="w-5 h-5 shrink-0" />
            <span>{item.label}</span>
          </NavLink>
        ))}

        {/* Botão de Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group text-sm font-bold text-red-500 hover:bg-red-50 hover:text-red-600 mt-2"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
