// ELEMENTOS
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

// CADASTRAR (FUNCIONAL)
btnCadastrar.addEventListener('click', (e) => {
  e.preventDefault();

  const inputs = document.querySelectorAll('.sign-up-container input');

  const user = {
    nome: inputs[0].value,
    email: inputs[1].value,
    senha: inputs[2].value
  };

  localStorage.setItem("userSIJ", JSON.stringify(user));

  alert("Conta criada com sucesso!");

  // 👉 JÁ VAI PRO LOGIN AUTOMATICO
  container.classList.remove("right-panel-active");
});

// LOGIN (FUNCIONAL)
btnEntrar.addEventListener('click', (e) => {
  e.preventDefault();

  const inputs = document.querySelectorAll('.sign-in-container input');

  const email = inputs[0].value;
  const senha = inputs[1].value;

  const user = JSON.parse(localStorage.getItem("userSIJ"));

  if (!user) {
    alert("Crie uma conta primeiro!");
    return;
  }

  if (email === user.email && senha === user.senha) {
    alert("Login realizado!");
    window.location.href = "dashboard.html";
  } else {
    alert("Email ou senha inválidos");
  }
});

// RECUPERAR SENHA
recuperarSenha.addEventListener('click', () => {
  alert("Funcionalidade em breve");
});
