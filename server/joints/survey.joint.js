
const 
    Surveys = require('../database/models/survey.model')
    napajs = require('napajs'),
    cores = require('os').cpus().length, 
    MultiCores = napajs.zone.create('cores',{workers: cores});

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

    multiThreadsExecution(surveysArgs){
        
        // return new Promise((resolve, reject) => {
            // console.log('MTE execution: ')
            return  MultiCores.execute(
                (surveys)=> {
    
                let 
                combined = [],
                totalSurveys = surveys.length;
                    
                for(let survey of surveys) {
                    let date = new Date(survey.created),
                        target = `${date.getMonth()},${date.getDate()},${date.getYear()}`,
                        // target = `${date.getDate()}`,
                        matchFound = false;
                    survey.dated = target;
                    
                    console.log(survey.dated);
                    
                    if(!combined.length){
                        combined.push(survey);
                    } else {
                        for(let i=0; i<combined.length; i++){
                            if(combined[i].dated === survey.dated){
                                matchFound = true;
                                let merged = mergeSurvey(combined[i], survey);
                                combined[i] = merged;
                            }
                        }
                        if(!matchFound)
                            combined.push(survey);
                    }
                }
                function mergeSurvey(_stored, {survey: curr}){
                    console.log('stored dated: ', _stored.dated)
                    // TODO; what to choose for length;
                    let stored = _stored.survey;
                    for (let i=0; i<stored.length; i++){
                        if(!(typeof stored[i].id === 'string'))
                        stored[i].value = +( (stored[i].value + curr[i].value)/2 ).toPrecision(3);
                    }
                    // console.log('combine method end');
                    _stored.survey = stored;
                    return _stored;
                }
                
                return combined;
                },
                [surveysArgs])
            // ).then(combined=>{
            //     // res.send(combined);
            //     console.log('finalized..');
            //     resolve(combined.value);
            // })
            // .catch(err => {console.log(err);})

        // })

    }

    syncMergeSurvey(surveys){
        // return new Promise((resolve, reject)=> {
            console.log('invoked sync merge survey')
            let 
            combined = [],
            totalSurveys = surveys.length;
                
            for(let survey of surveys) {
                let date = new Date(survey.created),
                    target = `${date.getMonth()},${date.getDate()},${date.getYear()}`,
                    // target = `${date.getDate()}`,
                    matchFound = false;
                survey.dated = target;
                
                console.log(survey.dated);
                
                if(!combined.length){
                    combined.push(survey);
                } else {
                    for(let i=0; i<combined.length; i++){
                        if(combined[i].dated === survey.dated){
                            matchFound = true;
                            let merged = mergeSurvey(combined[i], survey);
                            combined[i] = merged;
                        }
                    }
                    if(!matchFound)
                        combined.push(survey);
                }
            }
            function mergeSurvey(_stored, {survey: curr}){
                console.log('stored dated: ', _stored.dated)
                // TODO; what to choose for length;
                let stored = _stored.survey;
                for (let i=0; i<stored.length; i++){
                    if(!(typeof stored[i].id === 'string'))
                    stored[i].value = +( (stored[i].value + curr[i].value)/2 ).toPrecision(3);
                }
                // console.log('combine method end');
                _stored.survey = stored;
                return _stored;
            }
            console.log(combined)
            return combined;
        // })
    }
}

function getInstanceOfSurveyJoint(){
    return new SurveyJoint()
}
module.exports = getInstanceOfSurveyJoint()