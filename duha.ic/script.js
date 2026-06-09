const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const form = document.querySelector('#signupForm');
const note = document.querySelector('#formNote');

if (form && note) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    note.textContent = name
      ? `Děkujeme, ${name}. V ostré verzi by se formulář napojil na backend.`
      : 'Děkujeme. V ostré verzi by se formulář napojil na backend.';
    form.reset();
  });
}
