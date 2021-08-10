import {mocker} from "mocker-data-generator"
import {writeToJson} from './util'
import {genCorrelationId, country_of_residence} from "./constant"
// Correlation ID
//Address 1	Address 2
//City
//State
//Zip
//Country
let correlationIds = ['']


export const generateAddresses = (total: number = 5) => {
    correlationIds = genCorrelationId(total)
    const addresses = {
        correlation_id: {
            values: correlationIds
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
        }
    }

    let name = "addresses";
    mocker()
        .schema(name, addresses, total)
        .build((err, data) => {
            if (err) throw err
            // console.log('data', JSON.stringify(data))
            writeToJson(name, data)
        })
}