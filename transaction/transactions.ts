import {AccountSchema} from "../kyc/account";

export abstract class Transactions {
    abstract generateRule(account: AccountSchema): any[]
}