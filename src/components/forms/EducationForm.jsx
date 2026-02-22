import { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { GraduationCap, Plus, Trash2, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import './Forms.css';

export default function EducationForm() {
    const { cvData, addEducation, updateEducation, removeEducation } = useCV();
    const [isAdding, setIsAdding] = useState(false);
    const [expandedId, setExpandedId] = useState(null);
    const [newEdu, setNewEdu] = useState({
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: ''
    });

    const handleAdd = () => {
        if (newEdu.institution && newEdu.degree) {
            addEducation(newEdu);
            setNewEdu({ institution: '', degree: '', field: '', startDate: '', endDate: '' });
            setIsAdding(false);
        }
    };

    return (
        <div className="form-section">
            <h3 className="form-title">
                <GraduationCap size={20} />
                Education
            </h3>

            {cvData.education.map((edu) => (
                <div key={edu.id} className={`entry-card ${expandedId === edu.id ? 'expanded' : ''}`}>
                    <div
                        className="entry-header clickable"
                        onClick={() => setExpandedId(expandedId === edu.id ? null : edu.id)}
                    >
                        <div className="entry-info">
                            <h4>{edu.institution || 'Untitled Institution'}</h4>
                            {edu.degree && (
                                <p>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</p>
                            )}
                            {(edu.startDate || edu.endDate) && (
                                <span className="entry-dates">
                                    <Calendar size={14} />
                                    {edu.startDate} {edu.endDate ? `— ${edu.endDate}` : ''}
                                </span>
                            )}
                        </div>
                        <div className="entry-actions-row">
                            <button
                                className="btn-icon danger"
                                onClick={(e) => { e.stopPropagation(); removeEducation(edu.id); }}
                                title="Remove"
                            >
                                <Trash2 size={18} />
                            </button>
                            <div className="expand-icon">
                                {expandedId === edu.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </div>
                        </div>
                    </div>

                    {expandedId === edu.id && (
                        <div className="entry-edit animate-in">
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Institution</label>
                                    <input
                                        type="text"
                                        value={edu.institution}
                                        onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                                        placeholder="University of Example"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Degree</label>
                                    <input
                                        type="text"
                                        value={edu.degree}
                                        onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                                        placeholder="Bachelor's, Master's, PhD..."
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Field of Study</label>
                                    <input
                                        type="text"
                                        value={edu.field}
                                        onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                                        placeholder="Computer Science"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Start Date</label>
                                    <input
                                        type="month"
                                        value={edu.startDate}
                                        onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>End Date</label>
                                    <input
                                        type="month"
                                        value={edu.endDate}
                                        onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                                    />
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
                            <label>Institution *</label>
                            <input
                                type="text"
                                value={newEdu.institution}
                                onChange={(e) => setNewEdu({ ...newEdu, institution: e.target.value })}
                                placeholder="University of Example"
                                autoFocus
                            />
                        </div>
                        <div className="form-group">
                            <label>Degree *</label>
                            <input
                                type="text"
                                value={newEdu.degree}
                                onChange={(e) => setNewEdu({ ...newEdu, degree: e.target.value })}
                                placeholder="Bachelor's"
                            />
                        </div>
                        <div className="form-group">
                            <label>Field of Study</label>
                            <input
                                type="text"
                                value={newEdu.field}
                                onChange={(e) => setNewEdu({ ...newEdu, field: e.target.value })}
                                placeholder="Computer Science"
                            />
                        </div>
                        <div className="form-group">
                            <label>Start Date</label>
                            <input
                                type="month"
                                value={newEdu.startDate}
                                onChange={(e) => setNewEdu({ ...newEdu, startDate: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>End Date</label>
                            <input
                                type="month"
                                value={newEdu.endDate}
                                onChange={(e) => setNewEdu({ ...newEdu, endDate: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="entry-actions">
                        <button className="btn secondary" onClick={() => setIsAdding(false)}>Cancel</button>
                        <button className="btn primary" onClick={handleAdd}>Add Education</button>
                    </div>
                </div>
            ) : (
                <button className="btn add-entry" onClick={() => setIsAdding(true)}>
                    <Plus size={18} />
                    Add Education
                </button>
            )}
        </div>
    );
}
