import { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { Trophy, Plus, Trash2, Edit2, Check, X } from 'lucide-react';
import './Forms.css';

const empty = { title: '', description: '', year: '' };

export default function AchievementsForm() {
    const { cvData, addAchievement, updateAchievement, removeAchievement } = useCV();
    const [form, setForm] = useState(empty);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});

    const handleAdd = () => {
        if (!form.title.trim()) return;
        addAchievement({ ...form });
        setForm(empty);
    };

    const startEdit = (ach) => { setEditingId(ach.id); setEditForm({ ...ach }); };
    const saveEdit = () => { updateAchievement(editingId, editForm); setEditingId(null); };
    const cancelEdit = () => setEditingId(null);

    return (
        <div className="form-section">
            <h3 className="form-title">
                <Trophy size={20} />
                Achievements & Awards
            </h3>

            <div className="sub-form-card">
                <div className="form-grid">
                    <div className="form-group">
                        <label>Achievement / Award Title *</label>
                        <input
                            type="text"
                            value={form.title}
                            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                            placeholder="Best Student Award / Scholarship"
                        />
                    </div>
                    <div className="form-group">
                        <label>Year</label>
                        <input
                            type="text"
                            value={form.year}
                            onChange={e => setForm(f => ({ ...f, year: e.target.value }))}
                            placeholder="2024"
                        />
                    </div>
                    <div className="form-group full-width">
                        <label>Description (optional)</label>
                        <textarea
                            value={form.description}
                            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                            placeholder="Brief description of this achievement..."
                            rows={2}
                        />
                    </div>
                </div>
                <button className="btn primary" onClick={handleAdd}>
                    <Plus size={16} /> Add Achievement
                </button>
            </div>

            <div className="items-list">
                {cvData.achievements.map(ach => (
                    <div key={ach.id} className="list-item">
                        {editingId === ach.id ? (
                            <div className="edit-inline">
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Title *</label>
                                        <input type="text" value={editForm.title} onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))} />
                                    </div>
                                    <div className="form-group">
                                        <label>Year</label>
                                        <input type="text" value={editForm.year} onChange={e => setEditForm(f => ({ ...f, year: e.target.value }))} />
                                    </div>
                                    <div className="form-group full-width">
                                        <label>Description</label>
                                        <textarea rows={2} value={editForm.description} onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))} />
                                    </div>
                                </div>
                                <div className="edit-actions">
                                    <button className="btn primary small" onClick={saveEdit}><Check size={14} /> Save</button>
                                    <button className="btn ghost small" onClick={cancelEdit}><X size={14} /> Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <div className="list-item-content">
                                <div className="list-item-main">
                                    <span className="list-item-title">{ach.title}{ach.year && <span className="list-item-year"> · {ach.year}</span>}</span>
                                    {ach.description && <span className="list-item-sub">{ach.description}</span>}
                                </div>
                                <div className="list-item-actions">
                                    <button className="btn-icon small" onClick={() => startEdit(ach)}><Edit2 size={14} /></button>
                                    <button className="btn-icon danger small" onClick={() => removeAchievement(ach.id)}><Trash2 size={14} /></button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
                {cvData.achievements.length === 0 && (
                    <div className="empty-state">
                        <Trophy size={32} />
                        <p>No achievements added yet</p>
                        <span>Add awards, scholarships, and recognitions above</span>
                    </div>
                )}
            </div>
        </div>
    );
}
