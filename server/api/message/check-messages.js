const { query } = require("../../db.js")


async function getMessages(req, res) {
  const { userId } = req.params
  if (userId == null) {
    return res.status(400).send({ error: "missing required parameters" })
  }

  try {
    const results = await query(`
SELECT m.message, u.username AS to_user
  FROM messages m
  JOIN users u
  ON m.to_user_id = u.user_id
  WHERE m.from_user_id = ${userId};
`)

    if (results.rows.length <= 0) {
      return res.status(404).send({ message: "No records found" })
    }

    return res.status(200).send({ data: results.rows })
  }
  catch(err) {
    console.error(err);
    return res.status(503).send({ error: "Error occurred on server side" })
  }
}

exports.getMessages = getMessages
