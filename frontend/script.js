const API_URL = "https://hufqiyhpuotksucwdprp.supabase.co/rest/v1/clientes";
const API_KEY = "sb_publishable_laIaX35XloOoAg7S7dKHHg_PfHaA3aM";

function mostrar(secao) {
  document.getElementById("clientes").style.display = "none";
  document.getElementById("processos").style.display = "none";
  document.getElementById("tarefas").style.display = "none";

  document.getElementById(secao).style.display = "block";
}

async function addCliente() {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const telefone = document.getElementById("telefone").value;

  try {
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
      alert("Cliente criado com sucesso!");
    } else {
      const erro = await res.text();
      alert("Erro: " + erro);
    }

  } catch (e) {
    alert("Erro geral");
    console.error(e);
  }
}
