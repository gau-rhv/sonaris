import { NextRequest, NextResponse } from 'next/server';
import { getDemoDatabase, getLoanById, getBorrowerById, getLoansByDpdBucket, type LoanAccount } from '@/lib/demo-bank/database';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const dpdBucket = searchParams.get('dpdBucket');
    const id = searchParams.get('id');

    const db = getDemoDatabase();

    // Single loan lookup
    if (id) {
        const loan = getLoanById(id);
        if (!loan) {
            return NextResponse.json({ success: false, error: 'Loan not found' }, { status: 404 });
        }
        const borrower = getBorrowerById(loan.borrowerId);
        return NextResponse.json({
            success: true,
            data: {
                ...loan,
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
    let filtered = db.loans;
    if (dpdBucket && dpdBucket !== 'all') {
        filtered = getLoansByDpdBucket(dpdBucket as LoanAccount['dpdBucket']);
    }

    const start = (page - 1) * limit;
    const paged = filtered.slice(start, start + limit);

    return NextResponse.json({
        success: true,
        data: paged.map(l => {
            const borrower = getBorrowerById(l.borrowerId);
            return {
                id: l.id,
                borrowerId: l.borrowerId,
                borrowerName: borrower?.name || 'Unknown',
                loanType: l.loanType,
                principalAmount: l.principalAmount,
                outstandingAmount: l.outstandingAmount,
                emiAmount: l.emiAmount,
                dpd: l.dpd,
                dpdBucket: l.dpdBucket,
                status: l.status,
                recoveryStrategy: l.recoveryStrategy,
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
