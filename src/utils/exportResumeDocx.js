import {
    Document, Packer, Paragraph, TextRun,
    AlignmentType, BorderStyle, convertInchesToTwip
} from 'docx';
import { saveAs } from 'file-saver';

// Resume data model (from ResumeContext):
//   personalInfo: { fullName, phone, email, city, linkedin, portfolio }
//   summary:      string
//   skills:       [{ id, name, category: 'technical'|'soft' }]
//   experience:   [{ id, title, company, location, startDate, endDate, current, bullets: [] }]
//   education:    [{ id, degree, field, school, startDate, endDate }]
//   projects:     [{ id, title, description, tools }]

// ── Unit helpers ─────────────────────────────────────────────────────────
const hp = (pt) => pt * 2;   // half-points  → font size
const twip = (pt) => pt * 20;  // twentieths   → spacing

const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
        const d = new Date(dateStr + '-01');
        return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } catch {
        return dateStr;
    }
};

// ── Builders ──────────────────────────────────────────────────────────────

const sectionHeading = (text, accentHex) => new Paragraph({
    children: [
        new TextRun({
            text: text.toUpperCase(),
            bold: true,
            size: hp(10),
            color: accentHex,
            font: 'Calibri',
        }),
    ],
    spacing: { before: twip(12), after: twip(4) },
    border: {
        bottom: { color: accentHex, space: 1, value: BorderStyle.SINGLE, size: 6 },
    },
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

// ── Main export ──────────────────────────────────────────────────────────

export async function exportResumeToDocx(resumeData, accentColor = '#0d9488', filename) {
    const { personalInfo: p, summary, skills, experience, education, projects } = resumeData;
    const accentHex = accentColor.replace('#', '');
    const children = [];

    // ── Name ──────────────────────────────────────────────────────────────
    children.push(
        new Paragraph({
            children: [
                new TextRun({
                    text: p.fullName || 'Your Name',
                    bold: true,
                    size: hp(22),
                    font: 'Calibri',
                    color: accentHex,
                }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: twip(3) },
        }),
    );

    // ── Contact ────────────────────────────────────────────────────────────
    const contactParts = [p.email, p.phone, p.city, p.linkedin, p.portfolio].filter(Boolean);
    if (contactParts.length > 0) {
        children.push(
            new Paragraph({
                children: [
                    new TextRun({
                        text: contactParts.join('   |   '),
                        size: hp(9),
                        font: 'Calibri',
                        color: '64748B',
                    }),
                ],
                alignment: AlignmentType.CENTER,
                spacing: { after: twip(10) },
            }),
        );
    }

    // ── Summary ────────────────────────────────────────────────────────────
    if (summary) {
        children.push(sectionHeading('Professional Summary', accentHex));
        children.push(
            new Paragraph({
                children: [new TextRun({ text: summary, size: hp(10), font: 'Calibri', italics: true })],
                spacing: { after: twip(6) },
            }),
        );
    }

    // ── Skills ─────────────────────────────────────────────────────────────
    const techSkills = (skills || []).filter(s => s.category === 'technical');
    const softSkills = (skills || []).filter(s => s.category === 'soft');

    if (skills?.length > 0) {
        children.push(sectionHeading('Skills', accentHex));

        if (techSkills.length > 0) {
            children.push(
                new Paragraph({
                    children: [
                        new TextRun({ text: 'Technical:  ', bold: true, size: hp(10), font: 'Calibri' }),
                        new TextRun({ text: techSkills.map(s => s.name).join(', '), size: hp(10), font: 'Calibri' }),
                    ],
                    spacing: { after: twip(3) },
                }),
            );
        }

        if (softSkills.length > 0) {
            children.push(
                new Paragraph({
                    children: [
                        new TextRun({ text: 'Soft Skills:  ', bold: true, size: hp(10), font: 'Calibri' }),
                        new TextRun({ text: softSkills.map(s => s.name).join(', '), size: hp(10), font: 'Calibri' }),
                    ],
                    spacing: { after: twip(3) },
                }),
            );
        }

        // Any skills without a category
        const otherSkills = (skills || []).filter(s => !s.category || (s.category !== 'technical' && s.category !== 'soft'));
        if (otherSkills.length > 0) {
            children.push(
                new Paragraph({
                    children: [new TextRun({ text: otherSkills.map(s => s.name).join('  ·  '), size: hp(10), font: 'Calibri' })],
                    spacing: { after: twip(3) },
                }),
            );
        }

        children.push(gap(3));
    }

    // ── Experience ────────────────────────────────────────────────────────
    if (experience?.length > 0) {
        children.push(sectionHeading('Work Experience', accentHex));

        experience.forEach(exp => {
            const dates = [
                formatDate(exp.startDate),
                exp.current ? 'Present' : formatDate(exp.endDate),
            ].filter(Boolean).join(' – ');

            children.push(
                new Paragraph({
                    children: [
                        new TextRun({ text: exp.title || '', bold: true, size: hp(11), font: 'Calibri' }),
                        ...(dates ? [new TextRun({ text: `     ${dates}`, size: hp(9), font: 'Calibri', color: '94A3B8' })] : []),
                    ],
                    spacing: { after: twip(1) },
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: [exp.company, exp.location].filter(Boolean).join(' · '),
                            size: hp(10), font: 'Calibri', color: '475569',
                        }),
                    ],
                    spacing: { after: twip(3) },
                }),
            );

            // Bullets array
            if (exp.bullets?.length > 0) {
                exp.bullets.forEach(b => children.push(bullet(b)));
            }

            // Fallback plain description if no bullets
            if (!exp.bullets?.length && exp.description) {
                exp.description.split('\n').filter(l => l.trim()).forEach(l => children.push(bullet(l)));
            }

            children.push(gap(5));
        });
    }

    // ── Education ─────────────────────────────────────────────────────────
    if (education?.length > 0) {
        children.push(sectionHeading('Education', accentHex));

        education.forEach(edu => {
            const dates = [formatDate(edu.startDate), formatDate(edu.endDate)].filter(Boolean).join(' – ');

            children.push(
                new Paragraph({
                    children: [
                        new TextRun({ text: edu.school || '', bold: true, size: hp(11), font: 'Calibri' }),
                        ...(dates ? [new TextRun({ text: `     ${dates}`, size: hp(9), font: 'Calibri', color: '94A3B8' })] : []),
                    ],
                    spacing: { after: twip(1) },
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: [edu.degree, edu.field ? `in ${edu.field}` : ''].filter(Boolean).join(' '),
                            size: hp(10), font: 'Calibri', color: '475569',
                        }),
                    ],
                    spacing: { after: twip(5) },
                }),
            );
        });
    }

    // ── Projects ───────────────────────────────────────────────────────────
    if (projects?.length > 0) {
        children.push(sectionHeading('Projects', accentHex));

        projects.forEach(proj => {
            children.push(
                new Paragraph({
                    children: [
                        new TextRun({ text: proj.title || '', bold: true, size: hp(11), font: 'Calibri' }),
                        ...(proj.tools ? [new TextRun({ text: `  —  ${proj.tools}`, size: hp(9), font: 'Calibri', color: '64748B' })] : []),
                    ],
                    spacing: { after: twip(2) },
                }),
            );

            if (proj.description) {
                children.push(
                    new Paragraph({
                        children: [new TextRun({ text: proj.description, size: hp(10), font: 'Calibri' })],
                        spacing: { after: twip(5) },
                    }),
                );
            }
        });
    }

    // ── Build & save ───────────────────────────────────────────────────────
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
    const name = filename || p.fullName || 'Resume';
    saveAs(blob, `${name.replace(/\s+/g, '_')}_Resume.docx`);
}
