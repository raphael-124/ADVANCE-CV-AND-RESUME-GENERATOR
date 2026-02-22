import { useResume } from '../../context/ResumeContext';
import { AlignLeft, Lightbulb } from 'lucide-react';
import AITextArea from '../common/AITextArea';
import './ResumeForms.css';

const TIPS = [
    'Start with: "Results-driven [your role] with X years of experience in…"',
    'Mention your top 2–3 skills relevant to the job.',
    'End with your career goal or the type of role you are targeting.',
    'Keep it to 2–3 sentences — recruiters read summaries in under 10 seconds.',
];

export default function ResumeSummaryForm() {
    const { resumeData, updateSummary } = useResume();
    const summary = resumeData.summary;
    const MAX_WORDS = 500;

    const countWords = (text) => text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const wordCount = countWords(summary);
    const wordsLeft = MAX_WORDS - wordCount;
    const isNearLimit = wordCount > MAX_WORDS * 0.9;
    const isAtLimit = wordCount >= MAX_WORDS;

    const handleChange = (e) => {
        const text = e.target.value;
        if (countWords(text) <= MAX_WORDS) {
            updateSummary(text);
        }
    };

    return (
        <div className="rf-section">
            <h3 className="rf-title"><AlignLeft size={20} /> Professional Summary / Objective</h3>

            <div className="rf-tip">
                <Lightbulb size={15} />
                <span>Write 2–3 sentences: who you are, your key skills, and the type of job you want.</span>
            </div>

            <div className="rf-group full">
                <label htmlFor="summary">Summary *</label>
                <AITextArea
                    id="summary"
                    value={summary}
                    onChange={handleChange}
                    placeholder={`e.g. Results-driven software engineer with 3 years of experience building web applications. Skilled in React, Node.js and REST APIs. Seeking a front-end role at a product-driven company.`}
                    rows={5}
                    context="summary"
                />
                <span className="rf-char-count" style={{ color: isAtLimit ? '#ef4444' : isNearLimit ? '#f59e0b' : undefined }}>
                    {wordCount} / {MAX_WORDS} words {isAtLimit ? '— limit reached' : wordsLeft <= 50 ? `(${wordsLeft} left)` : ''}
                </span>
            </div>

            <div style={{ marginTop: '1.25rem' }}>
                <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.6rem' }}>
                    💡 Quick-start templates — click to use:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {TIPS.map((tip, i) => (
                        <div
                            key={i}
                            style={{
                                padding: '0.5rem 0.75rem',
                                background: 'var(--card-bg-secondary)',
                                borderRadius: 8,
                                fontSize: '0.78rem',
                                color: 'var(--text-secondary)',
                                border: '1px solid var(--border-color)',
                                cursor: 'pointer',
                                transition: 'border-color 0.2s'
                            }}
                            onClick={() => updateSummary(tip)}
                            onMouseEnter={e => e.currentTarget.style.borderColor = '#14b8a6'}
                            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
                        >
                            {tip}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
