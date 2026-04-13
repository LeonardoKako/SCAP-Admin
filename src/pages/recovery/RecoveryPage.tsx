import { ShieldCheck, Mail, ArrowRight, ArrowLeft, Lock, Verified } from 'lucide-react';
import { Link } from 'react-router-dom';

const RecoveryPage = () => {
  return (
    <main className="bg-surface font-body text-on-surface min-h-screen flex flex-col items-center justify-center relative px-6 py-12 overflow-hidden">
      {/* Background Section (Architectural Sentinel Style) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-secondary-container/20 blur-[120px]"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-primary-fixed/20 blur-[120px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-[440px]">
        {/* Branding Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 rounded-xl bg-primary-container text-white mb-6 shadow-lg shadow-primary/20">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="font-headline font-extrabold text-3xl tracking-tighter text-primary mb-2">SCAP Admin</h1>
          <p className="font-body text-on-surface-variant text-sm tracking-tight">Recuperação de Controle de Acesso</p>
        </div>

        {/* Recovery Card */}
        <div className="bg-surface-container-lowest/80 architectural-blur rounded-xl p-8 border border-white/50 shadow-[0px_24px_48px_-12px_rgba(25,28,30,0.08)]">
          <div className="mb-8">
            <h2 className="font-headline font-bold text-xl text-on-surface mb-2">Esqueceu a senha?</h2>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed">
              Insira o endereço de e-mail associado à sua conta de administrador. Enviaremos um link seguro para redefinir suas credenciais.
            </p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* Email Input Group */}
            <div className="space-y-2">
              <label className="font-label text-xs font-semibold uppercase tracking-wider text-on-surface-variant ml-1" htmlFor="email">E-mail Corporativo</label>
              <div className="relative group border-b border-outline-variant/30 focus-within:border-primary transition-all">
                <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none text-outline/40 group-focus-within:text-primary transition-colors">
                  <Mail className="w-5 h-5 ml-1" />
                </div>
                <input 
                  className="block w-full pl-10 pr-4 py-3.5 bg-transparent border-0 focus:ring-0 font-body text-sm placeholder:text-outline/40" 
                  id="email" 
                  name="email" 
                  placeholder="nome@scap-security.com" 
                  required 
                  type="email"
                />
              </div>
            </div>

            {/* Action Button */}
            <button className="w-full group relative overflow-hidden rounded-lg bg-gradient-to-r from-primary to-primary-container text-white font-body font-semibold py-4 px-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary-container/20 active:scale-[0.98]" type="submit">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Enviar Link de Recuperação
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </form>

          {/* Navigation Back */}
          <div className="mt-10 pt-6 border-t border-outline-variant/10 text-center">
            <Link to="/login" className="inline-flex items-center gap-2 text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Voltar para o Login
            </Link>
          </div>
        </div>

        {/* Visual Security Badge */}
        <div className="mt-8 flex items-center justify-center gap-4 text-outline-variant">
          <div className="flex items-center gap-1.5 opacity-60">
            <Lock className="w-3.5 h-3.5 fill-current" />
            <span className="font-label text-[10px] uppercase tracking-widest">Sessão Criptografada</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-outline-variant opacity-30"></div>
          <div className="flex items-center gap-1.5 opacity-60">
            <Verified className="w-3.5 h-3.5 fill-current" />
            <span className="font-label text-[10px] uppercase tracking-widest">Identidade Verificada</span>
          </div>
        </div>
      </div>

      {/* Footer Rendering */}
      <footer className="absolute bottom-0 w-full flex flex-col md:flex-row justify-between items-center px-8 py-6 opacity-30">
        <span className="font-body text-[10px] tracking-wide uppercase text-slate-400">© 2024 SCAP Security Systems. Todos os direitos reservados.</span>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a className="font-body text-[10px] tracking-wide uppercase text-slate-400 hover:text-slate-900 transition-all" href="#">Política de Privacidade</a>
          <a className="font-body text-[10px] tracking-wide uppercase text-slate-400 hover:text-slate-900 transition-all" href="#">Auditoria de Segurança</a>
        </div>
      </footer>
    </main>
  );
};

export default RecoveryPage;
