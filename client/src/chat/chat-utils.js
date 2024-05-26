/**
 * Message template to display onto the screen
 * @param {string} username
 * @param {string} message
 */
const MessageTemplate = (message, selfSent) => {
  const p = document.createElement("p")

  const messageSpan = document.createElement("span")
  messageSpan.innerText = `${message}`

  p.appendChild(messageSpan)

  const chatMessage = document.createElement("div")
  chatMessage.classList.add("message")
  if (selfSent) chatMessage.classList.add("self-sent")
  chatMessage.appendChild(p)

  return chatMessage
}

/**
 * User template to display user chat list
 * @param {string} username
 */
const UserTemplate = (username) => {
  const li = document.createElement("li")
  li.classList.add("user")
  li.innerText = username.trim()

  return li
}

function displayLoggedInUser() {
  const username = localStorage.getItem('username')
  if (username == null) {
    window.location.href = "/index.html"
    return
  }

  const p = document.createElement('p')
  p.innerText = username

  loggedInUserWindow.appendChild(p)
}

async function displayUsersList() {
  const response = await fetch('http://localhost:5000/super-admin/get-users', {
    headers: {
      'authorization': localStorage.getItem("token")
    }
  })
  const results = await response.json()
  setupUsersClick(results.data)
}

function setupUsersClick(results) {
  results.forEach(data => {
    const userTemplate = UserTemplate(data.username)
    usersWindow.appendChild(userTemplate)
    userTemplate.addEventListener('click', () => {
      // reset click styling
      document.querySelectorAll('.user').forEach(user2 => user2.classList.remove("active"))
      userTemplate.classList.add("active")

      targetUserId = data.user_id

      // join room
      const room = getRoomName(localStorage.getItem('username'), data.username)
      socket.emit("join-room", room)

      // load user messages
      loadUserChat(data.user_id)
    })
  })
}

async function loadUserChat(selectedUser) {
  if (localStorage.getItem("token") == null) {
    window.location.href = "/index.html"
    return
  }

  const response = await fetch(`http://localhost:5000/get-messages/${selectedUser}`, {
    headers: {
      'authorization': localStorage.getItem("token")
    }
  })
  const results = await response.json()
  chatWindow.innerHTML = ""
  results.data.forEach(data => {
    sendMessage(data.message, data.self_sent)
  })
}

function sendMessage(message, selfSent) {
  if (message.length === 0) return

  const chatMessage = MessageTemplate(message, selfSent)
  chatWindow.appendChild(chatMessage)
  messageInput.value = ""
}

function getRoomName(username1, username2) {
  const first = username1.split(" ")[0]
  const second = username2.split(" ")[0]
  const final = [first, second].sort()
  return final.join("-")
}
