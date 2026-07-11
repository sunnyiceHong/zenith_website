const menuToggle = document.querySelector('.menu-toggle');

menuToggle?.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  document.querySelector('.main-nav').classList.toggle('is-open', !expanded);
});
