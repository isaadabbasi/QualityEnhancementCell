const Teachers = require('../database/models/teachers.model');

class TeacherJoint {
    constructor(){
        console.log(`Router to Teachers joint made.`);
    }

    addTeacher(teacherModel) {
        return new Promise( (resolve, reject)=>{
            let 
                teacher = new Teachers(teacherModel),
                cb = (err, teacher) => {
                    if(err)
                        throw new Error();
                    if(!err && teacher)
                        resolve({status: 201, body: "Teacher Successfuly created."})
                };
            teacher.save(cb)
        })
    }
    addSurveyReference({created, _id, target}){
        let refObject = {created, reference};
        console.log(refObject)
        return new Promise((resolve, reject)=>{
            console.log('CB invoked');
            
            Teachers.update({fullname: {$regex: target}}, {$set: {survey: [refObj]}}, (err, update)=> {
                console.log(err, result)
                if(err)
                    reject({status: 404, msg: 'No Such Teacher Exist'});
                if(!err)
                     update ?
                    resolve({status: 201, msg: 'Reference Updated'})
                    :
                    reject({status: 501, msg: 'Unable to Update'});
            })

        })
    }
}
function getInstanceOfTeacherJoint(){
    return new TeacherJoint;
}
module.exports = getInstanceOfTeacherJoint();