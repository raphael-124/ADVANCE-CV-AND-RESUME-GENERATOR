import { Mail, Phone, MapPin, Linkedin, Globe, GraduationCap, Zap, FolderGit2, Heart } from 'lucide-react';
import '../templates/Templates.css';

const S = ({ title, accent }) => (
    <div className="stud-section-title" style={{ color: accent }}>
        <span>{title}</span>
        <div className="stud-line" style={{ background: accent }} />
    </div>
);

export default function StudentCVTemplate({ data, accentColor = '#7c3aed' }) {
    const { personalInfo: p, education, experience, skills, projects, volunteer, references } = data;
    const tech = skills?.technical || [];
    const soft = skills?.soft || [];


    return (
        <div className="cv-template student-cv" style={{ '--accent': accentColor }}>

            {/* ── Header ── */}
            <header className="stud-header" style={{ background: accentColor }}>
                <h1 className="stud-name">{p.fullName || 'Your Name'}</h1>
                <div className="stud-contact">
                    {p.email && <span><Mail size={12} /> {p.email}</span>}
                    {p.phone && <span><Phone size={12} /> {p.phone}</span>}
                    {p.location && <span><MapPin size={12} /> {p.location}</span>}
                    {p.linkedin && <span><Linkedin size={12} /> LinkedIn</span>}
                    {p.website && <span><Globe size={12} /> {p.website}</span>}
                </div>
            </header>

            <div className="stud-body">

                {/* ── Objective ── */}
                {p.summary && (
                    <section>
                        <S title="Objective" accent={accentColor} />
                        <p className="stud-objective">{p.summary}</p>
                    </section>
                )}

                {/* ── Education (first) ── */}
                {education?.length > 0 && (
                    <section>
                        <S title="Education" accent={accentColor} />
                        {education.map((edu, i) => (
                            <div key={i} className="stud-entry">
                                <div className="stud-entry-row">
                                    <div>
                                        <div className="stud-entry-title">
                                            {edu.institution}
                                        </div>
                                        <div className="stud-entry-sub">
                                            <GraduationCap size={12} /> {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                                        </div>
                                    </div>
                                    {edu.endDate && <div className="stud-date">{edu.endDate}</div>}
                                </div>

                            </div>
                        ))}
                    </section>
                )}

                {/* ── Skills (tech + soft) ── */}
                {((skills?.technical?.length > 0) || (skills?.soft?.length > 0) || (Array.isArray(skills) && skills.length > 0)) && (
                    <section>
                        <S title="Skills & Competencies" accent={accentColor} />
                        <div className="stud-skills-container" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            {(skills?.technical?.length > 0) && (
                                <div className="stud-skills-group">
                                    <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>Technical / Tools</div>
                                    <div className="stud-skills">
                                        {skills.technical.map((s, i) => (
                                            <span key={i} className="stud-chip tech" style={{ borderColor: accentColor, color: accentColor }}>
                                                <Zap size={11} /> {s.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {(skills?.soft?.length > 0) && (
                                <div className="stud-skills-group">
                                    <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>Interpersonal & Soft</div>
                                    <div className="stud-skills">
                                        {skills.soft.map((s, i) => (
                                            <span key={i} className="stud-chip soft" style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', color: '#4b5563' }}>{s.name}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {Array.isArray(skills) && !skills.technical && (
                                <div className="stud-skills">
                                    {skills.map((s, i) => (
                                        <span key={i} className="stud-chip tech" style={{ borderColor: accentColor, color: accentColor }}>
                                            <Zap size={11} /> {s.name}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                )}


                {/* ── Projects ── */}
                {projects?.length > 0 && (
                    <section>
                        <S title="Projects" accent={accentColor} />
                        {projects.map((proj, i) => (
                            <div key={i} className="stud-entry">
                                <div className="stud-entry-title">
                                    <FolderGit2 size={13} /> {proj.name}
                                    {proj.technologies && (
                                        <span className="stud-tech"> [{proj.technologies}]</span>
                                    )}
                                </div>
                                {proj.description && <p className="stud-entry-desc">{proj.description}</p>}
                            </div>
                        ))}
                    </section>
                )}

                {/* ── Internships / Experience ── */}
                {experience?.length > 0 && (
                    <section>
                        <S title="Work Experience / Internships" accent={accentColor} />
                        {experience.map((exp, i) => (
                            <div key={i} className="stud-entry">
                                <div className="stud-entry-row">
                                    <div>
                                        <div className="stud-entry-title">{exp.title}</div>
                                        <div className="stud-entry-sub">{exp.company}{exp.location ? ` · ${exp.location}` : ''}</div>
                                    </div>
                                    <div className="stud-date">
                                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                                    </div>
                                </div>
                                {exp.description && <p className="stud-entry-desc">{exp.description}</p>}
                            </div>
                        ))}
                    </section>
                )}

                {/* ── Volunteer ── */}
                {volunteer?.length > 0 && (
                    <section>
                        <S title="Volunteer Experience" accent={accentColor} />
                        {volunteer.map((v, i) => (
                            <div key={i} className="stud-entry">
                                <div className="stud-entry-row">
                                    <div>
                                        <div className="stud-entry-title"><Heart size={12} /> {v.role}</div>
                                        <div className="stud-entry-sub">{v.organization}</div>
                                    </div>
                                    {v.date && <div className="stud-date">{v.date}</div>}
                                </div>
                                {v.description && <p className="stud-entry-desc">{v.description}</p>}
                            </div>
                        ))}
                    </section>
                )}

                {/* ── References ── */}
                {(references?.length > 0 || p.referencesOnRequest) && (
                    <section>
                        <S title="References" accent={accentColor} />
                        {references?.length > 0 ? (
                            <div className="stud-body">
                                {references.map((ref, i) => (
                                    <div key={i} className="stud-entry">
                                        <div className="stud-entry-title">{ref.name}</div>
                                        <div className="stud-entry-sub">
                                            {ref.title}{ref.company ? `, ${ref.company}` : ''}
                                        </div>
                                        <div className="stud-entry-desc">
                                            {ref.phone} {ref.email && `• ${ref.email}`}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="stud-entry-desc" style={{ marginTop: '0.5rem' }}>References available upon request.</p>
                        )}
                    </section>
                )}

            </div>
        </div>
    );
}
