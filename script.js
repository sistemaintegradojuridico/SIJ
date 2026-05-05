const container = document.getElementById('container');

document.getElementById('signUp').onclick = () => {
  container.classList.add("right-panel-active");
};

document.getElementById('signIn').onclick = () => {
  container.classList.remove("right-panel-active");
};

// CADASTRO
document.getElementById("formCadastro").addEventListener("submit", (e) => {
  e.preventDefault();

  const user = {
    nome: nomeCadastro.value,
    email: emailCadastro.value,
    senha: senhaCadastro.value
  };

  localStorage.setItem("userSIJ", JSON.stringify(user));

  alert("Conta criada!");
});

// LOGIN
document.getElementById("formLogin").addEventListener("submit", (e) => {
  e.preventDefault();

  const user = JSON.parse(localStorage.getItem("userSIJ"));

  if (!user) {
    alert("Crie uma conta primeiro");
    return;
  }

  if (emailLogin.value === user.email && senhaLogin.value === user.senha) {
    window.location.href = "dashboard.html";
  } else {
    alert("Dados inválidos");
  }
});
