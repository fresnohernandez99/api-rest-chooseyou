const User = require('../models/user')
const Postman = require("../modules/postman")

async function login(req, res) {
    const box = req.body.box

    if (!box.user) {
        //create new user
        _createNeUser(box.facebookId, box.fullname)
            .then(result => {
                return Postman.send(res, 200, "Bienvenido", result)
            })
            .catch(err => Postman.error(res))
    } else {
        //send data from existing user
        return Postman.send(res, 200, "Bienvenido", box.user)
    }
}

async function _createNeUser(facebookId, fullname) {
    return await new User({ facebookId, fullname }).save()
}

module.exports = {
    login
}