import { NextRequest, NextResponse } from 'next/server';
import { getDemoDatabase, getBorrowerById, getLoansByBorrowerId } from '@/lib/demo-bank/database';

// Mask sensitive data
function maskPhone(phone: string): string {
    return `****${phone.slice(-4)}`;
}

function maskEmail(email: string): string {
    const [name, domain] = email.split('@');
    return `${name[0]}***@${domain}`;
}

function maskPAN(pan: string): string {
    return `${pan.slice(0, 3)}****${pan.slice(-1)}`;
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search')?.toLowerCase() || '';
    const id = searchParams.get('id');

    const db = getDemoDatabase();

    // Single borrower lookup
    if (id) {
        const borrower = getBorrowerById(id);
        if (!borrower) {
            return NextResponse.json({ success: false, error: 'Borrower not found' }, { status: 404 });
        }
        const loans = getLoansByBorrowerId(id);
        return NextResponse.json({
            success: true,
            data: {
                id: borrower.id,
                name: borrower.name,
                phone: maskPhone(borrower.phone),
                email: maskEmail(borrower.email),
                panNumber: maskPAN(borrower.panNumber),
                city: borrower.address.city,
                state: borrower.address.state,
                kycStatus: borrower.kycStatus,
                riskCategory: borrower.riskCategory,
                loans: loans.map(l => ({
                    id: l.id,
                    type: l.loanType,
                    outstanding: l.outstandingAmount,
                    emi: l.emiAmount,
                    dpd: l.dpd,
                    status: l.status,
                })),
            },
            timestamp: new Date().toISOString(),
            source: 'demo_bank',
        });
    }

    // List with pagination
    let filtered = db.borrowers;
    if (search) {
        filtered = filtered.filter(b =>
            b.name.toLowerCase().includes(search) ||
            b.id.toLowerCase().includes(search)
        );
    }

    const start = (page - 1) * limit;
    const paged = filtered.slice(start, start + limit);

    return NextResponse.json({
        success: true,
        data: paged.map(b => ({
            id: b.id,
            name: b.name,
            phone: maskPhone(b.phone),
            email: maskEmail(b.email),
            city: b.address.city,
            state: b.address.state,
            kycStatus: b.kycStatus,
            riskCategory: b.riskCategory,
        })),
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
