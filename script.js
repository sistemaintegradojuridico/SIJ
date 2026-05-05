const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

const btnEntrar = document.getElementById('btnEntrar');
const btnCadastrar = document.getElementById('btnCadastrar');
const recuperarSenha = document.getElementById('recuperarSenha');

signUpButton.addEventListener('click', () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
  container.classList.remove("right-panel-active");
});

btnEntrar.addEventListener('click', () => {
  window.location.href = "dashboard.html";
});

btnCadastrar.addEventListener('click', () => {
  alert("Cadastro será conectado ao banco em breve");
});

recuperarSenha.addEventListener('click', () => {
  alert("Recuperação de senha será implementada");
});
