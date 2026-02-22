import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { FolderGit2, Plus, Trash2, Edit2, Check, X } from 'lucide-react';
import './ResumeForms.css';

const empty = { title: '', description: '', tools: '' };

/* ── Moving ProjectForm outside the main component to prevent losing input focus ── */
const ProjectForm = ({ data, onChange, onSave, onCancel, saveLabel }) => (
    <div style={{ background: 'var(--card-bg-secondary)', border: '1px dashed #14b8a6', borderRadius: 12, padding: '1.25rem', marginBottom: '1rem' }}>
        <div className="rf-group" style={{ marginBottom: '0.9rem' }}>
            <label>Project Title *</label>
            <input
                value={data.title}
                onChange={e => onChange('title', e.target.value)}
                placeholder="e.g. Student Result Management System"
                autoFocus
            />
        </div>
        <div className="rf-group" style={{ marginBottom: '0.9rem' }}>
            <label>Short Description</label>
            <textarea
                value={data.description}
                onChange={e => onChange('description', e.target.value)}
                placeholder="Briefly describe what the project does and its impact…"
                rows={3}
            />
        </div>
        <div className="rf-group" style={{ marginBottom: '1rem' }}>
            <label>Tools / Technologies Used</label>
            <input value={data.tools} onChange={e => onChange('tools', e.target.value)} placeholder="React, Node.js, MySQL, Figma…" />
        </div>
        <div className="rf-actions">
            <button className="rf-btn primary" onClick={onSave}><Check size={15} /> {saveLabel}</button>
            <button className="rf-btn ghost" onClick={onCancel}><X size={15} /> Cancel</button>
        </div>
    </div>
);

export default function ResumeProjectsForm() {
    const { resumeData, addProject, updateProject, removeProject } = useResume();
    const [showAdd, setShowAdd] = useState(false);
    const [form, setForm] = useState({ ...empty });
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});

    const handleAdd = () => {
        if (!form.title.trim()) return;
        addProject({ ...form });
        setForm({ ...empty });
        setShowAdd(false);
    };

    const startEdit = (proj) => { setEditingId(proj.id); setEditForm({ ...proj }); };
    const saveEdit = () => { updateProject(editingId, editForm); setEditingId(null); };

    const f = (k, v) => setForm(p => ({ ...p, [k]: v }));

    return (
        <div className="rf-section">
            <h3 className="rf-title"><FolderGit2 size={20} /> Projects</h3>

            <div className="rf-tip">
                <FolderGit2 size={14} />
                <span>Include school projects, personal builds, or freelance work. Real examples show skills better than words.</span>
            </div>

            {!showAdd ? (
                <button className="rf-btn add-trigger" onClick={() => setShowAdd(true)}>
                    <Plus size={16} /> Add Project
                </button>
            ) : (
                <ProjectForm
                    data={form}
                    onChange={f}
                    onSave={handleAdd}
                    onCancel={() => { setShowAdd(false); setForm({ ...empty }); }}
                    saveLabel="Add Project"
                />
            )}

            {resumeData.projects.map(proj => (
                editingId === proj.id ? (
                    <ProjectForm
                        key={proj.id}
                        data={editForm}
                        onChange={(k, v) => setEditForm(p => ({ ...p, [k]: v }))}
                        onSave={saveEdit}
                        onCancel={() => setEditingId(null)}
                        saveLabel="Save Changes"
                    />
                ) : (
                    <div key={proj.id} className="rf-card">
                        <div className="rf-card-header">
                            <div className="rf-card-info">
                                <h4>{proj.title}</h4>
                                {proj.tools && <p style={{ color: '#14b8a6' }}>{proj.tools}</p>}
                                {proj.description && <p style={{ marginTop: '0.2rem', color: 'var(--text-secondary)', fontSize: '0.78rem' }}>{proj.description}</p>}
                            </div>
                            <div className="rf-card-actions">
                                <button className="rf-icon-btn" onClick={() => startEdit(proj)}><Edit2 size={14} /></button>
                                <button className="rf-icon-btn danger" onClick={() => removeProject(proj.id)}><Trash2 size={14} /></button>
                            </div>
                        </div>
                    </div>
                )
            ))}

            {resumeData.projects.length === 0 && !showAdd && (
                <div className="rf-empty">
                    <FolderGit2 size={28} />
                    <p>No projects yet</p>
                    <span>Projects are optional but highly recommended for fresh graduates</span>
                </div>
            )}
        </div>
    );
}
