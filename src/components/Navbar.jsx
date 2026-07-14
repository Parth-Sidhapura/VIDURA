import { Shield, Activity, Bell } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const isInvestigation = location.pathname === '/investigate';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-white/[0.06]"
      style={{ background: 'rgba(2,8,24,0.85)', backdropFilter: 'blur(20px)' }}>
      <div className="max-w-screen-2xl mx-auto h-full px-6 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors" />
            <Shield className="w-8 h-8 text-blue-400 relative z-10" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-bold tracking-[0.15em] text-white">VIDURA</span>
            <span className="text-[9px] text-slate-500 tracking-wider uppercase">Investigation AI</span>
          </div>
        </Link>

        {/* Center — system status */}
        {isInvestigation && (
          <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06]">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[11px] text-slate-400 font-mono tracking-wider">AI ENGINE ACTIVE</span>
          </div>
        )}

        {/* Right */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
            <Activity className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-mono">GROQ CONNECTED</span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <button className="relative p-2 rounded-lg hover:bg-white/[0.05] transition-colors">
            <Bell className="w-4 h-4 text-slate-400" />
            <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-blue-500" />
          </button>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-xs font-bold text-white">
            IO
          </div>
        </div>
      </div>
    </nav>
  );
}
