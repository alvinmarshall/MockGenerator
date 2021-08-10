import {mocker} from "mocker-data-generator"
import {genCorrelationId, countries_of_operation} from "./constant"
import {writeToJson} from './util'

// Correlation ID
// countries_of_operation

export const generateCountriesOfOperation = (total: number) => {
    const country_of_operation = {
        correlation_id: {
            values: genCorrelationId(total)
        },
        country: {
            values: countries_of_operation
        },


    }

    let name = "countries_of_operation";
    mocker()
        .schema(name, country_of_operation, total)
        .build((err, data) => {
            if (err) throw err
            // console.log('data', JSON.stringify(data))
            writeToJson(name,data)
        })

}
