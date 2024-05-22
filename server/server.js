import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { whatisthis } from './api/whatisthis.js'
import { login } from './api/login/login.js'
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const loginRouter = express.Router();
app.use('/login', loginRouter)

app.get('/whatisthis', whatisthis)
app.post('/login/:loginType', login)

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server started at port: ${process.env.SERVER_PORT}`)
})
