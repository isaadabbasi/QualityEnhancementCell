const 
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    AdminModel = new Schema({
        email: { type: String, trim: true },
        root: { type: Boolean, default: false },
        password: { type: String },
        created: { type: Schema.Types.Date, default: Date.now() }
    }),
    model = mongoose.model('admin', AdminModel);

module.exports = model;
