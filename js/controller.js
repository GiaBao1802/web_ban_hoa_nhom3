import { addToCart, state, updateCartQuantity } from "./model.js";
import { closeCart, openCart, renderAll, renderCart, renderCategories, renderProducts } from "./view.js";

const productGrid = document.querySelector("#productGrid");
const categoryTabs = document.querySelector("#categoryTabs");
const searchInput = document.querySelector("#searchInput");
const cartToggle = document.querySelector("#cartToggle");
const cartClose = document.querySelector("#cartClose");
const cartDrawer = document.querySelector("#cartDrawer");
const cartItems = document.querySelector("#cartItems");
const contactForm = document.querySelector(".contact-form");

const bindProductEvents = () => {
  productGrid.addEventListener("click", (event) => {
    const button = event.target.closest(".add-button");
    if (!button) return;

    addToCart(Number(button.dataset.productId));
    renderCart();
    openCart();
  });
};

const bindFilterEvents = () => {
  categoryTabs.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-category]");
    if (!button) return;

    state.activeCategory = button.dataset.category;
    renderCategories();
    renderProducts();
  });

  searchInput.addEventListener("input", (event) => {
    state.searchTerm = event.target.value;
    renderProducts();
  });
};

const bindCartEvents = () => {
  cartToggle.addEventListener("click", openCart);
  cartClose.addEventListener("click", closeCart);

  cartDrawer.addEventListener("click", (event) => {
    if (event.target === cartDrawer) closeCart();
  });

  cartItems.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-cart-action]");
    if (!button) return;

    const change = button.dataset.cartAction === "increase" ? 1 : -1;
    updateCartQuantity(Number(button.dataset.productId), change);
    renderCart();
  });
};

const bindContactForm = () => {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    contactForm.reset();
    alert("Cảm ơn bạn! Bloomie sẽ liên hệ lại sớm.");
  });
};

export const initController = () => {
  renderAll();
  bindProductEvents();
  bindFilterEvents();
  bindCartEvents();
  bindContactForm();
};
