import {mocker} from "mocker-data-generator"
import {account_opening_method, account_type, currency, expected_yearly_activity_value} from "../constant"
import {simpleDate, toTitles, writeToJson} from '../util'
import {KYC} from "./kyc";

export interface AccountSchema {
    id: string
    correlation_id?: string
    account_number: string | number
    opening_date: string
    account_type: string
    account_holder_name?: string
    account_holder: string
    account_opening_method?: string
    currency?: string
    description?: string
    extcid: string
    expected_yearly_activity_value?: string
    customer_id: string
}

export interface AccountGen {
    account?: (AccountEntity)[] | null;
}

export interface AccountEntity {
    correlation_id: string;
    account_number: number;
    opening_date: string;
    account_type: string;
    account_holder_name: string;
    account_opening_method: string;
    currency: string;
    description: string;
    expected_yearly_activity_value: number;
}

//Correlation ID
//Account Number
//Opening Date
//Account Type
//Account Holder Name
//Account Opening Method
//Currency
//Description
//Expected Yearly Activity Value

export class AccountGenerator extends KYC {
    private readonly total: number

    constructor(private count: number, private correlationIds: string[]) {
        super(count, correlationIds);
        this.total = correlationIds.length
        this.name = 'account'
        this.headers = [
            'Correlation ID',
            'Account Number',
            'Opening Date',
            'Account Type',
            'Account Holder Name',
            'Account Opening Method',
            'Currency',
            'Description',
            'Expected Yearly Activity Value'
        ]
    }

    generate(): AccountGen {

        const account = {
            correlation_id: {
                values: [0]
            },
            account_number: {
                function: function () {
                    const phone = `${this.faker.phone.phoneNumber("###############")}`
                    if (phone.substring(0, 1) == '0') {
                        return phone.replace(/[0-9]]/, '1')
                    }
                    return phone
                }
            },
            opening_date: {
                function: function () {
                    const date = this.chance.date({year: 2020, american: false})
                    return simpleDate(date)
                }

            },
            account_type: {
                values: account_type
            },
            account_holder_name: {
                function: function () {
                    return (
                        `${this.faker.name.firstName()} ${this.faker.name.lastName()}`
                    )
                }
            },
            account_opening_method: {
                values: account_opening_method
            },
            currency: {
                values: currency
            },
            description: {
                values: ['']
            },
            expected_yearly_activity_value: {
                values: expected_yearly_activity_value
            }

        }

        mocker()
            .schema(this.name, account, this.total)
            .build((err, data) => {
                if (err) throw err
                const correlationList = this.correlationIds
                data[this.name] = data[this.name].map((v, index) => {
                    v.correlation_id = correlationList[index]
                    if (this.staticAccounts.length) {
                        v.account_number = this.staticAccounts[index]
                    }
                    return v
                })
                if (data[this.name].length == 100) {
                    const out = data[this.name]
                    let part1 = out.slice(0, 50)
                    const part2 = out.slice(50, 100)
                    part1 = part1.map((v, index) => {
                        const knownCustomer = this.getWatchList()[index];
                        const first = toTitles(knownCustomer.first_name)
                        const last = toTitles(knownCustomer.last_name)
                        v.account_holder_name = `${first} ${last}`.trim()
                        v.account_holder_name = toTitles(v.account_holder_name)
                        return v
                    })
                    const newOut = part1.concat(part2)
                    data[this.name] = newOut
                }
                this.results = data
            })
        return this.results
    }

    run() {
        const data = this.generate();
        writeToJson(this.name, data, this.headers)
    }

}

