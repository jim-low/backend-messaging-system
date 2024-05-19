import express from 'express'
import cors from 'cors'
import { query } from './db.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(cors())

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server started at port: ${process.env.SERVER_PORT}`)
})
