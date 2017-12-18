const 
    Surveys = require('../database/models/survey.model')
    napajs = require('napajs'),
    fs = require('fs'),
    execFile = require('child_process').execFile,
    cores = require('os').cpus().length -1 , 
    NapaZone = napajs.zone.create('cores',{ workers: cores });

class SurveyJoint {
    constructor(){}

    saveSurvey(surveyModel){
        console.log('surveyModel recieved: ', surveyModel);
        let survey = new Surveys(surveyModel);
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

    getAllSurveys(params){
        params.evaluation = 'teacher';
        return new Promise((resolve, reject)=>{
            let cb = (err, surveys) =>{
                if(err)
                    throw new Error('Unable to load All Surveys');
                
                if(!err)
                    surveys ? resolve({status: 302, body: surveys}) : reject({status: 404, body: "No Results Found"})

            }
            Surveys.find(params, cb)
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
        console.log('_list: ', _list);
        return new Promise((resolve, reject)=>{
            let 
                list = _list,
                findCb = (err, results)=>{
                    if(err)
                        throw new Error(err);
                    
                    if(results.length)
                        resolve({status: 200, body: results})
                    else
                        reject({status: 404, body: "No Surveys Found"})
                }

            Surveys.find({_id: {$in: list}}, findCb);
        });
    }

    removeSurveyList(_list){
        return new Promise((resolve, reject)=>{
            let 
                list = _list,
                removeCb = err => {
                    err ? 
                        reject({err: 500, body: "Error at deleting surveys"})
                        :
                        resolve({err: 200, body: "Deleted"});
                }

            Surveys.remove({_id: {$in: list}}, removeCb);
        });
    }

    optimizeParallel(surveysArgs){
        
        function mergeSurveys(surveys){
            let 
            combined = [],
            // surveys = surveysArgs,
            totalSurveys = surveys.length;
                
            for(let survey of surveys) {
                let date = new Date(survey.created),
                    target = `${date.getMonth()},${date.getDate()},${date.getYear()}`,
                    // target = `${date.getDate()}`,
                    matchFound = false;
                
                    survey.dated = target;
                // console.log(survey.dated);
                
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
                // console.log('stored dated: ', _stored.dated)
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
        }
            NapaZone.broadcast( mergeSurveys.toString() );
            return  NapaZone.execute(
                (surveys)=> {
                    return global.mergeSurveys(surveys);
                },
                [surveysArgs]);
    }

    optimize(surveys, optimizeType = 'batch'){
        let 
            dirPath = `${__dirname}/../utils/process/`,
            filePath = `${dirPath}merge_surveys.js`,
            surveysJson = JSON.stringify(surveys),
            file_sys = {
                flags: 'rw',
                encoding: 'utf8',
                mode: 0o660
            };

        return new Promise( (resolve, reject) => {
            fs.writeFile(`${dirPath}/record`, surveysJson, file_sys, (err, done)=>{
                if(err){
                    reject({status: 400, body: "Unable to optimize survey"});
                }
                let child = execFile('node',[filePath, optimizeType == 'batch' ? 'batch' : 'date']);
                child.stdout.on("data", data=> {
                    console.log(data);
                    try {
                        let result = JSON.parse(data);
                        resolve({status: 200, body: result})
                    } catch (e) {
                        reject({status: 400, body: "Unable to parse data"});
                    }
                });
            }) 
        })               
    }
}

function getInstanceOfSurveyJoint(){
    return new SurveyJoint()
}
module.exports = getInstanceOfSurveyJoint()