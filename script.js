alert("JS carregou")

const container = document.getElementById('container');

const btnRegister = document.getElementById('btnRegister');
const btnLogin = document.getElementById('btnLogin');

const btnEntrar = document.getElementById('btnEntrar');
const btnCadastrar = document.getElementById('btnCadastrar');

const recuperarSenha = document.getElementById('recuperarSenhaLogin');

// alternar telas
btnRegister.addEventListener('click', () => {
  container.classList.add('active');
});

btnLogin.addEventListener('click', () => {
  container.classList.remove('active');
});

// botão entrar
if (btnEntrar) {
  btnEntrar.addEventListener('click', () => {
    alert('Login será conectado ao banco em breve');
  });
}

// botão cadastrar
if (btnCadastrar) {
  btnCadastrar.addEventListener('click', () => {
    alert('Cadastro será conectado ao banco em breve');
  });
}

// recuperar senha
if (recuperarSenha) {
  recuperarSenha.addEventListener('click', () => {
    alert('Recuperação de senha será implementada em breve');
  });
}
