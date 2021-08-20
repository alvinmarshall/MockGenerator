import {Transactions} from "../transactions";
import {AccountSchema} from "../../kyc/account";
import {mocker} from "mocker-data-generator";
import {HistoricalTransactionsEntity, TransactionDto} from "../transaction_dto";
import {formatDateToTransaction, writeToJson} from "../../util";
import {PartyGroupSchema} from "../partygroup";

export class CashEquivalentDepositsStructuring extends Transactions {
    generateRule(account: AccountSchema, partyGroup?: PartyGroupSchema): HistoricalTransactionsEntity[] {
        const amount = [8400, 900, 9999]
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
                    const date = this.faker.date.between('2020-01-01', '2020-12-31')
                    return formatDateToTransaction(date)
                }
            },
            desc: {
                values: ['']
            },
            country: {
                values: ['US']
            },
            status: {
                values: ['111']
            },
            code: {
                values: ['CCE-INN']
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
        this.name = "transaction";
        this.rule = "CashEquivalentDepositsStructuring"
        this.total = 3;
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
                    historicalTransactions: data[this.name],
                    peerGroupBehaviorProfiles: [],
                    entityFocusClassification: []
                }
                // console.log('data', JSON.stringify(result))
                // writeToJson(rule, result)
                this.results = result.historicalTransactions
            })

        return this.results
    }

}