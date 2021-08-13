import {AccountSchema, generateAccount} from './account'
import {generateCustomerInd} from './customer_ind'
import {generateCustomerOrg} from './customer_org'
import {generateProductOffered} from './product_offered'
import {generateBusinessUnits} from './business_unit'
import {generateCountriesOfOperation} from './countries_of_operation'
import {generateRelationships} from './relationship'
import {generateAddresses} from './address'
import {generateBeneficialOwners} from './beneficial_owners'
import {generateDocuments} from "./document";
import {DailyCashEquivalentDepositsStructuring} from "./transaction/rules/DailyCashEquivalentDepositsStructuring";
import {CashEquivalentDepositsStructuring} from "./transaction/rules/CashEquivalentDepositsStructuring";
import {DailyCashEquivalentWithdrawalsStructuring} from "./transaction/rules/DailyCashEquivalentWithdrawalsStructuring";

// const total = 100
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