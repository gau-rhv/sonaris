'use client';

import { useState } from 'react';
import { AppShell } from '@/components/layout';
import { Card } from '@/components/ui';
import styles from './page.module.css';

// Mock borrowers data - synced from bank
const mockBorrowers = [
    {
        id: 'BRRW-001',
        name: 'Rajesh Kumar',
        phone: '****6789',
        email: 'r***@email.com',
        status: 'active',
        loanId: 'LN-2024-00145',
        loanType: 'Personal Loan',
        dpd: 15,
        outstandingAmount: 45000,
        emiAmount: 8500,
        lastContact: '2 hours ago',
        nextAction: 'AI call scheduled',
        recoveryStrategy: 'DPD 1-30 Soft',
    },
    {
        id: 'BRRW-002',
        name: 'Priya Sharma',
        phone: '****4321',
        email: 'p***@email.com',
        status: 'dnd',
        loanId: 'LN-2024-00287',
        loanType: 'Vehicle Loan',
        dpd: 8,
        outstandingAmount: 28000,
        emiAmount: 5200,
        lastContact: '1 day ago',
        nextAction: 'DND until tomorrow',
        recoveryStrategy: 'DPD 1-30 Soft',
    },
    {
        id: 'BRRW-003',
        name: 'Amit Patel',
        phone: '****8765',
        email: 'a***@email.com',
        status: 'dispute',
        loanId: 'LN-2024-00392',
        loanType: 'Personal Loan',
        dpd: 42,
        outstandingAmount: 75000,
        emiAmount: 12500,
        lastContact: '3 hours ago',
        nextAction: 'Dispute under review',
        recoveryStrategy: 'DPD 31-60 Medium',
    },
    {
        id: 'BRRW-004',
        name: 'Sunita Verma',
        phone: '****2345',
        email: 's***@email.com',
        status: 'promise',
        loanId: 'LN-2024-00456',
        loanType: 'Credit Card',
        dpd: 22,
        outstandingAmount: 8500,
        emiAmount: 2500,
        lastContact: '12 hours ago',
        nextAction: 'Payment expected Jan 18',
        recoveryStrategy: 'DPD 1-30 Soft',
    },
    {
        id: 'BRRW-005',
        name: 'Vikram Singh',
        phone: '****9012',
        email: 'v***@email.com',
        status: 'active',
        loanId: 'LN-2024-00523',
        loanType: 'Home Loan',
        dpd: 67,
        outstandingAmount: 125000,
        emiAmount: 28000,
        lastContact: '4 hours ago',
        nextAction: 'Retry call in 2 hours',
        recoveryStrategy: 'DPD 61-90 Intensive',
    },
    {
        id: 'BRRW-006',
        name: 'Meera Reddy',
        phone: '****5678',
        email: 'm***@email.com',
        status: 'resolved',
        loanId: 'LN-2024-00678',
        loanType: 'Personal Loan',
        dpd: 0,
        outstandingAmount: 0,
        emiAmount: 6500,
        lastContact: '2 days ago',
        nextAction: 'Case closed',
        recoveryStrategy: '-',
    },
];

