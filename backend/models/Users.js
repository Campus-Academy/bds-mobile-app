var mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Model d'un User
 */
var userSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    firstName: {
      type: String,
      maxlength: 255,
    },
    lastName: {
      type: String,
      maxlength: 255,
    },
    adress: String,
    birthday: String,
    gender: String,
    telephone: String,
    mail: {
      type: String,
      maxlength: 255,
      trim: true,
    },
    password: {
      type: String,
      maxlength: 255,
      trim: true,
    },
    promotion: String,
    role: String,
    sport: String,
  },
  { versionKey: false, collection: "User" }
);

module.exports = mongoose.model("User", userSchema);
