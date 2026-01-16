import { NextResponse } from 'next/server';
import { getDemoDatabase } from '@/lib/demo-bank/database';

export async function GET() {
    const db = getDemoDatabase();

    return NextResponse.json({
        success: true,
        data: {
            status: 'connected',
            bank: 'Demo Bank',
            lastSync: new Date().toISOString(),
            recordCounts: {
                borrowers: db.stats.totalBorrowers,
                loans: db.stats.totalLoans,
                recoveryCases: db.stats.activeRecoveryCases,
            },
        },
        timestamp: new Date().toISOString(),
        source: 'demo_bank',
    });
}
