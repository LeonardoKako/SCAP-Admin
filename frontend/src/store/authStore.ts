import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User, MOCK_USERS, ALLOWED_SECTORS } from '../examples/data';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isSettingsModalOpen: boolean;
  login: (email: string, password: string) => { success: boolean; message?: string };
  logout: () => void;
  setSettingsModalOpen: (open: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isSettingsModalOpen: false,
      login: (email, password) => {
        const foundUser = MOCK_USERS.find(
          (u) => u.email === email && u.password === password
        );

        if (!foundUser) {
          return { success: false, message: 'Credenciais inválidas.' };
        }

        if (!ALLOWED_SECTORS.includes(foundUser.sector)) {
          return { 
            success: false, 
            message: `Acesso negado. Usuários do setor ${foundUser.sector} não têm permissão de acesso ao sistema.` 
          };
        }

        const { password: _, ...userWithoutPassword } = foundUser;
        
        set({ 
          user: userWithoutPassword as User, 
          isAuthenticated: true 
        });

        return { success: true };
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
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
