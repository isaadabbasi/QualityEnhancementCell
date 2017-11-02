const   
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    identity = 'Surveys',
    survey = new Schema({
        id: Schema.Types.Mixed, 
        selection: String, 
        value: Schema.Types.Mixed,
        type: {type: String, default: 'direct'}
    }, {_id: false}),
    surveySchema = new Schema({
        created: { type: Schema.Types.Date, default: new Date().getTime() },
        teacher: { type: String, maxlength: 30, trim: true },
        course: { type: String, maxlength: 30, trim: true },
        evaluation: { type: String, maxlength: 30, trim: true },
        survey: [survey]

    },{collection: identity})
    model = mongoose.model(identity, surveySchema);

module.exports = model;