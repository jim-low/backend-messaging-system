const express = require('express')
const cors = require('cors')
const { login } = require('./api/login/login.js')
const { whatisthis } = require('./api/whatisthis.js')
const { createUser, deleteUser, getUser, getUserList, updateUser } = require('./api/super-admin.js')
const { getMessages } = require('./api/message/get-messages.js')
const { authenticate } = require('./middlewares/authenticate.js')
const { io } = require('./socket-io/socketio-server.js') // enable WebSocket server
const { sendMessage } = require('./socket-io/send-message.js')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

app.get('/whatisthis', whatisthis)
app.post('/login/:loginType', login)

app.post('/super-admin/create-user/:userType', createUser)
app.get('/super-admin/get-user/:userId', getUser)
app.get('/super-admin/get-users', authenticate, getUserList)
app.post('/super-admin/update-user', updateUser)
app.post('/super-admin/delete-user', deleteUser)

app.get('/get-messages/:userId', getMessages)

// WebSocket stuff
io.on('connection', socket => {
  console.log("New user connected")
  socket.on('send-message', sendMessage)
})

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server started at port: ${process.env.SERVER_PORT}`)
})
