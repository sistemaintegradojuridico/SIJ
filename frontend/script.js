const API_URL = "https://hufqiyhpuotksucwdprp.supabase.co/rest/v1/";
const API_KEY = "sb_publishable_laIaX35XloOoAg7S7dKHHg_PfHaA3aM";

// ================= CLIENTES =================
async function addCliente() {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const telefone = document.getElementById("telefone").value;

  const response = await fetch(API_URL + "clientes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": API_KEY,
      "Authorization": "Bearer " + API_KEY
    },
    body: JSON.stringify({ nome, email, telefone })
  });

  if (response.ok) {
    alert("Cliente criado com sucesso!");
  } else {
    alert("Erro ao criar cliente");
  }
}

// ================= PROCESSOS =================
async function addProcesso() {
  const titulo = document.getElementById("tituloProcesso").value;
  const status = document.getElementById("statusProcesso").value;
  const cliente_id = document.getElementById("clienteId").value;

  const response = await fetch(API_URL + "processos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": API_KEY,
      "Authorization": "Bearer " + API_KEY
    },
    body: JSON.stringify({ titulo, status, cliente_id })
  });

  if (response.ok) {
    alert("Processo criado!");
  } else {
    alert("Erro ao criar processo");
  }
}

// ================= TAREFAS =================
async function addTarefa() {
  const titulo = document.getElementById("tituloTarefa").value;
  const processo_id = document.getElementById("processoId").value;

  const response = await fetch(API_URL + "tarefas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": API_KEY,
      "Authorization": "Bearer " + API_KEY
    },
    body: JSON.stringify({ titulo, processo_id })
  });

  if (response.ok) {
    alert("Tarefa criada!");
  } else {
    alert("Erro ao criar tarefa");
  }
}
