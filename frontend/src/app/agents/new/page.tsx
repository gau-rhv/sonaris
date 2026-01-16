'use client';

import { useState } from 'react';
import { AppShell } from '@/components/layout';
import { Button, Card } from '@/components/ui';
import styles from './page.module.css';

// Step definitions
const steps = [
    { id: 1, name: 'Template', description: 'Choose a template' },
    { id: 2, name: 'Identity', description: 'Set up persona & greeting' },
    { id: 3, name: 'Scripting', description: 'Configure responses' },
    { id: 4, name: 'Rules', description: 'Set actions & escalation' },
    { id: 5, name: 'Review', description: 'Review & deploy' },
];

// Available templates
const templates = [
    {
        id: 'loan_recovery',
        name: 'Loan Recovery',
        description: 'Handles overdue loan accounts with payment negotiation and promise capture',
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
        ),
        features: ['RBI-compliant disclosure', 'Promise-to-pay capture', 'Payment plan options', 'Dispute handling'],
    },
    {
        id: 'payment_reminder',
        name: 'Payment Reminder',
        description: 'Sends payment due date reminders with friendly follow-ups',
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
            </svg>
        ),
        features: ['Due date tracking', 'Gentle reminders', 'Payment confirmation', 'Multiple channels'],
    },
    {
        id: 'emi_collection',
        name: 'EMI Collection',
        description: 'Monthly EMI collection with flexible payment options',
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
            </svg>
        ),
        features: ['EMI tracking', 'Partial payment handling', 'Auto-rescheduling', 'Payment links'],
    },
];

// Languages available
const languages = [
    { id: 'en-IN', name: 'English (India)', flag: '🇮🇳' },
    { id: 'hi-IN', name: 'Hindi', flag: '🇮🇳' },
    { id: 'ta-IN', name: 'Tamil', flag: '🇮🇳' },
    { id: 'te-IN', name: 'Telugu', flag: '🇮🇳' },
    { id: 'bn-IN', name: 'Bengali', flag: '🇮🇳' },
    { id: 'mr-IN', name: 'Marathi', flag: '🇮🇳' },
    { id: 'kn-IN', name: 'Kannada', flag: '🇮🇳' },
];

// Reason codes for loan recovery
const reasonCodes = [
    { id: 'financial_hardship', label: 'Financial Hardship' },
    { id: 'job_loss', label: 'Job Loss' },
    { id: 'medical_emergency', label: 'Medical Emergency' },
    { id: 'business_loss', label: 'Business Loss' },
    { id: 'forgot', label: 'Forgot to Pay' },
    { id: 'dispute', label: 'Dispute/Disagreement' },
    { id: 'technical_issue', label: 'Technical Issue' },
    { id: 'other', label: 'Other' },
];

interface FormData {
    // Step 1
    template: string;
    // Step 2
    name: string;
    personaName: string;
    languages: string[];
    businessHoursStart: string;
    businessHoursEnd: string;
    // Step 3
    greetingTemplate: string;
    reasonCodes: string[];
    maxRetries: number;
    // Step 4
    sendSmsOnPromise: boolean;
    sendSmsOnMissed: boolean;
    escalationThreshold: number;
    webhookUrl: string;
    // Step 5 - calculated
}

