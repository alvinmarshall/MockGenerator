import {mocker} from "mocker-data-generator"
import {simpleDate, toTitles, writeToJson} from '../util'

import {
    annual_income,
    country_of_citizenship,
    country_of_residence,
    country_of_secondary_citizenship,
    country_of_taxation,
    gender,
    marital_status,
    occupation,
    source_of_income
} from '../constant'
import {KYC} from "./kyc";

export interface CustomerIndGen {
    customers_ind?: (CustomersIndEntity)[] | null;
}
export interface CustomersIndEntity {
    correlation_id: string;
    account_opening_date: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    country_of_citizenship: string;
    marital_status: string;
    email: string;
    phone_number: string;
    date_of_birth: string;
    social_security_number: string;
    source_of_wealth: string;
    tax_identification_number: string;
    country_of_secondary_citizenship: string;
    country_of_residence: string;
    occupation: string;
    annual_income: string;
    gender: string;
    country_of_taxation: string;
}


export class CustomerIndGenerator extends KYC {
    private readonly total: number

    constructor(private correlationIds: string[]) {
        super(0, correlationIds);
        this.total = correlationIds.length
        this.headers  = [
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
    }

    generate(): CustomerIndGen {
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
                    const date = this.chance.birthday({string: false})
                    return simpleDate(date)

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

        this.name = "customers_ind";
        mocker()
            .schema(this.name, customer_ind, this.total)
            .build((err, data) => {
                if (err) throw err
                const correlationList = this.correlationIds
                data[this.name] = data[this.name].map((v, index) => {
                    v.correlation_id = correlationList[index]
                    return v
                })
                if (data[this.name].length >= 100) {
                    const out = data[this.name]
                    let part1 = out.slice(0, 50)
                    const part2 = out.slice(50, 100)
                    part1 = part1.map((v, index) => {
                        const knownCustomer = this.getWatchList()[index];
                        v.first_name = toTitles(knownCustomer.first_name)
                        v.last_name = toTitles(knownCustomer.last_name)
                        v.gender = 'M'
                        const first = v.first_name.substring(0, 1).toLowerCase();
                        const last = v.last_name.substring(0, 3).toLowerCase();
                        v.email = `${first}${last}@gmail.com`
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
