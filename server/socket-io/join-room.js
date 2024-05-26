const { socket } = require("./socketio-server")

function joinRoom(room, socket) {
  socket.join(room)
}

exports.joinRoom = joinRoom
