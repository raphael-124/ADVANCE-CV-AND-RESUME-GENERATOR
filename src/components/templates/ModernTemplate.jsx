import { QRCodeSVG } from 'qrcode.react';
import { Mail, Phone, MapPin, Linkedin, Globe, Calendar, Award, Github } from 'lucide-react';
import './Templates.css';

export default function ModernTemplate({ data, accentColor }) {
    const { personalInfo, education, experience, skills, projects, certifications, languages, achievements, volunteer, references } = data;
    const techSkills = skills?.technical || [];
    const softSkills = skills?.soft || [];
    const showRefOnRequest = personalInfo.referencesOnRequest !== false;


    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    const profColor = { Native: '#10b981', Fluent: '#6366f1', Intermediate: '#f59e0b', Basic: '#94a3b8' };

    return (
        <div className="cv-template modern" style={{ '--accent': accentColor }}>
            {/* Sidebar */}
            <aside className="modern-sidebar">
                <div className="modern-header">
                    <div className="modern-avatar">
                        {personalInfo.fullName?.charAt(0) || 'U'}
                    </div>
                    <h1 className="modern-name">{personalInfo.fullName || 'Your Name'}</h1>
                </div>

                {/* Contact Info */}
                <div className="modern-section">
                    <h3>Contact</h3>
                    <ul className="modern-contact">
                        {personalInfo.email && <li><Mail size={14} /> {personalInfo.email}</li>}
                        {personalInfo.phone && <li><Phone size={14} /> {personalInfo.phone}</li>}
                        {personalInfo.location && <li><MapPin size={14} /> {personalInfo.location}</li>}
                        {personalInfo.linkedin && <li><Linkedin size={14} /> {personalInfo.linkedin}</li>}
                        {personalInfo.portfolio && <li><Globe size={14} /> {personalInfo.portfolio}</li>}
                        {personalInfo.github && <li><Github size={14} /> {personalInfo.github}</li>}
                    </ul>
                </div>



                {/* Languages */}
                {languages && languages.length > 0 && (
                    <div className="modern-section">
                        <h3>Languages</h3>
                        <ul className="modern-languages">
                            {languages.map(lang => (
                                <li key={lang.id}>
                                    <span className="lang-name">{lang.name}</span>
                                    <span className="lang-badge" style={{ background: (profColor[lang.proficiency] || '#94a3b8') + '22', color: profColor[lang.proficiency] || '#94a3b8' }}>
                                        {lang.proficiency}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* QR Code */}
                {(personalInfo.linkedin || personalInfo.portfolio || personalInfo.github) && (
                    <div className="modern-section qr-section">
                        <h3>Connect</h3>
                        <div className="qr-wrapper">
                            <QRCodeSVG
                                value={personalInfo.linkedin || personalInfo.portfolio || personalInfo.github || ''}
                                size={80}
                                bgColor="transparent"
                                fgColor="currentColor"
                            />
                        </div>
                    </div>
                )}
            </aside>

            {/* Main Content */}
            <main className="modern-main">
                {/* Summary */}
                {personalInfo.summary && (
                    <section className="modern-content-section">
                        <h2>Professional Summary</h2>
                        <p className="summary-text">{personalInfo.summary}</p>
                    </section>
                )}

                {/* Skills - Moved from sidebar to main body */}
                {((techSkills.length > 0) || (softSkills.length > 0)) && (
                    <section className="modern-content-section">
                        <h2>Skills & Expertise</h2>
                        <div className="modern-skills-main-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            {techSkills.length > 0 && (
                                <div className="modern-skills-group">
                                    <h3 style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.05em' }}>Technical</h3>
                                    <div className="modern-skills">
                                        {techSkills.map((skill) => (
                                            <div key={skill.id} className="skill-bar-item">
                                                <div className="skill-bar-header">
                                                    <span>{skill.name}</span>
                                                    <span>{skill.level}%</span>
                                                </div>
                                                <div className="skill-bar-track">
                                                    <div className="skill-bar-fill" style={{ width: `${skill.level}%` }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {softSkills.length > 0 && (
                                <div className="modern-skills-group">
                                    <h3 style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.05em' }}>Core Competencies</h3>
                                    <div className="modern-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        {softSkills.map(s => (
                                            <span key={s.id} className="modern-tag soft-tag" style={{ background: 'rgba(var(--accent-rgb), 0.1)', color: 'var(--accent)', padding: '0.3rem 0.8rem', borderRadius: '4px', fontSize: '0.75rem' }}>{s.name}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                )}


                {/* Experience */}
                {experience.length > 0 && (
                    <section className="modern-content-section">
                        <h2>Work Experience</h2>
                        <div className="timeline">
                            {experience.map((exp) => (
                                <div key={exp.id} className="timeline-item">
                                    <div className="timeline-marker" />
                                    <div className="timeline-content">
                                        <div className="timeline-header">
                                            <h4>{exp.title}</h4>
                                            <span className="timeline-date">
                                                <Calendar size={12} />
                                                {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                                            </span>
                                        </div>
                                        <p className="timeline-company">{exp.company}{exp.location && ` • ${exp.location}`}</p>
                                        {exp.description && <p className="timeline-description">{exp.description}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <section className="modern-content-section">
                        <h2>Education</h2>
                        <div className="timeline">
                            {education.map((edu) => (
                                <div key={edu.id} className="timeline-item">
                                    <div className="timeline-marker" />
                                    <div className="timeline-content">
                                        <div className="timeline-header">
                                            <h4>{edu.institution}</h4>
                                            <span className="timeline-date">
                                                <Calendar size={12} />
                                                {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                                            </span>
                                        </div>
                                        <p className="timeline-company">{edu.degree}{edu.field && ` in ${edu.field}`}</p>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {projects.length > 0 && (
                    <section className="modern-content-section">
                        <h2>Projects</h2>
                        <div className="projects-grid">
                            {projects.map((project) => (
                                <div key={project.id} className="project-card">
                                    <div className="project-icon">
                                        <Award size={20} />
                                    </div>
                                    <div className="project-content">
                                        <h4>{project.name}</h4>
                                        {project.technologies && <p className="project-tech">{project.technologies}</p>}
                                        {project.description && <p className="project-desc">{project.description}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Certifications */}
                {certifications && certifications.length > 0 && (
                    <section className="modern-content-section">
                        <h2>Certifications & Training</h2>
                        <div className="cert-list">
                            {certifications.map(cert => (
                                <div key={cert.id} className="cert-item">
                                    <span className="cert-dot" />
                                    <div>
                                        <span className="cert-name">{cert.name}</span>
                                        {(cert.issuer || cert.year) && (
                                            <span className="cert-meta">
                                                {cert.issuer}{cert.issuer && cert.year ? ' · ' : ''}{cert.year}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Achievements */}
                {achievements && achievements.length > 0 && (
                    <section className="modern-content-section">
                        <h2>Achievements & Awards</h2>
                        <div className="cert-list">
                            {achievements.map(ach => (
                                <div key={ach.id} className="cert-item">
                                    <span className="cert-dot trophy-dot" />
                                    <div>
                                        <span className="cert-name">{ach.title}{ach.year ? ` (${ach.year})` : ''}</span>
                                        {ach.description && <span className="cert-meta">{ach.description}</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Volunteer */}
                {volunteer && volunteer.length > 0 && (
                    <section className="modern-content-section">
                        <h2>Volunteer Experience</h2>
                        <div className="timeline">
                            {volunteer.map(vol => (
                                <div key={vol.id} className="timeline-item">
                                    <div className="timeline-marker" />
                                    <div className="timeline-content">
                                        <div className="timeline-header">
                                            <h4>{vol.role}</h4>
                                            {(vol.startDate || vol.endDate) && (
                                                <span className="timeline-date">
                                                    <Calendar size={12} />
                                                    {formatDate(vol.startDate)}{vol.startDate ? ' - ' : ''}{vol.current ? 'Present' : formatDate(vol.endDate)}
                                                </span>
                                            )}
                                        </div>
                                        {vol.organization && <p className="timeline-company">{vol.organization}</p>}
                                        {vol.description && <p className="timeline-description">{vol.description}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* References */}
                {(showRefOnRequest || (references && references.length > 0)) && (
                    <section className="modern-content-section">
                        <h2>References</h2>
                        {showRefOnRequest ? (
                            <p className="summary-text" style={{ fontStyle: 'italic', color: 'var(--text-secondary)' }}>
                                Available upon request
                            </p>
                        ) : (
                            <div className="refs-grid">
                                {references.map(ref => (
                                    <div key={ref.id} className="ref-card">
                                        <strong>{ref.name}</strong>
                                        {ref.title && <span>{ref.title}</span>}
                                        {ref.company && <span>{ref.company}</span>}
                                        {ref.phone && <span>{ref.phone}</span>}
                                        {ref.email && <span>{ref.email}</span>}
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                )}
            </main>
        </div>
    );
}

