import { Mail, Phone, MapPin, Linkedin, Github, Calendar } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import '../templates/Templates.css';

export default function ElegantTemplate({ data, accentColor }) {
    const { personalInfo, education, experience, skills, projects } = data;

    return (
        <div className="cv-template elegant" style={{ '--accent': accentColor }}>
            {/* Elegant Header */}
            <header className="elegant-header">
                <div className="elegant-border-top" />
                <h1>{personalInfo.fullName || 'Your Name'}</h1>
                <div className="elegant-divider">
                    <span className="elegant-diamond">◆</span>
                </div>
                <div className="elegant-contact">
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>•</span>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.location && <span>•</span>}
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                </div>
            </header>

            {/* Summary */}
            {personalInfo.summary && (
                <section className="elegant-section">
                    <p className="elegant-summary">{personalInfo.summary}</p>
                </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <section className="elegant-section">
                    <h2 className="elegant-section-title">
                        <span>Professional Experience</span>
                    </h2>
                    {experience.map((exp, index) => (
                        <div key={index} className="elegant-entry">
                            <div className="elegant-entry-header">
                                <h3>{exp.title}</h3>
                                <span className="elegant-date">{exp.startDate} — {exp.endDate || 'Present'}</span>
                            </div>
                            <p className="elegant-company">{exp.company}</p>
                            {exp.description && (
                                <p className="elegant-description">{exp.description}</p>
                            )}
                        </div>
                    ))}
                </section>
            )}

            {/* Education */}
            {education.length > 0 && (
                <section className="elegant-section">
                    <h2 className="elegant-section-title">
                        <span>Education</span>
                    </h2>
                    {education.map((edu, index) => (
                        <div key={index} className="elegant-entry">
                            <div className="elegant-entry-header">
                                <h3>{edu.school}</h3>
                                <span className="elegant-date">{edu.startDate} — {edu.endDate || 'Present'}</span>
                            </div>
                            <p className="elegant-company">{edu.degree}{edu.field ? `, ${edu.field}` : ''}</p>
                        </div>
                    ))}
                </section>
            )}

            {/* Skills */}
            {((skills?.technical?.length > 0) || (skills?.soft?.length > 0) || (Array.isArray(skills) && skills.length > 0)) && (
                <section className="elegant-section">
                    <h2 className="elegant-section-title">
                        <span>Expertise</span>
                    </h2>
                    <div className="elegant-skills-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1rem' }}>
                        {(skills?.technical?.length > 0) && (
                            <div className="elegant-skills-col">
                                <h3 style={{ fontSize: '0.7rem', fontWeight: 700, fontStyle: 'italic', letterSpacing: '0.05em', marginBottom: '0.8rem', opacity: 0.8 }}>Technical proficiency</h3>
                                <div className="elegant-skills" style={{ gap: '1rem' }}>
                                    {skills.technical.map((skill, index) => (
                                        <span key={index} className="elegant-skill" style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '0.2rem', display: 'flex', justifyContent: 'space-between' }}>
                                            {skill.name}
                                            <span style={{ fontSize: '0.65rem', opacity: 0.5 }}>{skill.level}%</span>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                        {(skills?.soft?.length > 0) && (
                            <div className="elegant-skills-col">
                                <h3 style={{ fontSize: '0.7rem', fontWeight: 700, fontStyle: 'italic', letterSpacing: '0.05em', marginBottom: '0.8rem', opacity: 0.8 }}>Core competencies</h3>
                                <div className="elegant-skills" style={{ gap: '0.5rem' }}>
                                    {skills.soft.map((skill, index) => (
                                        <span key={index} className="elegant-skill" style={{ background: '#f8fafc', padding: '0.2rem 0.5rem', borderRadius: '2px' }}>
                                            {skill.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                        {Array.isArray(skills) && !skills.technical && (
                            <div className="elegant-skills">
                                {skills.map((skill, index) => (
                                    <span key={index} className="elegant-skill">{skill.name}</span>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            )}


            {/* Projects */}
            {projects.length > 0 && (
                <section className="elegant-section">
                    <h2 className="elegant-section-title">
                        <span>Notable Projects</span>
                    </h2>
                    {projects.map((project, index) => (
                        <div key={index} className="elegant-project">
                            <h4>{project.name}</h4>
                            {project.technologies && (
                                <p className="elegant-tech">{project.technologies}</p>
                            )}
                            {project.description && (
                                <p className="elegant-description">{project.description}</p>
                            )}
                        </div>
                    ))}
                </section>
            )}

            {/* Footer */}
            <footer className="elegant-footer">
                <div className="elegant-border-bottom" />
                {personalInfo.linkedin && (
                    <div className="elegant-qr">
                        <QRCodeSVG
                            value={personalInfo.linkedin}
                            size={45}
                            fgColor={accentColor}
                        />
                    </div>
                )}
            </footer>
        </div>
    );
}
