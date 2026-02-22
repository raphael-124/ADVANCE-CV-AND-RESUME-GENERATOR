// Industry-based color themes
export const industryThemes = {
    tech: {
        name: 'Technology',
        primary: '#6366f1',
        secondary: '#8b5cf6',
        accent: '#06b6d4',
        bg: '#0f172a',
        text: '#e2e8f0'
    },
    finance: {
        name: 'Finance',
        primary: '#1e3a5f',
        secondary: '#0d4f8b',
        accent: '#d4af37',
        bg: '#0a1929',
        text: '#e8f4fd'
    },
    creative: {
        name: 'Creative',
        primary: '#ec4899',
        secondary: '#f43f5e',
        accent: '#facc15',
        bg: '#1a0a14',
        text: '#fdf2f8'
    },
    healthcare: {
        name: 'Healthcare',
        primary: '#059669',
        secondary: '#10b981',
        accent: '#06b6d4',
        bg: '#022c22',
        text: '#ecfdf5'
    },
    corporate: {
        name: 'Corporate',
        primary: '#374151',
        secondary: '#4b5563',
        accent: '#3b82f6',
        bg: '#111827',
        text: '#f9fafb'
    },
    education: {
        name: 'Education',
        primary: '#7c3aed',
        secondary: '#8b5cf6',
        accent: '#f59e0b',
        bg: '#1e1033',
        text: '#f5f3ff'
    },
    marketing: {
        name: 'Marketing',
        primary: '#f97316',
        secondary: '#fb923c',
        accent: '#22d3ee',
        bg: '#1c0f05',
        text: '#fff7ed'
    },
    legal: {
        name: 'Legal',
        primary: '#0f172a',
        secondary: '#1e293b',
        accent: '#854d0e',
        bg: '#020617',
        text: '#f8fafc'
    }
};

// Light mode versions
export const industryThemesLight = {
    tech: {
        ...industryThemes.tech,
        bg: '#f8fafc',
        text: '#0f172a'
    },
    finance: {
        ...industryThemes.finance,
        bg: '#f0f9ff',
        text: '#0c4a6e'
    },
    creative: {
        ...industryThemes.creative,
        bg: '#fdf2f8',
        text: '#831843'
    },
    healthcare: {
        ...industryThemes.healthcare,
        bg: '#ecfdf5',
        text: '#064e3b'
    },
    corporate: {
        ...industryThemes.corporate,
        bg: '#f9fafb',
        text: '#111827'
    },
    education: {
        ...industryThemes.education,
        bg: '#faf5ff',
        text: '#3b0764'
    },
    marketing: {
        ...industryThemes.marketing,
        bg: '#fff7ed',
        text: '#7c2d12'
    },
    legal: {
        ...industryThemes.legal,
        bg: '#f8fafc',
        text: '#020617'
    }
};

export function getTheme(industry, darkMode) {
    const themes = darkMode ? industryThemes : industryThemesLight;
    return themes[industry] || themes.tech;
}
