import { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { Award, Plus, Trash2, Edit2, Check, X, ExternalLink } from 'lucide-react';
import './Forms.css';

const empty = { name: '', issuer: '', year: '', url: '' };

export default function CertificationsForm() {
    const { cvData, addCertification, updateCertification, removeCertification } = useCV();
    const [form, setForm] = useState(empty);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});

    const handleAdd = () => {
        if (!form.name.trim()) return;
        addCertification({ ...form });
        setForm(empty);
    };

    const startEdit = (cert) => {
        setEditingId(cert.id);
        setEditForm({ ...cert });
    };

    const saveEdit = () => {
        updateCertification(editingId, editForm);
        setEditingId(null);
    };

    const cancelEdit = () => setEditingId(null);

    return (
        <div className="form-section">
            <h3 className="form-title">
                <Award size={20} />
                Certifications & Training
            </h3>

            {/* Add new */}
            <div className="sub-form-card">
                <div className="form-grid">
                    <div className="form-group">
                        <label>Certificate / Course Name *</label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                            placeholder="Google UX Design Certificate"
                        />
                    </div>
                    <div className="form-group">
                        <label>Issuing Organization</label>
                        <input
                            type="text"
                            value={form.issuer}
                            onChange={e => setForm(f => ({ ...f, issuer: e.target.value }))}
                            placeholder="Google / Coursera / Udemy"
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
                    <div className="form-group">
                        <label>Link (optional)</label>
                        <input
                            type="url"
                            value={form.url}
                            onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
                            placeholder="https://credential.net/..."
                        />
                    </div>
                </div>
                <button className="btn primary" onClick={handleAdd}>
                    <Plus size={16} /> Add Certification
                </button>
            </div>

            {/* List */}
            <div className="items-list">
                {cvData.certifications.map(cert => (
                    <div key={cert.id} className="list-item">
                        {editingId === cert.id ? (
                            <div className="edit-inline">
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Name *</label>
                                        <input type="text" value={editForm.name} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} />
                                    </div>
                                    <div className="form-group">
                                        <label>Issuer</label>
                                        <input type="text" value={editForm.issuer} onChange={e => setEditForm(f => ({ ...f, issuer: e.target.value }))} />
                                    </div>
                                    <div className="form-group">
                                        <label>Year</label>
                                        <input type="text" value={editForm.year} onChange={e => setEditForm(f => ({ ...f, year: e.target.value }))} />
                                    </div>
                                    <div className="form-group">
                                        <label>Link</label>
                                        <input type="url" value={editForm.url} onChange={e => setEditForm(f => ({ ...f, url: e.target.value }))} />
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
                                    <span className="list-item-title">{cert.name}</span>
                                    {cert.issuer && <span className="list-item-sub">{cert.issuer}{cert.year ? ` · ${cert.year}` : ''}</span>}
                                    {cert.url && <a href={cert.url} target="_blank" rel="noreferrer" className="list-item-link"><ExternalLink size={12} /> View</a>}
                                </div>
                                <div className="list-item-actions">
                                    <button className="btn-icon small" onClick={() => startEdit(cert)}><Edit2 size={14} /></button>
                                    <button className="btn-icon danger small" onClick={() => removeCertification(cert.id)}><Trash2 size={14} /></button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
                {cvData.certifications.length === 0 && (
                    <div className="empty-state">
                        <Award size={32} />
                        <p>No certifications added yet</p>
                        <span>Add your certificates, courses and workshops above</span>
                    </div>
                )}
            </div>
        </div>
    );
}
