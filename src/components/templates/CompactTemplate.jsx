import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import '../templates/Templates.css';

export default function CompactTemplate({ data, accentColor }) {
    const { personalInfo, education, experience, skills, projects } = data;

    return (
        <div className="cv-template compact" style={{ '--accent': accentColor }}>
            {/* Compact Header */}
            <header className="compact-header">
                <h1>{personalInfo.fullName || 'Your Name'}</h1>
                <div className="compact-contact">
                    {personalInfo.email && <span><Mail size={12} /> {personalInfo.email}</span>}
                    {personalInfo.phone && <span><Phone size={12} /> {personalInfo.phone}</span>}
                    {personalInfo.location && <span><MapPin size={12} /> {personalInfo.location}</span>}
                    {personalInfo.linkedin && (
                        <a href={personalInfo.linkedin}><Linkedin size={12} /> LinkedIn</a>
                    )}
                    {personalInfo.github && (
                        <a href={personalInfo.github}><Github size={12} /> GitHub</a>
                    )}
                </div>
            </header>

            <div className="compact-body">
                {/* Left Column */}
                <div className="compact-left">
                    {/* Summary */}
                    {personalInfo.summary && (
                        <section className="compact-section">
                            <h2>Profile</h2>
                            <p className="compact-summary">{personalInfo.summary}</p>
                        </section>
                    )}

                    {/* Experience */}
                    {experience.length > 0 && (
                        <section className="compact-section">
                            <h2>Experience</h2>
                            {experience.map((exp, index) => (
                                <div key={index} className="compact-entry">
                                    <div className="compact-entry-line">
                                        <strong>{exp.title}</strong>
                                        <span>{exp.startDate} - {exp.endDate || 'Present'}</span>
                                    </div>
                                    <div className="compact-entry-sub">{exp.company}</div>
                                    {exp.description && (
                                        <p className="compact-desc">{exp.description}</p>
                                    )}
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Projects */}
                    {projects.length > 0 && (
                        <section className="compact-section">
                            <h2>Projects</h2>
                            {projects.map((project, index) => (
                                <div key={index} className="compact-entry">
                                    <div className="compact-entry-line">
                                        <strong>{project.name}</strong>
                                        {project.technologies && <span className="compact-tech">{project.technologies}</span>}
                                    </div>
                                    {project.description && (
                                        <p className="compact-desc">{project.description}</p>
                                    )}
                                </div>
                            ))}
                        </section>
                    )}
                </div>

                {/* Right Column */}
                <div className="compact-right">
                    {/* Skills */}
                    {((skills?.technical?.length > 0) || (skills?.soft?.length > 0) || (Array.isArray(skills) && skills.length > 0)) && (
                        <section className="compact-section">
                            <h2>Skills</h2>
                            {(skills?.technical?.length > 0) && (
                                <div style={{ marginBottom: '0.4rem' }}>
                                    <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Technical</div>
                                    <div className="compact-skills">
                                        {skills.technical.map((skill, index) => (
                                            <span key={index} className="compact-skill tech">{skill.name}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {(skills?.soft?.length > 0) && (
                                <div>
                                    <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Soft Skills</div>
                                    <div className="compact-skills">
                                        {skills.soft.map((skill, index) => (
                                            <span key={index} className="compact-skill soft">{skill.name}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {Array.isArray(skills) && !skills.technical && (
                                <div className="compact-skills">
                                    {skills.map((skill, index) => (
                                        <span key={index} className="compact-skill">{skill.name}</span>
                                    ))}
                                </div>
                            )}
                        </section>
                    )}

                    {/* Education */}
                    {education.length > 0 && (
                        <section className="compact-section">
                            <h2>Education</h2>
                            {education.map((edu, index) => (
                                <div key={index} className="compact-edu">
                                    <strong>{edu.school}</strong>
                                    <div className="compact-school">{edu.degree}{edu.field && <span> in {edu.field}</span>}</div>
                                    <div className="compact-dates">
                                        {edu.startDate} - {edu.endDate || 'Present'}
                                    </div>
                                </div>
                            ))}
                        </section>
                    )}


                    {/* QR Code */}
                    {personalInfo.linkedin && (
                        <section className="compact-qr">
                            <QRCodeSVG
                                value={personalInfo.linkedin}
                                size={50}
                                fgColor={accentColor}
                            />
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}
