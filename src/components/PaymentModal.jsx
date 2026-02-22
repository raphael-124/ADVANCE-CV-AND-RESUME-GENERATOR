import { useState } from 'react';
import { CreditCard, Lock, Check, X, Sparkles } from 'lucide-react';
import './PaymentModal.css';

export default function PaymentModal({ onSuccess, onClose, templateName }) {
    const [step, setStep] = useState('form'); // form | processing | success
    const [card, setCard] = useState({ number: '', expiry: '', cvv: '', name: '' });
    const [errors, setErrors] = useState({});

    const formatCardNumber = (val) => {
        const cleaned = val.replace(/\D/g, '').slice(0, 16);
        return cleaned.replace(/(.{4})/g, '$1 ').trim();
    };

    const formatExpiry = (val) => {
        const cleaned = val.replace(/\D/g, '').slice(0, 4);
        if (cleaned.length > 2) return cleaned.slice(0, 2) + '/' + cleaned.slice(2);
        return cleaned;
    };

    const validate = () => {
        const errs = {};
        if (card.number.replace(/\s/g, '').length < 16) errs.number = 'Enter 16-digit card number';
        if (card.expiry.length < 5) errs.expiry = 'Enter valid expiry';
        if (card.cvv.length < 3) errs.cvv = 'Enter 3-digit CVV';
        if (!card.name.trim()) errs.name = 'Enter cardholder name';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handlePay = () => {
        if (!validate()) return;
        setStep('processing');
        // Simulate payment processing
        setTimeout(() => {
            setStep('success');
            setTimeout(() => onSuccess(), 1500);
        }, 2000);
    };

    return (
        <div className="payment-overlay" onClick={onClose}>
            <div className="payment-modal" onClick={e => e.stopPropagation()}>
                <button className="payment-close" onClick={onClose}><X size={18} /></button>

                {step === 'form' && (
                    <>
                        <div className="payment-header">
                            <div className="payment-icon">
                                <CreditCard size={28} />
                            </div>
                            <h2>Unlock Premium</h2>
                            <p>Get access to the <strong>{templateName}</strong> template and all premium features</p>
                            <div className="payment-price">
                                <span className="price-amount">$4.99</span>
                                <span className="price-period">one-time</span>
                            </div>
                        </div>

                        <div className="payment-form">
                            <div className="pay-field">
                                <label>Cardholder Name</label>
                                <input placeholder="John Doe" value={card.name}
                                    onChange={e => setCard(c => ({ ...c, name: e.target.value }))} />
                                {errors.name && <span className="pay-error">{errors.name}</span>}
                            </div>

                            <div className="pay-field">
                                <label>Card Number</label>
                                <div className="card-input-wrapper">
                                    <CreditCard size={16} />
                                    <input placeholder="4242 4242 4242 4242" value={card.number}
                                        onChange={e => setCard(c => ({ ...c, number: formatCardNumber(e.target.value) }))} />
                                </div>
                                {errors.number && <span className="pay-error">{errors.number}</span>}
                            </div>

                            <div className="pay-row">
                                <div className="pay-field">
                                    <label>Expiry</label>
                                    <input placeholder="MM/YY" value={card.expiry}
                                        onChange={e => setCard(c => ({ ...c, expiry: formatExpiry(e.target.value) }))} />
                                    {errors.expiry && <span className="pay-error">{errors.expiry}</span>}
                                </div>
                                <div className="pay-field">
                                    <label>CVV</label>
                                    <input placeholder="123" type="password" maxLength={4} value={card.cvv}
                                        onChange={e => setCard(c => ({ ...c, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))} />
                                    {errors.cvv && <span className="pay-error">{errors.cvv}</span>}
                                </div>
                            </div>

                            <button className="pay-btn" onClick={handlePay}>
                                <Lock size={16} />
                                <span>Pay $4.99</span>
                            </button>

                            <p className="pay-secure">
                                <Lock size={12} />
                                Demo payment — no real charges
                            </p>
                        </div>
                    </>
                )}

                {step === 'processing' && (
                    <div className="payment-processing">
                        <div className="processing-spinner" />
                        <h3>Processing payment...</h3>
                        <p>Please wait</p>
                    </div>
                )}

                {step === 'success' && (
                    <div className="payment-success">
                        <div className="success-check">
                            <Check size={32} />
                        </div>
                        <h3>Payment Successful!</h3>
                        <p>Premium templates unlocked</p>
                        <Sparkles size={20} className="success-sparkle" />
                    </div>
                )}
            </div>
        </div>
    );
}
