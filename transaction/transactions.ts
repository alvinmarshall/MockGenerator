import {AccountSchema} from "../kyc/account";
import {PartyGroupSchema} from "./partygroup";

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
    abstract generateRule(account: AccountSchema, partyGroup?: PartyGroupSchema): any[]

    protected getHeaders() {
        return [
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
    }
}