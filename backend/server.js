const express = require("express")
const cors = require("cors")
const { Pool } = require("pg")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const nodemailer = require("nodemailer")

let OpenAI = null
if(process.env.OPENAI_API_KEY){
  OpenAI = require("openai")
}

const app = express()
app.use(cors())
app.use(express.json())

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

const SECRET = process.env.JWT_SECRET || "123"

// IA segura (não quebra se não tiver chave)
let openai = null
if(process.env.OPENAI_API_KEY){
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })
}

// ================= DB
async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      reset_token TEXT
    );
  `)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS processos (
      id SERIAL PRIMARY KEY,
      titulo TEXT,
      descricao TEXT,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
    );
  `)

  console.log("Banco pronto 🚀")
}
initDB()

// ================= AUTH
function auth(req,res,next){
  const token = req.headers.authorization
  if(!token) return res.status(401).json({error:"Sem token"})
  try{
    const decoded = jwt.verify(token,SECRET)
    req.userId = decoded.id
    next()
  }catch{
    res.status(401).json({error:"Token inválido"})
  }
}

// ================= TESTE
app.get("/", (req,res)=>{
  res.send("SIJ rodando 🚀")
})

// ================= REGISTER
app.post("/register", async (req,res)=>{
  const {email,password} = req.body
  const hash = await bcrypt.hash(password,10)

  await pool.query(
    "INSERT INTO users (email,password) VALUES ($1,$2)",
    [email,hash]
  )

  res.json({ok:true})
})

// ================= LOGIN
app.post("/login", async (req,res)=>{
  const {email,password} = req.body

  const user = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  )

  if(user.rows.length===0)
    return res.status(401).json({error:"Usuário não encontrado"})

  const valid = await bcrypt.compare(password,user.rows[0].password)

  if(!valid)
    return res.status(401).json({error:"Senha inválida"})

  const token = jwt.sign({id:user.rows[0].id},SECRET)

  res.json({token})
})

// ================= PROCESSOS
app.post("/processos", auth, async (req,res)=>{
  const {titulo,descricao} = req.body

  await pool.query(
    "INSERT INTO processos (titulo,descricao,user_id) VALUES ($1,$2,$3)",
    [titulo,descricao,req.userId]
  )

  res.json({ok:true})
})

app.get("/processos", auth, async (req,res)=>{
  const data = await pool.query(
    "SELECT * FROM processos WHERE user_id=$1",
    [req.userId]
  )
  res.json(data.rows)
})

app.delete("/processos/:id", auth, async (req,res)=>{
  await pool.query(
    "DELETE FROM processos WHERE id=$1 AND user_id=$2",
    [req.params.id,req.userId]
  )
  res.json({ok:true})
})

// ================= IA (SEGURA)
app.post("/ia/peticao", auth, async (req,res)=>{
  if(!openai){
    return res.json({texto:"IA não configurada ainda"})
  }

  const {tema} = req.body

  const completion = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {role:"system", content:"Você é um advogado especialista"},
      {role:"user", content:`Crie uma petição sobre: ${tema}`}
    ]
  })

  res.json({texto: completion.choices[0].message.content})
})

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> console.log("Servidor rodando 🚀"))
