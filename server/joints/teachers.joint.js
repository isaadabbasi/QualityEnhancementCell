const Teachers = require('../models/teachers.model');

class TeacherJoint {
    constructor(){
        console.log(`joint invoked`);
    }

    addSurveyReference({created, _id, target}){
        // console.log('addSurveyRef called');
        let refObject = {created, reference};
        let cb = (resolve, reject)=>{
            Teachers.update({fullname: target}, {created: created, _reference: reference}, (err, update)=> {
                if(err)
                    reject({status: 404, msg: 'No Such Teacher Exist'});
                if(!err && update)
                    resolve({status: 201, msg: 'Reference Updated'});
                else if(!err && !update)
                    reject({status: 501, msg: 'Unable to Update'});
            })
        }
        return new Promise(cb)
    }
}
function getInstanceOfTeacherJoint(){
    return new TeacherJoint;
}
module.exports = getInstanceOfTeacherJoint();