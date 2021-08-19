import {mocker} from "mocker-data-generator"
import {genCorrelationId, business_units} from "../constant"
import {writeToJson} from '../util'


// Correlation ID
//Relation
//Relation Type
//Entity Type
//Entity Name
//Entity ID

export const generateRelationships = (total: number) => {
    const headers = [
        'Correlation ID',
        'Relation',
        'Relation Type',
        'Entity Type',
        'Entity Name',
        'Entity ID'
    ]
    const relationships = {
        correlation_id: {
            values: [0]
        },
        relation: {
            values:['Owner','Beneficiary']
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
                const phone = `${this.faker.phone.phoneNumber("###############")}`
                if (phone.substring(0, 1) == '0') {
                    return phone.replace(/[0-9]]/, '1')
                }
                return phone
            }
        }


    }

    let name = "relationships";
    mocker()
        .schema(name, relationships, total)
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
