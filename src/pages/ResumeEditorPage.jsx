import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import {
    ArrowLeft, Download, FileDown, RotateCcw,
    User, AlignLeft, Zap, Briefcase, GraduationCap, FolderGit2,
    CheckCircle, Layout, ChevronDown, ChevronUp, Sun, Moon
} from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { exportResumeToDocx } from '../utils/exportResumeDocx';
import ResumePersonalForm from '../components/resume-forms/ResumePersonalForm';
import ResumeSummaryForm from '../components/resume-forms/ResumeSummaryForm';
import ResumeSkillsForm from '../components/resume-forms/ResumeSkillsForm';
import ResumeExperienceForm from '../components/resume-forms/ResumeExperienceForm';
import ResumeEducationForm from '../components/resume-forms/ResumeEducationForm';
import ResumeProjectsForm from '../components/resume-forms/ResumeProjectsForm';
import ResumeTemplate from '../components/resume-template/ResumeTemplate';
import './ResumeEditorPage.css';

const SECTIONS = [
    { id: 'personal', label: 'Personal Info', icon: <User size={16} /> },
    { id: 'summary', label: 'Summary', icon: <AlignLeft size={16} /> },
    { id: 'skills', label: 'Skills', icon: <Zap size={16} /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase size={16} /> },
    { id: 'education', label: 'Education', icon: <GraduationCap size={16} /> },
    { id: 'projects', label: 'Projects', icon: <FolderGit2 size={16} /> },
];

const TEMPLATES = [
    {
        id: 'chronological',
        label: 'Chronological',
        emoji: '📋',
        tag: 'Most Popular',
        tagColor: '#10b981',
        best: 'People with work experience',
        desc: 'Classic layout: Header → Summary → Skills → Experience → Education',
    },
    {
        id: 'functional',
        label: 'Functional',
        emoji: '🎯',
        tag: 'Skills-First',
        tagColor: '#0d9488',
        best: 'Beginners & career changers',
        desc: 'Focuses on skills over job history. Header → Summary → Skills → Projects → Education',
    },
    {
        id: 'combination',
        label: 'Combination',
        emoji: '🔀',
        tag: 'Balanced',
        tagColor: '#3b82f6',
        best: 'Some experience + strong skills',
        desc: 'Mix of skills and experience. Header → Summary → Skills → Experience → Education',
    },
    {
        id: 'student',
        label: 'Student / Entry-Level',
        emoji: '🎓',
        tag: 'Academia',
        tagColor: '#7c3aed',
        best: 'Students & fresh graduates',
        desc: 'Education first. Header → Objective → Skills → Education → Projects → Internships',
    },
    {
        id: 'creative',
        label: 'Creative',
        emoji: '🎨',
        tag: 'Visual',
        tagColor: '#ec4899',
        best: 'Designers, artists, media roles',
        desc: 'Two-column layout with sidebar. Not recommended for corporate/ATS systems.',
    },
    {
        id: 'technical',
        label: 'Technical',
        emoji: '💻',
        tag: 'Dev / IT',
        tagColor: '#22d3ee',
        best: 'IT, engineering, programming',
        desc: 'Tech-skills first with code-style formatting. GitHub & portfolio highlighted.',
    },
];

