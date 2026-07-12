var productCount = document.querySelector('[data-cart-count]');
var cartKey = 'zenith-cart';
var savedCart = JSON.parse(localStorage.getItem(cartKey) || '[]');
var savedCount = savedCart.reduce(function(total, item) { return total + item.quantity; }, 0);
if (productCount) productCount.textContent = savedCount;

document.querySelector('[data-product-add]')?.addEventListener('click', function() {
  var cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
  var existing = cart.find(function(item) { return item.name === 'Second Skin Lip Pigment'; });
  if (existing) existing.quantity += 1;
  else cart.push({ name: 'Second Skin Lip Pigment', price: 20, quantity: 1, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=400&q=85' });
  localStorage.setItem(cartKey, JSON.stringify(cart));
  if (productCount) productCount.textContent = cart.reduce(function(total, item) { return total + item.quantity; }, 0);
});

document.querySelectorAll('.shade').forEach(function(shade) { shade.addEventListener('click', function() {
  document.querySelector('.shade.active')?.classList.remove('active');
  shade.classList.add('active');
}); });

// Accordion
document.querySelectorAll('.accordion-header').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var isOpen = btn.classList.toggle('is-open');
    var body = btn.nextElementSibling;
    if (body) body.classList.toggle('is-open', isOpen);
  });
});
