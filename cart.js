const cartKey = 'zenith-cart';
const cartCount = document.querySelector('[data-cart-count]');
const cartContent = document.querySelector('[data-cart-content]');
const getCart = () => JSON.parse(localStorage.getItem(cartKey) || '[]');
const saveCart = (cart) => { localStorage.setItem(cartKey, JSON.stringify(cart)); if (cartCount) cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0); };
function renderCart() { const cart = getCart(); if (!cart.length) { cartContent.innerHTML = '<div class="empty-cart-page"><p>Your bag is currently empty.</p><a class="button" href="collections/new.html">CONTINUE SHOPPING</a></div>'; saveCart(cart); return; } const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0); cartContent.innerHTML = `${cart.map((item) => `<article class="cart-line"><img src="${item.image}" alt="${item.name}"><div><h2>${item.name}</h2><p>$${item.price.toFixed(2)}</p><div class="quantity"><button data-quantity="-">−</button><span>${item.quantity}</span><button data-quantity="+">+</button></div></div><button class="remove">REMOVE</button></article>`).join('')}<div class="cart-summary"><div><p>Subtotal</p><strong>$${total.toFixed(2)}</strong></div><button class="button">CHECKOUT</button></div>`; saveCart(cart); }
cartContent.addEventListener('click', (event) => { const cart = getCart(); if (event.target.matches('.remove')) cart.splice(0, 1); if (event.target.dataset.quantity) { cart[0].quantity = Math.max(1, cart[0].quantity + Number(event.target.dataset.quantity)); } saveCart(cart); renderCart(); });
renderCart();
