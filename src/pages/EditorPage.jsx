import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import {
    ArrowLeft, Download, Printer, Image, Sun, Moon,
    Palette, User, GraduationCap, Briefcase, Zap, FolderGit2,
    Award, Languages, Trophy, Heart, Users,
    ChevronDown, Lock, Crown, Check, Clock, FileText, AlertCircle, CheckCircle, FileDown, RotateCcw
} from 'lucide-react';
import { useCV } from '../context/CVContext';
import { templates, freeTemplates, premiumTemplates } from '../utils/templates';
import { industryThemes, getTheme } from '../utils/colorThemes';
import { calculateATSScore, calculateReadingTime } from '../utils/tips';
import { exportToDocx } from '../utils/exportDocx';
import PersonalInfoForm from '../components/forms/PersonalInfoForm';
import EducationForm from '../components/forms/EducationForm';
import ExperienceForm from '../components/forms/ExperienceForm';
import SkillsForm from '../components/forms/SkillsForm';
import ProjectsForm from '../components/forms/ProjectsForm';
import CertificationsForm from '../components/forms/CertificationsForm';
import LanguagesForm from '../components/forms/LanguagesForm';
import AchievementsForm from '../components/forms/AchievementsForm';
import VolunteerForm from '../components/forms/VolunteerForm';
import ReferencesForm from '../components/forms/ReferencesForm';
import ProfessionalTemplate from '../components/templates/ProfessionalTemplate';
import StudentCVTemplate from '../components/templates/StudentCVTemplate';
import AcademicTemplate from '../components/templates/AcademicTemplate';
import MedicalTemplate from '../components/templates/MedicalTemplate';
import TechTemplate from '../components/templates/TechTemplate';
import './EditorPage.css';

const templateComponents = {
    professional: ProfessionalTemplate,
    student: StudentCVTemplate,
    academic: AcademicTemplate,
    medical: MedicalTemplate,
    tech: TechTemplate,
};

