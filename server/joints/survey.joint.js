
const 
    Surveys = require('../database/models/survey.model');


class SurveyJoint {
    constructor(){
        console.log('Router-to-Survey Joint Made');
    }

    saveSurvey(surveyModel){
        console.log('surveyModel recieved: ', surveyModel);
        let 
            survey = new Surveys(surveyModel);
        return new Promise((resolve, reject)=>{
            survey.save((err, result) => {
                if(err)
                    throw new Error(err);
                
                else if(Object.keys(result).length)
                    resolve({status: 201, body: result})
                else if(!Object.keys(result).length) 
                    reject({status: 501, body: "Survey Not Added"})
            });
        })
    }

    getAllSurveys(){
        return new Promise((resolve, reject)=>{
            let cb = (err, surveys) =>{
                if(err)
                    throw new Error('Unable to load All Surveys');
                
                if(!err)
                    surveys ? resolve({status: 302, body: surveys}) : reject({status: 404, body: "No Results Found"})

            }
            Surveys.find({}, cb)
        })
    }
    
    getSurveyById(_id){
        return new Promise((resolve, reject)=>{
            console.log(`gettings params.surveyId ${_id}`);
            let 
                findByIdCb = (err, result)=>{
                    if(err)
                        throw new Error(err);
                    
                    if(!err)
                        result ?
                            resolve({status: 200, body: result}) : reject({status: 404, body: "Record not found for desired data"})
                }
            
            Surveys.findById(_id, findByIdCb);
        })
        
    }

    getSurveyList(_list){
        return new Promise((resolve, reject)=>{
            let 
                list = _list,
                findCb = (err, results)=>{
                    if(err)
                        throw new Error(err);
                    
                    if(!err)
                        result ?
                            resolve({status: 200, body: result}) : reject({status: 404, body: "Record not found for desired data"})
                }

            Surveys.find({_id: {$in: list}}, findCb);
        });
    }

    

}
function getInstanceOfSurveyJoint(){
    return new SurveyJoint()
}
module.exports = getInstanceOfSurveyJoint()