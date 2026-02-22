import { Mail, Phone, MapPin, Linkedin, GraduationCap, Stethoscope, Award, BookOpen, Microscope, Users } from 'lucide-react';
import '../templates/Templates.css';

const S = ({ emoji, title }) => (
    <div className="med-section-bar">
        <span className="med-section-icon">{emoji}</span>
        <span>{title}</span>
    </div>
);

export default function MedicalTemplate({ data, accentColor = '#0f766e' }) {
    const { personalInfo: p, education, experience, skills, projects, certifications, references } = data;
    const tech = skills?.technical || [];

    return (
        <div className="cv-template medical-cv" style={{ '--accent': accentColor }}>

            {/* ── Header ── */}
            <header className="med-header" style={{ borderTopColor: accentColor }}>
                <div>
                    <h1 className="med-name">{p.fullName || 'Your Name'}</h1>
                </div>
                <div className="med-contact">
                    {p.email && <div><Mail size={13} /> {p.email}</div>}
                    {p.phone && <div><Phone size={13} /> {p.phone}</div>}
                    {p.location && <div><MapPin size={13} /> {p.location}</div>}
                    {p.linkedin && <div><Linkedin size={13} /> LinkedIn</div>}
                </div>
            </header>

            {/* ── Profile ── */}
            {p.summary && (
                <div className="med-block">
                    <S emoji="👤" title="Professional Profile" />
                    <p className="med-profile">{p.summary}</p>
                </div>
            )}

            {/* ── Education (first in Medical CVs) ── */}
            {education?.length > 0 && (
                <div className="med-block">
                    <S emoji="🎓" title="Education" />
                    {education.map((edu, i) => (
                        <div key={i} className="med-entry">
                            <div className="med-entry-row">
                                <div>
                                    <div className="med-entry-title">
                                        {edu.institution}
                                    </div>
                                    <div className="med-entry-sub">
                                        <GraduationCap size={12} /> {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                                    </div>
                                </div>
                                {edu.endDate && <div className="med-date">{edu.endDate}</div>}
                            </div>

                        </div>
                    ))}
                </div>
            )}

            {/* ── Clinical / Work Experience ── */}
            {experience?.length > 0 && (
                <div className="med-block">
                    <S emoji="🏥" title="Clinical Experience" />
                    {experience.map((exp, i) => (
                        <div key={i} className="med-entry">
                            <div className="med-entry-row">
                                <div>
                                    <div className="med-entry-title">{exp.title}</div>
                                    <div className="med-entry-sub">
                                        {exp.company}{exp.location ? ` · ${exp.location}` : ''}
                                    </div>
                                </div>
                                <div className="med-date">
                                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                                </div>
                            </div>
                            {exp.description && <p className="med-desc">{exp.description}</p>}
                            {exp.achievements?.length > 0 && (
                                <ul className="med-bullets">
                                    {exp.achievements.map((a, j) => <li key={j}>{a}</li>)}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* ── Clinical Skills (Moved up) ── */}
            {((skills?.technical?.length > 0) || (skills?.soft?.length > 0) || (Array.isArray(skills) && skills.length > 0)) && (
                <div className="med-block">
                    <S emoji="⚕️" title="Clinical Skills & Expertise" />
                    <div className="med-skills-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        {skills?.technical?.length > 0 && (
                            <div>
                                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: accentColor, textTransform: 'uppercase', marginBottom: '0.4rem' }}>Clinical & Technical</div>
                                <div className="med-skills">
                                    {skills.technical.map((s, i) => (
                                        <span key={i} className="med-chip" style={{ borderColor: accentColor, color: accentColor }}>{s.name}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                        {skills?.soft?.length > 0 && (
                            <div>
                                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: accentColor, textTransform: 'uppercase', marginBottom: '0.4rem' }}>Core Competencies</div>
                                <div className="med-skills">
                                    {skills.soft.map((s, i) => (
                                        <span key={i} className="med-chip" style={{ background: '#f3f4f6', borderColor: '#e5e7eb', color: '#4b5563' }}>{s.name}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                        {Array.isArray(skills) && !skills.technical && (
                            <div className="med-skills">
                                {skills.map((s, i) => (
                                    <span key={i} className="med-chip" style={{ borderColor: accentColor, color: accentColor }}>{s.name}</span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}


            {/* ── Certifications (Medical Licences) ── */}
            {certifications?.length > 0 && (
                <div className="med-block">
                    <S emoji="📋" title="Certifications & Licences" />
                    {certifications.map((c, i) => (
                        <div key={i} className="med-cert">
                            <Award size={13} style={{ color: accentColor, flexShrink: 0 }} />
                            <div>
                                <div className="med-cert-name">{c.name}</div>
                                {c.issuer && <div className="med-cert-issuer">{c.issuer}{c.date ? ` · ${c.date}` : ''}</div>}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ── Research / Projects ── */}
            {projects?.length > 0 && (
                <div className="med-block">
                    <S emoji="🔬" title="Research & Publications" />
                    {projects.map((proj, i) => (
                        <div key={i} className="med-entry">
                            <div className="med-entry-title">
                                <Microscope size={13} /> {proj.name}
                            </div>
                            {proj.technologies && (
                                <div className="med-entry-sub">{proj.technologies}</div>
                            )}
                            {proj.description && <p className="med-desc">{proj.description}</p>}
                        </div>
                    ))}
                </div>
            )}



        </div>
    );
}
