const 
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    identity = 'Teachers',
    
    surveyReference = new Schema({
        created: {
            type: Schema.Types.Date, default: Date.now
        },
        _reference: { 
            type: Schema.Types.ObjectId, ref: 'Surveys'
        }
    },{_id: false})

    teacherSchema = new Schema({
        fullname: {
            type: String, unique: true, maxlength: 40, trim: true
        },
        designation: {
            type: String, trim: true, maxlength: 40, trim: true
        },
        departments: [String],
        subjects: [String],
        surveys: [ surveyReference ]
    }, 
    {
        collection: identity
    }),
    teacherModel = mongoose.model(identity, teacherSchema);

module.exports = teacherModel;