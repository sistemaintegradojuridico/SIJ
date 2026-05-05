// ELEMENTOS
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

const btnEntrar = document.getElementById('btnEntrar');
const btnCadastrar = document.getElementById('btnCadastrar');
const recuperarSenha = document.getElementById('recuperarSenha');

// =========================
// ANIMAÇÃO (troca de tela)
// =========================
if (signUpButton) {
  signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
  });
}

if (signInButton) {
  signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
  });
}

// =========================
// LOGIN → DASHBOARD
// =========================
if (btnEntrar) {
  btnEntrar.addEventListener('click', (e) => {
    e.preventDefault(); // 🔥 ISSO EVITA QUEBRAR O SITE
    window.location.href = "dashboard.html";
  });
}

// =========================
// CADASTRO
// =========================
if (btnCadastrar) {
  btnCadastrar.addEventListener('click', (e) => {
    e.preventDefault();
    alert("Cadastro será conectado ao banco em breve");
  });
}

// =========================
// RECUPERAR SENHA
// =========================
if (recuperarSenha) {
  recuperarSenha.addEventListener('click', (e) => {
    e.preventDefault();
    alert("Recuperação de senha será implementada");
  });
}
