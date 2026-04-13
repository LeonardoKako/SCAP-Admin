import { useState } from 'react';
import { MapPin, Plus, Edit2, Shield, MoreHorizontal, LayoutGrid } from 'lucide-react';
import DataTable from '../../components/DataTable';
import SentinelModal from '../../components/SentinelModal';

interface SectorData {
  id: string;
  name: string;
  zone: string;
  occupancy: string;
  status: 'Secure' | 'Warning' | 'Locked';
  authorizedRoles: string;
}

const SectorsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    {
      header: 'Sector Designation',
      accessor: (sector: SectorData) => (
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="text-slate-900 font-bold">{sector.name}</div>
            <div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-tight">Zone ID: {sector.id}</div>
          </div>
        </div>
      )
    },
    { header: 'Geographical Zone', accessor: 'zone' },
    { 
      header: 'Current Occupancy', 
      accessor: (sector: SectorData) => (
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-primary" style={{ width: sector.occupancy }}></div>
          </div>
          <span className="text-xs font-bold text-slate-900">{sector.occupancy}</span>
        </div>
      )
    },
    { 
      header: 'Security Level', 
      accessor: (sector: SectorData) => (
        <span className={`px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-widest ${
          sector.status === 'Secure' ? 'bg-green-50 text-green-600' : 
          sector.status === 'Locked' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
        }`}>
          {sector.status}
        </span>
      )
    },
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

  const mockSectors: SectorData[] = [
    { id: 'SEC-A1', name: 'Main Server Room', zone: 'North Wing', occupancy: '14%', status: 'Secure', authorizedRoles: 'IT Admin, Super Overseer' },
    { id: 'SEC-C3', name: 'Research Lab Gamma', zone: 'West Complex', occupancy: '82%', status: 'Warning', authorizedRoles: 'Research Staff, Admin' },
    { id: 'SEC-Z9', name: 'Executive Suite', zone: 'Penthouse', occupancy: '5%', status: 'Locked', authorizedRoles: 'Board Members only' },
    { id: 'SEC-B2', name: 'Loading Dock', zone: 'South Perimeter', occupancy: '45%', status: 'Secure', authorizedRoles: 'Logistics, Operations' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-headline font-extrabold tracking-tight text-on-surface">Sector Infrastructure</h2>
          <p className="text-on-surface-variant font-medium mt-1">Define geographical zones and individual security clearance requirements.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm shadow-xl shadow-primary/20 hover:opacity-90 active:scale-95 transition-all"
        >
          <LayoutGrid className="w-5 h-5" />
          Propose New Sector
        </button>
      </div>

      {/* Stats Cards (Specific to Sectors) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <Shield className="w-6 h-6 text-primary mb-3" />
            <div className="text-2xl font-headline font-extrabold text-on-surface">18 Active Zones</div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Operational Surveillance</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <MapPin className="w-6 h-6 text-primary mb-3" />
            <div className="text-2xl font-headline font-extrabold text-on-surface">4 Complexes</div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Global Perimeter</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm border-l-4 border-l-error">
            <Shield className="w-6 h-6 text-error mb-3" />
            <div className="text-2xl font-headline font-extrabold text-on-surface">3 Restricted Areas</div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">High Clearance Required</p>
        </div>
      </div>

      <DataTable 
        columns={columns} 
        data={mockSectors} 
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
        title="Map New Sector"
        subtitle="Define physical boundaries and security logic for the workspace."
      >
        <div className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-1">Sector Name / Label</label>
            <input type="text" className="w-full bg-slate-50 border border-slate-100 rounded-lg px-4 py-3 text-sm font-medium focus:ring-1 focus:ring-primary/20 outline-none" placeholder="e.g. Research Lab C" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-1">Geographical Zone</label>
              <select className="w-full bg-slate-50 border border-slate-100 rounded-lg px-4 py-3 text-sm font-medium focus:ring-1 focus:ring-primary/20 outline-none">
                <option>North Wing</option>
                <option>South Perimeter</option>
                <option>West Complex</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-1">Initial Security Level</label>
              <select className="w-full bg-slate-50 border border-slate-100 rounded-lg px-4 py-3 text-sm font-medium focus:ring-1 focus:ring-primary/20 outline-none">
                <option>Secure (Standard)</option>
                <option>Restricted (Admin Only)</option>
                <option>Isolated (No Access)</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
             <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-1">Authorized Clearance Roles</label>
             <div className="flex flex-wrap gap-2">
                {['IT Admin', 'Overseer', 'Staff', 'Maintenance'].map(role => (
                    <button key={role} className="px-3 py-1.5 rounded-lg border border-slate-100 text-[10px] font-bold text-slate-500 hover:border-primary hover:text-primary transition-all">
                        {role}
                    </button>
                ))}
             </div>
          </div>
        </div>
      </SentinelModal>
    </div>
  );
};

export default SectorsPage;
