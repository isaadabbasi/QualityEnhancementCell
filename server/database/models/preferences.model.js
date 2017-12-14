const 
mongoose = require('mongoose'),
Schema = mongoose.Schema,

PreferencesModel = new Schema({
    season: { type: Boolean },
    // root: { type: Boolean, default: false },
    // password: { type: String },
}),
model = mongoose.model('preferences', PreferencesModel);

module.exports = model;
