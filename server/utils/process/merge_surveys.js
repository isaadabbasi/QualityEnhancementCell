
var 
    combined = [],
    fs = require('fs'),
    filedSurveys = fs.readFileSync(`${__dirname}/record`, 'utf8'),
    surveys = JSON.parse(filedSurveys),
    totalSurveys = surveys.length;
    // console.log( typeof surveys )
    // console.log(surveys);
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
    // console.log(combined)
    let result = JSON.stringify(combined);
    process.stdout.write(result);
