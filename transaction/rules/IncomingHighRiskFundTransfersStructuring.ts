import {Transactions} from "../transactions";
import {AccountSchema} from "../../kyc/account";
import {formatDateToTransaction, generateRandomAmount, writeToJson} from "../../util";
import {mocker} from "mocker-data-generator";
import {TransactionDto} from "../transaction_dto";

export class IncomingHighRiskFundTransfersStructuring extends Transactions {
    generateRule(account: AccountSchema): any[] {
        let results = []
        let total = 5;
        // const amount = [600,280, 1600, 4509,100,5000]
        const amount = generateRandomAmount(8000, 9999, total,1000)

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
                values: [0]
            },
            desc: {
                values: ['Fund transfer to internal account']
            },
            date: {
                values: ['11/26/2020 20:01:12']
                // function: function () {
                //     const date = this.faker.date.recent(1)
                //     return formatDateToTransaction(date)
                // }
            },
            country: {
                values: ['US']
            },
            status: {
                values: ['111']
            },
            code: {
                values: ['IFT-INN']
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
            oppAccountId: {
                values: ['4455533333']
                // function: function () {
                //     const phone = `${this.faker.phone.phoneNumber("###############")}`
                //     if (phone.substring(0, 1) == '0') {
                //         return phone.replace(/[0-9]]/, '1')
                //     }
                //     return phone
                // }
            },
            beneficiaryId: {
                values: ['']
            },
            branch: {
                values: [null]
            }

        }
        let name = "transaction";
        let rule = "IncomingHighRiskFundTransfersStructuring"
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
                writeToJson(rule, result)
                results = result.historicalTransactions
            })
        return results
    }


}