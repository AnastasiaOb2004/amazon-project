import { cart, removeFromCart, updateQuantityForCheckout, updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let cartSummaryHTML = '';


cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct;

    products.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product;
        }
    });

    cartSummaryHTML += `
    <div class="cart-item-container 
    js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
    Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
    <img class="product-image"
    src="${matchingProduct.image}">

    <div class="cart-item-details">
    <div class="product-name">
        ${matchingProduct.name}
    </div>
    <div class="product-price">
       $${formatCurrency(matchingProduct.priceCents)}
    </div>
    <div class="product-quantity">
        <span>
        Quantity: <span class="quantity-label js-quantity-label">${cartItem.quantity}</span>
        </span>
        <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id = "${matchingProduct.id}">
        Update
        </span>
         <input class = "quantity-input js-quantity-input" data-product-id = "${matchingProduct.id}">
         <span class = "save-quantity-link link-primary js-save-quantity-link" data-product-id = "${matchingProduct.id}">Save</span>
    
        <span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${matchingProduct.id}">
        Delete
        </span>
    </div>
    </div>

    <div class="delivery-options">
    <div class="delivery-options-title">
        Choose a delivery option:
    </div>
    <div class="delivery-option">
        <input type="radio" checked
        class="delivery-option-input"
        name="delivery-option-${matchingProduct.id}">
        <div>
        <div class="delivery-option-date">
            Tuesday, June 21
        </div>
        <div class="delivery-option-price">
            FREE Shipping
        </div>
        </div>
    </div>
    <div class="delivery-option">
        <input type="radio"
        class="delivery-option-input"
        name="delivery-option-${matchingProduct.id}">
        <div>
        <div class="delivery-option-date">
            Wednesday, June 15
        </div>
        <div class="delivery-option-price">
            $4.99 - Shipping
        </div>
        </div>
    </div>
    <div class="delivery-option">
        <input type="radio"
        class="delivery-option-input"
        name="delivery-option-${matchingProduct.id}">
        <div>
        <div class="delivery-option-date">
            Monday, June 13
        </div>
        <div class="delivery-option-price">
            $9.99 - Shipping
        </div>
        </div>
    </div>
    </div>
    </div>
    </div>
    `;
});

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

updateQuantityForCheckout();

document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
        const { productId } = link.dataset;
        removeFromCart(productId);
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();
    })
})


document.querySelectorAll('.js-update-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
        const { productId } = link.dataset;
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        const linkSave = document.querySelector('.js-save-quantity-link');
        const quantityLabel = document.querySelector('.js-quantity-label');
        const quantityUpdate = document.querySelector('.js-update-quantity-link');

        container.classList.add('is-editing-quantity');
        linkSave.classList.add('is-editing-quantity');
        quantityLabel.classList.add('is-editing-quantity');
        quantityUpdate.classList.add('is-editing-quantity');
    });
});

document.querySelectorAll('.js-save-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
        const { productId } = link.dataset;

        const quantityInput = document.querySelector('.js-quantity-input');
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        const linkSave = document.querySelector('.js-save-quantity-link');
        const quantityLabel = document.querySelector('.js-quantity-label');
        const quantityUpdate = document.querySelector('.js-update-quantity-link');

        container.classList.remove('is-editing-quantity');
        linkSave.classList.remove('is-editing-quantity');
        quantityLabel.classList.remove('is-editing-quantity');
        quantityUpdate.classList.remove('is-editing-quantity');

        let newQuantity = Number(quantityInput.value);
        updateQuantity(productId, newQuantity);
    });
});

 document.querySelectorAll('.js-quantity-input').forEach((input) => {
    input.addEventListener('keydown', (event) => {
     if(event.key === 'Enter') {
        const { productId } = input.dataset;
        console.log(productId);

        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        const linkSave = document.querySelector('.js-save-quantity-link');
        const quantityLabel = document.querySelector('.js-quantity-label');
        const quantityUpdate = document.querySelector('.js-update-quantity-link');

        container.classList.remove('is-editing-quantity');
        linkSave.classList.remove('is-editing-quantity');
        quantityLabel.classList.remove('is-editing-quantity');
        quantityUpdate.classList.remove('is-editing-quantity');

        let newQuantity = Number(input.value);
        updateQuantity(productId, newQuantity);
     }
 }) })