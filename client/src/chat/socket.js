const socket = io('http://localhost:8000')

socket.on('connect', () => {
  console.log(`Connected with ID: ${socket.id}`)
})

socket.on('receive-message', (message, sentId) => {
  sendMessage(message, sentId === targetUserId)
})
