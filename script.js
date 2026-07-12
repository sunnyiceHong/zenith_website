const cartDrawer = document.querySelector('[data-cart-drawer]');
const scrim = document.querySelector('[data-scrim]');
const searchPanel = document.querySelector('[data-search-panel]');

function toggleCart(open) {
  cartDrawer.classList.toggle('is-open', open);
  scrim.classList.toggle('is-open', open);
  cartDrawer.setAttribute('aria-hidden', String(!open));
}

document.querySelector('[data-cart-toggle]')?.addEventListener('click', () => toggleCart(true));
document.querySelector('[data-cart-close]')?.addEventListener('click', () => toggleCart(false));
scrim?.addEventListener('click', () => toggleCart(false));
document.querySelector('[data-search-toggle]')?.addEventListener('click', () => {
  searchPanel.hidden = !searchPanel.hidden;
  if (!searchPanel.hidden) searchPanel.querySelector('input').focus();
});
