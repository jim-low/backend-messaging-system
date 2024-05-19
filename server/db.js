import dotenv from 'dotenv'
import pg from "pg";

dotenv.config()
const { Pool } = pg

const pool = new Pool({
  user: "jim",
  password: process.env.DATABASE_PASSWORD,
  host: "localhost",
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE
})

const query = (text, params) => pool.query(text, params)

export {
  query
}
