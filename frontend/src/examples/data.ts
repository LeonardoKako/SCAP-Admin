export const SECTORS = {
  ADMIN: 'Admin',
  FINANCE: 'Financeiro',
  COMMERCIAL: 'Comercial',
  IT: 'TI',
} as const;

export type Sector = typeof SECTORS[keyof typeof SECTORS];

export interface User {
  id: string;
  name: string;
  email: string;
  sector: Sector;
  role: string;
  avatar?: string;
}

export const MOCK_USERS: (User & { password?: string })[] = [
  {
    id: '1',
    name: 'Administrador Sistema',
    email: 'admin@scap.com',
    sector: SECTORS.ADMIN,
    role: 'Supervisor do Sistema',
    password: '12345',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: '2',
    name: 'Analista de Suporte',
    email: 'ti@scap.com',
    sector: SECTORS.IT,
    role: 'Técnico de Segurança',
    password: '12345',
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: '3',
    name: 'Gerente Financeiro',
    email: 'finc@scap.com',
    sector: SECTORS.FINANCE,
    role: 'Gestor de Contas',
    password: '12345',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: '4',
    name: 'Executivo de Vendas',
    email: 'com@scap.com',
    sector: SECTORS.COMMERCIAL,
    role: 'Consultor Comercial',
    password: '12345',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

export const ALLOWED_SECTORS: Sector[] = [SECTORS.ADMIN, SECTORS.IT];

export interface SectorEntry {
  id: string;
  name: string;
  authorizedRoles: string;
}

export const MOCK_SECTORS: SectorEntry[] = [
  { 
    id: 'SEC-A1', 
    name: 'Sala de Servidores Principal', 
    authorizedRoles: 'Administrador de TI, Super Supervisor' 
  },
  { 
    id: 'SEC-C3', 
    name: 'Laboratório de Pesquisa Gama', 
    authorizedRoles: 'Equipe de Pesquisa, Admin' 
  },
  { 
    id: 'SEC-Z9', 
    name: 'Suíte Executiva', 
    authorizedRoles: 'Somente Membros da Diretoria' 
  },
  { 
    id: 'SEC-B2', 
    name: 'Doca de Carga', 
    authorizedRoles: 'Logística, Operações' 
  },
];

export interface LogEntry {
  id: string;
  user: string;
  idNumber: string;
  sector: string;
  time: string;
  date: string;
  type: 'Entrada' | 'Saída' | 'Negado';
}

export const MOCK_LOGS: LogEntry[] = [
  { id: '1', user: 'Administrador Sistema', idNumber: 'USR-1', sector: 'Sala de Servidores Principal', time: '14:32:05', date: '21 Abr, 2024', type: 'Entrada' },
  { id: '2', user: 'Analista de Suporte', idNumber: 'USR-2', sector: 'Sala de Servidores Principal', time: '14:30:12', date: '21 Abr, 2024', type: 'Saída' },
  { id: '3', user: 'Gerente Financeiro', idNumber: 'USR-3', sector: 'Sala de Servidores Principal', time: '14:25:31', date: '21 Abr, 2024', type: 'Negado' },
  { id: '4', user: 'Executivo de Vendas', idNumber: 'USR-4', sector: 'Doca de Carga', time: '14:15:44', date: '21 Abr, 2024', type: 'Entrada' },
  { id: '5', user: 'Analista de Suporte', idNumber: 'USR-2', sector: 'Lobby', time: '14:10:02', date: '21 Abr, 2024', type: 'Saída' },
  { id: '6', user: 'Tentativa Não Autorizada', idNumber: 'DESCONHECIDO', sector: 'Suíte Executiva', time: '13:55:20', date: '21 Abr, 2024', type: 'Negado' },
];
