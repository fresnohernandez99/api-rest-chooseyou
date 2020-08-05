module.exports = async (http) => {
    var io = require('socket.io')(http)

    io.on('connection', function (socket) {
        console.log("User " + socket.id + " connected")

        //recievedData
        socket.on("actualQuestion", async (data) => {
            
        })

        //response question function
        socket.on("responseQuestion", async (data) => {
            
        })

        //sync question list community
        socket.on("syncQuestions", async (data) => {
            
        })

        socket.on('disconnect', () => {
            console.log('User ' + socket.id + ' disconnected')
        })
    })

}