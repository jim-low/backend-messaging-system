const usersWindow = document.getElementById("users");
const loggedInUserWindow = document.getElementById("logged-in-user");
const chatWindow = document.getElementById("chat-messages");
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-message-btn");
let targetUserId = 0

window.addEventListener('keydown', (e) => {
  if (e.key !== "Enter") return

  const userToken = localStorage.getItem('token')
  const message = messageInput.value

  if (userToken == null) {
    window.location.href = '/index.html'
  }

  socket.emit('send-message', userToken, targetUserId, message)
})

sendBtn.addEventListener('click', () => {
  const userToken = localStorage.getItem('token')
  const message = messageInput.value

  if (userToken == null) {
    window.location.href = '/index.html'
  }

  socket.emit('send-message', userToken, targetUserId, message)
})

displayUsersList()
displayLoggedInUser()
