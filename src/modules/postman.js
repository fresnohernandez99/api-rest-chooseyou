
function send(res, code, msg, box) {
    return res.status(200).json({
        code,
        msg,
        box
    })
}

function badRequest(res, motive) {
    return res.status(403).json({
        code: 403,
        msg: `Bad Request: ${motive}`
    })
}

function error(res, err) {
    return res.status(500).json({
        code: 500,
        msg: `Internal server error: ${err}`
    })
}


module.exports = {
    send,
    badRequest,
    error

}