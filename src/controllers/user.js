const User = require('../models/user')
const Postman = require("../modules/postman")

async function login(req, res) {
    const box = req.body.box

    if (!box.user) {
        //create new user
        _createNeUser(box.facebookId)
            .then(result => {
                return Postman.send(res, 200, "Bienvenido", { user: result })
            })
            .catch(err => Postman.error(res))
    } else {
        //send data from existing user
        return Postman.send(res, 200, "Bienvenido", { user: box.user })
    }
}

async function _createNeUser(facebookId) {
    return await new User({ facebookId }).save()
}

module.exports = {
    login
}