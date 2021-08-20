import {Transactions} from "../transactions";
import {AccountSchema} from "../../kyc/account";
import {PartyGroupSchema} from "../partygroup";
import {formatDateToTransaction, writeToJson} from "../../util";
import {mocker} from "mocker-data-generator";
import {TransactionDto} from "../transaction_dto";
import {generateLogicalEntity} from "../logicalEntity";

export class AccCirculationOfFundsLongPeriod extends Transactions {
    generateRule(account: AccountSchema, partyGroup?: PartyGroupSchema): any[] {
        let results = []
        let total = 8;
        const amount = [
            10000000,
            50000000,
            70000000,
            70000000,
            500000,
            350000,
            350000,
            700000
        ]
        const code = [
            'ALL-INN',
            'ALL-INN',
            'CCE-INN',
            'IFT-INN',
            'ALL-OUT',
            'CCE-OUT',
            'CCE-OUT',
            'IFT-OUT'
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
                    const date = this.faker.date.between('2021-03-12', '2021-03-13')
                    return formatDateToTransaction(date)
                }
            },
            desc: {
                values: ['Fund transfer to internal account']
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
        let rule = "AccCirculationOfFundsLongPeriod"
        mocker()
            .schema(name, transaction, total)
            .build((err, data) => {
                if (err) throw err
                data[name] = data[name].map((v, index) => {
                    v.amount = amount[index]
                    v.code = code[index]
                    return v
                })
                const result: TransactionDto = {
                    transaction: data[name][0],
                    historicalTransactions: data[name].slice(1, total),
                    peerGroupBehaviorProfiles: [],
                    entityFocusClassification: [],
                    logicalEntity: generateLogicalEntity(account)
                }
                // console.log('data', JSON.stringify(result))
                writeToJson(rule, result)
                results = result.historicalTransactions
            })
        return results
    }


}