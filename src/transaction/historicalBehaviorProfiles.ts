import {mocker} from "mocker-data-generator";
import {formatDateToTransaction} from "../util";

export interface HistoricalBehaviorProfiles {
    historicalBehaviorProfiles?: (HistoricalBehaviorProfilesEntity)[] | null;
}

export interface HistoricalBehaviorProfilesEntity {
    factor: string;
    data?: (DataEntity)[] | null;
}

export interface DataEntity {
    id: string;
    name?: null;
    profileFactor: string;
    profileKind: string;
    month: number;
    year: number;
    totalValue: number;
    totalVolume: number;
    averageValue: number;
    averageVolume: number;
    valueStd: number;
    volumeStd: number;
    factorRatio: number;
    lastUpdated: string;
}

export const generateHistoricalBehaviorProfiles = (total: number = 10): HistoricalBehaviorProfiles => {
    let results: HistoricalBehaviorProfiles
    const historyData = {
        id: {
            function: function () {
                const phone = `${this.faker.phone.phoneNumber("########")}`
                if (phone.substring(0, 1) == '0') {
                    return phone.replace(/[0-9]]/, '1')
                }
                return phone
            }
        },
        name: {
            values: ['']
        },
        profileFactor: {
            values: ['TotalDeposits']
        },
        profileKind: {
            values: ['Account']
        },
        month: {
            values: [9, 8, 7]
        },
        year: {
            values: [2021]
        },
        totalValue: {
            values: [6000]
        },
        totalVolume: {
            values: [2.0]
        },
        averageValue: {
            values: [3000]
        },
        averageVolume: {
            values: [2.0]
        },
        valueStd: {
            values: [300]
        },
        volumeStd: {
            values: [0]
        },
        factorRatio: {
            values: [0]
        },
        lastUpdated: {
            function: function () {
                const date = this.faker.date.recent(1)
                return formatDateToTransaction(date)
            }
        }
    }

    const history_behavior_profiles = {
        factor: {
            values: ['TotalDeposits']
        },
        data: {
            hasMany: 'historyData',
            max: 4,
            min: 3,
            unique: true
        }
    }


    let name = "historicalBehaviorProfiles";
    let historyName = 'historyData'
    mocker()
        .schema(historyName, historyData, total)
        .schema(name, history_behavior_profiles, 1)
        .build((err, data) => {
            if (err) throw err
            // console.log(data[name][0])
            results = data[name]
            // writeToJson(name, data,headers)
        })
    return results

}
