const Option = require("../models/option")
const Postman = require("../modules/postman")
const question = require("./question")

async function createOptions(req, res, next) {
    const options = req.body.options
    const question = req.body.box.question
    const quiz = req.body.quiz
    const trueOptionPosition = Number.parseInt(req.body.trueOptionPosition)

    //selection of type of question 
    if (!quiz) _createNotQuizOptions(res, options, question)
    else _createQuizOptions(res, req, next, options, question, trueOptionPosition)
}

async function _createNotQuizOptions(res, options, question) {
    var error = false
    var optionsSaved = []

    for await (option of options) {
        //saving each one of the options
        await new Option({ text: option, questionId: question._id }).save()
            .then(result => optionsSaved.push(result))
            .catch(err => error = true)
    }
    if (error == true) return Postman.error(res)

    var response = {
        question,
        options: optionsSaved
    }

    Postman.send(res, 200, "Question Saved", response)
}

async function _createQuizOptions(res, req, next, options, question, trueOptionPosition) {
    var cont = 1
    var optionsSaved = []
    var correctOptionId
    var error = false
    for await (option of options) {
        //saving each one of the options
        //check the position that the true option comes to the server starter for 1
        //and saving its result _id to use it on quiz realation
        await new Option({ text: option, questionId: question._id }).save()
            .then(result => {
                if (cont == trueOptionPosition) correctOptionId = result._id
                optionsSaved.push(result)
            }).catch(err => error = true)
        cont += 1
    }
    
    if (error == true) return Postman.error(res)

    req.body.box.options = optionsSaved
    req.body.box.correctOptionId = correctOptionId
    return next()
}

async function getOptions(req, res, next) {
    const questions = req.body.box.questions

    var groups = []
    var error
    for await (obj of questions) {
        var options = await Option.find({ questionId: obj._id })
            .catch(err => error = true)

        var group = {
            question: obj,
            options,
            trueOption: 0
        }

        groups.push(group)
    }

    if (error == true) return Postman.error(res)

    req.body.box = { questions: groups }
    return next()
}

module.exports = {
    createOptions,
    getOptions
}