const 
mongoose = require('mongoose'),
Schema = mongoose.Schema,

PreferencesModel = new Schema({
    session: { type: Boolean, default: false }
}),
model = mongoose.model('preferences', PreferencesModel);

module.exports = model;
