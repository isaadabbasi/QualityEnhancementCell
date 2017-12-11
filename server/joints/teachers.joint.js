const 
    Teachers = require('../database/models/teachers.model'),
    SurveyJoint = require('../joints/survey.joint');

class TeacherJoint {
    constructor(){
        console.log(`Router to Teachers joint made.`);
    }

    addTeacher(teacherModel) {
        return new Promise( (resolve, reject)=>{
            let 
                teacher = new Teachers(teacherModel),
                cb = err => {
                    err ? 
                        reject({status: 409, body: `Teacher '${teacherModel.fullname}' already exists.`}) : 
                        resolve({status: 201, body: "Teacher Successfuly created."});
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
        teacher = surveyReference.teacher;
        // console.log('\n \n what is refObject', refObject);
        return new Promise((resolve, reject)=>{
            console.log('CB invoked');
            
            Teachers.update({fullname: {$regex: teacher}}, {$push: {surveys: refObject}}, (err, update)=> {
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
                    reject({status: 500, body: err.message});
                
                resolve({status: 200, body: data});
            })
        });
    }
    
    remove(_id){
        return new Promise((resolve, reject) => {

            Teachers.findById(_id, (err, teacher)=> {
                let surveys = teacher.surveys.map(survey => survey._reference);
                SurveyJoint.removeSurveyList(surveys)
                    .then(()=>{
                        Teachers.remove({_id}, err=> {
                            if(err)
                                throw new Error('Unable to delete teacher');
                            resolve({status: 200, body: 'Teacher deleted'});
                        })
                    })
                    .catch(err=>{
                        reject({status: 500, body: err.msg})    
                    })
            });
 
        });
    }

    update(_id, fields){
        return new Promise((resolve, reject) => {
            Teachers.update({_id}, {$set: fields}, (err, updated)=> {
                if(err){
                    reject({status: 500, body: `${err.message}`})
                    throw new Error(`unable to update teacher: ${err.message}`);
                }
                if(!err)
                    resolve({status: 200, body: 'Teacher Updated'});

            })
        });
    }
}

function getInstanceOfTeacherJoint(){
    return new TeacherJoint;
}
module.exports = getInstanceOfTeacherJoint();