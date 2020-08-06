const express = require("express");
const Router = express.Router();

const userCtr = require("../controllers/user")
const questionCtr = require("../controllers/question")
const optionCtr = require("../controllers/option")
const trueOption = require("../controllers/trueOption")

const middleware = require("../middleware")

Router
  .get("/", (req, res) => {
    res.status(200).json({
      code: 200,
      msg: "Web service for Choose You app"
    });
  })

  .get("/terms-service", (req, res) => {
    res.status(200).json({
      code: 200,
      msg: "Terms of service"
    });
  })

  .get("/privacy-policy", (req, res) => {
    res.status(200).json({
      code: 200,
      msg: "Privacy and Policy"
    });
  })

  .post("/login", middleware.authForLogin, userCtr.login)

  //questions
  .post("/create-question",/* middleware.auth,*/ questionCtr.createQuestion, optionCtr.createOptions, trueOption.createTrueOtions)
  .get("/get-questions-group/:group/:lastNum/:quiz", questionCtr.getQuestionPackageByGroup, optionCtr.getOptions)
  .post("/get-questions-community", questionCtr.getQuestionPackageCommunityByAuthor, optionCtr.getOptions)

module.exports = Router;
