const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const RegistrySchema = new Schema({
  userId: {
    type: Schema.ObjectId,
    ref: "User",
    required: true
  },
  questionId: {
    type: Schema.ObjectId,
    ref: "Question",
    required: true
  },
  optionId: {
    type: Schema.ObjectId,
    ref: "Option",
    required: true
  }
});

const Registry = mongoose.model("Registry", RegistrySchema);
module.exports = Registry;