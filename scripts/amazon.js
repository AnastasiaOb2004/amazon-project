import {addToCart, cart, displayQuantity } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from "./utils/money.js";

let productsHTML = '';

const productNumber = document.querySelector('.js-cart-quantity');
let cartQuantity = displayQuantity();
productNumber.innerText = cartQuantity;

products.forEach((product) => {
    productsHTML += `  
    <div class="product-container">
            <div class="product-image-container">
                <img class="product-image"
                src= "${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>

            <div class="product-rating-container">
                <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars * 10}.png">
                <div class="product-rating-count link-primary">
                ${product.rating.count}
                </div>
            </div>

            <div class="product-price">
                $${formatCurrency(product.priceCents)}
            </div>

            <div class="product-quantity-container">
                <select class="js-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-to-cart-${product.id}">
              
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart"
            data-product-id = "${product.id}">
                Add to Cart
            </button>
            </div>`;
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;

let interval;

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
        const { productId } = button.dataset;
        addToCart(productId);
        const message = document.querySelector(`.js-added-to-cart-${productId}`);
        message.classList.add('add-to-cart-button-on');
        message.innerHTML = `<img src="images/icons/checkmark.png"> Added`;

        if (interval) {
            clearTimeout(interval);
        }

        interval = setTimeout(() => {
            message.classList.remove('add-to-cart-button-on');
        }, 2000);

    });
})