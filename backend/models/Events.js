var mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Model d'un event
 */
var eventsSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    title: String,
    description: String,
    capacity: String,
    place: String,
    date: String,
    price: String,
    modality: String,
    creationDate: String,
    author: Schema.Types.ObjectId,
  },
  { versionKey: false, collection: "Events" }
);

module.exports = mongoose.model("Events", eventsSchema);
