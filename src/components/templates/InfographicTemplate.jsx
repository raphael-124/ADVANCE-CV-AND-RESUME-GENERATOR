import { QRCodeSVG } from 'qrcode.react';
import { Mail, Phone, MapPin, Linkedin, Globe, TrendingUp } from 'lucide-react';
import './Templates.css';

export default function InfographicTemplate({ data, accentColor }) {
    const { personalInfo, education, experience, skills, projects } = data;

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    // Calculate years of experience
    const totalYears = experience.reduce((total, exp) => {
        const start = new Date(exp.startDate);
        const end = exp.current ? new Date() : new Date(exp.endDate);
        return total + ((end - start) / (1000 * 60 * 60 * 24 * 365));
    }, 0);

    return (
        <div className="cv-template infographic" style={{ '--accent': accentColor }}>
            {/* Visual Header */}
            <header className="infographic-header">
                <div className="infographic-avatar">
                    <span>{personalInfo.fullName?.charAt(0) || 'U'}</span>
                </div>
                <div className="infographic-intro">
                    <h1>{personalInfo.fullName || 'Your Name'}</h1>
                    <div className="infographic-contact-icons">
                        {personalInfo.email && (
                            <div className="contact-chip">
                                <Mail size={12} />
                                <span>{personalInfo.email}</span>
                            </div>
                        )}
                        {personalInfo.phone && (
                            <div className="contact-chip">
                                <Phone size={12} />
                                <span>{personalInfo.phone}</span>
                            </div>
                        )}
                        {personalInfo.location && (
                            <div className="contact-chip">
                                <MapPin size={12} />
                                <span>{personalInfo.location}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="infographic-stats">
                    <div className="stat-card">
                        <span className="stat-number">{Math.round(totalYears) || 0}+</span>
                        <span className="stat-label">Years Exp</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-number">{projects.length}</span>
                        <span className="stat-label">Projects</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-number">{skills.length}</span>
                        <span className="stat-label">Skills</span>
                    </div>
                </div>
            </header>

            {/* Summary */}
            {personalInfo.summary && (
                <section className="infographic-summary">
                    <p>{personalInfo.summary}</p>
                </section>
            )}

            {/* Two Column Layout */}
            <div className="infographic-body">
                {/* Left Column */}
                <div className="infographic-left">
                    {/* Skills Chart */}
                    {((skills?.technical?.length > 0) || (skills?.soft?.length > 0) || (Array.isArray(skills) && skills.length > 0)) && (
                        <section className="infographic-section">
                            <h2><TrendingUp size={18} /> Skills</h2>
                            <div className="skills-chart">
                                {skills?.technical?.length > 0 && (
                                    <>
                                        <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '0.5rem', marginTop: '0.5rem' }}>Technical</div>
                                        {skills.technical.slice(0, 6).map((skill) => (
                                            <div key={skill.id} className="chart-bar-container">
                                                <div className="chart-label">{skill.name}</div>
                                                <div className="chart-bar-wrapper">
                                                    <div className="chart-bar" style={{ width: `${skill.level}%` }}>
                                                        <span className="chart-value">{skill.level}%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}
                                {skills?.soft?.length > 0 && (
                                    <>
                                        <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '0.5rem', marginTop: '1rem' }}>Soft Skills</div>
                                        {skills.soft.slice(0, 4).map((skill) => (
                                            <div key={skill.id} className="chart-bar-container">
                                                <div className="chart-label">{skill.name}</div>
                                                <div className="chart-bar-wrapper">
                                                    <div className="chart-bar soft" style={{ width: `${skill.level}%`, background: '#94a3b8' }}>
                                                        <span className="chart-value">{skill.level}%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}
                                {Array.isArray(skills) && !skills.technical && skills.slice(0, 8).map((skill) => (
                                    <div key={skill.id} className="chart-bar-container">
                                        <div className="chart-label">{skill.name}</div>
                                        <div className="chart-bar-wrapper">
                                            <div className="chart-bar" style={{ width: `${skill.level}%` }}>
                                                <span className="chart-value">{skill.level}%</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}


                    {/* Education */}
                    {education.length > 0 && (
                        <section className="infographic-section">
                            <h2>🎓 Education</h2>
                            <div className="edu-timeline">
                                {education.map((edu, index) => (
                                    <div key={edu.id} className="edu-node">
                                        <div className="edu-dot" />
                                        {index < education.length - 1 && <div className="edu-line" />}
                                        <div className="edu-content">
                                            <span className="edu-year">{formatDate(edu.endDate)}</span>
                                            <h4>{edu.institution}</h4>
                                            <p>{edu.degree}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* QR Code */}
                    {(personalInfo.linkedin || personalInfo.portfolio) && (
                        <div className="infographic-qr">
                            <QRCodeSVG
                                value={personalInfo.linkedin || personalInfo.portfolio || ''}
                                size={80}
                                bgColor="transparent"
                                fgColor="currentColor"
                            />
                            <span>Connect with me</span>
                        </div>
                    )}
                </div>

                {/* Right Column */}
                <div className="infographic-right">
                    {/* Experience Timeline */}
                    {experience.length > 0 && (
                        <section className="infographic-section">
                            <h2>💼 Experience</h2>
                            <div className="exp-timeline">
                                {experience.map((exp, index) => (
                                    <div key={exp.id} className="exp-card">
                                        <div className="exp-period">
                                            <span className="exp-start">{formatDate(exp.startDate)}</span>
                                            <div className="exp-arrow">→</div>
                                            <span className="exp-end">{exp.current ? 'Present' : formatDate(exp.endDate)}</span>
                                        </div>
                                        <div className="exp-details">
                                            <h4>{exp.title}</h4>
                                            <p className="exp-company">{exp.company}</p>
                                            {exp.description && (
                                                <p className="exp-desc">{exp.description}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects as Cards */}
                    {projects.length > 0 && (
                        <section className="infographic-section">
                            <h2>🚀 Projects</h2>
                            <div className="project-cards">
                                {projects.map((project) => (
                                    <div key={project.id} className="infographic-project-card">
                                        <h4>{project.name}</h4>
                                        {project.technologies && (
                                            <div className="project-techs">
                                                {project.technologies.split(',').slice(0, 3).map((tech, i) => (
                                                    <span key={i} className="tech-pill">{tech.trim()}</span>
                                                ))}
                                            </div>
                                        )}
                                        {project.description && (
                                            <p className="project-desc">{project.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}
