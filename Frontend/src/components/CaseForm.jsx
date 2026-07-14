import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, MapPin, Calendar, FileText, Shield, Building2, Zap, RotateCcw } from 'lucide-react';

const CRIME_TYPES = [
  'Select Crime Type',
  'Murder / Culpable Homicide',
  'Robbery / Dacoity',
  'Kidnapping / Abduction',
  'Rape / Sexual Assault',
  'Fraud / Cheating',
  'Cybercrime / Online Fraud',
  'Theft / Burglary',
  'Domestic Violence',
  'Drug Trafficking',
  'Extortion / Blackmail',
  'Human Trafficking',
  'Money Laundering',
  'Terrorist Activity',
  'Arms & Ammunition',
  'Other Cognizable Offence',
];

const initialForm = {
  officer_name: '',
  police_station: '',
  victim_name: '',
  victim_phone: '',
  crime_type: '',
  location: '',
  date: '',
  incident: '',
};

export default function CaseForm({ onSubmit, loading }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const update = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.officer_name.trim()) errs.officer_name = 'Required';
    if (!form.victim_name.trim()) errs.victim_name = 'Required';
    if (!form.crime_type || form.crime_type === 'Select Crime Type') errs.crime_type = 'Select a crime type';
    if (!form.incident.trim() || form.incident.trim().length < 30) errs.incident = 'Minimum 30 characters required';
    if (!form.date) errs.date = 'Required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onSubmit(form);
  };

  const handleReset = () => {
    setForm(initialForm);
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      {/* Header */}
      <div className="p-5 border-b border-white/[0.06] flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <FileText className="w-4.5 h-4.5 text-blue-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-wide">NEW CASE ENTRY</h2>
            <p className="text-[11px] text-slate-500 mt-0.5">Fill incident details for AI analysis</p>
          </div>
        </div>
      </div>

      {/* Form fields */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">

        {/* Officer Info */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-px h-3 bg-blue-500" />
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Officer Details</span>
          </div>
          <div className="space-y-3">
            <Field label="Officer Name" icon={Shield} error={errors.officer_name}>
              <input
                type="text"
                className="input-field"
                placeholder="Inspector / SI / ASI full name"
                value={form.officer_name}
                onChange={update('officer_name')}
              />
            </Field>
            <Field label="Police Station" icon={Building2}>
              <input
                type="text"
                className="input-field"
                placeholder="Police station name & district"
                value={form.police_station}
                onChange={update('police_station')}
              />
            </Field>
          </div>
        </div>

        <div className="divider my-2" />

        {/* Victim Info */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-px h-3 bg-amber-500" />
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Victim Details</span>
          </div>
          <div className="space-y-3">
            <Field label="Victim Name" icon={User} error={errors.victim_name}>
              <input
                type="text"
                className="input-field"
                placeholder="Full name of victim"
                value={form.victim_name}
                onChange={update('victim_name')}
              />
            </Field>
            <Field label="Victim Phone" icon={Phone}>
              <input
                type="tel"
                className="input-field"
                placeholder="+91 XXXXX XXXXX"
                value={form.victim_phone}
                onChange={update('victim_phone')}
              />
            </Field>
          </div>
        </div>

        <div className="divider my-2" />

        {/* Case Details */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-px h-3 bg-red-500" />
            <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest">Case Details</span>
          </div>
          <div className="space-y-3">
            <Field label="Crime Type" icon={Zap} error={errors.crime_type}>
              <select
                className="input-field appearance-none cursor-pointer"
                value={form.crime_type}
                onChange={update('crime_type')}
              >
                {CRIME_TYPES.map((c) => (
                  <option key={c} value={c === 'Select Crime Type' ? '' : c}
                    className="bg-navy-900 text-slate-200">
                    {c}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Location" icon={MapPin}>
              <input
                type="text"
                className="input-field"
                placeholder="Street, area, city"
                value={form.location}
                onChange={update('location')}
              />
            </Field>
            <Field label="Incident Date" icon={Calendar} error={errors.date}>
              <input
                type="date"
                className="input-field"
                value={form.date}
                onChange={update('date')}
                max={new Date().toISOString().split('T')[0]}
              />
            </Field>
          </div>
        </div>

        <div className="divider my-2" />

        {/* Incident Description */}
        <Field label="Incident Description" icon={FileText} error={errors.incident}>
          <div className="text-[10px] text-slate-500 mb-1.5">Describe the incident in detail — events, suspects, timeline</div>
          <textarea
            className="input-field resize-none leading-relaxed"
            rows={6}
            placeholder="Provide a detailed account of the incident including sequence of events, suspects involved, witnesses present, nature of crime, victim's statement, any other relevant information..."
            value={form.incident}
            onChange={update('incident')}
          />
          <div className="flex justify-end mt-1">
            <span className={`text-[10px] font-mono ${form.incident.length < 30 ? 'text-red-400' : 'text-green-400'}`}>
              {form.incident.length} chars
            </span>
          </div>
        </Field>
      </div>

      {/* Submit */}
      <div className="p-5 border-t border-white/[0.06] space-y-3 flex-shrink-0">
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.01 }}
          whileTap={{ scale: loading ? 1 : 0.99 }}
          className="w-full btn-gold flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <motion.div
                className="w-4 h-4 border-2 border-navy-900/50 border-t-navy-900 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              />
              <span className="text-sm font-bold">Analyzing...</span>
            </>
          ) : (
            <>
              <Zap className="w-4 h-4" />
              <span className="text-sm font-bold tracking-wide">ANALYZE CASE</span>
            </>
          )}
        </motion.button>

        <button
          type="button"
          onClick={handleReset}
          className="w-full flex items-center justify-center gap-2 py-2 text-xs text-slate-500 hover:text-slate-300 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Clear Form
        </button>
      </div>
    </form>
  );
}

function Field({ label, icon: Icon, error, children }) {
  return (
    <div>
      <label className="label-text flex items-center gap-1.5">
        {Icon && <Icon className="w-3 h-3" />}
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-[10px] text-red-400 font-medium">{error}</p>
      )}
    </div>
  );
}
