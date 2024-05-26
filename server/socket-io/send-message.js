const jwt = require('jsonwebtoken')
const { query } = require('../db');

async function sendMessage(token, toUser, message, room, socket) {
  if (token.length === 0 || toUser === 0 || message.length === 0) {
    console.error("Missing required parameters: send-message.js");
    return;
  }

  const user = jwt.decode(token, process.env.ACCESS_TOKEN)
  if (user == null) {
    console.error("User is not authenticated");
    return;
  }

  await query(`INSERT INTO messages(from_user_id, to_user_id, message) VALUES (${user.id}, ${toUser}, '${message}');`)

  console.log(socket.id + " is sending message to room: " + room)
  console.log(socket)

  socket.to(room).emit('receive-message', message, toUser);
}

exports.sendMessage = sendMessage;
