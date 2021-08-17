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
// const rule = new DailyCashEquivalentWithdrawalsStructuring()
// const rule = new CashEquivalentWithdrawalsStructuring()
// const rule = new CashEquivalentCardPaymentsStructuring()
// const rule = new CashEquivalentLoanPaymentsStructuring()

const rule = new IncomingHighRiskFundTransfersStructuring()
const account:AccountSchema = {
    id: "28dba766-60a2-4399-92ad-89655ae81f0c",
    account_type: "personal",
    account_number: "97228831",
    customer_id: "390e9c4c-e2fa-40dc-95b2-fc3d9418b9c4",
    extcid: "9",
    account_holder: "Terry Sentinella",
    opening_date: "2016-07-22"

}
rule.generateRule(account)