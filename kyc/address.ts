import {mocker} from "mocker-data-generator"
import {writeToJson} from '../util'
import {genCorrelationId, country_of_residence} from "../constant"
// Correlation ID
//Address 1	Address 2
//City
//State
//Zip
//Country


export const generateAddresses = (total: number = 5) => {
    const headers = [
        'Correlation ID',
        'Address 1',
        'Address 2',
        'City',
        'State',
        'Zip',
        'Country'
    ]
    const addresses = {
        correlation_id: {
            values: [0]
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
            const correlationList = genCorrelationId(total);
            data[name] = data[name].map((v, index) => {
                v.correlation_id = correlationList[index]
                return v
            })
            // console.log('data', JSON.stringify(data))
            writeToJson(name, data, headers)
        })
}