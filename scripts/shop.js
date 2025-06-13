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

  list.innerHTML = '';
  let sum = 0;
  cart.forEach((item) => {
    sum += item.price;
    const li = document.createElement('li');
    const details = [];
    if (item.color) details.push(item.color);
    if (item.size) details.push(item.size);
    const info = details.length ? ` (${details.join(' ')})` : '';
    li.textContent = `${item.name}${info} - $${item.price.toFixed(2)}`;
    list.appendChild(li);
  });

  total.textContent = sum.toFixed(2);
  modal.classList.add('open');
}

function closeCart() {
  document.getElementById('cart-modal').classList.remove('open');
}

updateCartCount();
