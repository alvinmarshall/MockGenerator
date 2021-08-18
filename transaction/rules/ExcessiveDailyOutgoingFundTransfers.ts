import {Transactions} from "../transactions";
import {AccountSchema} from "../../kyc/account";
import {PartyGroupSchema} from "../partygroup";
import {mocker} from "mocker-data-generator";
import {TransactionDto} from "../transaction_dto";
import {formatDateToTransaction, shuffleArray, writeToJson} from "../../util";

export class ExcessiveDailyOutgoingFundTransfers extends Transactions{
    generateRule(account: AccountSchema, partyGroup?: PartyGroupSchema): any[] {
        let results = []
        const total = 4
        const amount = [10000, 50000, 70000, 1000]
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
        let name = "transaction";
        let rule = "ExcessiveDailyOutgoingFundTransfers"
        mocker()
            .schema(name, transaction, total)
            .build((err, data) => {
                if (err) throw err
                data[name] = data[name].map((v, index) => {
                    v.amount = amount[index]
                    if(v.amount === 1000){
                        v.debitCredit = "C"
                        v.type = "Check Dep"
                        v.code = "CCE-INN"
                        v.desc = "Cash Equivalent Deposits"
                    }
                    return v
                })
                const result: TransactionDto = {
                    account: account, transaction: data[name][0],
                    historicalTransactions: shuffleArray(data[name].slice(1,total)),
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