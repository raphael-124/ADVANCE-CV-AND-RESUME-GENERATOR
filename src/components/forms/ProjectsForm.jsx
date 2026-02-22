import { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { FolderGit2, Plus, Trash2, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import './Forms.css';

export default function ProjectsForm() {
    const { cvData, addProject, updateProject, removeProject } = useCV();
    const [isAdding, setIsAdding] = useState(false);
    const [expandedId, setExpandedId] = useState(null);
    const [newProject, setNewProject] = useState({
        name: '',
        description: '',
        technologies: '',
        url: ''
    });

    const handleAdd = () => {
        if (newProject.name) {
            addProject(newProject);
            setNewProject({
                name: '',
                description: '',
                technologies: '',
                url: ''
            });
            setIsAdding(false);
        }
    };

    return (
        <div className="form-section">
            <h3 className="form-title">
                <FolderGit2 size={20} />
                Projects
            </h3>

            {cvData.projects.map((project) => (
                <div key={project.id} className={`entry-card ${expandedId === project.id ? 'expanded' : ''}`}>
                    <div
                        className="entry-header clickable"
                        onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}
                    >
                        <div className="entry-info">
                            <h4>{project.name}</h4>
                            {project.url && (
                                <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-link" onClick={e => e.stopPropagation()}>
                                    <ExternalLink size={14} />
                                    View Project
                                </a>
                            )}
                        </div>
                        <div className="entry-actions-row">
                            <button
                                className="btn-icon danger"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeProject(project.id);
                                }}
                                title="Remove"
                            >
                                <Trash2 size={18} />
                            </button>
                            <div className="expand-icon">
                                {expandedId === project.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </div>
                        </div>
                    </div>

                    {expandedId === project.id && (
                        <div className="entry-edit animate-in">
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Project Name</label>
                                    <input
                                        type="text"
                                        value={project.name}
                                        onChange={(e) => updateProject(project.id, { name: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Technologies</label>
                                    <input
                                        type="text"
                                        value={project.technologies}
                                        onChange={(e) => updateProject(project.id, { technologies: e.target.value })}
                                        placeholder="React, Node.js, MongoDB"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Project URL</label>
                                    <input
                                        type="url"
                                        value={project.url}
                                        onChange={(e) => updateProject(project.id, { url: e.target.value })}
                                        placeholder="https://github.com/..."
                                    />
                                </div>
                            </div>
                            <div className="form-group full-width">
                                <label>Description</label>
                                <textarea
                                    value={project.description}
                                    onChange={(e) => updateProject(project.id, { description: e.target.value })}
                                    placeholder="Describe what the project does and your role in it..."
                                    rows={3}
                                />
                            </div>
                        </div>
                    )}
                </div>
            ))}

            {isAdding ? (
                <div className="entry-card new-entry">
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Project Name *</label>
                            <input
                                type="text"
                                value={newProject.name}
                                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                                placeholder="E-commerce Platform"
                            />
                        </div>
                        <div className="form-group">
                            <label>Technologies</label>
                            <input
                                type="text"
                                value={newProject.technologies}
                                onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                                placeholder="React, Node.js, MongoDB"
                            />
                        </div>
                        <div className="form-group">
                            <label>Project URL</label>
                            <input
                                type="url"
                                value={newProject.url}
                                onChange={(e) => setNewProject({ ...newProject, url: e.target.value })}
                                placeholder="https://github.com/..."
                            />
                        </div>
                    </div>
                    <div className="form-group full-width">
                        <label>Description</label>
                        <textarea
                            value={newProject.description}
                            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                            placeholder="Describe what the project does and your role in it..."
                            rows={3}
                        />
                    </div>
                    <div className="entry-actions">
                        <button className="btn secondary" onClick={() => setIsAdding(false)}>
                            Cancel
                        </button>
                        <button className="btn primary" onClick={handleAdd}>
                            Add Project
                        </button>
                    </div>
                </div>
            ) : (
                <button className="btn add-entry" onClick={() => setIsAdding(true)}>
                    <Plus size={18} />
                    Add Project
                </button>
            )}
        </div>
    );
}
