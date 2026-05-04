const container = document.getElementById('container');
const btnRegister = document.getElementById('btnRegister');
const btnLogin = document.getElementById('btnLogin');

// alternar telas
btnRegister.addEventListener('click', () => {
  container.classList.add('active');
});

btnLogin.addEventListener('click', () => {
  container.classList.remove('active');
});

// recuperar senha
const recuperarSenha = document.getElementById('recuperarSenhaLogin');

if (recuperarSenha) {
  recuperarSenha.addEventListener('click', () => {
    alert('Recuperação de senha será implementada em breve');
  });
}
