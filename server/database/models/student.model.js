const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema, 
    identity = 'Students',
    rollnumberRegex = new RegExp("[D][-][0-9]{2}[-][(CS)|(ES)|(MM)|(CH)|(AR)|(IM)|(TE)|(PG)|(EE)]{2}[-][0-9]{2,3}", "i"),
    studentSchema = new Schema({
        fullname: {
            type: String, required: true, trim: true, maxlength: 40
        },
        department:{
            type: String, required: true, trim: true, maxlength: 40
        },
        rollnumber: {
            type: String, required: true, trim: true, maxlength: 40, unique: true, match: rollnumberRegex
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