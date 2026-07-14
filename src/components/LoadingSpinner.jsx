import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

export default function LoadingSpinner() {
  const steps = [
    'Parsing incident report...',
    'Cross-referencing BNS sections...',
    'Analyzing evidence requirements...',
    'Generating investigation strategy...',
    'Drafting legal analysis...',
  ];

  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
      {/* Animated ring */}
      <div className="relative w-20 h-20 mb-8">
        <div className="absolute inset-0 rounded-full border-2 border-blue-500/20" />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-2 rounded-full border border-transparent border-t-blue-400/50"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Brain className="w-8 h-8 text-blue-400" strokeWidth={1.5} />
          </motion.div>
        </div>
      </div>

      <motion.p
        className="text-sm font-semibold text-blue-400 mb-2 tracking-wider"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        VIDURA AI ANALYZING
      </motion.p>

      {/* Cycling steps */}
      <StepCycler steps={steps} />

      <div className="mt-6 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-blue-500"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </div>
    </div>
  );
}

function StepCycler({ steps }) {
  return (
    <motion.div className="h-5 overflow-hidden">
      <motion.div
        animate={{ y: steps.map((_, i) => -i * 20) }}
        transition={{
          duration: steps.length * 1.5,
          repeat: Infinity,
          times: steps.map((_, i) => i / steps.length),
          ease: 'easeInOut',
        }}
      >
        {steps.map((s, i) => (
          <p key={i} className="h-5 text-xs text-slate-400 leading-5">{s}</p>
        ))}
      </motion.div>
    </motion.div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Top cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="glass-card p-4">
            <div className="skeleton h-3 w-16 rounded mb-3" />
            <div className="skeleton h-6 w-24 rounded" />
          </div>
        ))}
      </div>
      {/* Content cards */}
      {[...Array(4)].map((_, i) => (
        <div key={i} className="glass-card p-5">
          <div className="skeleton h-3 w-24 rounded mb-4" />
          <div className="space-y-2">
            <div className="skeleton h-4 w-full rounded" />
            <div className="skeleton h-4 w-5/6 rounded" />
            <div className="skeleton h-4 w-4/6 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
