import { QRCodeSVG } from 'qrcode.react';
import { Mail, Phone, MapPin, Linkedin, Github, Globe, Terminal, Code2, Database, Server, Users } from 'lucide-react';
import './Templates.css';

export default function TechTemplate({ data, accentColor }) {
    const { personalInfo, education, experience, skills: skillsObj, projects, references } = data;
    const skills = [...(skillsObj?.technical || []), ...(skillsObj?.soft || [])];

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return (
        <div className="cv-template tech" style={{ '--accent': accentColor }}>
            {/* Terminal-style Header */}
            <header className="tech-header">
                <div className="terminal-bar">
                    <div className="terminal-dots">
                        <span className="dot red" />
                        <span className="dot yellow" />
                        <span className="dot green" />
                    </div>
                    <span className="terminal-title">~/portfolio/{personalInfo.fullName?.toLowerCase().replace(/\s+/g, '-') || 'developer'}</span>
                </div>

                <div className="terminal-content">
                    <div className="terminal-line">
                        <span className="prompt">$</span>
                        <span className="command">whoami</span>
                    </div>
                    <div className="terminal-output">
                        <h1>{personalInfo.fullName || 'Developer Name'}</h1>
                    </div>

                    <div className="terminal-line">
                        <span className="prompt">$</span>
                        <span className="command">cat contact.json</span>
                    </div>
                    <div className="terminal-output json">
                        {'{'}
                        {personalInfo.email && <div>  "email": "{personalInfo.email}",</div>}
                        {personalInfo.phone && <div>  "phone": "{personalInfo.phone}",</div>}
                        {personalInfo.location && <div>  "location": "{personalInfo.location}",</div>}
                        {personalInfo.linkedin && <div>  "linkedin": "{personalInfo.linkedin}",</div>}
                        {personalInfo.portfolio && <div>  "portfolio": "{personalInfo.portfolio}"</div>}
                        {'}'}
                    </div>
                </div>
            </header>

            {/* Summary as README */}
            {personalInfo.summary && (
                <section className="tech-section">
                    <div className="tech-section-header">
                        <Code2 size={16} />
                        <span>README.md</span>
                    </div>
                    <div className="tech-readme">
                        <h2># About</h2>
                        <p>{personalInfo.summary}</p>
                    </div>
                </section>
            )}

            {/* Skills as Tech Stack */}
            {((skillsObj?.technical?.length > 0) || (skillsObj?.soft?.length > 0) || (Array.isArray(skillsObj) && skillsObj.length > 0)) && (
                <section className="tech-section">
                    <div className="tech-section-header">
                        <Database size={16} />
                        <span>tech_stack.yml</span>
                    </div>
                    <div className="tech-stack">
                        {skillsObj?.technical?.length > 0 && (
                            <div style={{ marginBottom: '1rem' }}>
                                <div className="stack-label" style={{ color: 'var(--accent)', opacity: 0.8 }}>technical_expertise:</div>
                                {skillsObj.technical.map((skill) => (
                                    <div key={skill.id} className="stack-item">
                                        <span className="stack-dash">-</span>
                                        <span className="stack-name">{skill.name}:</span>
                                        <div className="stack-bar"><div className="stack-fill" style={{ width: `${skill.level}%` }} /></div>
                                        <span className="stack-level">{skill.level}%</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        {skillsObj?.soft?.length > 0 && (
                            <div>
                                <div className="stack-label" style={{ color: '#94a3b8', opacity: 0.8 }}>soft_competencies:</div>
                                {skillsObj.soft.map((skill) => (
                                    <div key={skill.id} className="stack-item">
                                        <span className="stack-dash">-</span>
                                        <span className="stack-name" style={{ color: '#94a3b8' }}>{skill.name}:</span>
                                        <div className="stack-bar"><div className="stack-fill" style={{ width: `${skill.level}%`, background: '#475569' }} /></div>
                                        <span className="stack-level" style={{ color: '#64748b' }}>{skill.level}%</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        {Array.isArray(skillsObj) && !skillsObj.technical && (
                            <>
                                <div className="stack-label">technologies:</div>
                                {skillsObj.map((skill) => (
                                    <div key={skill.id} className="stack-item">
                                        <span className="stack-dash">-</span>
                                        <span className="stack-name">{skill.name}:</span>
                                        <div className="stack-bar"><div className="stack-fill" style={{ width: `${skill.level}%` }} /></div>
                                        <span className="stack-level">{skill.level}%</span>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </section>
            )}


            {/* Experience as Git Log */}
            {experience.length > 0 && (
                <section className="tech-section">
                    <div className="tech-section-header">
                        <Terminal size={16} />
                        <span>git log --oneline experience</span>
                    </div>
                    <div className="git-log">
                        {experience.map((exp, index) => (
                            <div key={exp.id} className="commit">
                                <span className="commit-hash">{String(experience.length - index).padStart(3, '0')}abc</span>
                                <div className="commit-content">
                                    <div className="commit-message">
                                        <strong>{exp.title}</strong> @ {exp.company}
                                    </div>
                                    <div className="commit-date">
                                        {formatDate(exp.startDate)} → {exp.current ? 'HEAD' : formatDate(exp.endDate)}
                                    </div>
                                    {exp.description && (
                                        <div className="commit-body">{exp.description}</div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects as Repos */}
            {projects.length > 0 && (
                <section className="tech-section">
                    <div className="tech-section-header">
                        <Server size={16} />
                        <span>repositories/</span>
                    </div>
                    <div className="repo-list">
                        {projects.map((project) => (
                            <div key={project.id} className="repo-card">
                                <div className="repo-header">
                                    <span className="repo-icon">📁</span>
                                    <span className="repo-name">{project.name}</span>
                                </div>
                                {project.description && (
                                    <p className="repo-desc">{project.description}</p>
                                )}
                                {project.technologies && (
                                    <div className="repo-langs">
                                        {project.technologies.split(',').map((tech, i) => (
                                            <span key={i} className="lang-tag">{tech.trim()}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {education.length > 0 && (
                <section className="tech-section">
                    <div className="tech-section-header">
                        <Code2 size={16} />
                        <span>education.log</span>
                    </div>
                    <div className="edu-log">
                        {education.map((edu) => (
                            <div key={edu.id} className="edu-entry">
                                <div className="edu-line-main">
                                    <span className="log-time">[{formatDate(edu.endDate) || 'PRESENT'}]</span>
                                    <span className="log-level">INFO</span>
                                    <span className="edu-inst">{edu.institution}</span>
                                </div>
                                <div className="edu-line-sub">
                                    <span className="edu-degree">{edu.degree} in {edu.field}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* References as contact_list.txt */}
            {(references?.length > 0 || personalInfo.referencesOnRequest) && (
                <section className="tech-section">
                    <div className="tech-section-header">
                        <Users size={16} />
                        <span>cat references.txt</span>
                    </div>
                    <div className="tech-stack">
                        {references?.length > 0 ? (
                            references.map((ref, i) => (
                                <div key={i} className="stack-item" style={{ display: 'block', marginBottom: '0.5rem' }}>
                                    <div className="stack-name" style={{ color: '#e2e8f0' }}>{ref.name}</div>
                                    <div style={{ fontSize: '0.8em', color: '#94a3b8' }}>{ref.title} @ {ref.company}</div>
                                    <div style={{ fontSize: '0.8em', color: '#64748b' }}>{ref.phone} {ref.email && `<${ref.email}>`}</div>
                                </div>
                            ))
                        ) : (
                            <div className="stack-item">
                                <span className="stack-dash">#</span>
                                <span className="stack-name" style={{ color: '#94a3b8' }}>References available upon request</span>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* QR Code in Terminal Style */}
            {(personalInfo.linkedin || personalInfo.portfolio) && (
                <footer className="tech-footer">
                    <div className="terminal-line">
                        <span className="prompt">$</span>
                        <span className="command">qr-generate --connect</span>
                    </div>
                    <div className="qr-output">
                        <QRCodeSVG
                            value={personalInfo.linkedin || personalInfo.portfolio || ''}
                            size={70}
                            bgColor="transparent"
                            fgColor="currentColor"
                        />
                    </div>
                </footer>
            )}
        </div>
    );
}
