import { NextResponse } from 'next/server';
import { getDemoDatabase } from '@/lib/demo-bank/database';

export async function GET() {
    const db = getDemoDatabase();

    return NextResponse.json({
        success: true,
        data: {
            borrowers: {
                total: db.stats.totalBorrowers,
                byRisk: {
                    low: db.borrowers.filter(b => b.riskCategory === 'low').length,
                    medium: db.borrowers.filter(b => b.riskCategory === 'medium').length,
                    high: db.borrowers.filter(b => b.riskCategory === 'high').length,
                },
            },
            loans: {
                total: db.stats.totalLoans,
                totalOutstanding: db.stats.totalOutstanding,
                byDpd: db.stats.dpdDistribution,
                byStatus: {
                    active: db.loans.filter(l => l.status === 'active').length,
                    npa: db.loans.filter(l => l.status === 'npa').length,
                },
            },
            recoveryCases: {
                total: db.stats.activeRecoveryCases,
                byStatus: {
                    active: db.recoveryCases.filter(c => c.status === 'active').length,
                    promise_pending: db.recoveryCases.filter(c => c.status === 'promise_pending').length,
                    escalated: db.recoveryCases.filter(c => c.status === 'escalated').length,
                    disputed: db.recoveryCases.filter(c => c.status === 'disputed').length,
                    dnd: db.recoveryCases.filter(c => c.status === 'dnd').length,
                },
            },
        },
        timestamp: new Date().toISOString(),
        source: 'demo_bank',
    });
}
