import express from "express"
import pkg from "pg"
import cors from "cors"
import jwt from "jsonwebtoken"

const { Pool } = pkg

const app = express()
app.use(cors())
app.use(express.json())

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

// 🔥 CRIA TABELAS AUTOMATICAMENTE
async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE,
      password TEXT
    );
  `)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS processos (
      id SERIAL PRIMARY KEY,
      titulo TEXT,
      descricao TEXT,
      user_id INTEGER
    );
  `)

  console.log("Banco pronto 🚀")
}

initDB()

// LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body

  const user = await pool.query(
    "SELECT * FROM users WHERE email=$1 AND password=$2",
    [email, password]
  )

  if (user.rows.length === 0) {
    return res.json({ error: "Usuário não encontrado" })
  }

  const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET)

  res.json({ token })
})

// REGISTER
app.post("/register", async (req, res) => {
  const { email, password } = req.body

  try {
    await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2)",
      [email, password]
    )

    res.json({ ok: true })
  } catch (err) {
    res.json({ error: "Usuário já existe" })
  }
})

// CRIAR PROCESSO
app.post("/processos", async (req, res) => {
  const { titulo, descricao } = req.body

  await pool.query(
    "INSERT INTO processos (titulo, descricao) VALUES ($1, $2)",
    [titulo, descricao]
  )

  res.json({ ok: true })
})

// LISTAR
app.get("/processos", async (req, res) => {
  const result = await pool.query("SELECT * FROM processos")
  res.json(result.rows)
})

app.listen(10000, () => console.log("Servidor rodando 🚀"))
