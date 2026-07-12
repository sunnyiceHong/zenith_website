var cartKey = 'zenith-cart';
var cartCount = document.querySelector('[data-cart-count]');
var cartContent = document.querySelector('[data-cart-content]');
function getCart() { return JSON.parse(localStorage.getItem(cartKey) || '[]'); }
function saveCart(cart) {
  localStorage.setItem(cartKey, JSON.stringify(cart));
  if (cartCount) cartCount.textContent = cart.reduce(function(t, i) { return t + i.quantity; }, 0);
}
function renderCart() {
  var cart = getCart();
  if (!cart.length) {
    if (cartContent) cartContent.innerHTML = '<div class="empty-cart-page"><p>Your bag is currently empty.</p><a class="button" href="collections/new.html">CONTINUE SHOPPING</a></div>';
    saveCart(cart);
    return;
  }
  var total = cart.reduce(function(s, i) { return s + i.price * i.quantity; }, 0);
  if (cartContent) {
    cartContent.innerHTML = cart.map(function(item, idx) {
      return '<article class="cart-line" data-idx="' + idx + '">' +
        '<img src="' + item.image + '" alt="' + item.name + '" />' +
        '<div>' +
          '<h2>' + item.name + '</h2>' +
          '<p>$' + item.price.toFixed(2) + '</p>' +
          '<div class="quantity">' +
            '<button data-action="dec" data-idx="' + idx + '">-</button>' +
            '<span>' + item.quantity + '</span>' +
            '<button data-action="inc" data-idx="' + idx + '">+</button>' +
          '</div>' +
        '</div>' +
        '<button class="remove" data-action="remove" data-idx="' + idx + '">REMOVE</button>' +
      '</article>';
    }).join('') +
    '<div class="cart-summary">' +
      '<div><p>Subtotal</p><strong>$' + total.toFixed(2) + '</strong></div>' +
      '<button class="button">CHECKOUT</button>' +
    '</div>';
  }
  saveCart(cart);
}
if (cartContent) {
  cartContent.addEventListener('click', function(e) {
    var btn = e.target.closest('button');
    if (!btn || !btn.dataset.idx) return;
    var cart = getCart();
    var idx = parseInt(btn.dataset.idx, 10);
    if (btn.dataset.action === 'remove') {
      cart.splice(idx, 1);
    } else if (btn.dataset.action === 'inc') {
      cart[idx].quantity += 1;
    } else if (btn.dataset.action === 'dec') {
      if (cart[idx].quantity > 1) cart[idx].quantity -= 1;
      else cart.splice(idx, 1);
    }
    saveCart(cart);
    renderCart();
  });
}
renderCart();
