import "./style.css";
/*rafail petridis */
const products = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: (Math.random() * 50 + 10).toFixed(2),
}));

const cart = JSON.parse(localStorage.getItem("cart"));

function renderProducts() {
  const productList = document.getElementById("productList");

  productList.innerHTML = "";

  products.forEach((product) => {
    const productEl = document.createElement("div");

    productEl.className =
      "bg-white p-4 shadow rounded flex flex-col justify-between";

    const productName = document.createElement("h3");
    productName.className = "font-semibold";
    productName.textContent = product.name;

    const productPrice = document.createElement("p");
    productPrice.className = "mb-2";
    productPrice.textContent = `Price: ${product.price}`;

    const addToCart = document.createElement("button");
    addToCart.className =
      "bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded";
    addToCart.textContent = "Add to Cart";

    addToCart.addEventListener("click", () => {
      const existingItem = cart.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      renderCart();
    });

    productEl.appendChild(productName);
    productEl.appendChild(productPrice);
    productEl.appendChild(addToCart);

    productList.appendChild(productEl);
  });
}

function renderCart() {
  const cartEl = document.getElementById("cart");

  cartEl.innerHTML = '<h2 class="font-bold mb-2">Shopping Cart</h2>';

  if (cart.length === 0) {
    cartEl.innerHTML += "<p>Your cart is empty.</p>";

    return;
  }

  cart.forEach((item) => {
    const itemEl = document.createElement("div");

    itemEl.className = "flex justify-between items-center border-b py-2";
    itemEl.innerHTML = `
          <span>${item.name} (x${item.quantity})</span>
          <button class="text-red-500">Remove</button>
      `;

    cartEl.appendChild(itemEl);
  });
}

renderProducts();
renderCart();
