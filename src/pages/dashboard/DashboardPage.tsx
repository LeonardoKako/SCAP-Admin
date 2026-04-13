import { Calendar, Users, AlertTriangle, LayoutGrid, TrendingUp, Ban, LogIn, LogOut } from 'lucide-react';

const DashboardPage = () => {
  const kpis = [
    { label: 'Acessos Hoje', value: '1,284', trend: '+12% vs ontem', icon: Calendar, color: 'bg-primary-container' },
    { label: 'Presentes no Momento', value: '432', sub: 'Ocupação: 64%', icon: Users, color: 'bg-primary-container' },
    { label: 'Acessos Negados', value: '7', sub: 'Ação Necessária', icon: AlertTriangle, color: 'bg-error', error: true },
    { label: 'Setores Ativos', value: '18', sub: '2 alertas de manutenção', icon: LayoutGrid, color: 'bg-primary-container' },
  ];

  const recentLogs = [
    { id: '#4920-A', user: 'Julian D. Vance', sector: 'Laboratório C', time: '14:32:05', type: 'Entrada', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
    { id: '#3112-B', user: 'Maria Lopez', sector: 'Servidores 01', time: '14:30:12', type: 'Saída', image: 'https://images.unsplash.com/photo-1494790108377-be9bc29b2933?w=100&h=100&fit=crop' },
    { id: '#8841-F', user: 'Erik Karlsson', sector: 'Perímetro Sul', time: '14:28:44', type: 'Entrada', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
  ];

  const alerts = [
    { title: 'Dispositivo Desconhecido', detail: 'Tentativa de Bypass', sector: 'Ala Admin', time: '14:25:31', status: 'Negado' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Page Heading */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-headline font-extrabold tracking-tight text-on-surface">Visão Geral do Painel</h2>
          <p className="text-on-surface-variant font-medium mt-1">Monitoramento em tempo real e métricas de acesso para zonas ativas.</p>
        </div>
        <div className="flex items-center space-x-3 text-sm font-bold bg-white px-4 py-2 rounded-full shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-slate-900 uppercase tracking-tighter">Monitoramento Ativo</span>
        </div>
      </div>

      {/* Bento Grid KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <div key={index} className="bg-white p-6 rounded-xl flex flex-col justify-between relative overflow-hidden shadow-sm border border-slate-100">
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${kpi.color}`}></div>
            <div className="flex justify-between items-start">
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.1em]">{kpi.label}</span>
              <kpi.icon className={`w-5 h-5 ${kpi.error ? 'text-error' : 'text-slate-300'}`} />
            </div>
            <div className="mt-4">
              <div className={`text-4xl font-headline font-bold ${kpi.error ? 'text-error' : 'text-on-surface'}`}>{kpi.value}</div>
              {kpi.trend ? (
                <div className="flex items-center text-green-600 text-xs font-bold mt-2">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {kpi.trend}
                </div>
              ) : (
                <div className="text-slate-400 text-xs font-medium mt-2 tracking-tight">{kpi.sub}</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Main Layout: Log and Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Real-time Access Log Feed */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200/50 overflow-hidden">
          <div className="px-8 py-6 flex justify-between items-center border-b border-slate-100">
            <h3 className="text-lg font-headline font-bold text-on-surface">Log de Acessos em Tempo Real</h3>
            <button className="text-[10px] font-extrabold text-primary hover:opacity-70 transition-all uppercase tracking-widest px-2 py-1">Ver Arquivo Completo</button>
          </div>
          <div className="p-6">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-bold">
                  <th className="px-4 py-4 border-b border-slate-50">Usuário / Identidade</th>
                  <th className="px-4 py-4 border-b border-slate-50">Setor</th>
                  <th className="px-4 py-4 border-b border-slate-50">Horário</th>
                  <th className="px-4 py-4 border-b border-slate-50 text-right">Tipo</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {recentLogs.map((log, idx) => (
                  <tr key={idx} className="group hover:bg-slate-50/50 transition-colors border-b border-slate-50/50">
                    <td className="px-4 py-5 font-medium">
                      <div className="flex items-center space-x-4">
                        <img src={log.image} alt={log.user} className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100/50" />
                        <div>
                          <div className="font-bold text-on-surface">{log.user}</div>
                          <div className="text-[11px] text-slate-400 font-bold uppercase tracking-tight">ID: {log.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-5 text-on-surface-variant font-semibold">{log.sector}</td>
                    <td className="px-4 py-5 text-slate-400 font-medium">{log.time}</td>
                    <td className="px-4 py-5 text-right">
                      <span className={`inline-flex items-center px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest ${
                        log.type === 'Entrada' ? 'bg-green-50 text-green-600 border border-green-100/50' : 'bg-slate-100 text-slate-500 border border-slate-200/50'
                      }`}>
                        {log.type === 'Entrada' ? <LogIn className="w-3 h-3 mr-1.5" /> : <LogOut className="w-3 h-3 mr-1.5" />}
                        {log.type}
                      </span>
                    </td>
                  </tr>
                ))}
                {alerts.map((alert, idx) => (
                  <tr key={idx} className="group bg-red-50/30 hover:bg-red-50/50 transition-colors border-b border-red-100/30">
                    <td className="px-4 py-5 border-l-4 border-l-error">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-error shadow-sm">
                          <Ban className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-error">{alert.title}</div>
                          <div className="text-[10px] text-error/80 font-extrabold uppercase tracking-tight">{alert.detail}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-5 text-error font-extrabold">{alert.sector}</td>
                    <td className="px-4 py-5 text-error/60 font-medium">{alert.time}</td>
                    <td className="px-4 py-5 text-right">
                      <span className="inline-block px-4 py-1.5 rounded-lg bg-error text-white text-[10px] font-bold uppercase tracking-widest shadow-sm">
                        {alert.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar: Stats & Map */}
        <div className="space-y-8 translate-y-2">
          {/* Access Frequency Chart Placeholder */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-headline font-bold text-on-surface mb-6 uppercase tracking-wider">Frequência de Acessos / Hora</h3>
            <div className="flex items-end space-x-2 h-40">
              {[30, 45, 25, 85, 100, 70, 40, 20].map((h, i) => (
                <div key={i} className={`flex-1 rounded-t-lg transition-all duration-500 ${h > 70 ? 'bg-primary' : 'bg-slate-200'}`} style={{ height: `${h}%` }}></div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
              <span>08:00</span>
              <span>12:00</span>
              <span>16:00</span>
              <span>20:00</span>
            </div>
          </div>

          {/* Mini Live Map Section (Updated with World Map) */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-headline font-bold text-on-surface mb-4 uppercase tracking-wider">Zonas de Monitoramento Ativo</h3>
            <div className="aspect-video bg-white rounded-lg overflow-hidden relative border border-slate-200/50 group">
              {/* World Map Background Rendering */}
              <div 
                className="absolute inset-0 opacity-[1] bg-center bg-no-repeat bg-contain"
                style={{ 
                    backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/e/ec/World_Map_Blank.svg")',
                    filter: 'grayscale(100%) brightness(0.7) contrast(1.2)'
                }}
              ></div>
              
              {/* Monitoring Points (Styled as pulses) */}
              <div className="absolute top-[35%] left-[25%] group-hover:scale-110 transition-transform">
                <span className="absolute inset-0 w-4 h-4 rounded-full bg-green-500/40 animate-ping"></span>
                <div className="relative w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
              </div>

              <div className="absolute top-[65%] left-[50%] group-hover:scale-110 transition-transform">
                <span className="absolute inset-0 w-4 h-4 rounded-full bg-red-500/40 animate-ping"></span>
                <div className="relative w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
              </div>

              <div className="absolute top-[68%] right-[28%] group-hover:scale-110 transition-transform">
                <div className="relative w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
              </div>
              
              <div className="absolute bottom-2 left-2 flex items-center gap-2 bg-slate-900/80 backdrop-blur-sm px-2.5 py-1.5 rounded text-[9px] text-white font-bold uppercase tracking-widest shadow-xl">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Sistemas Estáveis
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase">
              <span className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                Sensores Online
              </span>
              <span className="text-primary tracking-tighter">98.2% de Precisão</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
