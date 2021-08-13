export interface TransactionDto {
    account: Account;
    transaction: Transaction;
    historicalTransactions?: (HistoricalTransactionsEntity)[] | null;
    peerGroupBehaviorProfiles?: (null)[] | null;
    entityFocusClassification?: (null)[] | null;
}
export interface Account {
    id: string;
    account_type: string;
    account_number: string;
    customer_id: string;
    extcid: string;
    account_holder: string;
    opening_date: string;
}
export interface Transaction {
    transactionNumber: string;
    debitCredit: string;
    amount: number;
    desc: string;
    date: string;
    country: string;
    status: string;
    code: string;
    type: string;
    accountNumber: string;
    accountType: string;
    customerId: string;
    beneficiaryId: string;
    branch?: null;
}
export interface HistoricalTransactionsEntity {
    transactionNumber: string | number;
    debitCredit: string;
    amount: number;
    desc: string;
    date: string;
    country: string;
    status: string;
    code: string;
    type: string;
    accountNumber: string;
    accountType: string;
    customerId: string;
    beneficiaryId: string;
    branch?: null;
}
