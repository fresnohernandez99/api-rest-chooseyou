const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const TrueOptionSchema = new Schema({
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

const TrueOption = mongoose.model("TrueOption", TrueOptionSchema);
module.exports = TrueOption;