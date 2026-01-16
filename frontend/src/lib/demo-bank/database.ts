// Demo Bank Database - Simulated bank data for testing
// This module provides realistic borrower and loan data for the demo environment

export interface Borrower {
    id: string;
    name: string;
    phone: string;
    email: string;
    panNumber: string;
    dateOfBirth: string;
    address: {
        line1: string;
        city: string;
        state: string;
        pincode: string;
    };
    kycStatus: 'verified' | 'pending' | 'failed';
    riskCategory: 'low' | 'medium' | 'high';
    createdAt: string;
}

export interface LoanAccount {
    id: string;
    borrowerId: string;
    loanType: 'personal' | 'vehicle' | 'home' | 'credit_card' | 'business';
    principalAmount: number;
    outstandingAmount: number;
    emiAmount: number;
    interestRate: number;
    tenure: number;
    disbursedDate: string;
    nextEmiDate: string;
    dpd: number;
    dpdBucket: '0' | '1-30' | '31-60' | '61-90' | '90+';
    status: 'active' | 'closed' | 'npa' | 'written_off';
    recoveryStrategy: string;
}

export interface RecoveryCase {
    id: string;
    loanId: string;
    borrowerId: string;
    status: 'active' | 'promise_pending' | 'escalated' | 'disputed' | 'dnd' | 'resolved';
    strategy: string;
    totalAttempts: number;
    lastOutcome: string;
    lastContactDate: string;
    nextActionDate: string;
    promiseAmount?: number;
    promiseDate?: string;
    createdAt: string;
}

// Indian names for realistic data
const firstNames = [
    'Rajesh', 'Priya', 'Amit', 'Sunita', 'Vikram', 'Meera', 'Kiran', 'Ankit',
    'Pooja', 'Rahul', 'Neha', 'Sanjay', 'Kavita', 'Deepak', 'Swati', 'Arun',
    'Divya', 'Manish', 'Rekha', 'Suresh', 'Asha', 'Vivek', 'Geeta', 'Ravi',
    'Anjali', 'Mohit', 'Shweta', 'Anil', 'Pallavi', 'Gaurav'
];

const lastNames = [
    'Kumar', 'Sharma', 'Patel', 'Verma', 'Singh', 'Reddy', 'Desai', 'Gupta',
    'Agarwal', 'Joshi', 'Mehta', 'Shah', 'Rao', 'Pillai', 'Nair', 'Menon',
    'Iyer', 'Kapoor', 'Malhotra', 'Bose', 'Das', 'Choudhary', 'Thakur', 'Saxena'
];

const cities = [
    { name: 'Mumbai', state: 'Maharashtra', pincodes: ['400001', '400050', '400070'] },
    { name: 'Delhi', state: 'Delhi', pincodes: ['110001', '110020', '110045'] },
    { name: 'Bangalore', state: 'Karnataka', pincodes: ['560001', '560034', '560078'] },
    { name: 'Chennai', state: 'Tamil Nadu', pincodes: ['600001', '600024', '600089'] },
    { name: 'Hyderabad', state: 'Telangana', pincodes: ['500001', '500034', '500082'] },
    { name: 'Pune', state: 'Maharashtra', pincodes: ['411001', '411038', '411057'] },
    { name: 'Kolkata', state: 'West Bengal', pincodes: ['700001', '700029', '700064'] },
    { name: 'Jaipur', state: 'Rajasthan', pincodes: ['302001', '302017', '302034'] },
];

const loanTypes: LoanAccount['loanType'][] = ['personal', 'vehicle', 'home', 'credit_card', 'business'];

const recoveryStrategies = {
    '0': 'No Recovery Needed',
    '1-30': 'DPD 1-30 Soft Recovery',
    '31-60': 'DPD 31-60 Medium Recovery',
    '61-90': 'DPD 61-90 Intensive Recovery',
    '90+': 'DPD 90+ Critical Recovery',
};

const outcomes = [
    'Promise to Pay',
    'Payment Confirmed',
    'Escalated to Human',
    'Dispute Raised',
    'RNR - No Answer',
    'Callback Requested',
    'Partial Payment Discussed',
    'DND Requested',
];

