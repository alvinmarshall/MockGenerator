import {mocker} from "mocker-data-generator"
import {writeToJson} from '../util'
import {KYC} from "./kyc";


// Correlation ID
//Relation
//Relation Type
//Entity Type
//Entity Name
//Entity ID

export interface RelationshipGen {
    relationships?: (RelationshipsEntity)[] | null;
}

export interface RelationshipsEntity {
    correlation_id: string;
    relation: string;
    relation_type: string;
    entity_type: string;
    entity_name: string;
    entity_id: string;
}

export class RelationshipGenerator extends KYC {
    private readonly total: number

    constructor(private correlationIds: string[]) {
        super(0, correlationIds);
        this.total = correlationIds.length
        this.headers = [
            'Correlation ID',
            'Relation',
            'Relation Type',
            'Entity Type',
            'Entity Name',
            'Entity ID'
        ]

    }

    generate(): RelationshipGen {

        const relationships = {
            correlation_id: {
                values: [0]
            },
            relation: {
                values: ['Owner']
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
                values: ['']
                // function: function () {
                //     const phone = `${this.faker.phone.phoneNumber("###############")}`
                //     if (phone.substring(0, 1) == '0') {
                //         return phone.replace(/[0-9]]/, '1')
                //     }
                //     return phone
                // }
            },
            links: {
                hasMany: 'otherRelationships',
                min: 1,
                max: 2


            }


        }
        const otherRelationships = {
            correlation_id: {
                values: [0]
            },
            relation: {
                values: ['Beneficiary']
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
                values: ['']
                // function: function () {
                //     const phone = `${this.faker.phone.phoneNumber("###############")}`
                //     if (phone.substring(0, 1) == '0') {
                //         return phone.replace(/[0-9]]/, '1')
                //     }
                //     return phone
                // }
            }


        }

        this.name = "relationships";
        let relationName = "otherRelationships";
        mocker()
            .schema(relationName, otherRelationships, 4)
            .schema(this.name, relationships, this.total)
            .build((err, data) => {
                if (err) throw err
                const correlationList = this.correlationIds
                // const otherCorrelationList = genCorrelationId(this.relationCount, 1100)
                data[this.name] = data[this.name].map((v, index) => {
                    v.correlation_id = correlationList[index]
                    return v
                })
                // data[relationName].forEach((d,indx) =>{
                //     console.log(indx)
                // })

                this.results = data
            })
        return this.results
    }

    run() {
        const data = this.generate();
        writeToJson(this.name, data, this.headers)
    }

}
