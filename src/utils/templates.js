// Template definitions — 6 professional CV types
export const templates = {
    // ── Free ──────────────────────────────────────────────────
    professional: {
        id: 'professional',
        name: 'Professional CV',
        description: 'Corporate & industry roles — Profile, Work Experience, Skills, Education',
        preview: '💼',
        premium: false,
        canExport: true,
        bestFor: 'Corporate jobs · Industry roles',
    },
    student: {
        id: 'student',
        name: 'Student CV',
        description: 'Students, internships, entry-level — Objective, Skills, Projects, Volunteering',
        preview: '🎓',
        premium: false,
        canExport: true,
        bestFor: 'Students · Internships · Entry-level',
    },

    // ── Premium ───────────────────────────────────────────────
    academic: {
        id: 'academic',
        name: 'Academic CV',
        description: 'Universities, research & teaching — Education, Research, Publications, Conferences',
        preview: '📚',
        premium: true,
        canExport: true,
        bestFor: 'University applications · Research · Teaching',
    },
    medical: {
        id: 'medical',
        name: 'Medical CV',
        description: 'Doctors, nurses, healthcare — Clinical Experience, Certifications, Research',
        preview: '🏥',
        premium: true,
        canExport: true,
        bestFor: 'Doctors · Nurses · Healthcare professionals',
    },
    tech: {
        id: 'tech',
        name: 'Technical / IT CV',
        description: 'Engineers, programmers — Technical Skills, Projects, Tools & Technologies',
        preview: '💻',
        premium: true,
        canExport: true,
        bestFor: 'Engineers · Programmers · IT',
    },
};

export const freeTemplates = Object.values(templates).filter(t => !t.premium);
export const premiumTemplates = Object.values(templates).filter(t => t.premium);
export const exportableTemplates = Object.values(templates).filter(t => t.canExport);
