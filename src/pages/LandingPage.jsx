import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Shield, Brain, Zap, Scale, FileText, Target,
  ArrowRight, CheckCircle, Globe, Lock, ChevronRight
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    desc: 'Groq-accelerated intelligence analyzes incident reports in seconds, identifying patterns human investigators might miss.',
    color: 'blue',
  },
  {
    icon: Scale,
    title: 'Legal Section Mapping',
    desc: 'Automatically recommends applicable BNS, BNSS, and BSA sections based on crime type and incident description.',
    color: 'amber',
  },
  {
    icon: Target,
    title: 'Risk Assessment',
    desc: 'Instant risk level, priority, and severity scoring to help IOs allocate resources where they matter most.',
    color: 'red',
  },
  {
    icon: FileText,
    title: 'Document Generation',
    desc: 'AI drafts investigation reports and chargesheet frameworks to accelerate the legal documentation process.',
    color: 'green',
  },
  {
    icon: Zap,
    title: 'Next Best Actions',
    desc: 'Context-aware investigation steps, evidence checklists, and compliance reminders generated per case.',
    color: 'purple',
  },
  {
    icon: Lock,
    title: 'Secure & Compliant',
    desc: 'Built for Indian law enforcement with full respect for CrPC, evidence law, and data protection norms.',
    color: 'cyan',
  },
];

const stats = [
  { label: 'Legal Sections Mapped', value: '500+' },
  { label: 'Crime Categories', value: '40+' },
  { label: 'Avg Analysis Time', value: '< 8s' },
  { label: 'Document Templates', value: '12+' },
];

const colorMap = {
  blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: 'text-blue-400' },
  amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', icon: 'text-amber-400' },
  red: { bg: 'bg-red-500/10', border: 'border-red-500/20', icon: 'text-red-400' },
  green: { bg: 'bg-green-500/10', border: 'border-green-500/20', icon: 'text-green-400' },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', icon: 'text-purple-400' },
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', icon: 'text-cyan-400' },
};

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen grid-bg" style={{ backgroundSize: '40px 40px' }}>
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-14">
        {/* Glow backdrop */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)' }} />
          <div className="absolute top-0 left-1/4 w-[400px] h-[300px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.03) 0%, transparent 70%)' }} />
        </div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-widest uppercase mb-10"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          Ministry of Home Affairs — AI Initiative
        </motion.div>

        {/* Logo + Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 rounded-2xl blur-xl" />
              <div className="relative w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                <Shield className="w-9 h-9 text-blue-400" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-[0.08em] text-gradient-blue leading-none mb-4">
            VIDURA
          </h1>
          <p className="text-xs md:text-sm font-mono text-slate-500 tracking-[0.3em] uppercase">
            Virtual Intelligent Decision Unit for Responsive Assistance
          </p>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-10"
        >
          <p className="text-xl md:text-3xl font-light text-slate-300 mb-3">
            Wisdom Behind Every Investigation
          </p>
          <p className="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
            India's first AI-powered Criminal Investigation Assistant — empowering Investigating Officers
            with real-time analysis, legal intelligence, and structured investigation workflows.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <button
            onClick={() => navigate('/investigate')}
            className="btn-gold flex items-center gap-3 text-sm"
          >
            <Zap className="w-4 h-4" />
            Start Investigation
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 px-6 py-4 rounded-lg border border-white/10 text-sm text-slate-300 hover:bg-white/[0.04] hover:border-white/20 transition-all">
            <Globe className="w-4 h-4 text-slate-400" />
            View Documentation
          </button>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px w-full max-w-2xl bg-white/[0.04] rounded-2xl overflow-hidden border border-white/[0.06]"
        >
          {stats.map(({ label, value }) => (
            <div key={label} className="bg-navy-950 px-6 py-5 text-center">
              <p className="text-2xl font-black text-gradient-blue mb-1">{value}</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 flex flex-col items-center gap-2"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="text-[10px] text-slate-600 tracking-widest uppercase">Explore Features</p>
          <ChevronRight className="w-4 h-4 text-slate-600 rotate-90" />
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-xs font-bold text-blue-400 uppercase tracking-[0.3em] mb-4">Platform Capabilities</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Intelligence That Works at the Speed of Justice
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
              Every tool an Investigating Officer needs — from legal section lookup to chargesheet drafting — in one unified AI platform.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => {
              const c = colorMap[f.color];
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="glass-card glass-card-hover p-6 group"
                >
                  <div className={`w-10 h-10 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <f.icon className={`w-5 h-5 ${c.icon}`} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-10 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.08) 0%, transparent 70%)' }} />
            <Shield className="w-10 h-10 text-blue-400 mx-auto mb-6" strokeWidth={1.5} />
            <h2 className="text-2xl font-bold text-white mb-3">Ready to Begin?</h2>
            <p className="text-slate-400 text-sm mb-8 max-w-md mx-auto">
              Enter your first case and experience AI-powered investigation analysis built for Indian law enforcement.
            </p>
            <button
              onClick={() => navigate('/investigate')}
              className="btn-gold inline-flex items-center gap-3"
            >
              <Zap className="w-4 h-4" />
              Open Investigation Platform
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-blue-400" strokeWidth={1.5} />
            <span className="text-sm font-bold tracking-widest text-slate-300">VIDURA</span>
            <span className="text-slate-600 text-xs">|</span>
            <span className="text-xs text-slate-600">AI Investigation Platform</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-slate-600">
            <span>© 2025 VIDURA. Government AI Initiative.</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-3 h-3 text-green-500" />
              MHA Compliant
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
