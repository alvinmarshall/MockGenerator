import {AccountSchema} from "../account";

export abstract class Transactions {
    abstract generateRule(account: AccountSchema): void
}