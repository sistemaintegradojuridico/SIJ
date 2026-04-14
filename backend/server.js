const express = require("express")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const { Pool } = require("pg")

const app = express()
app.use(cors())
app.use(express.json())

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

const SECRET = process.env.JWT_SECRET || "segredo"

// 🔐 middleware auth
function auth(req, res, next){
  const token = req.headers.authorization
  if(!token) return res.status(401).json({error:"Sem token"})

  try{
    const decoded = jwt.verify(token, SECRET)
    req.user = decoded
    next()
  }catch{
    res.status(401).json({error:"Token inválido"})
  }
}

// ✅ rota teste
app.get("/", (req,res)=>{
  res.send("SIJ backend rodando 🚀")
})

// 🧾 cadastro
app.post("/register", async (req,res)=>{
  const {email, password} = req.body

  if(!email || !password){
    return res.json({error:"Preencha tudo"})
  }

  try{
    await pool.query(
      "INSERT INTO users (email, password) VALUES ($1,$2)",
      [email, password]
    )
    res.json({ok:true})
  }catch(e){
    res.json({error:"Email já existe"})
  }
})

// 🔑 login
app.post("/login", async (req,res)=>{
  const {email, password} = req.body

  const user = await pool.query(
    "SELECT * FROM users WHERE email=$1 AND password=$2",
    [email, password]
  )

  if(user.rows.length === 0){
    return res.json({error:"Login inválido"})
  }

  const token = jwt.sign({id:user.rows[0].id}, SECRET)

  res.json({token})
})

// 📁 criar processo
app.post("/processos", auth, async (req,res)=>{
  const {titulo, descricao} = req.body

  await pool.query(
    "INSERT INTO processos (titulo, descricao, user_id) VALUES ($1,$2,$3)",
    [titulo, descricao, req.user.id]
  )

  res.json({ok:true})
})

// 📄 listar processos
app.get("/processos", auth, async (req,res)=>{
  const dados = await pool.query(
    "SELECT * FROM processos WHERE user_id=$1 ORDER BY id DESC",
    [req.user.id]
  )

  res.json(dados.rows)
})

// ❌ excluir processo
app.delete("/processos/:id", auth, async (req,res)=>{
  await pool.query(
    "DELETE FROM processos WHERE id=$1 AND user_id=$2",
    [req.params.id, req.user.id]
  )

  res.json({ok:true})
})

const PORT = process.env.PORT || 10000
app.listen(PORT, ()=> console.log("Servidor rodando"))
