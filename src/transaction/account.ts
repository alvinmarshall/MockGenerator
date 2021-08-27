import {DailyCashEquivalentDepositsStructuring} from "./rules/DailyCashEquivalentDepositsStructuring";
import {DailyCashEquivalentWithdrawalsStructuring} from "./rules/DailyCashEquivalentWithdrawalsStructuring";
import {CashEquivalentDepositsStructuring} from "./rules/CashEquivalentDepositsStructuring";
import {CashEquivalentWithdrawalsStructuring} from "./rules/CashEquivalentWithdrawalsStructuring";
import {CashEquivalentCardPaymentsStructuring} from "./rules/CashEquivalentCardPaymentsStructuring";
import {CashEquivalentLoanPaymentsStructuring} from "./rules/CashEquivalentLoanPaymentsStructuring";
import {AccountGenerator, AccountSchema} from "../kyc/account";
import {v4 as uuidv4} from 'uuid';
import {writeToCSV} from "../util";
import {IncomingHighRiskFundTransfersStructuring} from "./rules/IncomingHighRiskFundTransfersStructuring";
import {DailyIncomingFundTransfersStructuring} from "./rules/DailyIncomingFundTransfersStructuring";
import {DailyOutgoingFundTransfersStructuring} from "./rules/DailyOutgoingFundTransfersStructuring";
import {ExcessiveDailyIncomingFundTransfers} from "./rules/ExcessiveDailyIncomingFundTransfers";
import {ComplexLayeringOutgoing} from "./rules/ComplexLayeringOutgoing";
import {ComplexLayeringIncoming} from "./rules/ComplexLayeringIncoming";
import {ExcessiveDailyOutgoingFundTransfers} from "./rules/ExcessiveDailyOutgoingFundTransfers";
import {FlowThroughFundsInvestment} from "./rules/FlowThroughFundsInvestment";
import {FlowThroughFundsLongPeriod} from "./rules/FlowThroughFundsLongPeriod";
import {transactionHeaders} from "./transactions";
import {FlowThroughFundsAll} from "./rules/FlowThroughFundsAll";
import {FlowThroughFundsSLL} from "./rules/FlowThroughFundsSLL";
import {ExcessiveHighRiskActivity} from "./rules/ExcessiveHighRiskActivity";
import {OutgoingHighRiskFundTransferStructuring} from "./rules/OutgoingHighRiskFundTransferStructuring";
import {AccCirculationOfFundsInvestment} from "./rules/AccCirculationOfFundsInvestment";
import {AccCirculationOfFundsLongPeriod} from "./rules/AccCirculationOfFundsLongPeriod";
import {AccCirculationOfFundsSLL} from "./rules/AccCirculationOfFundsSLL";
import {AccCirculationOfFundsAll} from "./rules/AccCirculationOfFundsAll";
import {CustomerIndGenerator} from "../kyc/customer_ind";
import {CustomerOrgGenerator} from "../kyc/customer_org";
import {AddressGenerator} from "../kyc/address";
import {BeneficialOwnersGenerator} from "../kyc/beneficial_owners";
import {RelationshipGenerator} from "../kyc/relationship";
import {ProductOfferedGenerator} from "../kyc/product_offered";
import {CountryOfOperationGenerator} from "../kyc/countries_of_operation";
import {DocumentGenerator} from "../kyc/document";
import {BusinessUnitGenerator} from "../kyc/business_unit";
import {genCorrelationId} from "../constant";

const rule1 = new DailyCashEquivalentDepositsStructuring()
const rule2 = new CashEquivalentDepositsStructuring()
const rule3 = new DailyCashEquivalentWithdrawalsStructuring()
const rule4 = new CashEquivalentWithdrawalsStructuring()
const rule5 = new CashEquivalentCardPaymentsStructuring()
const rule6 = new CashEquivalentLoanPaymentsStructuring()

const rule7 = new IncomingHighRiskFundTransfersStructuring()
const rule8 = new DailyIncomingFundTransfersStructuring()
const rule9 = new DailyOutgoingFundTransfersStructuring()
const rule10 = new ExcessiveDailyIncomingFundTransfers()
const rule11 = new ComplexLayeringOutgoing()
const rule12 = new ComplexLayeringIncoming()
const rule13 = new ExcessiveDailyOutgoingFundTransfers()

const rule14 = new FlowThroughFundsInvestment()
const rule15 = new FlowThroughFundsLongPeriod()
const rule16 = new FlowThroughFundsAll()
const rule17 = new FlowThroughFundsSLL()
const rule18 = new ExcessiveHighRiskActivity()
const rule19 = new OutgoingHighRiskFundTransferStructuring()

