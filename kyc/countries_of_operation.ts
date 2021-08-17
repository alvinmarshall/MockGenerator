import {mocker} from "mocker-data-generator"
import {genCorrelationId, countries_of_operation} from "../constant"
import {writeToJson} from '../util'

// Correlation ID
// countries_of_operation

export const generateCountriesOfOperation = (total: number) => {
    const country_of_operation = {
        correlation_id: {
            values: [0]
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
            const correlationList = genCorrelationId(total);
            data[name] = data[name].map((v,index) =>{
                v.correlation_id = correlationList[index]
                return v
            })
            // console.log('data', JSON.stringify(data))
            writeToJson(name,data)
        })

}
