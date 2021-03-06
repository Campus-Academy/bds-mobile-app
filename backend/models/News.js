var mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Model d'un News
 */
var newsSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    title: String,
    content: String,
    date: String,
    author: { type: Schema.Types.ObjectId, ref: "User" },
    modificationDate: String,
    modificationAuthor: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { versionKey: false, collection: "News" }
);

module.exports = mongoose.model("News", newsSchema);
