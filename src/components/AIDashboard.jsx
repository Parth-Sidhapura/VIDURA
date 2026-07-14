import { motion } from 'framer-motion';
import {
  AlertTriangle, ArrowUp, Target, Brain, Activity, Tag,
  User, Phone, MapPin, Gavel, BookOpen, Scale, FileCheck,
  Package, HelpCircle, Navigation, Clock, FileText,
  ClipboardList, FolderOpen, AlertCircle, Lock, Printer
} from 'lucide-react';
import GlassCard, { CardSection } from './GlassCard';
import StatusBadge from './StatusBadge';
import Timeline from './Timeline';
import Checklist from './Checklist';
import ScrollableReport from './ScrollableReport';
import { getRiskColor, getPriorityColor, getDocStatusColor } from '../utils/helpers';

export default function AIDashboard({ data }) {
  if (!data) return null;

  const { dashboard, case: caseData, victim, accused, legal_analysis,
    timeline, evidence_required, missing_information, next_best_actions,
    compliance_alerts, investigation_report, chargesheet_draft, document_status } = data;

  const topCards = [
    { label: 'Risk Level', value: dashboard?.risk_level, icon: AlertTriangle, colorFn: getRiskColor },
    { label: 'Priority', value: dashboard?.priority, icon: ArrowUp, colorFn: getPriorityColor },
    { label: 'Severity', value: dashboard?.severity, icon: Target, colorFn: getRiskColor },
    { label: 'Confidence', value: dashboard?.confidence, icon: Brain, colorFn: () => 'badge-blue' },
    { label: 'Status', value: dashboard?.status, icon: Activity, colorFn: () => 'badge-medium' },
    { label: 'Category', value: dashboard?.crime_category, icon: Tag, colorFn: () => 'badge-gold' },
  ];

  return (
    <div className="space-y-4">
      {/* TOP METRIC CARDS */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-2 lg:grid-cols-3 gap-3"
      >
        {topCards.map((card, i) => (
          <GlassCard key={card.label} delay={i * 0.05} hover className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <card.icon className="w-3.5 h-3.5 text-slate-500" strokeWidth={2} />
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">{card.label}</span>
            </div>
            <StatusBadge label={card.value || 'N/A'} size="lg" />
          </GlassCard>
        ))}
      </motion.div>

      {/* CASE SUMMARY */}
      <GlassCard delay={0.3} hover>
        <CardSection title="Case Summary" icon={FolderOpen}>
          <p className="text-sm text-slate-300 leading-relaxed mb-3">{caseData?.summary || 'No summary available.'}</p>
          <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-white/[0.05]">
            <InfoChip label="Crime Type" value={caseData?.crime_type} />
            <InfoChip label="Est. Loss" value={caseData?.estimated_loss} highlight />
          </div>
        </CardSection>
      </GlassCard>

      {/* VICTIM & ACCUSED */}
      <div className="grid md:grid-cols-2 gap-4">
        <GlassCard delay={0.35} hover>
          <CardSection title="Victim Information" icon={User}>
            <InfoRow icon={User} label="Name" value={victim?.name} />
            <InfoRow icon={Phone} label="Phone" value={victim?.phone} />
            <InfoRow icon={MapPin} label="Address" value={victim?.address} />
          </CardSection>
        </GlassCard>

        <GlassCard delay={0.4} hover>
          <CardSection title="Accused Information" icon={AlertCircle}>
            <InfoRow icon={User} label="Name" value={accused?.name} />
            <InfoRow icon={Activity} label="Status" value={accused?.status} />
          </CardSection>
        </GlassCard>
      </div>

      {/* LEGAL ANALYSIS */}
      <GlassCard delay={0.45} hover>
        <CardSection title="Legal Analysis" icon={Scale}>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <LegalSection title="BNS Sections" items={legal_analysis?.recommended_bns} color="blue" />
            <LegalSection title="BNSS Sections" items={legal_analysis?.recommended_bnss} color="amber" />
            <LegalSection title="BSA Sections" items={legal_analysis?.recommended_bsa} color="purple" />
          </div>
          {legal_analysis?.reasoning && (
            <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/[0.06]">
              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2">Legal Reasoning</p>
              <p className="text-sm text-slate-300 leading-relaxed">{legal_analysis.reasoning}</p>
            </div>
          )}
          {legal_analysis?.verification_required && (
            <div className="mt-3 flex items-center gap-2 text-amber-400">
              <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
              <p className="text-xs">Verification with legal counsel recommended before proceeding.</p>
            </div>
          )}
        </CardSection>
      </GlassCard>

      {/* EVIDENCE & MISSING INFO */}
      <div className="grid md:grid-cols-2 gap-4">
        <GlassCard delay={0.5} hover>
          <CardSection title="Evidence Required" icon={Package}>
            <Checklist items={evidence_required} emptyText="No evidence checklist generated." />
          </CardSection>
        </GlassCard>

        <GlassCard delay={0.55} hover>
          <CardSection title="Missing Information" icon={HelpCircle}>
            <Checklist items={missing_information} variant="alert" emptyText="No gaps identified." />
          </CardSection>
        </GlassCard>
      </div>

      {/* NEXT BEST ACTIONS */}
      {next_best_actions && next_best_actions.length > 0 && (
        <GlassCard delay={0.6} hover>
          <CardSection title="Next Best Investigation Actions" icon={Navigation}>
            <div className="space-y-2">
              {next_best_actions.map((action, i) => {
                const text = typeof action === 'string' ? action : (action.action || action.description || JSON.stringify(action));
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/[0.04] border border-blue-500/10 hover:border-blue-500/20 transition-colors"
                  >
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-sm text-slate-300 leading-relaxed">{text}</p>
                  </motion.div>
                );
              })}
            </div>
          </CardSection>
        </GlassCard>
      )}

      {/* COMPLIANCE ALERTS */}
      {compliance_alerts && compliance_alerts.length > 0 && (
        <GlassCard delay={0.62} hover>
          <CardSection title="Compliance Alerts" icon={AlertTriangle}>
            <div className="space-y-2">
              {compliance_alerts.map((alert, i) => {
                const text = typeof alert === 'string' ? alert : (alert.alert || alert.description || JSON.stringify(alert));
                return (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/[0.04] border border-amber-500/15">
                    <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-200/80 leading-relaxed">{text}</p>
                  </div>
                );
              })}
            </div>
          </CardSection>
        </GlassCard>
      )}

      {/* TIMELINE */}
      {timeline && timeline.length > 0 && (
        <GlassCard delay={0.65} hover>
          <CardSection title="Incident Timeline" icon={Clock}>
            <Timeline items={timeline} />
          </CardSection>
        </GlassCard>
      )}

      {/* INVESTIGATION REPORT */}
      {investigation_report && (
        <ScrollableReport
          title="Investigation Report"
          icon={FileText}
          defaultOpen={false}
          sections={[
            { label: 'Incident Summary', value: investigation_report.incident_summary },
            { label: 'Preliminary Findings', value: investigation_report.preliminary_findings },
            { label: 'Risk Assessment', value: investigation_report.risk_assessment },
            { label: 'Recommended Actions', value: investigation_report.recommended_actions },
          ]}
        />
      )}

      {/* CHARGESHEET DRAFT */}
      {chargesheet_draft && (
        <ScrollableReport
          title="Chargesheet Draft"
          icon={ClipboardList}
          defaultOpen={false}
          sections={[
            { label: 'Case Background', value: chargesheet_draft.case_background },
            { label: 'Facts of the Case', value: chargesheet_draft.facts },
            { label: 'Applicable Laws', value: chargesheet_draft.applicable_laws },
            { label: 'Evidence Summary', value: chargesheet_draft.evidence_summary },
            { label: 'Recommendation', value: chargesheet_draft.recommendation },
          ]}
        />
      )}

      {/* DOCUMENT STATUS */}
      {document_status && (
        <GlassCard delay={0.7} hover>
          <CardSection title="Document Status" icon={FileCheck}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.entries(document_status).map(([key, value]) => (
                <div key={key} className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] flex flex-col items-center gap-2 text-center">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    {key.replace(/_/g, ' ')}
                  </span>
                  <StatusBadge label={value} />
                </div>
              ))}
            </div>
          </CardSection>
        </GlassCard>
      )}

      {/* COMING SOON ACTIONS */}
      <GlassCard delay={0.75}>
        <div className="p-5">
          <p className="section-title mb-4">Generate Documents</p>
          <div className="flex flex-wrap gap-3">
            {['Generate FIR', 'Generate Chargesheet', 'Generate Case Diary', 'AI Copilot Chat', 'Upload Evidence'].map((label) => (
              <button
                key={label}
                disabled
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.02] border border-white/[0.06] text-xs text-slate-600 font-medium cursor-not-allowed opacity-60"
              >
                <Lock className="w-3 h-3" />
                {label}
                <span className="ml-1 text-[9px] bg-slate-700 text-slate-400 px-1.5 py-0.5 rounded-full">SOON</span>
              </button>
            ))}
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 py-2 border-b border-white/[0.04] last:border-0">
      <Icon className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" strokeWidth={1.5} />
      <span className="text-[11px] text-slate-500 w-16 flex-shrink-0">{label}</span>
      <span className="text-sm text-slate-200 font-medium">{value || '—'}</span>
    </div>
  );
}

function InfoChip({ label, value, highlight }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[10px] text-slate-500 uppercase tracking-wider">{label}:</span>
      <span className={`text-xs font-semibold ${highlight ? 'text-amber-400' : 'text-slate-200'}`}>
        {value || 'Unknown'}
      </span>
    </div>
  );
}

function LegalSection({ title, items = [], color }) {
  const colorMap = {
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  };

  return (
    <div>
      <p className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${colorMap[color].split(' ')[0]}`}>{title}</p>
      {!items || items.length === 0 ? (
        <p className="text-xs text-slate-500 italic">None identified</p>
      ) : (
        <div className="flex flex-wrap gap-1.5">
          {items.map((item, i) => (
            <span key={i} className={`text-[11px] px-2.5 py-1 rounded-full border font-mono font-semibold ${colorMap[color]}`}>
              {typeof item === 'string' ? item : (item.section || item.code || JSON.stringify(item))}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
