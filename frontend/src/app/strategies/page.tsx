'use client';

import { useState } from 'react';
import { AppShell } from '@/components/layout';
import { Card, Button } from '@/components/ui';
import styles from './page.module.css';

// Mock recovery strategies - policy-controlled execution loops
const mockStrategies = [
    {
        id: 'STR-001',
        name: 'DPD 1-30 Soft Recovery',
        description: 'Gentle reminders for early-stage delinquency',
        dpdRange: [1, 30] as [number, number],
        status: 'active' as const,
        isSystemDefault: true,
        activeCases: 580,
        successRate: 72.5,
        actions: [
            { day: 1, type: 'sms', description: 'Payment reminder SMS' },
            { day: 3, type: 'ai_call', description: 'AI soft reminder call' },
            { day: 7, type: 'ai_call', description: 'AI follow-up call' },
            { day: 14, type: 'ai_call', description: 'AI escalation warning' },
        ],
        escalationThreshold: 4,
    },
    {
        id: 'STR-002',
        name: 'DPD 31-60 Medium Recovery',
        description: 'Assertive outreach for mid-stage delinquency',
        dpdRange: [31, 60] as [number, number],
        status: 'active' as const,
        isSystemDefault: true,
        activeCases: 412,
        successRate: 58.3,
        actions: [
            { day: 0, type: 'ai_call', description: 'Immediate AI outreach' },
            { day: 2, type: 'ai_call', description: 'AI negotiation call' },
            { day: 5, type: 'ai_call', description: 'AI final warning' },
            { day: 7, type: 'escalate', description: 'Human escalation' },
        ],
        escalationThreshold: 3,
    },
    {
        id: 'STR-003',
        name: 'DPD 61-90 Intensive Recovery',
        description: 'High-intensity recovery for late-stage accounts',
        dpdRange: [61, 90] as [number, number],
        status: 'active' as const,
        isSystemDefault: true,
        activeCases: 187,
        successRate: 41.2,
        actions: [
            { day: 0, type: 'ai_call', description: 'Urgent AI call' },
            { day: 1, type: 'ai_call', description: 'Daily follow-up' },
            { day: 3, type: 'escalate', description: 'Supervisor review' },
        ],
        escalationThreshold: 2,
    },
    {
        id: 'STR-004',
        name: 'DPD 90+ Critical Recovery',
        description: 'Critical intervention for severe delinquency',
        dpdRange: [91, 999] as [number, number],
        status: 'active' as const,
        isSystemDefault: true,
        activeCases: 68,
        successRate: 28.7,
        actions: [
            { day: 0, type: 'human_call', description: 'Immediate human review' },
            { day: 1, type: 'ai_call', description: 'Legal notice reminder' },
        ],
        escalationThreshold: 1,
    },
    {
        id: 'STR-005',
        name: 'High-Value Account Recovery',
        description: 'Priority handling for accounts above ₹5L',
        dpdRange: [1, 999] as [number, number],
        status: 'active' as const,
        isSystemDefault: false,
        amountThreshold: 500000,
        activeCases: 45,
        successRate: 65.8,
        actions: [
            { day: 0, type: 'human_call', description: 'Relationship manager call' },
            { day: 2, type: 'ai_call', description: 'AI follow-up' },
        ],
        escalationThreshold: 2,
    },
    {
        id: 'STR-006',
        name: 'First-Time Defaulter',
        description: 'Sensitive approach for first-time late payments',
        dpdRange: [1, 15] as [number, number],
        status: 'paused' as const,
        isSystemDefault: false,
        activeCases: 0,
        successRate: 0,
        actions: [
            { day: 3, type: 'sms', description: 'Friendly reminder' },
            { day: 7, type: 'ai_call', description: 'Courtesy call' },
        ],
        escalationThreshold: 3,
    },
];

const getActionIcon = (type: string) => {
    switch (type) {
        case 'sms':
            return (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
            );
        case 'ai_call':
            return (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a3 3 0 0 0-3 3v4a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                </svg>
            );
        case 'human_call':
            return (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07" />
                    <circle cx="9" cy="7" r="4" />
                </svg>
            );
        case 'escalate':
            return (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                    <path d="M12 9v4" />
                </svg>
            );
        default:
            return null;
    }
};

