const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

const updateHeader = () => header?.classList.toggle('is-solid', window.scrollY > 80);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav-links a').forEach((link) => link.addEventListener('click', () => {
  navLinks?.classList.remove('is-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible'));
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));

document.querySelectorAll('[data-filter]').forEach((filter) => filter.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach((item) => item.classList.remove('is-active'));
  filter.classList.add('is-active');
  const selected = filter.dataset.filter;
  document.querySelectorAll('[data-category]').forEach((project) => {
    project.hidden = selected !== 'all' && !project.dataset.category.includes(selected);
  });
}));

document.querySelectorAll('[data-year]').forEach((year) => { year.textContent = new Date().getFullYear(); });
