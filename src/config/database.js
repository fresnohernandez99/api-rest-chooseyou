const mongoose = require("mongoose");
const config = require("./config");

function connect() {
  return mongoose.connect(
    config.dbhost,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true
    },
    () => {
      console.log("Connected to DB");
    }
  );
}

module.exports = { connect };
