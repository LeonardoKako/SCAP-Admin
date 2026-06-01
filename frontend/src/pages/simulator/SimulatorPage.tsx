import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Shield, ArrowLeft, RefreshCw, Cpu, CheckCircle2, AlertOctagon } from "lucide-react";
import { api } from "../../services/api";
import { toast } from "react-toastify";

const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

type TerminalState = "idle" | "reading" | "authorized" | "denied";

const SimulatorPage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [terminalState, setTerminalState] = useState<TerminalState>("idle");
  const [lastUserEvent, setLastUserEvent] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await api.get("/usuarios");
      setUsers(res.data);
      if (res.data.length > 0) {
        setSelectedUserId(String(res.data[0].id));
      }
    } catch (error) {
      toast.error("Erro ao carregar usuários para o simulador.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSimulateTap = async () => {
    if (!selectedUserId) {
      toast.warning("Selecione um usuário para simular.");
      return;
    }

    setTerminalState("reading");
    setErrorMessage("");
    setLastUserEvent(null);

    // Pequeno delay para simular a leitura do crachá/biometria física
    setTimeout(async () => {
      try {
        const response = await api.post("/registrar/acesso", {
          userId: Number(selectedUserId),
        });

        const accessData = response.data.data;
        
        // Achar o usuário correspondente localmente para exibir detalhes na tela da catraca
        const matchedUser = users.find(u => String(u.id) === selectedUserId);

        setLastUserEvent({
          name: matchedUser?.name || "Funcionário",
          email: matchedUser?.email || "",
          sector: matchedUser?.sector?.name || "Lobby",
          role: matchedUser?.profile?.name || "Colaborador",
          avatar: matchedUser?.avatar || DEFAULT_AVATAR,
          type: accessData.type === "ENTRY" ? "Entrada" : "Saída",
          time: new Date(accessData.dateTime).toLocaleTimeString('pt-BR'),
        });

        setTerminalState("authorized");
      } catch (error: any) {
        const matchedUser = users.find(u => String(u.id) === selectedUserId);
        const errMsg = error.response?.data?.message || "Setor restrito ou falha de identificação.";
        
        setErrorMessage(errMsg);
        setLastUserEvent({
          name: matchedUser?.name || "Usuário",
          role: matchedUser?.profile?.name || "Colaborador",
          sector: matchedUser?.sector?.name || "Lobby",
          avatar: matchedUser?.avatar || DEFAULT_AVATAR,
        });
        setTerminalState("denied");
      }
    }, 1200);
  };

  const handleResetTerminal = () => {
    setTerminalState("idle");
    setLastUserEvent(null);
    setErrorMessage("");
  };

  return (
    <main className='min-h-screen bg-slate-50 text-slate-800 font-body flex flex-col items-center justify-center p-6 relative overflow-hidden'>
      {/* Decorative Grid Background */}
      <div className='absolute inset-0 z-0 pointer-events-none opacity-[0.04] bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:40px_40px]'></div>
      <div className='absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none'></div>
      <div className='absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none'></div>

      {/* Header / Brand */}
      <div className='relative z-10 mb-8 flex flex-col items-center text-center'>
        <div className='w-12 h-12 bg-primary flex items-center justify-center rounded-xl mb-3 shadow-lg shadow-primary/20'>
          <Shield className='text-white w-6 h-6' />
        </div>
        <h1 className='font-headline font-extrabold text-3xl tracking-tight text-slate-900'>
          SCAP Biometrics
        </h1>
        <p className='text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1.5'>
          TERMINAL SIMULADOR DE CATRACA FÍSICA
        </p>
      </div>

      {/* Main Terminal Frame */}
      <div className='relative z-10 w-full max-w-md bg-white rounded-3xl border border-slate-200/80 p-8 shadow-[0_24px_50px_-12px_rgba(15,23,42,0.08)] flex flex-col items-center transition-all duration-300'>
        {/* Status Circular Indicator */}
        <div className='mb-8 relative flex items-center justify-center'>
          {/* Glowing Aura Outer Ring */}
          <div
            className={`absolute w-32 h-32 rounded-full transition-all duration-500 blur-md ${
              terminalState === "idle"
                ? "bg-sky-500/10 animate-pulse"
                : terminalState === "reading"
                  ? "bg-amber-500/10 animate-spin [animation-duration:3s]"
                  : terminalState === "authorized"
                    ? "bg-emerald-500/20 shadow-[0_0_40px_8px_rgba(16,185,129,0.2)]"
                    : "bg-rose-500/20 shadow-[0_0_40px_8px_rgba(244,63,94,0.2)]"
            }`}
          ></div>

          {/* Solid Middle Ring */}
          <div
            className={`w-24 h-24 rounded-full border-4 flex items-center justify-center transition-all duration-500 relative z-10 bg-slate-50 ${
              terminalState === "idle"
                ? "border-sky-500/30 text-sky-500"
                : terminalState === "reading"
                  ? "border-amber-500/50 text-amber-500"
                  : terminalState === "authorized"
                    ? "border-emerald-500 text-emerald-500"
                    : "border-rose-500 text-rose-500"
            }`}
          >
            {terminalState === "idle" && <Cpu className='w-8 h-8 animate-pulse text-sky-500' />}
            {terminalState === "reading" && <RefreshCw className='w-8 h-8 text-amber-500 animate-spin' />}
            {terminalState === "authorized" && <CheckCircle2 className='w-10 h-10 text-emerald-500' />}
            {terminalState === "denied" && <AlertOctagon className='w-10 h-10 text-rose-500' />}
          </div>
        </div>

        {/* Text Display screen (Retro Terminal Style - Pure contrast) */}
        <div className='w-full bg-slate-950 border border-slate-900 rounded-xl p-5 mb-6 font-mono text-center relative overflow-hidden shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)]'>
          {/* Scanline Effect */}
          <div className='absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] pointer-events-none'></div>

          <div
            className={`text-sm uppercase tracking-widest font-extrabold transition-all duration-300 ${
              terminalState === "idle"
                ? "text-sky-400"
                : terminalState === "reading"
                  ? "text-amber-400"
                  : terminalState === "authorized"
                    ? "text-emerald-400"
                    : "text-rose-400"
            }`}
          >
            {terminalState === "idle" && ">> SISTEMA ONLINE <<"}
            {terminalState === "reading" && "LENDO BIOMETRIA..."}
            {terminalState === "authorized" && "ACESSO CONCEDIDO"}
            {terminalState === "denied" && "ACESSO NEGADO"}
          </div>

          <div className='text-[10px] text-slate-400 mt-2 uppercase font-bold tracking-wider'>
            {terminalState === "idle" && "Aproxime seu cartão / biometria"}
            {terminalState === "reading" && "Aguarde validação de chaves..."}
            {terminalState === "authorized" && `REGISTRO: ${lastUserEvent?.type}`}
            {terminalState === "denied" && `TENTATIVA INVÁLIDA`}
          </div>
        </div>

        {/* User swipe Details Block (if authorized or denied) */}
        {lastUserEvent && (
          <div className='w-full bg-slate-50 rounded-xl border border-slate-200 p-4 mb-6 flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300'>
            <img
              src={lastUserEvent.avatar}
              className={`w-12 h-12 rounded-full object-cover border-2 ${
                terminalState === "authorized" ? "border-emerald-500" : "border-rose-500"
              }`}
              alt=''
            />
            <div className='flex-1 overflow-hidden'>
              <div className='text-sm font-extrabold text-slate-900 truncate'>{lastUserEvent.name}</div>
              <div className='text-[10px] text-slate-400 font-extrabold uppercase tracking-tight truncate'>
                {lastUserEvent.role}
              </div>
              <div className='text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-0.5 truncate'>
                Setor: {lastUserEvent.sector}
              </div>
            </div>
            {terminalState === "authorized" && (
              <div className='text-right shrink-0'>
                <div className='text-[11px] font-bold text-emerald-600 uppercase'>
                  {lastUserEvent.type}
                </div>
                <div className='text-[9px] text-slate-400 mt-0.5 font-bold'>
                  {lastUserEvent.time}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Error Detail Display */}
        {errorMessage && (
          <div className='w-full bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold uppercase tracking-wide rounded-xl p-3.5 text-center mb-6 animate-in fade-in duration-200'>
            MOTIVO: {errorMessage}
          </div>
        )}

        {/* Form Controls */}
        <div className='w-full space-y-4'>
          {terminalState === "idle" || terminalState === "reading" ? (
            <>
              {/* User Dropdown */}
              <div className='space-y-1.5'>
                <label className='text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-1'>
                  Selecione o Usuário (Crachá)
                </label>
                <select
                  value={selectedUserId}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                  disabled={terminalState === "reading"}
                  className='w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 outline-none focus:border-primary transition-all disabled:opacity-50 cursor-pointer'
                >
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.sector?.name || "Sem Setor"})
                    </option>
                  ))}
                  {users.length === 0 && (
                    <option value=''>Nenhum usuário cadastrado</option>
                  )}
                </select>
              </div>

              {/* Bipar Button */}
              <button
                type='button'
                onClick={handleSimulateTap}
                disabled={terminalState === "reading" || users.length === 0}
                className='w-full bg-primary text-white font-headline font-extrabold py-4 rounded-xl shadow-lg shadow-primary/20 hover:opacity-95 hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-50'
              >
                <span>Aproximar Crachá (Bipar)</span>
              </button>
            </>
          ) : (
            /* Reset button to clear card tap status */
            <button
              type='button'
              onClick={handleResetTerminal}
              className='w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-headline font-extrabold py-4 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2'
            >
              <span>Aguardar Novo Crachá</span>
            </button>
          )}
        </div>
      </div>

      {/* Back to Dashboard Link */}
      <Link
        to='/dashboard'
        className='relative z-10 mt-8 flex items-center gap-2 text-slate-400 hover:text-primary font-bold text-xs uppercase tracking-widest transition-colors'
      >
        <ArrowLeft className='w-4 h-4' />
        <span>Voltar ao Painel Admin</span>
      </Link>
    </main>
  );
};

export default SimulatorPage;
