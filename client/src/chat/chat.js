const usersWindow = document.getElementById("users-window");
const chatWindow = document.getElementById("chat-messages");
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-message-btn");

window.addEventListener('keydown', (e) => {
  if (e.key !== "Enter") return

  emitSendMessage(0, 0, messageInput.value)
})

sendBtn.addEventListener('click', () => {
  emitSendMessage(0, 0, messageInput.value)
})

displayUsersList()
