const container = document.getElementById('container');

document.getElementById('btnRegister').onclick = () => {
  container.classList.add('active');
};

document.getElementById('btnLogin').onclick = () => {
  container.classList.remove('active');
};
