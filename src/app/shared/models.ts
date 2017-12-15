export interface StudentModel {
    id?:        string
    fullname?:  string,
    password?:  string
    rollnumber: string,
    department: string,
}

export interface TeacherModel {
    id:             string,
    fullname:       string,
    designation:    string,
    surveys:        Array<any>,
    survey:         Array<Object>,
    subjects:       Array<string>,
    departments:    Array<string>
}

export interface UserCredentialsModel {
    rollnumber: string, 
    password:   string, 
    email:      string
} 

export interface TeacherListItem {
    fullname    : string,
    designation : string,
    
    surveys     : Array<Object>
    subjects    : Array<string>,
    departments : Array<string>,
}

export interface DeparmentsListItemModel{
    value   : string,
    name    : string
}