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
                const first = this.object.first_name.substring(0, 3).toLowerCase();
                const last = this.object.last_name.substring(0, 3).toLowerCase();
                return `${first}${last}@gmail.com`
            }

        },
        phone_number: {
            function: function () {
                const phone = `${this.faker.phone.phoneNumber("##########")}`
                if (phone.substring(0, 1) == '0') {
                    return phone.replace(/[0-9]]/, '1')
                }
                return phone
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
                const ssn = `${this.chance.ssn({dashes: false})}`
                if (ssn.substring(0, 1) == "0") {
                    return ssn.replace(/[0-9]/, '1')
                }
                return ssn
            }
        },
        source_of_wealth: {
            values: source_of_income
        },
        tax_identification_number: {
            function: function () {
                const ssn = `${this.chance.ssn({dashes: false})}`
                if (ssn.substring(0, 1) == "0") {
                    return ssn.replace(/[0-9]/, '1')
                }
                return ssn
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
            function: function () {
                const current = this.object.country_of_residence;
                const index = country_of_taxation.indexOf(current);
                return country_of_taxation[index]
            }
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
