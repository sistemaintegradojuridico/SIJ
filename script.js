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

// BOTÕES
btnEntrar.addEventListener('click', () => {
  alert("Login será conectado ao banco em breve");
});

btnCadastrar.addEventListener('click', () => {
  alert("Cadastro será conectado ao banco em breve");
});

recuperarSenha.addEventListener('click', () => {
  alert("Recuperação de senha será implementada");
});
