import {
    Document, Packer, Paragraph, TextRun,
    AlignmentType, BorderStyle, convertInchesToTwip
} from 'docx';
import { saveAs } from 'file-saver';

// ── Unit helpers ───────────────────────────────────────────────────────────
const hp = (pt) => pt * 2;   // half-points for font size
const twip = (pt) => pt * 20;  // twips for spacing

const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
        const d = new Date(dateStr + '-01');
        return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } catch { return dateStr; }
};

// ── Builders ───────────────────────────────────────────────────────────────

const heading = (text, accentHex) => new Paragraph({
    children: [new TextRun({ text: text.toUpperCase(), bold: true, size: hp(10), color: accentHex, font: 'Calibri' })],
    spacing: { before: twip(12), after: twip(4) },
    border: { bottom: { color: accentHex, space: 1, value: BorderStyle.SINGLE, size: 6 } },
});

const bullet = (text) => new Paragraph({
    children: [new TextRun({ text: text.replace(/^[•\-]\s*/, ''), size: hp(10), font: 'Calibri' })],
    bullet: { level: 0 },
    spacing: { after: twip(2) },
});

const gap = (pt = 5) => new Paragraph({
    children: [new TextRun({ text: '' })],
    spacing: { after: twip(pt) },
});

// ── Section builders ───────────────────────────────────────────────────────

function buildName(p, accentHex) {
    return [
        new Paragraph({
            children: [new TextRun({ text: p.fullName || 'Your Name', bold: true, size: hp(22), font: 'Calibri', color: accentHex })],
            alignment: AlignmentType.CENTER,
            spacing: { after: twip(3) },
        }),
    ];
}

function buildContact(p) {
    const parts = [p.email, p.phone, p.location, p.linkedin, p.website, p.portfolio].filter(Boolean);
    if (!parts.length) return [];
    return [
        new Paragraph({
            children: [new TextRun({ text: parts.join('   |   '), size: hp(9), font: 'Calibri', color: '64748B' })],
            alignment: AlignmentType.CENTER,
            spacing: { after: twip(10) },
        }),
    ];
}

function buildSummary(p, accentHex, label = 'Professional Summary') {
    if (!p.summary) return [];
    return [
        heading(label, accentHex),
        new Paragraph({
            children: [new TextRun({ text: p.summary, size: hp(10), font: 'Calibri', italics: true })],
            spacing: { after: twip(6) },
        }),
    ];
}

function buildExperience(experience, accentHex, label = 'Work Experience') {
    if (!experience?.length) return [];
    const rows = [heading(label, accentHex)];
    experience.forEach(exp => {
        const dates = [formatDate(exp.startDate), exp.current ? 'Present' : formatDate(exp.endDate)].filter(Boolean).join(' – ');
        rows.push(
            new Paragraph({
                children: [
                    new TextRun({ text: exp.title || '', bold: true, size: hp(11), font: 'Calibri' }),
                    ...(dates ? [new TextRun({ text: `     ${dates}`, size: hp(9), font: 'Calibri', color: '94A3B8' })] : []),
                ],
                spacing: { after: twip(1) },
            }),
            new Paragraph({
                children: [new TextRun({ text: [exp.company, exp.location].filter(Boolean).join(' · '), size: hp(10), font: 'Calibri', color: '475569' })],
                spacing: { after: twip(3) },
            }),
        );
        if (exp.description) exp.description.split('\n').filter(l => l.trim()).forEach(l => rows.push(bullet(l)));
        if (exp.achievements?.length) exp.achievements.forEach(a => rows.push(bullet(a)));
        rows.push(gap(5));
    });
    return rows;
}

function buildEducation(education, accentHex, label = 'Education') {
    if (!education?.length) return [];
    const rows = [heading(label, accentHex)];
    education.forEach(edu => {
        const dates = [formatDate(edu.startDate), formatDate(edu.endDate)].filter(Boolean).join(' – ');
        rows.push(
            new Paragraph({
                children: [
                    new TextRun({ text: edu.institution || '', bold: true, size: hp(11), font: 'Calibri' }),
                    ...(dates ? [new TextRun({ text: `     ${dates}`, size: hp(9), font: 'Calibri', color: '94A3B8' })] : []),
                ],
                spacing: { after: twip(1) },
            }),
            new Paragraph({
                children: [new TextRun({ text: [edu.degree, edu.field ? `in ${edu.field}` : ''].filter(Boolean).join(' '), size: hp(10), font: 'Calibri', color: '475569' })],
                spacing: { after: twip(5) },
            }),
        );
    });
    return rows;
}

