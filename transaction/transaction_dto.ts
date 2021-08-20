import {PartyGroupSchema} from "./partygroup";
import {HistoricalBehaviorProfiles} from "./historicalBehaviorProfiles";
import {LogicalEntity} from "./logicalEntity";

export interface TransactionDto {
    account?: (Account)|null;
    transaction: Transaction;
    historicalTransactions?: (HistoricalTransactionsEntity)[] | null;
    historicalBehaviorProfiles?: (HistoricalBehaviorProfiles) | null
    peerGroupBehaviorProfiles?: (null)[] | null;
    entityFocusClassification?: (null)[] | null;
    partyGroupList?: (PartyGroupSchema)[] | null
    logicalEntity?: (LogicalEntity) | null
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
    oppAccountId?: (string) | null
    oppAccountNumber?: (string) | null
    oppOrgKey?: (string) | null;
    beneficiaryId?: (string) | null;
    branch?: (string) | null;
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
    oppAccountId?: (string) | null
    oppAccountNumber?: (string) | null
    oppOrgKey?: (string) | null;
    beneficiaryId?: (string) | null;
    branch?: (string) | null;
}
