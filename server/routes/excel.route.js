const
    SINGLE = 'SINGLE';

const 
    express = require('express'),
    router = express.Router(),
    json2csv = require('json2csv'),
    SurveyJoint = require('../joints/survey.joint');

function transformIntoExcel(data){
    var fields = ['Q.id', 'selected', 'score'];
    let survey = data.survey
        .filter(sur => typeof sur.id === 'number')
        .map(sur => ({
        "Q.id":sur.id,
        "selected": sur.selection,
        "score": sur.value
    }));
    
    var csv = json2csv({ data: survey, fields: fields, unwindPath: 'score' });
    return csv;
}

function printById(req, res){
    let id = req.params && req.params.id;
    let query = req.query;
    console.log('checking params')
    if(id)
        SurveyJoint.getSurveyById(id)
            .then(survey => {
                let csv = transformIntoExcel(survey.body, SINGLE);
                res.attachment('survey.xls');
                res.status(200).send(csv);
            })
    else 
        res.status(400).send('choose a record to get record for');
}

function printByQuery(req, res){
    let query = req.query,
        params = {};

    query.fullname && (params.fullname = query.fullname);

    // if(! Object.keys(params).length){
    //     res.status(400).send('Must send some details to get record for...');
    //     return;
    // }
    SurveyJoint.getAllSurveys(query)
        .then(prores => {
            let counter = [];
            let body = prores.body
            .map(surveys => surveys.survey
                .filter(s=> typeof s.id === 'number'));
                
            for (let i=0; i<body.length; i++){
                counter.push({ 1:0, 2:0, 3:0, 4:0, 5:0 })
                for(let j=0; j<body[i].length; j++)
                    counter[i][body[i][j].value]++;
            }
            console.log(counter);
            res.status(prores.status).send(body);    
        })
        .catch(console.error)
}

router.get('/:id', printById);
router.get('/', printByQuery);

module.exports = router;