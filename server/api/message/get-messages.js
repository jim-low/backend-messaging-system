require('dotenv').config()

const { verify: jwtVerify } = require("jsonwebtoken");
const { query } = require("../../db.js")

async function getMessages(req, res) {
  const { userId: targetUserId } = req.params;
  const token = req.headers['authorization']

  if (targetUserId == null || token == null) {
    return res.status(418).send({ error: "missing required parameters" })
  }

  const id = jwtVerify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.sendStatus(418);
    return user.id;
  })

  try {
    const result = await query(`
SELECT from_user_id, to_user_id, message
  FROM messages
  WHERE
(from_user_id = ${id} OR from_user_id = ${targetUserId})
AND
(to_user_id = ${id} OR to_user_id = ${targetUserId});
`)

    return res.status(200).send({ data: result.rows })
  }
  catch(err) {
    console.error(err)
    return res.status(503).send({ error: err })
  }
}

exports.getMessages = getMessages
