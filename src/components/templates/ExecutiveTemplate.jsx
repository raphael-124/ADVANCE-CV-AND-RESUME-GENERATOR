import { QRCodeSVG } from 'qrcode.react';
import { Mail, Phone, MapPin, Linkedin, Globe, Award, Briefcase, GraduationCap } from 'lucide-react';
import './Templates.css';

export default function ExecutiveTemplate({ data, accentColor }) {
    const { personalInfo, education, experience, skills, projects } = data;

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return (
        <div className="cv-template executive" style={{ '--accent': accentColor }}>
            {/* Elegant Header */}
            <header className="executive-header">
                <div className="executive-name-block">
                    <h1>{personalInfo.fullName || 'Your Name'}</h1>
                    <div className="executive-title-line" />
                </div>

                <div className="executive-contact-row">
                    {personalInfo.email && (
                        <a href={`mailto:${personalInfo.email}`}>
                            <Mail size={14} /> {personalInfo.email}
                        </a>
                    )}
                    {personalInfo.phone && <span><Phone size={14} /> {personalInfo.phone}</span>}
                    {personalInfo.location && <span><MapPin size={14} /> {personalInfo.location}</span>}
                </div>

                <div className="executive-social-row">
                    {personalInfo.linkedin && <span><Linkedin size={14} /> {personalInfo.linkedin}</span>}
                    {personalInfo.portfolio && <span><Globe size={14} /> {personalInfo.portfolio}</span>}
                </div>
            </header>

            {/* Executive Summary */}
            {personalInfo.summary && (
                <section className="executive-section executive-summary">
                    <div className="executive-summary-content">
                        <p>"{personalInfo.summary}"</p>
                    </div>
                </section>
            )}

            {/* Skills / Competencies */}
            {((skills?.technical?.length > 0) || (skills?.soft?.length > 0) || (Array.isArray(skills) && skills.length > 0)) && (
                <section className="executive-section">
                    <h2 style={{ fontSize: '1rem', borderBottom: '1px solid var(--accent)', paddingBottom: '0.3rem', marginBottom: '0.8rem' }}>Core Competencies</h2>
                    <div className="executive-skills-grid">
                        {(skills?.technical?.length > 0) && (
                            <div className="executive-skills-group">
                                <h3 style={{ fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Technical expertise</h3>
                                <div className="executive-skills">
                                    {skills.technical.map((skill) => (
                                        <div key={skill.id} className="executive-skill tech">{skill.name}</div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {(skills?.soft?.length > 0) && (
                            <div className="executive-skills-group" style={{ marginTop: (skills?.technical?.length > 0) ? '0.6rem' : '0' }}>
                                <h3 style={{ fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Leadership & Soft Skills</h3>
                                <div className="executive-skills">
                                    {skills.soft.map((skill) => (
                                        <div key={skill.id} className="executive-skill soft">{skill.name}</div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {Array.isArray(skills) && !skills.technical && (
                            <div className="executive-skills">
                                {skills.map((skill) => (
                                    <div key={skill.id} className="executive-skill">{skill.name}</div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            )}


            {/* Two Column Layout */}
            <div className="executive-body">
                <div className="executive-main">
                    {/* Experience */}
                    {experience.length > 0 && (
                        <section className="executive-section">
                            <h2><Briefcase size={18} /> Professional Experience</h2>
                            {experience.map((exp) => (
                                <div key={exp.id} className="executive-entry">
                                    <div className="executive-entry-header">
                                        <h3>{exp.title}</h3>
                                        <span className="executive-date">
                                            {formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate)}
                                        </span>
                                    </div>
                                    <p className="executive-company">{exp.company}{exp.location && ` | ${exp.location}`}</p>
                                    {exp.description && (
                                        <div className="executive-description">
                                            {exp.description.split('\n').map((line, i) => (
                                                <p key={i}>{line}</p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Projects - as achievements */}
                    {projects.length > 0 && (
                        <section className="executive-section">
                            <h2><Award size={18} /> Key Achievements</h2>
                            <div className="executive-achievements">
                                {projects.map((project) => (
                                    <div key={project.id} className="executive-achievement">
                                        <div className="achievement-icon">★</div>
                                        <div>
                                            <h4>{project.name}</h4>
                                            {project.description && <p>{project.description}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                <aside className="executive-sidebar">
                    {/* Education */}
                    {education.length > 0 && (
                        <section className="executive-section">
                            <h2><GraduationCap size={18} /> Education</h2>
                            {education.map((edu) => (
                                <div key={edu.id} className="executive-edu-item">
                                    <h4>{edu.institution}</h4>
                                    <p>{edu.degree}{edu.field && ` in ${edu.field}`}</p>
                                    <span className="edu-year">{formatDate(edu.endDate)}</span>
                                </div>
                            ))}
                        </section>
                    )}


                    {/* QR Code */}
                    {(personalInfo.linkedin || personalInfo.portfolio) && (
                        <div className="executive-qr">
                            <QRCodeSVG
                                value={personalInfo.linkedin || personalInfo.portfolio || ''}
                                size={70}
                                bgColor="transparent"
                                fgColor="currentColor"
                            />
                            <span>Scan to connect</span>
                        </div>
                    )}
                </aside>
            </div>
        </div>
    );
}
