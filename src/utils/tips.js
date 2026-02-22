// Real-time writing tips for CV improvement
export const tips = {
    summary: [
        { trigger: /^.{0,50}$/, tip: '💡 Aim for 2-3 sentences that highlight your unique value.' },
        { trigger: /responsible for/i, tip: '✨ Replace "responsible for" with action verbs like "led", "managed", or "developed".' },
        { trigger: /helped/i, tip: '💪 "Helped" is weak - use "collaborated", "contributed", or "partnered".' }
    ],
    experience: [
        { trigger: /^.{0,20}$/, tip: '📝 Start with a strong action verb (Achieved, Built, Created...)' },
        { trigger: /(?<!\d)%|percent/i, tip: '📊 Great! Percentages make achievements measurable.' },
        { trigger: /\$\d+|\d+k|\d+ million/i, tip: '💰 Excellent! Financial impact shows real value.' },
        { trigger: /team of \d+/i, tip: '👥 Nice! Team size shows leadership scope.' },
        { trigger: /^(?!.*\d).*$/, tip: '🔢 Try adding numbers: "Increased sales by 25%" is stronger than "Increased sales".' },
        { trigger: /worked on/i, tip: '🚀 Replace "worked on" with "developed", "engineered", or "executed".' }
    ],
    skills: [
        { trigger: /.+/, tip: '🎯 Add proficiency levels to stand out.' }
    ]
};

export function getTip(section, text) {
    const sectionTips = tips[section];
    if (!sectionTips) return null;

    for (const tip of sectionTips) {
        if (tip.trigger.test(text)) {
            return tip.tip;
        }
    }
    return null;
}

// ATS (Applicant Tracking System) score checker
export function calculateATSScore(cvData) {
    let score = 0;
    const issues = [];
    const suggestions = [];

    // Check personal info completeness
    const { personalInfo, education, experience, skills: skillsObj } = cvData;
    // Support both old flat-array and new { technical, soft } shape
    const skills = Array.isArray(skillsObj)
        ? skillsObj
        : [...(skillsObj?.technical || []), ...(skillsObj?.soft || [])];

    if (personalInfo.fullName) score += 10;
    else issues.push('Missing full name');

    if (personalInfo.email) score += 10;
    else issues.push('Missing email');

    if (personalInfo.phone) score += 5;
    else suggestions.push('Add phone number');

    if (personalInfo.location) score += 5;
    else suggestions.push('Add location');

    if (personalInfo.summary && personalInfo.summary.length > 50) score += 10;
    else if (personalInfo.summary) score += 5;
    else suggestions.push('Add a professional summary');

    // Check education
    if (education.length > 0) score += 10;
    else suggestions.push('Add education history');

    // Check experience
    if (experience.length >= 2) score += 15;
    else if (experience.length === 1) score += 8;
    else issues.push('Add work experience');

    // Check for metrics in experience
    const hasMetrics = experience.some(exp =>
        /\d+%|\$\d+|\d+ (years?|months?|projects?|clients?|team)/i.test(exp.description || '')
    );
    if (hasMetrics) score += 10;
    else suggestions.push('Add quantifiable achievements (numbers, percentages)');

    // Check skills
    if (skills.length >= 5) score += 15;
    else if (skills.length >= 3) score += 10;
    else if (skills.length > 0) score += 5;
    else suggestions.push('Add relevant skills');

    // Check for common ATS issues
    if (personalInfo.summary && personalInfo.summary.length > 500) {
        issues.push('Summary too long - keep under 500 characters');
        score -= 5;
    }

    // Cap score at 100
    score = Math.min(100, Math.max(0, score));

    return {
        score,
        issues,
        suggestions,
        rating: score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Needs Work' : 'Poor'
    };
}

// Calculate reading time
export function calculateReadingTime(cvData) {
    const { personalInfo, education, experience, skills: skillsObj2, projects } = cvData;
    const skills2 = Array.isArray(skillsObj2)
        ? skillsObj2
        : [...(skillsObj2?.technical || []), ...(skillsObj2?.soft || [])];

    let wordCount = 0;

    // Count words in summary
    if (personalInfo.summary) {
        wordCount += personalInfo.summary.split(/\s+/).length;
    }

    // Count words in experience
    experience.forEach(exp => {
        if (exp.title) wordCount += exp.title.split(/\s+/).length;
        if (exp.company) wordCount += exp.company.split(/\s+/).length;
        if (exp.description) wordCount += exp.description.split(/\s+/).length;
    });

    // Count words in education
    education.forEach(edu => {
        if (edu.degree) wordCount += edu.degree.split(/\s+/).length;
        if (edu.institution) wordCount += edu.institution.split(/\s+/).length;
        if (edu.field) wordCount += edu.field.split(/\s+/).length;
    });

    // Skills and projects
    wordCount += skills2.length * 2;
    projects.forEach(proj => {
        if (proj.name) wordCount += proj.name.split(/\s+/).length;
        if (proj.description) wordCount += proj.description.split(/\s+/).length;
    });

    // Average reading speed is ~200-250 words per minute
    // Recruiters skim, so estimate faster at 300 wpm
    const minutes = Math.ceil(wordCount / 300);

    return {
        wordCount,
        readingTime: minutes < 1 ? 'Less than 1 min' : `${minutes} min read`,
        isOptimal: wordCount >= 200 && wordCount <= 600
    };
}
