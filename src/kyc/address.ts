import {mocker} from "mocker-data-generator"
import {writeToJson} from '../util'
import {KYC} from "./kyc";


// Correlation ID
//Address 1	Address 2
//City
//State
//Zip
//Country
export interface AddressesGen {
    addresses?: (AddressesEntity)[] | null;
}
export interface AddressesEntity {
    correlation_id: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

export class AddressGenerator extends KYC {


    constructor(private correlationIds: string[]) {
        super(0, correlationIds);
        this.headers = [
            'Correlation ID',
            'Address 1',
            'Address 2',
            'City',
            'State',
            'Zip',
            'Country'
        ]

    }

    generate(): AddressesGen {
        const total = this.correlationIds.length

        const addresses = {
            correlation_id: {
                values: [0]
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
        }

        this.name = "addresses";
        mocker()
            .schema(this.name, addresses, total)
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
