import {DailyCashEquivalentDepositsStructuring} from "./rules/DailyCashEquivalentDepositsStructuring";
import {DailyCashEquivalentWithdrawalsStructuring} from "./rules/DailyCashEquivalentWithdrawalsStructuring";
import {CashEquivalentDepositsStructuring} from "./rules/CashEquivalentDepositsStructuring";
import {CashEquivalentWithdrawalsStructuring} from "./rules/CashEquivalentWithdrawalsStructuring";
import {CashEquivalentCardPaymentsStructuring} from "./rules/CashEquivalentCardPaymentsStructuring";
import {CashEquivalentLoanPaymentsStructuring} from "./rules/CashEquivalentLoanPaymentsStructuring";
import {AccountSchema, generateAccount} from "../kyc/account";
import {v4 as uuidv4} from 'uuid';
import {writeToCSV} from "../util";

const rule1 = new DailyCashEquivalentDepositsStructuring()
const rule2 = new CashEquivalentDepositsStructuring()
const rule3 = new DailyCashEquivalentWithdrawalsStructuring()
const rule4 = new CashEquivalentWithdrawalsStructuring()
const rule5 = new CashEquivalentCardPaymentsStructuring()
const rule6 = new CashEquivalentLoanPaymentsStructuring()

let total = 100;
const genAccounts = generateAccount(total)
const output = genAccounts.map(value => {
    const obj: AccountSchema = {
        account_holder: value.account_holder_name,
        account_number: value.account_number,
        account_type: value.account_type,
        customer_id: uuidv4(),
        extcid: "9",
        id: uuidv4(),
        opening_date: value.opening_date

    }
    return obj

})
const account: AccountSchema = {
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
        ...rule6.generateRule(value)
    ]
    // const acc_name = `${value.account_holder}_transaction`
    // writeToCSV(acc_name,{"transaction":results})
    rulesResp.push(...results)

})

writeToCSV("acc_transactions", {"transaction": rulesResp})

