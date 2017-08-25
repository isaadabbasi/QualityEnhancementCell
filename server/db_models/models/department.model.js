const  
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    // Schema got second arg 'collection' to be the name of schema in mongodb
    teacherRef = {
        fullname: {
            type: String, trim: true, maxlength: 40, unique: true
        },
        details: {
            type: Schema.Types.ObjectId,
            ref: 'Teachers'
        },
    },
    departmentSchema = new Schema({ 
        dept_name: {
            type: String, 
            trim: true, 
            required: true, 
            maxlength: 40,
            unique: true
        },
        faculty_size: {
            type: Number
        },
        teachers: [teacherRef]
    },
    {
        collection: 'departments'
    }),
    model = mongoose.model('departments', departmentSchema);

module.exports = model;