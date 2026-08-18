const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

const updateHeader = () => header?.classList.toggle('is-solid', window.scrollY > 80);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('is-open');
  menuToggle.classList.toggle('is-open', open);
  header?.classList.toggle('menu-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav-links a').forEach((link) => link.addEventListener('click', () => {
  navLinks?.classList.remove('is-open');
  menuToggle?.classList.remove('is-open');
  header?.classList.remove('menu-open');
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

const contactForm = document.querySelector('[data-contact-form]');
const formStatus = document.querySelector('[data-form-status]');

contactForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const submitButton = contactForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = 'Sending Enquiry';
  formStatus.hidden = true;
  formStatus.classList.remove('is-error');

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) throw new Error('Unable to send enquiry');

    contactForm.reset();
    formStatus.textContent = 'Thank you. Your enquiry has been sent successfully.';
    formStatus.hidden = false;
    window.fbq?.('track', 'Lead');
  } catch {
    formStatus.textContent = 'We could not send your enquiry. Please try again or email us directly.';
    formStatus.classList.add('is-error');
    formStatus.hidden = false;
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Send Enquiry';
  }
});

document.querySelectorAll('[data-year]').forEach((year) => { year.textContent = new Date().getFullYear(); });

document.querySelectorAll('a[href^="tel:"], a[href^="mailto:"], a[href*="wa.me"]').forEach((link) => {
  link.addEventListener('click', () => window.fbq?.('track', 'Contact'));
});