// Utility functions
function randomElement<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function randomBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generatePAN(): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const chars = Array(3).fill(0).map(() => letters[Math.floor(Math.random() * 26)]).join('');
    const num = randomBetween(1000, 9999);
    const last = letters[Math.floor(Math.random() * 26)];
    return `${chars}P${chars[0]}${num}${last}`;
}

function generatePhone(): string {
    const prefixes = ['98', '97', '96', '95', '94', '93', '91', '90', '88', '87'];
    return `${randomElement(prefixes)}${randomBetween(10000000, 99999999)}`;
}

function getDpdBucket(dpd: number): LoanAccount['dpdBucket'] {
    if (dpd === 0) return '0';
    if (dpd <= 30) return '1-30';
    if (dpd <= 60) return '31-60';
    if (dpd <= 90) return '61-90';
    return '90+';
}

function generateDate(daysAgo: number): string {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toISOString().split('T')[0];
}

// Generate borrowers
function generateBorrowers(count: number): Borrower[] {
    const borrowers: Borrower[] = [];

    for (let i = 1; i <= count; i++) {
        const firstName = randomElement(firstNames);
        const lastName = randomElement(lastNames);
        const city = randomElement(cities);

        borrowers.push({
            id: `BRW-2024-${String(i).padStart(5, '0')}`,
            name: `${firstName} ${lastName}`,
            phone: generatePhone(),
            email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${randomBetween(1, 99)}@email.com`,
            panNumber: generatePAN(),
            dateOfBirth: generateDate(randomBetween(8000, 20000)), // 22-55 years old
            address: {
                line1: `${randomBetween(1, 500)}, ${randomElement(['A', 'B', 'C', 'D', 'E'])} Block, ${randomElement(['Sector', 'Phase', 'Colony', 'Nagar'])} ${randomBetween(1, 50)}`,
                city: city.name,
                state: city.state,
                pincode: randomElement(city.pincodes),
            },
            kycStatus: randomElement(['verified', 'verified', 'verified', 'pending']),
            riskCategory: randomElement(['low', 'low', 'medium', 'medium', 'high']),
            createdAt: generateDate(randomBetween(30, 730)),
        });
    }

    return borrowers;
}

// Generate loan accounts
function generateLoans(borrowers: Borrower[]): LoanAccount[] {
    const loans: LoanAccount[] = [];
    let loanIndex = 1;

    // Distribution: 40% current, 25% DPD 1-30, 15% DPD 31-60, 12% DPD 61-90, 8% DPD 90+
    const dpdDistribution = [
        { bucket: '0' as const, weight: 40, dpdRange: [0, 0] },
        { bucket: '1-30' as const, weight: 25, dpdRange: [1, 30] },
        { bucket: '31-60' as const, weight: 15, dpdRange: [31, 60] },
        { bucket: '61-90' as const, weight: 12, dpdRange: [61, 90] },
        { bucket: '90+' as const, weight: 8, dpdRange: [91, 180] },
    ];

    for (const borrower of borrowers) {
        // Each borrower has 1-3 loans
        const loanCount = randomBetween(1, 2);

        for (let i = 0; i < loanCount; i++) {
            const loanType = randomElement(loanTypes);
            let principal: number;
            let tenure: number;

            switch (loanType) {
                case 'home':
                    principal = randomBetween(2000000, 10000000);
                    tenure = randomBetween(120, 240);
                    break;
                case 'vehicle':
                    principal = randomBetween(300000, 1500000);
                    tenure = randomBetween(36, 84);
                    break;
                case 'personal':
                    principal = randomBetween(50000, 500000);
                    tenure = randomBetween(12, 60);
                    break;
                case 'credit_card':
                    principal = randomBetween(20000, 200000);
                    tenure = 0;
                    break;
                case 'business':
                    principal = randomBetween(500000, 5000000);
                    tenure = randomBetween(24, 120);
                    break;
            }

            // Select DPD based on weighted distribution
            const rand = Math.random() * 100;
            let cumulative = 0;
            let selectedDist = dpdDistribution[0];
            for (const dist of dpdDistribution) {
                cumulative += dist.weight;
                if (rand <= cumulative) {
                    selectedDist = dist;
                    break;
                }
            }

            const dpd = randomBetween(selectedDist.dpdRange[0], selectedDist.dpdRange[1]);
            const dpdBucket = getDpdBucket(dpd);
            const outstanding = Math.round(principal * (randomBetween(20, 80) / 100));
            const emi = Math.round(principal / (tenure || 12) * 1.15);

            loans.push({
                id: `LN-2024-${String(loanIndex++).padStart(5, '0')}`,
                borrowerId: borrower.id,
                loanType,
                principalAmount: principal,
                outstandingAmount: outstanding,
                emiAmount: emi,
                interestRate: randomBetween(8, 24),
                tenure,
                disbursedDate: generateDate(randomBetween(90, 730)),
                nextEmiDate: generateDate(-randomBetween(1, 30)),
                dpd,
                dpdBucket,
                status: dpd > 90 ? 'npa' : 'active',
                recoveryStrategy: recoveryStrategies[dpdBucket],
            });
        }
    }

    return loans;
}

// Generate recovery cases for loans with DPD > 0
function generateRecoveryCases(loans: LoanAccount[], borrowers: Borrower[]): RecoveryCase[] {
    const cases: RecoveryCase[] = [];
    let caseIndex = 1;

    const borrowerMap = new Map(borrowers.map(b => [b.id, b]));

    for (const loan of loans) {
        if (loan.dpd > 0) {
            const status: RecoveryCase['status'] = randomElement([
                'active', 'active', 'active',
                'promise_pending',
                'escalated',
                'disputed',
                'dnd',
            ]);

            const attempts = Math.min(loan.dpd, randomBetween(1, 15));

            cases.push({
                id: `RC-2024-${String(caseIndex++).padStart(4, '0')}`,
                loanId: loan.id,
                borrowerId: loan.borrowerId,
                status,
                strategy: loan.recoveryStrategy,
                totalAttempts: attempts,
                lastOutcome: randomElement(outcomes),
                lastContactDate: generateDate(randomBetween(0, 7)),
                nextActionDate: generateDate(-randomBetween(0, 3)),
                promiseAmount: status === 'promise_pending' ? Math.round(loan.emiAmount * randomBetween(1, 3)) : undefined,
                promiseDate: status === 'promise_pending' ? generateDate(-randomBetween(3, 14)) : undefined,
                createdAt: generateDate(loan.dpd + randomBetween(0, 5)),
            });
        }
    }

    return cases;
}

// Main database generation
export function generateDemoDatabase() {
    const borrowers = generateBorrowers(100);
    const loans = generateLoans(borrowers);
    const recoveryCases = generateRecoveryCases(loans, borrowers);

    return {
        borrowers,
        loans,
        recoveryCases,
        stats: {
            totalBorrowers: borrowers.length,
            totalLoans: loans.length,
            activeRecoveryCases: recoveryCases.length,
            totalOutstanding: loans.reduce((sum, l) => sum + l.outstandingAmount, 0),
            dpdDistribution: {
                '0': loans.filter(l => l.dpdBucket === '0').length,
                '1-30': loans.filter(l => l.dpdBucket === '1-30').length,
                '31-60': loans.filter(l => l.dpdBucket === '31-60').length,
                '61-90': loans.filter(l => l.dpdBucket === '61-90').length,
                '90+': loans.filter(l => l.dpdBucket === '90+').length,
            },
        },
    };
}

// Singleton database instance
let db: ReturnType<typeof generateDemoDatabase> | null = null;

export function getDemoDatabase() {
    if (!db) {
        db = generateDemoDatabase();
    }
    return db;
}

// API helper functions
export function getBorrowerById(id: string) {
    return getDemoDatabase().borrowers.find(b => b.id === id);
}

export function getLoanById(id: string) {
    return getDemoDatabase().loans.find(l => l.id === id);
}

export function getLoansByBorrowerId(borrowerId: string) {
    return getDemoDatabase().loans.filter(l => l.borrowerId === borrowerId);
}

export function getRecoveryCaseByLoanId(loanId: string) {
    return getDemoDatabase().recoveryCases.find(c => c.loanId === loanId);
}

export function getLoansByDpdBucket(bucket: LoanAccount['dpdBucket']) {
    return getDemoDatabase().loans.filter(l => l.dpdBucket === bucket);
}
