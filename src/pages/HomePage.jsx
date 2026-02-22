import { Link } from 'react-router-dom';
import {
    FileText, ArrowRight, Layout, Download,
    Palette, Zap, ClipboardList, CheckSquare, Target, Clock, ShieldCheck

} from 'lucide-react';
import './HomePage.css';

export default function HomePage() {
    return (
        <div className="home-page">
            {/* Animated Background */}
            <div className="home-bg">
                <div className="home-orb orb-a" />
                <div className="home-orb orb-b" />
                <div className="home-orb orb-c" />
                <div className="home-grid-pattern" />
            </div>

            {/* Hero Section */}
            <section className="home-hero">
                <div className="home-hero-content">
                    <div className="home-badge">
                        <ShieldCheck size={14} />
                        <span>Professional Tools Suite</span>
                    </div>


                    <h1>
                        Build Your Professional
                        <span className="home-gradient-text"> Presence</span>
                    </h1>

                    <p className="home-subtitle">
                        Create stunning CVs and clean, focused resumes that get you hired.
                        Choose a tool and start building in minutes — no account needed.
                    </p>
                </div>
            </section>

            {/* Product Cards */}
            <section className="home-products">
                <div className="product-cards-container">

                    {/* CV Generator Card */}
                    <div className="product-card cv-card">
                        <div className="product-card-glow cv-glow" />
                        <div className="product-card-content">
                            <div className="product-icon-wrapper cv-icon-bg">
                                <FileText size={32} />
                            </div>
                            <div className="product-label">Tool 01</div>
                            <h2>CV Generator</h2>
                            <p className="product-desc">
                                Create comprehensive, ATS-optimized CVs with beautiful templates,
                                professional guidance, and instant multi-format export. Ideal for detailed applications.
                            </p>


                            <div className="product-features">
                                <div className="product-feature">
                                    <Layout size={14} />
                                    <span>12 Templates</span>
                                </div>
                                <div className="product-feature">
                                    <Palette size={14} />
                                    <span>Color Themes</span>
                                </div>
                                <div className="product-feature">
                                    <Zap size={14} />
                                    <span>ATS Score</span>
                                </div>
                                <div className="product-feature">
                                    <Download size={14} />
                                    <span>PDF / PNG</span>
                                </div>
                            </div>

                            <Link to="/cv" className="product-cta cv-cta">
                                <span>Start Building CV</span>
                                <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>

                    {/* Resume Builder Card */}
                    <div className="product-card resume-card">
                        <div className="product-card-glow resume-glow" />
                        <div className="product-card-content">
                            <div className="product-icon-wrapper resume-icon-bg">
                                <ClipboardList size={32} />
                            </div>
                            <div className="product-label">Tool 02</div>
                            <h2>Resume Builder</h2>
                            <p className="product-desc">
                                Build a clear, concise, one-page resume fast. Guided sections,
                                bullet-point achievements, and a clean ATS-friendly layout. Perfect for job applications.
                            </p>

                            <div className="product-features">
                                <div className="product-feature">
                                    <CheckSquare size={14} />
                                    <span>Guided Sections</span>
                                </div>
                                <div className="product-feature">
                                    <Target size={14} />
                                    <span>ATS-Friendly</span>
                                </div>
                                <div className="product-feature">
                                    <Clock size={14} />
                                    <span>Build in Minutes</span>
                                </div>
                                <div className="product-feature">
                                    <Download size={14} />
                                    <span>Download PDF</span>
                                </div>
                            </div>

                            <Link to="/resume" className="product-cta resume-cta">
                                <span>Build My Resume</span>
                                <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>

                </div>
            </section>

            {/* Stats */}
            <section className="home-stats">
                <div className="home-stat">
                    <span className="home-stat-value">2</span>
                    <span className="home-stat-label">Pro Tools</span>
                </div>
                <div className="home-stat-divider" />
                <div className="home-stat">
                    <span className="home-stat-value">12+</span>
                    <span className="home-stat-label">CV Templates</span>
                </div>
                <div className="home-stat-divider" />
                <div className="home-stat">
                    <span className="home-stat-value">PDF+PNG</span>
                    <span className="home-stat-label">Export Formats</span>
                </div>
                <div className="home-stat-divider" />
                <div className="home-stat">
                    <span className="home-stat-value">∞</span>
                    <span className="home-stat-label">Downloads</span>
                </div>
            </section>

            {/* Footer */}
            <footer className="home-footer">
                <p>© 2026 CV Generator. Built by Debang</p>
            </footer>
        </div>
    );
}
