'use client';

import { useState } from 'react';
import { AppShell } from '@/components/layout';
import { Card, StatCard, Button } from '@/components/ui';
import styles from './page.module.css';

// Mock recovery cases - automatically created from bank data
const mockRecoveryCases = [
    {
        id: 'RC-2024-0145',
        borrowerName: 'Rajesh Kumar',
        loanId: 'LN-2024-00145',
        loanType: 'Personal Loan',
        dpd: 15,
        dpdBucket: '1-30' as const,
        outstandingAmount: 45000,
        strategy: 'DPD 1-30 Soft Recovery',
        status: 'active' as const,
        totalAttempts: 3,
        lastOutcome: 'RNR - No Answer',
        nextActionTime: 'In 2 hours',
        createdAt: '3 days ago',
    },
    {
        id: 'RC-2024-0287',
        borrowerName: 'Priya Sharma',
        loanId: 'LN-2024-00287',
        loanType: 'Vehicle Loan',
        dpd: 8,
        dpdBucket: '1-30' as const,
        outstandingAmount: 28000,
        strategy: 'DPD 1-30 Soft Recovery',
        status: 'dnd' as const,
        totalAttempts: 2,
        lastOutcome: 'DND Requested',
        nextActionTime: 'Tomorrow 10:00 AM',
        createdAt: '2 days ago',
    },
    {
        id: 'RC-2024-0392',
        borrowerName: 'Amit Patel',
        loanId: 'LN-2024-00392',
        loanType: 'Personal Loan',
        dpd: 42,
        dpdBucket: '31-60' as const,
        outstandingAmount: 75000,
        strategy: 'DPD 31-60 Medium Recovery',
        status: 'escalated' as const,
        totalAttempts: 6,
        lastOutcome: 'Dispute Raised',
        nextActionTime: 'Pending Review',
        createdAt: '5 days ago',
    },
    {
        id: 'RC-2024-0456',
        borrowerName: 'Sunita Verma',
        loanId: 'LN-2024-00456',
        loanType: 'Credit Card',
        dpd: 22,
        dpdBucket: '1-30' as const,
        outstandingAmount: 8500,
        strategy: 'DPD 1-30 Soft Recovery',
        status: 'promise_pending' as const,
        totalAttempts: 2,
        lastOutcome: 'Promise to Pay ₹8,500',
        nextActionTime: 'Jan 18 - Payment Due',
        promiseAmount: 8500,
        promiseDate: 'Jan 18, 2026',
        createdAt: '4 days ago',
    },
    {
        id: 'RC-2024-0523',
        borrowerName: 'Vikram Singh',
        loanId: 'LN-2024-00523',
        loanType: 'Home Loan',
        dpd: 67,
        dpdBucket: '61-90' as const,
        outstandingAmount: 125000,
        strategy: 'DPD 61-90 Intensive Recovery',
        status: 'active' as const,
        totalAttempts: 8,
        lastOutcome: 'Partial Payment Discussed',
        nextActionTime: 'In 4 hours',
        createdAt: '8 days ago',
    },
    {
        id: 'RC-2024-0634',
        borrowerName: 'Kiran Desai',
        loanId: 'LN-2024-00634',
        loanType: 'Personal Loan',
        dpd: 95,
        dpdBucket: '90+' as const,
        outstandingAmount: 185000,
        strategy: 'DPD 90+ Critical Recovery',
        status: 'escalated' as const,
        totalAttempts: 12,
        lastOutcome: 'Legal Notice Mentioned',
        nextActionTime: 'Human Review Required',
        createdAt: '12 days ago',
    },
];

type DpdBucket = '1-30' | '31-60' | '61-90' | '90+';
type CaseStatus = 'active' | 'promise_pending' | 'escalated' | 'disputed' | 'dnd' | 'resolved';

const dpdBucketStats = {
    '1-30': { count: 580, amount: 12500000 },
    '31-60': { count: 412, amount: 28700000 },
    '61-90': { count: 187, amount: 18200000 },
    '90+': { count: 68, amount: 9800000 },
};

