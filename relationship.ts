import {mocker} from "mocker-data-generator"
import {genCorrelationId, business_units} from "./constant"
import {writeToJson} from './util'


// Correlation ID
//Relation
//Relation Type
//Entity Type
//Entity Name
//Entity ID

export const generateRelationships = (total: number) => {
    const relationships = {
        correlation_id: {
            values: genCorrelationId(total)
        },
        relation_type: {
            values: ['ACCOUNT_CUSTOMER']
        },
        entity_type: {
            values: ['ACCOUNT']
        },
        entity_name: {
            function: function () {
                return (
                    `${this.faker.name.firstName()} ${this.faker.name.lastName()}`
                )
            }
        },
        entity_id: {
            function: function () {
                return (
                    "" + this.faker.phone.phoneNumber("###############")
                )
            }
        }


    }

    let name = "relationships";
    mocker()
        .schema(name, relationships, total)
        .build((err, data) => {
            if (err) throw err
            // console.log('data', JSON.stringify(data))
            writeToJson(name, data)
        })

}
