import express from 'express'
import cors from 'cors'
import { query } from './db.js'
import dotenv from 'dotenv'
import { whatisthis } from './api/whatisthis.js'
import { sendMessage } from './api/message/send-message.js'
import { login } from './api/login/login.js'
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.get('/whatisthis', whatisthis)
app.post('/send-message', sendMessage)
app.post('/login', login)

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server started at port: ${process.env.SERVER_PORT}`)
})
