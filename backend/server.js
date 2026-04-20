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

app.get("/", (req, res) => {
  res.send("SIJ Backend Rodando");
});

app.get("/processos", (req, res) => {
  const data = db.prepare("SELECT * FROM processos").all();
  res.json(data);
});

app.post("/processos", (req, res) => {
  const { titulo, status } = req.body;

  const result = db
    .prepare("INSERT INTO processos (titulo, status) VALUES (?, ?)")
    .run(titulo, status);

  res.json({ id: result.lastInsertRowid });
});

app.put("/processos/:id", (req, res) => {
  db.prepare("UPDATE processos SET status = ? WHERE id = ?")
    .run(req.body.status, req.params.id);

  res.json({ ok: true });
});

app.delete("/processos/:id", (req, res) => {
  db.prepare("DELETE FROM processos WHERE id = ?")
    .run(req.params.id);

  res.json({ ok: true });
});

app.listen(3001, () => {
  console.log("🚀 Backend rodando em http://localhost:3001");
});
