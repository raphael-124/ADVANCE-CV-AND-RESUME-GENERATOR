import { useResume } from '../../context/ResumeContext';
import { User, Phone, Mail, MapPin, Linkedin, Globe } from 'lucide-react';
import './ResumeForms.css';

export default function ResumePersonalForm() {
    const { resumeData, updatePersonalInfo } = useResume();
    const p = resumeData.personalInfo;

    const field = (id, label, type, placeholder, Icon) => (
        <div className="rf-group">
            <label htmlFor={id}>{label}</label>
            <div className="rf-icon-input">
                <Icon size={15} />
                <input
                    id={id}
                    type={type}
                    value={p[id] || ''}
                    onChange={e => updatePersonalInfo(id, e.target.value)}
                    placeholder={placeholder}
                />
            </div>
        </div>
    );

    return (
        <div className="rf-section">
            <h3 className="rf-title"><User size={20} /> Personal Information</h3>

            {/* Full name — always full width */}
            <div className="rf-group" style={{ marginBottom: '1rem' }}>
                <label htmlFor="fullName">Full Name *</label>
                <input
                    id="fullName"
                    type="text"
                    value={p.fullName}
                    onChange={e => updatePersonalInfo('fullName', e.target.value)}
                    placeholder="e.g. Adebanjo Hephzibah"
                    style={{
                        width: '100%', padding: '0.8rem 1rem', fontSize: '1rem',
                        fontWeight: 600, border: '1.5px solid var(--border-color)',
                        borderRadius: 8, background: 'var(--input-bg)',
                        color: 'var(--text-primary)', fontFamily: 'inherit',
                        boxSizing: 'border-box', transition: 'border-color 0.2s'
                    }}
                />
            </div>

            {/* Two-per-row for short fields (phone + email) */}
            <div className="re-exp-field-row" style={{ marginBottom: '0.75rem' }}>
                {field('phone', 'Phone *', 'tel', '+234 800 000 0000', Phone)}
                {field('email', 'Email *', 'email', 'you@email.com', Mail)}
            </div>

            {/* City — full width */}
            {field('city', 'City & Country', 'text', 'Lagos, Nigeria', MapPin)}

            {/* LinkedIn — full width */}
            <div style={{ marginTop: '0.75rem' }}>
                {field('linkedin', 'LinkedIn (optional)', 'url', 'linkedin.com/in/you', Linkedin)}
            </div>

            {/* Portfolio — full width */}
            <div className="rf-group" style={{ marginTop: '0.75rem' }}>
                <label htmlFor="portfolio">Portfolio / Website (optional)</label>
                <div className="rf-icon-input">
                    <Globe size={15} />
                    <input
                        id="portfolio"
                        type="url"
                        value={p.portfolio || ''}
                        onChange={e => updatePersonalInfo('portfolio', e.target.value)}
                        placeholder="yoursite.com"
                    />
                </div>
            </div>
        </div>
    );
}
