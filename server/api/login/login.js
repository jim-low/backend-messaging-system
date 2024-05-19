import { query } from '../../db.js'

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const result = await query(`
SELECT u.user_id, username, email
  FROM super_admin_users s
  JOIN users u
  ON s.user_id = u.user_id
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
