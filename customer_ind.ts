import {mocker} from "mocker-data-generator"
import {writeToJson} from './util'

import {
    genCorrelationId,
    country_of_secondary_citizenship,
    source_of_income,
    country_of_citizenship,
    marital_status,
    country_of_residence,
    occupation,
    annual_income,
    gender,
    country_of_taxation
} from './constant'

export const generateCustomerInd = (total: number = 5) => {
    const correlationIds = genCorrelationId(total)

    const customer_ind = {
        correlation_id: {
            values: correlationIds
        },
        account_opening_date: {
            function: function () {
                return (
                    this.chance.date({year: 2009, string: true, american: false})
                )
            }
        },
        first_name: {
            faker: 'name.firstName'
        },
        middle_name: {
            values: ['']
        },
        last_name: {
            faker: 'name.lastName'
        },
        country_of_citizenship: {
            values: country_of_citizenship,
        },
        marital_status: {
            values: marital_status
        },
        email: {
            function: function () {
                return (
                    this.chance.email({domain: "gmail.com"})
                )
            }

        },
        phone_number: {
            function: function () {
                return (
                    "" + this.faker.phone.phoneNumber("#########")
                )
            }
        },
        date_of_birth: {
            function: function () {
                return (
                    this.chance.birthday({string: true})
                )
            }
        },
        social_security_number: {
            function: function () {
                return (
                    "" + this.faker.phone.phoneNumber("#########")
                )
            }
        },
        source_of_wealth: {
            values: source_of_income
        },
        tax_identification_number: {
            function: function () {
                return (
                    "" + this.faker.phone.phoneNumber("#########")
                )
            }
        },
        country_of_secondary_citizenship: {
            values: country_of_secondary_citizenship
        },
        country_of_residence: {
            values: country_of_residence
        },
        occupation: {
            values: occupation
        },
        annual_income: {
            values: annual_income
        },
        gender: {
            values: gender
        },
        country_of_taxation: {
            values: country_of_taxation
        },


    }

    let name = "customer_ind";
    mocker()
        .schema(name, customer_ind, total)
        .build((err, data) => {
            if (err) throw err
            // console.log('data', JSON.stringify(data))
            writeToJson(name, data)

        })

}
