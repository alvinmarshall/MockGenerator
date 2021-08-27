import {mocker} from "mocker-data-generator"
import {id_document_url} from "../constant"
import {simpleDate, writeToJson} from '../util'
import {KYC} from "./kyc";
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

export interface BeneficialOwnersGen {
    beneficial_owners?: (BeneficialOwnersEntity)[] | null;
}

export interface BeneficialOwnersEntity {
    correlation_id: string;
    internal_cus_correlation_id: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    social_security_number: string;
    date_of_birth: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    id_document_url: string;
}

export class BeneficialOwnersGenerator extends KYC {

    constructor(private correlationIds: string[]) {
        super(0, correlationIds);
        this.headers = [
            'Correlation ID',
            'Internal Cust Correlation ID',
            'First Name',
            'Middle Name',
            'Last Name',
            'Social Security Number',
            'Date of Birth',
            'Address 1',
            'Address 2',
            'City',
            'State',
            'Zip',
            'Country',
            'ID Document URL'
        ]

    }

    generate(): BeneficialOwnersGen {
        const total = this.correlationIds.length

        const beneficial_owners = {
            correlation_id: {
                values: [0]
            },
            internal_cus_correlation_id: {
                values: ['']
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
                    const date = this.chance.birthday({string: false})
                    return simpleDate(date)
                }
            },
            address_1: {
                values: ['']
            },
            address_2: {
                values: ['']
            },
            city: {
                values: ['']
            },
            state: {
                values: ['']
            },
            zip: {
                values: ['']
            },
            country: {
                values: ['US']
            },
            id_document_url: {
                values: id_document_url
            }
        }
        this.name = "beneficial_owners";
        mocker()
            .schema(this.name, beneficial_owners, total)
            .build((err, data) => {
                if (err) throw err
                const correlationList = this.correlationIds
                const knownAddress = this.getFakerAddress()
                let end = data[this.name].length
                data[this.name] = data[this.name].map((v, index) => {
                    v.correlation_id = correlationList[index]
                    v.city = knownAddress[index].city
                    v.state = knownAddress[index].stateprovincefull
                    v.zip = knownAddress[index].zipcodepostalcode
                    v.address_1 = knownAddress[index].street
                    if (index % 2 == 0) {
                        v.address_2 = knownAddress[end].street
                    }
                    end--
                    return v
                })
                this.results = data
            })
        return this.results
    }

    run() {
        const data = this.generate()
        writeToJson(this.name, data, this.headers)
    }

}
