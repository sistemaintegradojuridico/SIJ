const express = require("express")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { Pool } = require("pg")

const app = express()
app.use(cors())
app.use(express.json())

// CONEXÃO BANCO
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

const SECRET = process.env.JWT_SECRET || "segredo"

// =================================
// CRIAR TABELAS AUTOMÁTICO
// =================================
async function criarTabelas() {
  try {
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
        titulo TEXT,
        descricao TEXT,
        user_id INTEGER REFERENCES users(id)
      );
    `)

    console.log("Tabelas prontas 🚀")
  } catch (err) {
    console.log("Erro ao criar tabelas:", err)
  }
}

// =================================
// TESTE
// =================================
app.get("/", (req, res) => {
  res.send("SIJ backend rodando 🚀")
})

// =================================
// REGISTER
// =================================
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.json({ error: "Preencha todos campos" })
    }

    const hash = await bcrypt.hash(password, 10)

    await pool.query(
      "INSERT INTO users (email, password) VALUES ($1,$2)",
      [email, hash]
    )

    res.json({ ok: true })
  } catch (err) {
    res.json({ error: "Email já existe" })
  }
})

// =================================
// LOGIN
// =================================
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    )

    if (user.rows.length === 0) {
      return res.json({ error: "Usuário não encontrado" })
    }

    const valid = await bcrypt.compare(password, user.rows[0].password)

    if (!valid) {
      return res.json({ error: "Senha inválida" })
    }

    const token = jwt.sign({ id: user.rows[0].id }, SECRET)

    res.json({ token })
  } catch (err) {
    res.json({ error: "Erro no login" })
  }
})

// =================================
// MIDDLEWARE AUTH
// =================================
function auth(req, res, next) {
  const token = req.headers.authorization

  if (!token) return res.status(401).json({ error: "Sem token" })

  try {
    const decoded = jwt.verify(token, SECRET)
    req.userId = decoded.id
    next()
  } catch {
    res.status(401).json({ error: "Token inválido" })
  }
}

// =================================
// CRIAR PROCESSO
// =================================
app.post("/processos", auth, async (req, res) => {
  try {
    const { titulo, descricao } = req.body

    await pool.query(
      "INSERT INTO processos (titulo, descricao, user_id) VALUES ($1,$2,$3)",
      [titulo, descricao, req.userId]
    )

    res.json({ ok: true })
  } catch (err) {
    res.json({ error: "Erro ao criar processo" })
  }
})

// =================================
// LISTAR PROCESSOS
// =================================
app.get("/processos", auth, async (req, res) => {
  try {
    const data = await pool.query(
      "SELECT * FROM processos WHERE user_id=$1 ORDER BY id DESC",
      [req.userId]
    )

    res.json(data.rows)
  } catch (err) {
    res.json({ error: "Erro ao listar" })
  }
})

// =================================
// EXCLUIR PROCESSO
// =================================
app.delete("/processos/:id", auth, async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM processos WHERE id=$1 AND user_id=$2",
      [req.params.id, req.userId]
    )

    res.json({ ok: true })
  } catch (err) {
    res.json({ error: "Erro ao excluir" })
  }
})

// =================================
// INICIAR SERVIDOR
// =================================
criarTabelas()

const PORT = process.env.PORT || 10000

app.listen(PORT, () => {
  console.log("Servidor rodando 🚀")
})
