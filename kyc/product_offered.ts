import {mocker} from "mocker-data-generator"
import {genCorrelationId, product, business_units} from "../constant"
import {writeToJson} from '../util'


// Correlation ID
//Product


export const generateProductOffered = (total: number) => {
    const product_offered = {
        correlation_id: {
            values: [0]
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
            const correlationList = genCorrelationId(total);
            data[name] = data[name].map((v,index) =>{
                v.correlation_id = correlationList[index]
                return v
            })
            // console.log('data', JSON.stringify(data))
            writeToJson(name, data)
        })

}
