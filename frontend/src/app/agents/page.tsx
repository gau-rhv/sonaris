'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout';
import { Card, Button } from '@/components/ui';
import styles from './page.module.css';

// Mock agents data
const mockAgents = [
    {
        id: '1',
        name: 'Loan Recovery Agent v2',
        description: 'Handles overdue loan accounts with payment negotiation',
        status: 'active',
        template: 'Loan Recovery',
        languages: ['Hindi', 'English'],
        totalCalls: 12847,
        successRate: 94.2,
        lastModified: '2 hours ago',
    },
    {
        id: '2',
        name: 'Payment Reminder',
        description: 'Sends payment due date reminders',
        status: 'active',
        template: 'Payment Reminder',
        languages: ['Hindi', 'English', 'Tamil'],
        totalCalls: 8234,
        successRate: 91.8,
        lastModified: '1 day ago',
    },
    {
        id: '3',
        name: 'EMI Collection',
        description: 'Monthly EMI collection calls',
        status: 'paused',
        template: 'Loan Recovery',
        languages: ['Hindi', 'English'],
        totalCalls: 5621,
        successRate: 89.5,
        lastModified: '3 days ago',
    },
    {
        id: '4',
        name: 'First-time Defaulter',
        description: 'Gentle reminder for first-time defaulters',
        status: 'draft',
        template: 'Loan Recovery',
        languages: ['English'],
        totalCalls: 0,
        successRate: 0,
        lastModified: '5 days ago',
    },
];

export default function AgentsPage() {
    const [filter, setFilter] = useState<'all' | 'active' | 'paused' | 'draft'>('all');

    const filteredAgents = mockAgents.filter(agent => {
        if (filter === 'all') return true;
        return agent.status === filter;
    });

    return (
        <AppShell title="Agents">
            <div className={styles.page}>
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.headerLeft}>
                        <p className={styles.subtitle}>Manage and monitor your AI voice agents</p>
                    </div>
                    <Link href="/agents/new">
                        <Button
                            variant="primary"
                            icon={
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="12" x2="12" y1="5" y2="19" />
                                    <line x1="5" x2="19" y1="12" y2="12" />
                                </svg>
                            }
                        >
                            Create Agent
                        </Button>
                    </Link>
                </div>

                {/* Filters */}
                <div className={styles.filters}>
                    <div className={styles.filterTabs}>
                        {(['all', 'active', 'paused', 'draft'] as const).map((tab) => (
                            <button
                                key={tab}
                                className={`${styles.filterTab} ${filter === tab ? styles.active : ''}`}
                                onClick={() => setFilter(tab)}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                <span className={styles.count}>
                                    {tab === 'all'
                                        ? mockAgents.length
                                        : mockAgents.filter(a => a.status === tab).length}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Agents Grid */}
                <div className={styles.grid}>
                    {filteredAgents.map((agent) => (
                        <Card key={agent.id} variant="default" hover className={styles.agentCard}>
                            <div className={styles.cardHeader}>
                                <div className={styles.agentIcon}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 2a3 3 0 0 0-3 3v4a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                                        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                                        <line x1="12" x2="12" y1="19" y2="22" />
                                    </svg>
                                </div>
                                <span className={`${styles.status} ${styles[agent.status]}`}>
                                    {agent.status}
                                </span>
                            </div>

                            <h3 className={styles.agentName}>{agent.name}</h3>
                            <p className={styles.agentDesc}>{agent.description}</p>

                            <div className={styles.tags}>
                                <span className={styles.tag}>{agent.template}</span>
                                {agent.languages.map((lang) => (
                                    <span key={lang} className={styles.tag}>{lang}</span>
                                ))}
                            </div>

                            <div className={styles.stats}>
                                <div className={styles.stat}>
                                    <span className={styles.statValue}>{agent.totalCalls.toLocaleString()}</span>
                                    <span className={styles.statLabel}>Total Calls</span>
                                </div>
                                <div className={styles.stat}>
                                    <span className={styles.statValue}>{agent.successRate > 0 ? `${agent.successRate}%` : '-'}</span>
                                    <span className={styles.statLabel}>Success Rate</span>
                                </div>
                            </div>

                            <div className={styles.cardFooter}>
                                <span className={styles.modified}>Modified {agent.lastModified}</span>
                                <div className={styles.actions}>
                                    <button className={styles.actionBtn} title="Edit">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                                        </svg>
                                    </button>
                                    <button className={styles.actionBtn} title="View Analytics">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M3 3v18h18" />
                                            <path d="m19 9-5 5-4-4-3 3" />
                                        </svg>
                                    </button>
                                    <button className={styles.actionBtn} title="More">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="1" />
                                            <circle cx="19" cy="12" r="1" />
                                            <circle cx="5" cy="12" r="1" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </Card>
                    ))}

                    {/* Create New Card */}
                    <Link href="/agents/new" className={styles.createCard}>
                        <div className={styles.createIcon}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <line x1="12" x2="12" y1="5" y2="19" />
                                <line x1="5" x2="19" y1="12" y2="12" />
                            </svg>
                        </div>
                        <span className={styles.createText}>Create New Agent</span>
                        <span className={styles.createSubtext}>Start from a template</span>
                    </Link>
                </div>
            </div>
        </AppShell>
    );
}
