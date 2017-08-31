
const 
    Surveys = require('../database/models/survey.model'),
    getSurveyPromiseCb ;


class SurveyJoint {
    constructor(){
        console.log('Router-to-Survey Joint Made');
    }
    getCommonCb(msg, successStatus, errStatus){
        return (err, result) => {
            if(err)
                throw new Error(err);
            if(!err)
                result ?
                    resolve({status: successStatus, body: result}) : reject({status: errStatus, body: msg})
        }
    }

    saveSurvey(surveyModel){
        let 
            survey = new Surveys(surveyModel),
            msg = ""
        return new Promise((resolve, reject)=>{
            survey.save(this.getCommonCb("Unable to save survey", 201, 501));
        })
    }
    
    getSurveyById(_id){
        return new Promise((resolve, reject)=>{
            console.log(`gettings params.surveyId ${req.params.surveyId}`);
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