const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const copyContract = document.getElementById('copyContract');
const contractText = document.getElementById('contractText');
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

document.getElementById('year').textContent = new Date().getFullYear();

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

copyContract.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(contractText.innerText);
    copyContract.textContent = 'Zkopírováno';
    setTimeout(() => copyContract.textContent = 'Kopírovat vzor', 1600);
  } catch (error) {
    copyContract.textContent = 'Nelze kopírovat';
    setTimeout(() => copyContract.textContent = 'Kopírovat vzor', 1600);
  }
});