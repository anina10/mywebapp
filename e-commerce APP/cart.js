// Retrieve cart data from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Back to Dashboard
document.getElementById('backButton')?.addEventListener('click', function () {
    window.location.href = 'buyers-dashboard.html';
});

// Render Cart Products
function renderCartProducts() {
    const cartProducts = document.getElementById('cartProducts');
    cartProducts.innerHTML = '';

    if (cart.length === 0) {
        cartProducts.innerHTML = '<p>Your cart is empty.</p>';
        document.getElementById('cartValue').textContent = 'Subtotal: $0';
        updateCheckoutButton(0);
        return;
    }

    cart.forEach((product, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = true; // Default: all products selected
        checkbox.addEventListener('change', () => updateCartSummary());

        const productDetails = document.createElement('div');
        productDetails.classList.add('cart-item-details');
        productDetails.innerHTML = `
            <h4>${product.name}</h4>
            <p>${product.description}</p>
            <p><strong>Price:</strong> $${product.price}</p>
        `;

        const productImage = document.createElement('img');
        productImage.src = product.image;
        productImage.alt = product.name;

        cartItem.appendChild(checkbox);
        cartItem.appendChild(productImage);
        cartItem.appendChild(productDetails);

        cartProducts.appendChild(cartItem);
    });

    updateCartSummary();
}

// Update Subtotal and Selected Count
function updateCartSummary() {
    const checkboxes = document.querySelectorAll('.cart-item input[type="checkbox"]');
    let subtotal = 0;
    let selectedCount = 0;

    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            subtotal += parseFloat(cart[index].price);
            selectedCount += 1;
        }
    });

    document.getElementById('cartValue').textContent = `Subtotal: $${subtotal.toFixed(2)}`;
    updateCheckoutButton(selectedCount);
}

// Update Checkout Button Text
function updateCheckoutButton(selectedCount) {
    const checkoutButton = document.getElementById('checkoutButton');
    checkoutButton.textContent = `Checkout (${selectedCount} items)`;
}

// Checkout Button Functionality
document.getElementById('checkoutButton')?.addEventListener('click', function () {
    const checkboxes = document.querySelectorAll('.cart-item input[type="checkbox"]');
    const selectedProducts = [];

    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            selectedProducts.push(cart[index]);
        }
    });

    if (selectedProducts.length === 0) {
        alert('Please select at least one product to checkout.');
        return;
    }

    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
    window.location.href = 'checkout.html'; // Redirect to checkout page
});

// Initialize Cart Page
renderCartProducts();
