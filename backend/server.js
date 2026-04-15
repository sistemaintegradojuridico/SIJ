import express from "express"
import cors from "cors"
import pkg from "pg"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const { Pool } = pkg

const app = express()
app.use(cors())
app.use(express.json())

// ================= DB =================
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

// ================= CONFIG =================
const JWT_SECRET = process.env.JWT_SECRET || "segredo"

// ================= AUTH =================
function auth(req, res, next){
  const token = req.headers.authorization
  if(!token) return res.status(401).json({error:"Sem token"})

  try{
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  }catch{
    res.status(401).json({error:"Token inválido"})
  }
}

// ================= REGISTER =================
app.post("/register", async (req,res)=>{
  const {email,password} = req.body

  const hash = await bcrypt.hash(password,10)

  try{
    const user = await pool.query(
      "INSERT INTO users(email,password) VALUES($1,$2) RETURNING *",
      [email,hash]
    )

    res.json(user.rows[0])
  }catch{
    res.status(400).json({error:"Email já existe"})
  }
})

// ================= LOGIN =================
app.post("/login", async (req,res)=>{
  const {email,password} = req.body

  const user = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  )

  if(user.rows.length === 0)
    return res.status(400).json({error:"Usuário não encontrado"})

  const valid = await bcrypt.compare(password, user.rows[0].password)

  if(!valid)
    return res.status(400).json({error:"Senha inválida"})

  const token = jwt.sign({id:user.rows[0].id}, JWT_SECRET)

  res.json({token})
})

// ================= PROCESSOS =================
app.post("/processos", auth, async (req,res)=>{
  const {titulo,descricao} = req.body

  const novo = await pool.query(
    "INSERT INTO processos(titulo,descricao,user_id) VALUES($1,$2,$3) RETURNING *",
    [titulo,descricao,req.user.id]
  )

  res.json(novo.rows[0])
})

app.get("/processos", auth, async (req,res)=>{
  const lista = await pool.query(
    "SELECT * FROM processos WHERE user_id=$1 ORDER BY id DESC",
    [req.user.id]
  )

  res.json(lista.rows)
})

app.delete("/processos/:id", auth, async (req,res)=>{
  await pool.query(
    "DELETE FROM processos WHERE id=$1 AND user_id=$2",
    [req.params.id, req.user.id]
  )

  res.json({ok:true})
})

// ================= IA (SAFE) =================
app.post("/ia", auth, async (req,res)=>{
  const {tema} = req.body

  if(!process.env.OPENAI_API_KEY){
    return res.json({
      texto: "IA não configurada ainda. Adicione OPENAI_API_KEY no Render."
    })
  }

  try{
    const { default: OpenAI } = await import("openai")

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: `Crie uma petição jurídica sobre: ${tema}` }
      ]
    })

    res.json({texto: response.choices[0].message.content})

  }catch(err){
    res.json({texto:"Erro na IA"})
  }
})

// ================= START =================
const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
  console.log("Servidor rodando na porta", PORT)
})

app.get("/", (req,res)=>{
  res.send("SIJ Backend rodando 🚀")
})
