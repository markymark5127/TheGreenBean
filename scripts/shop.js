let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price, id) {
  const colorSel = document.getElementById(`${id}-color`);
  const sizeSel = document.getElementById(`${id}-size`);
  const color = colorSel ? colorSel.value : '';
  const size = sizeSel ? sizeSel.value : '';
  cart.push({ name, price, color, size });
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  document.querySelectorAll('.cart-count').forEach((el) => {
    el.textContent = cart.length;
  });
}

function showCart() {
  const modal = document.getElementById('cart-modal');
  const list = document.getElementById('cart-items');
  const total = document.getElementById('cart-total');
  const paypalAmount = document.querySelector('#paypal-form input[name="amount"]');

  list.innerHTML = '';
  let sum = 0;
  cart.forEach((item, idx) => {
    sum += item.price;
    const li = document.createElement('li');
    const details = [];
    if (item.color) details.push(item.color);
    if (item.size) details.push(item.size);
    const info = details.length ? ` (${details.join(' ')})` : '';
    const span = document.createElement('span');
    span.textContent = `${item.name}${info} - $${item.price.toFixed(2)}`;
    const btn = document.createElement('button');
    btn.className = 'remove-btn';
    btn.innerHTML =
      '<svg class="trash-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18M9 6v12m6-12v12M4 6l1-3h14l1 3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    btn.addEventListener('click', () => removeFromCart(idx));
    li.appendChild(span);
    li.appendChild(btn);
    list.appendChild(li);
  });

  total.textContent = sum.toFixed(2);
  if (paypalAmount) {
    paypalAmount.value = sum.toFixed(2);
  }
  modal.classList.add('open');
}

function closeCart() {
  document.getElementById('cart-modal').classList.remove('open');
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  showCart();
}

updateCartCount();
