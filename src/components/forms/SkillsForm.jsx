import { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { Zap, Plus, Trash2, Code2, Heart } from 'lucide-react';
import './Forms.css';

export default function SkillsForm() {
    const { cvData, addSkill, updateSkill, removeSkill } = useCV();
    const [newSkillName, setNewSkillName] = useState('');
    const [newCategory, setNewCategory] = useState('technical');

    const handleAdd = () => {
        if (!newSkillName.trim()) return;
        addSkill(newSkillName.trim(), newCategory);
        setNewSkillName('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') { e.preventDefault(); handleAdd(); }
    };

    const techSkills = cvData.skills?.technical || [];
    const softSkills = cvData.skills?.soft || [];

    const SkillItem = ({ skill, isSoft }) => (
        <div className={`skill-item${isSoft ? ' soft' : ''}`}>
            <div className="skill-header">
                <span className="skill-name">{skill.name}</span>
                <div className="skill-actions">
                    <button
                        className={`category-badge ${isSoft ? 'soft' : 'technical'}`}
                        onClick={() => updateSkill(skill.id, { category: isSoft ? 'technical' : 'soft' })}
                        title={`Click to move to ${isSoft ? 'Technical' : 'Soft'} Skills`}
                    >
                        {isSoft ? 'Soft' : 'Technical'}
                    </button>
                    <button className="btn-icon danger small" onClick={() => removeSkill(skill.id)}>
                        <Trash2 size={14} />
                    </button>
                </div>
            </div>
            <div className="skill-level-container">
                <input
                    type="range" min="10" max="100" value={skill.level}
                    onChange={(e) => updateSkill(skill.id, { level: parseInt(e.target.value) })}
                    className="skill-slider"
                />
                <div className={`skill-bar${isSoft ? ' soft-bar' : ''}`} style={{ width: `${skill.level}%` }} />
                <span className="skill-percentage">{skill.level}%</span>
            </div>
        </div>
    );

    return (
        <div className="form-section">
            <h3 className="form-title">
                <Zap size={20} />
                Skills
            </h3>

            {/* Add Skill Input */}
            <div className="skills-input-row">
                <input
                    type="text"
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a skill and press Enter..."
                />
                <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    className="inline-select"
                >
                    <option value="technical">Technical</option>
                    <option value="soft">Soft</option>
                </select>
                <button className="btn primary" onClick={handleAdd}>
                    <Plus size={18} /> Add
                </button>
            </div>

            {(techSkills.length + softSkills.length) > 0 ? (
                <>
                    <p className="skills-hint">
                        💡 Click the badge on any skill to switch it between Technical and Soft
                    </p>

                    <div className="skills-category-label">
                        <Code2 size={14} /> Technical Skills ({techSkills.length})
                    </div>
                    <div className="skills-list">
                        {techSkills.length > 0 ? (
                            techSkills.map(skill => <SkillItem key={skill.id} skill={skill} isSoft={false} />)
                        ) : (
                            <div className="empty-sub-state">No technical skills yet</div>
                        )}
                    </div>

                    <div className="skills-category-label" style={{ marginTop: '1.25rem' }}>
                        <Heart size={14} /> Soft Skills ({softSkills.length})
                    </div>
                    <div className="skills-list">
                        {softSkills.length > 0 ? (
                            softSkills.map(skill => <SkillItem key={skill.id} skill={skill} isSoft={true} />)
                        ) : (
                            <div className="empty-sub-state">No soft skills yet — add one above and set it to "Soft"</div>
                        )}
                    </div>
                </>
            ) : (
                <div className="empty-state">
                    <Zap size={32} />
                    <p>No skills added yet</p>
                    <span>Add your technical and soft skills above</span>
                </div>
            )}
        </div>
    );
}
