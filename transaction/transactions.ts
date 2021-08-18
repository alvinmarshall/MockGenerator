import {AccountSchema} from "../kyc/account";
import {PartyGroupSchema} from "./partygroup";

export abstract class Transactions {
    abstract generateRule(account: AccountSchema, partyGroup?: PartyGroupSchema): any[]
}