import { Mail, Phone, MapPin, Linkedin, Github, ArrowRight } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import '../templates/Templates.css';

export default function BoldTemplate({ data, accentColor }) {
    const { personalInfo, education, experience, skills, projects } = data;

    const getInitials = (name) => {
        return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'CV';
    };

    return (
        <div className="cv-template bold" style={{ '--accent': accentColor }}>
            {/* Bold Header */}
            <header className="bold-header">
                <div className="bold-accent-bar" />
                <div className="bold-header-content">
                    <div className="bold-avatar">
                        {getInitials(personalInfo.fullName)}
                    </div>
                    <div className="bold-intro">
                        <h1>{personalInfo.fullName || 'YOUR NAME'}</h1>
                        <div className="bold-contact-row">
                            {personalInfo.email && (
                                <a href={`mailto:${personalInfo.email}`}>
                                    <Mail size={14} /> {personalInfo.email}
                                </a>
                            )}
                            {personalInfo.phone && (
                                <span><Phone size={14} /> {personalInfo.phone}</span>
                            )}
                            {personalInfo.location && (
                                <span><MapPin size={14} /> {personalInfo.location}</span>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Summary */}
            {personalInfo.summary && (
                <section className="bold-section bold-summary">
                    <p>{personalInfo.summary}</p>
                </section>
            )}

            {/* Skills */}
            {((skills?.technical?.length > 0) || (skills?.soft?.length > 0) || (Array.isArray(skills) && skills.length > 0)) && (
                <section className="bold-section" style={{ padding: '1rem 2rem 0.5rem' }}>
                    <h2 className="bold-section-title" style={{ marginBottom: '0.8rem' }}>Skills & Expertise</h2>
                    <div className="bold-skills-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        {(skills?.technical?.length > 0) && (
                            <div>
                                <h3 style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '0.6rem' }}>Technical skills</h3>
                                <div className="bold-skills">
                                    {skills.technical.map((skill, index) => (
                                        <div key={index} className="bold-skill">
                                            <span className="bold-skill-name">{skill.name}</span>
                                            <div className="bold-skill-bar"><div className="bold-skill-fill" style={{ width: `${skill.level}%` }} /></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {(skills?.soft?.length > 0) && (
                            <div>
                                <h3 style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '0.6rem' }}>Soft Skills</h3>
                                <div className="bold-skills">
                                    {skills.soft.map((skill, index) => (
                                        <div key={index} className="bold-skill">
                                            <span className="bold-skill-name">{skill.name}</span>
                                            <div className="bold-skill-bar"><div className="bold-skill-fill" style={{ width: `${skill.level}%`, background: '#94a3b8' }} /></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}


            <div className="bold-body">
                {/* Main Content */}
                <div className="bold-main">
                    {/* Experience */}
                    {experience.length > 0 && (
                        <section className="bold-section">
                            <h2 className="bold-section-title">Experience</h2>
                            {experience.map((exp, index) => (
                                <div key={index} className="bold-entry">
                                    <div className="bold-entry-marker">
                                        <ArrowRight size={16} />
                                    </div>
                                    <div className="bold-entry-content">
                                        <div className="bold-entry-header">
                                            <h3>{exp.title}</h3>
                                            <span className="bold-date">{exp.startDate} - {exp.endDate || 'Present'}</span>
                                        </div>
                                        <p className="bold-company">{exp.company}</p>
                                        {exp.description && (
                                            <p className="bold-description">{exp.description}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Projects */}
                    {projects.length > 0 && (
                        <section className="bold-section">
                            <h2 className="bold-section-title">Projects</h2>
                            <div className="bold-projects-grid">
                                {projects.map((project, index) => (
                                    <div key={index} className="bold-project">
                                        <h4>{project.name}</h4>
                                        {project.technologies && (
                                            <p className="bold-tech">{project.technologies}</p>
                                        )}
                                        {project.description && (
                                            <p className="bold-desc">{project.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar */}
                <aside className="bold-sidebar">
                    {/* Education */}
                    {education.length > 0 && (
                        <section className="bold-sidebar-section">
                            <h3>Education</h3>
                            {education.map((edu, index) => (
                                <div key={index} className="bold-edu">
                                    <h4>{edu.school}</h4>
                                    <p>{edu.degree}</p>
                                    <span>{edu.startDate} - {edu.endDate || 'Present'}</span>
                                </div>
                            ))}
                        </section>
                    )}

                    {/* QR Code */}
                    {personalInfo.linkedin && (
                        <section className="bold-sidebar-section bold-qr">
                            <QRCodeSVG
                                value={personalInfo.linkedin}
                                size={60}
                                fgColor="#ffffff"
                                bgColor="transparent"
                            />
                            <span>Scan to connect</span>
                        </section>
                    )}
                </aside>
            </div>
        </div>
    );
}
