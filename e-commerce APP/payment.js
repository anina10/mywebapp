// Get elements
const upiOption = document.getElementById('upiOption');
const bankOption = document.getElementById('bankOption');
const cardOption = document.getElementById('cardOption');
const upiDetails = document.getElementById('upiDetails');
const bankDetails = document.getElementById('bankDetails');
const cardDetails = document.getElementById('cardDetails');
const makePaymentButton = document.getElementById('makePaymentButton');

// Retrieve cart data from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];

// Reset active state and payment details
function resetSelection() {
    const rows = document.querySelectorAll('.payment-row');
    rows.forEach(row => row.classList.remove('active'));
    [upiDetails, bankDetails, cardDetails].forEach(detail => {
        detail.style.display = 'none';
    });
    makePaymentButton.disabled = true;
}

// Show UPI payment details
function showUPIDetails() {
    upiDetails.innerHTML = `
        <h3>UPI Payment</h3>
        <label><input type="radio" name="paymentMethod" value="PhonePay"> Phone Pay</label><br>
        <label><input type="radio" name="paymentMethod" value="Paytm"> Paytm</label><br>
        <label><input type="radio" name="paymentMethod" value="GooglePay"> Google Pay</label>
    `;
    upiDetails.style.display = 'block';
    makePaymentButton.disabled = false;
}

// Show Bank Account payment details
function showBankDetails() {
    bankDetails.innerHTML = `
        <h3>Enter Bank Account Details</h3>
        <label>Account Number:</label>
        <input type="text" name="accountNumber" placeholder="Enter Account Number">
        <label>IFSC Code:</label>
        <input type="text" name="ifscCode" placeholder="Enter IFSC Code">
    `;
    bankDetails.style.display = 'block';
    makePaymentButton.disabled = false;
}

// Show Credit/Debit Card payment details
function showCardDetails() {
    cardDetails.innerHTML = `
        <h3>Enter Card Details</h3>
        <label>Card Number:</label>
        <input type="text" name="cardNumber" placeholder="Enter Card Number">
        <label>Expiry Date:</label>
        <input type="text" name="expiryDate" placeholder="MM/YY">
        <label>CVV:</label>
        <input type="text" name="cvv" placeholder="CVV">
    `;
    cardDetails.style.display = 'block';
    makePaymentButton.disabled = false;
}

// Event Listeners for payment rows
upiOption.addEventListener('click', () => {
    resetSelection();
    upiOption.classList.add('active');
    showUPIDetails();
});

bankOption.addEventListener('click', () => {
    resetSelection();
    bankOption.classList.add('active');
    showBankDetails();
});

cardOption.addEventListener('click', () => {
    resetSelection();
    cardOption.classList.add('active');
    showCardDetails();
});

// Make Payment Button
makePaymentButton.addEventListener('click', () => {
    // Remove selected products from cart
    cart = cart.filter(product => !selectedProducts.some(selected => selected.name === product.name));

    // Save updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Clear selectedProducts from localStorage
    localStorage.removeItem('selectedProducts');

    alert('Payment has been made successfully!');

    // Redirect back to cart or homepage
    window.location.href = 'buyers-dashboard.html';
});
