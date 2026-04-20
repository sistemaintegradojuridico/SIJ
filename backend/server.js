const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");

const app = express();
app.use(cors());
app.use(express.json());

const db = new Database("sij.db");

// Criar tabela
db.prepare(`
CREATE TABLE IF NOT EXISTS processos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo TEXT,
  status TEXT
)
`).run();

// ROTAS
app.get("/processos", (req, res) => {
  const processos = db.prepare("SELECT * FROM processos").all();
  res.json(processos);
});

app.post("/processos", (req, res) => {
  const { titulo, status } = req.body;
  const result = db
    .prepare("INSERT INTO processos (titulo, status) VALUES (?, ?)")
    .run(titulo, status);

  res.json({ id: result.lastInsertRowid });
});

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