const rule20 = new AccCirculationOfFundsInvestment()
const rule21 = new AccCirculationOfFundsLongPeriod()
const rule22 = new AccCirculationOfFundsSLL()
const rule23 = new AccCirculationOfFundsAll()


let total = 100;
const correlations = []


const allCorrelationIds = []

const indCorrelationIds = genCorrelationId(total)
const orgCorrelationIds = genCorrelationId(total, 2000)

allCorrelationIds.push(...indCorrelationIds, ...orgCorrelationIds)


const account: AccountGenerator = new AccountGenerator(0, allCorrelationIds)
const addresses: AddressGenerator = new AddressGenerator(allCorrelationIds)
const beneficialOwners: BeneficialOwnersGenerator = new BeneficialOwnersGenerator(allCorrelationIds)
const businessUnit: BusinessUnitGenerator = new BusinessUnitGenerator(allCorrelationIds)
const countriesOfOperation: CountryOfOperationGenerator = new CountryOfOperationGenerator(allCorrelationIds)
const productOffered: ProductOfferedGenerator = new ProductOfferedGenerator(allCorrelationIds)
const relationship: RelationshipGenerator = new RelationshipGenerator(allCorrelationIds)
const document: DocumentGenerator = new DocumentGenerator(allCorrelationIds)
const customerInd: CustomerIndGenerator = new CustomerIndGenerator(allCorrelationIds)
const customerOrg: CustomerOrgGenerator = new CustomerOrgGenerator(allCorrelationIds)


const accountGen = account.generate();
const addressesGen = addresses.generate();
const beneficialOwnersGen = beneficialOwners.generate();
const businessUnitGen = businessUnit.generate();
const countriesOfOperationGen = countriesOfOperation.generate();
const productOfferedGen = productOffered.generate();
const relationshipGen = relationship.generate();
const documentGen = document.generate();
const customerIndGen = customerInd.generate();
const customerOrgGen = customerOrg.generate();


const output = accountGen.account.map(value => {
    const obj: AccountSchema = {
        account_holder: value.account_holder_name,
        account_number: value.account_number,
        account_type: value.account_type,
        customer_id: uuidv4(),
        extcid: value.correlation_id,
        id: uuidv4(),
        opening_date: value.opening_date

    }
    return obj

})


const accountSchema: AccountSchema = {
    id: "28dba766-60a2-4399-92ad-89655ae81f0c",
    account_type: "personal",
    account_number: "97228831",
    customer_id: "390e9c4c-e2fa-40dc-95b2-fc3d9418b9c4",
    extcid: "9",
    account_holder: "Terry Sentinella",
    opening_date: "2016-07-22"

}
const rulesResp = []
output.forEach(value => {
    const results = [
        ...rule1.generateRule(value),
        ...rule2.generateRule(value),
        ...rule3.generateRule(value),
        ...rule4.generateRule(value),
        ...rule5.generateRule(value),
        ...rule6.generateRule(value),
        ...rule7.generateRule(value),
        ...rule8.generateRule(value),
        ...rule9.generateRule(value),
        ...rule10.generateRule(value),
        ...rule11.generateRule(value),
        ...rule12.generateRule(value),
        ...rule13.generateRule(value),
        ...rule14.generateRule(value),
        ...rule15.generateRule(value),
        ...rule16.generateRule(value),
        ...rule17.generateRule(value),
        ...rule18.generateRule(value),
        ...rule19.generateRule(value),
        ...rule20.generateRule(value),
        ...rule21.generateRule(value),
        ...rule22.generateRule(value),
        ...rule23.generateRule(value),
    ]
    // const acc_name = `${value.account_holder}_transaction`
    // writeToCSV(acc_name,{"transaction":results})
    rulesResp.push(...results)

})


writeToCSV("acc_transactions", {"transactions": rulesResp}, transactionHeaders)
writeToCSV(account.name, accountGen)
writeToCSV(addresses.name, addressesGen)
writeToCSV(beneficialOwners.name, beneficialOwnersGen)
writeToCSV(businessUnit.name, businessUnitGen)
writeToCSV(countriesOfOperation.name, countriesOfOperationGen)
writeToCSV(productOffered.name, productOfferedGen)
writeToCSV(document.name, documentGen)
writeToCSV(relationship.name, relationshipGen)
writeToCSV(customerInd.name, customerIndGen)
writeToCSV(customerOrg.name, customerOrgGen)