function buildSkills(skills, accentHex, label = 'Skills') {
    const tech = skills?.technical || [];
    const soft = skills?.soft || [];
    if (!tech.length && !soft.length) return [];
    const rows = [heading(label, accentHex)];
    if (tech.length) rows.push(new Paragraph({
        children: [new TextRun({ text: 'Technical:  ', bold: true, size: hp(10), font: 'Calibri' }), new TextRun({ text: tech.map(s => s.name || s).join(', '), size: hp(10), font: 'Calibri' })],
        spacing: { after: twip(3) },
    }));
    if (soft.length) rows.push(new Paragraph({
        children: [new TextRun({ text: 'Soft Skills:  ', bold: true, size: hp(10), font: 'Calibri' }), new TextRun({ text: soft.map(s => s.name || s).join(', '), size: hp(10), font: 'Calibri' })],
        spacing: { after: twip(3) },
    }));
    rows.push(gap(3));
    return rows;
}

function buildProjects(projects, accentHex, label = 'Projects') {
    if (!projects?.length) return [];
    const rows = [heading(label, accentHex)];
    projects.forEach(proj => {
        rows.push(new Paragraph({
            children: [
                new TextRun({ text: proj.name || proj.title || '', bold: true, size: hp(11), font: 'Calibri' }),
                ...((proj.technologies || proj.tools) ? [new TextRun({ text: `  —  ${proj.technologies || proj.tools}`, size: hp(9), font: 'Calibri', color: '64748B' })] : []),
            ],
            spacing: { after: twip(2) },
        }));
        if (proj.description) rows.push(new Paragraph({
            children: [new TextRun({ text: proj.description, size: hp(10), font: 'Calibri' })],
            spacing: { after: twip(5) },
        }));
    });
    return rows;
}

function buildCertifications(certifications, accentHex) {
    if (!certifications?.length) return [];
    const rows = [heading('Certifications', accentHex)];
    certifications.forEach(cert => {
        rows.push(new Paragraph({
            children: [
                new TextRun({ text: cert.name || '', bold: true, size: hp(10), font: 'Calibri' }),
                ...(cert.issuer ? [new TextRun({ text: ` — ${cert.issuer}`, size: hp(10), font: 'Calibri', color: '475569' })] : []),
                ...(cert.date ? [new TextRun({ text: ` (${cert.date})`, size: hp(9), font: 'Calibri', color: '94A3B8' })] : []),
            ],
            spacing: { after: twip(3) },
        }));
    });
    rows.push(gap(3));
    return rows;
}

function buildLanguages(languages, accentHex) {
    if (!languages?.length) return [];
    return [
        heading('Languages', accentHex),
        new Paragraph({
            children: [new TextRun({ text: languages.map(l => `${l.language || l.name}${l.level ? ` (${l.level})` : ''}`).join('   ·   '), size: hp(10), font: 'Calibri' })],
            spacing: { after: twip(6) },
        }),
    ];
}

function buildAchievements(achievements, accentHex) {
    if (!achievements?.length) return [];
    return [
        heading('Achievements', accentHex),
        ...achievements.map(a => bullet(a.title || a.description || String(a))),
    ];
}

function buildReferences(references, personalInfo, accentHex) {
    if (!references?.length && !personalInfo?.referencesOnRequest) return [];
    const rows = [heading('References', accentHex)];
    if (references?.length) {
        references.forEach(ref => {
            rows.push(new Paragraph({
                children: [new TextRun({ text: ref.name || '', bold: true, size: hp(10), font: 'Calibri' })],
                spacing: { after: twip(1) },
            }));
            rows.push(new Paragraph({
                children: [new TextRun({ text: [ref.title, ref.company].filter(Boolean).join(', '), size: hp(9), font: 'Calibri', color: '475569' })],
                spacing: { after: twip(1) },
            }));
            if (ref.email || ref.phone) rows.push(new Paragraph({
                children: [new TextRun({ text: [ref.phone, ref.email].filter(Boolean).join('  •  '), size: hp(9), font: 'Calibri', color: '475569' })],
                spacing: { after: twip(4) },
            }));
        });
    } else {
        rows.push(new Paragraph({
            children: [new TextRun({ text: 'References available upon request.', size: hp(10), font: 'Calibri', italics: true })],
            spacing: { after: twip(4) },
        }));
    }
    return rows;
}

