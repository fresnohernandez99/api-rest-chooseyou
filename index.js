const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var http = require('http').Server(app)
const cors = require("cors");
const config = require("./src/config/config");

const database = require("./src/config/database");

const Routes = require("./src/routes");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.use("/", Routes);

require('./src/socket')(http)

database.connect().then(() => {
  http.listen(config.port, function () {
    console.log(`App running on port: `+ config.port);
  });
});

