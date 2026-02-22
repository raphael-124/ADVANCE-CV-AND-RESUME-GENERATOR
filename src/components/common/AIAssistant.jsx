
import React, { useState } from 'react';
import { Sparkles, X, Check, ArrowRight, Wand2, Loader2 } from 'lucide-react';
import { improveText, generateText, getApiKey, setApiKey } from '../../services/aiService';
import './AIAssistant.css';

export default function AIAssistant({ initialText = '', onApply, onClose, context = 'general' }) {
    const [mode, setMode] = useState(initialText ? 'improve' : 'generate'); // 'improve' or 'generate'
    const [inputText, setInputText] = useState(initialText);
    const [keywords, setKeywords] = useState('');
    const [generatedText, setGeneratedText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [apiKeyInput, setApiKeyInput] = useState('');
    const [showKeyInput, setShowKeyInput] = useState(!getApiKey());

    // Preset instructions for improvement
    const improveOptions = [
        "Make it more professional",
        "Fix grammar & spelling",
        "Make it more impactful",
        "Shorten it",
        "Expand it"
    ];

    const handleSaveKey = () => {
        if (apiKeyInput.trim()) {
            setApiKey(apiKeyInput.trim());
            setShowKeyInput(false);
            setError('');
        }
    };

    const handleImprove = async (instruction) => {
        setIsLoading(true);
        setError('');
        try {
            const result = await improveText(inputText, instruction);
            setGeneratedText(result);
        } catch (err) {
            setError(err.message || "Failed to generate text");
            if (err.message.includes("API Key")) setShowKeyInput(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGenerate = async () => {
        if (!keywords.trim()) return;
        setIsLoading(true);
        setError('');
        try {
            const result = await generateText(keywords, context);
            setGeneratedText(result);
        } catch (err) {
            setError(err.message || "Failed to generate text");
            if (err.message.includes("API Key")) setShowKeyInput(true);
        } finally {
            setIsLoading(false);
        }
    };

    if (showKeyInput) {
        return (
            <div className="ai-modal-overlay">
                <div className="ai-modal">
                    <div className="ai-header">
                        <h3><Sparkles size={18} className="ai-icon-pulse" /> AI Setup</h3>
                        <button onClick={onClose} className="ai-close-btn"><X size={18} /></button>
                    </div>
                    <div className="ai-body">
                        <p className="ai-desc">Enter your OpenAI API Key to unlock magical suggestions.</p>
                        <input
                            type="password"
                            placeholder="sk-..."
                            value={apiKeyInput}
                            onChange={(e) => setApiKeyInput(e.target.value)}
                            className="ai-input"
                        />
                        {error && <div className="ai-error">{error}</div>}
                        <button onClick={handleSaveKey} className="ai-primary-btn">Save Key</button>
                        <p className="ai-note">Your key is stored locally in your browser.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="ai-modal-overlay">
            <div className="ai-modal">
                <div className="ai-header">
                    <div className="ai-tabs">
                        <button
                            className={`ai-tab ${mode === 'improve' ? 'active' : ''}`}
                            onClick={() => setMode('improve')}
                        >
                            <Wand2 size={16} /> Improve Text
                        </button>
                        <button
                            className={`ai-tab ${mode === 'generate' ? 'active' : ''}`}
                            onClick={() => setMode('generate')}
                        >
                            <Sparkles size={16} /> Generate New
                        </button>
                    </div>
                    <button onClick={onClose} className="ai-close-btn"><X size={18} /></button>
                </div>

                <div className="ai-body">
                    {mode === 'improve' ? (
                        <>
                            <textarea
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                className="ai-textarea"
                                placeholder="Enter text to improve..."
                            />
                            <div className="ai-options">
                                {improveOptions.map(opt => (
                                    <button
                                        key={opt}
                                        onClick={() => handleImprove(opt)}
                                        disabled={isLoading || !inputText}
                                        className="ai-option-chip"
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            <p className="ai-label">What should this section cover?</p>
                            <div className="ai-generate-row">
                                <input
                                    value={keywords}
                                    onChange={(e) => setKeywords(e.target.value)}
                                    className="ai-input"
                                    placeholder="e.g. Project Manager, led team of 5, agile methodology..."
                                    onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                                />
                                <button
                                    onClick={handleGenerate}
                                    disabled={isLoading || !keywords}
                                    className="ai-go-btn"
                                >
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        </>
                    )}

                    {isLoading && (
                        <div className="ai-loading">
                            <Loader2 size={24} className="spin" />
                            <span>Working magic...</span>
                        </div>
                    )}

                    {error && <div className="ai-error">{error}</div>}

                    {generatedText && (
                        <div className="ai-result-section">
                            <div className="ai-result-header">
                                <span>Suggestion</span>
                            </div>
                            <div className="ai-result-box">
                                {generatedText}
                            </div>
                            <div className="ai-actions">
                                <button onClick={() => setGeneratedText('')} className="ai-secondary-btn">Discard</button>
                                <button onClick={() => onApply(generatedText)} className="ai-primary-btn">
                                    <Check size={16} /> Apply
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
