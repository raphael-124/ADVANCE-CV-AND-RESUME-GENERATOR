import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { GraduationCap, Plus, Trash2, Edit2, Check, X, BookOpen, Building, Calendar } from 'lucide-react';
import './ResumeForms.css';

const empty = { degree: '', field: '', school: '', startDate: '', endDate: '' };

function EduFields({ data, onChange }) {
    return (
        <div className="re-exp-fields">
            <div className="re-exp-field-row">
                <div className="rf-group">
                    <label><BookOpen size={12} /> Degree *</label>
                    <input value={data.degree} onChange={e => onChange('degree', e.target.value)} placeholder="e.g. B.Sc, HND, OND" />
                </div>
                <div className="rf-group">
                    <label>Course of Study</label>
                    <input value={data.field} onChange={e => onChange('field', e.target.value)} placeholder="e.g. Computer Science" />
                </div>
            </div>

            <div className="rf-group">
                <label><Building size={12} /> School / Institution *</label>
                <input value={data.school} onChange={e => onChange('school', e.target.value)} placeholder="e.g. University of Lagos" />
            </div>

            {/* Date of Entry + Date of Graduation — stacked like experience */}
            <div className="re-exp-date-row">
                <div className="rf-group">
                    <label><Calendar size={12} /> Date of Entry</label>
                    <input
                        type="month"
                        value={data.startDate || ''}
                        onChange={e => onChange('startDate', e.target.value)}
                    />
                </div>
                <div className="rf-group">
                    <label><Calendar size={12} /> Date of Graduation</label>
                    <input
                        type="month"
                        value={data.endDate || ''}
                        onChange={e => onChange('endDate', e.target.value)}
                        placeholder="Leave blank if in progress"
                    />
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem', display: 'block' }}>
                        Leave blank if still in progress
                    </span>
                </div>
            </div>
        </div>
    );
}

export default function ResumeEducationForm() {
    const { resumeData, addEducation, updateEducation, removeEducation } = useResume();
    const [showAdd, setShowAdd] = useState(false);
    const [form, setForm] = useState({ ...empty });
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});

    const handleAdd = () => {
        if (!form.degree.trim() || !form.school.trim()) return;
        addEducation({ ...form });
        setForm({ ...empty });
        setShowAdd(false);
    };

    const startEdit = (edu) => { setEditingId(edu.id); setEditForm({ ...edu }); };
    const saveEdit = () => { updateEducation(editingId, editForm); setEditingId(null); };

    const eduDateLabel = (edu) => {
        if (!edu.startDate && !edu.endDate) return '';
        const start = edu.startDate ? fmtMonth(edu.startDate) : '?';
        const end = edu.endDate ? fmtMonth(edu.endDate) : 'Present';
        return `${start} – ${end}`;
    };

    const fmtMonth = (m) => {
        if (!m) return '';
        const [y, mo] = m.split('-');
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${months[parseInt(mo, 10) - 1] || ''} ${y}`;
    };

    return (
        <div className="rf-section">
            <h3 className="rf-title"><GraduationCap size={20} /> Education</h3>

            {/* Add form */}
            {!showAdd ? (
                <button className="rf-btn add-trigger" onClick={() => setShowAdd(true)}>
                    <Plus size={16} /> Add Education
                </button>
            ) : (
                <div className="re-exp-add-form">
                    <p className="re-exp-add-title"><Plus size={14} /> New Education</p>
                    <EduFields data={form} onChange={(k, v) => setForm(p => ({ ...p, [k]: v }))} />
                    <div className="rf-actions">
                        <button className="rf-btn primary" onClick={handleAdd}><Check size={15} /> Add</button>
                        <button className="rf-btn ghost" onClick={() => { setShowAdd(false); setForm({ ...empty }); }}><X size={15} /> Cancel</button>
                    </div>
                </div>
            )}

            {/* Saved entries */}
            {resumeData.education.map(edu => (
                <div key={edu.id} className="rf-card" style={{ marginTop: '0.5rem' }}>
                    {editingId === edu.id ? (
                        <div className="rf-card-body" style={{ padding: '1rem' }}>
                            <EduFields data={editForm} onChange={(k, v) => setEditForm(p => ({ ...p, [k]: v }))} />
                            <div className="rf-actions">
                                <button className="rf-btn primary small" onClick={saveEdit}><Check size={13} /> Save</button>
                                <button className="rf-btn ghost small" onClick={() => setEditingId(null)}><X size={13} /> Cancel</button>
                            </div>
                        </div>
                    ) : (
                        <div className="rf-card-header">
                            <div className="rf-card-info">
                                <h4>{edu.school}</h4>
                                <p>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}{eduDateLabel(edu) ? ` · ${eduDateLabel(edu)}` : ''}</p>
                            </div>
                            <div className="rf-card-actions">
                                <button className="rf-icon-btn" onClick={() => startEdit(edu)}><Edit2 size={14} /></button>
                                <button className="rf-icon-btn danger" onClick={() => removeEducation(edu.id)}><Trash2 size={14} /></button>
                            </div>
                        </div>
                    )}
                </div>
            ))}

            {resumeData.education.length === 0 && !showAdd && (
                <div className="rf-empty">
                    <GraduationCap size={28} />
                    <p>No education added yet</p>
                    <span>Add your highest qualification first</span>
                </div>
            )}
        </div>
    );
}
