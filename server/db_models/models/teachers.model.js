const 
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    identity = 'Teachers',
    
    surveyReference = {
        dated: {
            type: Schema.Types.Date, default: Date.now
        },
        details: { 
            type: Schema.Types.ObjectId
        },
        ref: 'Surveys'
    },

    teacherSchema = new Schema({
        fullname: {
            type: String, unique: true, maxlength: 40, trim: true
        },
        designation: {
            type: String, trim: true, maxlength: 40
        },
        departments: [String],
        subjects: [String],
        survey: [ surveyReference ]
    }, 
    {
        collection: identity
    }),
    teacherModel = mongoose.model(identity, teacherSchema);

module.exports = model;