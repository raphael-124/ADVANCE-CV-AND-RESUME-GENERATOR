import { QRCodeSVG } from 'qrcode.react';
import { Mail, Phone, MapPin, Linkedin, Globe, Sparkles, Palette } from 'lucide-react';
import './Templates.css';

export default function CreativeTemplate({ data, accentColor }) {
    const { personalInfo, education, experience, skills, projects } = data;

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return (
        <div className="cv-template creative" style={{ '--accent': accentColor }}>
            {/* Creative Header with Gradient */}
            <header className="creative-header">
                <div className="creative-shapes">
                    <div className="shape shape-1" />
                    <div className="shape shape-2" />
                    <div className="shape shape-3" />
                </div>

                <div className="creative-header-content">
                    <div className="creative-avatar">
                        <span>{personalInfo.fullName?.charAt(0) || '?'}</span>
                    </div>
                    <h1>{personalInfo.fullName || 'Your Name'}</h1>

                    <div className="creative-contact">
                        {personalInfo.email && <span><Mail size={14} /> {personalInfo.email}</span>}
                        {personalInfo.phone && <span><Phone size={14} /> {personalInfo.phone}</span>}
                        {personalInfo.location && <span><MapPin size={14} /> {personalInfo.location}</span>}
                    </div>

                    <div className="creative-links">
                        {personalInfo.linkedin && (
                            <a href={personalInfo.linkedin}><Linkedin size={16} /></a>
                        )}
                        {personalInfo.portfolio && (
                            <a href={personalInfo.portfolio}><Globe size={16} /></a>
                        )}
                    </div>
                </div>
            </header>

            {/* About Me */}
            {personalInfo.summary && (
                <section className="creative-section creative-about">
                    <div className="section-icon"><Sparkles size={20} /></div>
                    <div className="section-content">
                        <h2>About Me</h2>
                        <p>{personalInfo.summary}</p>
                    </div>
                </section>
            )}

            {/* Skills - Visual Tags */}
            {((skills?.technical?.length > 0) || (skills?.soft?.length > 0) || (Array.isArray(skills) && skills.length > 0)) && (
                <section className="creative-section creative-skills-section">
                    <div className="section-icon"><Palette size={20} /></div>
                    <div className="section-content">
                        <h2>Skills & Expertise</h2>

                        {skills?.technical?.length > 0 && (
                            <div style={{ marginBottom: '1.2rem' }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 700, opacity: 0.7, marginBottom: '0.5rem', textTransform: 'uppercase' }}>Technical</div>
                                <div className="creative-skills">
                                    {skills.technical.map((skill, index) => (
                                        <div key={skill.id} className="creative-skill-bubble tech" style={{ '--delay': `${index * 0.1}s`, '--size': `${0.8 + (skill.level / 100) * 0.4}` }}>
                                            {skill.name}
                                            <span className="skill-level">{skill.level}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {skills?.soft?.length > 0 && (
                            <div>
                                <div style={{ fontSize: '0.75rem', fontWeight: 700, opacity: 0.7, marginBottom: '0.5rem', textTransform: 'uppercase' }}>Soft Skills</div>
                                <div className="creative-skills">
                                    {skills.soft.map((skill, index) => (
                                        <div key={skill.id} className="creative-skill-bubble soft" style={{ '--delay': `${index * 0.1}s`, '--size': `${0.8 + (skill.level / 100) * 0.4}` }}>
                                            {skill.name}
                                            <span className="skill-level">{skill.level}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {Array.isArray(skills) && !skills.technical && (
                            <div className="creative-skills">
                                {skills.map((skill, index) => (
                                    <div key={skill.id} className="creative-skill-bubble" style={{ '--delay': `${index * 0.1}s`, '--size': `${0.8 + (skill.level / 100) * 0.4}` }}>
                                        {skill.name}
                                        <span className="skill-level">{skill.level}%</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            )}


            {/* Experience - Cards */}
            {experience.length > 0 && (
                <section className="creative-section">
                    <h2 className="creative-section-title">Experience Journey</h2>
                    <div className="creative-cards">
                        {experience.map((exp, index) => (
                            <div
                                key={exp.id}
                                className="creative-card"
                                style={{ '--delay': `${index * 0.1}s` }}
                            >
                                <div className="card-accent" />
                                <div className="card-content">
                                    <span className="card-date">
                                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                                    </span>
                                    <h3>{exp.title}</h3>
                                    <p className="card-company">{exp.company}</p>
                                    {exp.description && <p className="card-desc">{exp.description}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {education.length > 0 && (
                <section className="creative-section">
                    <h2 className="creative-section-title">Education</h2>
                    <div className="creative-edu-grid">
                        {education.map((edu) => (
                            <div key={edu.id} className="creative-edu-card">
                                <div className="edu-icon">🎓</div>
                                <h4>{edu.institution}</h4>
                                <p>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
                <section className="creative-section">
                    <h2 className="creative-section-title">Featured Projects</h2>
                    <div className="creative-projects">
                        {projects.map((project) => (
                            <div key={project.id} className="creative-project">
                                <h4>{project.name}</h4>
                                {project.technologies && (
                                    <div className="project-tags">
                                        {project.technologies.split(',').map((tech, i) => (
                                            <span key={i}>{tech.trim()}</span>
                                        ))}
                                    </div>
                                )}
                                {project.description && <p>{project.description}</p>}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* QR Footer */}
            {(personalInfo.linkedin || personalInfo.portfolio) && (
                <footer className="creative-footer">
                    <QRCodeSVG
                        value={personalInfo.linkedin || personalInfo.portfolio || ''}
                        size={60}
                        bgColor="transparent"
                        fgColor="currentColor"
                    />
                    <span>Let's Connect!</span>
                </footer>
            )}
        </div>
    );
}
