import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import {
    Briefcase, Plus, Trash2, ChevronDown, ChevronUp, Check, X,
    MapPin, Calendar, Building2, ArrowRight, ArrowLeft, Zap, ListChecks
} from 'lucide-react';
import AITextArea from '../common/AITextArea';
import './ResumeForms.css';

const empty = { title: '', company: '', location: '', startDate: '', endDate: '', current: false, bullets: [] };

/* ── Bullet editor ── */
function BulletEditor({ bullets, onChange }) {
    const [newBullet, setNewBullet] = useState('');
    const add = () => { if (!newBullet.trim()) return; onChange([...bullets, newBullet.trim()]); setNewBullet(''); };
    const remove = (i) => onChange(bullets.filter((_, idx) => idx !== i));
    return (
        <div className="rf-bullet-editor">
            <label className="rf-label">Key Achievements / Responsibilities</label>
            {bullets.length > 0 && (
                <ul className="rf-bullet-list">
                    {bullets.map((b, i) => (
                        <li key={i} className="rf-bullet-item">
                            <span className="rf-bullet-dot" />
                            <span>{b}</span>
                            <button className="rf-icon-btn danger" onClick={() => remove(i)}><X size={12} /></button>
                        </li>
                    ))}
                </ul>
            )}
            <div className="rf-add-bullet">
                <div style={{ flex: 1 }}>
                    <AITextArea
                        value={newBullet}
                        onChange={e => setNewBullet(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); add(); } }}
                        placeholder='e.g. "Increased sales by 30% in Q3"'
                        context="experience"
                        multiline={false}
                    />
                </div>
                <button className="rf-bullet-add-btn" onClick={add}><Plus size={13} /> Add</button>
            </div>

            <p className="rf-hint">💡 Start with an action verb: "Managed", "Developed", "Led"…</p>
        </div>
    );
}

/* ── 3-Step wizard for NEW experience ── */
const STEPS = [
    { id: 1, label: 'Role', icon: <Briefcase size={14} /> },
    { id: 2, label: 'Dates', icon: <Calendar size={14} /> },
    { id: 3, label: 'Achievements', icon: <ListChecks size={14} /> },
];

