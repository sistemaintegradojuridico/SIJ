require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Pool } = require('pg')

const app = express()
app.use(cors())
app.use(express.json())

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

// 🔐 Middleware
function auth(req, res, next) {
  const token = req.headers.authorization
  if (!token) return res.status(401).json({ error: 'Sem token' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch {
    res.status(401).json({ error: 'Token inválido' })
  }
}

// 👤 Cadastro
app.post('/register', async (req, res) => {
  const { email, password } = req.body
  const hash = await bcrypt.hash(password, 10)

  await pool.query(
    'INSERT INTO users (email, password) VALUES ($1, $2)',
    [email, hash]
  )

  res.json({ ok: true })
})

// 🔑 Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body

  const user = await pool.query(
    'SELECT * FROM users WHERE email=$1',
    [email]
  )

  if (!user.rows.length) return res.status(400).json({ error: 'Usuário não encontrado' })

  const valid = await bcrypt.compare(password, user.rows[0].password)
  if (!valid) return res.status(400).json({ error: 'Senha inválida' })

  const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET)

  res.json({ token })
})

// 📁 Criar processo
app.post('/processos', auth, async (req, res) => {
  const { titulo, descricao } = req.body

  await pool.query(
    'INSERT INTO processos (titulo, descricao, user_id) VALUES ($1,$2,$3)',
    [titulo, descricao, req.user.id]
  )

  res.json({ ok: true })
})

// 📄 Listar
app.get('/processos', auth, async (req, res) => {
  const result = await pool.query(
    'SELECT * FROM processos WHERE user_id=$1',
    [req.user.id]
  )

  res.json(result.rows)
})

// ❌ Deletar
app.delete('/processos/:id', auth, async (req, res) => {
  await pool.query(
    'DELETE FROM processos WHERE id=$1 AND user_id=$2',
    [req.params.id, req.user.id]
  )

  res.json({ ok: true })
})

app.listen(3000, () => console.log('Servidor rodando'))
