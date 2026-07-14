import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  const isError = type === 'error';

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: '50%' }}
          animate={{ opacity: 1, y: 0, x: '50%' }}
          exit={{ opacity: 0, y: -20, x: '50%' }}
          className="fixed top-16 right-1/2 z-50 transform"
          style={{ right: '50%', transform: 'translateX(50%)' }}
        >
          <div className={`
            flex items-center gap-3 px-5 py-3 rounded-xl border text-sm font-medium
            backdrop-blur-xl shadow-2xl max-w-sm
            ${isError
              ? 'bg-red-950/90 border-red-500/30 text-red-200'
              : 'bg-green-950/90 border-green-500/30 text-green-200'
            }
          `}>
            {isError
              ? <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              : <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
            }
            <span>{message}</span>
            <button onClick={onClose} className="ml-2 text-current opacity-50 hover:opacity-100 transition-opacity">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
