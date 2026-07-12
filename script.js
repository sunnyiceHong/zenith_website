// ── Fixed header offset ──
document.body.classList.add('has-fixed-header');

// ── Sticky header on scroll ──
(function() {
  var header = document.querySelector('[data-header]');
  if (!header) return;
  window.addEventListener('scroll', function() {
    header.classList.toggle('is-scrolled', window.scrollY > 50);
  });
  // Set initial state
  header.classList.toggle('is-scrolled', window.scrollY > 50);
})();

// ── Cart ──
const cartKey = 'zenith-cart';
function getCart() { return JSON.parse(localStorage.getItem(cartKey) || '[]'); }
function saveCart(cart) { localStorage.setItem(cartKey, JSON.stringify(cart)); updateCartUI(cart); }
function updateCartUI(cart) {
  var total = cart.reduce(function(t, i) { return t + i.quantity; }, 0);
  document.querySelectorAll('[data-cart-count]').forEach(function(el) { el.textContent = total; });
  // Also update legacy lookup
  var legacy = document.querySelector('.bag-link span');
  if (legacy && !legacy.hasAttribute('data-cart-count')) legacy.textContent = total;
}
function renderCartDrawer(cart) {
  var drawer = document.querySelector('[data-cart-drawer]');
  var content = drawer && drawer.querySelector('.cart-drawer-content');
  if (!content) return;
  if (!cart.length) {
    content.innerHTML = '<div class="empty-cart"><p>Your bag is currently empty.</p><a class="button" href="collections/new.html">CONTINUE SHOPPING</a></div>';
    return;
  }
  content.innerHTML = cart.map(function(item, idx) {
    return '<div class="cart-item" data-idx="' + idx + '">' +
      '<img src="' + item.image + '" alt="' + item.name + '" />' +
      '<div class="cart-item-info"><p class="cart-item-name">' + item.name + '</p>' +
      '<p class="cart-item-price">$' + item.price.toFixed(2) + ' x ' + item.quantity + '</p></div>' +
      '<button class="cart-item-remove" data-idx="' + idx + '" aria-label="Remove">&times;</button></div>';
  }).join('');
  var totalPrice = cart.reduce(function(s, i) { return s + i.price * i.quantity; }, 0);
  content.innerHTML += '<div class="cart-total"><span>Subtotal</span><strong>$' + totalPrice.toFixed(2) + '</strong></div>' +
    '<button class="button" onclick="showCheckoutMsg()">CHECKOUT</button>';
}
function toggleCart(open) {
  var drawer = document.querySelector('[data-cart-drawer]');
  var scrim = document.querySelector('[data-scrim]');
  if (!drawer) return;
  var isOpen = (open !== undefined) ? open : !drawer.classList.contains('is-open');
  drawer.classList.toggle('is-open', isOpen);
  if (scrim) scrim.classList.toggle('is-open', isOpen);
  drawer.setAttribute('aria-hidden', String(!isOpen));
  if (isOpen) renderCartDrawer(getCart());
}
function toggleMenu() {
  var nav = document.querySelector('.main-nav');
  var menuBtn = document.querySelector('[data-menu-toggle]');
  if (nav) {
    nav.classList.toggle('is-open');
    menuBtn && menuBtn.classList.toggle('is-open');
  }
}

// Init cart count
updateCartUI(getCart());

// Event listeners
document.querySelector('[data-cart-toggle]')?.addEventListener('click', function() { toggleCart(true); });
document.querySelector('[data-cart-close]')?.addEventListener('click', function() { toggleCart(false); });
document.querySelector('[data-scrim]')?.addEventListener('click', function() { toggleCart(false); });
document.querySelector('[data-menu-toggle]')?.addEventListener('click', toggleMenu);
document.querySelector('[data-search-toggle]')?.addEventListener('click', function() {
  var panel = document.querySelector('[data-search-panel]');
  if (!panel) return;
  panel.hidden = !panel.hidden;
  if (!panel.hidden) { var inp = panel.querySelector('input'); inp && inp.focus(); }
});

// Cart item remove via delegation
document.addEventListener('click', function(e) {
  var btn = e.target.closest('.cart-item-remove');
  if (!btn) return;
  var idx = parseInt(btn.dataset.idx, 10);
  var cart = getCart();
  cart.splice(idx, 1);
  saveCart(cart);
  renderCartDrawer(cart);
});

function showCheckoutMsg() { alert('Checkout coming soon'); }

// Carousel
(function() {
  var slides = document.querySelectorAll('.carousel-slide');
  if (!slides.length) return;
  var prev = document.querySelector('.carousel-prev');
  var next = document.querySelector('.carousel-next');
  var pagDots = document.querySelectorAll('.pag-dot');
  var pauseBtn = document.querySelector('[data-carousel-pause]');
  var current = 0, paused = false, timer;
  function show(index) {
    slides.forEach(function(s, i) { s.classList.toggle('is-active', i === index); });
    pagDots.forEach(function(d, i) { d.classList.toggle('is-active', i === index); });
    current = index;
  }
  function nextSlide() { show((current + 1) % slides.length); }
  function prevSlide() { show((current - 1 + slides.length) % slides.length); }
  function startTimer() { clearInterval(timer); if (!paused) timer = setInterval(nextSlide, 5000); }
  prev && prev.addEventListener('click', function() { prevSlide(); startTimer(); });
  next && next.addEventListener('click', function() { nextSlide(); startTimer(); });
  pauseBtn && pauseBtn.addEventListener('click', function() {
    paused = !paused;
    pauseBtn.innerHTML = paused ? '&#9654;' : '&#10074;&#10074;';
    if (paused) clearInterval(timer); else timer = setInterval(nextSlide, 5000);
  });
  show(0);
  startTimer();
})();