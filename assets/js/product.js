(function() {
  // Add to cart
  document.querySelector('[data-product-add]')?.addEventListener('click', function() {
    var cart = JSON.parse(localStorage.getItem('zenith-cart') || '[]');
    var existing = cart.find(function(item) { return item.name === 'Second Skin Lip Pigment'; });
    if (existing) existing.quantity += 1;
    else cart.push({ name: 'Second Skin Lip Pigment', price: 20, quantity: 1, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=400&q=85' });
    localStorage.setItem('zenith-cart', JSON.stringify(cart));
    var totalQty = cart.reduce(function(t,i) { return t + i.quantity; }, 0);
    document.querySelectorAll('[data-cart-count]').forEach(function(el) { el.textContent = totalQty; });
  });

  // Shade selector
  document.querySelectorAll('.shade').forEach(function(shade) {
    shade.addEventListener('click', function() {
      document.querySelector('.shade.active')?.classList.remove('active');
      shade.classList.add('active');
    });
  });

  // Accordion
  document.querySelectorAll('.accordion-header').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var isOpen = btn.classList.toggle('is-open');
      var body = btn.nextElementSibling;
      if (body) body.classList.toggle('is-open', isOpen);
    });
  });
})();