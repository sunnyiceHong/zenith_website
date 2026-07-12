// Quick View
const quickModal = document.querySelector('[data-quick-modal]');
const closeQuickModal = function() { if (quickModal) quickModal.hidden = true; };
document.querySelectorAll('[data-quick-view]').forEach(function(button) { button.addEventListener('click', function() { if (quickModal) quickModal.hidden = false; }); });
document.querySelector('[data-modal-close]')?.addEventListener('click', closeQuickModal);
quickModal?.addEventListener('click', function(event) { if (event.target === quickModal) closeQuickModal(); });
document.querySelectorAll('.shade').forEach(function(shade) { shade.addEventListener('click', function() { document.querySelector('.shade.active')?.classList.remove('active'); shade.classList.add('active'); }); });
document.querySelector('[data-add-to-cart]')?.addEventListener('click', function() {
  var modal = document.querySelector('[data-quick-modal]');
  if (!modal || modal.hidden) return;
  var name = modal.querySelector('h2')?.textContent || 'Product';
  var priceText = modal.querySelector('.modal-price')?.textContent || '$0';
  var price = parseFloat(priceText.replace('

// Cart badge sync
(function() {
  var cart = JSON.parse(localStorage.getItem('zenith-cart') || '[]');
  var total = cart.reduce(function(t, i) { return t + i.quantity; }, 0);
  document.querySelectorAll('[data-cart-count]').forEach(function(el) { el.textContent = total; });
})();

// Search panel
document.querySelector('[data-search-toggle]')?.addEventListener('click', function() {
  var panel = document.querySelector('[data-search-panel]');
  if (!panel) return;
  panel.hidden = !panel.hidden;
  if (!panel.hidden) { var inp = panel.querySelector('input'); inp && inp.focus(); }
});

// Mobile menu
document.querySelector('[data-menu-toggle]')?.addEventListener('click', function() {
  var nav = document.querySelector('.main-nav');
  if (nav) nav.classList.toggle('is-open');
});
,'')) || 0;
  var image = modal.querySelector('.quick-gallery img')?.src || '';
  var cart = JSON.parse(localStorage.getItem('zenith-cart') || '[]');
  var existing = cart.find(function(item) { return item.name === name; });
  if (existing) existing.quantity += 1;
  else cart.push({ name: name, price: price, quantity: 1, image: image });
  localStorage.setItem('zenith-cart', JSON.stringify(cart));
  var total = cart.reduce(function(t,i) { return t + i.quantity; }, 0);
  document.querySelectorAll('[data-cart-count]').forEach(function(el) { el.textContent = total; });
  closeQuickModal(); });

// Cart badge sync
(function() {
  var cart = JSON.parse(localStorage.getItem('zenith-cart') || '[]');
  var total = cart.reduce(function(t, i) { return t + i.quantity; }, 0);
  document.querySelectorAll('[data-cart-count]').forEach(function(el) { el.textContent = total; });
})();

// Search panel
document.querySelector('[data-search-toggle]')?.addEventListener('click', function() {
  var panel = document.querySelector('[data-search-panel]');
  if (!panel) return;
  panel.hidden = !panel.hidden;
  if (!panel.hidden) { var inp = panel.querySelector('input'); inp && inp.focus(); }
});

// Mobile menu
document.querySelector('[data-menu-toggle]')?.addEventListener('click', function() {
  var nav = document.querySelector('.main-nav');
  if (nav) nav.classList.toggle('is-open');
});
