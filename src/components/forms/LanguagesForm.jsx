import { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { Languages, Plus, Trash2 } from 'lucide-react';
import './Forms.css';

const proficiencies = ['Native', 'Fluent', 'Intermediate', 'Basic'];

export default function LanguagesForm() {
    const { cvData, addLanguage, updateLanguage, removeLanguage } = useCV();
    const [newLang, setNewLang] = useState('');
    const [newProf, setNewProf] = useState('Fluent');

    const handleAdd = () => {
        if (!newLang.trim()) return;
        addLanguage({ name: newLang.trim(), proficiency: newProf });
        setNewLang('');
        setNewProf('Fluent');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') { e.preventDefault(); handleAdd(); }
    };

    const profColor = { Native: '#10b981', Fluent: '#6366f1', Intermediate: '#f59e0b', Basic: '#94a3b8' };

    return (
        <div className="form-section">
            <h3 className="form-title">
                <Languages size={20} />
                Languages
            </h3>

            <div className="skills-input-row">
                <input
                    type="text"
                    value={newLang}
                    onChange={e => setNewLang(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Language (e.g. English)"
                />
                <select value={newProf} onChange={e => setNewProf(e.target.value)} className="inline-select">
                    {proficiencies.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <button className="btn primary" onClick={handleAdd}>
                    <Plus size={18} /> Add
                </button>
            </div>

            <div className="languages-list">
                {cvData.languages.map(lang => (
                    <div key={lang.id} className="language-item">
                        <span className="language-name">{lang.name}</span>
                        <div className="language-right">
                            <select
                                value={lang.proficiency}
                                onChange={e => updateLanguage(lang.id, { proficiency: e.target.value })}
                                className="prof-select"
                                style={{ borderColor: profColor[lang.proficiency] }}
                            >
                                {proficiencies.map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                            <span
                                className="prof-badge"
                                style={{ background: profColor[lang.proficiency] + '22', color: profColor[lang.proficiency] }}
                            >
                                {lang.proficiency}
                            </span>
                            <button className="btn-icon danger small" onClick={() => removeLanguage(lang.id)}>
                                <Trash2 size={14} />
                            </button>
                        </div>
                    </div>
                ))}
                {cvData.languages.length === 0 && (
                    <div className="empty-state">
                        <Languages size={32} />
                        <p>No languages added yet</p>
                        <span>Add languages you speak above</span>
                    </div>
                )}
            </div>
        </div>
    );
}