export default function BorrowersPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [dpdFilter, setDpdFilter] = useState<string>('');

    const filteredBorrowers = mockBorrowers.filter(borrower => {
        const matchesSearch = borrower.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            borrower.phone.includes(searchQuery) ||
            borrower.loanId.toLowerCase().includes(searchQuery.toLowerCase());

        if (!dpdFilter) return matchesSearch;

        switch (dpdFilter) {
            case '1-30': return matchesSearch && borrower.dpd >= 1 && borrower.dpd <= 30;
            case '31-60': return matchesSearch && borrower.dpd >= 31 && borrower.dpd <= 60;
            case '61-90': return matchesSearch && borrower.dpd >= 61 && borrower.dpd <= 90;
            case '90+': return matchesSearch && borrower.dpd > 90;
            default: return matchesSearch;
        }
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'info';
            case 'promise': return 'success';
            case 'dispute': return 'error';
            case 'dnd': return 'warning';
            case 'resolved': return 'success';
            default: return 'info';
        }
    };

    const getDpdBadgeClass = (dpd: number) => {
        if (dpd === 0) return styles.dpdNone;
        if (dpd <= 30) return styles.dpdLow;
        if (dpd <= 60) return styles.dpdMedium;
        if (dpd <= 90) return styles.dpdHigh;
        return styles.dpdCritical;
    };

    return (
        <AppShell title="Borrowers">
            <div className={styles.page}>
                {/* Header with Sync Status */}
                <div className={styles.header}>
                    <div className={styles.headerLeft}>
                        <p className={styles.subtitle}>Borrower data synced from bank</p>
                    </div>
                    <div className={styles.headerActions}>
                        <div className={styles.syncStatus}>
                            <span className={styles.syncDot} />
                            <span className={styles.syncText}>Last synced: 2 min ago</span>
                            <span className={styles.bankBadge}>Demo Bank</span>
                        </div>
                    </div>
                </div>

                {/* Search & Filters */}
                <div className={styles.searchBar}>
                    <div className={styles.searchInput}>
                        <svg className={styles.searchIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search by name, phone, or loan ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className={styles.filterGroup}>
                        <select
                            className={styles.select}
                            value={dpdFilter}
                            onChange={(e) => setDpdFilter(e.target.value)}
                        >
                            <option value="">All DPD Buckets</option>
                            <option value="1-30">DPD 1-30</option>
                            <option value="31-60">DPD 31-60</option>
                            <option value="61-90">DPD 61-90</option>
                            <option value="90+">DPD 90+</option>
                        </select>
                        <select className={styles.select}>
                            <option value="">All Status</option>
                            <option value="active">Active</option>
                            <option value="promise">Promise</option>
                            <option value="dispute">Dispute</option>
                            <option value="dnd">DND</option>
                            <option value="resolved">Resolved</option>
                        </select>
                    </div>
                </div>

                {/* Borrowers Table */}
                <Card variant="default" padding="none">
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Borrower</th>
                                    <th>Loan ID</th>
                                    <th>DPD</th>
                                    <th>Outstanding</th>
                                    <th>Status</th>
                                    <th>Strategy</th>
                                    <th>Next Action</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBorrowers.map((borrower) => (
                                    <tr key={borrower.id}>
                                        <td>
                                            <div className={styles.contactCell}>
                                                <div className={styles.avatar}>
                                                    {borrower.name.charAt(0)}
                                                </div>
                                                <div className={styles.contactInfo}>
                                                    <span className={styles.contactName}>{borrower.name}</span>
                                                    <span className={styles.contactPhone}>{borrower.phone}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={styles.loanInfo}>
                                                <span className={styles.loanId}>{borrower.loanId}</span>
                                                <span className={styles.loanType}>{borrower.loanType}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`${styles.dpdBadge} ${getDpdBadgeClass(borrower.dpd)}`}>
                                                {borrower.dpd} days
                                            </span>
                                        </td>
                                        <td>
                                            <span className={styles.amount}>
                                                {borrower.outstandingAmount > 0 ? `₹${borrower.outstandingAmount.toLocaleString()}` : '-'}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`${styles.badge} ${styles[getStatusColor(borrower.status)]}`}>
                                                {borrower.status}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={styles.strategyTag}>
                                                {borrower.recoveryStrategy}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={styles.nextAction}>{borrower.nextAction}</span>
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

                    {/* Pagination */}
                    <div className={styles.pagination}>
                        <span className={styles.paginationInfo}>
                            Showing {filteredBorrowers.length} of {mockBorrowers.length} borrowers
                        </span>
                        <div className={styles.paginationButtons}>
                            <button className={styles.paginationBtn} disabled>Previous</button>
                            <button className={`${styles.paginationBtn} ${styles.active}`}>1</button>
                            <button className={styles.paginationBtn}>2</button>
                            <button className={styles.paginationBtn}>3</button>
                            <button className={styles.paginationBtn}>Next</button>
                        </div>
                    </div>
                </Card>
            </div>
        </AppShell>
    );
}
