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
    

    // Array.of(data.survey.)

    // var myCars = [
    //     {
    //         "carModel": "Audi",
    //         "selected": '0',
    //         "score": ["blue","green","yellow"]
    //     }, {
    //         "carModel": "BMW",
    //         "selected": '15000',
    //         "score": ["red","blue"]
    //     }, {
    //         "carModel": "Mercedes",
    //         "selected": '20000',
    //         "score": "yellow"
    //     }, {
    //         "carModel": "Porsche",
    //         "selected": '30000',
    //         "score": ["green","teal","aqua"]
    //     }
    // ];
    console.log(data.survey);
    var csv = json2csv({ data: survey, fields: fields, unwindPath: 'score' });
    return csv;
}

function printById(req, res){
    let id = req.params.id;
    SurveyJoint.getSurveyById(id)
        .then(survey => {
            let csv = transformIntoExcel(survey.body, SINGLE);
            res.attachment('survey.xls');
            res.status(200).send(csv);
        })
}

router.get('/:id', printById);

module.exports = router;