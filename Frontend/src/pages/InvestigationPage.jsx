import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ChevronLeft, LayoutDashboard, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import CaseForm from '../components/CaseForm';
import AIDashboard from '../components/AIDashboard';
import LoadingSpinner, { DashboardSkeleton } from '../components/LoadingSpinner';
import Toast from '../components/Toast';
import { useInvestigation } from '../hooks/useInvestigation';

export default function InvestigationPage() {
  const { analysis, loading, error, analyze } = useInvestigation();
  const [toast, setToast] = useState(null);
  const dashboardRef = useRef(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSubmit = async (formData) => {
    try {
      await analyze(formData);
      showToast('Analysis complete — dashboard updated.', 'success');
      // On mobile, scroll to results
      if (window.innerWidth < 1024 && dashboardRef.current) {
        setTimeout(() => dashboardRef.current.scrollIntoView({ behavior: 'smooth' }), 300);
      }
    } catch (err) {
      showToast(err.message || 'Analysis failed. Check backend connection.', 'error');
    }
  };

  return (
    <div className="min-h-screen pt-14 flex flex-col" style={{ background: '#020818' }}>
      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Page Header */}
      <div className="border-b border-white/[0.06] px-4 md:px-6 py-3 flex-shrink-0"
        style={{ background: 'rgba(4,13,31,0.8)', backdropFilter: 'blur(10px)' }}>
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-1.5 text-slate-500 hover:text-slate-300 transition-colors text-xs">
              <ChevronLeft className="w-4 h-4" />
              Home
            </Link>
            <span className="text-slate-700">/</span>
            <div className="flex items-center gap-2">
              <LayoutDashboard className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-xs font-semibold text-slate-300 tracking-wide">INVESTIGATION CONSOLE</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4 text-xs text-slate-600">
            <span className="font-mono">SESSION ACTIVE</span>
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Split Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden max-w-screen-2xl mx-auto w-full">

        {/* LEFT PANEL — Form (35%) */}
        <div className="lg:w-[35%] lg:flex-shrink-0 lg:border-r border-b lg:border-b-0 border-white/[0.06] flex flex-col lg:h-[calc(100vh-7.5rem)] lg:overflow-hidden"
          style={{ background: 'rgba(4,13,31,0.5)' }}>
          <div className="flex-1 overflow-y-auto">
            <CaseForm onSubmit={handleSubmit} loading={loading} />
          </div>
        </div>

        {/* RIGHT PANEL — Dashboard (65%) */}
        <div
          ref={dashboardRef}
          className="flex-1 lg:h-[calc(100vh-7.5rem)] lg:overflow-y-auto p-4 md:p-6"
        >
          <AnimatePresence mode="wait">
            {!analysis && !loading && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center text-center py-16"
              >
                {/* Animated shield */}
                <div className="relative w-24 h-24 mb-8">
                  <div className="absolute inset-0 rounded-full border border-blue-500/10 animate-ping" style={{ animationDuration: '3s' }} />
                  <div className="absolute inset-2 rounded-full border border-blue-500/15" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Shield className="w-10 h-10 text-blue-500/30" strokeWidth={1} />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-slate-400 mb-2">No Analysis Yet</h3>
                <p className="text-sm text-slate-600 max-w-sm leading-relaxed mb-8">
                  Fill in the case details on the left and click <span className="text-amber-400 font-semibold">Analyze Case</span> to generate AI-powered investigation insights.
                </p>

                {/* Feature tags */}
                <div className="flex flex-wrap justify-center gap-2">
                  {['Legal Analysis', 'Risk Assessment', 'Evidence Checklist', 'Timeline', 'Chargesheet Draft'].map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-[11px] text-slate-500">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass-card"
              >
                <LoadingSpinner />
              </motion.div>
            )}

            {analysis && !loading && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Dashboard header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <Brain className="w-5 h-5 text-blue-400" strokeWidth={1.5} />
                    <div>
                      <h2 className="text-sm font-bold text-white tracking-wide">AI ANALYSIS COMPLETE</h2>
                      <p className="text-[11px] text-slate-500 mt-0.5">Results generated by VIDURA Intelligence Engine</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-green-400 bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-full">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Live Results
                  </div>
                </div>

                <AIDashboard data={analysis} />
              </motion.div>
            )}

            {error && !loading && !analysis && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center glass-card p-10"
              >
                <div className="w-14 h-14 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
                  <span className="text-2xl">⚠️</span>
                </div>
                <h3 className="text-base font-bold text-red-400 mb-2">Analysis Failed</h3>
                <p className="text-sm text-slate-500 max-w-sm leading-relaxed">{error}</p>
                <p className="text-xs text-slate-600 mt-4">Ensure the FastAPI backend is running at http://127.0.0.1:8000</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
