let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price, id) {
  const colorSel = document.getElementById(`${id}-color`);
  const sizeSel = document.getElementById(`${id}-size`);
  const color = colorSel ? colorSel.value : "";
  const size = sizeSel ? sizeSel.value : "";
  cart.push({ id, name, price, color, size });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  document.querySelectorAll(".cart-count").forEach((el) => {
    el.textContent = cart.length;
  });
}

function showCart() {
  const modal = document.getElementById("cart-modal");
  const list = document.getElementById("cart-items");
  const total = document.getElementById("cart-total");
  const paypalAmount = document.querySelector(
    '#paypal-form input[name="amount"]',
  );

  list.innerHTML = "";
  let sum = 0;
  cart.forEach((item, idx) => {
    sum += item.price;
    const li = document.createElement("li");
    const details = [];
    if (item.color) details.push(item.color);
    if (item.size) details.push(item.size);
    const info = details.length ? ` (${details.join(" ")})` : "";

    const img = document.createElement("img");
    img.src = getImagePath(item);
    img.alt = item.name;

    const span = document.createElement("span");
    span.textContent = `${item.name}${info} - $${item.price.toFixed(2)}`;

    const wrap = document.createElement("div");
    wrap.className = "cart-item-info";
    wrap.appendChild(img);
    wrap.appendChild(span);

    const btn = document.createElement("button");
    btn.className = "remove-btn";
    btn.innerHTML =
      '<svg class="trash-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22m-5 0V5a2 2 0 00-2-2H8a2 2 0 00-2 2v2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    btn.addEventListener("click", () => removeFromCart(idx));
    li.appendChild(wrap);
    li.appendChild(btn);
    list.appendChild(li);
  });

  total.textContent = sum.toFixed(2);
  if (paypalAmount) {
    paypalAmount.value = sum.toFixed(2);
  }
  modal.classList.add("open");
}

function closeCart() {
  document.getElementById("cart-modal").classList.remove("open");
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showCart();
}

updateCartCount();

function getImagePath(item) {
  const baseMap = {
    "logo-shirt": "LogoShirt",
    "modern-shirt": "ModernShirt",
    "modern-tumbler": "ModernTumbler",
    "logo-tumbler": "LogoTumbler",
    "coffee-bag": "CoffeeBag",
  };
  const base = baseMap[item.id];
  if (!base) return "";
  if (item.id === "coffee-bag") return `assets/${base}.png`;
  const color = item.color ? item.color.replace(/\s+/g, "") : "";
  return `assets/${base}${color}.png`;
}

function updateProductImage(select) {
  const id = select.id.replace("-color", "");
  const product = select.closest(".product");
  const img = product ? product.querySelector("img") : null;
  const src = getImagePath({ id, color: select.value });
  if (img && src) {
    img.src = src;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('select[id$="-color"]').forEach((sel) => {
    sel.addEventListener("change", () => updateProductImage(sel));
    updateProductImage(sel);
  });
});