export default function EditorPage() {
    const { cvData, updateSettings, unlockPremium, resetCV } = useCV();
    const [activeForm, setActiveForm] = useState('personal');
    const [showTemplates, setShowTemplates] = useState(false);
    const [showPremiumModal, setShowPremiumModal] = useState(false);
    const [showResetConfirm, setShowResetConfirm] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [exportStatus, setExportStatus] = useState('');
    const cvRef = useRef(null);

    const { settings, premiumUnlocked } = cvData;
    const currentTemplate = templates[settings.template];
    const theme = getTheme(settings.industry, settings.darkMode);
    const atsScore = calculateATSScore(cvData);
    const readingStats = calculateReadingTime(cvData);

    const TemplateComponent = templateComponents[settings.template] || ProfessionalTemplate;

    // Print function using react-to-print
    const reactToPrintFn = useReactToPrint({
        contentRef: cvRef,
        documentTitle: `${cvData.personalInfo.fullName || 'CV'}_Resume`,
    });

    const handlePrint = () => {
        if (reactToPrintFn) {
            reactToPrintFn();
        } else {
            window.print();
        }
    };

    // Word (.docx) Export
    const handleExportDocx = async () => {
        setIsExporting(true);
        setExportStatus('Generating Word document...');
        try {
            await exportToDocx(cvData, cvData.personalInfo.fullName || 'CV');
            setExportStatus('Word downloaded!');
            setTimeout(() => setExportStatus(''), 2000);
        } catch (err) {
            console.error('DOCX Export Error:', err);
            alert('Word export failed: ' + err.message);
            setExportStatus('');
        } finally {
            setIsExporting(false);
        }
    };

    // PDF Export function
    const handleExportPDF = async () => {
        const element = cvRef.current;
        if (!element) {
            alert('Error: CV preview not found');
            return;
        }

        setIsExporting(true);
        setExportStatus('Generating PDF...');

        try {
            // Generate canvas from the CV element
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
                logging: false,
                width: element.scrollWidth,
                height: element.scrollHeight,
            });

            // Create PDF with dynamic height to match content exactly
            const pdfWidth = 210; // Standard mm width
            const imgHeightMm = (canvas.height / canvas.width) * pdfWidth;

            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: [pdfWidth, imgHeightMm],
            });

            const imgData = canvas.toDataURL('image/png', 1.0);
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeightMm);

            const fileName = `${cvData.personalInfo.fullName || 'CV'}_Resume.pdf`;
            pdf.save(fileName);

            setExportStatus('PDF downloaded!');
            setTimeout(() => setExportStatus(''), 2000);
        } catch (error) {
            console.error('PDF Export Error:', error);
            alert(`PDF export failed: ${error.message}`);
            setExportStatus('');
        } finally {
            setIsExporting(false);
        }
    };

    // PNG Export function
    const handleExportPNG = async () => {
        const element = cvRef.current;
        if (!element) {
            alert('Error: CV preview not found');
            return;
        }

        setIsExporting(true);
        setExportStatus('Generating PNG...');

        try {
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
                logging: false,
                width: element.scrollWidth,
                height: element.scrollHeight,
            });

            // Create download link
            const dataUrl = canvas.toDataURL('image/png', 1.0);
            const link = document.createElement('a');
            link.download = `${cvData.personalInfo.fullName || 'CV'}_Resume.png`;
            link.href = dataUrl;

            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setExportStatus('PNG downloaded!');
            setTimeout(() => setExportStatus(''), 2000);
        } catch (error) {
            console.error('PNG Export Error:', error);
            alert(`PNG export failed: ${error.message}`);
            setExportStatus('');
        } finally {
            setIsExporting(false);
        }
    };

    const handleTemplateSelect = (templateId) => {
        const template = templates[templateId];
        if (template.premium && !premiumUnlocked) {
            setShowPremiumModal(true);
            return;
        }
        updateSettings({ template: templateId });
        setShowTemplates(false);
    };

    const getProjectLabel = () => {
        if (settings.template === 'academic') return 'Publications';
        if (settings.template === 'tech') return 'Repositories';
        if (settings.template === 'medical') return 'Research';
        return 'Projects';
    };

    const coreFormSections = [
        { id: 'personal', label: 'Personal Info', icon: <User size={16} /> },
        { id: 'education', label: 'Education', icon: <GraduationCap size={16} /> },
        { id: 'experience', label: 'Experience', icon: <Briefcase size={16} /> },
        { id: 'skills', label: 'Skills', icon: <Zap size={16} /> },
        { id: 'projects', label: getProjectLabel(), icon: <FolderGit2 size={16} /> },
    ];

    const extraFormSections = [
        { id: 'certifications', label: 'Certificates', icon: <Award size={16} /> },
        { id: 'languages', label: 'Languages', icon: <Languages size={16} /> },
        { id: 'achievements', label: 'Achievements', icon: <Trophy size={16} /> },
        { id: 'volunteer', label: 'Volunteer', icon: <Heart size={16} /> },
        { id: 'references', label: 'References', icon: <Users size={16} /> },
    ];

    const allSections = [...coreFormSections, ...extraFormSections];
    const activeIdx = allSections.findIndex(s => s.id === activeForm);
    const nextSection = allSections[activeIdx + 1] ?? null;

    return (
        <div className={`editor-page ${settings.darkMode ? 'dark-mode' : ''}`}>
            {/* ── Top Bar ── */}
            <header className="editor-topbar">
                <div className="topbar-left">
                    <Link to="/" className="topbar-back">
                        <ArrowLeft size={18} />
                        <span>Home</span>
                    </Link>
                    <div className="topbar-divider" />
                    <h1 className="topbar-title">CV Editor</h1>
                </div>

                <div className="topbar-center">
                    {/* ATS Score */}
                    <div className={`stat-badge ${atsScore.rating.toLowerCase().replace(' ', '-')}`}>
                        <AlertCircle size={14} />
                        <span>ATS: {atsScore.score}%</span>
                    </div>

                    {/* Reading Time */}
                    <div className="stat-badge neutral">
                        <Clock size={14} />
                        <span>{readingStats.readingTime}</span>
                    </div>

                    {/* Word Count */}
                    <div className="stat-badge neutral">
                        <FileText size={14} />
                        <span>{readingStats.wordCount} words</span>
                    </div>
                </div>

                <div className="topbar-right">
                    <button
                        className="topbar-icon-btn"
                        onClick={() => updateSettings({ darkMode: !settings.darkMode })}
                        title={settings.darkMode ? 'Light Mode' : 'Dark Mode'}
                    >
                        {settings.darkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    <button
                        className="topbar-btn secondary"
                        onClick={() => setShowResetConfirm(true)}
                        title="Erase all data and start a fresh CV"
                        style={{ color: 'var(--error, #ef4444)' }}
                    >
                        <RotateCcw size={15} />
                        Start Afresh
                    </button>

                    <div className="topbar-divider" />

                    <button
                        className="topbar-btn primary"
                        onClick={handleExportPDF}
                        disabled={isExporting}
                    >
                        <Download size={16} />
                        {isExporting ? 'Exporting...' : 'Download PDF'}
                    </button>

                    <button
                        className="topbar-btn secondary"
                        onClick={handleExportDocx}
                        disabled={isExporting}
                        title="Download Word (.docx)"
                    >
                        <FileDown size={16} />
                        Word
                    </button>

                    <button
                        className="topbar-btn secondary"
                        onClick={handleExportPNG}
                        disabled={isExporting}
                        title="Download PNG"
                    >
                        <Image size={16} />
                    </button>

                    <button
                        className="topbar-btn secondary"
                        onClick={handlePrint}
                        title="Print"
                    >
                        <Printer size={16} />
                    </button>
                </div>
            </header>

            {/* ── Start Afresh Confirm Modal ── */}
            {showResetConfirm && (
                <div
                    className="modal-overlay"
                    onClick={() => setShowResetConfirm(false)}
                    style={{
                        position: 'fixed', inset: 0, zIndex: 1000,
                        background: 'rgba(0,0,0,0.55)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                >
                    <div
                        className="modal-card"
                        onClick={e => e.stopPropagation()}
                        style={{
                            background: 'var(--surface, #ffffff)',
                            border: '1px solid var(--border, #e2e8f0)',
                            borderRadius: '16px',
                            padding: '2rem',
                            maxWidth: '420px',
                            width: '90%',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
                        }}
                    >
                        <div style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '1rem' }}>⚠️</div>
                        <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.15rem', fontWeight: 700, textAlign: 'center' }}>
                            Start Afresh?
                        </h3>
                        <p style={{ margin: '0 0 1.5rem', fontSize: '0.9rem', color: 'var(--text-muted, #64748b)', textAlign: 'center', lineHeight: 1.6 }}>
                            This will permanently erase <strong>all your CV data</strong> — personal info, education, experience, skills, and everything else. This cannot be undone.
                        </p>
                        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                            <button
                                onClick={() => setShowResetConfirm(false)}
                                style={{
                                    flex: 1, padding: '0.65rem 1rem', borderRadius: '8px',
                                    border: '1px solid var(--border, #e2e8f0)', background: 'transparent',
                                    cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem',
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    resetCV();
                                    setShowResetConfirm(false);
                                    setActiveForm('personal');
                                }}
                                style={{
                                    flex: 1, padding: '0.65rem 1rem', borderRadius: '8px',
                                    border: 'none', background: '#ef4444', color: '#fff',
                                    cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem',
                                }}
                            >
                                Yes, Start Afresh
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Main Body ── */}
            <div className="editor-body">

                {/* ── Left Panel: Sidebar ── */}
                <aside className="editor-sidebar">

                    {/* Settings Strip */}
                    <div className="sidebar-group">
                        <div className="template-selector">
                            <button
                                className="template-trigger"
                                onClick={() => setShowTemplates(!showTemplates)}
                            >
                                <span className="template-preview-icon">{currentTemplate?.preview || '📄'}</span>
                                <div className="template-info">
                                    <span className="template-name">{currentTemplate?.name || 'Select Template'}</span>
                                    {currentTemplate?.premium && (
                                        <span className="premium-tag"><Crown size={12} /> Premium</span>
                                    )}
                                </div>
                                <ChevronDown size={16} className={showTemplates ? 'rotated' : ''} />
                            </button>

                            {showTemplates && (
                                <div className="template-dropdown">
                                    <div className="template-group">
                                        <span className="group-label">Free Templates</span>
                                        {freeTemplates.map(t => (
                                            <button
                                                key={t.id}
                                                className={`template-option ${settings.template === t.id ? 'active' : ''}`}
                                                onClick={() => handleTemplateSelect(t.id)}
                                            >
                                                <span className="template-preview-icon">{t.preview}</span>
                                                <div className="template-option-info">
                                                    <div className="template-name-row">
                                                        <span>{t.name}</span>
                                                        {t.canExport && <span className="export-badge">PDF/PNG</span>}
                                                    </div>
                                                    <span className="template-desc">{t.description}</span>
                                                </div>
                                                {settings.template === t.id && <Check size={16} />}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="template-group">
                                        <span className="group-label"><Crown size={12} /> Premium Templates</span>
                                        {premiumTemplates.map(t => (
                                            <button
                                                key={t.id}
                                                className={`template-option ${settings.template === t.id ? 'active' : ''} ${!premiumUnlocked ? 'locked' : ''}`}
                                                onClick={() => handleTemplateSelect(t.id)}
                                            >
                                                <span className="template-preview-icon">{t.preview}</span>
                                                <div className="template-option-info">
                                                    <div className="template-name-row">
                                                        <span>{t.name}</span>
                                                        {t.canExport && <span className="export-badge">PDF/PNG</span>}
                                                    </div>
                                                    <span className="template-desc">{t.description}</span>
                                                </div>
                                                {!premiumUnlocked ? <Lock size={16} /> : settings.template === t.id && <Check size={16} />}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="settings-row">
                            <div className="color-picker" title="Accent Color">
                                <Palette size={16} />
                                <input
                                    type="color"
                                    value={settings.accentColor}
                                    onChange={(e) => updateSettings({ accentColor: e.target.value })}
                                />
                            </div>
                            <select
                                value={settings.industry}
                                onChange={(e) => updateSettings({ industry: e.target.value })}
                                className="industry-select"
                                title="Industry Theme"
                            >
                                {Object.entries(industryThemes).map(([key, value]) => (
                                    <option key={key} value={key}>{value.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="editor-nav">
                        <span className="nav-label">Core Sections</span>
                        {coreFormSections.map(s => (
                            <button
                                key={s.id}
                                className={`nav-btn ${activeForm === s.id ? 'active' : ''}`}
                                onClick={() => setActiveForm(s.id)}
                            >
                                {s.icon}
                                <span>{s.label}</span>
                                {cvSectionComplete(s.id, cvData) &&
                                    <CheckCircle size={14} className="completion-dot" />}
                            </button>
                        ))}

                        <span className="nav-label" style={{ marginTop: '1rem' }}>Additional</span>
                        {extraFormSections.map(s => (
                            <button
                                key={s.id}
                                className={`nav-btn ${activeForm === s.id ? 'active' : ''}`}
                                onClick={() => setActiveForm(s.id)}
                            >
                                {s.icon}
                                <span>{s.label}</span>
                                {cvSectionComplete(s.id, cvData) &&
                                    <CheckCircle size={14} className="completion-dot" />}
                            </button>
                        ))}
                    </nav>

                    {/* Active Form Area */}
                    <div className="active-form-container">
                        {activeForm === 'personal' && <PersonalInfoForm />}
                        {activeForm === 'education' && <EducationForm />}
                        {activeForm === 'experience' && <ExperienceForm />}
                        {activeForm === 'skills' && <SkillsForm />}
                        {activeForm === 'projects' && <ProjectsForm />}
                        {activeForm === 'certifications' && <CertificationsForm />}
                        {activeForm === 'languages' && <LanguagesForm />}
                        {activeForm === 'achievements' && <AchievementsForm />}
                        {activeForm === 'volunteer' && <VolunteerForm />}
                        {activeForm === 'references' && <ReferencesForm />}

                        {/* Next Button */}
                        {nextSection && (
                            <button
                                className="next-section-btn"
                                onClick={() => setActiveForm(nextSection.id)}
                            >
                                Next: {nextSection.label} →
                            </button>
                        )}

                        {/* ATS Tips */}
                        {atsScore.issues.length > 0 && (
                            <div className="ats-tips-box">
                                <div className="ats-tips-header">
                                    <AlertCircle size={14} />
                                    <span>Improve Score</span>
                                </div>
                                <ul>
                                    {atsScore.issues.slice(0, 3).map((issue, i) => (
                                        <li key={i}>{issue}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </aside>

                {/* ── Right Panel: Preview ── */}
                <main className="editor-preview-area">
                    <div className="preview-header-label">
                        {currentTemplate?.name} Preview
                    </div>
                    <div className="preview-scroll-container">
                        <div
                            className="cv-paper"
                            ref={cvRef}
                            style={{
                                '--accent': settings.accentColor,
                                '--theme-primary': theme.primary,
                                '--theme-bg': theme.bg,
                                '--theme-text': theme.text
                            }}
                        >
                            <TemplateComponent
                                data={cvData}
                                accentColor={settings.accentColor}
                            />
                        </div>
                    </div>
                </main>
            </div>

            {/* Premium Modal */}
            {showPremiumModal && (
                <div className="modal-overlay" onClick={() => setShowPremiumModal(false)}>
                    <div className="premium-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="premium-header">
                            <Crown size={32} />
                            <h2>Unlock Premium Templates</h2>
                            <p>Get access to all exclusive professional templates</p>
                        </div>

                        <div className="premium-features">
                            {premiumTemplates.map(t => (
                                <div key={t.id} className="premium-feature">
                                    <Check size={18} />
                                    <span>{t.name} Template</span>
                                </div>
                            ))}
                        </div>

                        <div className="premium-actions">
                            <button
                                className="btn-unlock"
                                onClick={() => {
                                    unlockPremium();
                                    setShowPremiumModal(false);
                                }}
                            >
                                <Crown size={18} />
                                Unlock All Templates (Demo)
                            </button>
                            <button
                                className="btn-cancel"
                                onClick={() => setShowPremiumModal(false)}
                            >
                                Maybe Later
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

/* helper: mark a CV section done */
function cvSectionComplete(id, cvData) {
    const d = cvData;
    switch (id) {
        case 'personal': return !!(d.personalInfo?.fullName && d.personalInfo?.email);
        case 'education': return d.education?.length >= 1;
        case 'experience': return d.experience?.length >= 1;
        case 'skills': return d.skills?.technical?.length >= 2 || d.skills?.soft?.length >= 2;
        case 'projects': return d.projects?.length >= 1;
        case 'certifications': return d.certifications?.length >= 1;
        case 'languages': return d.languages?.length >= 1;
        case 'achievements': return d.achievements?.length >= 1;
        case 'volunteer': return d.volunteer?.length >= 1;
        case 'references': return d.personalInfo?.referencesOnRequest === true;
        default: return false;
    }
}
