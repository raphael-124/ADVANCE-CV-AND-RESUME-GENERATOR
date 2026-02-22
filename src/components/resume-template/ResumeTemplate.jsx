import './ResumeTemplate.css';

/* ─── Shared helpers ──────────────────────── */
const fmtDate = (d) => {
    if (!d) return '';
    const [y, m] = d.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(m, 10) - 1] || ''} ${y}`;
};
const datePair = (item) => {
    if (!item.startDate && !item.endDate && !item.year) return '';
    if (item.year && !item.startDate) return item.year;
    const start = fmtDate(item.startDate) || '...';
    const end = item.current ? 'Present' : (fmtDate(item.endDate) || 'Present');
    return `${start} – ${end}`;
};


/* ── 1. CHRONOLOGICAL ────────────────────── */
function Chronological({ data }) {
    const { personalInfo: p, summary, skills, experience, education, projects } = data;
    const tech = skills.filter(s => s.category !== 'soft');
    const soft = skills.filter(s => s.category === 'soft');
    const S = ({ title }) => <div className="rt-section-title">{title}</div>;
    return (
        <div className="rt-wrap rt-chrono">
            <header className="rt-header">
                <h1 className="rt-name">{p.fullName || 'Your Name'}</h1>
                <div className="rt-contact">
                    {p.phone && <span>{p.phone}</span>}
                    {p.email && <span>{p.email}</span>}
                    {p.city && <span>{p.city}</span>}
                    {p.linkedin && <span>{p.linkedin}</span>}
                    {p.portfolio && <span>{p.portfolio}</span>}
                </div>
            </header>

            {summary && <p className="rt-summary-intro">{summary}</p>}

            {experience.length > 0 && (
                <><S title="Work Experience" />
                    {experience.map(exp => (
                        <div key={exp.id} className="rt-entry">
                            <div className="rt-entry-head">
                                <div><div className="rt-entry-title">{exp.title}</div><div className="rt-entry-sub">{[exp.company, exp.location].filter(Boolean).join(' · ')}</div></div>
                                <div className="rt-entry-date">{datePair(exp)}</div>
                            </div>
                            {exp.bullets.length > 0 && <ul className="rt-bullets">{exp.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>}
                        </div>
                    ))}</>
            )}

            {skills.length > 0 && (
                <><S title="Skills" />
                    {tech.length > 0 && <>
                        <div className="rt-skill-cat-label">Technical</div>
                        <div className="rt-skill-tags" style={{ marginBottom: '0.4rem' }}>
                            {tech.map(s => <span key={s.id} className="rt-chip tech">{s.name}</span>)}
                        </div>
                    </>}
                    {soft.length > 0 && <>
                        <div className="rt-skill-cat-label">Soft Skills</div>
                        <div className="rt-skill-tags">
                            {soft.map(s => <span key={s.id} className="rt-chip soft">{s.name}</span>)}
                        </div>
                    </>}
                </>
            )}



            {education.length > 0 && (
                <><S title="Education" />
                    {education.map(edu => (
                        <div key={edu.id} className="rt-entry">
                            <div className="rt-entry-head">
                                <div>
                                    <div className="rt-entry-title">{edu.school}</div>
                                    <div className="rt-entry-sub">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</div>
                                </div>
                                <div className="rt-entry-date">{datePair(edu)}</div>
                            </div>

                        </div>
                    ))}</>
            )}

            {projects.length > 0 && (
                <><S title="Projects" />
                    {projects.map(proj => (
                        <div key={proj.id} className="rt-entry">
                            <div className="rt-entry-title">{proj.title}{proj.tools && <span className="rt-entry-sub"> — {proj.tools}</span>}</div>
                            {proj.description && <p style={{ fontSize: '0.76rem', color: '#374151', margin: '0.2rem 0 0', lineHeight: 1.5 }}>{proj.description}</p>}
                        </div>
                    ))}</>
            )}

            {!summary && skills.length === 0 && experience.length === 0 && education.length === 0 && <div className="rt-placeholder"><p>Fill in your details →</p></div>}
        </div>
    );
}

/* ── 2. FUNCTIONAL ───────────────────────── */
function Functional({ data }) {
    const { personalInfo: p, summary, skills, experience, education, projects } = data;
    const tech = skills.filter(s => s.category !== 'soft');
    const soft = skills.filter(s => s.category === 'soft');
    const S = ({ title }) => <div className="rt-section-title">{title}</div>;
    return (
        <div className="rt-wrap rt-functional">
            <header className="rt-header">
                <div className="rt-name">{p.fullName || 'Your Name'}</div>
                <div className="rt-contact">
                    {p.phone && <span>{p.phone}</span>}
                    {p.email && <span>{p.email}</span>}
                    {p.city && <span>{p.city}</span>}
                    {p.linkedin && <span>{p.linkedin}</span>}
                    {p.portfolio && <span>{p.portfolio}</span>}
                </div>
            </header>

            {summary && <p className="rt-summary-intro rt-functional-intro">{summary}</p>}

            {education.length > 0 && (
                <><S title="Education" />
                    {education.map(edu => (
                        <div key={edu.id} className="rt-entry">
                            <div className="rt-entry-title">{edu.school}</div>
                            <div className="rt-entry-sub">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}{datePair(edu) ? ` · ${datePair(edu)}` : ''}</div>

                        </div>
                    ))}</>
            )}

            {skills.length > 0 && (
                <><S title="Skills" />
                    {tech.length > 0 && <><div className="rt-skill-cat-title">Technical</div><div className="rt-skill-tags">{tech.map(s => <span key={s.id} className="rt-chip tech">{s.name}</span>)}</div></>}
                    {soft.length > 0 && <><div className="rt-skill-cat-title">Soft Skills</div><div className="rt-skill-tags">{soft.map(s => <span key={s.id} className="rt-chip soft">{s.name}</span>)}</div></>}
                </>
            )}


            {experience.length > 0 && (
                <><S title="Work Experience" />
                    {experience.map(exp => (
                        <div key={exp.id} className="rt-entry">
                            <div className="rt-entry-title">{exp.title} — <span className="rt-entry-sub">{exp.company}</span></div>
                            {exp.bullets.length > 0 && <ul className="rt-bullets">{exp.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>}
                        </div>
                    ))}</>
            )}

            {!summary && skills.length === 0 && <div className="rt-placeholder"><p>Fill in your details →</p></div>}
        </div>
    );
}

/* ── 3. COMBINATION ──────────────────────── */
function Combination({ data }) {
    const { personalInfo: p, summary, skills, experience, education, projects } = data;
    const S = ({ title }) => <div className="rt-section-title">{title}</div>;
    return (
        <div className="rt-wrap rt-combo">
            <header className="rt-header">
                <h1 className="rt-name">{p.fullName || 'Your Name'}</h1>
                <div className="rt-contact">
                    {p.phone && <div>{p.phone}</div>}
                    {p.email && <div>{p.email}</div>}
                    {p.city && <div>{p.city}</div>}
                    {p.linkedin && <div>{p.linkedin}</div>}
                    {p.portfolio && <div>{p.portfolio}</div>}
                </div>
            </header>

            {summary && <p className="rt-summary-intro">{summary}</p>}

            {skills.length > 0 && (
                <><S title="Core Skills" />
                    {(() => {
                        const tech = skills.filter(s => s.category !== 'soft');
                        const soft = skills.filter(s => s.category === 'soft');
                        return <>
                            {tech.length > 0 && <>
                                <div className="rt-skill-cat-label">Technical</div>
                                <div className="rt-skill-tags" style={{ marginBottom: '0.4rem' }}>
                                    {tech.map(s => <span key={s.id} className="rt-chip tech">{s.name}</span>)}
                                </div>
                            </>}
                            {soft.length > 0 && <>
                                <div className="rt-skill-cat-label">Soft Skills</div>
                                <div className="rt-skill-tags">
                                    {soft.map(s => <span key={s.id} className="rt-chip soft">{s.name}</span>)}
                                </div>
                            </>}
                        </>;
                    })()}
                </>
            )}

            {experience.length > 0 && (
                <><S title="Work Experience" />
                    {experience.map(exp => (
                        <div key={exp.id} className="rt-entry">
                            <div className="rt-entry-head">
                                <div><div className="rt-entry-title">{exp.title}</div><div className="rt-entry-sub">{[exp.company, exp.location].filter(Boolean).join(' · ')}</div></div>
                                <div className="rt-entry-date">{datePair(exp)}</div>
                            </div>
                            {exp.bullets.length > 0 && <ul className="rt-bullets">{exp.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>}
                        </div>
                    ))}</>
            )}

            {education.length > 0 && (
                <><S title="Education" />
                    {education.map(edu => (
                        <div key={edu.id} className="rt-entry">
                            <div className="rt-entry-head">
                                <div>
                                    <div className="rt-entry-title">{edu.school}</div>
                                    <div className="rt-entry-sub">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</div>
                                </div>
                                <div className="rt-entry-date">{datePair(edu)}</div>
                            </div>

                        </div>
                    ))}</>
            )}
            {!summary && skills.length === 0 && <div className="rt-placeholder"><p>Fill in your details →</p></div>}
        </div>
    );
}

/* ── 4. STUDENT ──────────────────────────── */
function Student({ data }) {
    const { personalInfo: p, summary, skills, experience, education, projects } = data;
    const tech = skills.filter(s => s.category !== 'soft');
    const soft = skills.filter(s => s.category === 'soft');
    const S = ({ title }) => <div className="rt-section-title">{title}</div>;
    return (
        <div className="rt-wrap rt-student">
            <header className="rt-header">
                <div className="rt-name">{p.fullName || 'Your Name'}</div>
                <div className="rt-contact">
                    {p.phone && <span>{p.phone}</span>}
                    {p.email && <span>{p.email}</span>}
                    {p.city && <span>{p.city}</span>}
                    {p.linkedin && <span>{p.linkedin}</span>}
                    {p.portfolio && <span>{p.portfolio}</span>}
                </div>
            </header>
            <div className="rt-divider" />

            {summary && <p className="rt-summary-intro rt-student-intro">{summary}</p>}

            {skills.length > 0 && (
                <><S title="Skills" />
                    {tech.length > 0 && <>
                        <div className="rt-skill-cat-label">Technical</div>
                        <div className="rt-skill-tags" style={{ marginBottom: '0.45rem' }}>
                            {tech.map(s => <span key={s.id} className="rt-chip tech">{s.name}</span>)}
                        </div>
                    </>}
                    {soft.length > 0 && <>
                        <div className="rt-skill-cat-label">Soft Skills</div>
                        <div className="rt-skill-tags">
                            {soft.map(s => <span key={s.id} className="rt-chip soft">{s.name}</span>)}
                        </div>
                    </>}
                </>
            )}


            {education.length > 0 && (
                <><S title="Education" />
                    {education.map(edu => (
                        <div key={edu.id} className="rt-entry">
                            <div className="rt-entry-head">
                                <div>
                                    <div className="rt-entry-title">{edu.school}</div>
                                    <div className="rt-entry-sub">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</div>
                                </div>
                                <div className="rt-entry-date">{datePair(edu)}</div>
                            </div>

                        </div>
                    ))}</>
            )}

            {projects.length > 0 && (
                <><S title="Projects" />
                    {projects.map(proj => (
                        <div key={proj.id} className="rt-entry">
                            <div className="rt-entry-title">{proj.title}{proj.tools && <span className="rt-entry-sub"> · {proj.tools}</span>}</div>
                            {proj.description && <p style={{ fontSize: '0.75rem', color: '#374151', margin: '0.15rem 0 0', lineHeight: 1.5 }}>{proj.description}</p>}
                        </div>
                    ))}</>
            )}

            {experience.length > 0 && (
                <><S title="Internships / Volunteer Work" />
                    {experience.map(exp => (
                        <div key={exp.id} className="rt-entry">
                            <div className="rt-entry-head">
                                <div><div className="rt-entry-title">{exp.title}</div><div className="rt-entry-sub">{[exp.company, exp.location].filter(Boolean).join(' · ')}</div></div>
                                <div className="rt-entry-date">{datePair(exp)}</div>
                            </div>
                            {exp.bullets.length > 0 && <ul className="rt-bullets">{exp.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>}
                        </div>
                    ))}</>
            )}
            {!summary && skills.length === 0 && <div className="rt-placeholder"><p>Fill in your details →</p></div>}
        </div>
    );
}

/* ── 5. CREATIVE ─────────────────────────── */
function Creative({ data }) {
    const { personalInfo: p, summary, skills, experience, education, projects } = data;
    const tech = skills.filter(s => s.category !== 'soft');
    const soft = skills.filter(s => s.category === 'soft');
    const S = ({ title }) => <div className="rt-section-title">{title}</div>;
    return (
        <div className="rt-wrap rt-creative">
            {/* Sidebar */}
            <div className="rt-sidebar">
                <div className="rt-name">{p.fullName || 'Your Name'}</div>
                <div className="rt-role">{p.city}</div>

                <div className="rt-sidebar-section-title">Contact</div>
                {p.phone && <div className="rt-contact-item">📞 {p.phone}</div>}
                {p.email && <div className="rt-contact-item">✉️ {p.email}</div>}
                {p.linkedin && <div className="rt-contact-item">🔗 {p.linkedin}</div>}
                {p.portfolio && <div className="rt-contact-item">🌐 {p.portfolio}</div>}

                {tech.length > 0 && <>
                    <div className="rt-sidebar-section-title">Technical Skills</div>
                    <div>{tech.map(s => <span key={s.id} className="rt-chip">{s.name}</span>)}</div>
                </>}

                {soft.length > 0 && <>
                    <div className="rt-sidebar-section-title">Soft Skills</div>
                    <div>{soft.map(s => <span key={s.id} className="rt-chip soft">{s.name}</span>)}</div>
                </>}

                {education.length > 0 && <>
                    <div className="rt-sidebar-section-title">Education</div>
                    {education.map(edu => (
                        <div key={edu.id} style={{ marginBottom: '0.5rem' }}>
                            <div style={{ fontSize: '0.73rem', fontWeight: 700, color: 'white' }}>{edu.school}</div>
                            <div style={{ fontSize: '0.68rem', color: '#c7d2fe' }}>{edu.degree}{edu.field && ` in ${edu.field}`}</div>
                            <div style={{ fontSize: '0.68rem', color: '#a5b4fc' }}>{datePair(edu) ? datePair(edu) : ''}</div>

                        </div>
                    ))}
                </>}
            </div>

            {/* Main */}
            <div className="rt-main">
                {summary && <><S title="About Me" /><p className="rt-summary-text">{summary}</p></>}

                {experience.length > 0 && (
                    <><S title="Experience" />
                        {experience.map(exp => (
                            <div key={exp.id} className="rt-entry">
                                <div className="rt-entry-head">
                                    <div><div className="rt-entry-title">{exp.title}</div><div className="rt-entry-sub">{[exp.company, exp.location].filter(Boolean).join(' · ')}</div></div>
                                    <div className="rt-entry-date">{datePair(exp)}</div>
                                </div>
                                {exp.bullets.length > 0 && <ul className="rt-bullets">{exp.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>}
                            </div>
                        ))}</>
                )}

                {projects.length > 0 && (
                    <><S title="Portfolio / Projects" />
                        {projects.map(proj => (
                            <div key={proj.id} className="rt-entry">
                                <div className="rt-entry-title">{proj.title}</div>
                                {proj.tools && <div className="rt-entry-sub">{proj.tools}</div>}
                                {proj.description && <p style={{ fontSize: '0.75rem', color: '#374151', margin: '0.15rem 0 0', lineHeight: 1.5 }}>{proj.description}</p>}
                            </div>
                        ))}</>
                )}
                {!summary && skills.length === 0 && <div className="rt-placeholder"><p>Fill in your details →</p></div>}
            </div>
        </div>
    );
}

/* ── 6. TECHNICAL ────────────────────────── */
function Technical({ data }) {
    const { personalInfo: p, summary, skills, experience, education, projects } = data;
    const tech = skills.filter(s => s.category !== 'soft');
    const soft = skills.filter(s => s.category === 'soft');
    const S = ({ title }) => <div className="rt-section-title">{title}</div>;
    return (
        <div className="rt-wrap rt-technical">
            <div className="rt-header">
                <div className="rt-name-prefix">{'> '}</div>
                <div className="rt-name">{p.fullName || 'Your_Name'}</div>
                <div className="rt-contact">
                    {p.phone && <span>📞 {p.phone}</span>}
                    {p.email && <span>✉ {p.email}</span>}
                    {p.city && <span>📍 {p.city}</span>}
                    {p.linkedin && <span>🔗 {p.linkedin}</span>}
                    {p.portfolio && <span>🌐 {p.portfolio}</span>}
                </div>
            </div>
            <div className="rt-body">
                {summary && <p className="rt-summary-intro" style={{ color: '#94a3b8', fontFamily: 'monospace', fontSize: '0.76rem' }}>{summary}</p>}

                {tech.length > 0 && (
                    <><S title="// Technical Skills" />
                        <div className="rt-tech-grid">{tech.map(s => <span key={s.id} className="rt-tech-chip">{s.name}</span>)}</div></>
                )}
                {soft.length > 0 && (
                    <><S title="// Soft Skills" />
                        <div className="rt-soft-tags">{soft.map(s => <span key={s.id} className="rt-soft-chip">{s.name}</span>)}</div></>
                )}


                {projects.length > 0 && (
                    <><S title="// Projects" />
                        {projects.map(proj => (
                            <div key={proj.id} className="rt-entry">
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', flexWrap: 'wrap' }}>
                                    <span className="rt-project-title">{proj.title}</span>
                                    {proj.tools && <span className="rt-project-tools">[{proj.tools}]</span>}
                                </div>
                                {proj.description && <p className="rt-project-desc">{proj.description}</p>}
                            </div>
                        ))}</>
                )}

                {experience.length > 0 && (
                    <><S title="// Experience" />
                        {experience.map(exp => (
                            <div key={exp.id} className="rt-entry">
                                <div className="rt-entry-head">
                                    <div><div className="rt-entry-title">{exp.title}</div><div className="rt-entry-sub">{[exp.company, exp.location].filter(Boolean).join(' · ')}</div></div>
                                    <div className="rt-entry-date">{datePair(exp)}</div>
                                </div>
                                {exp.bullets.length > 0 && <ul className="rt-bullets">{exp.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>}
                            </div>
                        ))}</>
                )}

                {education.length > 0 && (
                    <><S title="// Education" />
                        {education.map(edu => (
                            <div key={edu.id} className="rt-entry">
                                <div className="rt-entry-head">
                                    <div>
                                        <div className="rt-entry-title">{edu.school}</div>
                                        <div className="rt-entry-sub">{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</div>
                                    </div>
                                    <div className="rt-entry-date">{datePair(edu)}</div>
                                </div>
                            </div>
                        ))}</>
                )}

                {!summary && skills.length === 0 && <div className="rt-placeholder"><p>Fill in your details →</p></div>}
            </div>
        </div>
    );
}

/* ── Main export ─────────────────────────── */
const COMPONENTS = {
    chronological: Chronological,
    functional: Functional,
    combination: Combination,
    student: Student,
    creative: Creative,
    technical: Technical,
};

export default function ResumeTemplate({ data, type = 'chronological' }) {
    const Component = COMPONENTS[type] || Chronological;
    return <Component data={data} />;
}