export default function ResumeEditorPage() {
    const { resumeData, resumeTemplate, setResumeTemplate, getCompletionScore, resetResume } = useResume();
    const [activeSection, setActiveSection] = useState('personal');
    const [showReset, setShowReset] = useState(false);
    const [showTemplatePicker, setShowTemplatePicker] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [exportStatus, setExportStatus] = useState('');
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('resumeDarkMode') === 'true';
    });
    const previewRef = useRef(null);

    const toggleDarkMode = () => {
        setDarkMode(prev => {
            const newVal = !prev;
            localStorage.setItem('resumeDarkMode', newVal);
            return newVal;
        });
    };

    // Real PDF export using html2canvas + jsPDF
    const handleExportPDF = async () => {
        const element = previewRef.current;
        if (!element) {
            alert('Error: Resume preview not found');
            return;
        }

        setIsExporting(true);
        setExportStatus('Generating PDF...');

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

            // Create PDF with dynamic height to match content exactly
            const pdfWidth = 210; // Standard A4 width in mm
            const imgHeightMm = (canvas.height / canvas.width) * pdfWidth;

            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: [pdfWidth, imgHeightMm],
            });

            const imgData = canvas.toDataURL('image/png', 1.0);
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeightMm);


            const fileName = `${resumeData.personalInfo.fullName || 'Resume'}_Resume.pdf`;
            pdf.save(fileName);

            setExportStatus('PDF downloaded!');
            setTimeout(() => setExportStatus(''), 2500);
        } catch (error) {
            console.error('PDF Export Error:', error);
            alert(`PDF export failed: ${error.message}`);
            setExportStatus('');
        } finally {
            setIsExporting(false);
        }
    };

    // Word (.docx) Export
    const handleExportDocx = async () => {
        setIsExporting(true);
        setExportStatus('Generating Word document...');
        try {
            await exportResumeToDocx(
                resumeData,
                '#0d9488',
                resumeData.personalInfo.fullName || 'Resume'
            );
            setExportStatus('Word downloaded!');
            setTimeout(() => setExportStatus(''), 2500);
        } catch (err) {
            console.error('DOCX Export Error:', err);
            alert('Word export failed: ' + err.message);
            setExportStatus('');
        } finally {
            setIsExporting(false);
        }
    };

    const score = getCompletionScore();
    const scoreColor = score >= 80 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444';
    const scoreLabel = score >= 80 ? 'Great!' : score >= 50 ? 'Keep going' : 'Just started';

    const handleReset = () => {
        resetResume();
        setShowReset(false);
        setActiveSection('personal');
    };

    const activeTpl = TEMPLATES.find(t => t.id === resumeTemplate) || TEMPLATES[0];

    return (
        <div className={`re-page ${darkMode ? 'dark-mode' : ''}`}>
            {/* ── Top Bar ── */}
            <header className="re-topbar">
                <Link to="/" className="re-back">
                    <ArrowLeft size={18} />
                    <span>Home</span>
                </Link>

                <div className="re-topbar-center">
                    <div className="re-progress-wrap">
                        <div className="re-progress-bar">
                            <div className="re-progress-fill" style={{ width: `${score}%`, background: scoreColor }} />
                        </div>
                        <span className="re-progress-label" style={{ color: scoreColor }}>
                            {score}% — {scoreLabel}
                        </span>
                    </div>
                </div>

                <div className="re-topbar-actions">
                    {exportStatus && (
                        <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 600 }}>
                            {exportStatus}
                        </span>
                    )}
                    <button
                        className="re-btn ghost"
                        onClick={toggleDarkMode}
                        title={darkMode ? 'Light Mode' : 'Dark Mode'}
                    >
                        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                    <div className="re-topbar-divider" />
                    <button className="re-btn ghost" onClick={() => setShowReset(true)} title="Reset resume" disabled={isExporting}>
                        <RotateCcw size={16} /> Reset
                    </button>
                    <button className="re-btn ghost" onClick={handleExportDocx} disabled={isExporting} title="Download Word (.docx)">
                        <FileDown size={16} /> Word
                    </button>
                    <button className="re-btn teal" onClick={handleExportPDF} disabled={isExporting}>
                        <Download size={16} /> {isExporting ? 'Exporting...' : 'Download PDF'}
                    </button>
                </div>
            </header>

            {/* ── Reset Confirm ── */}
            {showReset && (
                <div className="re-overlay" onClick={() => setShowReset(false)}>
                    <div className="re-confirm-modal" onClick={e => e.stopPropagation()}>
                        <h3>Reset resume?</h3>
                        <p>This will clear all your data. This cannot be undone.</p>
                        <div className="re-confirm-actions">
                            <button className="re-btn danger" onClick={handleReset}>Yes, reset</button>
                            <button className="re-btn ghost" onClick={() => setShowReset(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="re-body">
                {/* ── Left: Forms ── */}
                <aside className="re-sidebar">

                    {/* ── Sticky top: Template selector + Nav tabs ── */}
                    <div className="re-sidebar-head">

                        {/* Template Picker Trigger */}
                        <div className="re-template-trigger-wrap">
                            <button
                                className="re-template-trigger"
                                onClick={() => setShowTemplatePicker(v => !v)}
                            >
                                <span className="re-template-emoji">{activeTpl.emoji}</span>
                                <div className="re-template-trigger-info">
                                    <span className="re-template-trigger-label">{activeTpl.label}</span>
                                    <span className="re-template-trigger-sub">Resume Type</span>
                                </div>
                                <Layout size={15} style={{ marginLeft: 'auto', color: '#94a3b8' }} />
                                {showTemplatePicker
                                    ? <ChevronUp size={15} style={{ color: '#94a3b8' }} />
                                    : <ChevronDown size={15} style={{ color: '#94a3b8' }} />
                                }
                            </button>

                            {/* Template Picker Panel — floats, does NOT push nav down */}
                            {showTemplatePicker && (
                                <div className="re-template-picker">
                                    <p className="re-template-picker-hint">Choose a resume type — the layout and section order change automatically.</p>
                                    <div className="re-template-grid">
                                        {TEMPLATES.map(t => (
                                            <button
                                                key={t.id}
                                                className={`re-template-card ${resumeTemplate === t.id ? 'active' : ''}`}
                                                onClick={() => {
                                                    setResumeTemplate(t.id);
                                                    setShowTemplatePicker(false);
                                                }}
                                            >
                                                <div className="re-template-card-top">
                                                    <span className="re-template-card-emoji">{t.emoji}</span>
                                                    <span
                                                        className="re-template-card-tag"
                                                        style={{ background: t.tagColor + '22', color: t.tagColor }}
                                                    >{t.tag}</span>
                                                </div>
                                                <div className="re-template-card-name">{t.label}</div>
                                                <div className="re-template-card-best">Best for: {t.best}</div>
                                                <div className="re-template-card-desc">{t.desc}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Section Nav — always visible, horizontal icon tabs */}
                        <nav className="re-nav">
                            {SECTIONS.map(s => (
                                <button
                                    key={s.id}
                                    className={`re-nav-btn ${activeSection === s.id ? 'active' : ''}`}
                                    onClick={() => setActiveSection(s.id)}
                                    title={s.label}
                                >
                                    {s.icon}
                                    <span className="re-nav-label">{s.label}</span>
                                    {isComplete(s.id, resumeData) && (
                                        <CheckCircle size={11} className="re-complete-dot" />
                                    )}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Active Form */}
                    <div className="re-form-container">
                        {activeSection === 'personal' && <ResumePersonalForm />}
                        {activeSection === 'summary' && <ResumeSummaryForm />}
                        {activeSection === 'skills' && <ResumeSkillsForm />}
                        {activeSection === 'experience' && <ResumeExperienceForm />}
                        {activeSection === 'education' && <ResumeEducationForm />}
                        {activeSection === 'projects' && <ResumeProjectsForm />}

                        {activeSection !== 'projects' && (
                            <button
                                className="re-next-btn"
                                onClick={() => {
                                    const idx = SECTIONS.findIndex(s => s.id === activeSection);
                                    if (idx < SECTIONS.length - 1) setActiveSection(SECTIONS[idx + 1].id);
                                }}
                            >
                                Next: {SECTIONS[SECTIONS.findIndex(s => s.id === activeSection) + 1]?.label} →
                            </button>
                        )}
                    </div>
                </aside>

                {/* ── Right: Preview ── */}
                <main className="re-preview-panel">
                    <div className="re-preview-label">
                        <span>{activeTpl.emoji} {activeTpl.label} Resume — Live Preview</span>
                    </div>
                    <div className="re-preview-scroll">
                        <div className="re-preview-paper" ref={previewRef}>
                            <ResumeTemplate data={resumeData} type={resumeTemplate} />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

function isComplete(id, data) {
    switch (id) {
        case 'personal': return !!(data.personalInfo.fullName && data.personalInfo.email);
        case 'summary': return !!data.summary;
        case 'skills': return data.skills.length >= 3;
        case 'experience': return data.experience.length >= 1;
        case 'education': return data.education.length >= 1;
        case 'projects': return data.projects.length >= 1;
        default: return false;
    }
}
