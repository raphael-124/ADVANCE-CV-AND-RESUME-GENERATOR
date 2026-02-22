import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Zap, Plus, X, Code2, Heart } from 'lucide-react';
import './ResumeForms.css';

const TECH_SUGGESTIONS = ['Microsoft Word', 'Excel', 'PowerPoint', 'Python', 'JavaScript', 'React', 'SQL', 'AutoCAD', 'Photoshop', 'Data Analysis'];
const SOFT_SUGGESTIONS = ['Communication', 'Teamwork', 'Problem-solving', 'Leadership', 'Time Management', 'Adaptability', 'Critical Thinking'];

export default function ResumeSkillsForm() {
    const { resumeData, addSkill, removeSkill, updateSkill } = useResume();
    const [input, setInput] = useState('');
    const [category, setCategory] = useState('technical');

    const handleAdd = (name = input, cat = category) => {
        const trimmed = name.trim();
        if (!trimmed) return;
        // prevent duplicates
        if (resumeData.skills.some(s => s.name.toLowerCase() === trimmed.toLowerCase())) return;
        addSkill(trimmed, cat);
        setInput('');
    };

    const techSkills = resumeData.skills.filter(s => s.category !== 'soft');
    const softSkills = resumeData.skills.filter(s => s.category === 'soft');

    return (
        <div className="rf-section">
            <h3 className="rf-title"><Zap size={20} /> Key Skills</h3>

            <div className="rf-tip">
                <Zap size={14} />
                <span>Include both job-related and soft skills. Matching job description keywords boosts ATS score.</span>
            </div>

            {/* Input Row */}
            <div className="rf-skill-row">
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAdd(); } }}
                    placeholder="Type a skill and press Enter…"
                />
                <div className="rf-skill-row-bottom">
                    <select value={category} onChange={e => setCategory(e.target.value)}>
                        <option value="technical">⚙ Technical</option>
                        <option value="soft">★ Soft Skill</option>
                    </select>
                    <button className="rf-btn primary" onClick={() => handleAdd()}>
                        <Plus size={16} /> Add
                    </button>
                </div>
            </div>


            {/* Quick-add suggestions */}
            <div style={{ marginBottom: '1.25rem' }}>
                <p className="rf-cat-label">Quick-add technical:</p>
                <div className="rf-tags">
                    {TECH_SUGGESTIONS.filter(s => !resumeData.skills.find(x => x.name === s)).map(s => (
                        <button key={s} className="rf-tag tech" style={{ cursor: 'pointer', border: '1px dashed #14b8a6' }} onClick={() => handleAdd(s, 'technical')}>
                            + {s}
                        </button>
                    ))}
                </div>
                <p className="rf-cat-label" style={{ marginTop: '0.75rem' }}>Quick-add soft:</p>
                <div className="rf-tags">
                    {SOFT_SUGGESTIONS.filter(s => !resumeData.skills.find(x => x.name === s)).map(s => (
                        <button key={s} className="rf-tag soft" style={{ cursor: 'pointer', border: '1px dashed #6366f1' }} onClick={() => handleAdd(s, 'soft')}>
                            + {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Added Skills */}
            {techSkills.length > 0 && (
                <>
                    <p className="rf-cat-label"><Code2 size={13} /> Technical ({techSkills.length})</p>
                    <div className="rf-tags">
                        {techSkills.map(s => (
                            <span key={s.id} className="rf-tag tech">
                                {s.name}
                                <button onClick={() => removeSkill(s.id)} title="Remove">×</button>
                            </span>
                        ))}
                    </div>
                </>
            )}
            {softSkills.length > 0 && (
                <>
                    <p className="rf-cat-label" style={{ marginTop: '0.75rem' }}><Heart size={13} /> Soft ({softSkills.length})</p>
                    <div className="rf-tags">
                        {softSkills.map(s => (
                            <span key={s.id} className="rf-tag soft">
                                {s.name}
                                <button onClick={() => removeSkill(s.id)} title="Remove">×</button>
                            </span>
                        ))}
                    </div>
                </>
            )}
            {resumeData.skills.length === 0 && (
                <div className="rf-empty" style={{ paddingTop: '0.5rem' }}>
                    <Zap size={28} /><p>No skills yet</p>
                    <span>Use quick-add above or type your own</span>
                </div>
            )}
        </div>
    );
}
