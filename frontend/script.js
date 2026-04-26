const SUPABASE_URL = "https://hufqiyhpuotksucwdprp.supabase.co";
const SUPABASE_KEY = "sb_publishable_laIaX35XloOoAg7S7dKHHg_PfHaA3aM";

const headers = {
  "apikey": SUPABASE_KEY,
  "Authorization": "Bearer " + SUPABASE_KEY,
  "Content-Type": "application/json"
};

// ================= CLIENTES =================

// Criar cliente
async function criarCliente(nome, email, telefone) {
  await fetch(${SUPABASE_URL}/rest/v1/clientes, {
    method: "POST",
    headers,
    body: JSON.stringify({ nome, email, telefone })
  });

  listarClientes();
}

// Listar clientes
async function listarClientes() {
  const res = await fetch(${SUPABASE_URL}/rest/v1/clientes, {
    headers
  });
  const data = await res.json();

  console.log("CLIENTES:", data);
}

// ================= PROCESSOS =================

// Criar processo
async function criarProcesso(titulo, status, cliente_id) {
  await fetch(${SUPABASE_URL}/rest/v1/processo, {
    method: "POST",
    headers,
    body: JSON.stringify({ titulo, status, cliente_id })
  });

  listarProcessos();
}

// Listar processos
async function listarProcessos() {
  const res = await fetch(${SUPABASE_URL}/rest/v1/processo?select=*, {
    headers
  });
  const data = await res.json();

  console.log("PROCESSOS:", data);
}

// ================= TAREFAS =================

// Criar tarefa
async function criarTarefa(titulo, processo_id) {
  await fetch(${SUPABASE_URL}/rest/v1/tarefas, {
    method: "POST",
    headers,
    body: JSON.stringify({ titulo, processo_id })
  });

  listarTarefas();
}

// Listar tarefas
async function listarTarefas() {
  const res = await fetch(${SUPABASE_URL}/rest/v1/tarefas, {
    headers
  });
  const data = await res.json();

  console.log("TAREFAS:", data);
}

// ================= TESTE =================

// Testar tudo no console
listarClientes();
listarProcessos();
listarTarefas();
