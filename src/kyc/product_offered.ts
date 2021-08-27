import {mocker} from "mocker-data-generator"
import {product} from "../constant"
import {writeToJson} from '../util'
import {KYC} from "./kyc";


// Correlation ID
//Product

export interface ProductOfferedGen {
    product_offered?: (ProductOfferedEntity)[] | null;
}

export interface ProductOfferedEntity {
    correlation_id: string;
    product: string;
}


export class ProductOfferedGenerator extends KYC {
    private total: number

    constructor(private correlationIds: string[]) {
        super(0, correlationIds);
        this.total = correlationIds.length
        this.headers = [
            'Correlation ID',
            'Product'
        ]
    }

    generate(): ProductOfferedGen {

        const product_offered = {
            correlation_id: {
                values: [0]
            },
            product: {
                values: product
            },
        }

        this.name = "product_offered";
        mocker()
            .schema(this.name, product_offered, this.total)
            .build((err, data) => {
                if (err) throw err
                const correlationList = this.correlationIds
                data[this.name] = data[this.name].map((v, index) => {
                    v.correlation_id = correlationList[index]
                    return v
                })
                this.results = data
            })
        return this.results
    }

    run() {
        const data = this.generate();
        writeToJson(this.name, data, this.headers)
    }
}
