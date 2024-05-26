function joinRoom(room, socket) {
  socket.join(room)
  console.log(`${socket.id} joined room ${room}`)
}

exports.joinRoom = joinRoom
