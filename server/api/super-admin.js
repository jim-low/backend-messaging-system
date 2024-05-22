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

function getUser(req, res) { }

function updateUser(req, res) { }

function deleteUser(req, res) { }

export {
  createUser,
  getUser,
  updateUser,
  deleteUser,
}
