import {Transactions} from "../transactions";
import {AccountSchema} from "../../kyc/account";
import {mocker} from "mocker-data-generator";
import {HistoricalTransactionsEntity, TransactionDto} from "../transaction_dto";
import {formatDateToTransaction, writeToJson} from "../../util";
import {PartyGroupSchema} from "../partygroup";

export class ComplexLayeringIncoming extends Transactions {
    generateRule(account: AccountSchema, partyGroup?: PartyGroupSchema): HistoricalTransactionsEntity[] {
        this.total = 5
        const amount = [20000000, 80000000, 40000000, 50000000, 10000000]
        const code = ["ALL-OUT", "ALL-OUT", "FTR-INN", "FTR-INN", "ALL-INN"]
        const debitCredit = ["D", "D", "C", "C", "C"]
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
                values: ['']
            },
            amount: {
                values: [0]
            },
            date: {
                function: function () {
                    const date = this.faker.date.recent(1)
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
                values: ['']
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
            }
        }
        this.name = "transaction";
        this.rule = "ComplexLayeringIncoming"
        let oppositeAccountName = "oppositeAccount"
        mocker()
            .schema(this.name, transaction, this.total)
            .schema(oppositeAccountName, oppositeAccount, this.total)
            .build((err, data) => {
                if (err) throw err
                data[this.name] = data[this.name].map((v, index) => {
                    v.amount = amount[index]
                    v.code = code[index]
                    if (v.code === "FTR-INN") {
                        v.oppAccountId = data[oppositeAccountName][index].oppAccountId
                    }
                    v.debitCredit = debitCredit[index]
                    return v
                })
                const partyList = []
                if (partyGroup) {
                    partyList.push(partyGroup)
                }
                const result: TransactionDto = {
                    account: account, transaction: data[this.name][0],
                    historicalTransactions: data[this.name].slice(1, this.total),
                    peerGroupBehaviorProfiles: [],
                    entityFocusClassification: [],
                    partyGroupList: partyList
                }
                // console.log('data', JSON.stringify(result))
                writeToJson(this.rule, result)
                this.results = result.historicalTransactions
                this.results.push(data[this.name][0])

            })
        return this.results


    }


}