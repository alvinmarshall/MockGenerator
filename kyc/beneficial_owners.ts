import {mocker} from "mocker-data-generator"
import {genCorrelationId, country_of_residence, id_document_url} from "../constant"
import {writeToJson} from '../util'
// Correlation ID
// Internal Cust Correlation ID
// First Name
// Middle Name
// Last Name
// Social Security Number
// Date of Birth
// Address 1
// Address 2
// City
// State
// Zip
// Country
// ID Document URL

export const generateBeneficialOwners = (total: number) => {
    const beneficial_owners = {
        correlation_id: {
            values: [0]
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
        social_security_number: {
            function: function () {
                return (
                    `${this.faker.phone.phoneNumber("#########")}`
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
        address_1: {
            chance: 'street'
        },
        address_2: {
            values: ['']
        },
        city: {
            chance: 'city'
        },
        zip: {
            chance: 'zip'
        },
        country: {
            values: country_of_residence
        },
        id_document_url: {
            values: id_document_url
        }
    }

    let name = "beneficial_owners";
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
