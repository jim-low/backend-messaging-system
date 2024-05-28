const express = require('express')
const cors = require('cors')
const { login } = require('./api/login/login.js')
const { whatisthis } = require('./api/whatisthis.js')
const { createUser, deleteUser, getUser, getUsersList, updateUser } = require('./api/super-admin.js')
const { getMessages } = require('./api/message/get-messages.js')
const { authenticate } = require('./middlewares/authenticate.js')
const { checkMessages } = require('./api/message/check-messages.js')
require('./socket-io/socketio-server.js')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

app.get('/whatisthis', whatisthis)
app.post('/login/:loginType', login)

app.post('/super-admin/create-user/:userType', authenticate, createUser)
app.get('/super-admin/get-user/:userId', authenticate, getUser)
app.get('/super-admin/get-users', authenticate, getUsersList)
app.post('/super-admin/update-user', authenticate, updateUser)
app.post('/super-admin/delete-user', authenticate, deleteUser)

app.get('/admin/check-messages/:userId', authenticate, checkMessages)

app.get('/get-messages/:userId', authenticate, getMessages)

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server started at port: ${process.env.SERVER_PORT}`)
})
