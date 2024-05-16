import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 8080

app.use(cors())

app.get('/', (req, res) => {
  console.log("nice, root endpoint has been created")
  res.status(200).json({ message: "fuck you" })
})

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`)
})
