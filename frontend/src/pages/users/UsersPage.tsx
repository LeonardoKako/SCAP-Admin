import { useState, useEffect } from "react";
import {
  UserPlus,
  Edit2,
  ShieldAlert,
  Trash2,
  Mail,
  Lock,
  UserCheck,
} from "lucide-react";
import DataTable from "../../components/DataTable";
import SentinelModal from "../../components/SentinelModal";
import { User } from "../../examples/data";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import { useAuthStore } from "../../store/authStore";

interface UserData extends User {
  status: "Ativo" | "Revogado" | "Pendente";
  lastAccess: string;
}

const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

const UsersPage = () => {
  const currentUser = useAuthStore((state) => state.user);
  const [users, setUsers] = useState<UserData[]>([]);
  const [sectors, setSectors] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  // Form states for creating a user
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newSectorId, setNewSectorId] = useState("");
  const [newProfileId, setNewProfileId] = useState("1"); // Default to 1 (Supervisor)

  // Form states for editing a user
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editSectorId, setEditSectorId] = useState("");
  const [editProfileId, setEditProfileId] = useState("");

  const fetchUsersAndSectors = async () => {
    setLoading(true);
    try {
      const [usersRes, sectorsRes] = await Promise.all([
        api.get("/usuarios"),
        api.get("/setores")
      ]);

      const loadedSectors = sectorsRes.data;
      setSectors(loadedSectors);

      const loadedUsers = usersRes.data.map((u: any) => {
        const sectorName = u.sector?.name || "";
        const roleName = u.profile?.name || "";
        return {
          id: String(u.id),
          name: u.name,
          email: u.email,
          sector: sectorName,
          role: roleName,
          avatar: u.avatar || DEFAULT_AVATAR,
          status: sectorName === "Admin" || sectorName === "TI" ? "Ativo" : "Pendente",
          lastAccess: "Hoje, " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
      });
      setUsers(loadedUsers);
    } catch (error: any) {
      toast.error("Erro ao carregar dados do banco.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersAndSectors();
  }, []);

  const handleRegisterUser = async () => {
    if (!newName || !newEmail || !newPassword || !newSectorId || !newProfileId) {
      toast.warning("Por favor, preencha todos os campos.");
      return;
    }
    try {
      await api.post("/criar/usuario", {
        name: newName,
        email: newEmail,
        password: newPassword,
        profileId: Number(newProfileId),
        sectorId: Number(newSectorId),
      });
      toast.success("Usuário registrado com sucesso!");
      setIsModalOpen(false);
      // Reset form fields
      setNewName("");
      setNewEmail("");
      setNewPassword("");
      setNewSectorId("");
      setNewProfileId("1");
      fetchUsersAndSectors();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Erro ao registrar usuário.");
    }
  };

  const handleEditUser = async () => {
    if (!selectedUser) return;
    if (!editName || !editEmail || !editSectorId || !editProfileId) {
      toast.warning("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    try {
      await api.put(`/atualizar/usuario/${selectedUser.id}`, {
        name: editName,
        email: editEmail,
        profileId: Number(editProfileId),
        sectorId: Number(editSectorId),
      });
      toast.success("Usuário atualizado com sucesso!");
      setIsEditModalOpen(false);
      fetchUsersAndSectors();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Erro ao atualizar usuário.");
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    if (selectedUser.id === currentUser?.id) {
      toast.error("Você não pode excluir a sua própria conta!");
      return;
    }
    if (!window.confirm(`Tem certeza que deseja excluir o usuário ${selectedUser.name}?`)) {
      return;
    }
    try {
      await api.delete(`/deletar/usuario/${selectedUser.id}`);
      toast.success("Usuário removido com sucesso!");
      setIsEditModalOpen(false);
      fetchUsersAndSectors();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Erro ao excluir usuário.");
    }
  };

  const openEditModal = (user: UserData) => {
    setSelectedUser(user);
    setEditName(user.name);
    setEditEmail(user.email);

    // Encontrar os IDs a partir do setor e perfil correspondentes
    const matchedSector = sectors.find(s => s.name === user.sector);
    setEditSectorId(matchedSector ? String(matchedSector.id) : "");

    // Definir o profile correspondente (ou usar default)
    let pId = "1";
    if (user.role.includes("Técnico")) pId = "2";
    else if (user.role.includes("Gestor")) pId = "3";
    else if (user.role.includes("Consultor")) pId = "4";
    setEditProfileId(pId);

    setIsEditModalOpen(true);
  };

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
    { header: "Setor", accessor: "sector" },
    { header: "Perfil / Cargo", accessor: "role" },
    { header: "Última Atividade", accessor: "lastAccess" },
    {
      header: "Ações",
      align: "right" as const,
      accessor: (user: UserData) => (
        <div className='flex justify-end gap-2'>
          <button
            onClick={() => openEditModal(user)}
            className='p-2 text-slate-300 hover:text-primary transition-all rounded-lg hover:bg-slate-100'
          >
            <Edit2 className='w-4 h-4' />
          </button>
        </div>
      ),
    },
  ];

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
          onClick={() => {
            // Escolher o primeiro setor da lista como default
            if (sectors.length > 0) {
              setNewSectorId(String(sectors[0].id));
            }
            setIsModalOpen(true);
          }}
          className='flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm shadow-xl shadow-primary/20 hover:opacity-90 active:scale-95 transition-all'
        >
          <UserPlus className='w-5 h-5' />
          Registrar Novo Usuário
        </button>
      </div>

      <DataTable
        columns={columns}
        data={users}
        pagination={{
          currentPage: 1,
          totalPages: 1,
          totalItems: users.length,
          onPageChange: () => {},
        }}
      />

      <SentinelModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleRegisterUser}
        title='Registrar Novo Usuário'
        subtitle='Forneça identidade e detalhes de autorização para acesso ao sistema.'
        saveLabel='Registrar Usuário'
      >
        <div className='space-y-6'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-1.5'>
              <label className='text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-1'>
                Nome Completo
              </label>
              <input
                type='text'
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className='w-full bg-slate-50 border border-slate-100 rounded-lg px-4 py-3 text-sm font-medium focus:ring-1 focus:ring-primary/20 outline-none'
                placeholder='ex. Julian Vance'
              />
            </div>
            <div className='space-y-1.5'>
              <label className='text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-1'>
                Setor de Atuação
              </label>
              <select
                value={newSectorId}
                onChange={(e) => setNewSectorId(e.target.value)}
                className='w-full bg-slate-50 border border-slate-100 rounded-lg px-4 py-3 text-sm font-medium focus:ring-1 focus:ring-primary/20 outline-none'
              >
                {sectors.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-1.5'>
              <label className='text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-1'>
                Perfil / Cargo
              </label>
              <select
                value={newProfileId}
                onChange={(e) => setNewProfileId(e.target.value)}
                className='w-full bg-slate-50 border border-slate-100 rounded-lg px-4 py-3 text-sm font-medium focus:ring-1 focus:ring-primary/20 outline-none'
              >
                <option value='1'>Supervisor do Sistema</option>
                <option value='2'>Técnico de Segurança</option>
                <option value='3'>Gestor de Contas</option>
                <option value='4'>Consultor Comercial</option>
              </select>
            </div>
            <div className='space-y-1.5'>
              <label className='text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-1'>
                Senha de Acesso
              </label>
              <div className='relative'>
                <input
                  type='password'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className='w-full bg-slate-50 border border-slate-100 rounded-lg pl-10 pr-4 py-3 text-sm font-medium focus:ring-1 focus:ring-primary/20 outline-none'
                  placeholder='••••••••'
                />
                <Lock className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300' />
              </div>
            </div>
          </div>

          <div className='space-y-1.5'>
            <label className='text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-1'>
              Endereço de E-mail Corporativo
            </label>
            <div className='relative'>
              <input
                type='email'
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
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
                A senha fornecida será criptografada com algoritmos de hash seguros no banco de dados.
              </p>
            </div>
          </div>
        </div>
      </SentinelModal>

      <SentinelModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEditUser}
        title='Editar Administrador'
        subtitle='Atualize as informações de identidade e o nível de autorização.'
        saveLabel='Salvar Alterações'
      >
        <div className='space-y-6'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-1.5'>
              <label className='text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-1'>
                Nome Completo
              </label>
              <input
                type='text'
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className='w-full bg-slate-50 border border-slate-100 rounded-lg px-4 py-3 text-sm font-medium focus:ring-1 focus:ring-primary/20 outline-none'
                placeholder='ex. Julian Vance'
              />
            </div>
            <div className='space-y-1.5'>
              <label className='text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-1'>
                Setor de Atuação
              </label>
              <select
                value={editSectorId}
                onChange={(e) => setEditSectorId(e.target.value)}
                className='w-full bg-slate-50 border border-slate-100 rounded-lg px-4 py-3 text-sm font-medium focus:ring-1 focus:ring-primary/20 outline-none'
              >
                {sectors.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-1.5 col-span-2'>
              <label className='text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-1'>
                Perfil / Cargo
              </label>
              <select
                value={editProfileId}
                onChange={(e) => setEditProfileId(e.target.value)}
                className='w-full bg-slate-50 border border-slate-100 rounded-lg px-4 py-3 text-sm font-medium focus:ring-1 focus:ring-primary/20 outline-none'
              >
                <option value='1'>Supervisor do Sistema</option>
                <option value='2'>Técnico de Segurança</option>
                <option value='3'>Gestor de Contas</option>
                <option value='4'>Consultor Comercial</option>
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
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                className='w-full bg-slate-50 border border-slate-100 rounded-lg pl-10 pr-4 py-3 text-sm font-medium focus:ring-1 focus:ring-primary/20 outline-none'
                placeholder='nome@seguranca.com'
              />
              <Mail className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300' />
            </div>
          </div>

          <div className='flex justify-between items-center pt-2 border-t border-slate-100'>
            <button
              type='button'
              onClick={handleDeleteUser}
              className='flex items-center gap-2 text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-bold transition-colors'
            >
              <Trash2 className='w-4 h-4' />
              Remover Acesso
            </button>
          </div>
        </div>
      </SentinelModal>
    </div>
  );
};

export default UsersPage;
