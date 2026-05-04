const supabase = window.supabase.createClient(
  "https://hufqiyhpuotksucwdprp.supabase.co",
  "sb_publishable_laIaX35XloOoAg7S7dKHHg_PfHaA3aM"
);

// LOGIN
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

// CADASTRO
document.getElementById("btnCadastrar").onclick = async () => {
  const email = document.getElementById("cadastroEmail").value;
  const senha = document.getElementById("cadastroSenha").value;

  const { error } = await supabase.auth.signUp({
    email,
    password: senha
  });

  if (error) alert(error.message);
  else alert("Conta criada! Verifique seu email.");
};
