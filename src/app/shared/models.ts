export interface StudentModel {
    department: string,
    rollnumber: string,
    fullname?: string,
    password?: string
    id?: string
}

export interface TeacherModel {
    id: string,
    fullname: string,
    designation:string,
    survey: Array<Object>,
    surveys: Array<any>,
    subjects: Array<string>,
    departments: Array<string>
}