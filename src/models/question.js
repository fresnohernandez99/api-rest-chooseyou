const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  group: {
    type: String,
    enum: [
      'music',
      'bio',
      'movies',
      'pics',
      'sports',
      'geo',
      'tec',
      'games',
      'community'
    ]
  },
  author: {
    type: String,
    required: true,
  },
  quiz: {
    type: Boolean,
    default: false
  },
  createdDate: {
    type: Number
  }
});

const Question = mongoose.model("Question", QuestionSchema);
module.exports = Question;