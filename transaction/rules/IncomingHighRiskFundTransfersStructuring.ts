import {Transactions} from "../transactions";
import {AccountSchema} from "../../kyc/account";
import {formatDateToTransaction, generateRandomAmount, writeToJson} from "../../util";
import {mocker} from "mocker-data-generator";
import {HistoricalTransactionsEntity, TransactionDto} from "../transaction_dto";

export class IncomingHighRiskFundTransfersStructuring extends Transactions {
    generateRule(account: AccountSchema): HistoricalTransactionsEntity[] {
        this.total = 5;
        // const amount = [600,280, 1600, 4509,100,5000]
        const amount = generateRandomAmount(8000, 9999, this.total, 1000)

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
                // values: ['11/26/2020 20:01:12']
                function: function () {
                    const date = this.faker.date.between('2021-02-14', '2021-02-15');
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
                values: ['IFT-INN']
            },
            customerId: {
                values: [account.customer_id]
            },
            accountType: {
                values: [account.account_type]
            },
            oppAccountId: {
                values: ['4455533333']
            },
            oppAccountNumber: {
                values: ['']
            },
            oppOrgKey: {
                values: ['']
            }
        }
        const oppositeAccount = {
            oppAccountId: {
                function: function () {
                    const phone = `${this.faker.phone.phoneNumber("###############")}`
                    if (phone.substring(0, 1) == '0') {
                        return phone.replace(/[0-9]]/, '1')
                    }
                    return phone
                }
            },
            oppAccountNumber: {
                function: function () {
                    const phone = `${this.faker.phone.phoneNumber("###############")}`
                    if (phone.substring(0, 1) == '0') {
                        return phone.replace(/[0-9]]/, '1')
                    }
                    return phone
                }
            }
        }
        this.name = "transaction";
        this.rule = "IncomingHighRiskFundTransfersStructuring"
        let oppositeAccountName = "oppositeAccount"
        mocker()
            .schema(this.name, transaction, this.total)
            .schema(oppositeAccountName, oppositeAccount, this.total)
            .build((err, data) => {
                if (err) throw err
                data[this.name] = data[this.name].map((v, index) => {
                    v.amount = amount[index]
                    v.oppAccountId = data[oppositeAccountName][index].oppAccountId
                    v.oppAccountNumber = data[oppositeAccountName][index].oppAccountNumber
                    return v
                })
                const result: TransactionDto = {
                    account: account, transaction: data[this.name][0],
                    historicalTransactions: data[this.name],
                    peerGroupBehaviorProfiles: [],
                    entityFocusClassification: []
                }
                // console.log('data', JSON.stringify(result))
                writeToJson(this.rule, result)
                this.results = result.historicalTransactions
            })
        return this.results
    }


}