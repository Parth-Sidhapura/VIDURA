import { useState } from 'react';
import { ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollableReport({ title, icon: Icon, sections = [], defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const [copied, setCopied] = useState(false);

  const allText = sections.map(s => `${s.label}:\n${s.value}`).join('\n\n');

  const handleCopy = async () => {
    await navigator.clipboard.writeText(allText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-2.5">
          {Icon && <Icon className="w-4 h-4 text-blue-400" />}
          <span className="text-sm font-semibold text-slate-200">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          {open && (
            <button
              onClick={(e) => { e.stopPropagation(); handleCopy(); }}
              className="p-1.5 rounded-md hover:bg-white/[0.06] transition-colors"
              title="Copy to clipboard"
            >
              {copied
                ? <Check className="w-3.5 h-3.5 text-green-400" />
                : <Copy className="w-3.5 h-3.5 text-slate-400" />
              }
            </button>
          )}
          {open
            ? <ChevronUp className="w-4 h-4 text-slate-400" />
            : <ChevronDown className="w-4 h-4 text-slate-400" />
          }
        </div>
      </button>

      {/* Content */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/[0.06] max-h-96 overflow-y-auto">
              <div className="p-5 space-y-5">
                {sections.map((s, i) => (
                  <div key={i}>
                    <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2">{s.label}</p>
                    <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{s.value || 'Not available'}</p>
                    {i < sections.length - 1 && <div className="divider" />}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
