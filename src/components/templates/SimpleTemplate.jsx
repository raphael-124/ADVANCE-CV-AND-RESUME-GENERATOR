import { Mail, Phone, MapPin, Linkedin, Globe, Calendar } from 'lucide-react';
import './Templates.css';

export default function SimpleTemplate({ data, accentColor }) {
    const { personalInfo, education, experience, skills, projects } = data;

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return (
        <div className="cv-template simple" style={{ '--accent': accentColor }}>
            {/* Header */}
            <header className="simple-header">
                <h1>{personalInfo.fullName || 'Your Name'}</h1>
                <div className="simple-contact">
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>| {personalInfo.phone}</span>}
                    {personalInfo.location && <span>| {personalInfo.location}</span>}
                </div>
                <div className="simple-links">
                    {personalInfo.linkedin && <span>LinkedIn: {personalInfo.linkedin}</span>}
                    {personalInfo.portfolio && <span>| Portfolio: {personalInfo.portfolio}</span>}
                </div>
            </header>

            {/* Summary */}
            {personalInfo.summary && (
                <section className="simple-section">
                    <h2>SUMMARY</h2>
                    <p>{personalInfo.summary}</p>
                </section>
            )}

            {/* Skills */}
            {((skills?.technical?.length > 0) || (skills?.soft?.length > 0) || (Array.isArray(skills) && skills.length > 0)) && (
                <section className="simple-section">
                    <h2>SKILLS</h2>
                    {(skills?.technical?.length > 0) && (
                        <div style={{ marginBottom: '0.4rem' }}>
                            <strong style={{ fontSize: '0.7rem', color: '#64748b' }}>TECHNICAL: </strong>
                            <span>{skills.technical.map(s => s.name).join(' • ')}</span>
                        </div>
                    )}
                    {(skills?.soft?.length > 0) && (
                        <div>
                            <strong style={{ fontSize: '0.7rem', color: '#64748b' }}>SOFT SKILLS: </strong>
                            <span>{skills.soft.map(s => s.name).join(' • ')}</span>
                        </div>
                    )}
                    {Array.isArray(skills) && !skills.technical && (
                        <p>{skills.map(s => s.name).join(' • ')}</p>
                    )}
                </section>
            )}


            {/* Experience */}
            {experience.length > 0 && (
                <section className="simple-section">
                    <h2>EXPERIENCE</h2>
                    {experience.map((exp) => (
                        <div key={exp.id} className="simple-entry">
                            <div className="simple-entry-line">
                                <strong>{exp.title}</strong>
                                <span>{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</span>
                            </div>
                            <div className="simple-entry-sub">
                                {exp.company}{exp.location && `, ${exp.location}`}
                            </div>
                            {exp.description && <p>{exp.description}</p>}
                        </div>
                    ))}
                </section>
            )}

            {/* Education */}
            {education.length > 0 && (
                <section className="simple-section">
                    <h2>EDUCATION</h2>
                    {education.map((edu) => (
                        <div key={edu.id} className="simple-entry">
                            <div className="simple-entry-line">
                                <strong>{edu.institution}</strong>
                                <span>{formatDate(edu.endDate)}</span>
                            </div>
                            <div className="simple-entry-sub">
                                {edu.degree}{edu.field && ` in ${edu.field}`}
                            </div>
                        </div>
                    ))}
                </section>
            )}



            {/* Projects */}
            {projects.length > 0 && (
                <section className="simple-section">
                    <h2>PROJECTS</h2>
                    {projects.map((project) => (
                        <div key={project.id} className="simple-entry">
                            <div className="simple-entry-line">
                                <strong>{project.name}</strong>
                                {project.technologies && <span>{project.technologies}</span>}
                            </div>
                            {project.description && <p>{project.description}</p>}
                        </div>
                    ))}
                </section>
            )}
        </div>
    );
}
