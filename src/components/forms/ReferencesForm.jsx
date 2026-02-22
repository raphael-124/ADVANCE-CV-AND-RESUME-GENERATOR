import { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { Users, Plus, Trash2, Edit2, Check, X, Info } from 'lucide-react';
import './Forms.css';

const empty = { name: '', title: '', company: '', phone: '', email: '' };

export default function ReferencesForm() {
    const { cvData, addReference, updateReference, removeReference, updatePersonalInfo } = useCV();
    const [form, setForm] = useState(empty);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [showAdd, setShowAdd] = useState(false);

    // Store "available on request" preference in personalInfo
    const availableOnRequest = cvData.personalInfo.referencesOnRequest !== false;
    const toggleMode = () => updatePersonalInfo('referencesOnRequest', !availableOnRequest);

    const handleAdd = () => {
        if (!form.name.trim()) return;
        addReference({ ...form });
        setForm(empty);
        setShowAdd(false);
    };

    const startEdit = (ref) => { setEditingId(ref.id); setEditForm({ ...ref }); };
    const saveEdit = () => { updateReference(editingId, editForm); setEditingId(null); };
    const cancelEdit = () => setEditingId(null);

    return (
        <div className="form-section">
            <h3 className="form-title">
                <Users size={20} />
                References
            </h3>

            {/* Toggle */}
            <div className="references-mode-toggle">
                <label className="toggle-label">
                    <input type="checkbox" checked={availableOnRequest} onChange={toggleMode} className="toggle-checkbox" />
                    <span className="toggle-track"><span className="toggle-thumb" /></span>
                    <span>Show "References available upon request"</span>
                </label>
                <p className="toggle-hint">
                    <Info size={14} /> Turn off to list specific references instead
                </p>
            </div>

            {!availableOnRequest && (
                <>
                    {!showAdd ? (
                        <button className="btn ghost add-trigger" onClick={() => setShowAdd(true)}>
                            <Plus size={16} /> Add Reference
                        </button>
                    ) : (
                        <div className="sub-form-card">
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Full Name *</label>
                                    <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Dr. John Smith" />
                                </div>
                                <div className="form-group">
                                    <label>Job Title</label>
                                    <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Senior Manager" />
                                </div>
                                <div className="form-group">
                                    <label>Company</label>
                                    <input type="text" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} placeholder="ABC Corp" />
                                </div>
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+234 800 000 0000" />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="ref@email.com" />
                                </div>
                            </div>
                            <div className="edit-actions">
                                <button className="btn primary" onClick={handleAdd}><Check size={16} /> Add Reference</button>
                                <button className="btn ghost" onClick={() => setShowAdd(false)}><X size={16} /> Cancel</button>
                            </div>
                        </div>
                    )}

                    <div className="items-list">
                        {cvData.references.map(ref => (
                            <div key={ref.id} className="list-item">
                                {editingId === ref.id ? (
                                    <div className="edit-inline">
                                        <div className="form-grid">
                                            <div className="form-group"><label>Name *</label><input type="text" value={editForm.name} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} /></div>
                                            <div className="form-group"><label>Title</label><input type="text" value={editForm.title} onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))} /></div>
                                            <div className="form-group"><label>Company</label><input type="text" value={editForm.company} onChange={e => setEditForm(f => ({ ...f, company: e.target.value }))} /></div>
                                            <div className="form-group"><label>Phone</label><input type="tel" value={editForm.phone} onChange={e => setEditForm(f => ({ ...f, phone: e.target.value }))} /></div>
                                            <div className="form-group"><label>Email</label><input type="email" value={editForm.email} onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))} /></div>
                                        </div>
                                        <div className="edit-actions">
                                            <button className="btn primary small" onClick={saveEdit}><Check size={14} /> Save</button>
                                            <button className="btn ghost small" onClick={cancelEdit}><X size={14} /> Cancel</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="list-item-content">
                                        <div className="list-item-main">
                                            <span className="list-item-title">{ref.name}</span>
                                            <span className="list-item-sub">{[ref.title, ref.company].filter(Boolean).join(' · ')}</span>
                                            {ref.phone && <span className="list-item-sub">{ref.phone}</span>}
                                            {ref.email && <span className="list-item-sub">{ref.email}</span>}
                                        </div>
                                        <div className="list-item-actions">
                                            <button className="btn-icon small" onClick={() => startEdit(ref)}><Edit2 size={14} /></button>
                                            <button className="btn-icon danger small" onClick={() => removeReference(ref.id)}><Trash2 size={14} /></button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        {cvData.references.length === 0 && (
                            <div className="empty-state">
                                <Users size={32} />
                                <p>No references added yet</p>
                                <span>Add 2–3 professional references above</span>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
