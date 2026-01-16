'use client';

import { AppShell } from '@/components/layout';
import { Card, CardHeader, StatCard } from '@/components/ui';
import styles from './page.module.css';

export default function ReportsPage() {
    return (
        <AppShell title="Reports">
            <div className={styles.page}>
                {/* Header */}
                <div className={styles.header}>
                    <p className={styles.subtitle}>Analytics and performance insights</p>
                    <div className={styles.dateRange}>
                        <button className={styles.rangeBtn}>Today</button>
                        <button className={`${styles.rangeBtn} ${styles.active}`}>This Week</button>
                        <button className={styles.rangeBtn}>This Month</button>
                        <button className={styles.rangeBtn}>Custom</button>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className={styles.metricsGrid}>
                    <StatCard
                        title="Total Calls"
                        value="18,234"
                        change={{ value: '15%', positive: true }}
                        icon={
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                        }
                    />
                    <StatCard
                        title="Avg Call Duration"
                        value="2:48"
                        change={{ value: '8%', positive: false }}
                        icon={
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                        }
                    />
                    <StatCard
                        title="Promise Rate"
                        value="42.5%"
                        change={{ value: '5%', positive: true }}
                        icon={
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                        }
                    />
                    <StatCard
                        title="Collection Rate"
                        value="78.3%"
                        change={{ value: '12%', positive: true }}
                        icon={
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                        }
                    />
                </div>

                {/* Charts Row */}
                <div className={styles.chartsRow}>
                    <Card variant="default" className={styles.chartCard}>
                        <CardHeader title="Call Volume Trend" subtitle="Last 7 days" />
                        <div className={styles.chartPlaceholder}>
                            <div className={styles.barChart}>
                                {[65, 82, 78, 95, 88, 72, 90].map((height, i) => (
                                    <div key={i} className={styles.barWrapper}>
                                        <div
                                            className={styles.bar}
                                            style={{ height: `${height}%` }}
                                        />
                                        <span className={styles.barLabel}>
                                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>

                    <Card variant="default" className={styles.chartCard}>
                        <CardHeader title="Outcome Distribution" subtitle="This week" />
                        <div className={styles.chartPlaceholder}>
                            <div className={styles.donutChart}>
                                <div className={styles.donutRing}>
                                    <svg viewBox="0 0 100 100">
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="40"
                                            fill="none"
                                            stroke="var(--color-success)"
                                            strokeWidth="12"
                                            strokeDasharray="125.6 251.2"
                                            strokeDashoffset="0"
                                            transform="rotate(-90 50 50)"
                                        />
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="40"
                                            fill="none"
                                            stroke="var(--color-warning)"
                                            strokeWidth="12"
                                            strokeDasharray="50.2 251.2"
                                            strokeDashoffset="-125.6"
                                            transform="rotate(-90 50 50)"
                                        />
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="40"
                                            fill="none"
                                            stroke="var(--color-error)"
                                            strokeWidth="12"
                                            strokeDasharray="37.7 251.2"
                                            strokeDashoffset="-175.8"
                                            transform="rotate(-90 50 50)"
                                        />
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="40"
                                            fill="none"
                                            stroke="var(--color-accent)"
                                            strokeWidth="12"
                                            strokeDasharray="37.7 251.2"
                                            strokeDashoffset="-213.5"
                                            transform="rotate(-90 50 50)"
                                        />
                                    </svg>
                                </div>
                                <div className={styles.donutLegend}>
                                    <div className={styles.legendItem}>
                                        <span className={styles.legendDot} style={{ background: 'var(--color-success)' }} />
                                        <span>Promise (50%)</span>
                                    </div>
                                    <div className={styles.legendItem}>
                                        <span className={styles.legendDot} style={{ background: 'var(--color-warning)' }} />
                                        <span>Escalated (20%)</span>
                                    </div>
                                    <div className={styles.legendItem}>
                                        <span className={styles.legendDot} style={{ background: 'var(--color-error)' }} />
                                        <span>Dispute (15%)</span>
                                    </div>
                                    <div className={styles.legendItem}>
                                        <span className={styles.legendDot} style={{ background: 'var(--color-accent)' }} />
                                        <span>RNR (15%)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Agent Performance Table */}
                <Card variant="default" padding="none">
                    <div className={styles.tableHeader}>
                        <h3>Agent Performance</h3>
                    </div>
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Agent</th>
                                    <th>Calls</th>
                                    <th>Avg Duration</th>
                                    <th>Success Rate</th>
                                    <th>Promises</th>
                                    <th>Collection</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className={styles.agentName}>Loan Recovery Agent v2</td>
                                    <td>8,234</td>
                                    <td>2:45</td>
                                    <td><span className={styles.successBadge}>94.2%</span></td>
                                    <td>₹45.2L</td>
                                    <td>₹38.1L</td>
                                </tr>
                                <tr>
                                    <td className={styles.agentName}>Payment Reminder</td>
                                    <td>5,621</td>
                                    <td>1:58</td>
                                    <td><span className={styles.successBadge}>91.8%</span></td>
                                    <td>₹28.5L</td>
                                    <td>₹22.4L</td>
                                </tr>
                                <tr>
                                    <td className={styles.agentName}>EMI Collection</td>
                                    <td>4,379</td>
                                    <td>3:12</td>
                                    <td><span className={styles.warningBadge}>87.5%</span></td>
                                    <td>₹18.7L</td>
                                    <td>₹14.2L</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </AppShell>
    );
}
