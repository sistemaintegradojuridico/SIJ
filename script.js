const SUPABASE_URL = "https://hufqiyhpuotksucwdprp.supabase.co";
const SUPABASE_KEY = "sb_publishable_laIaX35XloOoAg7S7dKHHg_PfHaA3aM";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const container = document.getElementById('container');

document.getElementById('signUp').onclick = () => {
  container.classList.add("right-panel-active");
};

document.getElementById('signIn').onclick = () => {
  container.classList.remove("right-panel-active");
};

// LOGIN
document.getElementById('btnEntrar').onclick = async (e) => {
  e.preventDefault();

  const inputs = document.querySelectorAll('.sign-in-container input');
  const email = inputs[0].value;
  const senha = inputs[1].value;

  const { error } = await supabase.auth.signInWithPassword({ email, password: senha });

  if (error) alert(error.message);
  else alert("Login OK");
};

// CADASTRO
document.getElementById('btnCadastrar').onclick = async (e) => {
  e.preventDefault();

  const inputs = document.querySelectorAll('.sign-up-container input');
  const email = inputs[1].value;
  const senha = inputs[2].value;

  const { error } = await supabase.auth.signUp({ email, password: senha });

  if (error) alert(error.message);
  else alert("Conta criada!");
};

// RECUPERAR
document.getElementById('recuperarSenha').onclick = async () => {
  const email = prompt("Digite seu email");

  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) alert(error.message);
  else alert("Email enviado!");
};
