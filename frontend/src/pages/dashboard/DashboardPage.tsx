import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, AlertTriangle, LayoutGrid, TrendingUp, LogIn, LogOut } from 'lucide-react';
import { api } from '../../services/api';

const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

const DashboardPage = () => {
  const [stats, setStats] = useState({
    todayAccess: 0,
    presentNow: 0,
    deniedAccess: 0,
    activeSectors: 0
  });
  const [recentLogs, setRecentLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [accessRes, sectorsRes, usersRes] = await Promise.all([
        api.get('/acessos'),
        api.get('/setores'),
        api.get('/usuarios')
      ]);

      const rawAccesses = accessRes.data;
      const sectorsCount = sectorsRes.data.length;
      const usersCount = usersRes.data.length;

      // 1. Acessos hoje
      const todayStr = new Date().toISOString().split('T')[0];
      const todayAccesses = rawAccesses.filter((a: any) => 
        a.dateTime.startsWith(todayStr)
      );

      // 2. Presentes no momento (usuários com última transação sendo ENTRY)
      const userLastAccessType: Record<number, string> = {};
      // Como a lista vem ordenada por data decrescente, o primeiro que encontramos é o mais recente
      rawAccesses.forEach((a: any) => {
        if (a.userId && !(a.userId in userLastAccessType)) {
          userLastAccessType[a.userId] = a.type;
        }
      });
      const activePresent = Object.values(userLastAccessType).filter(type => type === 'ENTRY').length;

      setStats({
        todayAccess: todayAccesses.length,
        presentNow: activePresent,
        deniedAccess: 0, // Sem logs de negação salvos no banco por enquanto
        activeSectors: sectorsCount
      });

      // 3. Pegar os últimos 5 logs formatados
      const formattedRecent = rawAccesses.slice(0, 5).map((l: any) => {
        const timeFormatted = new Date(l.dateTime).toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
        return {
          id: `#${l.id}`,
          user: l.user?.name || 'Desconhecido',
          idNumber: l.user ? `USR-${l.user.id}` : 'N/A',
          sector: l.user?.sector?.name || 'Lobby',
          time: timeFormatted,
          type: l.type === 'ENTRY' ? 'Entrada' : 'Saída',
          image: l.user?.avatar || DEFAULT_AVATAR
        };
      });
      setRecentLogs(formattedRecent);

    } catch (error) {
      console.error("Erro ao carregar dados do Dashboard", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const kpis = [
    { label: 'Acessos Hoje', value: String(stats.todayAccess), icon: Calendar, color: 'bg-primary-container', trend: 'Em tempo real' },
    { label: 'Presentes no Momento', value: String(stats.presentNow), icon: Users, color: 'bg-primary-container', sub: `Atividade ativa` },
    { label: 'Acessos Negados', value: String(stats.deniedAccess), icon: AlertTriangle, color: 'bg-error', error: stats.deniedAccess > 0, sub: 'Monitorado' },
    { label: 'Setores Ativos', value: String(stats.activeSectors), icon: LayoutGrid, color: 'bg-primary-container', trend: 'Estável' },
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
            <Link to="/logs" className="text-[10px] font-extrabold text-primary hover:opacity-70 transition-all uppercase tracking-widest px-2 py-1">Ver Arquivo Completo</Link>
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
                          <div className="text-[11px] text-slate-400 font-bold uppercase tracking-tight">ID: {log.idNumber}</div>
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
                {recentLogs.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-slate-400 font-medium">
                      Nenhum acesso registrado até o momento.
                    </td>
                  </tr>
                )}
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
                <span className="absolute inset-0 w-4 h-4 rounded-full bg-green-500/40 animate-ping"></span>
                <div className="relative w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
              </div>

              <div className="absolute top-[68%] right-[28%] group-hover:scale-110 transition-transform">
                <div className="relative w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
              </div>
              
              <div className="absolute bottom-2 left-2 flex items-center gap-2 bg-slate-900/80 backdrop-blur-sm px-2.5 py-1.5 rounded text-[9px] text-white font-bold uppercase tracking-widest shadow-xl">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
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
