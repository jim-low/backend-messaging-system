const usersWindow = document.getElementById("users-window");
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

  emitSendMessage(userToken, targetUserId, message)
})

sendBtn.addEventListener('click', () => {
  const userToken = localStorage.getItem('token')
  const message = messageInput.value

  if (userToken == null) {
    window.location.href = '/index.html'
  }

  emitSendMessage(userToken, targetUserId, message)
})

displayUsersList()
