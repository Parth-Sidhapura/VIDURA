import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', hover = false, delay = 0, glow = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`glass-card ${hover ? 'glass-card-hover' : ''} ${glow ? 'shadow-glow-blue' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function CardSection({ title, icon: Icon, children, className = '' }) {
  return (
    <div className={`p-5 ${className}`}>
      {(title || Icon) && (
        <div className="flex items-center gap-2 mb-4">
          {Icon && <Icon className="w-4 h-4 text-blue-400" strokeWidth={2} />}
          {title && <span className="section-title mb-0">{title}</span>}
        </div>
      )}
      {children}
    </div>
  );
}
