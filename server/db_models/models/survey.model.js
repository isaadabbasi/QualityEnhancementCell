const   
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    identity = 'Surveys',
    survey = {
        id: Number, 
        selection: String, 
        value: Number,
        type: String
    },
    surveySchema = new Schema({
        created: { type: Schema.Types.ObjectId, default: Date.now },
        evaluation: { type: String, maxlength: 30, trim: true },
        target: { type: String, maxlength: 30, trim: true },
        survey: [survey],

    },{collection: identity})
    model = mongoose.model(identity, surveySchema);

module.exports = model;