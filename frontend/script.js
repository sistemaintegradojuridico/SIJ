const API_URL = "https://hufqiyhpuotksucwdprp.supabase.co/rest/v1/clientes";
const API_KEY = "sb_publishable_laIaX35XloOoAg7S7dKHHg_PfHaA3aM";

async function addCliente() {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const telefone = document.getElementById("telefone").value;

  console.log("Enviando:", nome, email, telefone);

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": API_KEY,
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        nome: nome,
        email: email,
        telefone: telefone
      })
    });

    if (response.ok) {
      alert("Cliente criado com sucesso!");
    } else {
      const erro = await response.text();
      console.error("Erro:", erro);
      alert("Erro ao salvar cliente");
    }

  } catch (error) {
    console.error("Erro geral:", error);
  }
}
