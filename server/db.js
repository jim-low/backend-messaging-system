require('dotenv').config()

const pg = require("pg");
const { Pool } = pg

const pool = new Pool({
  user: "jim",
  password: process.env.DATABASE_PASSWORD,
  host: "localhost",
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE
})

const query = (text, params) => pool.query(text, params)

exports.query = query
