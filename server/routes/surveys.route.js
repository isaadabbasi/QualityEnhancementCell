const 
    express = require('express'),
    router = express.Router(),
    Surveys = require('../db_models/models/survey.model'),
    Users = require('../db_models/models/student.model'),
    
    getSurveyByIdCb = function(req, res, next){
        console.log(`gettings params.surveyId ${req.params.surveyId}`);
        let 
            surveyId = req.params.surveyId,
            findByIdCb = (err, result)=>{
                if(err)
                    throw new Error(err);
                
                if(!err)
                    result ?
                        res.status(200).send(result) : res.status(404).send('Unable to find records for desired data');
            }
        
        Surveys.findById(surveyId, findByIdCb);
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
        
        let 
            list = _list,
            findCb = (err, results)=>{
                if(err)
                    throw new Error(err);
                
                if(!err)
                    results ? 
                        res.status(200).send(results) : res.status(404).send('Unable to find records for desired data');
            }

        Users.find({_id: {$in: list}}, findCb);
    }
    



router.get('/id/:surveyId', getSurveyByIdCb);
router.post('/list', getSurveyByListCb);

module.exports = router;