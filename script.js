const cartDrawer = document.querySelector('[data-cart-drawer]');
const scrim = document.querySelector('[data-scrim]');
const searchPanel = document.querySelector('[data-search-panel]');
function toggleCart(open) {
  if (!cartDrawer) return;
  cartDrawer.classList.toggle('is-open', open);
  if (scrim) scrim.classList.toggle('is-open', open);
  cartDrawer.setAttribute('aria-hidden', String(!open));
}
document.querySelector('[data-cart-toggle]')?.addEventListener('click', () => toggleCart(true));
document.querySelector('[data-cart-close]')?.addEventListener('click', () => toggleCart(false));
scrim?.addEventListener('click', () => toggleCart(false));
document.querySelector('[data-search-toggle]')?.addEventListener('click', () => {
  if (!searchPanel) return;
  searchPanel.hidden = !searchPanel.hidden;
  if (!searchPanel.hidden) searchPanel.querySelector('input')?.focus();
});
(function() {
  var slides = document.querySelectorAll('.carousel-slide');
  if (!slides.length) return;
  var prev = document.querySelector('.carousel-prev');
  var next = document.querySelector('.carousel-next');
  var current = 0;
  function show(index) {
    slides.forEach(function(s, i) { s.classList.toggle('is-active', i === index); });
    current = index;
  }
  function nextSlide() { show((current + 1) % slides.length); }
  function prevSlide() { show((current - 1 + slides.length) % slides.length); }
  prev && prev.addEventListener('click', prevSlide);
  next && next.addEventListener('click', nextSlide);
  var timer = setInterval(nextSlide, 5000);
  [prev, next].forEach(function(btn) {
    btn && btn.addEventListener('click', function() { clearInterval(timer); timer = setInterval(nextSlide, 5000); });
  });
})();
