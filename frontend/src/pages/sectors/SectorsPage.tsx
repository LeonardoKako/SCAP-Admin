import { useState } from 'react';
import { MapPin, Plus, Edit2, Shield, MoreHorizontal, LayoutGrid, Trash2 } from 'lucide-react';
import DataTable from '../../components/DataTable';
import SentinelModal from '../../components/SentinelModal';
import { MOCK_SECTORS, SectorEntry as SectorData } from '../../examples/data';

const SectorsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSector, setSelectedSector] = useState<SectorData | null>(null);

  const columns = [
    {
      header: 'Designação do Setor',
      accessor: (sector: SectorData) => (
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="text-slate-900 font-bold">{sector.name}</div>
            <div className="text-[10px] text-slate-400 font-extrabold uppercase tracking-tight">ID da Zona: {sector.id}</div>
          </div>
        </div>
      )
    },
    {
        header: 'Ações',
        align: 'right' as const,
        accessor: (sector: SectorData) => (
          <div className="flex justify-end gap-2">
            <button 
              onClick={() => { setSelectedSector(sector); setIsEditModalOpen(true); }}
              className="p-2 text-slate-300 hover:text-primary transition-all rounded-lg hover:bg-slate-100"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
        )
      }
  ];


  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-headline font-extrabold tracking-tight text-on-surface">Infraestrutura do Setor</h2>
          <p className="text-on-surface-variant font-medium mt-1">Defina requisitos individuais de autorização de segurança para cada setor.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm shadow-xl shadow-primary/20 hover:opacity-90 active:scale-95 transition-all"
        >
          <Plus className="w-5 h-5" />
          Criar Novo Setor
        </button>
      </div>

      {/* Stats Cards (Specific to Sectors) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <Shield className="w-6 h-6 text-primary mb-3" />
            <div className="text-2xl font-headline font-extrabold text-on-surface">18 Setores Ativos</div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Vigilância Operacional</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm border-l-4 border-l-error">
            <Shield className="w-6 h-6 text-error mb-3" />
            <div className="text-2xl font-headline font-extrabold text-on-surface">3 Áreas Restritas</div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Alta Autorização Necessária</p>
        </div>
      </div>

      <DataTable 
        columns={columns} 
        data={MOCK_SECTORS} 
        pagination={{
            currentPage: 1,
            totalPages: 1,
            totalItems: MOCK_SECTORS.length,
            onPageChange: () => {}
        }}
      />

      <SentinelModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Mapear Novo Setor"
        subtitle="Defina o nome e a lógica de segurança do espaço de trabalho."
      >
        <div className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-1">Nome / Rótulo do Setor</label>
            <input type="text" className="w-full bg-slate-50 border border-slate-100 rounded-lg px-4 py-3 text-sm font-medium focus:ring-1 focus:ring-primary/20 outline-none" placeholder="ex. Laboratório de Pesquisa C" />
          </div>

          <div className="space-y-3">
             <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-1">Cargos com Autorização</label>
             <div className="flex flex-wrap gap-2">
                {['Admin de TI', 'Supervisor', 'Equipe', 'Manutenção'].map(role => (
                    <button key={role} className="px-3 py-1.5 rounded-lg border border-slate-100 text-[10px] font-bold text-slate-500 hover:border-primary hover:text-primary transition-all">
                        {role}
                    </button>
                ))}
             </div>
          </div>
        </div>
      </SentinelModal>

      <SentinelModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)}
        title="Editar Setor"
        subtitle="Modifique os parâmetros do setor selecionado."
      >
        <div className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-1">Nome / Rótulo do Setor</label>
            <input type="text" defaultValue={selectedSector?.name} className="w-full bg-slate-50 border border-slate-100 rounded-lg px-4 py-3 text-sm font-medium focus:ring-1 focus:ring-primary/20 outline-none" placeholder="ex. Laboratório de Pesquisa C" />
          </div>

          <div className="space-y-3">
             <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-1">Cargos com Autorização</label>
             <div className="flex flex-wrap gap-2">
                {['Admin de TI', 'Supervisor', 'Equipe', 'Manutenção'].map(role => (
                    <button key={role} className="px-3 py-1.5 rounded-lg border border-slate-100 text-[10px] font-bold text-slate-500 hover:border-primary hover:text-primary transition-all">
                        {role}
                    </button>
                ))}
             </div>
          </div>

          <div className="flex justify-between items-center pt-2">
             <button className="flex items-center gap-2 text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-bold transition-colors">
               <Trash2 className="w-4 h-4" />
               Excluir Setor
             </button>
          </div>
        </div>
      </SentinelModal>
    </div>
  );
};

export default SectorsPage;
