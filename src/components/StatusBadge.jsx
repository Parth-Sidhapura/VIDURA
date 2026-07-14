import { AlertTriangle, CheckCircle, Clock, AlertCircle, Zap } from 'lucide-react';

const iconMap = {
  high: AlertTriangle,
  critical: Zap,
  medium: AlertCircle,
  low: CheckCircle,
  pending: Clock,
  active: Zap,
  default: AlertCircle,
};

const colorMap = {
  high: 'badge-high',
  critical: 'badge-critical',
  medium: 'badge-medium',
  low: 'badge-low',
  pending: 'badge-medium',
  active: 'badge-high',
  completed: 'badge-low',
  filed: 'badge-low',
  draft: 'badge-blue',
  default: 'badge-blue',
};

export default function StatusBadge({ label, showIcon = true, size = 'md' }) {
  const key = (label || '').toLowerCase();
  const colorClass = colorMap[key] || colorMap.default;
  const Icon = iconMap[key] || iconMap.default;
  const sizeClass = size === 'lg' ? 'text-sm px-4 py-1.5' : '';

  return (
    <span className={`badge ${colorClass} ${sizeClass}`}>
      {showIcon && <Icon className="w-3 h-3" />}
      {label || 'Unknown'}
    </span>
  );
}
