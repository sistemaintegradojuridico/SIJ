const supabase = window.supabase.createClient(
  "https://hufqiyhpuotksucwdprp.supabase.co",
  "sb_publishable_laIaX35XloOoAg7S7dKHHg_PfHaA3aM"
);

const container = document.getElementById("container");

// animação
document.getElementById("btnRegister").onclick = () => {
  container.classList.add("right-panel-active");
};

document.getElementById("btnLogin").onclick = () => {
  container.classList.remove("right-panel-active");
};

// login
document.getElementById("btnEntrar").onclick = async () => {
  const email = document.getElementById("loginEmail").value;
  const senha = document.getElementById("loginSenha").value;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password: senha
  });

  if (error) alert(error.message);
  else alert("Login feito!");
};

// cadastro
document.getElementById("btnCadastrar").onclick = async () => {
  const email = document.getElementById("cadastroEmail").value;
  const senha = document.getElementById("cadastroSenha").value;

  const { error } = await supabase.auth.signUp({
    email,
    password: senha
  });

  if (error) alert(error.message);
  else alert("Conta criada!");
};

// recuperar senha
document.getElementById("recuperarSenhaLogin").onclick = async () => {
  const email = prompt("Digite seu email");

  if (!email) return;

  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) alert(error.message);
  else alert("Email enviado!");
};
