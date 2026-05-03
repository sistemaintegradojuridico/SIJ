const API_URL = "https://hufqiyhpuotksucwdprp.supabase.co/rest/v1/clientes";
const API_KEY = "sb_publishable_laIaX35XloOoAg7S7dKHHg_PfHaA3aM";

function mostrar(secao) {
  document.getElementById("clientes").style.display = "block";
}

async function addCliente() {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const telefone = document.getElementById("telefone").value;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": API_KEY,
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({ nome, email, telefone })
  });

  if (res.ok) {
    alert("Cliente criado!");
    listarClientes();
  } else {
    alert("Erro ao criar");
  }
}

async function listarClientes() {
  const res = await fetch(API_URL, {
    headers: {
      "apikey": API_KEY,
      "Authorization": `Bearer ${API_KEY}`
    }
  });

  const data = await res.json();

  const lista = document.getElementById("listaClientes");
  lista.innerHTML = "";

  data.forEach(c => {
    lista.innerHTML += `<p>${c.nome} - ${c.email}</p>`;
  });
}

listarClientes();
