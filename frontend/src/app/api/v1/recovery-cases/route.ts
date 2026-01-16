import { NextRequest, NextResponse } from 'next/server';
import { getDemoDatabase, getLoanById, getBorrowerById, getLoansByDpdBucket, type LoanAccount, type RecoveryCase } from '@/lib/demo-bank/database';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status');
    const dpdBucket = searchParams.get('dpdBucket');
    const id = searchParams.get('id');

    const db = getDemoDatabase();

    // Single case lookup
    if (id) {
        const recoveryCase = db.recoveryCases.find(c => c.id === id);
        if (!recoveryCase) {
            return NextResponse.json({ success: false, error: 'Recovery case not found' }, { status: 404 });
        }
        const loan = getLoanById(recoveryCase.loanId);
        const borrower = getBorrowerById(recoveryCase.borrowerId);
        return NextResponse.json({
            success: true,
            data: {
                ...recoveryCase,
                loan: loan || null,
                borrower: borrower ? {
                    id: borrower.id,
                    name: borrower.name,
                    phone: `****${borrower.phone.slice(-4)}`,
                } : null,
            },
            timestamp: new Date().toISOString(),
            source: 'demo_bank',
        });
    }

    // List with filtering and pagination
    let filtered = db.recoveryCases;
    if (status && status !== 'all') {
        filtered = filtered.filter(c => c.status === status);
    }
    if (dpdBucket && dpdBucket !== 'all') {
        const loanIds = new Set(
            getLoansByDpdBucket(dpdBucket as LoanAccount['dpdBucket']).map(l => l.id)
        );
        filtered = filtered.filter(c => loanIds.has(c.loanId));
    }

    const start = (page - 1) * limit;
    const paged = filtered.slice(start, start + limit);

    return NextResponse.json({
        success: true,
        data: paged.map(c => {
            const loan = getLoanById(c.loanId);
            const borrower = getBorrowerById(c.borrowerId);
            return {
                id: c.id,
                loanId: c.loanId,
                borrowerId: c.borrowerId,
                borrowerName: borrower?.name || 'Unknown',
                loanType: loan?.loanType || 'unknown',
                dpd: loan?.dpd || 0,
                outstandingAmount: loan?.outstandingAmount || 0,
                status: c.status,
                strategy: c.strategy,
                totalAttempts: c.totalAttempts,
                lastOutcome: c.lastOutcome,
                nextActionDate: c.nextActionDate,
                promiseAmount: c.promiseAmount,
                promiseDate: c.promiseDate,
            };
        }),
        pagination: {
            page,
            limit,
            total: filtered.length,
            totalPages: Math.ceil(filtered.length / limit),
        },
        timestamp: new Date().toISOString(),
        source: 'demo_bank',
    });
}
