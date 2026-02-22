import { Mail, Phone, MapPin, Linkedin, BookOpen, Award, Users, Calendar } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import '../templates/Templates.css';

export default function AcademicTemplate({ data, accentColor }) {
    const { personalInfo, education, experience, skills: skillsObj, projects, settings, references } = data;
    const skills = [...(skillsObj?.technical || []), ...(skillsObj?.soft || [])];

    const getInitials = (name) => {
        return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'CV';
    };

    return (
        <div className="cv-template academic" style={{ '--accent': accentColor }}>
            {/* Header */}
            <header className="academic-header">
                <div className="academic-name-block">
                    <h1>{personalInfo.fullName || 'Your Name'}</h1>
                </div>

                <div className="academic-contact-block">
                    <div className="contact-grid">
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
                        {personalInfo.linkedin && (
                            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                                <Linkedin size={14} /> LinkedIn
                            </a>
                        )}
                    </div>
                </div>
            </header>

            {/* Research Interests / Summary */}
            {personalInfo.summary && (
                <section className="academic-section">
                    <h2><BookOpen size={16} /> Research Interests</h2>
                    <div className="academic-content">
                        <p>{personalInfo.summary}</p>
                    </div>
                </section>
            )}

            {/* Skills */}
            {((skillsObj?.technical?.length > 0) || (skillsObj?.soft?.length > 0)) && (
                <section className="academic-section">
                    <h2>Technical & Professional Skills</h2>
                    <div className="academic-content">
                        {skillsObj?.technical?.length > 0 && (
                            <div style={{ marginBottom: '0.6rem' }}>
                                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Core Technical</div>
                                <div className="academic-skills">
                                    {skillsObj.technical.map((skill, index) => (
                                        <span key={index} className="academic-skill tech">{skill.name}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                        {skillsObj?.soft?.length > 0 && (
                            <div>
                                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Communication & Leadership</div>
                                <div className="academic-skills">
                                    {skillsObj.soft.map((skill, index) => (
                                        <span key={index} className="academic-skill soft">{skill.name}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}


            {/* Education */}
            {education?.length > 0 && (
                <section className="academic-section">
                    <h2><Award size={16} /> Education</h2>
                    <div className="academic-content">
                        {education.map((edu, index) => (
                            <div key={index} className="academic-entry">
                                <div className="academic-entry-header">
                                    <div>
                                        <h3>{edu.institution}</h3>
                                        <p className="academic-institution">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</p>
                                    </div>
                                    <span className="academic-date">
                                        {edu.startDate} - {edu.endDate || 'Present'}
                                    </span>
                                </div>

                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Experience */}
            {experience?.length > 0 && (
                <section className="academic-section">
                    <h2><Calendar size={16} /> Professional Experience</h2>
                    <div className="academic-content">
                        {experience.map((exp, index) => (
                            <div key={index} className="academic-entry">
                                <div className="academic-entry-header">
                                    <div>
                                        <h3>{exp.title}</h3>
                                        <p className="academic-institution">{exp.company}</p>
                                    </div>
                                    <span className="academic-date">
                                        {exp.startDate} - {exp.endDate || 'Present'}
                                    </span>
                                </div>
                                {exp.description && (
                                    <p className="academic-description">{exp.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Publications / Projects */}
            {projects?.length > 0 && (
                <section className="academic-section">
                    <h2><BookOpen size={16} /> Publications & Projects</h2>
                    <div className="academic-content">
                        {projects.map((project, index) => (
                            <div key={index} className="academic-publication">
                                <h4>{project.name}</h4>
                                {project.technologies && (
                                    <p className="pub-venue">{project.technologies}</p>
                                )}
                                {project.description && (
                                    <p className="pub-description">{project.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}



            {/* References */}
            {(references?.length > 0 || personalInfo.referencesOnRequest) && (
                <section className="academic-section">
                    <h2><Users size={16} /> References</h2>
                    <div className="academic-content">
                        {references?.length > 0 ? (
                            <div className="references-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                {references.map((ref, i) => (
                                    <div key={i}>
                                        <div style={{ fontWeight: 'bold' }}>{ref.name}</div>
                                        <div style={{ fontSize: '0.9em', fontStyle: 'italic' }}>{ref.title}{ref.company ? `, ${ref.company}` : ''}</div>
                                        <div style={{ fontSize: '0.9em' }}>{ref.phone} • {ref.email}</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>References available upon request.</p>
                        )}
                    </div>
                </section>
            )}

            {/* Footer with QR */}
            <footer className="academic-footer">
                {personalInfo.linkedin && (
                    <div className="qr-section">
                        <QRCodeSVG
                            value={personalInfo.linkedin}
                            size={50}
                            fgColor={accentColor}
                        />
                    </div>
                )}
            </footer>
        </div>
    );
}
