const User = require('../models/user')
const md5 = require("md5")
const Postman = require("../modules/postman")

async function authForLogin(req, res, next) {
    var facebookId = req.body.facebookId

    if (!facebookId) Postman.badRequest(res, "No credential")

    facebookId = md5(facebookId)

    return await User.findOne({ facebookId })
        .then(result => {
            req.body.box = {
                facebookId,
                user: result
            }
            return next
        }).catch(err => Postman.error(res))
}

async function auth(req, res, next) {
    var facebookId = req.body.facebookId

    if (!facebookId) Postman.badRequest(res, "No credential")

    facebookId = md5(facebookId)

    return await User.findOne({ facebookId })
        .then(result => {
            if (!result) return Postman.badRequest(res, "Bad Credentials")

            req.body.userId = facebookId
            return next
        }).catch(err => Postman.error(res))
}

module.exports = {
    authForLogin,
    auth
}