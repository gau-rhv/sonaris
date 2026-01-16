'use client';

import { useState } from 'react';
import { AppShell } from '@/components/layout';
import { Card, Button } from '@/components/ui';
import styles from './page.module.css';

// Mock calls data - reflecting automated recovery calls
const mockCalls = [
    {
        id: '1',
        borrower: 'Rajesh Kumar',
        loanId: 'LN-2024-00145',
        dpd: 15,
        strategy: 'DPD 1-30 Soft Recovery',
        agent: 'Loan Recovery Agent v2',
        duration: '2:45',
        outcome: 'Promise to Pay',
        amount: '₹15,000',
        promiseDate: 'Jan 20, 2026',
        timestamp: '11:30 AM',
        status: 'success',
        triggerType: 'auto',
    },
    {
        id: '2',
        borrower: 'Priya Sharma',
        loanId: 'LN-2024-00287',
        dpd: 38,
        strategy: 'DPD 31-60 Medium Recovery',
        agent: 'Loan Recovery Agent v2',
        duration: '4:12',
        outcome: 'Escalated to Human',
        amount: '-',
        promiseDate: '-',
        timestamp: '11:25 AM',
        status: 'warning',
        triggerType: 'auto',
    },
    {
        id: '3',
        borrower: 'Amit Patel',
        loanId: 'LN-2024-00392',
        dpd: 42,
        strategy: 'DPD 31-60 Medium Recovery',
        agent: 'Payment Reminder',
        duration: '1:58',
        outcome: 'Dispute Raised',
        amount: '-',
        promiseDate: '-',
        timestamp: '11:17 AM',
        status: 'error',
        triggerType: 'auto',
    },
    {
        id: '4',
        borrower: 'Sunita Verma',
        loanId: 'LN-2024-00456',
        dpd: 22,
        strategy: 'DPD 1-30 Soft Recovery',
        agent: 'Loan Recovery Agent v2',
        duration: '3:21',
        outcome: 'Promise to Pay',
        amount: '₹8,500',
        promiseDate: 'Jan 18, 2026',
        timestamp: '11:05 AM',
        status: 'success',
        triggerType: 'auto',
    },
    {
        id: '5',
        borrower: 'Vikram Singh',
        loanId: 'LN-2024-00523',
        dpd: 67,
        strategy: 'DPD 61-90 Intensive Recovery',
        agent: 'Loan Recovery Agent v2',
        duration: '0:32',
        outcome: 'RNR - No Answer',
        amount: '-',
        promiseDate: '-',
        timestamp: '10:58 AM',
        status: 'info',
        triggerType: 'auto',
    },
    {
        id: '6',
        borrower: 'Meera Reddy',
        loanId: 'LN-2024-00678',
        dpd: 8,
        strategy: 'DPD 1-30 Soft Recovery',
        agent: 'EMI Collection',
        duration: '2:15',
        outcome: 'Payment Confirmed',
        amount: '₹12,000',
        promiseDate: '-',
        timestamp: '10:45 AM',
        status: 'success',
        triggerType: 'auto',
    },
];

const getDpdBadgeClass = (dpd: number) => {
    if (dpd <= 30) return styles.dpdLow;
    if (dpd <= 60) return styles.dpdMedium;
    if (dpd <= 90) return styles.dpdHigh;
    return styles.dpdCritical;
};

