import {mocker} from "mocker-data-generator"
import {genCorrelationId, document_type, id_document_url} from "../constant"
import {writeToJson} from '../util'


// Correlation ID
//Document Type	 URL

export const generateDocuments = (total: number) => {
    const documents = {
        correlation_id: {
            values: [0]
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
            const correlationList = genCorrelationId(total);
            data[name] = data[name].map((v,index) =>{
                v.correlation_id = correlationList[index]
                return v
            })
            // console.log('data', JSON.stringify(data))
            writeToJson(name, data)
        })

}
