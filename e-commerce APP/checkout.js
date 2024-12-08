// Retrieve selected products from localStorage
const selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];

// Render Selected Products
function renderCheckoutProducts() {
    const checkoutProducts = document.getElementById('checkoutProducts');
    checkoutProducts.innerHTML = '';

    let total = 0;

    if (selectedProducts.length === 0) {
        checkoutProducts.innerHTML = '<p>No products selected for checkout.</p>';
        document.getElementById('checkoutTotal').textContent = 'Total: $0';
        return;
    }

    selectedProducts.forEach(product => {
        const row = document.createElement('div');
        row.classList.add('checkout-row');
        row.innerHTML = `
            <span>${product.name}</span>
            <span>$${product.price}</span>
        `;
        checkoutProducts.appendChild(row);
        total += parseFloat(product.price);
    });

    document.getElementById('checkoutTotal').textContent = `Total: $${total.toFixed(2)}`;
}

// Proceed to Payment
document.getElementById('paymentButton')?.addEventListener('click', function () {
    window.location.href = 'payment.html'; // Redirect to Payment Page
});

// Initialize Checkout Page
renderCheckoutProducts();
