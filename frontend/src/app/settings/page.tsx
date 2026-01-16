'use client';

import { useState } from 'react';
import { AppShell } from '@/components/layout';
import { Card, Button } from '@/components/ui';
import styles from './page.module.css';

type TabId = 'general' | 'bank' | 'users' | 'integrations' | 'compliance' | 'audit';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<TabId>('general');

    const tabs: { id: TabId; label: string }[] = [
        { id: 'general', label: 'General' },
        { id: 'bank', label: 'Bank Integration' },
        { id: 'users', label: 'Users & Permissions' },
        { id: 'integrations', label: 'Integrations' },
        { id: 'compliance', label: 'Compliance' },
        { id: 'audit', label: 'Audit Logs' },
    ];

    return (
        <AppShell title="Settings">
            <div className={styles.page}>
                {/* Header */}
                <div className={styles.header}>
                    <p className={styles.subtitle}>Manage your organization settings</p>
                </div>

                {/* Settings Container */}
                <div className={styles.container}>
                    {/* Tabs */}
                    <nav className={styles.tabs}>
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>

                    {/* Content */}
                    <div className={styles.content}>
                        {activeTab === 'general' && (
                            <div className={styles.section}>
                                <Card variant="default">
                                    <h3 className={styles.sectionTitle}>Organization Details</h3>
                                    <p className={styles.sectionDesc}>
                                        Basic information about your organization
                                    </p>

                                    <div className={styles.formGrid}>
                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>Organization Name</label>
                                            <input
                                                type="text"
                                                className={styles.input}
                                                defaultValue="ABC Bank Ltd."
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>Tenant ID</label>
                                            <input
                                                type="text"
                                                className={styles.input}
                                                defaultValue="abc_bank_001"
                                                disabled
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>Primary Contact Email</label>
                                            <input
                                                type="email"
                                                className={styles.input}
                                                defaultValue="admin@abcbank.com"
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>Timezone</label>
                                            <select className={styles.select} defaultValue="Asia/Kolkata">
                                                <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                                                <option value="UTC">UTC</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className={styles.formActions}>
                                        <Button variant="primary">Save Changes</Button>
                                    </div>
                                </Card>

                                <Card variant="default">
                                    <h3 className={styles.sectionTitle}>Call Settings</h3>
                                    <p className={styles.sectionDesc}>
                                        Configure default call behavior and restrictions
                                    </p>

                                    <div className={styles.formGrid}>
                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>Call Window Start</label>
                                            <input type="time" className={styles.input} defaultValue="09:00" />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>Call Window End</label>
                                            <input type="time" className={styles.input} defaultValue="18:00" />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>Max Retries Per Contact</label>
                                            <input type="number" className={styles.input} defaultValue="3" />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>Min Time Between Retries</label>
                                            <select className={styles.select} defaultValue="4">
                                                <option value="2">2 hours</option>
                                                <option value="4">4 hours</option>
                                                <option value="24">24 hours</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className={styles.toggleGroup}>
                                        <div className={styles.toggle}>
                                            <div className={styles.toggleInfo}>
                                                <span className={styles.toggleLabel}>DND Check</span>
                                                <span className={styles.toggleDesc}>Automatically check DND registry before calls</span>
                                            </div>
                                            <button className={`${styles.toggleBtn} ${styles.on}`}>
                                                <span className={styles.toggleKnob} />
                                            </button>
                                        </div>
                                        <div className={styles.toggle}>
                                            <div className={styles.toggleInfo}>
                                                <span className={styles.toggleLabel}>Call Recording</span>
                                                <span className={styles.toggleDesc}>Record all calls for compliance</span>
                                            </div>
                                            <button className={`${styles.toggleBtn} ${styles.on}`}>
                                                <span className={styles.toggleKnob} />
                                            </button>
                                        </div>
                                        <div className={styles.toggle}>
                                            <div className={styles.toggleInfo}>
                                                <span className={styles.toggleLabel}>Real-time Transcription</span>
                                                <span className={styles.toggleDesc}>Generate transcripts during calls</span>
                                            </div>
                                            <button className={`${styles.toggleBtn} ${styles.on}`}>
                                                <span className={styles.toggleKnob} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className={styles.formActions}>
                                        <Button variant="primary">Save Changes</Button>
                                    </div>
                                </Card>
                            </div>
                        )}

                        {activeTab === 'bank' && (
                            <div className={styles.section}>
                                {/* Connection Status */}
                                <Card variant="glass" className={styles.statusCard}>
                                    <div className={styles.connectionStatus}>
                                        <div className={styles.statusInfo}>
                                            <span className={styles.statusDot} />
                                            <div>
                                                <span className={styles.statusTitle}>Connected to Demo Bank</span>
                                                <span className={styles.statusMeta}>Last sync: 2 minutes ago • Next: in 13 minutes</span>
                                            </div>
                                        </div>
                                        <Button variant="secondary" size="sm">Sync Now</Button>
                                    </div>
                                </Card>

                                <Card variant="default">
                                    <h3 className={styles.sectionTitle}>Bank Connection Settings</h3>
                                    <p className={styles.sectionDesc}>
                                        Configure how Sonaris connects to your bank systems
                                    </p>

                                    <div className={styles.formGrid}>
                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>Integration Type</label>
                                            <select className={styles.select} defaultValue="rest">
                                                <option value="rest">REST API</option>
                                                <option value="sftp">SFTP Batch</option>
                                                <option value="db">Database View</option>
                                            </select>
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>API Endpoint</label>
                                            <input
                                                type="text"
                                                className={styles.input}
                                                defaultValue="https://api.demobank.sonaris.io/v1"
                                                disabled
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>Sync Frequency</label>
                                            <select className={styles.select} defaultValue="15">
                                                <option value="5">Every 5 minutes</option>
                                                <option value="15">Every 15 minutes</option>
                                                <option value="30">Every 30 minutes</option>
                                                <option value="60">Every hour</option>
                                            </select>
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>Batch Size</label>
                                            <select className={styles.select} defaultValue="100">
                                                <option value="50">50 records</option>
                                                <option value="100">100 records</option>
                                                <option value="500">500 records</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className={styles.formActions}>
                                        <Button variant="primary">Save Changes</Button>
                                    </div>
                                </Card>

                                {/* Demo Mode Card */}
                                <Card variant="default">
                                    <div className={styles.demoModeCard}>
                                        <div className={styles.demoInfo}>
                                            <div className={styles.demoIcon}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h4>Demo Bank Environment</h4>
                                                <p>You are using simulated bank data for testing and demonstrations. This includes ~100 realistic borrower records with loan accounts across different DPD buckets.</p>
                                            </div>
                                        </div>
                                        <span className={styles.demoBadge}>Active</span>
                                    </div>
                                </Card>

                                {/* Sync Stats */}
                                <Card variant="default">
                                    <h3 className={styles.sectionTitle}>Sync Statistics</h3>
                                    <div className={styles.syncStatsGrid}>
                                        <div className={styles.syncStatItem}>
                                            <span className={styles.syncStatValue}>1,247</span>
                                            <span className={styles.syncStatLabel}>Active Borrowers</span>
                                        </div>
                                        <div className={styles.syncStatItem}>
                                            <span className={styles.syncStatValue}>1,892</span>
                                            <span className={styles.syncStatLabel}>Loan Accounts</span>
                                        </div>
                                        <div className={styles.syncStatItem}>
                                            <span className={styles.syncStatValue}>1,247</span>
                                            <span className={styles.syncStatLabel}>Recovery Cases</span>
                                        </div>
                                        <div className={styles.syncStatItem}>
                                            <span className={styles.syncStatValue}>₹6.92Cr</span>
                                            <span className={styles.syncStatLabel}>Total Outstanding</span>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        )}

                        {activeTab === 'users' && (
                            <div className={styles.section}>
                                <Card variant="default">
                                    <div className={styles.cardHeader}>
                                        <div>
                                            <h3 className={styles.sectionTitle}>Team Members</h3>
                                            <p className={styles.sectionDesc}>Manage users and their permissions</p>
                                        </div>
                                        <Button variant="primary" size="sm">Invite User</Button>
                                    </div>

                                    <div className={styles.userList}>
                                        <div className={styles.userItem}>
                                            <div className={styles.userInfo}>
                                                <div className={styles.avatar}>A</div>
                                                <div>
                                                    <span className={styles.userName}>Admin User</span>
                                                    <span className={styles.userEmail}>admin@abcbank.com</span>
                                                </div>
                                            </div>
                                            <span className={styles.roleBadge}>Tenant Admin</span>
                                        </div>
                                        <div className={styles.userItem}>
                                            <div className={styles.userInfo}>
                                                <div className={styles.avatar}>R</div>
                                                <div>
                                                    <span className={styles.userName}>Ravi Supervisor</span>
                                                    <span className={styles.userEmail}>ravi.s@abcbank.com</span>
                                                </div>
                                            </div>
                                            <span className={styles.roleBadge}>Supervisor</span>
                                        </div>
                                        <div className={styles.userItem}>
                                            <div className={styles.userInfo}>
                                                <div className={styles.avatar}>P</div>
                                                <div>
                                                    <span className={styles.userName}>Priya Analyst</span>
                                                    <span className={styles.userEmail}>priya.a@abcbank.com</span>
                                                </div>
                                            </div>
                                            <span className={styles.roleBadge}>Analyst</span>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        )}

                        {activeTab === 'integrations' && (
                            <div className={styles.section}>
                                <Card variant="default">
                                    <h3 className={styles.sectionTitle}>Connected Services</h3>
                                    <p className={styles.sectionDesc}>Manage third-party integrations</p>

                                    <div className={styles.integrationList}>
                                        <div className={styles.integrationItem}>
                                            <div className={styles.integrationIcon}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                    <polyline points="17 8 12 3 7 8" />
                                                    <line x1="12" x2="12" y1="3" y2="15" />
                                                </svg>
                                            </div>
                                            <div className={styles.integrationInfo}>
                                                <span className={styles.integrationName}>CRM Webhook</span>
                                                <span className={styles.integrationDesc}>Push call outcomes to your CRM</span>
                                            </div>
                                            <span className={`${styles.statusBadge} ${styles.connected}`}>Connected</span>
                                        </div>
                                        <div className={styles.integrationItem}>
                                            <div className={styles.integrationIcon}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <rect width="20" height="16" x="2" y="4" rx="2" />
                                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                                </svg>
                                            </div>
                                            <div className={styles.integrationInfo}>
                                                <span className={styles.integrationName}>SMS Gateway</span>
                                                <span className={styles.integrationDesc}>Send confirmation SMS after calls</span>
                                            </div>
                                            <span className={`${styles.statusBadge} ${styles.connected}`}>Connected</span>
                                        </div>
                                        <div className={styles.integrationItem}>
                                            <div className={styles.integrationIcon}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                                </svg>
                                            </div>
                                            <div className={styles.integrationInfo}>
                                                <span className={styles.integrationName}>Payment API</span>
                                                <span className={styles.integrationDesc}>Verify payment status in real-time</span>
                                            </div>
                                            <Button variant="secondary" size="sm">Connect</Button>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        )}

                        {activeTab === 'compliance' && (
                            <div className={styles.section}>
                                <Card variant="default">
                                    <h3 className={styles.sectionTitle}>Compliance Settings</h3>
                                    <p className={styles.sectionDesc}>Configure regulatory compliance rules</p>

                                    <div className={styles.complianceList}>
                                        <div className={styles.complianceItem}>
                                            <div className={styles.complianceInfo}>
                                                <span className={styles.complianceName}>RBI Disclosure</span>
                                                <span className={styles.complianceDesc}>Mandatory disclosure script read at start of each call</span>
                                            </div>
                                            <span className={`${styles.statusBadge} ${styles.enabled}`}>Enabled</span>
                                        </div>
                                        <div className={styles.complianceItem}>
                                            <div className={styles.complianceInfo}>
                                                <span className={styles.complianceName}>TRAI DND Compliance</span>
                                                <span className={styles.complianceDesc}>Check DND registry before initiating calls</span>
                                            </div>
                                            <span className={`${styles.statusBadge} ${styles.enabled}`}>Enabled</span>
                                        </div>
                                        <div className={styles.complianceItem}>
                                            <div className={styles.complianceInfo}>
                                                <span className={styles.complianceName}>Call Time Restrictions</span>
                                                <span className={styles.complianceDesc}>No calls outside 9 AM - 6 PM local time</span>
                                            </div>
                                            <span className={`${styles.statusBadge} ${styles.enabled}`}>Enabled</span>
                                        </div>
                                        <div className={styles.complianceItem}>
                                            <div className={styles.complianceInfo}>
                                                <span className={styles.complianceName}>Immutable Audit Logs</span>
                                                <span className={styles.complianceDesc}>All actions are logged and tamper-proof</span>
                                            </div>
                                            <span className={`${styles.statusBadge} ${styles.enabled}`}>Enabled</span>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        )}

                        {activeTab === 'audit' && (
                            <div className={styles.section}>
                                <Card variant="default" padding="none">
                                    <div className={styles.tableHeader}>
                                        <div>
                                            <h3 className={styles.sectionTitle}>Recent Activity</h3>
                                            <p className={styles.sectionDesc}>Audit trail of all system actions</p>
                                        </div>
                                    </div>

                                    <div className={styles.auditList}>
                                        <div className={styles.auditItem}>
                                            <span className={styles.auditTime}>11:45 AM</span>
                                            <span className={styles.auditAction}>Agent &quot;Loan Recovery v2&quot; deployed</span>
                                            <span className={styles.auditUser}>admin@abcbank.com</span>
                                        </div>
                                        <div className={styles.auditItem}>
                                            <span className={styles.auditTime}>11:30 AM</span>
                                            <span className={styles.auditAction}>Call recording accessed</span>
                                            <span className={styles.auditUser}>ravi.s@abcbank.com</span>
                                        </div>
                                        <div className={styles.auditItem}>
                                            <span className={styles.auditTime}>10:15 AM</span>
                                            <span className={styles.auditAction}>User &quot;Priya Analyst&quot; invited</span>
                                            <span className={styles.auditUser}>admin@abcbank.com</span>
                                        </div>
                                        <div className={styles.auditItem}>
                                            <span className={styles.auditTime}>09:00 AM</span>
                                            <span className={styles.auditAction}>Daily call schedule initiated</span>
                                            <span className={styles.auditUser}>System</span>
                                        </div>
                                        <div className={styles.auditItem}>
                                            <span className={styles.auditTime}>Yesterday</span>
                                            <span className={styles.auditAction}>Compliance settings updated</span>
                                            <span className={styles.auditUser}>admin@abcbank.com</span>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppShell>
    );
}