function AddWizard({ onAdd, onCancel }) {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({ ...empty });
    const f = (k, v) => setForm(p => ({ ...p, [k]: v }));

    const canNext1 = form.title.trim() && form.company.trim();
    const canSubmit = canNext1;

    const handleSubmit = () => {
        if (!canSubmit) return;
        onAdd({ ...form });
    };

    return (
        <div className="re-wizard">
            {/* Progress stepper */}
            <div className="re-wizard-steps">
                {STEPS.map((s, i) => (
                    <div key={s.id} className={`re-wizard-step ${step === s.id ? 'active' : ''} ${step > s.id ? 'done' : ''}`}>
                        <button
                            className="re-wizard-step-btn"
                            onClick={() => { if (step > s.id || (s.id === 2 && canNext1)) setStep(s.id); }}
                            disabled={s.id > step && !(s.id === 2 && canNext1)}
                        >
                            <span className="re-wizard-step-icon">
                                {step > s.id ? <Check size={13} /> : s.icon}
                            </span>
                            <span className="re-wizard-step-label">{s.label}</span>
                        </button>
                        {i < STEPS.length - 1 && <div className={`re-wizard-connector ${step > s.id ? 'done' : ''}`} />}
                    </div>
                ))}
            </div>

            {/* Step progress bar */}
            <div className="re-wizard-bar">
                <div className="re-wizard-bar-fill" style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }} />
            </div>

            {/* ── Step 1: Role info ── */}
            {step === 1 && (
                <div className="re-wizard-body">
                    <div className="re-wizard-heading">
                        <Briefcase size={18} />
                        <div>
                            <h4>What was your role?</h4>
                            <p>Enter the job title and company name</p>
                        </div>
                    </div>

                    <div className="re-exp-fields">
                        <div className="rf-group">
                            <label>Job Title *</label>
                            <input
                                autoFocus
                                value={form.title}
                                onChange={e => f('title', e.target.value)}
                                placeholder="e.g. Software Engineer, Marketing Intern"
                                onKeyDown={e => { if (e.key === 'Enter' && canNext1) setStep(2); }}
                            />
                        </div>
                        <div className="rf-group">
                            <label><Building2 size={12} /> Company / Organisation *</label>
                            <input
                                value={form.company}
                                onChange={e => f('company', e.target.value)}
                                placeholder="e.g. Google, GTBank, Self-employed"
                                onKeyDown={e => { if (e.key === 'Enter' && canNext1) setStep(2); }}
                            />
                        </div>
                        <div className="rf-group">
                            <label><MapPin size={12} /> Location</label>
                            <input
                                value={form.location}
                                onChange={e => f('location', e.target.value)}
                                placeholder="e.g. Lagos, Nigeria (or Remote)"
                            />
                        </div>
                    </div>

                    <div className="re-wizard-footer">
                        <button className="rf-btn ghost" onClick={onCancel}><X size={14} /> Cancel</button>
                        <button
                            className="re-wizard-next-btn"
                            onClick={() => setStep(2)}
                            disabled={!canNext1}
                        >
                            Next: Dates <ArrowRight size={15} />
                        </button>
                    </div>
                </div>
            )}

            {/* ── Step 2: Dates ── */}
            {step === 2 && (
                <div className="re-wizard-body">
                    <div className="re-wizard-heading">
                        <Calendar size={18} />
                        <div>
                            <h4>When did you work there?</h4>
                            <p>Set your start and end dates</p>
                        </div>
                    </div>

                    {/* Mini role preview */}
                    <div className="re-wizard-preview">
                        <Briefcase size={13} />
                        <span>{form.title}</span>
                        <span className="re-wizard-preview-sep">@</span>
                        <span>{form.company}</span>
                    </div>

                    <div className="re-exp-fields">
                        <label className="rf-checkbox-row" style={{ marginBottom: '0.75rem' }}>
                            <input type="checkbox" checked={form.current} onChange={e => f('current', e.target.checked)} />
                            I currently work here
                        </label>

                        <div className="re-exp-date-row">
                            <div className="rf-group">
                                <label><Calendar size={12} /> Start Date</label>
                                <input type="month" value={form.startDate} onChange={e => f('startDate', e.target.value)} />
                            </div>
                            {!form.current && (
                                <div className="rf-group">
                                    <label><Calendar size={12} /> End Date</label>
                                    <input type="month" value={form.endDate} onChange={e => f('endDate', e.target.value)} />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="re-wizard-footer">
                        <button className="rf-btn ghost" onClick={() => setStep(1)}><ArrowLeft size={14} /> Back</button>
                        <button className="re-wizard-next-btn" onClick={() => setStep(3)}>
                            Next: Achievements <ArrowRight size={15} />
                        </button>
                    </div>
                </div>
            )}

            {/* ── Step 3: Achievements ── */}
            {step === 3 && (
                <div className="re-wizard-body">
                    <div className="re-wizard-heading">
                        <Zap size={18} />
                        <div>
                            <h4>What did you achieve?</h4>
                            <p>Add bullet points — or skip and add later</p>
                        </div>
                    </div>

                    {/* Mini role preview */}
                    <div className="re-wizard-preview">
                        <Briefcase size={13} />
                        <span>{form.title}</span>
                        <span className="re-wizard-preview-sep">@</span>
                        <span>{form.company}</span>
                        {form.startDate && (
                            <span className="re-wizard-preview-sep">
                                · {form.startDate}{form.current ? ' — Present' : form.endDate ? ` — ${form.endDate}` : ''}
                            </span>
                        )}
                    </div>

                    <BulletEditor bullets={form.bullets} onChange={b => f('bullets', b)} />

                    <div className="re-wizard-footer">
                        <button className="rf-btn ghost" onClick={() => setStep(2)}><ArrowLeft size={14} /> Back</button>
                        <button className="re-wizard-submit-btn" onClick={handleSubmit}>
                            <Check size={15} /> Add Experience
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

/* ── Accordion entry (existing experience) ── */
function ExpEntry({ exp, index, onUpdate, onRemove }) {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({ ...exp });
    const [dirty, setDirty] = useState(false);

    const f = (k, v) => { setForm(prev => ({ ...prev, [k]: v })); setDirty(true); };
    const save = () => { onUpdate(form); setDirty(false); };
    const discard = () => { setForm({ ...exp }); setDirty(false); };

    const dateLabel = exp.current
        ? `${exp.startDate || '?'} — Present`
        : exp.startDate ? `${exp.startDate} — ${exp.endDate || '?'}` : 'No dates set';

    return (
        <div className={`re-exp-entry ${open ? 'open' : ''}`}>
            <button className="re-exp-header" onClick={() => setOpen(o => !o)}>
                <span className="re-exp-num">{index + 1}</span>
                <div className="re-exp-summary">
                    <span className="re-exp-title">{exp.title || 'Untitled Role'}</span>
                    {exp.company && <span className="re-exp-company"><Building2 size={11} /> {exp.company}</span>}
                    <span className="re-exp-date"><Calendar size={11} /> {dateLabel}</span>
                </div>
                <div className="re-exp-actions" onClick={e => e.stopPropagation()}>
                    <button className="rf-icon-btn danger" title="Delete" onClick={onRemove}><Trash2 size={13} /></button>
                    {open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </div>
            </button>

            {open && (
                <div className="re-exp-body">
                    <div className="re-exp-fields">
                        <div className="re-exp-field-row">
                            <div className="rf-group"><label>Job Title *</label><input value={form.title} onChange={e => f('title', e.target.value)} /></div>
                            <div className="rf-group"><label>Company *</label><input value={form.company} onChange={e => f('company', e.target.value)} /></div>
                        </div>
                        <div className="rf-group">
                            <label><MapPin size={12} /> Location</label>
                            <input value={form.location} onChange={e => f('location', e.target.value)} placeholder="e.g. Lagos, Nigeria" />
                        </div>
                        <div className="re-exp-date-row">
                            <div className="rf-group">
                                <label><Calendar size={12} /> Start Date</label>
                                <input type="month" value={form.startDate} onChange={e => f('startDate', e.target.value)} />
                            </div>
                            {!form.current && (
                                <div className="rf-group">
                                    <label><Calendar size={12} /> End Date</label>
                                    <input type="month" value={form.endDate} onChange={e => f('endDate', e.target.value)} />
                                </div>
                            )}
                        </div>
                        <label className="rf-checkbox-row">
                            <input type="checkbox" checked={form.current} onChange={e => f('current', e.target.checked)} />
                            I currently work here
                        </label>
                    </div>
                    <BulletEditor bullets={form.bullets} onChange={b => f('bullets', b)} />
                    {dirty && (
                        <div className="rf-actions">
                            <button className="rf-btn primary small" onClick={save}><Check size={14} /> Save Changes</button>
                            <button className="rf-btn ghost small" onClick={discard}><X size={14} /> Discard</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

/* ── Main form ── */
export default function ResumeExperienceForm() {
    const { resumeData, addExperience, updateExperience, removeExperience } = useResume();
    const [showAdd, setShowAdd] = useState(false);

    return (
        <div className="rf-section">
            <h3 className="rf-title"><Briefcase size={20} /> Work / Internship Experience</h3>

            {/* Existing entries */}
            {resumeData.experience.length > 0 && (
                <div className="re-exp-list">
                    {resumeData.experience.map((exp, i) => (
                        <ExpEntry
                            key={exp.id}
                            index={i}
                            exp={exp}
                            onUpdate={updates => updateExperience(exp.id, updates)}
                            onRemove={() => removeExperience(exp.id)}
                        />
                    ))}
                </div>
            )}

            {/* Wizard add form */}
            {showAdd && (
                <AddWizard
                    onAdd={(data) => {
                        addExperience(data);
                        setShowAdd(false);
                    }}
                    onCancel={() => setShowAdd(false)}
                />
            )}

            {/* Empty state */}
            {resumeData.experience.length === 0 && !showAdd && (
                <div className="rf-empty">
                    <Briefcase size={28} />
                    <p>No experience added yet</p>
                    <span>Internships, part-time jobs, and freelance work all count!</span>
                </div>
            )}

            {/* Add button */}
            {!showAdd && (
                <button
                    className="rf-btn add-trigger"
                    style={{ marginTop: resumeData.experience.length > 0 ? '0.75rem' : 0 }}
                    onClick={() => setShowAdd(true)}
                >
                    <Plus size={16} /> Add Work Experience
                </button>
            )}
        </div>
    );
}
