export interface modalOptionsModel {
    metaData: metaDataModel,
    header: string,
    body:   Array<Object> | Object,
            
    footer: string | Array<Object>
}

interface html {
    h1: Array<string>,
    p: Array<string>,
}

interface metaDataModel{
    
    chaining?:   boolean,
    labels:     boolean,
    setOnTop:   boolean,
    type?:       string 
}