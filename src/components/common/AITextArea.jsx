import React from 'react';
import './AITextArea.css';

/**
 * A wrapper around a textarea or input that adds an AI assistant button.
 * @param {string} value - The text value
 * @param {function} onChange - Standard React onChange handler
 * @param {string} placeholder - Placeholder text
 * @param {string} context - 'summary', 'experience', 'skills', 'general'
 * @param {boolean} multiline - true for textarea, false for input
 */
export default function AITextArea({
    value,
    onChange,
    placeholder,
    context = 'general',
    multiline = true,
    className = '',
    rows = 4
}) {
    return (
        <div className="ai-input-wrapper">
            {multiline ? (
                <textarea
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`ai-target-input ${className}`}
                    rows={rows}
                />
            ) : (
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`ai-target-input ${className}`}
                />
            )}
        </div>
    );
}
