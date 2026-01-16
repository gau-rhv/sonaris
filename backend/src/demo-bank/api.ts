// Demo Bank REST API Routes
// These endpoints expose the demo bank data for frontend consumption

import {
    getDemoDatabase,
    getBorrowerById,
    getLoanById,
    getLoansByBorrowerId,
    getRecoveryCaseByLoanId,
    getLoansByDpdBucket,
    type Borrower,
    type LoanAccount,
    type RecoveryCase,
} from './database';

// API Response types
interface ApiResponse<T> {
    success: boolean;
    data: T;
    timestamp: string;
    source: 'demo_bank';
}

interface PaginatedResponse<T> extends ApiResponse<T[]> {
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

// Helper to create API response
function createResponse<T>(data: T): ApiResponse<T> {
    return {
        success: true,
        data,
        timestamp: new Date().toISOString(),
        source: 'demo_bank',
    };
}

function createPaginatedResponse<T>(
    data: T[],
    page: number,
    limit: number,
    total: number
): PaginatedResponse<T> {
    return {
        success: true,
        data,
        timestamp: new Date().toISOString(),
        source: 'demo_bank',
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
}

// Mask sensitive data for display
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

// Transform borrower for API response (with masking)
function transformBorrower(b: Borrower) {
    return {
        id: b.id,
        name: b.name,
        phone: maskPhone(b.phone),
        email: maskEmail(b.email),
        panNumber: maskPAN(b.panNumber),
        city: b.address.city,
        state: b.address.state,
        kycStatus: b.kycStatus,
        riskCategory: b.riskCategory,
    };
}

// API Handlers
export const apiHandlers = {
    // GET /api/v1/health
    health: () => {
        const db = getDemoDatabase();
        return createResponse({
            status: 'connected',
            bank: 'Demo Bank',
            lastSync: new Date().toISOString(),
            recordCounts: {
                borrowers: db.stats.totalBorrowers,
                loans: db.stats.totalLoans,
                recoveryCases: db.stats.activeRecoveryCases,
            },
        });
    },

    // GET /api/v1/borrowers
    getBorrowers: (params: { page?: number; limit?: number; search?: string }) => {
        const db = getDemoDatabase();
        const page = params.page || 1;
        const limit = params.limit || 20;
        const search = params.search?.toLowerCase() || '';

        let filtered = db.borrowers;
        if (search) {
            filtered = filtered.filter(b =>
                b.name.toLowerCase().includes(search) ||
                b.id.toLowerCase().includes(search)
            );
        }

        const start = (page - 1) * limit;
        const paged = filtered.slice(start, start + limit);

        return createPaginatedResponse(
            paged.map(transformBorrower),
            page,
            limit,
            filtered.length
        );
    },

    // GET /api/v1/borrowers/:id
    getBorrower: (id: string) => {
        const borrower = getBorrowerById(id);
        if (!borrower) {
            return { success: false, error: 'Borrower not found' };
        }
        const loans = getLoansByBorrowerId(id);
        return createResponse({
            ...transformBorrower(borrower),
            loans: loans.map(l => ({
                id: l.id,
                type: l.loanType,
                outstanding: l.outstandingAmount,
                emi: l.emiAmount,
                dpd: l.dpd,
                status: l.status,
            })),
        });
    },

    // GET /api/v1/loans
    getLoans: (params: { page?: number; limit?: number; dpdBucket?: string }) => {
        const db = getDemoDatabase();
        const page = params.page || 1;
        const limit = params.limit || 20;

        let filtered = db.loans;
        if (params.dpdBucket && params.dpdBucket !== 'all') {
            filtered = getLoansByDpdBucket(params.dpdBucket as LoanAccount['dpdBucket']);
        }

        const start = (page - 1) * limit;
        const paged = filtered.slice(start, start + limit);

        return createPaginatedResponse(
            paged.map(l => {
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
            page,
            limit,
            filtered.length
        );
    },

    // GET /api/v1/loans/:id
    getLoan: (id: string) => {
        const loan = getLoanById(id);
        if (!loan) {
            return { success: false, error: 'Loan not found' };
        }
        const borrower = getBorrowerById(loan.borrowerId);
        const recoveryCase = getRecoveryCaseByLoanId(id);

        return createResponse({
            ...loan,
            borrower: borrower ? transformBorrower(borrower) : null,
            recoveryCase: recoveryCase || null,
        });
    },

    // GET /api/v1/recovery-cases
    getRecoveryCases: (params: { page?: number; limit?: number; status?: string; dpdBucket?: string }) => {
        const db = getDemoDatabase();
        const page = params.page || 1;
        const limit = params.limit || 20;

        let filtered = db.recoveryCases;
        if (params.status && params.status !== 'all') {
            filtered = filtered.filter(c => c.status === params.status);
        }
        if (params.dpdBucket && params.dpdBucket !== 'all') {
            const loanIds = new Set(
                getLoansByDpdBucket(params.dpdBucket as LoanAccount['dpdBucket']).map(l => l.id)
            );
            filtered = filtered.filter(c => loanIds.has(c.loanId));
        }

        const start = (page - 1) * limit;
        const paged = filtered.slice(start, start + limit);

        return createPaginatedResponse(
            paged.map(c => {
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
            page,
            limit,
            filtered.length
        );
    },

    // GET /api/v1/recovery-cases/:id
    getRecoveryCase: (id: string) => {
        const db = getDemoDatabase();
        const recoveryCase = db.recoveryCases.find(c => c.id === id);
        if (!recoveryCase) {
            return { success: false, error: 'Recovery case not found' };
        }
        const loan = getLoanById(recoveryCase.loanId);
        const borrower = getBorrowerById(recoveryCase.borrowerId);

        return createResponse({
            ...recoveryCase,
            loan: loan || null,
            borrower: borrower ? transformBorrower(borrower) : null,
        });
    },

    // GET /api/v1/stats
    getStats: () => {
        const db = getDemoDatabase();
        return createResponse({
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
        });
    },

    // GET /api/v1/strategies
    getStrategies: () => {
        return createResponse([
            {
                id: 'STR-001',
                name: 'DPD 1-30 Soft Recovery',
                dpdRange: [1, 30],
                status: 'active',
                actions: [
                    { day: 1, type: 'sms', description: 'Payment reminder SMS' },
                    { day: 3, type: 'ai_call', description: 'AI soft reminder call' },
                    { day: 7, type: 'ai_call', description: 'AI follow-up call' },
                    { day: 14, type: 'ai_call', description: 'AI escalation warning' },
                ],
            },
            {
                id: 'STR-002',
                name: 'DPD 31-60 Medium Recovery',
                dpdRange: [31, 60],
                status: 'active',
                actions: [
                    { day: 0, type: 'ai_call', description: 'Immediate AI outreach' },
                    { day: 2, type: 'ai_call', description: 'AI negotiation call' },
                    { day: 5, type: 'ai_call', description: 'AI final warning' },
                    { day: 7, type: 'escalate', description: 'Human escalation' },
                ],
            },
            {
                id: 'STR-003',
                name: 'DPD 61-90 Intensive Recovery',
                dpdRange: [61, 90],
                status: 'active',
                actions: [
                    { day: 0, type: 'ai_call', description: 'Urgent AI call' },
                    { day: 1, type: 'ai_call', description: 'Daily follow-up' },
                    { day: 3, type: 'escalate', description: 'Supervisor review' },
                ],
            },
            {
                id: 'STR-004',
                name: 'DPD 90+ Critical Recovery',
                dpdRange: [91, 999],
                status: 'active',
                actions: [
                    { day: 0, type: 'human_call', description: 'Immediate human review' },
                    { day: 1, type: 'ai_call', description: 'Legal notice reminder' },
                ],
            },
        ]);
    },
};

export default apiHandlers;
