var mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Model d'un User
 */
var userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  firstName: {
    type: String,
    maxlength: 255,
    required: true
  },
  lastName: {
    type: String,
    maxlength: 255,
    required: true
  },
  birthday: String,
  mail: {
    type: String,
    maxlength: 255,
    trim: true,
    required: true
  },
  password: {
    type: String,
    maxlength: 255,
    trim: true,
    required: true
  },
  role : String,

}, { versionKey: false, collection: 'User' });

module.exports = mongoose.model('User', userSchema);
