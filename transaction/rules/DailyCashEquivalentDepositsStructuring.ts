import {Transactions} from "../transactions";
import {AccountSchema} from "../../kyc/account";
import {mocker} from "mocker-data-generator";
import {TransactionDto} from "../transaction_dto";

export class DailyCashEquivalentDepositsStructuring extends Transactions {
    generateRule(account: AccountSchema): any[] {
        let results = []
        const total = 5
        const amount = [2000, 800, 4000, 500, 2000]
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
                values: ["D"]
            },
            amount: {
                values: [2000.0]
            },
            desc: {
                values: ['']
            },
            date: {
                values: ['11/26/2020 20:01:12']
            },
            country: {
                values: ['US']
            },
            status: {
                values: ['111']
            },
            code: {
                values: ['CCE-INN']
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
        let rule = "DailyCashEquivalentDepositsStructuring"
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
