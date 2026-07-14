document.querySelectorAll('[data-quick-view]').forEach(function(button) {
  button.addEventListener('click', function() {
    var modal = document.querySelector('[data-quick-modal]');
    if (modal) { modal.classList.add('is-open'); modal.hidden = false; }
  });
});

(function() {
  var modal = document.querySelector('[data-quick-modal]');
  if (!modal) return;
  var closeBtn = document.querySelector('[data-modal-close]');
  if (closeBtn) closeBtn.addEventListener('click', function() { modal.classList.remove('is-open'); modal.hidden = true; });
  modal.addEventListener('click', function(e) { if (e.target === modal) { modal.classList.remove('is-open'); modal.hidden = true; } });
  modal.querySelectorAll('.shade').forEach(function(shade) {
    shade.addEventListener('click', function() {
      modal.querySelector('.shade.active')?.classList.remove('active');
      shade.classList.add('active');
    });
  });
  modal.querySelector('[data-add-to-cart]')?.addEventListener('click', function() {
    if (modal.hidden) return;
    var name = modal.querySelector('h2')?.textContent || 'Product';
    var priceText = modal.querySelector('.modal-price')?.textContent || '';
    var price = parseFloat(priceText.replace('$', '')) || 0;
    var image = modal.querySelector('.quick-gallery img')?.src || '';
    var cart = JSON.parse(localStorage.getItem('zenith-cart') || '[]');
    var existing = cart.find(function(item) { return item.name === name; });
    if (existing) existing.quantity += 1;
    else cart.push({ name: name, price: price, quantity: 1, image: image });
    localStorage.setItem('zenith-cart', JSON.stringify(cart));
    var total = cart.reduce(function(t,i) { return t + i.quantity; }, 0);
    document.querySelectorAll('[data-cart-count]').forEach(function(el) { el.textContent = total; });
    modal.classList.remove('is-open');
    modal.hidden = true;
  });
})();

(function() {
  try {
    var cart = JSON.parse(localStorage.getItem('zenith-cart') || '[]');
    var total = cart.reduce(function(t, i) { return t + i.quantity; }, 0);
    document.querySelectorAll('[data-cart-count]').forEach(function(el) { el.textContent = total; });
  } catch(e) {}
})();