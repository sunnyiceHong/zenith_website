const productCount = document.querySelector('[data-cart-count]');
const cartKey = 'zenith-cart';
const savedCart = JSON.parse(localStorage.getItem(cartKey) || '[]');
const savedCount = savedCart.reduce((total, item) => total + item.quantity, 0);

if (productCount) productCount.textContent = savedCount;
document.querySelector('[data-product-add]')?.addEventListener('click', () => {
  const cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
  const existing = cart.find((item) => item.name === 'Second Skin Lip Pigment');
  if (existing) existing.quantity += 1;
  else cart.push({ name: 'Second Skin Lip Pigment', price: 20, quantity: 1, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=400&q=85' });
  localStorage.setItem(cartKey, JSON.stringify(cart));
  if (productCount) productCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
});
document.querySelectorAll('.shade').forEach((shade) => shade.addEventListener('click', () => {
  document.querySelector('.shade.active')?.classList.remove('active');
  shade.classList.add('active');
}));
