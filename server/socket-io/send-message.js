const jwt = require('jsonwebtoken')
const { query } = require('../db');
const { io } = require('./socketio-server');

async function sendMessage(token, toUser, message) {
  if (token.length === 0 || toUser === 0 || message.length === 0) {
    console.error("How strange... you must have fucked up");
    return;
  }

  const user = jwt.decode(token, process.env.ACCESS_TOKEN)
  if (user == null) {
    console.error("How strange... you must have fucked up... again...");
    return;
  }

  await query(`INSERT INTO messages(from_user_id, to_user_id, message) VALUES (${user.id}, ${toUser}, '${message}');`)

  io.emit('receive-message', message, toUser);
}

exports.sendMessage = sendMessage;
