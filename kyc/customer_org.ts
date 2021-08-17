import {mocker} from "mocker-data-generator"
import {genCorrelationId, customer_type, business_units, ownership, legal_structure} from "../constant"
import {writeToJson} from '../util'


// Correlation ID
//Account Opening Date
//Customer Type
//Name
//Parent Company
//Doing Business As
//Country of Headquarters
//Date of Incorporation
//Industry
//Ownership
//Legal Structure
//Phone Number
//Email
//Tax Identification Number


export const generateCustomerOrg = (total: number) => {
    const beneficial_owners = {
        correlation_id: {
            values: [0]
        },
        account_opening_date: {
            function: function () {
                return (
                    this.chance.date({year: 2009, string: true, american: false})
                )
            }
        },
        customer_type: {
            values: customer_type
        },
        name: {
            chance: 'company'
        },
        parent_company: {
            values: ['']
        },
        doing_business_as: {
            values: ['']
        },
        date_of_incorporation: {
            function: function () {
                return (
                    this.chance.date({year: 2006, string: true, american: true})
                )
            }
        },
        industry: {
            function: function () {
                const phone = `${this.faker.phone.phoneNumber("######")}`
                if (phone.substring(0, 1) == '0') {
                    return phone.replace(/[0-9]/, '1')
                }
                return phone
            }
        },
        ownership: {
            values: ownership
        },
        legal_structure: {
            values: legal_structure
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
        email: {
            function: function () {
                return (
                    this.chance.email({domain: "org.com"})
                )
            }
        },
        tax_identification_number: {
            function: function () {
                const ssn = `${this.chance.ssn({dashes: false})}`
                const startValue = ssn.substring(0, 1);
                if (startValue == "0") {
                    return ssn.replace(/[0-9]/, '1')
                }
                return ssn
            }
        }


    }

    let name = "customer_org";
    mocker()
        .schema(name, beneficial_owners, total)
        .build((err, data) => {
            if (err) throw err
            const correlationList = genCorrelationId(total);
            data[name] = data[name].map((v,index) =>{
                v.correlation_id = correlationList[index]
                return v
            })
            // console.log('data', JSON.stringify(data))
            writeToJson(name, data)
        })

}
