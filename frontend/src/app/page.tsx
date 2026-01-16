'use client';

import { AppShell } from '@/components/layout';
import { StatCard, Card, CardHeader, Button } from '@/components/ui';
import styles from './page.module.css';

// Mock data for demonstration - reflecting automated recovery system
const stats = [
  {
    title: 'Automated Calls Today',
    value: '2,847',
    change: { value: '12%', positive: true },
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    title: 'Recovery Rate',
    value: '94.2%',
    change: { value: '2.1%', positive: true },
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2a3 3 0 0 0-3 3v4a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" x2="12" y1="19" y2="22" />
      </svg>
    ),
  },
  {
    title: 'Promises Captured',
    value: '₹24.5L',
    change: { value: '18%', positive: true },
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: 'Active Cases',
    value: '1,247',
    change: { value: '8%', positive: false },
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 7h-9" />
        <path d="M14 17H5" />
        <circle cx="17" cy="17" r="3" />
        <circle cx="7" cy="7" r="3" />
      </svg>
    ),
  },
];

const recentCalls = [
  { id: 1, borrower: 'Rajesh Kumar', loanId: 'LN-00145', outcome: 'Promise to Pay', amount: '₹15,000', time: '2 min ago', status: 'success', strategy: 'DPD 1-30' },
  { id: 2, borrower: 'Priya Sharma', loanId: 'LN-00287', outcome: 'Escalated', amount: '-', time: '5 min ago', status: 'warning', strategy: 'DPD 31-60' },
  { id: 3, borrower: 'Amit Patel', loanId: 'LN-00392', outcome: 'Dispute Raised', amount: '-', time: '8 min ago', status: 'error', strategy: 'DPD 31-60' },
  { id: 4, borrower: 'Sunita Verma', loanId: 'LN-00456', outcome: 'Promise to Pay', amount: '₹8,500', time: '12 min ago', status: 'success', strategy: 'DPD 1-30' },
  { id: 5, borrower: 'Vikram Singh', loanId: 'LN-00523', outcome: 'RNR - Retry', amount: '-', time: '15 min ago', status: 'info', strategy: 'DPD 61-90' },
];

const activeAgents = [
  { id: 1, name: 'Loan Recovery Agent v2', status: 'active', calls: 847, success: '95%' },
  { id: 2, name: 'Payment Reminder', status: 'active', calls: 423, success: '92%' },
  { id: 3, name: 'EMI Collection', status: 'paused', calls: 0, success: '-' },
];

const dpdBreakdown = [
  { bucket: '1-30', count: 580, color: 'var(--color-warning)' },
  { bucket: '31-60', count: 412, color: 'hsl(30, 80%, 50%)' },
  { bucket: '61-90', count: 187, color: 'var(--color-error)' },
  { bucket: '90+', count: 68, color: 'hsl(0, 70%, 45%)' },
];

export default function DashboardPage() {
  return (
    <AppShell title="Dashboard">
      <div className={styles.dashboard}>
        {/* Sync Status Banner */}
        <div className={styles.syncBanner}>
          <div className={styles.syncInfo}>
            <span className={styles.syncDot} />
            <span className={styles.syncLabel}>Connected to <strong>Demo Bank</strong></span>
            <span className={styles.syncTime}>Last synced: 2 min ago</span>
          </div>
          <div className={styles.syncStats}>
            <span>1,247 active cases</span>
            <span className={styles.divider}>•</span>
            <span>₹6.92Cr outstanding</span>
          </div>
        </div>

        {/* Stats Grid */}
        <section className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </section>

        {/* Main Content Grid */}
        <div className={styles.mainGrid}>
          {/* Recent Calls */}
          <Card variant="default" padding="none" className={styles.callsCard}>
            <div className={styles.cardInner}>
              <CardHeader
                title="Recent Recovery Calls"
                subtitle="Automated • Last 15 minutes"
                action={
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                }
              />
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Borrower</th>
                      <th>Outcome</th>
                      <th>Amount</th>
                      <th>Strategy</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentCalls.map((call) => (
                      <tr key={call.id}>
                        <td>
                          <div className={styles.contactCell}>
                            <span className={styles.contactName}>{call.borrower}</span>
                            <span className={styles.contactPhone}>{call.loanId}</span>
                          </div>
                        </td>
                        <td>
                          <span className={`${styles.badge} ${styles[call.status]}`}>
                            {call.outcome}
                          </span>
                        </td>
                        <td className={styles.amount}>{call.amount}</td>
                        <td><span className={styles.strategyTag}>{call.strategy}</span></td>
                        <td className={styles.time}>{call.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>

          {/* Active Agents */}
          <Card variant="default" padding="none" className={styles.agentsCard}>
            <div className={styles.cardInner}>
              <CardHeader
                title="Active Agents"
                subtitle="Currently deployed"
                action={
                  <Button variant="primary" size="sm" icon={
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" x2="12" y1="5" y2="19" />
                      <line x1="5" x2="19" y1="12" y2="12" />
                    </svg>
                  }>
                    New
                  </Button>
                }
              />
              <div className={styles.agentsList}>
                {activeAgents.map((agent) => (
                  <div key={agent.id} className={styles.agentItem}>
                    <div className={styles.agentInfo}>
                      <span className={`${styles.statusDot} ${agent.status === 'active' ? styles.active : styles.paused}`} />
                      <div>
                        <span className={styles.agentName}>{agent.name}</span>
                        <span className={styles.agentMeta}>
                          {agent.status === 'active' ? `${agent.calls} calls today` : 'Paused'}
                        </span>
                      </div>
                    </div>
                    <div className={styles.agentStats}>
                      <span className={styles.successRate}>{agent.success}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Alerts */}
          <Card variant="glass" className={styles.alertsCard}>
            <CardHeader title="Alerts" subtitle="Requires attention" />
            <div className={styles.alertsList}>
              <div className={`${styles.alert} ${styles.alertWarning}`}>
                <div className={styles.alertIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                    <path d="M12 9v4" />
                    <path d="M12 17h.01" />
                  </svg>
                </div>
                <div className={styles.alertContent}>
                  <span className={styles.alertTitle}>High escalation rate detected</span>
                  <span className={styles.alertDesc}>Loan Recovery Agent v2 has 15% escalation rate in the last hour</span>
                </div>
              </div>
              <div className={`${styles.alert} ${styles.alertInfo}`}>
                <div className={styles.alertIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                </div>
                <div className={styles.alertContent}>
                  <span className={styles.alertTitle}>System update scheduled</span>
                  <span className={styles.alertDesc}>Maintenance window: Jan 17, 2:00 AM - 4:00 AM IST</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
