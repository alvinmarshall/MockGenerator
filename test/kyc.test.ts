import {AccountGenerator} from "../src/kyc/account";
import {AddressGenerator} from "../src/kyc/address";
import {BeneficialOwnersGenerator} from "../src/kyc/beneficial_owners";
import {BusinessUnitGenerator} from "../src/kyc/business_unit";
import {CountryOfOperationGenerator} from "../src/kyc/countries_of_operation";
import {ProductOfferedGenerator} from "../src/kyc/product_offered";
import {DocumentGenerator} from "../src/kyc/document";
import {RelationshipGenerator} from "../src/kyc/relationship";
import {CustomerIndGenerator} from "../src/kyc/customer_ind";
import {CustomerOrgGenerator} from "../src/kyc/customer_org";


describe('KYC GENERATOR Test suit', () => {
    let count = 2;
    let accountGenerator: AccountGenerator
    let addressGenerator: AddressGenerator
    let beneficialOwnersGenerator: BeneficialOwnersGenerator
    let businessUnitGenerator: BusinessUnitGenerator
    let countryOfOperationGenerator: CountryOfOperationGenerator
    let productOfferedGenerator: ProductOfferedGenerator
    let documentGenerator: DocumentGenerator
    let relationshipGenerator: RelationshipGenerator
    let customerIndGenerator: CustomerIndGenerator
    let customerOrgGenerator: CustomerOrgGenerator

    let correlationIds = ['T001', 'T002']

    describe("Account", () => {

        beforeEach(() => {
            accountGenerator = new AccountGenerator(count, correlationIds)
        });

        it("should return generated accounts", () => {
            const result = accountGenerator.generate()
            expect(result).toHaveProperty('account')
            expect(result.account.length).toBe(count)

        });

    });


    describe("Addresses", () => {
        beforeEach(() => {
            addressGenerator = new AddressGenerator(correlationIds)
        });

        it("should return generated addresses", () => {
            const result = addressGenerator.generate()
            expect(result).toHaveProperty('addresses')
            expect(result.addresses.length).toBe(count)
        });

    });


    describe("Beneficial Owners", () => {
        beforeEach(() => {
            beneficialOwnersGenerator = new BeneficialOwnersGenerator(correlationIds)
        });

        it("should return generated beneficial_owners", () => {
            const result = beneficialOwnersGenerator.generate()
            expect(result).toHaveProperty('beneficial_owners')
            expect(result.beneficial_owners.length).toBe(count)
        });

    });

    describe("Business Units", () => {
        beforeEach(() => {
            businessUnitGenerator = new BusinessUnitGenerator(correlationIds)
        });

        it("should return generated business_units", () => {
            const result = businessUnitGenerator.generate()
            expect(result).toHaveProperty('business_units')
            expect(result.business_units.length).toBe(count)
        });

    });

    describe("Countries Of  Operation", () => {
        beforeEach(() => {
            countryOfOperationGenerator = new CountryOfOperationGenerator(correlationIds)
        });

        it("should return generated countries_of_operation", () => {
            const result = countryOfOperationGenerator.generate()
            expect(result).toHaveProperty('countries_of_operation')
            expect(result.countries_of_operation.length).toBe(count)
        });

    });

    describe("Product Offered", () => {
        beforeEach(() => {
            productOfferedGenerator = new ProductOfferedGenerator(correlationIds)
        });

        it("should return generated product_offered", () => {
            const result = productOfferedGenerator.generate()
            expect(result).toHaveProperty('product_offered')
            expect(result.product_offered.length).toBe(count)
        });

    });

    describe("Document", () => {
        beforeEach(() => {
            documentGenerator = new DocumentGenerator(correlationIds)
        });

        it("should return generated documents", () => {
            const result = documentGenerator.generate()
            expect(result).toHaveProperty('documents')
            expect(result.documents.length).toBe(count)
        });

    });

    describe("Relationships", () => {
        beforeEach(() => {
            relationshipGenerator = new RelationshipGenerator(correlationIds)
        });

        it("should return generated relationships", () => {
            const result = relationshipGenerator.generate()
            expect(result).toHaveProperty('relationships')
            expect(result.relationships.length).toBe(count)
        });

    });

    describe("Customer Ind", () => {
        beforeEach(() => {
            customerIndGenerator = new CustomerIndGenerator(correlationIds)
        });

        it("should return generated customers_ind", () => {
            const result = customerIndGenerator.generate()
            expect(result).toHaveProperty('customers_ind')
            expect(result.customers_ind.length).toBe(count)
        });

    });


    describe("Customer Org", () => {
        beforeEach(() => {
            customerOrgGenerator = new CustomerOrgGenerator(correlationIds)
        });

        it("should return generated customers_org", () => {
            const result = customerOrgGenerator.generate()
            expect(result).toHaveProperty('customers_org')
            expect(result.customers_org.length).toBe(count)
        });

    });


});


