const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const OptionSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  questionId: {
    type: Schema.ObjectId,
    ref: "Question",
    required: true
  }
});

const Option = mongoose.model("Option", OptionSchema);
module.exports = Option;