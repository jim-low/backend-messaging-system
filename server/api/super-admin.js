const bcrypt = require('bcryptjs')
const { query } = require("../db.js");

async function createUser(req, res) {
  const { userType } = req.params;
  const { username, password, email } = req.body;
  if (userType == null) {
    return res.status(418)
  }

  if (username.length === 0 || password.length === 0 || email.length === 0) {
    return res.status(418).send({ message: "Required input missing!" })
  }

  try {
    const saltRounds = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    await query(`
INSERT INTO users(username, password, email)
VALUES ('${username}', '${hashedPassword}', '${email}');
`)

    await query(`
INSERT INTO ${userType}_users(user_id)
VALUES ((SELECT user_id FROM users WHERE username = '${username}'));
`)

    return res.status(200).send({ message: "User added successfully" })
  }
  catch(err) {
    console.error(err)
    return res.status(418).send({ message: "[ERROR] Trouble adding new user" })
  }
}

async function getUsersList(req, res) {
  const user = req.user

  try {
    const result = await query(`
SELECT DISTINCT u.user_id, u.username, u.email, 'normal' AS role FROM normal_users n JOIN users u ON u.user_id = n.user_id AND u.user_id != ${user.id}
  UNION ALL
  SELECT DISTINCT u.user_id, u.username, u.email, 'admin' AS role FROM admin_users a JOIN users u ON u.user_id = a.user_id AND u.user_id != ${user.id}
  UNION ALL
  SELECT DISTINCT u.user_id, u.username, u.email, 'super-admin' AS role FROM super_admin_users a JOIN users u ON u.user_id = a.user_id AND u.user_id != ${user.id}
  ORDER BY user_id ASC;
`)
    return res.status(200).send({ data: result.rows })
  }
  catch(err) {
    console.error(err)
    return res.status(503).send({ error: err })
  }
}

async function getUser(req, res) {
  const { userId } = req.params;

  if (userId == null) {
    return res.status(418).send({ message: "missing parameters" })
  }

  try {
    const result = await query(`
SELECT DISTINCT u.user_id, u.username, u.email, 'normal' AS role FROM normal_users n JOIN users u ON u.user_id = n.user_id AND u.user_id = ${userId}
  UNION ALL
  SELECT DISTINCT u.user_id, u.username, u.email, 'admin' AS role FROM admin_users a JOIN users u ON a.user_id = u.user_id AND u.user_id = ${userId};
`)

    if (result.rows.length === 0) {
      return res.status(418).send({ message: "No records found" })
    }

    return res.status(200).send({ data: result.rows[0] })
  }
  catch(err) {
    console.error(err);
    return res.status(503).send({ error: err });
  }
}

async function updateUser(req, res) {
  const { userId, newUsername, newEmail } = req.body;

  if (userId == null || newUsername == null || newEmail == null || newUsername.length === 0 || newEmail === 0) {
    return res.status(418).send({ message: "Missing required information." })
  }

  try {
    const result = await query(`
UPDATE users
  SET
  username = '${newUsername}',
  email = '${newEmail}'
  WHERE user_id = ${userId};
`)

    if (result.rowCount === 0) {
      return res.status(418).send({ message: "No records found" })
    }

    return res.status(200).send({ message: "Successfully updated record." })
  }
  catch(err) {
    console.error(err)
    return res.status(503).send({ message: "Error on server side." })
  }
}

async function deleteUser(req, res) {
  const { userId, accountType } = req.body;
  if (userId == null || accountType == null) {
    return res.status(418).send({ message: "Missing required parameters" })
  }

  if (accountType !== 'normal' && accountType !== 'admin') {
    return res.status(418).send({ message: "Error: invalid parameters" })
  }

  try {
    await query(`
DELETE FROM ${accountType}_users
  WHERE user_id = ${userId};
`)

    await query(`
DELETE FROM users
  WHERE user_id = ${userId};
`)

    return res.status(200).send({ message: "User deleted successfully" })
  }
  catch(err) {
    console.error(err)
    return res.status(503).send({ message: "Error deleting user" })
  }
}

exports.createUser = createUser;
exports.getUsersList = getUsersList;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
