import { useState } from 'react';
import { User as UserIcon, Mail, Lock, Camera, X } from 'lucide-react';
import SentinelModal from './SentinelModal';
import { useAuthStore } from '../store/authStore';
import { toast } from 'react-toastify';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const { user } = useAuthStore();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    confirmPassword: ''
  });

  const handleSave = () => {
    if (formData.password && formData.password !== formData.confirmPassword) {
      toast.error('As senhas não coincidem!');
      return;
    }
    
    // Mock update logic
    toast.success('Configurações atualizadas com sucesso!');
    onClose();
  };

  return (
    <SentinelModal
      isOpen={isOpen}
      onClose={onClose}
      title="Configurações do Perfil"
      subtitle="Gerencie suas informações de identidade e credenciais de acesso."
      maxWidth="max-w-2xl"
      onSave={handleSave}
    >
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-3 shrink-0">
            <div className="relative group">
              <img 
                src={user?.avatar || '/avatar.png'} 
                className="w-20 h-20 rounded-full border-4 border-slate-100 object-cover shadow-md transition-transform group-hover:scale-105" 
                alt="Avatar" 
              />
              <button className="absolute bottom-0 right-0 p-1.5 bg-primary text-white rounded-full shadow-lg hover:scale-110 transition-transform ring-4 ring-white">
                <Camera className="w-3 h-3" />
              </button>
            </div>
            <p className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 text-center leading-tight">Alterar Foto</p>
          </div>

          {/* Form Fields - Column 1 */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-1">Nome Completo</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-100 rounded-lg pl-10 pr-4 py-2.5 text-sm font-medium focus:ring-1 focus:ring-primary/20 outline-none transition-all" 
                  placeholder="Seu nome"
                />
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
              </div>
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-1">Endereço de E-mail</label>
              <div className="relative">
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-100 rounded-lg pl-10 pr-4 py-2.5 text-sm font-medium focus:ring-1 focus:ring-primary/20 outline-none transition-all" 
                  placeholder="seu@email.com"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-1">Nova Senha</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-100 rounded-lg pl-10 pr-4 py-2.5 text-sm font-medium focus:ring-1 focus:ring-primary/20 outline-none transition-all" 
                  placeholder="••••••••"
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-1">Confirmar Senha</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-100 rounded-lg pl-10 pr-4 py-2.5 text-sm font-medium focus:ring-1 focus:ring-primary/20 outline-none transition-all" 
                  placeholder="••••••••"
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SentinelModal>
  );
};

export default SettingsModal;
