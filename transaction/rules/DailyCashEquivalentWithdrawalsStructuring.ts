import {Transactions} from "../transactions";
import {AccountSchema} from "../../kyc/account";
import {formatDateToTransaction, writeToJson} from "../../util";
import {mocker} from "mocker-data-generator";
import {HistoricalTransactionsEntity, TransactionDto} from "../transaction_dto";

export class DailyCashEquivalentWithdrawalsStructuring extends Transactions {
    generateRule(account: AccountSchema): HistoricalTransactionsEntity[] {
        this.total = 7;
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
            accountNumber: {
                values: [account.account_number]
            },
            debitCredit: {
                values: ["C"]
            },
            amount: {
                values: [0]
            },
            date: {
                function: function () {
                    const date = this.faker.date.between('2020-11-25', '2020-11-26');
                    return formatDateToTransaction(date)
                }
            },
            desc: {
                values: ['Fund transfer to internal account']
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
                values: ['CCE-OUT']
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
        this.name = "transaction";
        this.rule = "DailyCashEquivalentWithdrawalsStructuring"
        mocker()
            .schema(this.name, transaction, this.total)
            .build((err, data) => {
                if (err) throw err
                data[this.name] = data[this.name].map((v, index) => {
                    v.amount = amount[index]
                    return v
                })
                const result: TransactionDto = {
                    account: account, transaction: data[this.name][0],
                    historicalTransactions: data[this.name].slice(1, this.total),
                    peerGroupBehaviorProfiles: [],
                    entityFocusClassification: []
                }
                // console.log('data', JSON.stringify(result))
                writeToJson(this.rule, result)
                this.results = result.historicalTransactions
                this.results.push(data[this.name][0])

            })
        return this.results
    }

}