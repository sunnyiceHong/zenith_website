// ── Cart ──
const cartKey = 'zenith-cart';
function getCart() { return JSON.parse(localStorage.getItem(cartKey) || '[]'); }
function saveCart(cart) { localStorage.setItem(cartKey, JSON.stringify(cart)); updateCartUI(cart); }
function updateCartUI(cart) {
  var total = cart.reduce(function(t, i) { return t + i.quantity; }, 0);
  document.querySelectorAll('[data-cart-count]').forEach(function(el) { el.textContent = total; });
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

// ── Mobile Menu ──
function toggleMobileMenu() {
  var nav = document.querySelector('[data-mobile-nav]');
  var btn = document.querySelector('[data-menu-toggle]');
  if (nav) nav.classList.toggle('is-open');
  if (btn) btn.classList.toggle('is-open');
}

// Init cart count
updateCartUI(getCart());

// ── Event Listeners ──
document.querySelector('[data-cart-toggle]')?.addEventListener('click', function() { toggleCart(true); });
document.querySelector('[data-cart-close]')?.addEventListener('click', function() { toggleCart(false); });
document.querySelector('[data-scrim]')?.addEventListener('click', function() { toggleCart(false); });
document.querySelector('[data-menu-toggle]')?.addEventListener('click', toggleMobileMenu);

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

// ── Mobile submenu toggle ──
document.addEventListener('click', function(e) {
  var toggle = e.target.closest('[data-sub-toggle]');
  if (!toggle) return;
  e.preventDefault();
  var menu = toggle.nextElementSibling;
  if (menu) menu.classList.toggle('is-open');
});

// ── Hero Slideshow ──
(function() {
  var slides = document.querySelectorAll('[data-hero-slide]');
  if (!slides.length) return;
  var prevBtn = document.querySelector('[data-hero-prev]');
  var nextBtn = document.querySelector('[data-hero-next]');
  var dotsContainer = document.querySelector('[data-hero-dots]');
  var current = 0, timer;

  // Create dots
  if (dotsContainer) {
    slides.forEach(function(_, i) {
      var dot = document.createElement('button');
      dot.className = 'hero-dot' + (i === 0 ? ' is-active' : '');
      dot.setAttribute('aria-label', 'Slide ' + (i + 1));
      dot.addEventListener('click', function() { showSlide(i); startTimer(); });
      dotsContainer.appendChild(dot);
    });
  }

  function showSlide(index) {
    slides.forEach(function(s, i) { s.classList.toggle('is-active', i === index); });
    var dots = dotsContainer?.querySelectorAll('.hero-dot');
    dots?.forEach(function(d, i) { d.classList.toggle('is-active', i === index); });
    current = index;
  }
  function nextSlide() { showSlide((current + 1) % slides.length); }
  function prevSlide() { showSlide((current - 1 + slides.length) % slides.length); }
  function startTimer() { clearInterval(timer); timer = setInterval(nextSlide, 7000); }

  prevBtn?.addEventListener('click', function() { prevSlide(); startTimer(); });
  nextBtn?.addEventListener('click', function() { nextSlide(); startTimer(); });
  showSlide(0);
  startTimer();
})();

// ── Faves Carousel ──
(function() {
  var carousels = document.querySelectorAll('[data-faves-carousel]');
  carousels.forEach(function(carousel) {
    var section = carousel.closest('.faves-section__inner');
    var track = carousel.querySelector('[data-faves-track]');
    var prevBtn = section?.querySelector('[data-faves-prev]');
    var nextBtn = section?.querySelector('[data-faves-next]');
    if (!track) return;
    var scrollAmount = 320;
    prevBtn?.addEventListener('click', function() {
      track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    nextBtn?.addEventListener('click', function() {
      track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  });
})();

// ── Scroll-triggered animations ──
(function() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('[data-animate]').forEach(function(el) {
    observer.observe(el);
  });
})();

// ── Product card quick-add (from faves cards) ──
(function() {
  document.addEventListener('click', function(e) {
    var btn = e.target.closest('.faves-card__btn');
    if (!btn) return;
    e.preventDefault();
    var card = btn.closest('.faves-card');
    var name = card.querySelector('.faves-card__title')?.textContent || 'Product';
    var priceText = card.querySelector('.faves-card__price')?.textContent || '$0';
    var price = parseFloat(priceText.replace('$', '')) || 0;
    var image = card.querySelector('img')?.src || '';
    var cart = JSON.parse(localStorage.getItem('zenith-cart') || '[]');
    var existing = cart.find(function(item) { return item.name === name; });
    if (existing) existing.quantity += 1;
    else cart.push({ name: name, price: price, quantity: 1, image: image });
    localStorage.setItem('zenith-cart', JSON.stringify(cart));
    updateCartUI(cart);
    // Brief visual feedback
    var origText = btn.textContent;
    btn.textContent = 'ADDED!';
    setTimeout(function() { btn.textContent = origText; }, 1200);
  });
})();
