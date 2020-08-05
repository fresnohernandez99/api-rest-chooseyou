const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  facebookId: {
    type: String
  },
  role: {
    type: String,
    default: 'regular',
    enum: [
      'admin',
      'signature',
      'regular'
    ]
  }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
