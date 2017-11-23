const 
    express = require('express'),
    router = express.Router(),
    teacherJoint = require('../joints/teachers.joint'),
    surveyJoint = require('../joints/survey.joint'),
    fs = require('fs'),
    join = require('path').join,
    through$ = require('through2'),

    getSurveyByIdCb = function(req, res, next){
        console.log(`gettings params.surveyId ${req.params._id}`);
        let 
            _id = req.params._id;

            surveyJoint.getSurveyById(_id)
                .then( prores => {
                    res.status(prores.status).send(prores.body);
                })
                .catch(err=>{
                    // console.log(err);
                    res.status(err.status).send(err.body);
                })
    },

    getSurveyByParams = (req, res) => {
        let 
            query = req.query,
            params = {};

        if(query.department)
            params.department = query.department;
        if(query.fullname)
            params.teacher = query.fullname;
        
        surveyJoint.getAllSurveys(params)
            .then( prores => {
                query.optimize ? 
                    surveyJoint.optimize(prores.body)
                        .then(opt => {res.status(200).send(opt.body)})
                        .catch(err=> { res.status(400).send(err.body) }) 
                    : 
                    prores.status === 302 ?
                        res.status(200).send(prores.body) : res.status(404).send("No Results Found")
            }).catch(err => {
                res.status(500).send("Internal Server Error");
            })
        console.log(params);
    },

    getSurveyByListCb = (req, res, next)=>{
        let {list: _list, optimize} = req.body;
        console.log('list: ', _list)
        // if the list is provided in array wrapped in string,
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
                optimize?
                    surveyJoint.optimize(prores.body)
                        .then(opt => {res.status(200).send(opt.body)})
                        .catch(err=> { res.status(400).send(err.body) })
                    :
                    res.status(prores.status).send(prores.body)
            })
            .catch(err => {
                if(err.status===404)
                    res.status(err.status).send(err.body)
                else 
                    console.log(err);
            })
    }, 

    addSurveyCb = (req, res, next) => {
        console.log('request body', req.body);
        let {
            course = null, teacher = null, evaluation = null,
            survey = null, batch: studentBatch = null, 
            studentId = null, dept: studentDept = null
        } = req.body,
        surveyModel = {
            evaluation, course, teacher, survey, 
            studentBatch, studentDept, studentId
        };
        
        // console.log(surveyModel);
        surveyJoint.saveSurvey(surveyModel)
            .then(result => {
                let body = result.body;
                // console.log(body)
                ~body.evaluation.indexOf('teacher') ?
                    teacherJoint.addSurveyReference(body)
                        .then( prores =>{
                            res.status(prores.status).send("Survey Added");
                        })
                        .catch( err => {
                            res.status(501).send(err.msg)
                        })
                :
                    res.status(201).send("Survey Added");
                })
            .catch(err=>{
                console.log(err)
                res.status(500).send(err.message);
            })
    },

    getTeacherEvaluationForm = (req, res)=> {
        // console.log(req.params)
        let 
            {name: form = null} = req.params,
            pathToForm = join(__dirname, '../','surveys',`${form}.json`),
            jsonify = through$({ objectMode: true }, function(chunk, enc = 'utf8', callback) {
                this.push(JSON.stringify(chunk))
                callback();
            });

        if(!form){
            res.status(400).send('You must specify form name');
            return;
        }
        fs
            .createReadStream(pathToForm)
            // .pipe(jsonify)
            .pipe(res);
    },
        
    testCb = (req, res) => {
        let testMethod = surveyJoint.test;
        surveyJoint.getAllSurveys({})
            .then(surveys => {
                surveyJoint.multiThreadsExecution(surveys.body)
                    .then(finalizedSurveys => {
                        res.status(200).send(finalizedSurveys.value);
                    })            
            })
    },

    testsync = (req, res) => {
        surveyJoint.getAllSurveys({})
        .then(surveys => {
            surveyJoint.optimize(surveys.body)
                .then(resolved => {
                    res.status(resolved.status).send(resolved.body);
                })
                .catch(error=> {
                    if(error.status == 400)
                        res.status(error.status).send(error.body);
                    else 
                        console.log(error.message);
                })
        })
    }
    
    
router.route('/')
    .get(getSurveyByParams)
    .post(getSurveyByListCb);

router.post('/add', addSurveyCb);
router.get('/id/:_id', getSurveyByIdCb);
router.get('/form/:name', getTeacherEvaluationForm);
router.get('/test', testCb);
router.get('/testopt', testsync);
module.exports = router;