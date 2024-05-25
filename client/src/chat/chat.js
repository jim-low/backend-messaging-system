/**
 * Message template to display onto the screen
 * @param {string} username
 * @param {string} message
 */
const MessageTemplate = (username, message) => {
  const p = document.createElement("p")

  const usernameSpan = document.createElement("span")
  usernameSpan.classList.add("username")
  usernameSpan.innerText = `${username}: `

  const messageSpan = document.createElement("span")
  messageSpan.innerText = `${message}`

  p.appendChild(usernameSpan)
  p.appendChild(messageSpan)

  const chatMessage = document.createElement("div")
  chatMessage.classList.add("message")
  chatMessage.appendChild(p)

  return chatMessage
}

const UserTemplate = (username) => {
  const li = document.createElement("li")
  li.classList.add("user")
  li.innerText = username.trim()

  return li
}

const usersWindow = document.getElementById("users-window");
const chatWindow = document.getElementById("chat-messages");
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-message-btn");

(async() => {
  const response = await fetch('http://localhost:5000/super-admin/get-users')
  const results = await response.json()

  results.data.forEach(data => {
    const userTemplate = UserTemplate(data.username)
    usersWindow.appendChild(userTemplate)
  })
  setupUsersClick()
})()

function setupUsersClick() {
  const users = document.querySelectorAll(".user")
  users.forEach(user => {
    user.addEventListener('click', () => {
      users.forEach(user2 => user2.classList.remove("active"))
      user.classList.add("active")
    })
  })
}

function sendMessage(username, message) {
  if (message.length === 0) return

  const chatMessage = MessageTemplate(username, message)
  chatWindow.appendChild(chatMessage)
  messageInput.value = ""
}

window.addEventListener('keydown', (e) => {
  if (e.key !== "Enter") return

  sendMessage("John Cena", messageInput.value)
})

sendBtn.addEventListener('click', () => {
  sendMessage("John Cena", messageInput.value)
})
