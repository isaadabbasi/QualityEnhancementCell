const
    SINGLE = 'SINGLE';

const 
    express = require('express'),
    router = express.Router(),
    json2csv = require('json2csv'),
    SurveyJoint = require('../joints/survey.joint'),
    {flatten} = require('lodash');
    

function transformIntoExcel(data){
    return csv;
}

function printById(req, res){
    let id = req.params && req.params.id;
    let query = req.query;
    console.log('checking params')
    if(id)
        SurveyJoint.getSurveyById(id)
            .then(result => {
                // let csv = transformIntoExcel(survey.body, SINGLE);
                var fields = ['Q.id',"Question", 'selected', 'score'];
                let survey = result.body.survey
                    .filter(sur => typeof sur.id === 'number')
                    .map(sur => ({
                    "Q.id":sur.id,
                    "selected": sur.selection,
                    "Question": sur.question,
                    "score": sur.value
                }));
        
        var csv = json2csv({ data: survey, fields: fields, unwindPath: 'score' });
        
        
        res.attachment('single-survey.xls');
        res.status(200).send(csv);
    })
    else 
        res.status(400).send('choose a record to get record for');
}

function makeTemplate(h1, h2){
    return `
    <div style="display: flex; width: 100%; flex: 1; justify-content: center; align-items: center; flex-direction: column;" >
    <img
    style="height: 200px;" 
    src="http://ihelpf9.com/wp-content/uploads/2014/10/Dawood-University-of-Engineering-and-Technology-Admissions-2014-15.jpg" />
    <h1 style="margin:2px;">${h1}</h1>
    <h3>${h2}</h3>  
    </div>
`
}
function makeFileName(params){
    let arr = [];
    for(let key in params){
        arr.push(params[key])
    }

    return arr.join('-');
}
function printByQuery(req, res){
    let query = req.query,
    params = {};
    console.log(query);
    // query.teacher && (params.teacehr)
    query.teacher && (params.teacher = query.teacher);
    query.batch && (params.studentBatch = query.batch);
    query.dept && (params.studentDept = query.dept);
    query.subject && (params.course = query.subject);

    if(! Object.keys(params).length ){
        const
            h1= "Sheet not generated!",
            h2 = "You must send some details to get sheet for...";
        res.status(400).send(makeTemplate(h1, h2));
        return;
    }
    console.log('params to check surveys for', params);
    SurveyJoint.getAllSurveys(params)
        .then(prores => {

            let counter = [],
                noOfSurveys = prores.body.length,
                body = prores.body
            .map(surveys => surveys.survey
            .filter(s=> typeof s.id === 'number')),
            flattenbody = flatten(body);
            console.log('body', body);
            
            if(!body.length){
                const
                    h1= "Sheet not generated!",
                    h2 = "No surveys found for provided dataset, please add surveys before generating report.";
                res.status(400).send(makeTemplate(h1, h2));
                return;
            }

            for (let question of flattenbody){
                if(!counter[question.id])
                    counter[question.id]={ 1:0, 2:0, 3:0, 4:0, 5:0, 'sum':0, 'average':0 };
                counter[question.id][question.value]++;
                counter[question.id]['sum']  += question.value;
            }
            counter.splice(0,1);
            flattenbody = null;
            // for(let counts of counter ){

            // }
            let lastSurvey = prores.body[prores.body.length-1],
            length = lastSurvey.survey.filter(s => typeof s === 'number').length;
            
            // .filter(sur => typeof sur === 'number');
            
            let fields = ['Q.id', 'Question', 'Strongly Disagree', 'Disagree', 'Uncertain', 'Agree', 'Strongly Agree', "Sum", "Average"],
            data = [];
            
            for(let i=0; i<counter.length; i++){
                counter[i].average = +(counter[i].sum/noOfSurveys).toFixed(3);
                data[i] = {
                    'Q.id': lastSurvey.survey[i].id || '',
                    "Question": lastSurvey.survey[i].question || '',
                    "Strongly Disagree": counter[i]['1'],
                    "Disagree": counter[i]['2'],
                    "Uncertain": counter[i]['3'],
                    "Agree": counter[i]['4'],
                    "Strongly Agree": counter[i]['5'],
                    "Sum": counter[i].sum,
                    "Average": counter[i].average
                }
            }
            
            // console.log(counter); 
            var csv = json2csv({ data, fields, unwindPath: 'score' });
            let filename = makeFileName(params);
            res.attachment(`${filename}.xls`);
            res.status(200).send(csv);
        })
        .catch(console.error)
}

router.get('/:id', printById);
router.get('/', printByQuery);

module.exports = router;