import { query } from "../db.js";

async function createUser(req, res) {
  const { username, password, email } = req.body;
  if (username.length === 0 || password.length === 0 || email.length === 0) {
    return res.status(418).send({ message: "Required input missing!" })
  }

  try {
    await query(`
INSERT INTO test_users(username, password, email)
VALUES ('${username}', '${password}', '${email}');
`)
    return res.status(200).send({ message: "User added successfully" })
  }
  catch(err) {
    console.error(err)
    return res.status(418).send({ message: "[ERROR] Trouble adding new user" })
  }
}

async function getUserList(req, res) {
  try {
    const result = await query(`
SELECT user_id, username
  FROM users
  WHERE user_id NOT IN (SELECT user_id FROM super_admin_users)
ORDER BY user_id ASC;
`)
    return res.status(200).send({ data: result.rows })
  }
  catch(err) {
    console.error(err)
    return res.status(503).send({ message: "server made an oopsie >w<" })
  }
}

async function getUser(req, res) {
  const { userId } = req.params;

  if (userId == null) {
    return res.status(418).send({ message: "missing parameters" })
  }

  try {
    const result = await query(`
SELECT DISTINCT u.user_id, u.username, u.email
  FROM normal_users n, admin_users a, users u
  WHERE u.user_id NOT IN (SELECT user_id FROM super_admin_users)
AND u.user_id = ${userId};
`)

    if (result.rows.length === 0) {
      return res.status(418).send({ message: "No records found" })
    }

    return res.status(200).send({ data: result.rows })
  }
  catch(err) {
    console.error(err);
    return res.status(503).send({ message: "server made an oopsie >w<" });
  }
}

function updateUser(req, res) { }

function deleteUser(req, res) { }

export {
  createUser,
  getUserList,
  getUser,
  updateUser,
  deleteUser,
}
