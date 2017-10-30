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
    addSurveyReference(surveyReference){
        console.log('survey reference: ', surveyReference)
        let refObject = {
            created: surveyReference.created,
            _reference: surveyReference._id
        },
        target = surveyReference.target;
        // console.log('\n \n what is refObject', refObject);
        return new Promise((resolve, reject)=>{
            console.log('CB invoked');
            
            Teachers.update({fullname: {$regex: target}}, {$push: {surveys: refObject}}, (err, update)=> {
                // console.log('update ok?', !!update.ok)
                if(err)
                    reject({status: 404, msg: 'No Such Teacher Exist'});
                if(!err)    
                     update.ok ?
                    resolve({status: 201, msg: 'Reference Updated'})
                    :
                    reject({status: 501, msg: 'Unable to Update'});
            })

        })
    }

    deepSearch(params){
        return new Promise((resolve, reject)=>{
            let cb = (err, result) => {
                if(err)
                    throw new Error(err);
                
                if(!err)
                    result ? 
                        resolve({status: 200, body: result})
                        :
                        reject({status: 404, body: "Unable to find result for desired data"});
            }
            Teachers.find(params, cb)
                
        })
    }
    
    fetch(_id) {
        return new Promise((resolve, reject) => {
            Teachers.findById(_id, (err, data)=> {
                if(err)
                    reject();
                
                console.log(err, data);
            })
        });
    }
    
    remove(_id){
        return new Promise((resolve, reject) => {
            Teachers.remove({_id}, err=> {
                if(err)
                    throw new Error('Unable to delete teacher');

                resolve({status: 200, body: 'Teacher deleted'});
            })
        });
    }
}

function getInstanceOfTeacherJoint(){
    return new TeacherJoint;
}
module.exports = getInstanceOfTeacherJoint();