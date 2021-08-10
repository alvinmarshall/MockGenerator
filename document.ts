import {mocker} from "mocker-data-generator"
import {genCorrelationId, document_type, id_document_url} from "./constant"
import {writeToJson} from './util'


// Correlation ID
//Document Type	 URL

export const generateDocuments = (total: number) => {
    const documents = {
        correlation_id: {
            values: genCorrelationId(total)
        },
        document_type: {
            values: document_type
        },
        url: {
            values: [id_document_url]
        }
    }

    let name = "documents";
    mocker()
        .schema(name, documents, total)
        .build((err, data) => {
            if (err) throw err
            // console.log('data', JSON.stringify(data))
            writeToJson(name, data)
        })

}
