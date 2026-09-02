const products = [
  { id: 1, name: "Smartphone", price: 15000, image: "https://placehold.co/500x350?text=Smartphone" },
  { id: 2, name: "Laptop", price: 50000, image: "https://placehold.co/500x350?text=Laptop" },
  { id: 3, name: "Headphones", price: 2000, image: "https://placehold.co/500x350?text=Headphones" },
  { id: 4, name: "Smart Watch", price: 3000, image: "https://placehold.co/500x350?text=Smart+Watch" },
  { id: 5, name: "Keyboard", price: 1200, image: "https://placehold.co/500x350?text=Keyboard" },
  { id: 6, name: "Mouse", price: 700, image: "https://placehold.co/500x350?text=Mouse" }
];

let cart = [];

const productsEl = document.getElementById("products");
const cartItemsEl = document.getElementById("cartItems");
const cartCountEl = document.getElementById("cartCount");
const totalEl = document.getElementById("total");
const cartPanel = document.getElementById("cartPanel");
const overlay = document.getElementById("overlay");

function displayProducts(list = products) {
  productsEl.innerHTML = list.length ? list.map(p => `
    <div class="product">
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p class="price">₹${p.price.toLocaleString("en-IN")}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    </div>
  `).join("") : "<p>No products found.</p>";
}

function addToCart(id) {
  const item = cart.find(x => x.id === id);
  if (item) item.quantity++;
  else cart.push({ ...products.find(x => x.id === id), quantity: 1 });
  updateCart();
}

function changeQuantity(id, amount) {
  const item = cart.find(x => x.id === id);
  if (!item) return;
  item.quantity += amount;
  if (item.quantity <= 0) cart = cart.filter(x => x.id !== id);
  updateCart();
}

function removeFromCart(id) {
  cart = cart.filter(x => x.id !== id);
  updateCart();
}

function updateCart() {
  let total = 0;
  let count = 0;

  cartItemsEl.innerHTML = cart.length ? cart.map(item => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    count += item.quantity;
    return `
      <div class="cart-item">
        <div>
          <strong>${item.name}</strong>
          <small>₹${item.price.toLocaleString("en-IN")} each</small>
          <div class="quantity">
            <button onclick="changeQuantity(${item.id}, -1)">−</button>
            <span>${item.quantity}</span>
            <button onclick="changeQuantity(${item.id}, 1)">+</button>
          </div>
        </div>
        <div>
          <strong>₹${subtotal.toLocaleString("en-IN")}</strong><br>
          <button class="remove" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      </div>
    `;
  }).join("") : "<p>Your cart is empty.</p>";

  cartCountEl.textContent = count;
  totalEl.textContent = total.toLocaleString("en-IN");
}

function openCart() {
  cartPanel.classList.add("open");
  overlay.classList.add("show");
}
function closeCart() {
  cartPanel.classList.remove("open");
  overlay.classList.remove("show");
}

document.getElementById("cartBtn").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

document.getElementById("search").addEventListener("input", e => {
  const term = e.target.value.toLowerCase();
  displayProducts(products.filter(p => p.name.toLowerCase().includes(term)));
});

document.getElementById("checkout").addEventListener("click", () => {
  if (!cart.length) return alert("Your cart is empty!");
  alert("Order placed successfully! 🎉");
  cart = [];
  updateCart();
  closeCart();
});

displayProducts();
updateCart();
