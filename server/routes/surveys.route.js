const 
    express = require('express'),
    router = express.Router(),
    teacherJoint = require('../joints/teachers.joint'),
    surveyJoint = require('../joints/survey.joint'),
    getSurveyByIdCb = function(req, res, next){
        console.log(`gettings params.surveyId ${req.params._id}`);
        let 
            _id = req.params._id;

            surveyJoint.getSurveyById(_id)
                .then( prores => {
                    res.status(prores.status).send(prores.body);
                })
                .catch(err=>{
                    res.status(err.status).send(err.body);
                })
    },

    getSurveyByListCb = (req, res, next)=>{
        let _list = req.body.list;

        //if the list is provided in array wrapped in string,
        if(typeof req.body.list === 'string'){ // method to reconvert to simple array
            let list = req.body.list;
            list = list.replace('[','');
            list = list.replace(']','');
            list = list.split(',');
            _list = list;
        }
        //to remove all whitespaces in ids, if there are any.
        _list = _list.map(i => i.trim());
        
        surveyJoint.getSurveyList(_list)
            .then( prores => {
                res.status(prores.status).send(prores.body)
            })
            .catch(err => {
                res.status(err.status).send(err.body)
            })
    }, 

    addSurveyCb = (req, res, next) => {
        console.log('request body', req.body);
        let 
            evaluation = req.body.evaluation.trim(),
            target = req.body.target.trim(),
            survey = req.body.survey              
            
        let surveyModel = {
            evaluation, target, survey
        };
        surveyJoint.saveSurvey(surveyModel)
            .then(result => {
                console.log('what is result: ', result)
                if(result.body.evaluation === "teacher")
                    teacherJoint.addSurveyReference(result.body)
                        .then( res =>{
                            console.log(`${res.status}- Teacher ref update made, msg: ${res.msg}`);
                            res.status(res.status).send("Survey Added");
                        })
                        .catch( err => {
                            console.error(`${err.status}- Teacher ref update error, msg: ${err.msg}`);
                            res.status(err.status).send(err.msg)
                        })
                else 
                    res.status(200).send("Survey Added");
                })
            .catch(err=>{
                res.status(err.status).send(err.body);
            })
    }
    

router.get('/id/:_id', getSurveyByIdCb);
router.post('/list', getSurveyByListCb);
router.post('/add', addSurveyCb);

module.exports = router;