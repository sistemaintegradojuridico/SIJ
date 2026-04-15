const express = require("express")
const cors = require("cors")
const { Pool } = require("pg")

const app = express()
app.use(cors())
app.use(express.json())

// CONEXÃO COM BANCO
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

// CRIAR TABELAS AUTOMATICAMENTE
async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
  `)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS processos (
      id SERIAL PRIMARY KEY,
      titulo TEXT NOT NULL,
      descricao TEXT,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `)

  console.log("Banco pronto 🚀")
}

initDB()

// ========================
// ROTAS
// ========================

// TESTE
app.get("/", (req, res) => {
  res.send("SIJ backend rodando 🚀")
})

// CADASTRO
app.post("/register", async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.json({ error: "Preencha email e senha" })
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

// LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body

  const result = await pool.query(
    "SELECT * FROM users WHERE email=$1 AND password=$2",
    [email, password]
  )

  if (result.rows.length === 0) {
    return res.json({ error: "Login inválido" })
  }

  res.json({ ok: true, user: result.rows[0] })
})

// CRIAR PROCESSO
app.post("/processos", async (req, res) => {
  const { titulo, descricao, user_id } = req.body

  if (!titulo) {
    return res.json({ error: "Título obrigatório" })
  }

  await pool.query(
    "INSERT INTO processos (titulo, descricao, user_id) VALUES ($1,$2,$3)",
    [titulo, descricao, user_id]
  )

  res.json({ ok: true })
})

// LISTAR PROCESSOS
app.get("/processos/:user_id", async (req, res) => {
  const { user_id } = req.params

  const result = await pool.query(
    "SELECT * FROM processos WHERE user_id=$1 ORDER BY id DESC",
    [user_id]
  )

  res.json(result.rows)
})

// EXCLUIR PROCESSO
app.delete("/processos/:id", async (req, res) => {
  const { id } = req.params

  await pool.query("DELETE FROM processos WHERE id=$1", [id])

  res.json({ ok: true })
})

// ========================
// PORTA
// ========================
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log("Servidor rodando 🚀")
})
