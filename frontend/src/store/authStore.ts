import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User, ALLOWED_SECTORS } from '../examples/data';
import { api } from '../services/api';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isSettingsModalOpen: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  setSettingsModalOpen: (open: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isSettingsModalOpen: false,
      login: async (email, password) => {
        try {
          const response = await api.post('/login', { email, password });
          const { success, user, token, message } = response.data;

          if (!success) {
            return { success: false, message: message || 'Credenciais inválidas.' };
          }

          // Adaptar o usuário do backend (relacional) para o modelo esperado no frontend
          const sectorName = user.sector?.name || '';
          const roleName = user.profile?.name || '';

          // Verificação de setores permitidos no frontend
          if (!ALLOWED_SECTORS.includes(sectorName as any)) {
            return { 
              success: false, 
              message: `Acesso negado. Usuários do setor ${sectorName} não têm permissão de acesso ao sistema.` 
            };
          }

          const adaptedUser: User = {
            id: String(user.id),
            name: user.name,
            email: user.email,
            sector: sectorName,
            role: roleName,
            avatar: user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          };

          set({ 
            user: adaptedUser, 
            token,
            isAuthenticated: true 
          });

          return { success: true };
        } catch (error: any) {
          const errMsg = error.response?.data?.message || 'Falha ao conectar com o servidor ou credenciais inválidas.';
          return { success: false, message: errMsg };
        }
      },
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },
      setSettingsModalOpen: (open) => {
        set({ isSettingsModalOpen: open });
      },
    }),
    {
      name: 'scap-auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
