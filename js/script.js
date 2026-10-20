(() => {
  'use strict';

  const product = document.getElementById('product');
  const packs = product.querySelectorAll('.pack__input');
  const priceBox = product.querySelector('.price');
  const els = {
    now: document.getElementById('price-now'),
    old: document.getElementById('price-old'),
    badge: document.getElementById('price-badge'),
    sku: document.getElementById('sku'),
  };

  const rub = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 });
  const format = (n) => {
    const s = Number.isInteger(n) ? rub.format(n) : n.toFixed(2).replace('.', ',');
    return `${s.replace(/\s/g, '\u00A0')}\u00A0₽`;
  };

  function render(input) {
    const price = parseFloat(input.dataset.price);
    const old = parseFloat(input.dataset.old);
    const hasDiscount = old > price;

    els.now.textContent = format(price);
    els.sku.textContent = input.dataset.sku;
    els.old.hidden = els.badge.hidden = !hasDiscount;
    if (hasDiscount) {
      els.old.textContent = format(old);
      els.badge.textContent = `−${Math.round((1 - price / old) * 100)}\u00A0%`;
    }


    priceBox.classList.remove('is-changed');
    void priceBox.offsetWidth;
    priceBox.classList.add('is-changed');
  }

  packs.forEach((input) => input.addEventListener('change', () => render(input)));
  render(product.querySelector('.pack__input:checked'));

  document.querySelectorAll('.fav').forEach((fav) => {
    fav.addEventListener('click', () => {
      const on = fav.getAttribute('aria-pressed') !== 'true';
      fav.setAttribute('aria-pressed', on);
      fav.setAttribute('aria-label', on ? 'Убрать из избранного' : 'Добавить в избранное');
    });
  });

  document.querySelectorAll('.orig-row__cart').forEach((btn) => {
    const label = btn.getAttribute('aria-label');
    let t;
    btn.addEventListener('click', () => {
      clearTimeout(t);
      btn.classList.add('is-added');
      btn.setAttribute('aria-label', `${label}: добавлено`);
      t = setTimeout(() => {
        btn.classList.remove('is-added');
        btn.setAttribute('aria-label', label);
      }, 1600);
    });
  });

  const cart = document.getElementById('cart');
  const cartText = cart.querySelector('.btn__text');
  let timer;
  cart.addEventListener('click', () => {
    clearTimeout(timer);
    cart.classList.add('is-added');
    cartText.textContent = 'Добавлено';
    timer = setTimeout(() => {
      cart.classList.remove('is-added');
      cartText.textContent = 'В корзину';
    }, 1600);
  });
})();
