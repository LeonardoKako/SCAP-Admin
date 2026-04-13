import { useState } from 'react';
import { UserPlus, MoreHorizontal, Edit2, ShieldAlert, Trash2, Mail } from 'lucide-react';
import DataTable from '../../components/DataTable';
import SentinelModal from '../../components/SentinelModal';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Revoked' | 'Pending';
  lastAccess: string;
  avatar: string;
}

const UsersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const columns = [
    {
      header: 'Administrator / Identity',
      accessor: (user: UserData) => (
        <div className="flex items-center gap-4">
          <img src={user.avatar} className="w-9 h-9 rounded-full border border-slate-100 object-cover" alt="" />
          <div>
            <div className="text-slate-900 font-bold">{user.name}</div>
            <div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-tight">ID: {user.id}</div>
          </div>
        </div>
      )
    },
    { header: 'Access Level', accessor: 'role' },
    { 
      header: 'Security Status', 
      accessor: (user: UserData) => (
        <span className={`px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-widest ${
          user.status === 'Active' ? 'bg-green-50 text-green-600' : 
          user.status === 'Revoked' ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-500'
        }`}>
          {user.status}
        </span>
      )
    },
    { header: 'Last Activity', accessor: 'lastAccess' },
    {
      header: 'Actions',
      align: 'right' as const,
      accessor: () => (
        <div className="flex justify-end gap-2">
          <button className="p-2 text-slate-300 hover:text-primary transition-all rounded-lg hover:bg-slate-100">
            <Edit2 className="w-4 h-4" />
          </button>
          <button className="p-2 text-slate-300 hover:text-slate-900 transition-all rounded-lg hover:bg-slate-100">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  const mockUsers: UserData[] = [
    { id: 'ADM-102', name: 'Julian D. Vance', email: 'j.vance@sentinel.com', role: 'Super Overseer', status: 'Active', lastAccess: '14:32:05 Today', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
    { id: 'ADM-441', name: 'Maria Lopez', email: 'm.lopez@sentinel.com', role: 'Zone Security', status: 'Active', lastAccess: '10:15:33 Today', avatar: 'https://images.unsplash.com/photo-1494790108377-be9bc29b2933?w=100&h=100&fit=crop' },
    { id: 'ADM-009', name: 'Erik Karlsson', email: 'e.karlsson@sentinel.com', role: 'IT Administrator', status: 'Revoked', lastAccess: '2 days ago', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
    { id: 'ADM-882', name: 'Sarah Chen', email: 's.chen@sentinel.com', role: 'Operations', status: 'Active', lastAccess: 'Just now', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-headline font-extrabold tracking-tight text-on-surface">Administrator Management</h2>
          <p className="text-on-surface-variant font-medium mt-1">Control access permissions and monitor system overseers.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm shadow-xl shadow-primary/20 hover:opacity-90 active:scale-95 transition-all"
        >
          <UserPlus className="w-5 h-5" />
          Enroll New Admin
        </button>
      </div>

      <DataTable 
        columns={columns} 
        data={mockUsers} 
        pagination={{
            currentPage: 1,
            totalPages: 1,
            totalItems: 4,
            onPageChange: () => {}
        }}
      />

      <SentinelModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Enroll New Administrator"
        subtitle="Provide identity and clearance details for system access."
      >
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-1">Full Identity Name</label>
              <input type="text" className="w-full bg-slate-50 border border-slate-100 rounded-lg px-4 py-3 text-sm font-medium focus:ring-1 focus:ring-primary/20 outline-none" placeholder="e.g. Julian Vance" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-1">Clearance Level</label>
              <select className="w-full bg-slate-50 border border-slate-100 rounded-lg px-4 py-3 text-sm font-medium focus:ring-1 focus:ring-primary/20 outline-none">
                <option>Super Overseer</option>
                <option>Zone Security</option>
                <option>IT Administrator</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-1.5">
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-1">Corporate Email Address</label>
            <div className="relative">
                <input type="email" className="w-full bg-slate-50 border border-slate-100 rounded-lg pl-10 pr-4 py-3 text-sm font-medium focus:ring-1 focus:ring-primary/20 outline-none" placeholder="name@security.com" />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
            </div>
          </div>

          <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 flex gap-4">
            <ShieldAlert className="w-6 h-6 text-primary shrink-0" />
            <div>
                <p className="text-xs font-bold text-primary uppercase tracking-tighter">Security Protocol</p>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-1">This user will be required to perform a face biometric scan on their first terminal login.</p>
            </div>
          </div>
        </div>
      </SentinelModal>
    </div>
  );
};

export default UsersPage;
