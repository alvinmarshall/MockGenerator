import {Transactions} from "../transactions";
import {AccountSchema} from "../../kyc/account";
import {PartyGroupSchema} from "../partygroup";
import {formatDateToTransaction, writeToJson} from "../../util";
import {mocker} from "mocker-data-generator";
import {HistoricalTransactionsEntity, TransactionDto} from "../transaction_dto";

export class DailyIncomingFundTransfersStructuring extends Transactions {
    generateRule(account: AccountSchema, partyGroup?: PartyGroupSchema): HistoricalTransactionsEntity[] {
        this.total = 5;
        const amount = [2100, 700, 4040, 600, 2008]
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
                    const date = this.faker.date.between('2021-07-12', '2021-07-13');
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
                values: ['EFT-INN']
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
        this.rule = "DailyIncomingFundTransfersStructuring"
        const oppositeAccountName = "oppositeAccount"
        mocker()
            .schema(this.name, transaction, this.total)
            .schema(oppositeAccountName, oppositeAccount, this.total)
            .build((err, data) => {
                if (err) throw err
                data[this.name] = data[this.name].map((v, index) => {
                    v.amount = amount[index]
                    if (v.amount === 4000) v.oppAccountId = data[oppositeAccountName][index].oppAccountId
                    if (v.amount === 500) v.oppAccountNumber = data[oppositeAccountName][index].oppAccountNumber
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