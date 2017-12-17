export interface modalOptionsModel {
    metaData: metaDataModel,
    header: string,
    body:   Array<any> | Object | any,
            
    footer: any | string | Array<Object>
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