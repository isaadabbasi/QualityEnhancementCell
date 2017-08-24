const  
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    // Schema got second arg 'collection' to be the name of schema in mongodb
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
        teachers: [
            {
                fullname: {
                    type: String, trim: true, maxlength: 40, unique: true
                },
                details: {
                    type: Schema.Types.ObjectId
                },
                ref: 'Teachers'
            }
        ]
    },
    {
        collection: 'department'
    }),
    model = mongoose.model('department', departmentSchema);

module.exports = model;