require('dotenv').config()

const io = require('socket.io')(8000)
io.on('connection', socket => {
  socket.on('send-message', (fromUser, toUser, message) => {
    io.emit('receive-message', message)
  })
})
