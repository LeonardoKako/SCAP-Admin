import React from 'react';
import { LockKeyhole, ArrowRight, AtSign, EyeOff, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <main className="bg-surface font-body text-on-surface min-h-screen flex flex-col items-center justify-center relative px-6 py-12 overflow-hidden">
      {/* Background Section (Architectural Sentinel Style) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-container/10 via-transparent to-transparent"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary-container/5 rounded-full blur-[120px]"></div>
        <div className="absolute top-[10%] left-[-5%] w-[400px] h-[400px] bg-secondary-container/10 rounded-full blur-[100px]"></div>
        
        {/* Architectural Grid Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="1"></path>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)"></rect>
        </svg>
      </div>

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-[440px]">
        {/* Logo Area */}
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-primary flex items-center justify-center rounded mb-4 shadow-lg shadow-primary/10">
            <LockKeyhole className="text-white w-7 h-7" />
          </div>
          <h1 className="font-headline font-bold text-3xl tracking-tighter text-primary">SCAP Admin</h1>
          <p className="text-on-surface-variant text-sm mt-2 font-medium tracking-tight">CONTROLE DE ACESSO ARQUITETURAL</p>
        </div>

        {/* Login Card */}
        <div className="bg-surface-container-lowest/80 architectural-blur p-10 rounded-xl shadow-[0px_24px_48px_-12px_rgba(25,28,30,0.08)] border border-white/50">
          <div className="mb-8">
            <h2 className="font-headline text-xl font-bold text-on-surface">Acesso Seguro</h2>
            <p className="text-on-surface-variant text-sm mt-1">Apenas pessoal autorizado.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="group">
              <label className="font-label text-[10px] font-bold uppercase tracking-[0.1em] text-outline mb-1.5 block px-1" htmlFor="email">E-mail</label>
              <div className="relative border-b border-outline-variant/30 focus-within:border-primary transition-colors">
                <input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="nome@seguranca.com" 
                  className="w-full bg-transparent border-0 px-0 py-3 text-on-surface placeholder:text-outline/40 focus:ring-0 text-sm font-medium" 
                  required 
                />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 text-outline/30">
                  <AtSign className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className="group">
              <div className="flex justify-between items-end mb-1.5 px-1">
                <label className="font-label text-[10px] font-bold uppercase tracking-[0.1em] text-outline block" htmlFor="password">Senha</label>
                <a href="/recovery" className="text-[10px] font-bold uppercase tracking-[0.1em] text-primary hover:opacity-70 transition-opacity">Esqueceu a senha?</a>
              </div>
              <div className="relative border-b border-outline-variant/30 focus-within:border-primary transition-colors">
                <input 
                  id="password" 
                  name="password" 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full bg-transparent border-0 px-0 py-3 text-on-surface placeholder:text-outline/40 focus:ring-0 text-sm font-medium" 
                  required 
                />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 text-outline/30 cursor-pointer hover:text-outline transition-colors">
                  <EyeOff className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Sign In Button */}
            <div className="pt-4">
              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-primary-container text-white font-headline font-bold py-4 rounded shadow-md shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <span>Entrar</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>

          {/* Additional Security Info */}
          <div className="mt-8 pt-8 border-t border-outline-variant/10">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-slate-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  Este portal é protegido por criptografia de multiplas camadas. 
                  <br/>Tentativas de acesso não autorizadas são registradas.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 flex justify-center gap-6">
          <a href="#" className="font-label text-[10px] font-bold uppercase tracking-[0.1em] text-outline hover:text-on-surface transition-colors">Status do Sistema</a>
          <a href="#" className="font-label text-[10px] font-bold uppercase tracking-[0.1em] text-outline hover:text-on-surface transition-colors">Privacidade</a>
          <a href="#" className="font-label text-[10px] font-bold uppercase tracking-[0.1em] text-outline hover:text-on-surface transition-colors">Suporte</a>
        </div>
      </div>

      {/* Main Footer (Subtle) */}
      <footer className="absolute bottom-0 w-full flex flex-col md:flex-row justify-between items-center px-8 py-6 opacity-30 group hover:opacity-100 transition-opacity pointer-events-none">
        <div className="font-body text-[10px] tracking-wide uppercase text-slate-400">
          © 2024 SCAP Security Systems. Todos os direitos reservados.
        </div>
        <div className="flex gap-6 mt-4 md:mt-0 pointer-events-auto">
          <a className="font-body text-[10px] tracking-wide uppercase text-slate-400 hover:text-slate-900 transition-all" href="#">Auditoria de Segurança</a>
        </div>
      </footer>
    </main>
  );
};

export default LoginPage;
