import { QRCodeSVG } from 'qrcode.react';
import { Mail, Phone, MapPin, Linkedin, Globe, Calendar } from 'lucide-react';
import './Templates.css';

export default function ClassicTemplate({ data, accentColor }) {
    const { personalInfo, education, experience, skills, projects } = data;

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return (
        <div className="cv-template classic" style={{ '--accent': accentColor }}>
            {/* Header */}
            <header className="classic-header">
                <h1>{personalInfo.fullName || 'Your Name'}</h1>
                <div className="classic-contact">
                    {personalInfo.email && <span><Mail size={14} /> {personalInfo.email}</span>}
                    {personalInfo.phone && <span><Phone size={14} /> {personalInfo.phone}</span>}
                    {personalInfo.location && <span><MapPin size={14} /> {personalInfo.location}</span>}
                    {personalInfo.linkedin && <span><Linkedin size={14} /> {personalInfo.linkedin}</span>}
                    {personalInfo.portfolio && <span><Globe size={14} /> {personalInfo.portfolio}</span>}
                </div>
            </header>

            {/* Summary */}
            {personalInfo.summary && (
                <section className="classic-section">
                    <h2>Professional Summary</h2>
                    <div className="classic-divider" />
                    <p>{personalInfo.summary}</p>
                </section>
            )}

            {/* Skills */}
            {((skills?.technical?.length > 0) || (skills?.soft?.length > 0) || (Array.isArray(skills) && skills.length > 0)) && (
                <section className="classic-section">
                    <h2>Skills</h2>
                    <div className="classic-divider" />
                    <div className="classic-skills-cols">
                        {(skills?.technical?.length > 0) && (
                            <div className="classic-skills-group">
                                <h3 className="classic-skills-sublabel">Technical</h3>
                                <div className="classic-skills">
                                    {skills.technical.map((skill) => (
                                        <span key={skill.id} className="classic-skill-tag tech">
                                            {skill.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                        {(skills?.soft?.length > 0) && (
                            <div className="classic-skills-group">
                                <h3 className="classic-skills-sublabel">Soft Skills</h3>
                                <div className="classic-skills">
                                    {skills.soft.map((skill) => (
                                        <span key={skill.id} className="classic-skill-tag soft">
                                            {skill.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                        {Array.isArray(skills) && skills.length > 0 && (
                            <div className="classic-skills">
                                {skills.map((skill) => (
                                    <span key={skill.id} className="classic-skill-tag">
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            )}


            {/* Experience */}
            {experience.length > 0 && (
                <section className="classic-section">
                    <h2>Professional Experience</h2>
                    <div className="classic-divider" />
                    {experience.map((exp) => (
                        <div key={exp.id} className="classic-entry">
                            <div className="classic-entry-header">
                                <div>
                                    <h3>{exp.title}</h3>
                                    <p className="classic-company">{exp.company}{exp.location && `, ${exp.location}`}</p>
                                </div>
                                <span className="classic-date">
                                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                                </span>
                            </div>
                            {exp.description && <p className="classic-description">{exp.description}</p>}
                        </div>
                    ))}
                </section>
            )}

            {/* Education */}
            {education.length > 0 && (
                <section className="classic-section">
                    <h2>Education</h2>
                    <div className="classic-divider" />
                    {education.map((edu) => (
                        <div key={edu.id} className="classic-entry">
                            <div className="classic-entry-header">
                                <div>
                                    <h3>{edu.institution}</h3>
                                    <p className="classic-company">{edu.degree}{edu.field && ` in ${edu.field}`}</p>
                                </div>
                                <span className="classic-date">
                                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                                </span>
                            </div>

                        </div>
                    ))}
                </section>
            )}



            {/* Projects */}
            {projects.length > 0 && (
                <section className="classic-section">
                    <h2>Projects</h2>
                    <div className="classic-divider" />
                    {projects.map((project) => (
                        <div key={project.id} className="classic-entry">
                            <h3>{project.name}</h3>
                            {project.technologies && (
                                <p className="classic-tech">{project.technologies}</p>
                            )}
                            {project.description && <p className="classic-description">{project.description}</p>}
                        </div>
                    ))}
                </section>
            )}

            {/* QR Code (bottom right) */}
            {(personalInfo.linkedin || personalInfo.portfolio) && (
                <div className="classic-qr">
                    <QRCodeSVG
                        value={personalInfo.linkedin || personalInfo.portfolio || ''}
                        size={60}
                        bgColor="transparent"
                        fgColor="currentColor"
                    />
                </div>
            )}
        </div>
    );
}
