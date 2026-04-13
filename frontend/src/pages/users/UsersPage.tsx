import { useState } from "react";
import {
  UserPlus,
  MoreHorizontal,
  Edit2,
  ShieldAlert,
  Trash2,
  Mail,
} from "lucide-react";
import DataTable from "../../components/DataTable";
import SentinelModal from "../../components/SentinelModal";
import { MOCK_USERS, User } from "../../examples/data";

interface UserData extends User {
  status: "Ativo" | "Revogado" | "Pendente";
  lastAccess: string;
}

const UsersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  const columns = [
    {
      header: "Administrador / Identidade",
      accessor: (user: UserData) => (
        <div className='flex items-center gap-4'>
          <img
            src={user.avatar}
            className='w-9 h-9 rounded-full border border-slate-100 object-cover'
            alt=''
          />
          <div>
            <div className='text-slate-900 font-bold'>{user.name}</div>
            <div className='text-[10px] text-slate-400 font-extrabold uppercase tracking-tight'>
              ID: USR-{user.id}
            </div>
          </div>
        </div>
      ),
    },
    { header: "Nível de Acesso / Cargo", accessor: "role" },
    { header: "Setor", accessor: "sector" },
    {
      header: "Status de Segurança",
      accessor: (user: UserData) => (
        <span
          className={`px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-widest ${
            user.status === "Ativo"
              ? "bg-green-50 text-green-600"
              : user.status === "Revogado"
                ? "bg-red-50 text-red-600"
                : "bg-slate-100 text-slate-500"
          }`}
        >
          {user.status}
        </span>
      ),
    },
    { header: "Última Atividade", accessor: "lastAccess" },
    {
      header: "Ações",
      align: "right" as const,
      accessor: (user: UserData) => (
        <div className='flex justify-end gap-2'>
          <button
            onClick={() => {
              setSelectedUser(user);
              setIsEditModalOpen(true);
            }}
            className='p-2 text-slate-300 hover:text-primary transition-all rounded-lg hover:bg-slate-100'
          >
            <Edit2 className='w-4 h-4' />
          </button>
          <button className='p-2 text-slate-300 hover:text-slate-900 transition-all rounded-lg hover:bg-slate-100'>
            <MoreHorizontal className='w-4 h-4' />
          </button>
        </div>
      ),
    },
  ];

  const adaptedUsers: UserData[] = MOCK_USERS.map((u) => ({
    ...u,
    status: u.sector === "Admin" || u.sector === "TI" ? "Ativo" : "Pendente",
    lastAccess:
      "Hoje, " +
      new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  }));

  return (
    <div className='space-y-8 animate-in fade-in duration-700'>
      <div className='flex items-end justify-between'>
        <div>
          <h2 className='text-3xl font-headline font-extrabold tracking-tight text-on-surface'>
            Gestão de Administradores
          </h2>
          <p className='text-on-surface-variant font-medium mt-1'>
            Controle permissões de acesso e monitore os supervisores do sistema.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className='flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm shadow-xl shadow-primary/20 hover:opacity-90 active:scale-95 transition-all'
        >
          <UserPlus className='w-5 h-5' />
          Registrar Novo Usuário
        </button>
      </div>

      <DataTable
        columns={columns}
        data={adaptedUsers}
        pagination={{
          currentPage: 1,
          totalPages: 1,
          totalItems: adaptedUsers.length,
          onPageChange: () => {},
        }}
      />

      <SentinelModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title='Registrar Novo Usuário'
        subtitle='Forneça identidade e detalhes de autorização para acesso ao sistema.'
      >
        <div className='space-y-6'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-1.5'>
              <label className='text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-1'>
                Nome Completo da Identidade
              </label>
              <input
                type='text'
                className='w-full bg-slate-50 border border-slate-100 rounded-lg px-4 py-3 text-sm font-medium focus:ring-1 focus:ring-primary/20 outline-none'
                placeholder='ex. Julian Vance'
              />
            </div>
            <div className='space-y-1.5'>
              <label className='text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-1'>
                Nível de Autorização
              </label>
              <select className='w-full bg-slate-50 border border-slate-100 rounded-lg px-4 py-3 text-sm font-medium focus:ring-1 focus:ring-primary/20 outline-none'>
                <option>Super Supervisor</option>
                <option>Segurança de Zona</option>
                <option>Administrador de TI</option>
              </select>
            </div>
          </div>

          <div className='space-y-1.5'>
            <label className='text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-1'>
              Endereço de E-mail Corporativo
            </label>
            <div className='relative'>
              <input
                type='email'
                className='w-full bg-slate-50 border border-slate-100 rounded-lg pl-10 pr-4 py-3 text-sm font-medium focus:ring-1 focus:ring-primary/20 outline-none'
                placeholder='nome@seguranca.com'
              />
              <Mail className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300' />
            </div>
          </div>

          <div className='p-4 bg-primary/5 rounded-xl border border-primary/10 flex gap-4'>
            <ShieldAlert className='w-6 h-6 text-primary shrink-0' />
            <div>
              <p className='text-xs font-bold text-primary uppercase tracking-tighter'>
                Protocolo de Segurança
              </p>
              <p className='text-[11px] text-slate-500 font-medium leading-relaxed mt-1'>
                Este usuário deverá realizar uma verificação biométrica facial
                no seu primeiro login no terminal.
              </p>
            </div>
          </div>
        </div>
      </SentinelModal>

      <SentinelModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title='Editar Administrador'
        subtitle='Atualize as informações de identidade e o nível de autorização.'
      >
        <div className='space-y-6'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-1.5'>
              <label className='text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-1'>
                Nome Completo da Identidade
              </label>
              <input
                type='text'
                defaultValue={selectedUser?.name}
                className='w-full bg-slate-50 border border-slate-100 rounded-lg px-4 py-3 text-sm font-medium focus:ring-1 focus:ring-primary/20 outline-none'
                placeholder='ex. Julian Vance'
              />
            </div>
            <div className='space-y-1.5'>
              <label className='text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-1'>
                Nível de Autorização
              </label>
              <select
                defaultValue={selectedUser?.role || "Super Supervisor"}
                className='w-full bg-slate-50 border border-slate-100 rounded-lg px-4 py-3 text-sm font-medium focus:ring-1 focus:ring-primary/20 outline-none'
              >
                <option>Super Supervisor</option>
                <option>Segurança de Zona</option>
                <option>Administrador de TI</option>
                <option>Operações</option>
              </select>
            </div>
          </div>

          <div className='space-y-1.5'>
            <label className='text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-1'>
              Endereço de E-mail Corporativo
            </label>
            <div className='relative'>
              <input
                type='email'
                defaultValue={selectedUser?.email}
                className='w-full bg-slate-50 border border-slate-100 rounded-lg pl-10 pr-4 py-3 text-sm font-medium focus:ring-1 focus:ring-primary/20 outline-none'
                placeholder='nome@seguranca.com'
              />
              <Mail className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300' />
            </div>
          </div>

          <div className='space-y-1.5'>
            <label className='text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-1'>
              Status de Segurança
            </label>
            <select
              defaultValue={selectedUser?.status || "Ativo"}
              className='w-full bg-slate-50 border border-slate-100 rounded-lg px-4 py-3 text-sm font-medium focus:ring-1 focus:ring-primary/20 outline-none'
            >
              <option>Ativo</option>
              <option>Pendente</option>
              <option>Revogado</option>
            </select>
          </div>

          <div className='flex justify-between items-center pt-2'>
            <button className='flex items-center gap-2 text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-bold transition-colors'>
              <Trash2 className='w-4 h-4' />
              Remover Acesso
            </button>
            {/* Note: the Save button is part of the SentinelModal footer by default */}
          </div>
        </div>
      </SentinelModal>
    </div>
  );
};

export default UsersPage;
