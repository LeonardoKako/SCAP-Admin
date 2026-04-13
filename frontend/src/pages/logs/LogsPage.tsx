import { useState } from 'react';
import { History, Search, Filter, Download, FileText, Calendar as CalendarIcon, LogIn, LogOut } from 'lucide-react';
import DataTable from '../../components/DataTable';
import { MOCK_LOGS, LogEntry } from '../../examples/data';

const LogsPage = () => {
  const [filterType, setFilterType] = useState<'Todos' | 'Entrada' | 'Saída' | 'Negado'>('Todos');

  const columns = [
    {
      header: 'Identidade do Evento',
      accessor: (log: LogEntry) => (
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${
            log.type === 'Negado' ? 'bg-red-50 text-red-500' : 'bg-slate-100 text-slate-400'
          }`}>
            <History className="w-5 h-5" />
          </div>
          <div>
            <div className={`font-bold ${log.type === 'Negado' ? 'text-red-900' : 'text-slate-900'}`}>{log.user}</div>
            <div className={`text-[10px] font-extrabold uppercase tracking-tight ${
              log.type === 'Negado' ? 'text-red-400' : 'text-slate-400'
            }`}>ID: {log.idNumber}</div>
          </div>
        </div>
      )
    },
    { header: 'Setor Alvo', accessor: 'sector' },
    { 
      header: 'Timestamp', 
      accessor: (log: LogEntry) => (
        <div>
          <div className="text-slate-900 font-bold">{log.time}</div>
          <div className="text-[10px] text-slate-400 font-bold uppercase">{log.date}</div>
        </div>
      )
    },
    { header: 'Terminal de Acesso', accessor: 'terminal' },
    { 
      header: 'Evento de Acesso', 
      align: 'right' as const,
      accessor: (log: LogEntry) => (
        <span className={`inline-flex items-center px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest ${
          log.type === 'Entrada' ? 'bg-green-50 text-green-600' : 
          log.type === 'Saída' ? 'bg-slate-100 text-slate-500' : 
          'bg-red-600 text-white shadow-sm shadow-red-200'
        }`}>
          {log.type === 'Entrada' && <LogIn className="w-3 h-3 mr-1.5" />}
          {log.type === 'Saída' && <LogOut className="w-3 h-3 mr-1.5" />}
          {log.type === 'Negado' && <Search className="w-3 h-3 mr-1.5" />}
          {log.type}
        </span>
      )
    }
  ];

  const filteredLogs = filterType === 'Todos' ? MOCK_LOGS : MOCK_LOGS.filter(log => log.type === filterType);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-headline font-extrabold tracking-tight text-on-surface">Logs de Auditoria de Acesso</h2>
          <p className="text-on-surface-variant font-medium mt-1">Histórico completo de todas as atividades de terminal e verificações de permissão.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-5 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all">
            <Download className="w-5 h-5" />
            Exportar Arquivo
          </button>
          <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm shadow-xl shadow-primary/20 hover:opacity-90 active:scale-95 transition-all">
            <FileText className="w-5 h-5" />
            Gerar Relatório
          </button>
        </div>
      </div>

      {/* Audit Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg border border-slate-100 flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Buscar por nome, ID ou setor..." className="bg-transparent border-0 focus:ring-0 text-sm font-medium w-full text-slate-900 placeholder:text-slate-400" />
        </div>
        
        <div className="flex bg-slate-50 p-1 rounded-lg border border-slate-100">
            {['Todos', 'Entrada', 'Saída', 'Negado'].map((type) => (
                <button 
                  key={type}
                  onClick={() => setFilterType(type as any)}
                  className={`px-4 py-1.5 rounded-md text-[10px] font-extrabold uppercase tracking-widest transition-all ${
                    filterType === type ? 'bg-white text-primary shadow-sm' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                    {type}
                </button>
            ))}
        </div>

        <button className="flex items-center gap-2 px-4 py-2 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-slate-900 transition-all">
            <Filter className="w-4 h-4" />
            Avançado
        </button>
        
        <div className="h-4 w-px bg-slate-200 mx-2"></div>

        <button className="flex items-center gap-2 px-4 py-2 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-slate-900 transition-all">
            <CalendarIcon className="w-4 h-4" />
            12 Out, 2024
        </button>
      </div>

      <DataTable 
        columns={columns} 
        data={filteredLogs} 
        pagination={{
            currentPage: 1,
            totalPages: 1,
            totalItems: filteredLogs.length,
            onPageChange: () => {}
        }}
      />
    </div>
  );
};

export default LogsPage;
