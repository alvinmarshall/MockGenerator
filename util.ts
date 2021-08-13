import * as fs from 'fs';
import * as converter from 'json-2-csv'

export const writeToJson = (name, data) => {
    let outputDir = './output/json/';
    fs.mkdirSync(outputDir, {recursive: true});
    let path = `./output/json/${name}.json`;
    fs.writeFile(path, JSON.stringify(data), function (err) {
        if (err) console.log("error", err);
    });
    writeToCSV(name, data)

};

export const writeToCSV = (name: string, data) => {
    let outputDir = `./output/csv/${name}`;
    fs.mkdirSync(outputDir, {recursive: true});

    const keys = Object.keys(data)
    if (keys.length) {
        const key = keys[0]
        const result = data[key]
        keys.forEach((k) => {
            converter.json2csv(data[k], (err, csv) => {
                if (err) {
                    throw err;
                }
                fs.writeFile(`./output/csv/${name}/${k}.csv`, csv, function (err) {
                    if (err) console.log("error", err);
                });
            });
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

