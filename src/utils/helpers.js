export const getRiskColor = (level) => {
  const l = (level || '').toLowerCase();
  if (l === 'critical') return 'badge-critical';
  if (l === 'high') return 'badge-high';
  if (l === 'medium') return 'badge-medium';
  if (l === 'low') return 'badge-low';
  return 'badge-blue';
};

export const getRiskGlow = (level) => {
  const l = (level || '').toLowerCase();
  if (l === 'critical' || l === 'high') return 'shadow-glow-red';
  if (l === 'medium') return '';
  return '';
};

export const getPriorityColor = (priority) => {
  const p = (priority || '').toLowerCase();
  if (p === 'critical' || p === 'urgent') return 'badge-critical';
  if (p === 'high') return 'badge-high';
  if (p === 'medium') return 'badge-medium';
  if (p === 'low') return 'badge-low';
  return 'badge-blue';
};

export const getStatusColor = (status) => {
  const s = (status || '').toLowerCase();
  if (s === 'active' || s === 'open') return 'badge-high';
  if (s === 'pending') return 'badge-medium';
  if (s === 'closed' || s === 'resolved') return 'badge-low';
  return 'badge-blue';
};

export const getDocStatusColor = (status) => {
  const s = (status || '').toLowerCase();
  if (s === 'completed' || s === 'filed') return 'badge-low';
  if (s === 'draft') return 'badge-blue';
  if (s === 'pending') return 'badge-medium';
  return 'badge-blue';
};

export const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  try {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
  } catch {
    return dateStr;
  }
};
