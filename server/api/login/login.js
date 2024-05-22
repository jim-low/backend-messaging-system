import { query } from '../../db.js'

async function login(req, res) {
  const { loginType } = req.params;
  const { email, password } = req.body;

  if (!['normal', 'admin', 'super-admin'].includes(loginType)) {
    return res.status(418).send({ message: "invalid login type" })
  }

  const table = loginType === "super-admin" ? "super_admin" : loginType;

  try {
    const result = await query(`
SELECT u.user_id, username, email
  FROM ${table}_users n
  JOIN users u
  ON n.user_id = u.user_id
  AND u.email = '${email}'
  AND u.password = '${password}';
`)
    res.status(200).send({ data: result.rows })
  }
  catch(err) {
    console.log(err)
    res.status(503).send({ message: "How strange... There seems to be an error" })
  }
}

export {
  login
}
