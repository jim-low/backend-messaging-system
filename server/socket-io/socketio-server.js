const { joinRoom } = require('./join-room')
const { sendMessage } = require('./send-message')

require('dotenv').config()

const io = require('socket.io')(process.env.WEBSOCKET_PORT, {
  cors: {
    origin: ['http://127.0.0.1:8080']
  }
})

io.on('connection', socket => {
  console.log("New user connected")

  socket.on('send-message', (token, toUser, message) => {
    sendMessage(token, toUser, message, socket)
  })

  socket.on('join-room', room => {
    joinRoom(room, socket)
  })
})
