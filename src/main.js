import "./style.css";

function generateProducts(n = 10) {
  const products = [];
  for (let i = 1; i <= n; i++) {
    products.push({
      id: i,
      name: `Product ${i}`,
      price: (Math.random() * 50 + 10).toFixed(2),
    });
  }
  return products;
}

const products = generateProducts();
const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const clearCartBtn = document.getElementById("clear-cart");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderProducts() {
  productList.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className =
      "bg-white shadow rounded-lg p-4 flex flex-col justify-between";

    const title = document.createElement("h3");
    title.className = "font-semibold text-gray-700 text-lg mb-2";
    title.textContent = product.name;

    const price = document.createElement("p");
    price.className = "text-gray-500 mb-4";
    price.textContent = `$${product.price}`;

    const button = document.createElement("button");
    button.className =
      "mt-auto bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-2 rounded";
    button.textContent = "Add to Cart";
    button.addEventListener("click", () => {
      const cartItem = cart.find((item) => item.id === product.id);
      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      updateCart();
    });

    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(button);
    productList.appendChild(card);
  });
}

function updateCart() {
  cartItems.innerHTML = "";

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.className = "py-2 flex justify-between items-center text-gray-700";

    const info = document.createElement("div");

    const name = document.createElement("span");
    name.className = "font-medium";
    name.textContent = item.name;

    const detail = document.createElement("span");
    detail.className = "block text-xs text-gray-500";
    detail.textContent = `$${item.price} x ${item.quantity}`;

    info.appendChild(name);
    info.appendChild(detail);

    const removeBtn = document.createElement("button");
    removeBtn.className = "text-red-500 text-sm hover:underline";
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        cart = cart.filter((i) => i.id !== item.id);
      }
      updateCart();
    });

    li.appendChild(info);
    li.appendChild(removeBtn);

    cartItems.appendChild(li);
  });

  localStorage.setItem("cart", JSON.stringify(cart));
}

clearCartBtn.addEventListener("click", () => {
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
});

renderProducts();
updateCart();
