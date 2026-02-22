import { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { Briefcase, Plus, Trash2, Calendar, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { getTip } from '../../utils/tips';
import AITextArea from '../common/AITextArea';
import './Forms.css';

export default function ExperienceForm() {
    const { cvData, addExperience, updateExperience, removeExperience } = useCV();
    const [isAdding, setIsAdding] = useState(false);
    const [expandedId, setExpandedId] = useState(null);
    const [activeTip, setActiveTip] = useState(null);
    const [newExp, setNewExp] = useState({
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
    });

    const handleAdd = () => {
        if (newExp.title && newExp.company) {
            addExperience(newExp);
            setNewExp({ title: '', company: '', location: '', startDate: '', endDate: '', current: false, description: '' });
            setIsAdding(false);
        }
    };

    const handleDescriptionChange = (value, id = null) => {
        const tip = getTip('experience', value);
        setActiveTip(tip);
        if (id) {
            updateExperience(id, { description: value });
        } else {
            setNewExp({ ...newExp, description: value });
        }
    };

    return (
        <div className="form-section">
            <h3 className="form-title">
                <Briefcase size={20} />
                Work Experience
            </h3>

            {cvData.experience.map((exp) => (
                <div key={exp.id} className={`entry-card ${expandedId === exp.id ? 'expanded' : ''}`}>
                    <div
                        className="entry-header clickable"
                        onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
                    >
                        <div className="entry-info">
                            <h4>{exp.title || 'Untitled Role'}</h4>
                            {exp.company && (
                                <p>{exp.company}{exp.location ? ` • ${exp.location}` : ''}</p>
                            )}
                            {(exp.startDate || exp.endDate) && (
                                <span className="entry-dates">
                                    <Calendar size={14} />
                                    {exp.startDate} {exp.current ? '— Present' : exp.endDate ? `— ${exp.endDate}` : ''}
                                </span>
                            )}
                        </div>
                        <div className="entry-actions-row">
                            <button
                                className="btn-icon danger"
                                onClick={(e) => { e.stopPropagation(); removeExperience(exp.id); }}
                                title="Remove"
                            >
                                <Trash2 size={18} />
                            </button>
                            <div className="expand-icon">
                                {expandedId === exp.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </div>
                        </div>
                    </div>

                    {expandedId === exp.id && (
                        <div className="entry-edit animate-in">
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Job Title</label>
                                    <input
                                        type="text"
                                        value={exp.title}
                                        onChange={(e) => updateExperience(exp.id, { title: e.target.value })}
                                        placeholder="Senior Software Engineer"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Company</label>
                                    <input
                                        type="text"
                                        value={exp.company}
                                        onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                                        placeholder="Tech Company Inc."
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Location</label>
                                    <input
                                        type="text"
                                        value={exp.location}
                                        onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                                        placeholder="New York, NY"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Start Date</label>
                                    <input
                                        type="month"
                                        value={exp.startDate}
                                        onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>End Date</label>
                                    <input
                                        type="month"
                                        value={exp.endDate}
                                        onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                                        disabled={exp.current}
                                    />
                                </div>
                                <div className="form-group checkbox-group">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={exp.current}
                                            onChange={(e) => updateExperience(exp.id, { current: e.target.checked })}
                                        />
                                        <CheckCircle size={16} />
                                        Currently working here
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label>Description / Achievements</label>
                                    <AITextArea
                                        value={exp.description}
                                        onChange={(e) => handleDescriptionChange(e.target.value, exp.id)}
                                        placeholder="• Led a team of 5 engineers&#10;• Increased revenue by 25%"
                                        rows={4}
                                        context="experience"
                                    />
                                    {activeTip && (
                                        <div className="tip-bubble animate-in">{activeTip}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}

            {isAdding ? (
                <div className="entry-card new-entry">
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Job Title *</label>
                            <input
                                type="text"
                                value={newExp.title}
                                onChange={(e) => setNewExp({ ...newExp, title: e.target.value })}
                                placeholder="Senior Software Engineer"
                                autoFocus
                            />
                        </div>
                        <div className="form-group">
                            <label>Company *</label>
                            <input
                                type="text"
                                value={newExp.company}
                                onChange={(e) => setNewExp({ ...newExp, company: e.target.value })}
                                placeholder="Tech Company Inc."
                            />
                        </div>
                        <div className="form-group">
                            <label>Location</label>
                            <input
                                type="text"
                                value={newExp.location}
                                onChange={(e) => setNewExp({ ...newExp, location: e.target.value })}
                                placeholder="New York, NY"
                            />
                        </div>
                        <div className="form-group">
                            <label>Start Date</label>
                            <input
                                type="month"
                                value={newExp.startDate}
                                onChange={(e) => setNewExp({ ...newExp, startDate: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>End Date</label>
                            <input
                                type="month"
                                value={newExp.endDate}
                                onChange={(e) => setNewExp({ ...newExp, endDate: e.target.value })}
                                disabled={newExp.current}
                            />
                        </div>
                        <div className="form-group checkbox-group">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={newExp.current}
                                    onChange={(e) => setNewExp({ ...newExp, current: e.target.checked })}
                                />
                                <CheckCircle size={16} />
                                Currently working here
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Description / Achievements</label>
                            <AITextArea
                                value={newExp.description}
                                onChange={(e) => handleDescriptionChange(e.target.value)}
                                placeholder="• Led a team of 5 engineers&#10;• Increased revenue by 25%"
                                rows={4}
                                context="experience"
                            />
                            {activeTip && (
                                <div className="tip-bubble animate-in">{activeTip}</div>
                            )}
                        </div>
                    </div>
                    <div className="entry-actions">
                        <button className="btn secondary" onClick={() => setIsAdding(false)}>Cancel</button>
                        <button className="btn primary" onClick={handleAdd}>Add Experience</button>
                    </div>
                </div>
            ) : (
                <button className="btn add-entry" onClick={() => setIsAdding(true)}>
                    <Plus size={18} />
                    Add Experience
                </button>
            )}
        </div>
    );
}
