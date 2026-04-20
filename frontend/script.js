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

    el.onclick = async () => {
      const status = prompt("novo / andamento / finalizado");
      if (!status) return;

      await fetch(`${API}/${p.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });

      carregar();
    };

    el.oncontextmenu = async (e) => {
      e.preventDefault();
      if (confirm("Excluir processo?")) {
        await fetch(`${API}/${p.id}`, { method: "DELETE" });
        carregar();
      }
    };

    document.getElementById(p.status).appendChild(el);
  });
}

async function criar() {
  const titulo = prompt("Nome do processo:");
  if (!titulo) return;

  await fetch(API, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ titulo, status: "novo" })
  });

  carregar();
}

carregar();
