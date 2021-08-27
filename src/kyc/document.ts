import {mocker} from "mocker-data-generator"
import {document_type, id_document_url} from "../constant"
import {writeToJson} from '../util'
import {KYC} from "./kyc";


// Correlation ID
//Document Type	 URL

export interface DocumentGen {
    documents?: (DocumentsEntity)[] | null;
}

export interface DocumentsEntity {
    correlation_id: string;
    document_type: string;
    url: string;
}


export class DocumentGenerator extends KYC {

    constructor(private correlationIds: string[]) {
        super(0, correlationIds);
        this.headers = [
            'Correlation ID',
            'Document Type',
            'URL'
        ]
    }

    generate(): DocumentGen {
        const total = this.correlationIds.length

        const documents = {
            correlation_id: {
                values: [0]
            },
            document_type: {
                values: document_type
            },
            url: {
                values: id_document_url
            }
        }

        this.name = "documents";
        mocker()
            .schema(this.name, documents, total)
            .build((err, data) => {
                if (err) throw err
                const correlationList = this.correlationIds;
                data[this.name] = data[this.name].map((v, index) => {
                    v.correlation_id = correlationList[index]
                    if (v.correlation_id.includes(this.getOrganizationPattern())) {
                        v.document_type = 'INCORPORATION_DOCUMENT'
                    } else {
                        v.document_type = 'IDENTITY_DOCUMENT'
                    }
                    return v
                })
                this.results = data
            })
        return this.results
    }

    run() {
        const data = this.generate();
        writeToJson(this.name, data, this.headers)
    }

}
