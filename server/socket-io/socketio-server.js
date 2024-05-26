require('dotenv').config()

const io = require('socket.io')(process.env.WEBSOCKET_PORT, {
  cors: {
    origin: ['http://127.0.0.1:8080']
  }
})

exports.io = io
