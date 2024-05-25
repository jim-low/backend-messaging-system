const socket = io('http://localhost:8000')

socket.on('connect', () => {
  console.log(`Connected with ID: ${socket.id}`)
})

function emitSendMessage(fromUser, toUser, message) {
  console.log(fromUser, toUser, message)
  socket.emit('send-message', fromUser, toUser, message)
}

socket.on('receive-message', message => {
  sendMessage("Joe Mudder", message)
})
