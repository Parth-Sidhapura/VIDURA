import { motion } from 'framer-motion';
import { Clock, ChevronRight } from 'lucide-react';

export default function Timeline({ items = [] }) {
  if (!items || items.length === 0) {
    return (
      <p className="text-slate-500 text-sm italic">No timeline data available.</p>
    );
  }

  return (
    <div className="relative space-y-0 pl-6">
      {/* Vertical line */}
      <div className="absolute left-2.5 top-2 bottom-2 w-px bg-gradient-to-b from-blue-500/40 via-blue-500/20 to-transparent" />

      {items.map((item, index) => {
        const text = typeof item === 'string' ? item : (item.event || item.description || JSON.stringify(item));
        const time = typeof item === 'object' ? (item.time || item.timestamp || item.date || '') : '';

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
            className="relative pb-5 last:pb-0"
          >
            {/* Dot */}
            <div className="absolute -left-6 top-1.5 w-2.5 h-2.5 rounded-full bg-navy-900 border-2 border-blue-500/60 z-10" />

            <div className="glass-card p-3.5 hover:border-white/10 transition-colors cursor-default">
              <div className="flex items-start gap-2">
                {time && (
                  <div className="flex items-center gap-1 text-[10px] text-blue-400 font-mono whitespace-nowrap mt-0.5">
                    <Clock className="w-3 h-3" />
                    {time}
                  </div>
                )}
                <ChevronRight className="w-3.5 h-3.5 text-blue-500/50 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-300 leading-relaxed">{text}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