// ── Template-aware section order ──────────────────────────────────────────

function buildSections(cvData, accentHex, templateId) {
    const { personalInfo: p, education, experience, skills, projects, certifications, languages, achievements, references } = cvData;

    const name = buildName(p, accentHex);
    const contact = buildContact(p);

    switch (templateId) {

        // ── Student CV: Objective → Education → Skills → Projects → Experience ──
        case 'student':
            return [
                ...name, ...contact,
                ...buildSummary(p, accentHex, 'Objective'),
                ...buildEducation(education, accentHex),
                ...buildSkills(skills, accentHex),
                ...buildProjects(projects, accentHex),
                ...buildExperience(experience, accentHex),
                ...buildCertifications(certifications, accentHex),
                ...buildLanguages(languages, accentHex),
                ...buildReferences(references, p, accentHex),
            ];

        // ── Academic: Research Interests → Skills → Education → Experience → Publications ──
        case 'academic':
            return [
                ...name, ...contact,
                ...buildSummary(p, accentHex, 'Research Interests'),
                ...buildSkills(skills, accentHex, 'Technical & Professional Skills'),
                ...buildEducation(education, accentHex),
                ...buildExperience(experience, accentHex, 'Professional Experience'),
                ...buildProjects(projects, accentHex, 'Publications & Projects'),
                ...buildCertifications(certifications, accentHex),
                ...buildLanguages(languages, accentHex),
                ...buildReferences(references, p, accentHex),
            ];

        // ── Medical: Profile → Education → Clinical Experience → Skills → Certifications → Research ──
        case 'medical':
            return [
                ...name, ...contact,
                ...buildSummary(p, accentHex, 'Professional Profile'),
                ...buildEducation(education, accentHex),
                ...buildExperience(experience, accentHex, 'Clinical Experience'),
                ...buildSkills(skills, accentHex, 'Clinical Skills & Expertise'),
                ...buildCertifications(certifications, accentHex),
                ...buildProjects(projects, accentHex, 'Research & Publications'),
                ...buildLanguages(languages, accentHex),
                ...buildReferences(references, p, accentHex),
            ];

        // ── Tech: Summary (README) → Skills (Tech Stack) → Experience → Projects → Education ──
        case 'tech':
            return [
                ...name, ...contact,
                ...buildSummary(p, accentHex, 'About'),
                ...buildSkills(skills, accentHex, 'Technical Stack'),
                ...buildExperience(experience, accentHex),
                ...buildProjects(projects, accentHex),
                ...buildEducation(education, accentHex),
                ...buildCertifications(certifications, accentHex),
                ...buildLanguages(languages, accentHex),
                ...buildAchievements(achievements, accentHex),
            ];

        // ── Professional (default): Profile → Experience → Skills → Education → ... ──
        default:
            return [
                ...name, ...contact,
                ...buildSummary(p, accentHex, 'Profile'),
                ...buildExperience(experience, accentHex, 'Work Experience'),
                ...buildSkills(skills, accentHex),
                ...buildEducation(education, accentHex),
                ...buildCertifications(certifications, accentHex),
                ...buildProjects(projects, accentHex),
                ...buildLanguages(languages, accentHex),
                ...buildAchievements(achievements, accentHex),
                ...buildReferences(references, p, accentHex),
            ];
    }
}

// ── Main export ────────────────────────────────────────────────────────────

export async function exportToDocx(cvData, filename = 'CV') {
    const templateId = cvData.settings?.template || 'professional';
    const accentHex = (cvData.settings?.accentColor || '#4F46E5').replace('#', '');

    const children = buildSections(cvData, accentHex, templateId);

    const doc = new Document({
        sections: [{
            properties: {
                page: {
                    margin: {
                        top: convertInchesToTwip(0.75),
                        bottom: convertInchesToTwip(0.75),
                        left: convertInchesToTwip(0.9),
                        right: convertInchesToTwip(0.9),
                    },
                },
            },
            children,
        }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${(filename || 'CV').replace(/\s+/g, '_')}_CV.docx`);
}
