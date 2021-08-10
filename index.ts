import {generateAccount} from './account'
import {generateCustomerInd} from './customer_ind'
import {generateCustomerOrg} from './customer_org'
import {generateProductOffered} from './product_offered'
import {generateBusinessUnits} from './business_unit'
import {generateCountriesOfOperation} from './countries_of_operation'
import {generateRelationships} from './relationship'
import {generateAddresses} from './address'
import {generateBeneficialOwners} from './beneficial_owners'
import {generateDocuments} from "./document";

const total = 100

generateCustomerInd(total)
generateCustomerOrg(total)
generateBusinessUnits(total)
generateAccount(total)
generateAddresses(total)
generateBeneficialOwners(total)
generateRelationships(total)
generateProductOffered(total)
generateCountriesOfOperation(total)
generateDocuments(total)

