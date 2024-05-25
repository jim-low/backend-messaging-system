require('dotenv').config()

const io = require('socket.io')(8000)
io.on('connection', socket => {
  console.log("New user has connected")

  socket.on('send-message', (fromUser, toUser, message) => {
    console.log(fromUser, toUser, message)
    io.emit('receive-message', message)
  })
})