export default function StrategiesPage() {
    const [filter, setFilter] = useState<'all' | 'active' | 'paused'>('all');

    const filteredStrategies = mockStrategies.filter(s => {
        if (filter === 'all') return true;
        return s.status === filter;
    });

    return (
        <AppShell title="Recovery Strategies">
            <div className={styles.page}>
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.headerLeft}>
                        <p className={styles.subtitle}>DPD-based recovery policies and automation rules</p>
                    </div>
                    <div className={styles.headerActions}>
                        <div className={styles.systemBadge}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 16v-4" />
                                <path d="M12 8h.01" />
                            </svg>
                            System-managed strategies
                        </div>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className={styles.filterTabs}>
                    {(['all', 'active', 'paused'] as const).map((tab) => (
                        <button
                            key={tab}
                            className={`${styles.filterTab} ${filter === tab ? styles.active : ''}`}
                            onClick={() => setFilter(tab)}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            <span className={styles.count}>
                                {tab === 'all'
                                    ? mockStrategies.length
                                    : mockStrategies.filter(s => s.status === tab).length}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Strategies Grid */}
                <div className={styles.grid}>
                    {filteredStrategies.map((strategy) => (
                        <Card key={strategy.id} variant="default" className={styles.strategyCard}>
                            <div className={styles.cardHeader}>
                                <div className={styles.dpdBadge}>
                                    DPD {strategy.dpdRange[0]}-{strategy.dpdRange[1] > 900 ? '∞' : strategy.dpdRange[1]}
                                </div>
                                <div className={styles.statusWrapper}>
                                    {strategy.isSystemDefault && (
                                        <span className={styles.defaultBadge}>Default</span>
                                    )}
                                    <span className={`${styles.status} ${styles[strategy.status]}`}>
                                        {strategy.status}
                                    </span>
                                </div>
                            </div>

                            <h3 className={styles.strategyName}>{strategy.name}</h3>
                            <p className={styles.strategyDesc}>{strategy.description}</p>

                            {/* Action Timeline */}
                            <div className={styles.timeline}>
                                <div className={styles.timelineHeader}>
                                    <span>Recovery Actions</span>
                                    <span className={styles.escalationNote}>
                                        Escalates after {strategy.escalationThreshold} attempts
                                    </span>
                                </div>
                                <div className={styles.timelineItems}>
                                    {strategy.actions.map((action, idx) => (
                                        <div key={idx} className={styles.timelineItem}>
                                            <div className={`${styles.timelineIcon} ${styles[action.type]}`}>
                                                {getActionIcon(action.type)}
                                            </div>
                                            <div className={styles.timelineContent}>
                                                <span className={styles.timelineDay}>Day {action.day}</span>
                                                <span className={styles.timelineDesc}>{action.description}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Stats */}
                            <div className={styles.stats}>
                                <div className={styles.stat}>
                                    <span className={styles.statValue}>{strategy.activeCases}</span>
                                    <span className={styles.statLabel}>Active Cases</span>
                                </div>
                                <div className={styles.stat}>
                                    <span className={styles.statValue}>
                                        {strategy.successRate > 0 ? `${strategy.successRate}%` : '-'}
                                    </span>
                                    <span className={styles.statLabel}>Success Rate</span>
                                </div>
                            </div>

                            {/* Card Footer */}
                            <div className={styles.cardFooter}>
                                <Button variant="ghost" size="sm">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                                    </svg>
                                    Configure
                                </Button>
                                <Button variant="ghost" size="sm">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M3 3v18h18" />
                                        <path d="m19 9-5 5-4-4-3 3" />
                                    </svg>
                                    Analytics
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Info Banner */}
                <Card variant="glass" className={styles.infoBanner}>
                    <div className={styles.infoContent}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 16v-4" />
                            <path d="M12 8h.01" />
                        </svg>
                        <div>
                            <strong>Automated Execution</strong>
                            <p>
                                Strategies are automatically applied to recovery cases based on DPD bucket and loan amount.
                                Cases move through the action timeline without manual intervention.
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </AppShell>
    );
}
