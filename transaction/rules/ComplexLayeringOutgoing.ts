import {Transactions} from "../transactions";
import {AccountSchema} from "../../kyc/account";
import {mocker} from "mocker-data-generator";
import {TransactionDto} from "../transaction_dto";
import {formatDateToTransaction, writeToJson} from "../../util";
import {PartyGroupSchema} from "../partygroup";

export class ComplexLayeringOutgoing extends Transactions {
    generateRule(account: AccountSchema, partyGroup: PartyGroupSchema): any[] {
        let results = []
        const total = 5
        const amount = [20000000, 80000000, 40000000, 50000000, 10000000]
        const code = ["ALL-INN", "ALL-INN", "FTR-OUT", "FTR-OUT", "ALL-OUT"]
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
            debitCredit: {
                values: ['']
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
                values: ['']
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
        let name = "transaction";
        let rule = "ComplexLayeringOutgoing"
        let oppositeAccountName = "oppositeAccount"
        mocker()
            .schema(name, transaction, total)
            .schema(oppositeAccountName, oppositeAccount, total)
            .build((err, data) => {
                console.log('da', data)
                if (err) throw err
                data[name] = data[name].map((v, index) => {
                    v.amount = amount[index]
                    v.code = code[index]
                    if (v.code === "FTR-OUT") {
                        v.oppAccountId = data[oppositeAccountName][index].oppAccountId
                    }
                    v.debitCredit = debitCredit[index]
                    return v
                })
                const result: TransactionDto = {
                    account: account, transaction: data[name][0],
                    historicalTransactions: data[name].slice(1, 5),
                    peerGroupBehaviorProfiles: [],
                    entityFocusClassification: [],
                    partyGroupList: [partyGroup]
                }
                // console.log('data', JSON.stringify(result))
                writeToJson(rule, result)
                results = result.historicalTransactions
            })
        return results


    }


}