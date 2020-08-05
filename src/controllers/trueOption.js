const TrueOption = require("../models/trueOption")
const Postman = require("../modules/postman")

async function createTrueOtions(req, res) {
    const question = req.body.box.question
    const optionId = req.body.box.correctOptionId
    const options = req.body.box.options

    await new TrueOption({
        optionId,
        questionId: question.id
    }).save().then(result => {

        var response = {
            question,
            options,
            trueOption: optionId
        }
        Postman.send(res, 200, "Question Saved", response)
    }).catch(err => Postman.error(res))
}

async function getTrueOption(req, res) {
    const questions = req.body.box.questions
    const quiz = req.body.quiz

    if (!quiz) {
        //this is a group of not quizzes
        return Postman.send(res, 200, "Questions", questions)
    }

    var groups = []
    var error
    for await (obj of questions) {
        var trueOption = await TrueOption.findOne({ questionId: obj.question._id })
            .catch(err => error = true)

        var newGroup = {
            question: obj.question,
            options: obj.options,
            trueOption
        }

        groups.push(newGroup)
    }

    if (error == true) return Postman.error(res)

    Postman.send(res, 200, "Quizzes", groups)
}

module.exports = {
    createTrueOtions,
    getTrueOption
}