export default function RecoveryCasesPage() {
    const [selectedBucket, setSelectedBucket] = useState<DpdBucket | 'all'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCases = mockRecoveryCases.filter(c => {
        const matchesSearch =
            c.borrowerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.loanId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.id.toLowerCase().includes(searchQuery.toLowerCase());

        if (selectedBucket === 'all') return matchesSearch;
        return matchesSearch && c.dpdBucket === selectedBucket;
    });

    const getStatusColor = (status: CaseStatus) => {
        switch (status) {
            case 'active': return 'info';
            case 'promise_pending': return 'success';
            case 'escalated': return 'warning';
            case 'disputed': return 'error';
            case 'dnd': return 'warning';
            case 'resolved': return 'success';
            default: return 'info';
        }
    };

    const getStatusLabel = (status: CaseStatus) => {
        switch (status) {
            case 'active': return 'Active';
            case 'promise_pending': return 'Promise Pending';
            case 'escalated': return 'Escalated';
            case 'disputed': return 'Disputed';
            case 'dnd': return 'DND';
            case 'resolved': return 'Resolved';
            default: return status;
        }
    };

    const getDpdBadgeClass = (bucket: DpdBucket) => {
        switch (bucket) {
            case '1-30': return styles.dpdLow;
            case '31-60': return styles.dpdMedium;
            case '61-90': return styles.dpdHigh;
            case '90+': return styles.dpdCritical;
        }
    };

    return (
        <AppShell title="Recovery Cases">
            <div className={styles.page}>
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.headerLeft}>
                        <p className={styles.subtitle}>Automated recovery tracking from bank sync</p>
                    </div>
                    <div className={styles.syncStatus}>
                        <span className={styles.syncDot} />
                        <span>Auto-updated • Last: 2 min ago</span>
                    </div>
                </div>

                {/* DPD Bucket Stats */}
                <div className={styles.bucketGrid}>
                    {(Object.entries(dpdBucketStats) as [DpdBucket, typeof dpdBucketStats['1-30']][]).map(([bucket, stats]) => (
                        <button
                            key={bucket}
                            className={`${styles.bucketCard} ${selectedBucket === bucket ? styles.selected : ''}`}
                            onClick={() => setSelectedBucket(bucket === selectedBucket ? 'all' : bucket)}
                        >
                            <div className={styles.bucketHeader}>
                                <span className={`${styles.bucketLabel} ${getDpdBadgeClass(bucket)}`}>
                                    DPD {bucket}
                                </span>
                                {selectedBucket === bucket && (
                                    <span className={styles.selectedIndicator}>✓</span>
                                )}
                            </div>
                            <div className={styles.bucketStats}>
                                <span className={styles.bucketCount}>{stats.count}</span>
                                <span className={styles.bucketAmount}>₹{(stats.amount / 100000).toFixed(1)}L</span>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className={styles.searchBar}>
                    <div className={styles.searchInput}>
                        <svg className={styles.searchIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search by case ID, borrower, or loan ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    {selectedBucket !== 'all' && (
                        <button
                            className={styles.clearFilter}
                            onClick={() => setSelectedBucket('all')}
                        >
                            Clear filter
                        </button>
                    )}
                </div>

                {/* Cases Table */}
                <Card variant="default" padding="none">
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Case / Borrower</th>
                                    <th>DPD</th>
                                    <th>Outstanding</th>
                                    <th>Strategy</th>
                                    <th>Status</th>
                                    <th>Attempts</th>
                                    <th>Next Action</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCases.map((caseItem) => (
                                    <tr key={caseItem.id}>
                                        <td>
                                            <div className={styles.caseCell}>
                                                <span className={styles.caseId}>{caseItem.id}</span>
                                                <div className={styles.borrowerInfo}>
                                                    <span className={styles.borrowerName}>{caseItem.borrowerName}</span>
                                                    <span className={styles.loanId}>{caseItem.loanId}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`${styles.dpdBadge} ${getDpdBadgeClass(caseItem.dpdBucket)}`}>
                                                {caseItem.dpd} days
                                            </span>
                                        </td>
                                        <td>
                                            <span className={styles.amount}>
                                                ₹{caseItem.outstandingAmount.toLocaleString()}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={styles.strategyTag}>{caseItem.strategy}</span>
                                        </td>
                                        <td>
                                            <span className={`${styles.badge} ${styles[getStatusColor(caseItem.status)]}`}>
                                                {getStatusLabel(caseItem.status)}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={styles.attempts}>{caseItem.totalAttempts}</span>
                                        </td>
                                        <td>
                                            <div className={styles.nextAction}>
                                                <span className={styles.nextActionTime}>{caseItem.nextActionTime}</span>
                                                <span className={styles.lastOutcome}>{caseItem.lastOutcome}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <button className={styles.rowAction}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <circle cx="12" cy="12" r="1" />
                                                    <circle cx="12" cy="5" r="1" />
                                                    <circle cx="12" cy="19" r="1" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Table Footer */}
                    <div className={styles.tableFooter}>
                        <span className={styles.resultCount}>
                            Showing {filteredCases.length} of {mockRecoveryCases.length} cases
                        </span>
                        <span className={styles.autoNote}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                            Cases auto-created from bank data
                        </span>
                    </div>
                </Card>
            </div>
        </AppShell>
    );
}
