import {mocker} from "mocker-data-generator"
import {
    genCorrelationId,
    expected_yearly_activity_value,
    currency,
    account_opening_method,
    account_type
} from "../constant"
import {toTitles, writeToJson} from '../util'
import {getKnownCustomers} from "./known";


export interface AccountSchema {
    id: string
    correlation_id?: string
    account_number: string
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


// Correlation ID
//Account Number
//Opening Date
//Account Type
//Account Holder Name
//Account Opening Method
//Currency
//Description
//Expected Yearly Activity Value

export const generateAccount = (total: number) => {
    let results = []
    const headers = [
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
    const country_of_operation = {
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
                return (
                    this.chance.date({year: 2009, string: true, american: false})
                )
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

    let name = "accounts";
    mocker()
        .schema(name, country_of_operation, total)
        .build((err, data) => {
            if (err) throw err
            const correlationList = genCorrelationId(total);
            data[name] = data[name].map((v,index) =>{
                v.correlation_id = correlationList[index]
                return v
            })
            // console.log('data', JSON.stringify(data))
            if (data[name].length == 100) {
                const out = data[name]
                let part1 = out.slice(0, 40)
                const part2 = out.slice(40, 100)
                part1 = part1.map((v, index) => {
                    const knownCustomer = getKnownCustomers()[index];
                    const first = knownCustomer.first_name
                    const last = knownCustomer.last_name
                    v.account_holder_name = `${first} ${last}`.trim()
                    v.account_holder_name = toTitles(v.account_holder_name)
                    return v
                })
                const newOut = part1.concat(part2)
                data[name] = newOut
            }
            results = data[name]
            writeToJson(name, data,headers)
        })
    return results

}


