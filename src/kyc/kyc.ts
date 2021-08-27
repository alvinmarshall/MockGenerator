import {loadFile} from "../util";
import {CustomAddress, FakerAddress, WatchList} from "./known";

export abstract class KYC {
    protected staticAccounts: string[] | number[]
    name: string
    protected results: any
    protected headers: string[]

    protected abstract generate()

    protected abstract run()

    relationCount: number

    protected constructor(count: number, correlationIds: string[]) {
        this.relationCount = count
        this.staticAccounts = []
    }

    getOrganizationPattern() {
        return '2000'
    }

    protected getFakerAddress = (rate: number = 100): CustomAddress[] => {
        const data: FakerAddress[] = loadFile('./crawler/faker.json');
        let output = []
        for (let i = 0; i < rate; i++) {
            const address = data.map((d) => {
                const {city, stateprovinceabbr, zipcodepostalcode, street, stateprovincefull} = {...d}
                return {city, street, zipcodepostalcode, stateprovinceabbr, stateprovincefull}
            })
            output.push(...address)
        }
        return output
    }

    protected getWatchList = (): WatchList[] => {
        return loadFile('./known.json');
    }
}