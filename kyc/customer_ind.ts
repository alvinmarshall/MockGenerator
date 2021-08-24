import {mocker} from "mocker-data-generator"
import {simpleDate, writeToJson} from '../util'

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
} from '../constant'
import {getKnownCustomers} from "./known";

export const generateCustomerInd = (total: number = 5) => {
    let results = []
    const headers = [
        'Correlation ID',
        'Account Opening Date',
        'First Name',
        'Middle Name',
        'Last Name',
        'Country of Citizenship',
        'Marital Status',
        'Email',
        'Phone Number',
        'Date of Birth',
        'Social Security Number',
        'Source of Wealth',
        'Tax Identification Number',
        'Country of Secondary Citizenship',
        'Country of Residence',
        'Occupation',
        'Annual Income',
        'Gender',
        'Country of Taxation'
    ]
    const customer_ind = {
        correlation_id: {
            values: [0]
        },
        account_opening_date: {
            function: function () {
                const date = this.chance.date({year: 2020, american: false})
                return simpleDate(date)
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
            const correlationList = genCorrelationId(total);
            data[name] = data[name].map((v, index) => {
                v.correlation_id = correlationList[index]
                return v
            })
            if (data[name].length == 100) {
                const out = data[name]
                let part1 = out.slice(0, 40)
                const part2 = out.slice(40, 100)
                part1 = part1.map((v, index) => {
                    const knownCustomer = getKnownCustomers()[index];
                    v.first_name = knownCustomer.first_name
                    v.last_name = knownCustomer.last_name
                    v.gender = 'M'
                    const first = v.first_name.substring(0, 1).toLowerCase();
                    const last = v.last_name.substring(0, 3).toLowerCase();
                    v.email = `${first}${last}@gmail.com`
                    return v
                })
                const newOut = part1.concat(part2)
                data[name] = newOut
            }

            writeToJson(name, data, headers)
            results = data[name]

        })

}
