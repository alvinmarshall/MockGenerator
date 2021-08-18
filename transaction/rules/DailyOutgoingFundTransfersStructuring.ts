import {Transactions} from "../transactions";
import {AccountSchema} from "../../kyc/account";
import {PartyGroupSchema} from "../partygroup";
import {mocker} from "mocker-data-generator";
import {TransactionDto} from "../transaction_dto";
import {writeToJson} from "../../util";

export class DailyOutgoingFundTransfersStructuring extends Transactions{
    generateRule(account: AccountSchema, partyGroup?: PartyGroupSchema): any[] {
        let results = []
        let total = 5;
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
                values: [0]
            },
            desc: {
                values: ['Fund transfer to internal account']
            },
            date: {
                values:['11/26/2020 20:01:12']
            },
            country: {
                values: ['US']
            },
            status: {
                values: ['111']
            },
            code: {
                values: ['EFT-OUT']
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
        let name = "transaction";
        let rule = "DailyOutgoingFundTransfersStructuring"
        const oppositeAccountName = "oppositeAccount"
        mocker()
            .schema(name, transaction, total)
            .schema(oppositeAccountName, oppositeAccount, total)
            .build((err, data) => {
                if (err) throw err
                data[name] = data[name].map((v, index) => {
                    v.amount = amount[index]
                    if (v.amount === 4000) v.oppAccountId = data[oppositeAccountName][index].oppAccountId
                    if (v.amount === 500) v.oppAccountNumber = data[oppositeAccountName][index].oppAccountNumber
                    return v
                })
                const result: TransactionDto = {
                    account: account, transaction: data[name][0],
                    historicalTransactions: data[name].slice(1, 5),
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