import { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { Heart, Plus, Trash2, Edit2, Check, X } from 'lucide-react';
import './Forms.css';

const empty = { role: '', organization: '', startDate: '', endDate: '', current: false, description: '' };

export default function VolunteerForm() {
    const { cvData, addVolunteer, updateVolunteer, removeVolunteer } = useCV();
    const [form, setForm] = useState(empty);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [showAdd, setShowAdd] = useState(false);

    const handleAdd = () => {
        if (!form.role.trim()) return;
        addVolunteer({ ...form });
        setForm(empty);
        setShowAdd(false);
    };

    const startEdit = (vol) => { setEditingId(vol.id); setEditForm({ ...vol }); };
    const saveEdit = () => { updateVolunteer(editingId, editForm); setEditingId(null); };
    const cancelEdit = () => setEditingId(null);

    const formatDate = (d) => {
        if (!d) return '';
        const dt = new Date(d);
        return dt.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return (
        <div className="form-section">
            <h3 className="form-title">
                <Heart size={20} />
                Volunteer Experience
            </h3>

            {!showAdd ? (
                <button className="btn ghost add-trigger" onClick={() => setShowAdd(true)}>
                    <Plus size={16} /> Add Volunteer Experience
                </button>
            ) : (
                <div className="sub-form-card">
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Role / Position *</label>
                            <input type="text" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} placeholder="Volunteer Coordinator" />
                        </div>
                        <div className="form-group">
                            <label>Organization</label>
                            <input type="text" value={form.organization} onChange={e => setForm(f => ({ ...f, organization: e.target.value }))} placeholder="Red Cross / Church / NGO" />
                        </div>
                        <div className="form-group">
                            <label>Start Date</label>
                            <input type="month" value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))} />
                        </div>
                        <div className="form-group">
                            <label>End Date</label>
                            <input type="month" value={form.endDate} onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))} disabled={form.current} />
                        </div>
                        <div className="form-group full-width">
                            <label className="checkbox-label">
                                <input type="checkbox" checked={form.current} onChange={e => setForm(f => ({ ...f, current: e.target.checked, endDate: '' }))} />
                                Currently doing this
                            </label>
                        </div>
                        <div className="form-group full-width">
                            <label>Description</label>
                            <textarea rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Describe your responsibilities and impact..." />
                        </div>
                    </div>
                    <div className="edit-actions">
                        <button className="btn primary" onClick={handleAdd}><Check size={16} /> Add</button>
                        <button className="btn ghost" onClick={() => setShowAdd(false)}><X size={16} /> Cancel</button>
                    </div>
                </div>
            )}

            <div className="items-list">
                {cvData.volunteer.map(vol => (
                    <div key={vol.id} className="list-item">
                        {editingId === vol.id ? (
                            <div className="edit-inline">
                                <div className="form-grid">
                                    <div className="form-group"><label>Role *</label><input type="text" value={editForm.role} onChange={e => setEditForm(f => ({ ...f, role: e.target.value }))} /></div>
                                    <div className="form-group"><label>Organization</label><input type="text" value={editForm.organization} onChange={e => setEditForm(f => ({ ...f, organization: e.target.value }))} /></div>
                                    <div className="form-group"><label>Start Date</label><input type="month" value={editForm.startDate} onChange={e => setEditForm(f => ({ ...f, startDate: e.target.value }))} /></div>
                                    <div className="form-group"><label>End Date</label><input type="month" value={editForm.endDate} onChange={e => setEditForm(f => ({ ...f, endDate: e.target.value }))} disabled={editForm.current} /></div>
                                    <div className="form-group full-width">
                                        <label className="checkbox-label">
                                            <input type="checkbox" checked={editForm.current} onChange={e => setEditForm(f => ({ ...f, current: e.target.checked, endDate: '' }))} />
                                            Currently doing this
                                        </label>
                                    </div>
                                    <div className="form-group full-width"><label>Description</label><textarea rows={3} value={editForm.description} onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))} /></div>
                                </div>
                                <div className="edit-actions">
                                    <button className="btn primary small" onClick={saveEdit}><Check size={14} /> Save</button>
                                    <button className="btn ghost small" onClick={cancelEdit}><X size={14} /> Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <div className="list-item-content">
                                <div className="list-item-main">
                                    <span className="list-item-title">{vol.role}</span>
                                    <span className="list-item-sub">
                                        {vol.organization && `${vol.organization} · `}
                                        {formatDate(vol.startDate)}{vol.startDate ? ' – ' : ''}{vol.current ? 'Present' : formatDate(vol.endDate)}
                                    </span>
                                    {vol.description && <span className="list-item-desc">{vol.description}</span>}
                                </div>
                                <div className="list-item-actions">
                                    <button className="btn-icon small" onClick={() => startEdit(vol)}><Edit2 size={14} /></button>
                                    <button className="btn-icon danger small" onClick={() => removeVolunteer(vol.id)}><Trash2 size={14} /></button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
                {cvData.volunteer.length === 0 && (
                    <div className="empty-state">
                        <Heart size={32} />
                        <p>No volunteer experience added</p>
                        <span>Add church work, NGO, or community service</span>
                    </div>
                )}
            </div>
        </div>
    );
}
