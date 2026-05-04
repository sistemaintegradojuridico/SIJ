const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

const btnEntrar = document.getElementById('btnEntrar');
const btnCadastrar = document.getElementById('btnCadastrar');
const recuperarSenha = document.getElementById('recuperarSenha');

// animação
signUpButton.addEventListener('click', () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
  container.classList.remove("right-panel-active");
});

// login
btnEntrar.addEventListener('click', () => {
  alert("Login funcionando (próximo passo: banco)");
  window.location.href = "pages/dashboard.html";
});

// cadastro
btnCadastrar.addEventListener('click', () => {
  alert("Cadastro funcionando");
});

// recuperar senha
recuperarSenha.addEventListener('click', () => {
  alert("Recuperação em breve");
});
