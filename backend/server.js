import express from "express"
import pkg from "pg"
import cors from "cors"
import jwt from "jsonwebtoken"

const { Pool } = pkg

const app = express()
app.use(cors())
app.use(express.json())

// 🔥 BANCO
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
      descricao TEXT
    );
  `)

  console.log("Banco pronto 🚀")
}
initDB()

// 🔥 TESTE RAIZ (NUNCA MAIS DÁ NOT FOUND)
app.get("/", (req, res) => {
  res.send("SIJ backend rodando 🚀")
})

// LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.json({ error: "Preencha email e senha" })
  }

  const result = await pool.query(
    "SELECT * FROM users WHERE email=$1 AND password=$2",
    [email, password]
  )

  if (result.rows.length === 0) {
    return res.json({ error: "Usuário inválido" })
  }

  const token = jwt.sign({ id: result.rows[0].id }, process.env.JWT_SECRET)

  res.json({ token })
})

// REGISTER
app.post("/register", async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.json({ error: "Preencha tudo" })
  }

  try {
    await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2)",
      [email, password]
    )

    res.json({ ok: true })
  } catch (err) {
    res.json({ error: "Email já existe" })
  }
})

// CRIAR PROCESSO
app.post("/processos", async (req, res) => {
  const { titulo, descricao } = req.body

  if (!titulo || !descricao) {
    return res.json({ error: "Preencha tudo" })
  }

  await pool.query(
    "INSERT INTO processos (titulo, descricao) VALUES ($1, $2)",
    [titulo, descricao]
  )

  res.json({ ok: true })
})

// LISTAR PROCESSOS
app.get("/processos", async (req, res) => {
  const result = await pool.query("SELECT * FROM processos ORDER BY id DESC")
  res.json(result.rows)
})

// 🔥 PORTA DO RENDER
const PORT = process.env.PORT || 10000
app.listen(PORT, () => console.log("Servidor rodando 🚀"))
