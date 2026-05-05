const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

const btnEntrar = document.getElementById('btnEntrar');
const btnCadastrar = document.getElementById('btnCadastrar');
const recuperarSenha = document.getElementById('recuperarSenha');

// ANIMAÇÃO
signUpButton.addEventListener('click', () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
  container.classList.remove("right-panel-active");
});

// LOGIN REAL (simples por enquanto)
btnEntrar.addEventListener('click', () => {
  window.location.href = "dashboard.html";
});

btnCadastrar.addEventListener('click', () => {
  alert("Conta criada (simulação)");
});

recuperarSenha.addEventListener('click', () => {
  alert("Recuperação de senha em breve");
});
