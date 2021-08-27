import {AccountGenerator} from './account'
import {AddressGenerator} from "./address";
import {BeneficialOwnersGenerator} from "./beneficial_owners";
import {BusinessUnitGenerator} from "./business_unit";
import {CountryOfOperationGenerator} from "./countries_of_operation";
import {ProductOfferedGenerator} from "./product_offered";
import {DocumentGenerator} from "./document";
import {CustomerIndGenerator} from "./customer_ind";
import {CustomerOrgGenerator} from "./customer_org";
import {RelationshipGenerator} from "./relationship";


export const runKYC = (count: number) => {
    const correlationIds = ['1', '3', '5', '9', '6', '4', '2']
    const account: AccountGenerator = new AccountGenerator(count, correlationIds)
    const addresses: AddressGenerator = new AddressGenerator(correlationIds)
    const beneficialOwners: BeneficialOwnersGenerator = new BeneficialOwnersGenerator(correlationIds)
    const businessUnit: BusinessUnitGenerator = new BusinessUnitGenerator(correlationIds)
    const countriesOfOperation: CountryOfOperationGenerator = new CountryOfOperationGenerator(correlationIds)
    const productOfferedGenerator: ProductOfferedGenerator = new ProductOfferedGenerator(correlationIds)
    const relationshipGenerator: RelationshipGenerator = new RelationshipGenerator(correlationIds)
    const documentGenerator: DocumentGenerator = new DocumentGenerator(correlationIds)
    const customerIndGenerator: CustomerIndGenerator = new CustomerIndGenerator(correlationIds)
    const customerOrgGenerator: CustomerOrgGenerator = new CustomerOrgGenerator(correlationIds)

    account.run()
    addresses.run()
    beneficialOwners.run()
    businessUnit.run()
    countriesOfOperation.run()
    productOfferedGenerator.run()
    documentGenerator.run()
    relationshipGenerator.run()
    customerIndGenerator.run()
    customerOrgGenerator.run()
}

runKYC(2)