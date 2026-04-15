const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

// banco fake (memória)
let usuarios = []
let processos = []
let tarefas = []

// LOGIN
app.post('/login', (req, res) => {
  const { email, senha } = req.body

  const user = usuarios.find(u => u.email === email && u.senha === senha)

  if (user) return res.json({ ok: true })
  res.json({ ok: false })
})

// CADASTRO
app.post('/register', (req, res) => {
  const { email, senha } = req.body
  usuarios.push({ email, senha })
  res.json({ ok: true })
})

// PROCESSOS
app.post('/processo', (req, res) => {
  processos.push(req.body)
  res.json({ ok: true })
})

app.get('/processo', (req, res) => {
  res.json(processos)
})

// AGENDA
app.post('/tarefa', (req, res) => {
  tarefas.push(req.body)
  res.json({ ok: true })
})

app.get('/tarefa', (req, res) => {
  res.json(tarefas)
})

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000")
})
