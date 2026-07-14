import { motion } from 'framer-motion';
import { CheckSquare, Square, AlertCircle } from 'lucide-react';

export default function Checklist({ items = [], variant = 'check', emptyText = 'None identified' }) {
  if (!items || items.length === 0) {
    return <p className="text-slate-500 text-sm italic">{emptyText}</p>;
  }

  return (
    <ul className="space-y-2">
      {items.map((item, i) => {
        const text = typeof item === 'string' ? item : (item.item || item.description || item.action || JSON.stringify(item));

        return (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-white/[0.03] transition-colors"
          >
            {variant === 'alert'
              ? <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              : <CheckSquare className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
            }
            <span className="text-sm text-slate-300 leading-relaxed">{text}</span>
          </motion.li>
        );
      })}
    </ul>
  );
}