export default function NewAgentPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        template: '',
        name: '',
        personaName: 'Priya',
        languages: ['en-IN', 'hi-IN'],
        businessHoursStart: '09:00',
        businessHoursEnd: '18:00',
        greetingTemplate: 'Hello, this is {persona} calling from {bank}. Am I speaking with {customer}?',
        reasonCodes: ['financial_hardship', 'job_loss', 'medical_emergency', 'forgot'],
        maxRetries: 3,
        sendSmsOnPromise: true,
        sendSmsOnMissed: true,
        escalationThreshold: 3,
        webhookUrl: '',
    });

    const updateFormData = (key: keyof FormData, value: unknown) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const toggleLanguage = (langId: string) => {
        setFormData(prev => ({
            ...prev,
            languages: prev.languages.includes(langId)
                ? prev.languages.filter(l => l !== langId)
                : [...prev.languages, langId]
        }));
    };

    const toggleReasonCode = (codeId: string) => {
        setFormData(prev => ({
            ...prev,
            reasonCodes: prev.reasonCodes.includes(codeId)
                ? prev.reasonCodes.filter(c => c !== codeId)
                : [...prev.reasonCodes, codeId]
        }));
    };

    const canProceed = () => {
        switch (currentStep) {
            case 1: return formData.template !== '';
            case 2: return formData.name !== '' && formData.personaName !== '' && formData.languages.length > 0;
            case 3: return formData.greetingTemplate !== '' && formData.reasonCodes.length > 0;
            case 4: return true;
            case 5: return true;
            default: return false;
        }
    };

    const getSelectedTemplate = () => templates.find(t => t.id === formData.template);

    return (
        <AppShell title="Create Agent">
            <div className={styles.page}>
                {/* Progress Steps */}
                <div className={styles.stepsContainer}>
                    <div className={styles.steps}>
                        {steps.map((step, index) => (
                            <div
                                key={step.id}
                                className={`${styles.step} ${currentStep === step.id ? styles.active : ''} ${currentStep > step.id ? styles.completed : ''}`}
                            >
                                <div className={styles.stepIndicator}>
                                    {currentStep > step.id ? (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    ) : (
                                        <span>{step.id}</span>
                                    )}
                                </div>
                                <div className={styles.stepInfo}>
                                    <span className={styles.stepName}>{step.name}</span>
                                    <span className={styles.stepDesc}>{step.description}</span>
                                </div>
                                {index < steps.length - 1 && <div className={styles.stepConnector} />}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form Content */}
                <div className={styles.content}>
                    {/* Step 1: Template Selection */}
                    {currentStep === 1 && (
                        <div className={styles.stepContent}>
                            <div className={styles.stepHeader}>
                                <h2>Choose a Template</h2>
                                <p>Select a pre-built conversation template that matches your use case</p>
                            </div>

                            <div className={styles.templateGrid}>
                                {templates.map(template => (
                                    <button
                                        key={template.id}
                                        className={`${styles.templateCard} ${formData.template === template.id ? styles.selected : ''}`}
                                        onClick={() => updateFormData('template', template.id)}
                                    >
                                        <div className={styles.templateIcon}>{template.icon}</div>
                                        <h3>{template.name}</h3>
                                        <p>{template.description}</p>
                                        <ul className={styles.featureList}>
                                            {template.features.map(feature => (
                                                <li key={feature}>
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <polyline points="20 6 9 17 4 12" />
                                                    </svg>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                        {formData.template === template.id && (
                                            <div className={styles.selectedBadge}>Selected</div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 2: Identity & Greeting */}
                    {currentStep === 2 && (
                        <div className={styles.stepContent}>
                            <div className={styles.stepHeader}>
                                <h2>Identity & Greeting</h2>
                                <p>Configure how your AI agent introduces itself</p>
                            </div>

                            <div className={styles.formSection}>
                                <Card variant="default">
                                    <h3 className={styles.sectionTitle}>Agent Details</h3>

                                    <div className={styles.formGrid}>
                                        <div className={styles.formGroup}>
                                            <label>Agent Name</label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={e => updateFormData('name', e.target.value)}
                                                placeholder="e.g., Loan Recovery Agent v1"
                                                className={styles.input}
                                            />
                                            <span className={styles.hint}>Internal name for identification</span>
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label>Persona Name</label>
                                            <input
                                                type="text"
                                                value={formData.personaName}
                                                onChange={e => updateFormData('personaName', e.target.value)}
                                                placeholder="e.g., Priya"
                                                className={styles.input}
                                            />
                                            <span className={styles.hint}>Name the AI will use when speaking</span>
                                        </div>
                                    </div>
                                </Card>

                                <Card variant="default">
                                    <h3 className={styles.sectionTitle}>Languages</h3>
                                    <p className={styles.sectionDesc}>Select languages this agent will support</p>

                                    <div className={styles.languageGrid}>
                                        {languages.map(lang => (
                                            <button
                                                key={lang.id}
                                                className={`${styles.languageChip} ${formData.languages.includes(lang.id) ? styles.selected : ''}`}
                                                onClick={() => toggleLanguage(lang.id)}
                                            >
                                                <span className={styles.flag}>{lang.flag}</span>
                                                <span>{lang.name}</span>
                                                {formData.languages.includes(lang.id) && (
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                        <polyline points="20 6 9 17 4 12" />
                                                    </svg>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </Card>

                                <Card variant="default">
                                    <h3 className={styles.sectionTitle}>Business Hours</h3>
                                    <p className={styles.sectionDesc}>Calls will only be made during these hours</p>

                                    <div className={styles.formGrid}>
                                        <div className={styles.formGroup}>
                                            <label>Start Time</label>
                                            <input
                                                type="time"
                                                value={formData.businessHoursStart}
                                                onChange={e => updateFormData('businessHoursStart', e.target.value)}
                                                className={styles.input}
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>End Time</label>
                                            <input
                                                type="time"
                                                value={formData.businessHoursEnd}
                                                onChange={e => updateFormData('businessHoursEnd', e.target.value)}
                                                className={styles.input}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.complianceNote}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="M12 16v-4" />
                                            <path d="M12 8h.01" />
                                        </svg>
                                        <span>TRAI regulations require calls between 9 AM - 6 PM only</span>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Scripting */}
                    {currentStep === 3 && (
                        <div className={styles.stepContent}>
                            <div className={styles.stepHeader}>
                                <h2>Scripting</h2>
                                <p>Configure how your agent communicates</p>
                            </div>

                            <div className={styles.formSection}>
                                <Card variant="default">
                                    <h3 className={styles.sectionTitle}>Greeting Template</h3>
                                    <p className={styles.sectionDesc}>How the agent will introduce itself</p>

                                    <div className={styles.formGroup}>
                                        <textarea
                                            value={formData.greetingTemplate}
                                            onChange={e => updateFormData('greetingTemplate', e.target.value)}
                                            className={styles.textarea}
                                            rows={3}
                                        />
                                        <div className={styles.variables}>
                                            <span className={styles.variablesLabel}>Available variables:</span>
                                            <code>{'{persona}'}</code>
                                            <code>{'{bank}'}</code>
                                            <code>{'{customer}'}</code>
                                        </div>
                                    </div>
                                </Card>

                                <Card variant="default">
                                    <h3 className={styles.sectionTitle}>Reason Codes</h3>
                                    <p className={styles.sectionDesc}>Categories the AI will use to classify responses</p>

                                    <div className={styles.reasonGrid}>
                                        {reasonCodes.map(code => (
                                            <button
                                                key={code.id}
                                                className={`${styles.reasonChip} ${formData.reasonCodes.includes(code.id) ? styles.selected : ''}`}
                                                onClick={() => toggleReasonCode(code.id)}
                                            >
                                                <span>{code.label}</span>
                                                {formData.reasonCodes.includes(code.id) && (
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                        <polyline points="20 6 9 17 4 12" />
                                                    </svg>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </Card>

                                <Card variant="default">
                                    <h3 className={styles.sectionTitle}>Call Settings</h3>

                                    <div className={styles.formGroup}>
                                        <label>Maximum Retries per Contact</label>
                                        <div className={styles.sliderContainer}>
                                            <input
                                                type="range"
                                                min="1"
                                                max="5"
                                                value={formData.maxRetries}
                                                onChange={e => updateFormData('maxRetries', parseInt(e.target.value))}
                                                className={styles.slider}
                                            />
                                            <span className={styles.sliderValue}>{formData.maxRetries}</span>
                                        </div>
                                        <span className={styles.hint}>Number of retry attempts if call is unsuccessful</span>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Rules & Actions */}
                    {currentStep === 4 && (
                        <div className={styles.stepContent}>
                            <div className={styles.stepHeader}>
                                <h2>Rules & Actions</h2>
                                <p>Configure post-call actions and escalation triggers</p>
                            </div>

                            <div className={styles.formSection}>
                                <Card variant="default">
                                    <h3 className={styles.sectionTitle}>Post-Call Actions</h3>

                                    <div className={styles.toggleList}>
                                        <div className={styles.toggleItem}>
                                            <div className={styles.toggleInfo}>
                                                <span className={styles.toggleLabel}>Send SMS on Promise</span>
                                                <span className={styles.toggleDesc}>Send confirmation SMS when customer makes a promise to pay</span>
                                            </div>
                                            <button
                                                className={`${styles.toggle} ${formData.sendSmsOnPromise ? styles.on : ''}`}
                                                onClick={() => updateFormData('sendSmsOnPromise', !formData.sendSmsOnPromise)}
                                            >
                                                <span className={styles.toggleKnob} />
                                            </button>
                                        </div>

                                        <div className={styles.toggleItem}>
                                            <div className={styles.toggleInfo}>
                                                <span className={styles.toggleLabel}>Send SMS on Missed Call</span>
                                                <span className={styles.toggleDesc}>Send SMS if customer doesn&apos;t answer after all retries</span>
                                            </div>
                                            <button
                                                className={`${styles.toggle} ${formData.sendSmsOnMissed ? styles.on : ''}`}
                                                onClick={() => updateFormData('sendSmsOnMissed', !formData.sendSmsOnMissed)}
                                            >
                                                <span className={styles.toggleKnob} />
                                            </button>
                                        </div>
                                    </div>
                                </Card>

                                <Card variant="default">
                                    <h3 className={styles.sectionTitle}>Escalation Rules</h3>

                                    <div className={styles.formGroup}>
                                        <label>Escalate to Human After</label>
                                        <div className={styles.sliderContainer}>
                                            <input
                                                type="range"
                                                min="1"
                                                max="5"
                                                value={formData.escalationThreshold}
                                                onChange={e => updateFormData('escalationThreshold', parseInt(e.target.value))}
                                                className={styles.slider}
                                            />
                                            <span className={styles.sliderValue}>{formData.escalationThreshold} failed attempts</span>
                                        </div>
                                    </div>

                                    <div className={styles.escalationRules}>
                                        <h4>Automatic Escalation Triggers</h4>
                                        <ul>
                                            <li>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                Customer explicitly requests human
                                            </li>
                                            <li>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                Legal keywords detected (lawyer, court, sue)
                                            </li>
                                            <li>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                Profanity detected (3+ instances)
                                            </li>
                                            <li>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                AI confidence below 65%
                                            </li>
                                        </ul>
                                    </div>
                                </Card>

                                <Card variant="default">
                                    <h3 className={styles.sectionTitle}>Integrations</h3>

                                    <div className={styles.formGroup}>
                                        <label>CRM Webhook URL (Optional)</label>
                                        <input
                                            type="url"
                                            value={formData.webhookUrl}
                                            onChange={e => updateFormData('webhookUrl', e.target.value)}
                                            placeholder="https://your-crm.com/webhook"
                                            className={styles.input}
                                        />
                                        <span className={styles.hint}>Call outcomes will be sent to this URL</span>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    )}

                    {/* Step 5: Review & Deploy */}
                    {currentStep === 5 && (
                        <div className={styles.stepContent}>
                            <div className={styles.stepHeader}>
                                <h2>Review & Deploy</h2>
                                <p>Review your configuration before deploying</p>
                            </div>

                            <div className={styles.reviewSection}>
                                <Card variant="glass">
                                    <div className={styles.reviewGrid}>
                                        <div className={styles.reviewItem}>
                                            <span className={styles.reviewLabel}>Agent Name</span>
                                            <span className={styles.reviewValue}>{formData.name || 'Not set'}</span>
                                        </div>
                                        <div className={styles.reviewItem}>
                                            <span className={styles.reviewLabel}>Template</span>
                                            <span className={styles.reviewValue}>{getSelectedTemplate()?.name || 'Not selected'}</span>
                                        </div>
                                        <div className={styles.reviewItem}>
                                            <span className={styles.reviewLabel}>Persona</span>
                                            <span className={styles.reviewValue}>{formData.personaName}</span>
                                        </div>
                                        <div className={styles.reviewItem}>
                                            <span className={styles.reviewLabel}>Languages</span>
                                            <span className={styles.reviewValue}>{formData.languages.length} selected</span>
                                        </div>
                                        <div className={styles.reviewItem}>
                                            <span className={styles.reviewLabel}>Business Hours</span>
                                            <span className={styles.reviewValue}>{formData.businessHoursStart} - {formData.businessHoursEnd}</span>
                                        </div>
                                        <div className={styles.reviewItem}>
                                            <span className={styles.reviewLabel}>Max Retries</span>
                                            <span className={styles.reviewValue}>{formData.maxRetries}</span>
                                        </div>
                                    </div>
                                </Card>

                                <Card variant="default">
                                    <h3 className={styles.sectionTitle}>Compliance Checklist</h3>
                                    <div className={styles.checklist}>
                                        <div className={`${styles.checkItem} ${styles.passed}`}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                                <polyline points="22 4 12 14.01 9 11.01" />
                                            </svg>
                                            <span>RBI disclosure script included</span>
                                        </div>
                                        <div className={`${styles.checkItem} ${styles.passed}`}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                                <polyline points="22 4 12 14.01 9 11.01" />
                                            </svg>
                                            <span>Business hours within TRAI limits</span>
                                        </div>
                                        <div className={`${styles.checkItem} ${styles.passed}`}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                                <polyline points="22 4 12 14.01 9 11.01" />
                                            </svg>
                                            <span>DND check enabled</span>
                                        </div>
                                        <div className={`${styles.checkItem} ${styles.passed}`}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                                <polyline points="22 4 12 14.01 9 11.01" />
                                            </svg>
                                            <span>Call recording enabled</span>
                                        </div>
                                        <div className={`${styles.checkItem} ${styles.passed}`}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                                <polyline points="22 4 12 14.01 9 11.01" />
                                            </svg>
                                            <span>Human escalation path configured</span>
                                        </div>
                                    </div>
                                </Card>

                                <div className={styles.deployNote}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M12 16v-4" />
                                        <path d="M12 8h.01" />
                                    </svg>
                                    <span>After deployment, a test call will be initiated to verify configuration.</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className={styles.footer}>
                    <div className={styles.footerLeft}>
                        {currentStep > 1 && (
                            <Button variant="ghost" onClick={() => setCurrentStep(prev => prev - 1)}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="m15 18-6-6 6-6" />
                                </svg>
                                Back
                            </Button>
                        )}
                    </div>

                    <div className={styles.footerRight}>
                        <Button variant="secondary">Cancel</Button>

                        {currentStep < 5 ? (
                            <Button
                                variant="primary"
                                onClick={() => setCurrentStep(prev => prev + 1)}
                                disabled={!canProceed()}
                            >
                                Continue
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="m9 18 6-6-6-6" />
                                </svg>
                            </Button>
                        ) : (
                            <Button variant="primary">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                    <polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                                Deploy Agent
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </AppShell>
    );
}
