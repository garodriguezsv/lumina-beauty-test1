const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.main-nav');

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const form = document.querySelector('#contactForm');
const status = document.querySelector('#formStatus');

function showError(input, message) {
  const field = input.closest('.field');
  field.classList.add('error');
  field.querySelector('small').textContent = message;
}

function clearError(input) {
  const field = input.closest('.field');
  field.classList.remove('error');
  field.querySelector('small').textContent = '';
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  status.textContent = '';
  const name = form.elements.name;
  const email = form.elements.email;
  const message = form.elements.message;
  let isValid = true;

  [name, email, message].forEach(clearError);

  if (name.value.trim().length < 2) {
    showError(name, 'Ingresa tu nombre (mínimo 2 caracteres).');
    isValid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value.trim())) {
    showError(email, 'Ingresa un correo electrónico válido.');
    isValid = false;
  }

  if (message.value.trim().length < 10) {
    showError(message, 'Cuéntanos un poco más (mínimo 10 caracteres).');
    isValid = false;
  }

  if (!isValid) return;

  status.textContent = '¡Gracias! Recibimos tu mensaje y te responderemos pronto.';
  form.reset();
});
