import {Transactions} from "../transactions";
import {AccountSchema} from "../../kyc/account";
import {formatDateToTransaction} from "../../util";
import {mocker} from "mocker-data-generator";
import {TransactionDto} from "../transaction_dto";

export class DailyCashEquivalentWithdrawalsStructuring extends Transactions {
    generateRule(account: AccountSchema): any[] {
        let results =  []
        let total = 7;
        const amount = [1400, 800, 300, 3000, 700, 2000, 500]

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
            debitCredit: {
                values: ["C"]
            },
            amount: {
                values: [0]
            },
            desc: {
                values: ['Fund transfer to internal account']
            },
            date: {
                function: function () {
                    const date = this.faker.date.recent(1)
                    return formatDateToTransaction(date)
                }
            },
            country: {
                values: ['US']
            },
            status: {
                values: ['111']
            },
            code: {
                values: ['CCE-OUT']
            },
            type: {
                values: ['Fund transfer']
            },
            accountNumber: {
                values: [account.account_number]
            },
            accountType: {
                values: [account.account_type]
            },
            customerId: {
                values: [account.customer_id]
            },
            beneficiaryId: {
                values: ['']
            },
            branch: {
                values: [null]
            }

        }
        let name = "transaction";
        let rule = "DailyCashEquivalentWithdrawalsStructuring"
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
                    historicalTransactions: data[name],
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