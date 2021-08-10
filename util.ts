import * as fs from 'fs';
import * as converter from 'json-2-csv'

export const writeToJson = (name, data) => {
    let outputDir = './output/json/';
    fs.mkdirSync(outputDir, { recursive: true });
    let path = `./output/json/${name}.json`;
    fs.writeFile(path, JSON.stringify(data), function (err) {
        if (err) console.log("error", err);
    });
    writeToCSV(name, data)

};

export const writeToCSV = (name: string, data) => {
    let outputDir = './output/csv';
    fs.mkdirSync(outputDir, { recursive: true });

    const keys = Object.keys(data)
    if (keys.length) {
        const key = keys[0]
        const result = data[key]
        converter.json2csv(result, (err, csv) => {
            if (err) {
                throw err;
            }
            fs.writeFile(`./output/csv/${name}.csv`, csv, function (err) {
                if (err) console.log("error", err);
            });
        });
    }


};

