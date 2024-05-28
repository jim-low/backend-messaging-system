require('dotenv').config()
const { query } = require("../../db.js")

async function getChatMessages(req, res) {
  const { userId: targetUserId } = req.params;
  const { id } = req.user

  if (targetUserId == null) {
    return res.status(418).send({ error: "missing required parameters" })
  }

  try {
    const result = await query(`
SELECT from_user_id, to_user_id, message,
  CASE
    WHEN from_user_id = ${id} THEN TRUE
    ELSE FALSE
  END AS self_sent
  FROM messages
  WHERE
(from_user_id = ${id} OR from_user_id = ${targetUserId})
AND
(to_user_id = ${id} OR to_user_id = ${targetUserId})
ORDER BY message_id ASC;
`)

    return res.status(200).send({ data: result.rows })
  }
  catch(err) {
    console.error(err)
    return res.status(503).send({ error: err })
  }
}

exports.getChatMessages = getChatMessages
