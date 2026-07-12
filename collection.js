const quickModal = document.querySelector('[data-quick-modal]');
const closeQuickModal = () => { quickModal.hidden = true; };
document.querySelectorAll('[data-quick-view]').forEach((button) => button.addEventListener('click', () => { quickModal.hidden = false; }));
document.querySelector('[data-modal-close]')?.addEventListener('click', closeQuickModal);
quickModal?.addEventListener('click', (event) => { if (event.target === quickModal) closeQuickModal(); });
document.querySelectorAll('.shade').forEach((shade) => shade.addEventListener('click', () => { document.querySelector('.shade.active')?.classList.remove('active'); shade.classList.add('active'); }));
document.querySelector('[data-add-to-cart]')?.addEventListener('click', () => { localStorage.setItem('zenith-cart-count', '1'); closeQuickModal(); });
