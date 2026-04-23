const API = "http://localhost:3001/processos";

async function carregar() {
  const res = await fetch(API);
  const data = await res.json();

  ["novo", "andamento", "finalizado"].forEach(id => {
    document.getElementById(id).innerHTML = `<h2>${id}</h2>`;
  });

  data.forEach(p => {
    const el = document.createElement("div");
    el.className = "card";
    el.innerText = p.titulo;

    // MOVER PROCESSO
    el.onclick = async () => {
      const status = prompt(
        "Para onde mover?\n\nDigite:\n- novo\n- andamento\n- finalizado"
      );

      if (!status) return;

      await fetch(`${API}/${p.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });

      carregar();
    };

    // EXCLUIR COM BOTÃO DIREITO
    el.oncontextmenu = async (e) => {
      e.preventDefault();
      if (confirm("Deseja excluir este processo?")) {
        await fetch(`${API}/${p.id}`, { method: "DELETE" });
        carregar();
      }
    };

    document.getElementById(p.status).appendChild(el);
  });
}

// CRIAR PROCESSO MELHORADO
async function criar() {
  const titulo = prompt("Digite o nome do processo:");

  if (!titulo || titulo.trim() === "") {
    alert("Nome inválido!");
    return;
  }

  await fetch(API, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      titulo: titulo.trim(),
      status: "novo"
    })
  });

  carregar();
}

carregar();
