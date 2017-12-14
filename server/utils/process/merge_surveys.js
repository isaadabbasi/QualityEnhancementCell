
var 
    combined = [],
    fs = require('fs'),
    filedSurveys = fs.readFileSync(`${__dirname}/record`, 'utf8'),
    surveys = JSON.parse(filedSurveys),
    totalSurveys = surveys.length,
    optimizeType =  process.argv[2];
    // console.log('optimize type: ', optimizeType);
    
    for(let survey of surveys) {
        let date = new Date(survey.created).toLocaleDateString(),
            matchFound = false;
            // console.log(date);
        survey.date = date;
        
        if(!combined.length){
            combined.push(survey);
        } else {
            for(let i=0; i<combined.length; i++){

                if( combined[i][optimizeType] === survey[optimizeType] ){
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
    // console.log('surveys :', combined);
    // console.log('amount of surveys :', combined.length);
    let result = JSON.stringify(combined);
    process.stdout.write(result);
