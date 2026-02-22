import { Mail, Phone, MapPin, Linkedin, Globe, Users, GraduationCap, Briefcase, Languages } from 'lucide-react';
import '../templates/Templates.css';

/* Europass uses a rigid fixed format with labelled rows */
const Row = ({ label, value }) =>
    value ? (
        <div className="ep-row">
            <div className="ep-label">{label}</div>
            <div className="ep-value">{value}</div>
        </div>
    ) : null;

const SectionBar = ({ title }) => (
    <div className="ep-section-bar">
        <div className="ep-section-icon" />
        <span>{title}</span>
    </div>
);

export default function EuropassTemplate({ data, accentColor = '#003399' }) {
    const { personalInfo: p, education, experience, skills, projects, certifications, languages, settings, references } = data;
    const tech = skills?.technical || [];
    const soft = skills?.soft || [];

    return (
        <div className="cv-template europass-cv" style={{ '--accent': accentColor }}>

            {/* ── EU header stripe ── */}
            <div className="ep-banner">
                <div className="ep-banner-left">
                    <div className="ep-flag">🇪🇺</div>
                    <div>
                        <div className="ep-label-sm">Europass</div>
                        <div className="ep-label-sm">Curriculum Vitae</div>
                    </div>
                </div>
                <div className="ep-banner-photo" />
            </div>

            {/* ── Personal Info (fixed Europass table) ── */}
            <div className="ep-block">
                <SectionBar title="Personal information" />
                <div className="ep-table">
                    <Row label="Name" value={p.fullName} />
                    <Row label="Email" value={p.email} />
                    <Row label="Phone" value={p.phone} />
                    <Row label="Address" value={p.location} />
                    <Row label="LinkedIn" value={p.linkedin} />
                    <Row label="Website" value={p.website} />
                </div>
            </div>

            {/* ── Work Experience ── */}
            {experience?.length > 0 && (
                <div className="ep-block">
                    <SectionBar title="Work experience" />
                    {experience.map((exp, i) => (
                        <div key={i} className="ep-entry">
                            <div className="ep-entry-dates">
                                {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                            </div>
                            <div className="ep-entry-body">
                                <div className="ep-entry-title">{exp.title}</div>
                                <div className="ep-entry-sub">
                                    <Briefcase size={12} /> {exp.company}{exp.location ? ` · ${exp.location} ` : ''}
                                </div>
                                {exp.description && <p className="ep-entry-desc">{exp.description}</p>}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ── Skills ── */}
            {((skills?.technical?.length > 0) || (skills?.soft?.length > 0)) && (
                <div className="ep-block">
                    <SectionBar title="Skills" />
                    {skills?.technical?.length > 0 && (
                        <div className="ep-additional-row">
                            <span className="ep-label">Digital skills</span>
                            <div className="ep-skill-tags" style={{ padding: '0.4rem 0' }}>
                                {skills.technical.map((s, i) => <span key={i} className="ep-chip">{s.name}</span>)}
                            </div>
                        </div>
                    )}
                    {skills?.soft?.length > 0 && (
                        <div className="ep-additional-row">
                            <span className="ep-label">Competences</span>
                            <div style={{ padding: '0.4rem 0', color: '#4b5563', fontSize: '0.8rem' }}>
                                {skills.soft.map(s => s.name).join(' · ')}
                            </div>
                        </div>
                    )}
                </div>
            )}


            {/* ── Education ── */}
            {education?.length > 0 && (
                <div className="ep-block">
                    <SectionBar title="Education and training" />
                    {education.map((edu, i) => (
                        <div key={i} className="ep-entry">
                            <div className="ep-entry-dates">{edu.startDate} – {edu.endDate || 'Present'}</div>
                            <div className="ep-entry-body">
                                <div className="ep-entry-title">
                                    {edu.institution}
                                </div>
                                <div className="ep-entry-sub">
                                    <GraduationCap size={12} /> {edu.degree}{edu.field ? ` in ${edu.field} ` : ''}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ── Language skills ── */}
            {languages?.length > 0 && (
                <div className="ep-block">
                    <SectionBar title="Language skills" />
                    <div className="ep-lang-grid">
                        <div className="ep-lang-head">
                            <span>Language</span><span>Understanding</span><span>Speaking</span><span>Writing</span>
                        </div>
                        {languages.map((l, i) => (
                            <div key={i} className="ep-lang-row">
                                <span className="ep-lang-name">{l.language || l.name}</span>
                                <span>{l.listening || l.level || '—'}</span>
                                <span>{l.speaking || l.level || '—'}</span>
                                <span>{l.writing || l.level || '—'}</span>
                            </div>
                        ))}
                    </div>
                    <p className="ep-cefr-note">Levels: A1/A2 = Basic · B1/B2 = Independent · C1/C2 = Proficient (CEFR)</p>
                </div>
            )}



            {/* ── Additional information (certifications) ── */}
            {certifications?.length > 0 && (
                <div className="ep-block">
                    <SectionBar title="Additional information" />
                    {certifications?.map((c, i) => (
                        <div key={i} className="ep-additional-row">
                            <span className="ep-label">{c.date || 'Certificate'}</span>
                            <span>{c.name}{c.issuer ? ` — ${c.issuer}` : ''}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* ── References ── */}
            {(references?.length > 0 || personalInfo.referencesOnRequest) && (
                <div className="ep-block">
                    <SectionBar title="References" />
                    {references?.length > 0 ? (
                        <div className="ep-table">
                            {references.map((ref, i) => (
                                <div key={i} className="ep-entry">
                                    <div className="ep-entry-dates" style={{ fontSize: '0.7rem' }}></div>
                                    <div className="ep-entry-body">
                                        <div className="ep-entry-title">{ref.name}</div>
                                        <div className="ep-entry-sub">
                                            {ref.title}{ref.company ? `, ${ref.company}` : ''}
                                        </div>
                                        <div className="ep-entry-desc">
                                            {ref.phone} • {ref.email}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="ep-value">References available upon request.</p>
                    )}
                </div>
            )}

        </div>
    );
}
