import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import login from './api/login/login.js'
import { whatisthis } from './api/whatisthis.js'
import { createUser, getUser, getUserList, updateUser } from './api/super-admin.js'
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const loginRouter = express.Router();
app.use('/login', loginRouter)

app.get('/whatisthis', whatisthis)
app.post('/login/:loginType', login)

app.post('/super-admin/create-user', createUser)
app.get('/super-admin/get-user/:userId', getUser)
app.get('/super-admin/get-users', getUserList)
app.post('/super-admin/update-user', updateUser)

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server started at port: ${process.env.SERVER_PORT}`)
})
