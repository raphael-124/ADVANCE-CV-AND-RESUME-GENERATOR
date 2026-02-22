import { useCV } from '../../context/CVContext';
import { User, Mail, Phone, MapPin, Linkedin, Globe, Github } from 'lucide-react';
import AITextArea from '../common/AITextArea';
import './Forms.css';

export default function PersonalInfoForm() {
    const { cvData, updatePersonalInfo } = useCV();
    const { personalInfo } = cvData;

    return (
        <div className="form-section">
            <h3 className="form-title">
                <User size={20} />
                Personal Information
            </h3>

            <div className="form-grid">
                <div className="form-group">
                    <label htmlFor="fullName">Full Name *</label>
                    <div className="input-with-icon">
                        <User size={16} />
                        <input
                            type="text"
                            id="fullName"
                            value={personalInfo.fullName}
                            onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                            placeholder="John Doe"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <div className="input-with-icon">
                        <Mail size={16} />
                        <input
                            type="email"
                            id="email"
                            value={personalInfo.email}
                            onChange={(e) => updatePersonalInfo('email', e.target.value)}
                            placeholder="john@example.com"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <div className="input-with-icon">
                        <Phone size={16} />
                        <input
                            type="tel"
                            id="phone"
                            value={personalInfo.phone}
                            onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                            placeholder="+1 (555) 123-4567"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <div className="input-with-icon">
                        <MapPin size={16} />
                        <input
                            type="text"
                            id="location"
                            value={personalInfo.location}
                            onChange={(e) => updatePersonalInfo('location', e.target.value)}
                            placeholder="New York, NY"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="linkedin">LinkedIn</label>
                    <div className="input-with-icon">
                        <Linkedin size={16} />
                        <input
                            type="url"
                            id="linkedin"
                            value={personalInfo.linkedin}
                            onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                            placeholder="linkedin.com/in/johndoe"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="portfolio">Portfolio / Website</label>
                    <div className="input-with-icon">
                        <Globe size={16} />
                        <input
                            type="url"
                            id="portfolio"
                            value={personalInfo.portfolio}
                            onChange={(e) => updatePersonalInfo('portfolio', e.target.value)}
                            placeholder="johndoe.com"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="github">GitHub</label>
                    <div className="input-with-icon">
                        <Github size={16} />
                        <input
                            type="url"
                            id="github"
                            value={personalInfo.github || ''}
                            onChange={(e) => updatePersonalInfo('github', e.target.value)}
                            placeholder="github.com/johndoe"
                        />
                    </div>
                </div>
            </div>

            <div className="form-group full-width">
                <label htmlFor="summary">Professional Summary</label>
                <AITextArea
                    id="summary"
                    value={personalInfo.summary}
                    onChange={(e) => updatePersonalInfo('summary', e.target.value)}
                    placeholder="A passionate software engineer with 5+ years of experience building scalable web applications..."
                    rows={4}
                    context="summary"
                />
                <span className="char-count">{personalInfo.summary?.length || 0} / 500 characters</span>
            </div>
        </div>
    );
}
