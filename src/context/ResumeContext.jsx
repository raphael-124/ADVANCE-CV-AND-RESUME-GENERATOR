import { createContext, useContext, useState, useEffect } from 'react';

const ResumeContext = createContext();

const defaultResume = {
    personalInfo: {
        fullName: '',
        phone: '',
        email: '',
        city: '',
        linkedin: '',
        portfolio: ''
    },
    summary: '',
    skills: [],       // { id, name, category: 'technical'|'soft' }
    experience: [],   // { id, title, company, location, startDate, endDate, current, bullets: [] }
    education: [],    // { id, degree, field, school, startDate, endDate }
    projects: []      // { id, title, description, tools }
};

export function ResumeProvider({ children }) {
    const [resumeTemplate, setResumeTemplate] = useState(
        () => localStorage.getItem('resumeTemplate') || 'chronological'
    );

    const [resumeData, setResumeData] = useState(() => {
        try {
            const saved = localStorage.getItem('resumeData');
            if (!saved) return defaultResume;
            const parsed = JSON.parse(saved);
            return {
                ...defaultResume,
                ...parsed,
                personalInfo: { ...defaultResume.personalInfo, ...parsed.personalInfo }
            };
        } catch {
            return defaultResume;
        }
    });

    useEffect(() => {
        localStorage.setItem('resumeData', JSON.stringify(resumeData));
    }, [resumeData]);

    useEffect(() => {
        localStorage.setItem('resumeTemplate', resumeTemplate);
    }, [resumeTemplate]);

    // Personal Info
    const updatePersonalInfo = (field, value) =>
        setResumeData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [field]: value } }));

    // Summary
    const updateSummary = (value) =>
        setResumeData(prev => ({ ...prev, summary: value }));

    // Skills
    const addSkill = (name, category = 'technical') =>
        setResumeData(prev => ({ ...prev, skills: [...prev.skills, { id: Date.now(), name, category }] }));
    const removeSkill = (id) =>
        setResumeData(prev => ({ ...prev, skills: prev.skills.filter(s => s.id !== id) }));
    const updateSkill = (id, updates) =>
        setResumeData(prev => ({ ...prev, skills: prev.skills.map(s => s.id === id ? { ...s, ...updates } : s) }));

    // Experience
    const addExperience = (exp) =>
        setResumeData(prev => ({ ...prev, experience: [...prev.experience, { id: Date.now(), bullets: [], ...exp }] }));
    const updateExperience = (id, updates) =>
        setResumeData(prev => ({ ...prev, experience: prev.experience.map(e => e.id === id ? { ...e, ...updates } : e) }));
    const removeExperience = (id) =>
        setResumeData(prev => ({ ...prev, experience: prev.experience.filter(e => e.id !== id) }));

    // Education
    const addEducation = (edu) =>
        setResumeData(prev => ({ ...prev, education: [...prev.education, { id: Date.now(), ...edu }] }));
    const updateEducation = (id, updates) =>
        setResumeData(prev => ({ ...prev, education: prev.education.map(e => e.id === id ? { ...e, ...updates } : e) }));
    const removeEducation = (id) =>
        setResumeData(prev => ({ ...prev, education: prev.education.filter(e => e.id !== id) }));

    // Projects
    const addProject = (proj) =>
        setResumeData(prev => ({ ...prev, projects: [...prev.projects, { id: Date.now(), ...proj }] }));
    const updateProject = (id, updates) =>
        setResumeData(prev => ({ ...prev, projects: prev.projects.map(p => p.id === id ? { ...p, ...updates } : p) }));
    const removeProject = (id) =>
        setResumeData(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));

    const resetResume = () => {
        setResumeData(defaultResume);
        setResumeTemplate('chronological');
        localStorage.removeItem('resumeData');
        localStorage.removeItem('resumeTemplate');
    };

    // Completion score (0–100)
    const getCompletionScore = () => {
        let score = 0;
        const p = resumeData.personalInfo;
        if (p.fullName) score += 15;
        if (p.email) score += 10;
        if (p.phone) score += 5;
        if (resumeData.summary) score += 15;
        if (resumeData.skills.length >= 3) score += 15;
        if (resumeData.experience.length >= 1) score += 20;
        if (resumeData.education.length >= 1) score += 15;
        if (resumeData.projects.length >= 1) score += 5;
        return Math.min(score, 100);
    };

    return (
        <ResumeContext.Provider value={{
            resumeData,
            resumeTemplate, setResumeTemplate,
            updatePersonalInfo, updateSummary,
            addSkill, removeSkill, updateSkill,
            addExperience, updateExperience, removeExperience,
            addEducation, updateEducation, removeEducation,
            addProject, updateProject, removeProject,
            resetResume, getCompletionScore
        }}>
            {children}
        </ResumeContext.Provider>
    );
}

export function useResume() {
    const ctx = useContext(ResumeContext);
    if (!ctx) throw new Error('useResume must be used within a ResumeProvider');
    return ctx;
}
