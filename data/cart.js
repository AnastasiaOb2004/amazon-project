export let cart;

loadFromStorage();

export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) {
        cart = [{
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionId: '1',
        }, {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            deliveryOptionId: '2',
        },
        ];
    }
}

export function addToCart(productId) {
    let matchingItem;
    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);

    if (!quantitySelector) {
        console.error(`Quantity selector for product ${productId} not found.`);
        return;
    }

    const quantity = Number(quantitySelector.value);

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    if (matchingItem) {
        matchingItem.quantity += quantity;
    } else {
        cart.push({
            productId,
            quantity,
            deliveryOptionId: '1',
        });
    }

    let cartQuantity = 0;
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });

    saveToStorage();
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}



export function displayQuantity() {
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    })
    return cartQuantity;
}

export function updateQuantityForCheckout() {
    let cartQuantity = displayQuantity();
    const quantity = document.querySelector('.js-return-link');
    cartQuantity === 1 ? quantity.innerHTML = `${cartQuantity} item` : quantity.innerHTML = `${cartQuantity} items`;
};

export function removeFromCart(productId) {
    const newCart = [];
    cart.forEach((newCartItem) => {
        if (newCartItem.productId !== productId) {
            newCart.push(newCartItem);
        }
    });
    cart = newCart;
    updateQuantityForCheckout();
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function updateQuantity(productId, newQuantity) {
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            if (newQuantity === 0) {
                removeFromCart(productId);
                const container = document.querySelector(`.js-cart-item-container-${productId}`);
                container.remove();
            } else if (newQuantity >= 1 && newQuantity <= 40) {
                cartItem.quantity = newQuantity;
                document.querySelector('.js-quantity-label').innerHTML = newQuantity;
                updateQuantityForCheckout();
                saveToStorage();
            }
        }
    });
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
            console.log(cartItem.productId, cartItem.deliveryOptionId);
        }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}