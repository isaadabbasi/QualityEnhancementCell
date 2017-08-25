const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema, 
    identity = 'Students',
    studentSchema = new Schema({
        fullname: {
            type: String, required: true, trim: true, maxlength: 40
        },
        department:{
            type: String, required: true, trim: true, maxlength: 40
        },
        rollnumber: {
            type: String, required: true, trim: true, maxlength: 40
        },
        created: {
            type: Schema.Types.Date, default: Date.now
        },
        password: {
            type: String, required: true
        }
    },{
        collection: identity
    }),
    model = mongoose.model(identity, studentSchema)

module.exports = model;