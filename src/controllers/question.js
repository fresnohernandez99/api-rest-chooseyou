const Question = require("../models/question")
const moment = require('moment')
const Postman = require("../modules/postman")

async function createQuestion(req, res, next) {
    const text = req.body.text
    const group = req.body.group
    const author = req.body.userId
    const quiz = req.body.quiz
    const options = req.body.options
    const createdDate = moment.now()

    if (!text || !group || options.length == 0) return Postman.badRequest(res)

    await new Question({ text, group, author, createdDate, quiz }).save()
        .then(result => {
            req.body.box = { question: result }
            return next()
        }).catch(err => Postman.error(res))
}

async function getQuestionPackageByGroup(req, res, next) {
    const group = req.body.group
    const quiz = req.body.quiz
    const lastNum = Number.parseInt(req.body.lastNum)

    if (!group) return Postman.badRequest(res)

    await Question.find({ group, quiz })
        .then(result => {
            var porcion
            if (result.length >= lastNum + 9) {
                //all the questions
                porcion = result.splice(lastNum, lastNum + 10)
            } else if (result.length > lastNum) {
                //questions but not 10
                porcion = result.splice(lastNum, result.length)
            } else {
                //no more questions
                return Postman.send(res, 200, "Empty result", {})
            }

            req.body.box = { questions: porcion }
            return next()
        }).catch(err => Postman.error(res))
}

async function getQuestionPackageCommunityByAuthor(req, res, next) {
    const group = "community"
    const author = req.body.author
    const lastNum = Number.parseInt(req.body.lastNum)

    if (!author) return Postman.badRequest(res)

    await Question.find({ group, author })
        .then(result => {
            var porcion
            if (result.length >= lastNum + 9) {
                //all the questions
                porcion = result.splice(lastNum, lastNum + 10)
            } else if (result.length > lastNum) {
                //questions but not 10
                porcion = result.splice(lastNum, result.length)
            } else {
                //no more questions
                return Postman.send(res, 200, "Empty result", {})
            }

            req.body.box = { questions: porcion }
            return next()
        }).catch(err => Postman.error(res))
}

module.exports = {
    createQuestion,
    getQuestionPackageByGroup,
    getQuestionPackageCommunityByAuthor
}