import {Transactions} from "../transactions";
import {AccountSchema} from "../../kyc/account";
import {PartyGroupSchema} from "../partygroup";
import {formatDateToTransaction, shuffleArray, writeToJson} from "../../util";
import {mocker} from "mocker-data-generator";
import {TransactionDto} from "../transaction_dto";

export class FlowThroughFundsSLL extends Transactions{
    generateRule(account: AccountSchema, partyGroup?: PartyGroupSchema): any[] {
        let results = []
        const total = 10
        const amount = [
            10000000,
            50000000,
            70000000,
            70000000,
            500000,
            350000,
            350000,
            700000,
            30000000,
            560000,
        ]
        const code = [
            'SLL-INN',
            'SLL-INN',
            'CCE-INN',
            'IFT-INN',
            'SLL-OUT',
            'CCE-OUT',
            'CCE-OUT',
            'IFT-OUT',
            'TRD-BUY',
            'TRD-SEL',
        ]

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
                values: ['EFT-OUT']
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
        let name = "transaction";
        let rule = "FlowThroughFundsSLL"
        mocker()
            .schema(name, transaction, total)
            .build((err, data) => {
                if (err) throw err
                data[name] = data[name].map((v, index) => {
                    v.amount = amount[index]
                    v.code = code[index]
                    if (v.code === 'TRD-BUY') v.debitCredit = 'C'
                    return v
                })
                const result: TransactionDto = {
                    account: account, transaction: data[name][0],
                    historicalTransactions: shuffleArray(data[name].slice(1, total)),
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