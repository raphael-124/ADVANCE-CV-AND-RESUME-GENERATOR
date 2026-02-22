import { QRCodeSVG } from 'qrcode.react';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';
import './Templates.css';

export default function MinimalProTemplate({ data, accentColor }) {
    const { personalInfo, education, experience, skills, projects } = data;

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { year: 'numeric' });
    };

    return (
        <div className="cv-template minimal-pro" style={{ '--accent': accentColor }}>
            {/* Ultra Clean Header */}
            <header className="minimal-header">
                <h1>{personalInfo.fullName || 'Your Name'}</h1>
                <div className="minimal-contact">
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                </div>
            </header>

            {/* Thin Accent Line */}
            <div className="minimal-divider" />

            {/* Summary - Centered */}
            {personalInfo.summary && (
                <section className="minimal-section minimal-summary">
                    <p>{personalInfo.summary}</p>
                </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <section className="minimal-section">
                    <h2>Experience</h2>
                    <div className="minimal-entries">
                        {experience.map((exp) => (
                            <div key={exp.id} className="minimal-entry">
                                <div className="minimal-entry-left">
                                    <span className="minimal-date">
                                        {formatDate(exp.startDate)} — {exp.current ? 'Now' : formatDate(exp.endDate)}
                                    </span>
                                </div>
                                <div className="minimal-entry-right">
                                    <h3>{exp.title}</h3>
                                    <p className="minimal-company">{exp.company}</p>
                                    {exp.description && <p className="minimal-desc">{exp.description}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {education.length > 0 && (
                <section className="minimal-section">
                    <h2>Education</h2>
                    <div className="minimal-entries">
                        {education.map((edu) => (
                            <div key={edu.id} className="minimal-entry">
                                <div className="minimal-entry-left">
                                    <span className="minimal-date">{formatDate(edu.endDate)}</span>
                                </div>
                                <div className="minimal-entry-right">
                                    <h3>{edu.institution}</h3>
                                    <p className="minimal-company">{edu.degree}{edu.field && ` in ${edu.field}`}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills - Categorized */}
            {((skills?.technical?.length > 0) || (skills?.soft?.length > 0) || (Array.isArray(skills) && skills.length > 0)) && (
                <section className="minimal-section">
                    <h2>Skills</h2>
                    <div className="minimal-skills-container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {(skills?.technical?.length > 0) && (
                            <div className="minimal-skills-group">
                                <div style={{ fontSize: '0.65rem', fontWeight: 700, opacity: 0.5, textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.1em' }}>Technical proficiency</div>
                                <div className="minimal-skills" style={{ fontSize: '0.85rem' }}>
                                    {skills.technical.map((skill, index) => (
                                        <span key={skill.id}>
                                            {skill.name}{index < skills.technical.length - 1 && ' · '}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                        {(skills?.soft?.length > 0) && (
                            <div className="minimal-skills-group">
                                <div style={{ fontSize: '0.65rem', fontWeight: 700, opacity: 0.5, textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.1em' }}>Core competencies</div>
                                <div className="minimal-skills" style={{ gap: '0.5rem' }}>
                                    {skills.soft.map((skill, index) => (
                                        <span key={skill.id} style={{ background: '#f8fafc', padding: '0.2rem 0.5rem', fontSize: '0.75rem', borderRadius: '2px' }}>
                                            {skill.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                        {Array.isArray(skills) && !skills.technical && (
                            <div className="minimal-skills">
                                {skills.map((skill, index) => (
                                    <span key={skill.id}>
                                        {skill.name}{index < skills.length - 1 && ' · '}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            )}


            {/* Projects */}
            {projects.length > 0 && (
                <section className="minimal-section">
                    <h2>Projects</h2>
                    <div className="minimal-entries">
                        {projects.map((project) => (
                            <div key={project.id} className="minimal-entry">
                                <div className="minimal-entry-left">
                                    {project.technologies && (
                                        <span className="minimal-tech">{project.technologies}</span>
                                    )}
                                </div>
                                <div className="minimal-entry-right">
                                    <h3>{project.name}</h3>
                                    {project.description && <p className="minimal-desc">{project.description}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Footer with links */}
            <footer className="minimal-footer">
                <div className="minimal-links">
                    {personalInfo.linkedin && (
                        <a href={personalInfo.linkedin}>
                            <Linkedin size={14} /> LinkedIn
                        </a>
                    )}
                    {personalInfo.portfolio && (
                        <a href={personalInfo.portfolio}>
                            <Globe size={14} /> Portfolio
                        </a>
                    )}
                </div>

                {(personalInfo.linkedin || personalInfo.portfolio) && (
                    <div className="minimal-qr">
                        <QRCodeSVG
                            value={personalInfo.linkedin || personalInfo.portfolio || ''}
                            size={50}
                            bgColor="transparent"
                            fgColor="currentColor"
                        />
                    </div>
                )}
            </footer>
        </div>
    );
}
