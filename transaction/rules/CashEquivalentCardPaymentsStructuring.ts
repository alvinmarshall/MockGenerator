import {Transactions} from "../transactions";
import {AccountSchema} from "../../kyc/account";
import {formatDateToTransaction, shuffleArray, writeToJson} from "../../util";
import {mocker} from "mocker-data-generator";
import {TransactionDto} from "../transaction_dto";

export class CashEquivalentCardPaymentsStructuring extends Transactions {
    generateRule(account: AccountSchema): any[] {
        let results = []
        let total = 5;
        const amount = [8200, 8700, 8400, 500, 2000]
        const transaction = {
            transactionNumber: {
                function: function () {
                    const phone = `${this.faker.phone.phoneNumber("###############")}`
                    if (phone.substring(0, 1) == '0') {
                        return phone.replace(/[0-9]]/, '1')
                    }
                    return phone
                }
            },
            accountNumber: {
                values: [account.account_number]
            },
            debitCredit: {
                values: ["D"]
            },
            amount: {
                values: [0]
            },
            date: {
                function: function () {
                    const date = this.faker.date.between('2020-01-01', '2020-12-31')
                    return formatDateToTransaction(date)
                }
            },
            desc: {
                values: ['Cash Equivalent Card Payments Structuring']
            },
            type: {
                values: ['Fund transfer']
            },
            country: {
                values: ['US']
            },
            status: {
                values: ['111']
            },
            code: {
                values: ['CEC-INN']
            },
            customerId: {
                values: [account.customer_id]
            },
            accountType: {
                values: [account.account_type]
            },
            oppAccountId: {
                values: ['']
            },
            oppAccountNumber: {
                values: ['']
            },
            oppOrgKey: {
                values: ['']
            }

        }
        let name = "transaction";
        let rule = "CashEquivalentCardPaymentsStructuring"
        mocker()
            .schema(name, transaction, total)
            .build((err, data) => {
                if (err) throw err
                data[name] = data[name].map((v, index) => {
                    v.amount = amount[index]
                    return v
                })
                const result: TransactionDto = {
                    account: account, transaction: data[name][0],
                    historicalTransactions: shuffleArray(data[name]),
                    peerGroupBehaviorProfiles: [],
                    entityFocusClassification: []
                }
                // console.log('data', JSON.stringify(result))
                // writeToJson(rule, result)
                results = result.historicalTransactions
            })
        return results
    }
}