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

module.exports = {
    createTrueOtions
}