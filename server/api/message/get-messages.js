const { query } = require("../../db.js")

async function getMessages(req, res) {
  const { user1, user2 } = req.params
  if (user1 == null || user2 == null || [user1.length, user2.length].includes(0)) {
    return res.status(418).send({ error: "missing required parameters" })
  }

  try {
    const result = await query(`
SELECT from_user_id, to_user_id, message
  FROM messages
  WHERE
(from_user_id = ${user1} OR from_user_id = ${user2})
AND
(to_user_id = ${user1} OR to_user_id = ${user2});
`)

    res.status(200).send({ data: result.rows })
  }
  catch(err) {
    console.error(err)
    res.status(503).send({ error: err })
  }

  res.sendStatus(200)
}

exports.getMessages = getMessages
