import {mocker} from "mocker-data-generator"
import {business_units} from "../constant"
import {writeToJson} from '../util'
import {KYC} from "./kyc";

// Correlation ID
// Business Unit

export interface BusinessUnitGen {
    business_units?: (BusinessUnitsEntity)[] | null;
}

export interface BusinessUnitsEntity {
    correlation_id: string;
    business_units: string;
}

export class BusinessUnitGenerator extends KYC {
    private total: number

    constructor(private correlationIds: string[]) {
        super(0, correlationIds)
        this.total = correlationIds.length
        this.headers = [
            'Correlation ID',
            'Business Unit'
        ]

    }

    generate(): BusinessUnitGen {

        const beneficial_owners = {
            correlation_id: {
                values: [0]
            },
            business_units: {
                values: business_units
            },
        }

        this.name = "business_units";
        mocker()
            .schema(this.name, beneficial_owners, this.total)
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
