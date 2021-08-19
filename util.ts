import * as fs from 'fs';
import * as converter from 'json-2-csv'

export const writeToJson = (name: string, data: any, headers = []) => {
    let outputDir = './output/json/';
    fs.mkdirSync(outputDir, {recursive: true});
    let path = `./output/json/${name}.json`;
    fs.writeFile(path, JSON.stringify(data), function (err) {
        if (err) console.log("error", err);
    });
    writeToCSV(name, data, headers)

};

export const writeToCSV = (name: string, data, headers = []) => {
    let outputDir = `./output/csv/${name}`;
    fs.mkdirSync(outputDir, {recursive: true});

    const keys = Object.keys(data)
    if (keys.length) {
        const key = keys[0]
        const newOpts = []

        keys.forEach((k) => {
            if (data[key].length) {
                // map headers
                data[key].slice(0, 1).forEach((data) => {
                    const output = Object.keys(data).map((k, index) => {
                        return {field: k, title: headers[index]}
                    })
                    newOpts.push(...output)
                })
            }


            let options = {
                keys: newOpts
            };

            converter.json2csv(data[k], (err, csv) => {
                if (err) {
                    throw err;
                }
                fs.writeFile(`./output/csv/${name}/${k}.csv`, csv, function (err) {
                    if (err) console.log("error", err);
                });
            }, options);
        })

    }


};

export const formatDateToTransaction = (current: string) => {
    const date = new Date(current);
    const dateStr =
        ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
        ("00" + date.getDate()).slice(-2) + "/" +
        date.getFullYear() + " " +
        ("00" + date.getHours()).slice(-2) + ":" +
        ("00" + date.getMinutes()).slice(-2) + ":" +
        ("00" + date.getSeconds()).slice(-2);
    return dateStr
}

export const shuffleArray = (array: any[]) => {
    const newArr = array.slice()
    for (let i = newArr.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    return newArr
}

export const loadFile = (filePath: string) => {
    const rawdata = fs.readFileSync(filePath);
    // @ts-ignore
    return JSON.parse(rawdata);
}

export const toTitles = (s) => s.replace(/\w\S*/g, (t) => t.charAt(0).toUpperCase() + t.substr(1).toLowerCase());

export const generateRandomAmount = (lowerBound: number, upperBound: number, limit: number, rate: number = 100) => {
    const output = []
    for (let i = 0; i < limit; i++) {
        let value = Math.floor(Math.random() * (upperBound - lowerBound + rate) + lowerBound);
        output.push(value);
    }
    return output;
}
