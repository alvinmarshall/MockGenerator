import {mocker} from "mocker-data-generator";
import {AccountSchema} from "../kyc/account";


export interface LogicalEntity {
    id: string;
    name: string;
    entities?: (EntitiesEntity)[] | null;
}

export interface EntitiesEntity {
    id: string;
    entityType: string;
    entityId: string;
    entityName: string;
    relationType: string;
}

export const generateLogicalEntity = (account: AccountSchema, total: number = 5): LogicalEntity => {
    let results: LogicalEntity
    const entities = {
        id: {
            values: [account.id]
        },
        entityName: {
            values: [account.account_holder]
        },
        entityType: {
            values: ['ACCOUNT']
        },
        entityId: {
            values: [account.account_number]
        },
        relationType: {
            values: ['']
        }

    }

    const logical_entities = {
        id: {
            chance: 'guid'
        },
        name: {
            faker: 'name.findName'
        },
        entities: {
            hasMany: 'entities',
            max: 1,
            min: 1,
        }
    }


    let name = "logicalEntity";
    let entitiesName = 'entities'
    mocker()
        .schema(entitiesName, entities, total)
        .schema(name, logical_entities, 1)
        .build((err, data) => {
            if (err) throw err
            // console.log(data[name][0])
            results = data[name][0]
            // writeToJson(name, data,headers)
        })
    return results

}
