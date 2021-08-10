import {mocker} from "mocker-data-generator"
import {genCorrelationId, product, business_units} from "./constant"
import {writeToJson} from './util'


// Correlation ID
//Product


export const generateProductOffered = (total: number) => {
    const product_offered = {
        correlation_id: {
            values: genCorrelationId(total)
        },
        product: {
            values: product
        },


    }

    let name = "product_offered";
    mocker()
        .schema(name, product_offered, total)
        .build((err, data) => {
            if (err) throw err
            // console.log('data', JSON.stringify(data))
            writeToJson(name, data)
        })

}
