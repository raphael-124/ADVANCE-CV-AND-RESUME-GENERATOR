import { Mail, Phone, MapPin, Globe, Linkedin, Briefcase, GraduationCap, Star, Award } from 'lucide-react';
import '../templates/Templates.css';

const Divider = ({ title, accent }) => (
    <div className="prof-section-title" style={{ borderColor: accent }}>
        <span>{title}</span>
    </div>
);

export default function ProfessionalTemplate({ data, accentColor = '#1e40af' }) {
    const { personalInfo } = data;
    const p = personalInfo;
    const { education, experience, skills, projects, certifications, references } = data;
    const tech = skills?.technical || [];
    const soft = skills?.soft || [];
    const allSkills = [...tech, ...soft];

    return (
        <div className="cv-template professional-cv" style={{ '--accent': accentColor }}>

            {/* ── Header ── */}
            <header className="prof-header" style={{ borderBottomColor: accentColor }}>
                <div>
                    <h1 className="prof-name">{p.fullName || 'Your Name'}</h1>
                </div>
                <div className="prof-contact">
                    {p.email && <span><Mail size={13} /> {p.email}</span>}
                    {p.phone && <span><Phone size={13} /> {p.phone}</span>}
                    {p.location && <span><MapPin size={13} /> {p.location}</span>}
                    {p.linkedin && <span><Linkedin size={13} /> LinkedIn</span>}
                    {p.portfolio && <span><Globe size={13} /> {p.portfolio}</span>}
                </div>
            </header>

            <div className="prof-body">

                {/* ── Profile / Summary ── */}
                {p.summary && (
                    <section>
                        <Divider title="Profile" accent={accentColor} />
                        <p className="prof-summary">{p.summary}</p>
                    </section>
                )}

                {/* ── Work Experience ── */}
                {experience?.length > 0 && (
                    <section>
                        <Divider title="Work Experience" accent={accentColor} />
                        {experience.map((exp, i) => (
                            <div key={i} className="prof-entry">
                                <div className="prof-entry-head">
                                    <div>
                                        <div className="prof-entry-title">{exp.title}</div>
                                        <div className="prof-entry-sub">
                                            <Briefcase size={12} /> {exp.company}{exp.location ? ` · ${exp.location}` : ''}
                                        </div>
                                    </div>
                                    <div className="prof-entry-date">
                                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                                    </div>
                                </div>
                                {exp.description && <p className="prof-entry-desc">{exp.description}</p>}
                                {exp.achievements?.length > 0 && (
                                    <ul className="prof-bullets">
                                        {exp.achievements.map((a, j) => <li key={j}>{a}</li>)}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </section>
                )}

                {/* ── Skills ── */}
                {allSkills.length > 0 && (
                    <section>
                        <Divider title="Skills" accent={accentColor} />
                        <div className="prof-skills">
                            {tech.length > 0 && (
                                <div>
                                    <div className="prof-skills-label">Technical</div>
                                    <div className="prof-skill-tags">
                                        {tech.map((s, i) => <span key={i} className="prof-chip tech">{s.name}</span>)}
                                    </div>
                                </div>
                            )}
                            {soft.length > 0 && (
                                <div>
                                    <div className="prof-skills-label">Soft Skills</div>
                                    <div className="prof-skill-tags">
                                        {soft.map((s, i) => <span key={i} className="prof-chip soft">{s.name}</span>)}
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {/* ── Education ── */}
                {education?.length > 0 && (
                    <section>
                        <Divider title="Education" accent={accentColor} />
                        {education.map((edu, i) => (
                            <div key={i} className="prof-entry">
                                <div className="prof-entry-head">
                                    <div>
                                        <div className="prof-entry-title">
                                            {edu.school}
                                        </div>
                                        <div className="prof-entry-sub">
                                            <GraduationCap size={12} /> {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                                        </div>
                                    </div>
                                    {edu.endDate && <div className="prof-entry-date">{edu.endDate}</div>}
                                </div>

                            </div>
                        ))}
                    </section>
                )}

                {/* ── Certifications ── */}
                {certifications?.length > 0 && (
                    <section>
                        <Divider title="Certifications" accent={accentColor} />
                        <div className="prof-cert-list">
                            {certifications.map((c, i) => (
                                <div key={i} className="prof-cert-item">
                                    <Award size={13} style={{ color: accentColor }} />
                                    <span><strong>{c.name}</strong>{c.issuer ? ` — ${c.issuer}` : ''}{c.date ? ` (${c.date})` : ''}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* ── Projects ── */}
                {projects?.length > 0 && (
                    <section>
                        <Divider title="Projects" accent={accentColor} />
                        {projects.map((proj, i) => (
                            <div key={i} className="prof-entry">
                                <div className="prof-entry-title">{proj.name}</div>
                                {proj.technologies && (
                                    <div className="prof-entry-sub">
                                        <Star size={12} /> {proj.technologies}
                                    </div>
                                )}
                                {proj.description && <p className="prof-entry-desc">{proj.description}</p>}
                            </div>
                        ))}
                    </section>
                )}

                {/* ── References ── */}
                {(references?.length > 0 || personalInfo.referencesOnRequest) && (
                    <section>
                        <Divider title="References" accent={accentColor} />
                        {references?.length > 0 ? (
                            <div className="prof-cert-list">
                                {references.map((ref, i) => (
                                    <div key={i} className="prof-entry">
                                        <div className="prof-entry-title">{ref.name}</div>
                                        <div className="prof-entry-sub">
                                            {ref.title}{ref.company ? `, ${ref.company}` : ''}
                                        </div>
                                        <div className="prof-entry-desc" style={{ fontSize: '0.72rem' }}>
                                            {ref.phone} {ref.email && `• ${ref.email}`}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="prof-summary" style={{ marginTop: '0.5rem' }}>References available upon request.</p>
                        )}
                    </section>
                )}

            </div>
        </div>
    );
}
