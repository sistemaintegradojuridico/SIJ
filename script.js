// ===== CONFIG SUPABASE =====
const SUPABASE_URL = "https://hufqiyhpuotksucwdprp.supabase.co";
const SUPABASE_KEY = "sb_publishable_laIaX35XloOoAg7S7dKHHg_PfHaA3aM";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ===== ELEMENTOS =====
const container = document.getElementById('container');

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');

const btnEntrar = document.getElementById('btnEntrar');
const btnCadastrar = document.getElementById('btnCadastrar');
const recuperarSenha = document.getElementById('recuperarSenha');

// ===== ANIMAÇÃO (NÃO ALTERA DESIGN) =====
signUpButton.addEventListener('click', () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
  container.classList.remove("right-panel-active");
});

// ===== CADASTRO REAL =====
btnCadastrar.addEventListener('click', async (e) => {
  e.preventDefault();

  const inputs = document.querySelectorAll('.sign-up-container input');
  const nome = inputs[0].value;
  const email = inputs[1].value;
  const senha = inputs[2].value;

  if (!email || !senha) {
    alert("Preencha email e senha");
    return;
  }

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: senha,
    options: {
      data: { nome: nome }
    }
  });

  if (error) {
    alert("Erro: " + error.message);
  } else {
    alert("Conta criada! Verifique seu email.");
  }
});

// ===== LOGIN REAL =====
btnEntrar.addEventListener('click', async (e) => {
  e.preventDefault();

  const inputs = document.querySelectorAll('.sign-in-container input');
  const email = inputs[0].value;
  const senha = inputs[1].value;

  if (!email || !senha) {
    alert("Preencha email e senha");
    return;
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: senha
  });

  if (error) {
    alert("Erro: " + error.message);
  } else {
    alert("Login realizado com sucesso!");

    // 🔥 FUTURO: redirecionar pro sistema
    // window.location.href = "dashboard.html";
  }
});

// ===== RECUPERAR SENHA =====
recuperarSenha.addEventListener('click', async () => {
  const email = prompt("Digite seu email:");

  if (!email) return;

  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    alert("Erro: " + error.message);
  } else {
    alert("Email de recuperação enviado!");
  }
});
