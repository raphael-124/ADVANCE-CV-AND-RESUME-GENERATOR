import { createContext, useContext, useState, useEffect } from 'react';

const CVContext = createContext();

const defaultCV = {
    personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        summary: '',
        linkedin: '',
        portfolio: '',
        github: '',
        photo: null,
        referencesOnRequest: true
    },
    education: [],
    experience: [],
    skills: { technical: [], soft: [] },  // { technical: [...], soft: [...] }
    projects: [],
    certifications: [],  // { id, name, issuer, year, url }
    languages: [],       // { id, name, proficiency: 'Native'|'Fluent'|'Intermediate'|'Basic' }
    achievements: [],    // { id, title, description, year }
    volunteer: [],       // { id, role, organization, startDate, endDate, current, description }
    references: [],      // { id, name, title, company, phone, email } | or "available"
    settings: {
        template: 'professional',
        accentColor: '#6366f1',
        darkMode: false,
        industry: 'tech'
    },
    premiumUnlocked: false
};

export function CVProvider({ children }) {
    const [cvData, setCvData] = useState(() => {
        try {
            const saved = localStorage.getItem('cvData');
            if (!saved) return defaultCV;
            const parsed = JSON.parse(saved);
            // Merge with defaults to ensure new fields exist for old saves
            return {
                ...defaultCV,
                ...parsed,
                personalInfo: { ...defaultCV.personalInfo, ...parsed.personalInfo },
                settings: { ...defaultCV.settings, ...parsed.settings },
                skills: (() => {
                    // Handle migration from old flat-array skills
                    const s = parsed.skills;
                    if (!s) return defaultCV.skills;
                    if (Array.isArray(s)) {
                        // Migrate old flat array: items with category='soft' go to soft
                        return {
                            technical: s.filter(x => x.category !== 'soft'),
                            soft: s.filter(x => x.category === 'soft'),
                        };
                    }
                    return { ...defaultCV.skills, ...s };
                })()
            };
        } catch {
            return defaultCV;
        }
    });

    useEffect(() => {
        localStorage.setItem('cvData', JSON.stringify(cvData));
    }, [cvData]);

    const updatePersonalInfo = (field, value) => {
        setCvData(prev => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, [field]: value }
        }));
    };

    // ---- Education ----
    const addEducation = (edu) => {
        setCvData(prev => ({ ...prev, education: [...prev.education, { id: Date.now(), ...edu }] }));
    };
    const updateEducation = (id, edu) => {
        setCvData(prev => ({ ...prev, education: prev.education.map(e => e.id === id ? { ...e, ...edu } : e) }));
    };
    const removeEducation = (id) => {
        setCvData(prev => ({ ...prev, education: prev.education.filter(e => e.id !== id) }));
    };

    // ---- Experience ----
    const addExperience = (exp) => {
        setCvData(prev => ({ ...prev, experience: [...prev.experience, { id: Date.now(), ...exp }] }));
    };
    const updateExperience = (id, exp) => {
        setCvData(prev => ({ ...prev, experience: prev.experience.map(e => e.id === id ? { ...e, ...exp } : e) }));
    };
    const removeExperience = (id) => {
        setCvData(prev => ({ ...prev, experience: prev.experience.filter(e => e.id !== id) }));
    };

    // ---- Skills ({ technical: [], soft: [] }) ----
    const addSkill = (skill, category = 'technical') => {
        const bucket = category === 'soft' ? 'soft' : 'technical';
        setCvData(prev => ({
            ...prev,
            skills: {
                ...prev.skills,
                [bucket]: [...(prev.skills[bucket] || []), { id: Date.now(), name: skill, level: 80, category }]
            }
        }));
    };
    const updateSkill = (id, updates) => {
        setCvData(prev => {
            const mapBucket = (arr) => arr.map(s => s.id === id ? { ...s, ...updates } : s);
            return {
                ...prev,
                skills: {
                    technical: mapBucket(prev.skills.technical || []),
                    soft: mapBucket(prev.skills.soft || []),
                }
            };
        });
    };
    const removeSkill = (id) => {
        setCvData(prev => ({
            ...prev,
            skills: {
                technical: (prev.skills.technical || []).filter(s => s.id !== id),
                soft: (prev.skills.soft || []).filter(s => s.id !== id),
            }
        }));
    };


    // ---- Projects ----
    const addProject = (project) => {
        setCvData(prev => ({ ...prev, projects: [...prev.projects, { id: Date.now(), ...project }] }));
    };
    const updateProject = (id, project) => {
        setCvData(prev => ({ ...prev, projects: prev.projects.map(p => p.id === id ? { ...p, ...project } : p) }));
    };
    const removeProject = (id) => {
        setCvData(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));
    };

    // ---- Certifications ----
    const addCertification = (cert) => {
        setCvData(prev => ({ ...prev, certifications: [...prev.certifications, { id: Date.now(), ...cert }] }));
    };
    const updateCertification = (id, cert) => {
        setCvData(prev => ({ ...prev, certifications: prev.certifications.map(c => c.id === id ? { ...c, ...cert } : c) }));
    };
    const removeCertification = (id) => {
        setCvData(prev => ({ ...prev, certifications: prev.certifications.filter(c => c.id !== id) }));
    };

    // ---- Languages ----
    const addLanguage = (lang) => {
        setCvData(prev => ({ ...prev, languages: [...prev.languages, { id: Date.now(), ...lang }] }));
    };
    const updateLanguage = (id, lang) => {
        setCvData(prev => ({ ...prev, languages: prev.languages.map(l => l.id === id ? { ...l, ...lang } : l) }));
    };
    const removeLanguage = (id) => {
        setCvData(prev => ({ ...prev, languages: prev.languages.filter(l => l.id !== id) }));
    };

    // ---- Achievements ----
    const addAchievement = (ach) => {
        setCvData(prev => ({ ...prev, achievements: [...prev.achievements, { id: Date.now(), ...ach }] }));
    };
    const updateAchievement = (id, ach) => {
        setCvData(prev => ({ ...prev, achievements: prev.achievements.map(a => a.id === id ? { ...a, ...ach } : a) }));
    };
    const removeAchievement = (id) => {
        setCvData(prev => ({ ...prev, achievements: prev.achievements.filter(a => a.id !== id) }));
    };

    // ---- Volunteer ----
    const addVolunteer = (vol) => {
        setCvData(prev => ({ ...prev, volunteer: [...prev.volunteer, { id: Date.now(), ...vol }] }));
    };
    const updateVolunteer = (id, vol) => {
        setCvData(prev => ({ ...prev, volunteer: prev.volunteer.map(v => v.id === id ? { ...v, ...vol } : v) }));
    };
    const removeVolunteer = (id) => {
        setCvData(prev => ({ ...prev, volunteer: prev.volunteer.filter(v => v.id !== id) }));
    };

    // ---- References ----
    const addReference = (ref) => {
        setCvData(prev => ({ ...prev, references: [...prev.references, { id: Date.now(), ...ref }] }));
    };
    const updateReference = (id, ref) => {
        setCvData(prev => ({ ...prev, references: prev.references.map(r => r.id === id ? { ...r, ...ref } : r) }));
    };
    const removeReference = (id) => {
        setCvData(prev => ({ ...prev, references: prev.references.filter(r => r.id !== id) }));
    };

    const updateSettings = (updates) => {
        setCvData(prev => ({ ...prev, settings: { ...prev.settings, ...updates } }));
    };

    const unlockPremium = () => {
        setCvData(prev => ({ ...prev, premiumUnlocked: true }));
    };

    const resetCV = () => {
        setCvData(defaultCV);
        localStorage.removeItem('cvData');
    };

    return (
        <CVContext.Provider value={{
            cvData,
            updatePersonalInfo,
            addEducation, updateEducation, removeEducation,
            addExperience, updateExperience, removeExperience,
            addSkill, updateSkill, removeSkill,
            addProject, updateProject, removeProject,
            addCertification, updateCertification, removeCertification,
            addLanguage, updateLanguage, removeLanguage,
            addAchievement, updateAchievement, removeAchievement,
            addVolunteer, updateVolunteer, removeVolunteer,
            addReference, updateReference, removeReference,
            updateSettings,
            unlockPremium,
            resetCV
        }}>
            {children}
        </CVContext.Provider>
    );
}

export function useCV() {
    const context = useContext(CVContext);
    if (!context) {
        throw new Error('useCV must be used within a CVProvider');
    }
    return context;
}
