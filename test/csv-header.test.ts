import * as converter from 'json-2-csv'

let documents = [
    {
        "correlation_id": "10000",
        "account_number": "810685195716571",
        "opening_date": "16/6/2009",
        "account_type": "LOAN_ACCOUNT",
        "account_holder_name": "Ramin Manawi",
        "account_opening_method": "online",
        "currency": "USD",
        "description": "",
        "expected_yearly_activity_value": "USD 300,000.00"
    },
];

const headers = [
    'Correlation ID',
    'Account Number',
    'Opening Date',
    'Account Type',
    'Account Holder Name',
    'Account Opening Method',
    'Currency',
    'Description',
    'Expected Yearly Activity Value'
]
const newOpts = []
documents.slice(0, 1).forEach((data) => {

    const output = Object.keys(data).map((k, index) => {
        return {field: k, title: headers[index]}
    })
    newOpts.push(...output)
})

console.log(newOpts)

let options = {
    keys: newOpts
};


converter.json2csv(documents, function (err, csv) {
    if (err) {
        throw err;
    }
    return console.log(csv);
}, options);