export default function CallsPage() {
    const [selectedCall, setSelectedCall] = useState<string | null>(null);

    const selectedCallData = mockCalls.find(c => c.id === selectedCall);

    return (
        <AppShell title="Recovery Calls">
            <div className={styles.page}>
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.headerLeft}>
                        <p className={styles.subtitle}>Automated recovery call history and recordings</p>
                    </div>
                    <div className={styles.headerActions}>
                        <div className={styles.autoIndicator}>
                            <span className={styles.autoDot} />
                            <span>Automated</span>
                        </div>
                        <select className={styles.select}>
                            <option value="today">Today</option>
                            <option value="yesterday">Yesterday</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                        </select>
                        <Button variant="secondary">
                            Export
                        </Button>
                    </div>
                </div>

                {/* Stats Summary */}
                <div className={styles.statsSummary}>
                    <div className={styles.summaryItem}>
                        <span className={styles.summaryValue}>2,847</span>
                        <span className={styles.summaryLabel}>Total Calls</span>
                    </div>
                    <div className={styles.divider} />
                    <div className={styles.summaryItem}>
                        <span className={styles.summaryValue}>2:34</span>
                        <span className={styles.summaryLabel}>Avg Duration</span>
                    </div>
                    <div className={styles.divider} />
                    <div className={styles.summaryItem}>
                        <span className={`${styles.summaryValue} ${styles.success}`}>94.2%</span>
                        <span className={styles.summaryLabel}>Connect Rate</span>
                    </div>
                    <div className={styles.divider} />
                    <div className={styles.summaryItem}>
                        <span className={styles.summaryValue}>₹24.5L</span>
                        <span className={styles.summaryLabel}>Promises</span>
                    </div>
                    <div className={styles.divider} />
                    <div className={styles.summaryItem}>
                        <span className={styles.summaryValue}>100%</span>
                        <span className={styles.summaryLabel}>Auto-triggered</span>
                    </div>
                </div>

                {/* Calls Grid */}
                <div className={styles.mainContent}>
                    {/* Calls List */}
                    <Card variant="default" padding="none" className={styles.callsList}>
                        <div className={styles.listHeader}>
                            <h3>Recovery Calls</h3>
                            <span className={styles.listCount}>{mockCalls.length} calls</span>
                        </div>
                        <div className={styles.list}>
                            {mockCalls.map((call) => (
                                <button
                                    key={call.id}
                                    className={`${styles.callItem} ${selectedCall === call.id ? styles.selected : ''}`}
                                    onClick={() => setSelectedCall(call.id)}
                                >
                                    <div className={styles.callMain}>
                                        <div className={styles.callInfo}>
                                            <span className={styles.callContact}>{call.borrower}</span>
                                            <div className={styles.callMeta}>
                                                <span className={styles.loanId}>{call.loanId}</span>
                                                <span className={`${styles.dpdBadge} ${getDpdBadgeClass(call.dpd)}`}>
                                                    DPD {call.dpd}
                                                </span>
                                            </div>
                                        </div>
                                        <div className={styles.callRight}>
                                            <span className={styles.callTime}>{call.timestamp}</span>
                                            <span className={styles.callDuration}>{call.duration}</span>
                                        </div>
                                    </div>
                                    <div className={styles.callFooter}>
                                        <span className={`${styles.badge} ${styles[call.status]}`}>
                                            {call.outcome}
                                        </span>
                                        {call.amount !== '-' && (
                                            <span className={styles.callAmount}>{call.amount}</span>
                                        )}
                                    </div>
                                    <div className={styles.strategyTag}>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10" />
                                            <circle cx="12" cy="12" r="6" />
                                            <circle cx="12" cy="12" r="2" />
                                        </svg>
                                        {call.strategy}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </Card>

                    {/* Call Details */}
                    <Card variant="glass" className={styles.callDetails}>
                        {selectedCallData ? (
                            <>
                                <div className={styles.detailsHeader}>
                                    <h3>Call Details</h3>
                                    <Button variant="ghost" size="sm">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                            <polyline points="7 10 12 15 17 10" />
                                            <line x1="12" x2="12" y1="15" y2="3" />
                                        </svg>
                                        Download
                                    </Button>
                                </div>

                                {/* Recovery Context */}
                                <div className={styles.recoveryContext}>
                                    <div className={styles.contextItem}>
                                        <span className={styles.contextLabel}>Triggered By</span>
                                        <span className={styles.contextValue}>{selectedCallData.strategy}</span>
                                    </div>
                                    <div className={styles.contextItem}>
                                        <span className={styles.contextLabel}>Loan Account</span>
                                        <span className={styles.contextValue}>{selectedCallData.loanId}</span>
                                    </div>
                                    <div className={styles.contextItem}>
                                        <span className={styles.contextLabel}>DPD at Call</span>
                                        <span className={`${styles.dpdBadge} ${getDpdBadgeClass(selectedCallData.dpd)}`}>
                                            {selectedCallData.dpd} days
                                        </span>
                                    </div>
                                </div>

                                {/* Audio Player */}
                                <div className={styles.audioPlayer}>
                                    <div className={styles.waveform}>
                                        {Array.from({ length: 50 }).map((_, i) => (
                                            <div
                                                key={i}
                                                className={styles.waveBar}
                                                style={{ height: `${Math.random() * 60 + 20}%` }}
                                            />
                                        ))}
                                    </div>
                                    <div className={styles.playerControls}>
                                        <button className={styles.playBtn}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                <polygon points="5 3 19 12 5 21 5 3" />
                                            </svg>
                                        </button>
                                        <span className={styles.playerTime}>0:00 / {selectedCallData.duration}</span>
                                        <div className={styles.playerProgress}>
                                            <div className={styles.progressBar} style={{ width: '0%' }} />
                                        </div>
                                    </div>
                                </div>

                                {/* Transcript */}
                                <div className={styles.transcript}>
                                    <h4>Transcript</h4>
                                    <div className={styles.transcriptContent}>
                                        <div className={styles.transcriptLine}>
                                            <span className={styles.speaker}>AI:</span>
                                            <span>Hello, this is Priya calling from ABC Bank regarding your loan account {selectedCallData.loanId}. Am I speaking with {selectedCallData.borrower}?</span>
                                        </div>
                                        <div className={styles.transcriptLine}>
                                            <span className={`${styles.speaker} ${styles.customer}`}>Customer:</span>
                                            <span>Yes, this is {selectedCallData.borrower.split(' ')[0]} speaking.</span>
                                        </div>
                                        <div className={styles.transcriptLine}>
                                            <span className={styles.speaker}>AI:</span>
                                            <span>Thank you for confirming. This call is being recorded for training and quality purposes. I am calling regarding your outstanding amount of {selectedCallData.amount !== '-' ? selectedCallData.amount : '₹45,000'}...</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Outcome Summary */}
                                <div className={styles.outcomeSummary}>
                                    <h4>Outcome</h4>
                                    <div className={styles.outcomeGrid}>
                                        <div className={styles.outcomeItem}>
                                            <span className={styles.outcomeLabel}>Disposition</span>
                                            <span className={`${styles.badge} ${styles[selectedCallData.status]}`}>{selectedCallData.outcome}</span>
                                        </div>
                                        <div className={styles.outcomeItem}>
                                            <span className={styles.outcomeLabel}>Amount</span>
                                            <span className={styles.outcomeValue}>{selectedCallData.amount}</span>
                                        </div>
                                        <div className={styles.outcomeItem}>
                                            <span className={styles.outcomeLabel}>Promise Date</span>
                                            <span className={styles.outcomeValue}>{selectedCallData.promiseDate}</span>
                                        </div>
                                        <div className={styles.outcomeItem}>
                                            <span className={styles.outcomeLabel}>Confidence</span>
                                            <span className={styles.outcomeValue}>92%</span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className={styles.emptyState}>
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                                <span>Select a call to view details</span>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </AppShell>
    );
}
