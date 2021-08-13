import {mocker} from "mocker-data-generator"
import {
    genCorrelationId,
    expected_yearly_activity_value,
    currency,
    account_opening_method,
    account_type
} from "./constant"
import {writeToJson} from './util'


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
    const country_of_operation = {
        correlation_id: {
            values: genCorrelationId(total)
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
            // console.log('data', JSON.stringify(data))
            writeToJson(name, data)
        })

}


