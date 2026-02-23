import { Link } from 'react-router-dom';
import { FileText, Zap, Download, Palette, Shield, CheckCircle, ArrowLeft } from 'lucide-react';
import './LandingPage.css';

export default function LandingPage() {

    const features = [
        { icon: <Palette size={24} />, title: 'Smart Color Themes', desc: 'Industry-specific palettes that match your profession' },
        { icon: <FileText size={24} />, title: '8 Pro Templates', desc: '3 free + 5 premium uniquely designed templates' },
        { icon: <Zap size={24} />, title: 'ATS Optimized', desc: 'Real-time score checking for applicant tracking systems' },
        { icon: <Download size={24} />, title: 'Multi-Export', desc: 'Download as PDF, PNG, or print directly' },
        { icon: <Shield size={24} />, title: 'Local Storage', desc: 'Your data stays on your device, always private' },
        { icon: <CheckCircle size={24} />, title: 'Pro Guidance', desc: 'Expert structure and tips as you write' }

    ];

    return (
        <div className="landing-page">
            {/* Back to Home */}
            <Link to="/" className="back-home-link">
                <ArrowLeft size={16} />
                <span>Back to Home</span>
            </Link>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-bg">
                    <div className="gradient-orb orb-1" />
                    <div className="gradient-orb orb-2" />
                    <div className="gradient-orb orb-3" />
                </div>

                <div className="hero-content">
                    <div className="badge">
                        <FileText size={14} />
                        <span>Professional CV Generator</span>
                    </div>


                    <h1>
                        Create Your <span className="gradient-text">Stand-Out CV</span> in Minutes
                    </h1>

                    <p className="hero-subtitle">
                        Beautiful templates, real-time feedback, and instant export.
                        Build a professional CV that gets you noticed.
                    </p>


                    <div className="hero-actions">
                        <Link to="/editor" className="btn-primary">
                            <FileText size={20} />
                            Start Writing Your CV
                        </Link>
                    </div>

                    <div className="hero-stats">
                        <div className="stat">
                            <span className="stat-value">8</span>
                            <span className="stat-label">Templates</span>
                        </div>
                        <div className="divider" />
                        <div className="stat">
                            <span className="stat-value">100%</span>
                            <span className="stat-label">Free Core</span>
                        </div>
                        <div className="divider" />
                        <div className="stat">
                            <span className="stat-value">∞</span>
                            <span className="stat-label">Downloads</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features">
                <h2>Everything You Need</h2>
                <p className="section-subtitle">
                    Packed with features to make your CV creation seamless
                </p>

                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card" style={{ '--delay': `${index * 0.1}s` }}>
                            <div className="feature-icon">{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Templates Preview */}
            <section className="templates-preview">
                <h2>Choose Your Style</h2>
                <p className="section-subtitle">
                    From minimalist to creative, we have the perfect template for you
                </p>

                <div className="template-showcase">
                    <div className="template-card free">
                        <span className="template-badge">Free</span>
                        <div className="template-preview modern-preview" />
                        <h4>Modern</h4>
                    </div>
                    <div className="template-card free">
                        <span className="template-badge">Free</span>
                        <div className="template-preview classic-preview" />
                        <h4>Classic</h4>
                    </div>
                    <div className="template-card free">
                        <span className="template-badge">Free</span>
                        <div className="template-preview simple-preview" />
                        <h4>Simple</h4>
                    </div>
                    <div className="template-card premium">
                        <span className="template-badge premium">Premium</span>
                        <div className="template-preview tech-preview" />
                        <h4>Tech</h4>
                    </div>
                    <div className="template-card premium">
                        <span className="template-badge premium">Premium</span>
                        <div className="template-preview creative-preview" />
                        <h4>Creative</h4>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta">
                <div className="cta-content">
                    <h2>Ready to Build Your Professional CV?</h2>
                    <p>Join thousands who have already created stunning CVs</p>
                    <Link to="/editor" className="btn-primary large">
                        Get Started Free
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <p>© 2026 CV Generator. Built by Debang</p>
                </div>
            </footer>
        </div>
    );
}
