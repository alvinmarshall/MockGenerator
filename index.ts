import {AccountSchema, generateAccount} from './kyc/account'
import {generateCustomerInd} from './kyc/customer_ind'
import {generateCustomerOrg} from './kyc/customer_org'
import {generateProductOffered} from './kyc/product_offered'
import {generateBusinessUnits} from './kyc/business_unit'
import {generateCountriesOfOperation} from './kyc/countries_of_operation'
import {generateRelationships} from './kyc/relationship'
import {generateAddresses} from './kyc/address'
import {generateBeneficialOwners} from './kyc/beneficial_owners'
import {generateDocuments} from "./kyc/document";
import {DailyCashEquivalentDepositsStructuring} from "./transaction/rules/DailyCashEquivalentDepositsStructuring";
import {CashEquivalentDepositsStructuring} from "./transaction/rules/CashEquivalentDepositsStructuring";
import {DailyCashEquivalentWithdrawalsStructuring} from "./transaction/rules/DailyCashEquivalentWithdrawalsStructuring";
import {CashEquivalentWithdrawalsStructuring} from "./transaction/rules/CashEquivalentWithdrawalsStructuring";
import {CashEquivalentCardPaymentsStructuring} from "./transaction/rules/CashEquivalentCardPaymentsStructuring";
import {CashEquivalentLoanPaymentsStructuring} from "./transaction/rules/CashEquivalentLoanPaymentsStructuring";
import {IncomingHighRiskFundTransfersStructuring} from "./transaction/rules/IncomingHighRiskFundTransfersStructuring";
import {ComplexLayeringOutgoing} from "./transaction/rules/ComplexLayeringOutgoing";
import {PartyGroupAccountSchema, PartyGroupSchema} from "./transaction/partygroup";
import {ComplexLayeringIncoming} from "./transaction/rules/ComplexLayeringIncoming";
import {DailyIncomingFundTransfersStructuring} from "./transaction/rules/DailyIncomingFundTransfersStructuring";
import {DailyOutgoingFundTransfersStructuring} from "./transaction/rules/DailyOutgoingFundTransfersStructuring";
import {ExcessiveDailyIncomingFundTransfers} from "./transaction/rules/ExcessiveDailyIncomingFundTransfers";
import {ExcessiveDailyOutgoingFundTransfers} from "./transaction/rules/ExcessiveDailyOutgoingFundTransfers";
import {FlowThroughFundsInvestment} from "./transaction/rules/FlowThroughFundsInvestment";
import {FlowThroughFundsLongPeriod} from "./transaction/rules/FlowThroughFundsLongPeriod";

const total = 10
//
// generateCustomerInd(total)
// generateCustomerOrg(total)
// generateBusinessUnits(total)
// generateAccount(total)
// generateAddresses(total)
// generateBeneficialOwners(total)
// generateRelationships(total)
// generateProductOffered(total)
// generateCountriesOfOperation(total)
// generateDocuments(total)

// const rule = new DailyCashEquivalentDepositsStructuring()
// const rule = new CashEquivalentDepositsStructuring()
const rule = new DailyCashEquivalentWithdrawalsStructuring()
// const rule = new CashEquivalentWithdrawalsStructuring()
// const rule = new CashEquivalentCardPaymentsStructuring()
// const rule = new CashEquivalentLoanPaymentsStructuring()

// const rule = new IncomingHighRiskFundTransfersStructuring()
// const rule = new ComplexLayeringOutgoing()
// const rule = new ComplexLayeringIncoming()
// const rule = new DailyIncomingFundTransfersStructuring()
// const rule = new DailyOutgoingFundTransfersStructuring()
// const rule = new ExcessiveDailyIncomingFundTransfers()
// const rule = new ExcessiveDailyOutgoingFundTransfers()
// const rule = new FlowThroughFundsInvestment()
// const rule = new FlowThroughFundsLongPeriod()
const account: AccountSchema = {
    id: "28dba766-60a2-4399-92ad-89655ae81f0c",
    account_type: "personal",
    account_number: "97228831",
    customer_id: "390e9c4c-e2fa-40dc-95b2-fc3d9418b9c4",
    extcid: "9",
    account_holder: "Terry Sentinella",
    opening_date: "2016-07-22"

}

const partyGroup: PartyGroupSchema = {
    accounts: [],
    external: false,
    id: "6122627d-7697-4905-8147-fe6f57adbe89",
    name: account.account_holder

}

const partyAccount: PartyGroupAccountSchema = {
    account_number: account.account_number,
    customer_id: account.customer_id,
    entity_type: "ACCOUNT",
    external: false,
    id: account.customer_id,
    name: account.account_holder,
    party_group_id: partyGroup.id

}
partyGroup.accounts = [partyAccount]


rule.generateRule(account)