function sendMessage(req, res) {
  const { message } = req.body
  if (message.length === 0) {
    res.status(401).send({ message: "No message received..." })
  }

  res.status(200).send({ message: `message received: ${message}` })
}

export {
  sendMessage
}
