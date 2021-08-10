import {mocker} from "mocker-data-generator"
import {genCorrelationId, business_units} from "./constant"
import {writeToJson} from './util'

// Correlation ID
// Business Unit

export const generateBusinessUnits = (total: number) => {
    const beneficial_owners = {
        correlation_id: {
            values: genCorrelationId(total)
        },
        business_units: {
            values: business_units
        },
    }

    let name = "business_units";
    mocker()
        .schema(name, beneficial_owners, total)
        .build((err, data) => {
            if (err) throw err
            // console.log('data', JSON.stringify(data))
            writeToJson(name, data)
        })

}
