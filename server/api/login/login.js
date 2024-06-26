const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { query } = require('../../db.js')
require('dotenv').config()

async function login(req, res) {
  const { loginType } = req.params;
  const { email, password } = req.body;

  if (!['normal', 'admin', 'super-admin'].includes(loginType)) {
    return res.status(418).send({ message: "invalid login type" })
  }

  const table = loginType === "super-admin" ? "super_admin" : loginType;

  try {
    const result = await query(`
SELECT u.user_id, username, email, password
  FROM ${table}_users n
  JOIN users u
  ON n.user_id = u.user_id
  AND u.email = '${email}';
`)

    if (result.rows.length <= 0) {
      return res.status(401).send({ message: "Unable to find user" })
    }

    const isSamePassword = await bcrypt.compare(password, result.rows[0].password)
    if (!isSamePassword) {
      return res.status(418).send({ message: "Incorrect credentials" })
    }

    // user credentials are verified
    const { user_id: userId, username: userName, email: userEmail } = result.rows[0]
    const user = {
      id: userId,
      username: userName,
      email: userEmail
    }
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN)
    res.status(200).send({ token: accessToken, username: userName })
  }
  catch(err) {
    console.log(err)
    res.status(503).send({ error: "How strange... There seems to be an error" })
  }
}

exports.login = login;
