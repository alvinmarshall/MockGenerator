import {mocker} from "mocker-data-generator"
import {countries_of_operation} from "../constant"
import {writeToJson} from '../util'
import {KYC} from "./kyc";

// Correlation ID
// countries_of_operation

export interface CountriesOfOperationGen {
    countries_of_operation?: (CountriesOfOperationEntity)[] | null;
}

export interface CountriesOfOperationEntity {
    correlation_id: string;
    country: string;
}

export class CountryOfOperationGenerator extends KYC {
    private total: number


    constructor(private correlationIds: string[]) {
        super(0, correlationIds);
        this.total = correlationIds.length
        this.headers = [
            'Correlation ID',
            'Country'
        ]
    }

    generate(): CountriesOfOperationGen {

        const country_of_operation = {
            correlation_id: {
                values: [0]
            },
            country: {
                values: countries_of_operation
            },

        }

        this.name = "countries_of_operation";
        mocker()
            .schema(this.name, country_of_operation, this.total)
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
