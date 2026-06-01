import {
  formatCurrency,
  getCartCount,
  getCartDetails,
  getCartTotal,
  getCategories,
  getFilteredProducts,
  state
} from "./model.js";

const productGrid = document.querySelector("#productGrid");
const categoryTabs = document.querySelector("#categoryTabs");
const cartCount = document.querySelector("#cartCount");
const cartItems = document.querySelector("#cartItems");
const cartTotal = document.querySelector("#cartTotal");
const cartDrawer = document.querySelector("#cartDrawer");

export const renderCategories = () => {
  categoryTabs.innerHTML = getCategories()
    .map(
      (category) => `
        <button class="${category === state.activeCategory ? "active" : ""}" data-category="${category}" type="button">
          ${category}
        </button>
      `
    )
    .join("");
};

export const renderProducts = () => {
  const products = getFilteredProducts();

  if (!products.length) {
    productGrid.innerHTML = '<div class="empty-state">Không tìm thấy bó hoa phù hợp.</div>';
    return;
  }

  productGrid.innerHTML = products
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-image" style="background-image: url('${product.image}')" role="img" aria-label="${product.name}"></div>
          <div class="product-info">
            <span class="product-category">${product.category}</span>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-meta">
              <span class="price">${formatCurrency(product.price)}</span>
              <button class="add-button" data-product-id="${product.id}" type="button">Thêm</button>
            </div>
          </div>
        </article>
      `
    )
    .join("");
};

export const renderCart = () => {
  const items = getCartDetails();

  cartCount.textContent = getCartCount();
  cartTotal.textContent = formatCurrency(getCartTotal());

  if (!items.length) {
    cartItems.innerHTML = '<div class="empty-state">Giỏ hàng đang trống.</div>';
    return;
  }

  cartItems.innerHTML = items
    .map(
      (item) => `
        <article class="cart-item">
          <img src="${item.image}" alt="${item.name}">
          <div>
            <h3>${item.name}</h3>
            <p>${formatCurrency(item.lineTotal)}</p>
          </div>
          <div class="qty-controls" aria-label="Số lượng ${item.name}">
            <button data-cart-action="decrease" data-product-id="${item.id}" type="button">-</button>
            <span>${item.quantity}</span>
            <button data-cart-action="increase" data-product-id="${item.id}" type="button">+</button>
          </div>
        </article>
      `
    )
    .join("");
};

export const openCart = () => {
  cartDrawer.classList.add("open");
};

export const closeCart = () => {
  cartDrawer.classList.remove("open");
};

export const renderAll = () => {
  renderCategories();
  renderProducts();
  renderCart();
};
