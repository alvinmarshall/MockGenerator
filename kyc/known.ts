import {loadFile} from "../util";

export const getKnownCustomers = () => {
    return loadFile('./known.json');
}

getKnownCustomers()