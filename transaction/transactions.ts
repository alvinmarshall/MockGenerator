import {AccountSchema} from "../kyc/account";
import {PartyGroupSchema} from "./partygroup";
import {HistoricalTransactionsEntity} from "./transaction_dto";

// Transaction Number
// Account Number
// Debit/Credit
// Amount
// Transaction Post Date
// Transaction Description
// Type Of Transaction
// Country Code
// Transaction Status
// Transaction Code
// Customer ID
// Account Type
// Opp Account Id
// Opp Account Number
// Opp Org Id

export const transactionHeaders = [
    'Transaction Number',
    'Account Number',
    'Debit/Credit',
    'Amount',
    'Transaction Post Date',
    'Transaction Description',
    'Type Of Transaction',
    'Country Code',
    'Transaction Status',
    'Transaction Code',
    'Customer ID',
    'Account Type',
    'Opp Account Id',
    'Opp Account Number',
    'Opp Org Id'
]

export abstract class Transactions {
    protected abstract generateRule(account: AccountSchema, partyGroup?: PartyGroupSchema): HistoricalTransactionsEntity[]

    protected results: HistoricalTransactionsEntity[]
    protected total: number
    protected rule: string
    protected name: string
}