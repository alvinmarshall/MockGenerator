// Correlation ID
// Account
// Opening Date
// First Name
// Middle Name
// Last Name
// Country of Citizenship
// Marital Status
// Email
// Phone Number
// Date of Birth
// Social Security Number
// Source of Wealth
// Tax Identification Number
// Country of Secondary Citizenship
// Country of Residence
// Occupation	 Annual Income	 Gender	 Country of Taxation


export const genCorrelationId = (limit: number = 100): string[] => {
    const correlationId = 1000
    const output = []
    for (let i = 1; i < limit; i++) {
        output.push("" + correlationId + i)
    }
    return output

}
export const marital_status = [
    "Single",
    "Married"
]

export const source_of_income = [
    "Business",
    "Salary",
    "Family wealth",
    "Gambling"
]

export const gender = [
    "M", "F"
]

export const opening_date = [
    "01-01-2019"
]

export const country_of_secondary_citizenship = [
    "US", "", "UK", "GH"
]
export const country_of_citizenship = [
    "GH", "US", "UK"
]
export const country_of_residence = [
    "GH", "US", "UK"
]
export const country_of_taxation = [
    "GH", "US", "UK"
]

export const annual_income = [
    "USD 500,000.00",
    "USD 100,000.00",
    "USD 600,000.00",
    "USD 300,000.00",
    "USD 200,000.00",
    "USD 1500.00",
]

export const country_of_residency = [
    "Resident Individual",
    "Non Resident",
    "Foreign National"
]

export const occupation = [
    "Accountant",
    "Trader",
    "Teacher",
    "Software Engineer",
    "Cop"
]


export const account_type = [
    "MONEY_MARKET_ACCOUNT",
    "LOAN_ACCOUNT",
    "SAVINGS_ACCOUNT",
    "CHECKING_ACCOUNT",
    "CERTIFICATE_OF_DEPOSIT",
    "INDIVIDUAL_RETIREMENT_ACCOUNT",
    "SAVINGS_ACCOUNT",
]

const type_of_entity = [
    "sole-proprietorship",
    "Partnership",
    "Corporation",
    "Limited Liability Company"
]

export const id_document_url = [
    "https://storage.googleapis.com/trustpoint-267219_customer_documents/ca6ba568-bfcc-4db6-bb18-ae25050b2c63.jpg"
]

export const business_units = [
    "New York South BU",
    "London East BU"
]
export const document_type = [
    "IDENTITY_DOCUMENT",
    "INCORPORATION_DOCUMENT"
]

export const countries_of_operation = [
    "GH", "US", "UK"
]

export const account_opening_method = [
    "online", "walk-in", "phone"
]

export const currency = [
    "USD"
]

export const product = [
    "Money Transmittal",
    "Check cashing"
]
export const customer_type = [
    "FIN",
    "ORG"
]

export const ownership = [
    "public",
    "private"
]
export const legal_structure = [
    "corporation",
    "sole proprietorship"
]

export const expected_yearly_activity_value = [
    "USD 500,000.00",
    "USD 100,000.00",
    "USD 600,000.00",
    "USD 300,000.00",
    "USD 200,000.00",
    "USD 1500.00",
]